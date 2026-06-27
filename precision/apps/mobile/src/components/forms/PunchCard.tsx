'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { employeeService, Employee, HistoryDay } from '@precision/api-client';
import { DayAdjustModal } from '../ui/DayAdjustModal';

export const PunchCard: React.FC = () => {
  // Estado para localização
  const [location, setLocation] = useState<string>('Carregando...');

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
    } catch (e) {
      console.error('Erro ao carregar registros:', e);
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
  }, []);

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
          showToast('Registro de ponto confirmado com sucesso!');
          // Recarregar os registros (incluindo o histórico atualizado)
          await loadRecords();
        } else {
          showToast('Nenhum novo ponto pendente no horário atual.');
        }
      }
    } catch (e) {
      console.error(e);
      showToast('Erro ao confirmar o registro.');
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

  const handleHistoryDayClick = (day: HistoryDay) => {
    setSelectedHistoryDay({
      date: day.date,
      times: day.times
    });
  };



  // Verificar quais boxes de horário devem ficar desabilitados
  const isInputDisabled = (type: 'IN' | 'LUNCH_OUT' | 'LUNCH_IN' | 'OUT', contractTime: string, isConfirmed: boolean): boolean => {
    if (isConfirmed) return false;
    return !isSlotEligible(contractTime);
  };

  // Formatador de data para a listagem (ex: "2026-06-01" -> "Seg. 1 Jun")
  const formatHistoryDate = (dateStr: string): string => {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    
    // Obter dia da semana curto
    const weekday = date.toLocaleDateString('pt-BR', { weekday: 'short' });
    const capitalizedWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1).replace('.', '');
    
    // Dia do mês
    const dayNum = date.getDate();
    
    // Mês curto
    const monthShort = date.toLocaleDateString('pt-BR', { month: 'short' });
    const capitalizedMonth = monthShort.charAt(0).toUpperCase() + monthShort.slice(1).replace('.', '');
    
    return `${capitalizedWeekday}. ${dayNum} ${capitalizedMonth}`;
  };

  return (
    <div className="space-y-xl w-full">
      
      {/* Alerta de Pendência dinâmico com botão alinhado abaixo e à direita */}
      {!isLoading && incompleteDays > 0 && (
        <section className="w-full">
          <div className="bg-tertiary-fixed text-on-tertiary-fixed p-md rounded-xl flex flex-col gap-sm border border-tertiary-container shadow-sm">
            <div className="flex items-center gap-md">
              <span className="material-symbols-outlined text-tertiary text-2xl">warning</span>
              <div>
                <h2 className="text-body-lg font-bold">Pendência de Registro</h2>
                <p className="text-body-sm text-on-tertiary-fixed/80">
                  Você possui {incompleteDays} {incompleteDays === 1 ? 'dia' : 'dias'} com marcações incompletas.
                </p>
              </div>
            </div>
            {/* Botão alinhado abaixo e à direita */}
            <div className="flex justify-end w-full">
              <Link 
                href="/?tab=historico"
                className="bg-tertiary text-on-tertiary px-md py-xs rounded-lg text-label-caps font-label-caps hover:bg-tertiary-container transition-colors active:scale-95 duration-200 cursor-pointer block text-center"
              >
                AJUSTAR HORÁRIO
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Cartão de Registro Principal */}
      <section className="glass-card rounded-xl p-lg space-y-lg">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-label-caps font-label-caps text-on-surface-variant">REGISTRO DE HOJE</h3>
            <div className="flex items-center gap-xs text-primary mt-xs">
              <span className="material-symbols-outlined text-sm">location_on</span>
              <span className="text-body-sm font-semibold">{location}</span>
            </div>
          </div>
          <span className="material-symbols-outlined text-outline-variant">schedule</span>
        </div>
        
        {/* Horas Trabalhadas (Skeleton durante o load) */}
        <div className="text-center py-md">
          {isLoading ? (
            <div className="space-y-2">
              <div className="h-12 w-32 shimmer rounded mx-auto"></div>
              <div className="h-4 w-40 shimmer rounded mx-auto"></div>
            </div>
          ) : (
            <>
              <h2 className="text-display-time-mobile md:text-display-time font-display-time text-on-background tracking-tighter">
                {workedTime}
              </h2>
              <p className="text-body-sm text-on-surface-variant">Total de horas trabalhadas hoje</p>
            </>
          )}
        </div>
        
        {/* Time Grid (Skeletons durante o load) */}
        <div className="grid grid-cols-2 gap-md">
          
          {isLoading ? (
            [1, 2, 3, 4].map(i => (
              <div key={i} className="bg-surface-container-low p-md rounded-xl border border-outline-variant/30">
                <div className="flex justify-between items-start mb-sm">
                  <div className="h-4 w-12 shimmer rounded"></div>
                  <div className="h-4 w-4 shimmer rounded-full"></div>
                </div>
                <div className="flex items-center gap-sm mt-1">
                  <div className="h-5 w-5 shimmer rounded-full"></div>
                  <div className="h-6 w-16 shimmer rounded"></div>
                </div>
              </div>
            ))
          ) : (
            <>
              {/* Entrada */}
              <div 
                className={`p-md rounded-xl border transition-all duration-300 ${
                  isInputDisabled('IN', employee?.workStart || '08:00', entradaConfirmed)
                    ? 'bg-surface-container-lowest border-dashed border-outline-variant opacity-60'
                    : 'bg-surface-container-low border-secondary-container'
                }`}
              >
                <div className="flex justify-between items-start mb-sm">
                  <span className="text-label-caps font-label-caps text-on-surface-variant">Entrada</span>
                  {entradaConfirmed ? (
                    <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                  ) : (
                    !isInputDisabled('IN', employee?.workStart || '08:00', false) && (
                      <button 
                        onClick={() => openEditModal('IN')}
                        className="text-primary text-[10px] font-bold hover:underline cursor-pointer"
                      >
                        EDITAR
                      </button>
                    )
                  )}
                </div>
                <div className="flex items-center gap-sm">
                  <span className={`material-symbols-outlined ${entradaConfirmed ? 'text-secondary' : 'text-outline'}`} style={entradaConfirmed ? { fontVariationSettings: "'FILL' 1" } : undefined}>
                    login
                  </span>
                  <span className="text-headline-md font-headline-md">
                    {isInputDisabled('IN', employee?.workStart || '08:00', entradaConfirmed) ? '--:--' : entrada}
                  </span>
                </div>
              </div>
              
              {/* Saída Almoço */}
              <div 
                className={`p-md rounded-xl border transition-all duration-300 ${
                  isInputDisabled('LUNCH_OUT', employee?.lunchStart || '12:00', saidaAlmocoConfirmed)
                    ? 'bg-surface-container-lowest border-dashed border-outline-variant opacity-60'
                    : 'bg-surface-container-low border-secondary-container'
                }`}
              >
                <div className="flex justify-between items-start mb-sm">
                  <span className="text-label-caps font-label-caps text-on-surface-variant">Saída</span>
                  {saidaAlmocoConfirmed ? (
                    <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                  ) : (
                    !isInputDisabled('LUNCH_OUT', employee?.lunchStart || '12:00', false) && (
                      <button 
                        onClick={() => openEditModal('LUNCH_OUT')}
                        className="text-primary text-[10px] font-bold hover:underline cursor-pointer"
                      >
                        EDITAR
                      </button>
                    )
                  )}
                </div>
                <div className="flex items-center gap-sm">
                  <span className={`material-symbols-outlined ${saidaAlmocoConfirmed ? 'text-secondary' : 'text-outline'}`} style={saidaAlmocoConfirmed ? { fontVariationSettings: "'FILL' 1" } : undefined}>
                    logout
                  </span>
                  <span className="text-headline-md font-headline-md">
                    {isInputDisabled('LUNCH_OUT', employee?.lunchStart || '12:00', saidaAlmocoConfirmed) ? '--:--' : saidaAlmoco}
                  </span>
                </div>
              </div>
              
              {/* Retorno Almoço */}
              <div 
                className={`p-md rounded-xl border transition-all duration-300 ${
                  isInputDisabled('LUNCH_IN', employee?.lunchEnd || '13:00', retornoAlmocoConfirmed)
                    ? 'bg-surface-container-lowest border-dashed border-outline-variant opacity-60'
                    : 'bg-surface-container-low border-secondary-container'
                }`}
              >
                <div className="flex justify-between items-start mb-sm">
                  <span className="text-label-caps font-label-caps text-on-surface-variant">Retorno</span>
                  {retornoAlmocoConfirmed ? (
                    <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                  ) : (
                    !isInputDisabled('LUNCH_IN', employee?.lunchEnd || '13:00', false) && (
                      <button 
                        onClick={() => openEditModal('LUNCH_IN')}
                        className="text-primary text-[10px] font-bold hover:underline cursor-pointer"
                      >
                        EDITAR
                      </button>
                    )
                  )}
                </div>
                <div className="flex items-center gap-sm">
                  <span className={`material-symbols-outlined ${retornoAlmocoConfirmed ? 'text-secondary' : 'text-outline'}`} style={retornoAlmocoConfirmed ? { fontVariationSettings: "'FILL' 1" } : undefined}>
                    fastfood
                  </span>
                  <span className="text-headline-md font-headline-md">
                    {isInputDisabled('LUNCH_IN', employee?.lunchEnd || '13:00', retornoAlmocoConfirmed) ? '--:--' : retornoAlmoco}
                  </span>
                </div>
              </div>
              
              {/* Saída Final */}
              <div 
                className={`p-md rounded-xl border transition-all duration-300 ${
                  isInputDisabled('OUT', employee?.workEnd || '18:00', saidaFinalConfirmed)
                    ? 'bg-surface-container-lowest border-dashed border-outline-variant opacity-60'
                    : 'bg-surface-container-low border-secondary-container'
                }`}
              >
                <div className="flex justify-between items-start mb-sm">
                  <span className="text-label-caps font-label-caps text-on-surface-variant">Saída</span>
                  {saidaFinalConfirmed ? (
                    <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                  ) : (
                    !isInputDisabled('OUT', employee?.workEnd || '18:00', false) && (
                      <button 
                        onClick={() => openEditModal('OUT')}
                        className="text-primary text-[10px] font-bold hover:underline cursor-pointer"
                      >
                        EDITAR
                      </button>
                    )
                  )}
                </div>
                <div className="flex items-center gap-sm">
                  <span className={`material-symbols-outlined ${saidaFinalConfirmed ? 'text-secondary' : 'text-outline'}`} style={saidaFinalConfirmed ? { fontVariationSettings: "'FILL' 1" } : undefined}>
                    home
                  </span>
                  <span className="text-headline-md font-headline-md">
                    {isInputDisabled('OUT', employee?.workEnd || '18:00', saidaFinalConfirmed) ? '--:--' : saidaFinal}
                  </span>
                </div>
              </div>
            </>
          )}
          
        </div>
        
        {/* Action Button */}
        <button 
          disabled={isLoading || isPunching || !hasEligiblePunchesPending()}
          onClick={handlePunch}
          className="w-full bg-secondary text-on-secondary py-md rounded-xl text-headline-md font-headline-md shadow-lg shadow-secondary/20 hover:bg-on-secondary-fixed-variant transition-all active:scale-[0.97] hover:scale-[1.01] duration-150 cursor-pointer flex items-center justify-center gap-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPunching ? (
            <svg className="animate-spin h-6 w-6 text-on-secondary" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : (
            <>
              <span className="material-symbols-outlined">
                check_circle
              </span>
              <span>Confirmar registro</span>
            </>
          )}
        </button>
      </section>

      {/* Tabela de Histórico "Seus pontos registrados" dinâmico */}
      <section className="space-y-md">
        <div className="flex justify-between items-end">
          <h3 className="text-headline-md font-headline-md text-on-background">Seus pontos registrados</h3>
          {isLoading ? (
            /* Shimmer loader no mês/ano */
            <div className="h-5 w-24 shimmer rounded"></div>
          ) : (
            <span className="text-body-sm text-on-surface-variant font-semibold">{currentMonth}</span>
          )}
        </div>
        
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant divide-y divide-outline-variant/30 overflow-hidden shadow-sm">
          {isLoading ? (
            /* Skeleton rows na tabela de registros */
            [1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-md">
                <div className="flex flex-col gap-2">
                  <div className="h-5 w-28 shimmer rounded"></div>
                  <div className="h-4 w-48 shimmer rounded"></div>
                </div>
                <div className="w-6 h-6 rounded-full shimmer"></div>
              </div>
            ))
          ) : (
            /* Histórico Real vindo do banco - Filtrado para o mês atual */
            history
              .filter(day => day.date.startsWith(getTodayDateString().slice(0, 7)))
              .map((day) => (
              <div 
                key={day.date} 
                onClick={() => handleHistoryDayClick(day)}
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
                  /* Ícone de alerta em caso de pendências/incompletos */
                  <span className="material-symbols-outlined text-tertiary text-lg animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>
                    warning
                  </span>
                )}
              </div>
            ))
          )}
        </div>

        {!isLoading && (
          <button className="w-full text-primary font-bold py-md text-body-sm hover:bg-surface-container-high rounded-xl transition-colors cursor-pointer">
            VER HISTÓRICO COMPLETO
          </button>
        )}
      </section>

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
