'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { employeeService, Employee } from '@precision/api-client';
import { useI18n } from '@/locales/useI18n';

interface DayAdjustModalProps {
  isOpen: boolean;
  date: string; // YYYY-MM-DD
  times: string[]; // ['08:00', '12:00', '--:--', '--:--']
  employee: Employee;
  initialMode?: 'overview' | 'time-input';
  initialType?: 'IN' | 'LUNCH_OUT' | 'LUNCH_IN' | 'OUT';
  onClose: () => void;
  onSaveSuccess: () => void;
}

export const DayAdjustModal: React.FC<DayAdjustModalProps> = ({
  isOpen,
  date,
  times,
  employee,
  initialMode = 'overview',
  initialType = 'IN',
  onClose,
  onSaveSuccess,
}) => {
  const { t, locale } = useI18n();
  // Animação de slide
  const [isAnimate, setIsAnimate] = useState<boolean>(false);
  
  // Estados do Modal
  const [mode, setMode] = useState<'overview' | 'time-input'>(initialMode);
  const [editingType, setEditingType] = useState<'IN' | 'LUNCH_OUT' | 'LUNCH_IN' | 'OUT'>(initialType);
  const [modalHour, setModalHour] = useState<string>('');
  const [modalMinutes, setModalMinutes] = useState<string>('');
  
  // Ações de Loading
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isConfirming, setIsConfirming] = useState<boolean>(false);

  const getSlotTimeValue = useCallback((type: 'IN' | 'LUNCH_OUT' | 'LUNCH_IN' | 'OUT'): string => {
    if (type === 'IN') return times[0] === '--:--' ? employee.workStart : times[0];
    if (type === 'LUNCH_OUT') return times[1] === '--:--' ? employee.lunchStart : times[1];
    if (type === 'LUNCH_IN') return times[2] === '--:--' ? employee.lunchEnd : times[2];
    return times[3] === '--:--' ? employee.workEnd : times[3];
  }, [times, employee]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setMode(initialMode);
        setEditingType(initialType);
        
        // Se for time-input, carregar os valores atuais no input
        if (initialMode === 'time-input') {
          const currentSlotTime = getSlotTimeValue(initialType);
          const [h, m] = currentSlotTime.split(':');
          setModalHour(h || '');
          setModalMinutes(m || '');
        }
      }, 0);

      // Ativar transição suave
      setTimeout(() => {
        setIsAnimate(true);
      }, 20);
    } else {
      setTimeout(() => {
        setIsAnimate(false);
      }, 0);
    }
  }, [isOpen, date, initialMode, initialType, getSlotTimeValue]);

  const handleClose = () => {
    setIsAnimate(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };



  const isSlotConfirmed = (type: 'IN' | 'LUNCH_OUT' | 'LUNCH_IN' | 'OUT'): boolean => {
    if (type === 'IN') return times[0] !== '--:--';
    if (type === 'LUNCH_OUT') return times[1] !== '--:--';
    if (type === 'LUNCH_IN') return times[2] !== '--:--';
    return times[3] !== '--:--';
  };

  const getSlotLabel = (type: string) => {
    if (type === 'IN') return t('common.entry');
    if (type === 'LUNCH_OUT') return t('dashboard.lunchStart');
    if (type === 'LUNCH_IN') return t('dashboard.lunchEnd');
    return t('common.exit');
  };

  // Calcula horas trabalhadas
  const calculateWorkedTime = (): string => {
    let totalMs = 0;
    const parseTime = (timeStr: string): Date => {
      const [hours, minutes] = timeStr.split(':').map(Number);
      const d = new Date();
      d.setHours(hours, minutes, 0, 0);
      return d;
    };

    if (times[0] && times[0] !== '--:--' && times[1] && times[1] !== '--:--') {
      const t1 = parseTime(times[0]);
      const t2 = parseTime(times[1]);
      totalMs += Math.max(0, t2.getTime() - t1.getTime());
    }

    if (times[2] && times[2] !== '--:--' && times[3] && times[3] !== '--:--') {
      const t1 = parseTime(times[2]);
      const t2 = parseTime(times[3]);
      totalMs += Math.max(0, t2.getTime() - t1.getTime());
    }

    const totalSeconds = Math.floor(totalMs / 1000);
    const h = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    return `${h}:${m}`;
  };

  // Abre editor de horário para determinado slot
  const openTimeInput = (type: 'IN' | 'LUNCH_OUT' | 'LUNCH_IN' | 'OUT') => {
    setEditingType(type);
    const timeVal = getSlotTimeValue(type);
    const [h, m] = timeVal.split(':');
    setModalHour(h || '');
    setModalMinutes(m || '');
    setMode('time-input');
  };

  // Salva ajuste individual
  const handleSaveTime = async () => {
    const h = parseInt(modalHour, 10);
    const m = parseInt(modalMinutes, 10);

    if (isNaN(h) || h < 0 || h > 23 || isNaN(m) || m < 0 || m > 59) {
      alert(t('adjustModal.invalidTimeAlert'));
      return;
    }

    // Impedir horários no futuro se for o dia de hoje
    const getTodayDateString = (): string => {
      const d = new Date();
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    if (date === getTodayDateString()) {
      const now = new Date();
      const curH = now.getHours();
      const curM = now.getMinutes();
      if (h > curH || (h === curH && m > curM)) {
        alert(t('adjustModal.futureTimeAlert') || 'Não é possível registrar um horário no futuro.');
        return;
      }
    }

    const formattedTime = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    setIsSaving(true);

    try {
      const res = await employeeService.updateRecordTime(editingType, formattedTime, date);
      if (res.success) {
        onSaveSuccess();
        // Se o modo inicial for 'time-input' (caso da tela de inicio diretamente), fechamos.
        // Caso contrário, retornamos para a visualização do dia.
        if (initialMode === 'time-input') {
          handleClose();
        } else {
          setMode('overview');
        }
      }
    } catch (e) {
      console.error(e);
      alert(t('adjustModal.saveErrorAlert'));
    } finally {
      setIsSaving(false);
    }
  };

  // Confirma todos os pontos pendentes daquele dia
  const handleBatchConfirm = async () => {
    setIsConfirming(true);
    try {
      const res = await employeeService.confirmEligibleRecords(date);
      if (res.success) {
        onSaveSuccess();
      }
    } catch (e) {
      console.error(e);
      alert(t('adjustModal.confirmErrorAlert'));
    } finally {
      setIsConfirming(false);
    }
  };

  // Formatador de data
  const formatDateLabel = (dateStr: string): string => {
    const [year, month, day] = dateStr.split('-').map(Number);
    const d = new Date(year, month - 1, day);
    const bcpLocale = locale === 'pt' ? 'pt-BR' : locale === 'en' ? 'en-US' : 'de-DE';
    return d.toLocaleDateString(bcpLocale, { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  // Verifica se há marcações elegíveis pendentes para aquele dia
  const hasPendingPunches = (): boolean => {
    return times.some(t => t === '--:--');
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-black/40 backdrop-blur-md transition-opacity duration-300 ease-out ${
        isAnimate ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      <div 
        className={`absolute bottom-0 left-0 right-0 w-full bg-surface-container-lowest rounded-t-3xl border-t border-outline-variant p-lg pb-xl flex flex-col items-center shadow-2xl transition-transform duration-300 ease-out transform ${
          isAnimate ? 'translate-y-0' : 'translate-y-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Handle superior */}
        <div className="w-12 h-1 bg-outline-variant/60 rounded-full mb-md cursor-pointer" onClick={handleClose} />

        {/* Botão de Fechar */}
        <button 
          onClick={handleClose}
          className="absolute top-md right-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high p-xs rounded-full cursor-pointer transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {mode === 'overview' ? (
          /* MODO OVERVIEW: GRADE DE REGISTRO DO DIA SELECIONADO */
          <div className="w-full space-y-lg">
            
            {/* Cabeçalho */}
            <div className="text-center">
              <h3 className="text-headline-md font-bold text-on-background">
                {t('adjustModal.recordOfDate', { date: formatDateLabel(date) })}
              </h3>
              <div className="flex items-center justify-center gap-xs text-primary mt-xs">
                <span className="material-symbols-outlined text-sm">location_on</span>
                <span className="text-body-sm font-semibold">São Paulo/SP</span>
              </div>
            </div>

            {/* Total de Horas do Dia */}
            <div className="text-center bg-surface-container-low py-md rounded-xl border border-outline-variant/20">
              <h2 className="text-display-time font-display-time text-on-background tracking-tighter">
                {calculateWorkedTime()}
              </h2>
              <p className="text-body-sm text-on-surface-variant">{t('adjustModal.registeredHoursForDay')}</p>
            </div>

            {/* Grade 2x2 */}
            <div className="grid grid-cols-2 gap-md">
              {(['IN', 'LUNCH_OUT', 'LUNCH_IN', 'OUT'] as const).map((type) => {
                const isConfirmed = isSlotConfirmed(type);
                const timeValue = getSlotTimeValue(type);
                
                // Escolha de ícones correspondentes
                const getIcon = () => {
                  if (type === 'IN') return 'login';
                  if (type === 'LUNCH_OUT') return 'logout';
                  if (type === 'LUNCH_IN') return 'fastfood';
                  return 'home';
                };

                return (
                  <div 
                    key={type}
                    className="p-md rounded-xl border border-secondary-container bg-surface-container-low"
                  >
                    <div className="flex justify-between items-start mb-sm">
                      <span className="text-label-caps font-label-caps text-on-surface-variant">
                        {getSlotLabel(type)}
                      </span>
                      {isConfirmed ? (
                        <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                          check_circle
                        </span>
                      ) : (
                        <button 
                          onClick={() => openTimeInput(type)}
                          className="text-primary text-[10px] font-bold hover:underline cursor-pointer"
                        >
                          {t('common.edit')}
                        </button>
                      )}
                    </div>
                    <div className="flex items-center gap-sm">
                      <span className={`material-symbols-outlined ${isConfirmed ? 'text-secondary' : 'text-outline'}`} style={isConfirmed ? { fontVariationSettings: "'FILL' 1" } : undefined}>
                        {getIcon()}
                      </span>
                      <span className="text-headline-md font-headline-md">
                        {isConfirmed ? timeValue : '--:--'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Botão de Batch Confirm */}
            <button 
              disabled={isConfirming || !hasPendingPunches()}
              onClick={handleBatchConfirm}
              className="w-full bg-secondary text-on-secondary py-md rounded-xl text-headline-md font-headline-md shadow-lg shadow-secondary/20 hover:bg-on-secondary-fixed-variant transition-all active:scale-[0.97] hover:scale-[1.01] duration-150 cursor-pointer flex items-center justify-center gap-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isConfirming ? (
                <svg className="animate-spin h-6 w-6 text-on-secondary" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                <>
                  <span className="material-symbols-outlined">
                    check_circle
                  </span>
                  <span>{t('adjustModal.confirmPending')}</span>
                </>
              )}
            </button>
          </div>
        ) : (
          /* MODO TIME INPUT: HH:MM NUMÉRICOS */
          <div className="w-full flex flex-col items-center">
            
            {/* Botão de Voltar para o Overview se não for modal direto */}
            {initialMode !== 'time-input' && (
              <button 
                onClick={() => setMode('overview')}
                className="absolute top-md left-md text-on-surface-variant hover:text-on-surface p-xs rounded-full cursor-pointer transition-colors"
              >
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
            )}

            {/* Ícone Circular */}
            <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center text-primary mb-md shadow-sm">
              <span className="material-symbols-outlined text-3xl">edit</span>
            </div>

            {/* Título */}
            <h3 className="text-headline-md font-bold text-on-background">{t('adjustModal.adjustTimeTitle')}</h3>
            <p className="text-body-sm text-on-surface-variant mt-xs mb-lg">
              {t('adjustModal.adjustTimeDesc', { slot: getSlotLabel(editingType), date: formatDateLabel(date) })}
            </p>

            {/* Inputs HH:MM */}
            <div className="flex items-center justify-center gap-sm mb-lg">
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={2}
                value={modalHour}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9]/g, '');
                  if (val.length <= 2) {
                    setModalHour(val);
                    if (val.length === 2) {
                      document.getElementById('modal-minutes-input')?.focus();
                    }
                  }
                }}
                className="w-16 h-16 bg-surface-container text-center text-3xl font-bold rounded-xl border border-outline-variant focus:outline-none focus:border-primary text-on-background"
                placeholder="HH"
              />
              <span className="text-2xl font-bold text-on-surface-variant">:</span>
              <input
                id="modal-minutes-input"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={2}
                value={modalMinutes}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9]/g, '');
                  if (val.length <= 2) {
                    setModalMinutes(val);
                  }
                }}
                className="w-16 h-16 bg-surface-container text-center text-3xl font-bold rounded-xl border border-outline-variant focus:outline-none focus:border-primary text-on-background"
                placeholder="MM"
              />
            </div>

            {/* Botão de Confirmação */}
            <button
              disabled={isSaving}
              onClick={handleSaveTime}
              className="w-full bg-primary text-on-primary py-md rounded-xl text-body-lg font-bold shadow-lg shadow-primary/20 hover:bg-primary-container transition-all active:scale-[0.97] duration-150 cursor-pointer flex items-center justify-center gap-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <svg className="animate-spin h-5 w-5 text-on-primary" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                <span>{t('adjustModal.confirmChange')}</span>
              )}
            </button>

          </div>
        )}

      </div>
    </div>
  );
};
