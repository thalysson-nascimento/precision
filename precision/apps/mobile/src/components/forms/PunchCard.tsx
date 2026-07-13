'use client';

import { useI18n } from '@/locales/useI18n';
import { Employee, employeeService, HistoryDay } from '@precision/api-client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { DayAdjustModal } from '../ui/DayAdjustModal';
import { ProgressCircle } from '../ui/ProgressCircle';
import { PunchBox } from './PunchBox';

export const PunchCard: React.FC = () => {
  const { t, locale } = useI18n();
  // Estado para localização
  const [location, setLocation] = useState<string>('...');

  // Dados do Funcionário e Histórico
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [history, setHistory] = useState<HistoryDay[]>([]);
  const [currentMonth, setCurrentMonth] = useState<string>('Junho/2026');

  // Estados dos Pontos e Confirmações de Hoje
  const [entrada, setEntrada] = useState<string>('08:00');
  const [entradaConfirmed, setEntradaConfirmed] = useState<boolean>(false);

  const [saidaAlmoco, setSaidaAlmoco] = useState<string>('12:00');
  const [saidaAlmocoConfirmed, setSaidaAlmocoConfirmed] = useState<boolean>(false);

  const [retornoAlmoco, setRetornoAlmoco] = useState<string>('13:00');
  const [retornoAlmocoConfirmed, setRetornoAlmocoConfirmed] = useState<boolean>(false);

  const [saidaFinal, setSaidaFinal] = useState<string>('18:00');
  const [saidaFinalConfirmed, setSaidaFinalConfirmed] = useState<boolean>(false);

  // Estado para a quantidade de horas trabalhadas (HH:MM)
  const [workedTime, setWorkedTime] = useState<string>('00:00');

  // Estados de Carregamento e Interface
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPunching, setIsPunching] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [incompleteDays, setIncompleteDays] = useState<number>(0);
  const [blockage, setBlockage] = useState<{ isBlocked: boolean; reason: string | null } | null>(null);

  // Estados do Modal de Edição
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingType, setEditingType] = useState<'IN' | 'LUNCH_OUT' | 'LUNCH_IN' | 'OUT'>('IN');

  // Estado para ajustar outros dias do histórico
  const [selectedHistoryDay, setSelectedHistoryDay] = useState<{
    date: string;
    times: string[];
  } | null>(null);

  // Carregar dados e registros do banco ao iniciar
  const loadRecords = async () => {
    try {
      setIsLoading(true);
      const data = await employeeService.getTodayRecords();
      setEmployee(data.employee);
      setIncompleteDays(data.incompleteDays || 0);
      setHistory(data.history || []);
      setCurrentMonth(data.currentMonth || 'Junho/2026');
      setBlockage(data.blockage || null);

      const inRec = data.records.find(r => r.type === 'IN');
      const lunchOutRec = data.records.find(r => r.type === 'LUNCH_OUT');
      const lunchInRec = data.records.find(r => r.type === 'LUNCH_IN');
      const outRec = data.records.find(r => r.type === 'OUT');

      setEntrada(inRec?.time || data.employee.workStart);
      setEntradaConfirmed(!!inRec);

      setSaidaAlmoco(lunchOutRec?.time || data.employee.lunchStart);
      setSaidaAlmocoConfirmed(!!lunchOutRec);

      setRetornoAlmoco(lunchInRec?.time || data.employee.lunchEnd);
      setRetornoAlmocoConfirmed(!!lunchInRec);

      setSaidaFinal(outRec?.time || data.employee.workEnd);
      setSaidaFinalConfirmed(!!outRec);
    } catch (e: any) {
      console.error('Erro ao carregar registros:', e);
      if (e.message === 'subscription_expired' || e.message?.includes('expired') || e.message?.includes('expirada')) {
        window.location.href = '/expired';
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      loadRecords();
    }, 0);
  }, []);

  // Buscar localização via IP
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        setLocation(t('common.loading'));
        const data = await employeeService.getLocationInfo();
        if (data.city && data.region) {
          setLocation(`${data.city}/${data.region}`);
        } else {
          setLocation('São Paulo/SP');
        }
      } catch (error) {
        console.error('Erro ao buscar localização via IP:', error);
        setLocation('São Paulo/SP');
      }
    };

    fetchLocation();
  }, [t]);

  // Calcular a quantidade de horas trabalhadas em tempo real (Apenas HH:MM)
  useEffect(() => {
    const parseTime = (timeStr: string): Date => {
      const [hours, minutes] = timeStr.split(':').map(Number);
      const d = new Date();
      d.setHours(hours, minutes, 0, 0);
      return d;
    };

    const updateWorkedTime = () => {
      const now = new Date();
      let totalMs = 0;

      // Se a saída final não está confirmada, pega o horário atual dinamicamente
      if (!saidaFinalConfirmed) {
        const curHours = String(now.getHours()).padStart(2, '0');
        const curMinutes = String(now.getMinutes()).padStart(2, '0');
        setSaidaFinal(`${curHours}:${curMinutes}`);
      }

      // Período 1: Entrada até Saída Almoço
      if (entradaConfirmed) {
        const tEntrada = parseTime(entrada);
        if (saidaAlmocoConfirmed) {
          const tSaidaAlmoco = parseTime(saidaAlmoco);
          totalMs += Math.max(0, tSaidaAlmoco.getTime() - tEntrada.getTime());
        } else {
          totalMs += Math.max(0, now.getTime() - tEntrada.getTime());
        }
      }

      // Período 2: Retorno Almoço até Saída Final
      if (retornoAlmocoConfirmed) {
        const tRetorno = parseTime(retornoAlmoco);
        if (saidaFinalConfirmed) {
          const tSaidaFinal = parseTime(saidaFinal);
          totalMs += Math.max(0, tSaidaFinal.getTime() - tRetorno.getTime());
        } else {
          totalMs += Math.max(0, now.getTime() - tRetorno.getTime());
        }
      }

      // Converter milissegundos para HH:MM
      const totalSeconds = Math.floor(totalMs / 1000);
      const h = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
      const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');

      setWorkedTime(`${h}:${m}`);
    };

    updateWorkedTime();
    const interval = setInterval(updateWorkedTime, 1000);
    return () => clearInterval(interval);
  }, [entrada, entradaConfirmed, saidaAlmoco, saidaAlmocoConfirmed, retornoAlmoco, retornoAlmocoConfirmed, saidaFinal, saidaFinalConfirmed]);

  // Mostrar Toast temporário
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Função para verificar se a marcação contratual está no passado (elegível para bater)
  const isSlotEligible = (contractTime: string): boolean => {
    const now = new Date();
    const currentTotal = now.getHours() * 60 + now.getMinutes();

    const [h, m] = contractTime.split(':').map(Number);
    const contractTotal = h * 60 + m;

    return contractTotal <= currentTotal;
  };

  // Função para verificar se há alguma marcação elegível que ainda não foi confirmada
  const hasEligiblePunchesPending = (): boolean => {
    if (!employee) return false;
    const slots = [
      { time: employee.workStart, confirmed: entradaConfirmed },
      { time: employee.lunchStart, confirmed: saidaAlmocoConfirmed },
      { time: employee.lunchEnd, confirmed: retornoAlmocoConfirmed },
      { time: employee.workEnd, confirmed: saidaFinalConfirmed },
    ];
    return slots.some(slot => isSlotEligible(slot.time) && !slot.confirmed);
  };

  // Confirmar registros elegíveis (Batch Punch)
  const handlePunch = async () => {
    if (!employee) return;
    setIsPunching(true);

    try {
      const res = await employeeService.confirmEligibleRecords();
      if (res.success) {
        // Atualizar estados locais de hoje
        const inRec = res.records.find(r => r.type === 'IN');
        const lunchOutRec = res.records.find(r => r.type === 'LUNCH_OUT');
        const lunchInRec = res.records.find(r => r.type === 'LUNCH_IN');
        const outRec = res.records.find(r => r.type === 'OUT');

        // Contar quantos novos foram batidos
        let count = 0;
        if (inRec && !entradaConfirmed) { setEntradaConfirmed(true); setEntrada(inRec.time); count++; }
        if (lunchOutRec && !saidaAlmocoConfirmed) { setSaidaAlmocoConfirmed(true); setSaidaAlmoco(lunchOutRec.time); count++; }
        if (lunchInRec && !retornoAlmocoConfirmed) { setRetornoAlmocoConfirmed(true); setRetornoAlmoco(lunchInRec.time); count++; }
        if (outRec && !saidaFinalConfirmed) { setSaidaFinalConfirmed(true); setSaidaFinal(outRec.time); count++; }

        if (count > 0) {
          showToast(t('dashboard.punchSuccess'));
          // Recarregar os registros (incluindo o histórico atualizado)
          await loadRecords();
        } else {
          showToast(t('dashboard.noPendingPunches'));
        }
      }
    } catch (e) {
      console.error(e);
      showToast(t('dashboard.punchError'));
    } finally {
      setIsPunching(false);
    }
  };

  // Abrir Modal de Edição para o ponto de hoje
  const openEditModal = (type: 'IN' | 'LUNCH_OUT' | 'LUNCH_IN' | 'OUT') => {
    setEditingType(type);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
  };

  const getTodayDateString = (): string => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getExpectedWorkMinutes = (): number => {
    if (!employee) return 480; // 8 hours default (8 * 60 = 480 mins)
    const parseToMins = (tStr: string) => {
      const [h, m] = tStr.split(':').map(Number);
      return (h || 0) * 60 + (m || 0);
    };
    const totalMins = parseToMins(employee.workEnd) - parseToMins(employee.workStart);
    const lunchMins = parseToMins(employee.lunchEnd) - parseToMins(employee.lunchStart);
    return Math.max(0, totalMins - lunchMins);
  };

  const getTodayHistoryItem = (): HistoryDay | null => {
    const isTodayComplete = entradaConfirmed && saidaAlmocoConfirmed && retornoAlmocoConfirmed && saidaFinalConfirmed;
    if (!isTodayComplete) return null;
    
    return {
      date: getTodayDateString(),
      times: [entrada, saidaAlmoco, retornoAlmoco, saidaFinal],
      isComplete: true,
    };
  };

  const handleHistoryDayClick = (day: HistoryDay) => {
    setSelectedHistoryDay({
      date: day.date,
      times: day.times
    });
  };



  // Verificar quais boxes de horário devem ficar desabilitados
  const isInputDisabled = (type: 'IN' | 'LUNCH_OUT' | 'LUNCH_IN' | 'OUT', contractTime: string, isConfirmed: boolean): boolean => {
    if (blockage?.isBlocked) return true;
    if (isConfirmed) return false;
    return !isSlotEligible(contractTime);
  };

  // Formatador de data para a listagem (ex: "2026-06-01" -> "Seg. 1 Jun")
  const formatHistoryDate = (dateStr: string): string => {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    
    const bcpLocale = locale === 'pt' ? 'pt-BR' : locale === 'en' ? 'en-US' : 'de-DE';
    
    // Obter dia da semana curto
    const weekday = date.toLocaleDateString(bcpLocale, { weekday: 'short' });
    let capitalizedWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);
    if (locale === 'pt') {
      capitalizedWeekday = capitalizedWeekday.replace('.', '');
    }
    
    // Dia do mês
    const dayNum = date.getDate();
    
    // Mês curto
    const monthShort = date.toLocaleDateString(bcpLocale, { month: 'short' });
    let capitalizedMonth = monthShort.charAt(0).toUpperCase() + monthShort.slice(1);
    if (locale === 'pt') {
      capitalizedMonth = capitalizedMonth.replace('.', '');
    }
    
    return locale === 'pt' 
      ? `${capitalizedWeekday}. ${dayNum} ${capitalizedMonth}`
      : locale === 'en'
      ? `${capitalizedWeekday}, ${capitalizedMonth} ${dayNum}`
      : `${capitalizedWeekday}., ${dayNum}. ${capitalizedMonth}`;
  };

  // Format current month dynamically
  const getLocalizedCurrentMonth = () => {
    const d = history.length > 0 ? new Date(history[0].date) : new Date();
    const bcpLocale = locale === 'pt' ? 'pt-BR' : locale === 'en' ? 'en-US' : 'de-DE';
    const monthName = d.toLocaleDateString(bcpLocale, { month: 'long' });
    const capitalizedMonthName = monthName.charAt(0).toUpperCase() + monthName.slice(1);
    const year = d.getFullYear();
    return locale === 'pt' ? `${capitalizedMonthName}/${year}` : `${capitalizedMonthName} ${year}`;
  };

  return (
    <div className="w-full flex flex-col min-h-screen bg-[#F8F9FF] select-none">
      {/* 1. Blue body section enclosing progress circle and horizontal time grid */}
      <div className="bg-[#4A7EA9] w-full pb-8 flex flex-col items-stretch px-container-margin">
        
        {/* Skeleton/Progress Circle Container */}
        <div className="mt-[74px] flex justify-center w-full mx-auto">
          {isLoading ? (
            <div className="w-[250px] h-[250px] rounded-full shimmer flex items-center justify-center bg-white/5">
              <div className="w-[210px] h-[210px] rounded-full bg-[#4A7EA9] flex flex-col items-center justify-center gap-2">
                <div className="h-8 w-24 shimmer rounded opacity-30"></div>
                <div className="h-3 w-16 shimmer rounded opacity-30"></div>
              </div>
            </div>
          ) : (
            <ProgressCircle
              workedTime={workedTime}
              expectedWorkMinutes={getExpectedWorkMinutes()}
              label={t('dashboard.totalWorkedHoursToday')}
            />
          )}
        </div>

        {/* Time Grid (Horizontal Row) */}
        <div className="mt-[74px] w-full max-w-[512px] mx-auto">
          <div className="grid grid-cols-4 divide-x divide-white/20 border border-white rounded-lg p-4 bg-[#4A7EA9]">
            {isLoading ? (
              [1, 2, 3, 4].map(i => (
                <div key={i} className="flex flex-col justify-between min-h-[56px] px-2 opacity-50">
                  <div className="h-3.5 w-8 shimmer rounded opacity-25"></div>
                  <div className="h-4 w-12 shimmer rounded opacity-25 mt-auto"></div>
                </div>
              ))
            ) : (
              <>
                {/* Entrada */}
                <PunchBox
                  label={t('common.entry')}
                  time={entrada}
                  iconName="login"
                  isConfirmed={entradaConfirmed}
                  isDisabled={isInputDisabled('IN', employee?.workStart || '08:00', entradaConfirmed)}
                  onEdit={() => openEditModal('IN')}
                  showEditButton={!entradaConfirmed && !blockage?.isBlocked}
                />
                
                {/* Saída Almoço */}
                <PunchBox
                  label={t('common.exit')}
                  time={saidaAlmoco}
                  iconName="logout"
                  isConfirmed={saidaAlmocoConfirmed}
                  isDisabled={isInputDisabled('LUNCH_OUT', employee?.lunchStart || '12:00', saidaAlmocoConfirmed)}
                  onEdit={() => openEditModal('LUNCH_OUT')}
                  showEditButton={!saidaAlmocoConfirmed && !blockage?.isBlocked}
                />
                
                {/* Retorno Almoço */}
                <PunchBox
                  label={t('common.return')}
                  time={retornoAlmoco}
                  iconName="fastfood"
                  isConfirmed={retornoAlmocoConfirmed}
                  isDisabled={isInputDisabled('LUNCH_IN', employee?.lunchEnd || '13:00', retornoAlmocoConfirmed)}
                  onEdit={() => openEditModal('LUNCH_IN')}
                  showEditButton={!retornoAlmocoConfirmed && !blockage?.isBlocked}
                />
                
                {/* Saída Final */}
                <PunchBox
                  label={t('common.exit')}
                  time={saidaFinal}
                  iconName="home"
                  isConfirmed={saidaFinalConfirmed}
                  isDisabled={isInputDisabled('OUT', employee?.workEnd || '18:00', saidaFinalConfirmed)}
                  onEdit={() => openEditModal('OUT')}
                  showEditButton={!saidaFinalConfirmed && !blockage?.isBlocked}
                />
              </>
            )}
          </div>
        </div>

      </div>

      {/* 2. White/Light-gray body section below the blue container */}
      <div className="flex-1 w-full bg-[#F8F9FF] px-container-margin pt-6 pb-12 flex flex-col items-stretch">
        
        {/* Alerts in the white section */}
        <div className="w-full max-w-[512px] space-y-md mx-auto">
          {/* Alerta de Pendência dinâmico */}
          {!isLoading && incompleteDays > 0 && (
            <div className="bg-tertiary-fixed text-on-tertiary-fixed p-md rounded-xl flex flex-col gap-sm border border-tertiary-container shadow-sm">
              <div className="flex items-center gap-md">
                <span className="material-symbols-outlined text-tertiary text-2xl">warning</span>
                <div>
                  <h2 className="text-body-lg font-bold">{t('dashboard.pendingAlertTitle')}</h2>
                  <p className="text-body-sm text-on-tertiary-fixed/80">
                    {t('dashboard.pendingAlertDesc', { 
                      count: String(incompleteDays), 
                      daysWord: incompleteDays === 1 ? t('dashboard.daysWordSingular') : t('dashboard.daysWordPlural')
                    })}
                  </p>
                </div>
              </div>
              <div className="flex justify-end w-full">
                <Link 
                  href="/?tab=historico"
                  className="bg-tertiary text-on-tertiary px-md py-xs rounded-lg text-label-caps font-label-caps hover:bg-tertiary-container transition-colors active:scale-95 duration-200 cursor-pointer block text-center"
                >
                  {t('dashboard.adjustTime')}
                </Link>
              </div>
            </div>
          )}

          {/* Alerta de Expediente Bloqueado */}
          {!isLoading && blockage?.isBlocked && (
            <div className="bg-error-container text-on-error-container p-md rounded-xl flex items-center gap-md border border-error/20 shadow-sm animate-pulse">
              <span className="material-symbols-outlined text-error text-[32px]">block</span>
              <div className="space-y-[2px]">
                <h2 className="text-body-lg font-bold text-error">{t('dashboard.punchLocked')}</h2>
                <p className="text-body-sm text-on-error-container/80 font-medium">
                  {blockage.reason === 'WEEKDAY' 
                    ? t('dashboard.weekendBlocked') 
                    : t('dashboard.blockageReason', { reason: blockage.reason || '' })}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Action Confirm Button */}
        <div className="w-full max-w-[512px] mx-auto">
          <button 
            disabled={isLoading || isPunching || blockage?.isBlocked || !hasEligiblePunchesPending()}
            onClick={handlePunch}
            className="w-full bg-[#7A9771] text-white py-4 rounded-lg text-headline-md font-headline-md shadow-sm hover:opacity-90 active:scale-[0.97] transition-all duration-150 cursor-pointer flex items-center justify-center gap-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPunching ? (
              <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              t('dashboard.confirmPunch')
            )}
          </button>
        </div>

        {/* History List Container: distance of 44px from the button */}
        <div className="w-full max-w-[512px] mt-[44px] mx-auto">
          {/* Header Row */}
          <div className="flex justify-between items-center mb-[28px]">
            <h3 className="text-[12px] font-normal text-black/60 font-sans uppercase tracking-wide">
              {t('history.yourRegisteredPunches')}
            </h3>
            {isLoading ? (
              <div className="h-4 w-24 shimmer rounded opacity-30"></div>
            ) : (
              <span className="text-[12px] font-normal text-black/60 font-sans">
                {getLocalizedCurrentMonth()}
              </span>
            )}
          </div>

          {/* Divider Line is 1px solid #E4E4E4 between items */}
          <div className="flex flex-col border-t border-[#E4E4E4]">
            {isLoading ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between py-md border-b border-[#E4E4E4]">
                  <div className="flex flex-col gap-2">
                    <div className="h-5 w-28 shimmer rounded opacity-30"></div>
                    <div className="h-4 w-48 shimmer rounded opacity-30"></div>
                  </div>
                  <div className="w-6 h-6 rounded-full shimmer opacity-30"></div>
                </div>
              ))
            ) : (
              (() => {
                const todayHistoryItem = getTodayHistoryItem();
                const displayHistory = todayHistoryItem
                  ? [todayHistoryItem, ...history.filter(day => day.date !== getTodayDateString())]
                  : history;
                const limitedHistory = displayHistory.slice(0, 6);

                if (limitedHistory.length === 0) {
                  return (
                    <div className="text-center py-md text-body-sm text-on-surface-variant font-medium">
                      {t('history.listEmpty')}
                    </div>
                  );
                }

                return limitedHistory.map((day) => (
                  <div 
                    key={day.date} 
                    onClick={() => handleHistoryDayClick(day)}
                    className="flex items-center justify-between py-md border-b border-[#E4E4E4] hover:bg-surface-container-low/20 transition-colors group cursor-pointer"
                  >
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-black font-sans">
                        {formatHistoryDate(day.date)}
                      </span>
                      <span className="text-[12px] font-normal text-black/60 mt-1 font-sans">
                        {day.times.join(' • ')}
                      </span>
                    </div>
                    {day.isComplete ? (
                      <span className="material-symbols-outlined text-secondary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                    ) : (
                      <span className="material-symbols-outlined text-tertiary text-lg animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>
                        warning
                      </span>
                    )}
                  </div>
                ));
              })()
            )}
          </div>
        </div>

      </div>

      {/* Custom Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface px-lg py-sm rounded-xl shadow-xl flex items-center gap-sm z-[110] animate-fade-in-up">
          <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
            check_circle
          </span>
          <span className="text-body-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Modal Reutilizável de Ajuste de Ponto para Hoje */}
      {employee && isModalOpen && (
        <DayAdjustModal
          isOpen={isModalOpen}
          date={getTodayDateString()}
          times={[entrada, saidaAlmoco, retornoAlmoco, saidaFinal]}
          employee={employee}
          initialMode="time-input"
          initialType={editingType}
          onClose={closeEditModal}
          onSaveSuccess={loadRecords}
        />
      )}

      {/* Modal Reutilizável de Ajuste de Ponto para o Histórico */}
      {employee && selectedHistoryDay && (
        <DayAdjustModal
          isOpen={!!selectedHistoryDay}
          date={selectedHistoryDay.date}
          times={selectedHistoryDay.times}
          employee={employee}
          onClose={() => setSelectedHistoryDay(null)}
          onSaveSuccess={async () => {
            await loadRecords();
            // Atualiza o estado local do dia selecionado para que o modal reflita a mudança
            const updatedDay = history.find(d => d.date === selectedHistoryDay.date);
            if (updatedDay) {
              setSelectedHistoryDay({
                date: updatedDay.date,
                times: updatedDay.times
              });
            }
          }}
        />
      )}
    </div>
  );
};
