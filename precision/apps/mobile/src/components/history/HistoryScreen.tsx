'use client';

import React, { useEffect, useState } from 'react';
import { employeeService, Employee, HistoryDay } from '@precision/api-client';
import { DayAdjustModal } from '../ui/DayAdjustModal';
import { useI18n } from '@/locales/useI18n';

export const HistoryScreen: React.FC = () => {
  const { t, locale } = useI18n();
  // Dados e Estado Principal
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [history, setHistory] = useState<HistoryDay[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Tabs
  const [activeTab, setActiveTab] = useState<'registrados' | 'pendencias'>('registrados');

  // Accordion de meses abertos/fechados (Guarda a chave e.g., 'Junho/2026')
  const [expandedMonths, setExpandedMonths] = useState<Record<string, boolean>>({
    'Junho/2026': true, // Junho aberto por padrão
  });

  // Estado para o modal de ajuste do dia selecionado
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    date: string;
    times: string[];
  }>({
    isOpen: false,
    date: '',
    times: [],
  });

  const processHistory = (res: any): HistoryDay[] => {
    const todayRecords = res.records || [];
    const inRec = todayRecords.find((r: any) => r.type === 'IN' && r.confirmed);
    const lunchOutRec = todayRecords.find((r: any) => r.type === 'LUNCH_OUT' && r.confirmed);
    const lunchInRec = todayRecords.find((r: any) => r.type === 'LUNCH_IN' && r.confirmed);
    const outRec = todayRecords.find((r: any) => r.type === 'OUT' && r.confirmed);
    
    const isTodayComplete = !!(inRec && lunchOutRec && lunchInRec && outRec);
    
    let historyList = res.history || [];
    if (isTodayComplete) {
      const d = new Date();
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const todayStr = `${year}-${month}-${day}`;
      
      const todayItem: HistoryDay = {
        date: todayStr,
        times: [
          inRec.time,
          lunchOutRec.time,
          lunchInRec.time,
          outRec.time
        ],
        isComplete: true
      };
      
      if (!historyList.some((dayItem: any) => dayItem.date === todayStr)) {
        historyList = [todayItem, ...historyList];
      }
    }
    return historyList;
  };

  const loadData = async () => {
    try {
      setIsLoading(true);
      const res = await employeeService.getTodayRecords();
      setEmployee(res.employee);
      setHistory(processHistory(res));
    } catch (e) {
      console.error('Erro ao carregar histórico:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      loadData();
    }, 0);
  }, []);

  const getMonthYearKey = (dateStr: string) => {
    const [year, month] = dateStr.split('-');
    const monthIndex = parseInt(month, 10) - 1;
    const tempDate = new Date(parseInt(year, 10), monthIndex, 1);
    const bcpLocale = locale === 'pt' ? 'pt-BR' : locale === 'en' ? 'en-US' : 'de-DE';
    const monthName = tempDate.toLocaleDateString(bcpLocale, { month: 'long' });
    const capitalizedMonthName = monthName.charAt(0).toUpperCase() + monthName.slice(1);
    return {
      monthName: capitalizedMonthName,
      year,
      monthIndex
    };
  };

  // Agrupa os dias da história por Mês/Ano
  const getGroupedMonths = (daysList: HistoryDay[]) => {
    const grouped: Record<string, { monthName: string; year: string; monthIndex: number; days: HistoryDay[] }> = {};
    
    daysList.forEach(day => {
      const { monthName, year, monthIndex } = getMonthYearKey(day.date);
      const key = `${monthName}/${year}`;
      if (!grouped[key]) {
        grouped[key] = {
          monthName,
          year,
          monthIndex,
          days: []
        };
      }
      grouped[key].days.push(day);
    });

    // Ordenar decrescente por ano e depois por mês
    return Object.values(grouped).sort((a, b) => {
      if (a.year !== b.year) {
        return b.year.localeCompare(a.year);
      }
      return b.monthIndex - a.monthIndex;
    });
  };

  // Toggle Accordion do Mês
  const toggleMonth = (key: string) => {
    setExpandedMonths(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Abre Modal de ajuste para o dia selecionado
  const handleDayClick = (day: HistoryDay) => {
    setModalState({
      isOpen: true,
      date: day.date,
      times: day.times,
    });
  };

  const handleModalClose = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  const handleSaveSuccess = async () => {
    // Recarregar os dados do histórico
    const res = await employeeService.getTodayRecords();
    const updatedHistory = processHistory(res);
    setHistory(updatedHistory);
    
    // Atualizar os valores do modal ativo para que a grade mude em tempo real
    const updatedDay = updatedHistory.find(d => d.date === modalState.date);
    if (updatedDay) {
      setModalState(prev => ({
        ...prev,
        times: updatedDay.times
      }));
    }
  };

  // Formatador de data para a listagem (ex: "2026-06-01" -> "Seg. 1 Jun")
  const formatHistoryDate = (dateStr: string): string => {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    
    const bcpLocale = locale === 'pt' ? 'pt-BR' : locale === 'en' ? 'en-US' : 'de-DE';
    
    const weekday = date.toLocaleDateString(bcpLocale, { weekday: 'short' });
    let capitalizedWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);
    if (locale === 'pt') {
      capitalizedWeekday = capitalizedWeekday.replace('.', '');
    }
    
    const dayNum = date.getDate();
    
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

  // Processa as listas agrupadas
  const groupedAll = getGroupedMonths(history);
  
  // Filtra apenas dias incompletos para a tab de pendências
  const pendingHistory = history.filter(d => !d.isComplete);
  const groupedPending = getGroupedMonths(pendingHistory);

  const pendingCount = pendingHistory.length;

  return (
    <div className="space-y-xl w-full">
      
      {/* Abas Superiores */}
      <div className="flex border-b border-outline-variant/30">
        <button 
          onClick={() => setActiveTab('registrados')}
          className={`flex-1 py-md text-center font-bold text-body-lg border-b-2 transition-all cursor-pointer ${
            activeTab === 'registrados' 
              ? 'border-primary text-primary' 
              : 'border-transparent text-on-surface-variant hover:text-on-surface'
          }`}
        >
          {t('history.registeredPunches')}
        </button>
        <button 
          onClick={() => setActiveTab('pendencias')}
          className={`flex-1 py-md text-center font-bold text-body-lg border-b-2 transition-all cursor-pointer flex items-center justify-center gap-xs ${
            activeTab === 'pendencias' 
              ? 'border-primary text-primary' 
              : 'border-transparent text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span>{t('history.pendingRegister')}</span>
          {!isLoading && pendingCount > 0 && (
            <span className="bg-tertiary text-on-tertiary text-[10px] font-bold px-sm py-[2px] rounded-full">
              {pendingCount}
            </span>
          )}
        </button>
      </div>

      {isLoading ? (
        /* SHIMMER LOADING DO HISTÓRICO */
        <div className="space-y-md">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 overflow-hidden shadow-sm p-md">
              <div className="flex justify-between items-center">
                <div className="h-6 w-24 shimmer rounded"></div>
                <div className="h-6 w-6 shimmer rounded-full"></div>
              </div>
              {i === 1 && (
                <div className="mt-md border-t border-outline-variant/20 pt-md space-y-md">
                  {[1, 2].map((j) => (
                    <div key={j} className="flex justify-between items-center">
                      <div className="space-y-sm">
                        <div className="h-5 w-28 shimmer rounded"></div>
                        <div className="h-4 w-44 shimmer rounded"></div>
                      </div>
                      <div className="h-6 h-6 rounded-full shimmer"></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : activeTab === 'registrados' ? (
        /* CONTEÚDO TAB: PONTOS REGISTRADOS */
        <section className="space-y-md">
          <div className="flex justify-between items-end mb-xs">
            <h3 className="text-headline-md font-headline-md text-on-background">{t('history.yourRegisteredPunches')}</h3>
            <span className="text-body-sm text-on-surface-variant font-semibold">{new Date().getFullYear()}</span>
          </div>

          <div className="space-y-md">
            {groupedAll.map((monthGroup) => {
              const key = `${monthGroup.monthName}/${monthGroup.year}`;
              const isExpanded = !!expandedMonths[key];

              return (
                <div 
                  key={key} 
                  className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 overflow-hidden shadow-sm transition-all"
                >
                  {/* Cabeçalho do Mês Accordion */}
                  <button 
                    onClick={() => toggleMonth(key)}
                    className="w-full flex justify-between items-center p-md hover:bg-surface-container-low transition-colors font-bold text-body-lg text-on-background cursor-pointer"
                  >
                    <span>{monthGroup.monthName}</span>
                    <span className="material-symbols-outlined text-outline">
                      {isExpanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
                    </span>
                  </button>

                  {/* Lista de dias do mês */}
                  {isExpanded && (
                    <div className="border-t border-outline-variant/20 divide-y divide-outline-variant/10">
                      {monthGroup.days.map((day) => (
                        <div 
                          key={day.date} 
                          onClick={() => handleDayClick(day)}
                          className="flex items-center justify-between p-md hover:bg-surface-container-low transition-colors group cursor-pointer"
                        >
                          <div className="flex flex-col">
                            <span className="text-body-lg font-bold">{formatHistoryDate(day.date)}</span>
                            <span className="text-body-sm text-on-surface-variant">
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
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ) : (
        /* CONTEÚDO TAB: PENDÊNCIAS DE REGISTRO */
        <section className="space-y-md">
          <div className="flex justify-between items-end mb-xs">
            <h3 className="text-headline-md font-headline-md text-on-background">{t('history.pendingRegister')}</h3>
            <span className="text-body-sm text-on-surface-variant font-semibold">{new Date().getFullYear()}</span>
          </div>

          {groupedPending.length === 0 ? (
            <div className="text-center py-xl bg-surface-container-low rounded-xl border border-dashed border-outline-variant/40">
              <span className="material-symbols-outlined text-secondary text-4xl mb-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                check_circle
              </span>
              <p className="text-body-lg font-bold text-on-background">{t('history.noPendingPunches')}</p>
              <p className="text-body-sm text-on-surface-variant mt-xs">{t('history.noPendingPunchesDesc')}</p>
            </div>
          ) : (
            <div className="space-y-md">
              {groupedPending.map((monthGroup) => {
                const key = `pending-${monthGroup.monthName}/${monthGroup.year}`;
                const isExpanded = expandedMonths[key] !== false; // Aberto por padrão nas pendências

                return (
                  <div 
                    key={key} 
                    className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 overflow-hidden shadow-sm transition-all"
                  >
                    {/* Cabeçalho do Mês */}
                    <button 
                      onClick={() => toggleMonth(key)}
                      className="w-full flex justify-between items-center p-md hover:bg-surface-container-low transition-colors font-bold text-body-lg text-on-background cursor-pointer"
                    >
                      <span className="flex items-center gap-sm">
                        <span>{monthGroup.monthName}</span>
                        <span className="bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold px-sm py-[2px] rounded-full">
                          {t('history.pendingCountLabel', {
                            count: String(monthGroup.days.length),
                            word: monthGroup.days.length === 1 ? t('history.pendingWordSingular') : t('history.pendingWordPlural')
                          })}
                        </span>
                      </span>
                      <span className="material-symbols-outlined text-outline">
                        {isExpanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
                      </span>
                    </button>

                    {/* Lista de dias pendentes */}
                    {isExpanded && (
                      <div className="border-t border-outline-variant/20 divide-y divide-outline-variant/10">
                        {monthGroup.days.map((day) => (
                          <div 
                            key={day.date} 
                            onClick={() => handleDayClick(day)}
                            className="flex items-center justify-between p-md hover:bg-surface-container-low transition-colors group cursor-pointer"
                          >
                            <div className="flex flex-col">
                              <span className="text-body-lg font-bold">{formatHistoryDate(day.date)}</span>
                              <span className="text-body-sm text-on-surface-variant">
                                {day.times.join(' • ')}
                              </span>
                            </div>
                            <span className="material-symbols-outlined text-tertiary text-lg animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>
                              warning
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* Modal Reutilizável de Ajuste de Ponto */}
      {employee && modalState.isOpen && (
        <DayAdjustModal
          isOpen={modalState.isOpen}
          date={modalState.date}
          times={modalState.times}
          employee={employee}
          onClose={handleModalClose}
          onSaveSuccess={handleSaveSuccess}
        />
      )}
    </div>
  );
};
