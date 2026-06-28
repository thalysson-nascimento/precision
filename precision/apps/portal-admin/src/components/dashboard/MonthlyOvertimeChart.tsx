import React from 'react';
import { MonthlyOvertimeData } from '@/types';

interface MonthlyOvertimeChartProps {
  monthlyOvertime: MonthlyOvertimeData[] | undefined;
  loading: boolean;
}

export const MonthlyOvertimeChart: React.FC<MonthlyOvertimeChartProps> = ({
  monthlyOvertime,
  loading,
}) => {
  // Encontrar o maior valor de horas para calcular rótulos do eixo Y e alturas proporcionais
  const maxHours = monthlyOvertime && monthlyOvertime.length > 0
    ? Math.max(...monthlyOvertime.map(m => m.hours), 1)
    : 10;

  const currentYear = new Date().getFullYear();

  return (
    <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm flex flex-col min-h-[360px] justify-between relative overflow-hidden">
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="animate-spin material-symbols-outlined text-primary text-[32px]">progress_activity</span>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-md">
            <div>
              <h2 className="font-headline-md text-headline-md text-on-surface">Comparativo de Horas Extras</h2>
              <p className="text-body-sm text-on-surface-variant">Total acumulado de horas extras por mês (Ano Atual: {currentYear}).</p>
            </div>
            <button className="text-primary font-label-caps text-label-caps px-md py-sm hover:bg-surface-container-high rounded-md transition-colors flex items-center gap-xs cursor-pointer">
              VER DETALHES <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>

          {/* Bar Chart utilizing Flexbox/Tailwind */}
          <div className="flex-1 flex items-end gap-sm h-64 mt-md border-b border-outline-variant pb-xs relative">
            {/* Y Axis Labels */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-on-surface-variant font-label-caps text-label-caps pb-lg">
              <span>{Math.round(maxHours)}h</span>
              <span>{Math.round(maxHours * 0.75)}h</span>
              <span>{Math.round(maxHours * 0.5)}h</span>
              <span>{Math.round(maxHours * 0.25)}h</span>
              <span>0h</span>
            </div>
            
            {/* Chart Area */}
            <div className="w-full pl-xl flex justify-around items-end h-full pt-md">
              {monthlyOvertime?.map((month, idx) => (
                <div key={idx} className="w-12 md:w-16 flex flex-col items-center gap-xs group relative">
                  {/* Custom Tooltip */}
                  <div className="absolute bottom-full mb-2 bg-primary text-white text-xs px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-30 whitespace-nowrap">
                    Horas: {month.hours}h ({month.label})
                  </div>
                  <div className="w-full bg-primary/15 rounded-t-sm h-48 relative overflow-hidden">
                    <div 
                      className="absolute bottom-0 w-full bg-primary rounded-t-sm transition-all duration-500 ease-out group-hover:bg-primary/80" 
                      style={{ height: `${month.percentage}%` }}
                    />
                  </div>
                  <span className="font-label-caps text-label-caps text-on-surface mt-sm tracking-tighter">{month.monthLabel}</span>
                  <span className="text-[10px] text-on-surface-variant font-bold mt-[-4px]">{month.hours}h</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
