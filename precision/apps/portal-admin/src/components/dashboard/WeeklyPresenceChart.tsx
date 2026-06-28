import React from 'react';
import { WeeklyPresenceData } from '@/types';

interface WeeklyPresenceChartProps {
  weeklyPresence: WeeklyPresenceData[] | undefined;
  loading: boolean;
}

export const WeeklyPresenceChart: React.FC<WeeklyPresenceChartProps> = ({
  weeklyPresence,
  loading,
}) => {
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
              <h2 className="font-headline-md text-headline-md text-on-surface">Frequência Semanal de Presença</h2>
              <p className="text-body-sm text-on-surface-variant">Média de comparecimento dos colaboradores por dia da semana atual.</p>
            </div>
            <button className="text-primary font-label-caps text-label-caps px-md py-sm hover:bg-surface-container-high rounded-md transition-colors flex items-center gap-xs">
              VER DETALHES <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>

          {/* Bar Chart utilizing Flexbox/Tailwind */}
          <div className="flex-1 flex items-end gap-sm h-64 mt-md border-b border-outline-variant pb-xs relative">
            {/* Y Axis Labels */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-on-surface-variant font-label-caps text-label-caps pb-lg">
              <span>100%</span>
              <span>75%</span>
              <span>50%</span>
              <span>25%</span>
              <span>0%</span>
            </div>
            
            {/* Chart Area */}
            <div className="w-full pl-xl flex justify-around items-end h-full pt-md">
              {weeklyPresence?.map((day, idx) => (
                <div key={idx} className="w-12 md:w-16 flex flex-col items-center gap-xs group relative">
                  {/* Custom Tooltip */}
                  <div className="absolute bottom-full mb-2 bg-primary text-white text-xs px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-30">
                    Presença: {day.percentage}% ({day.dayLabel})
                  </div>
                  <div className="w-full bg-primary/15 rounded-t-sm h-48 relative overflow-hidden">
                    <div 
                      className="absolute bottom-0 w-full bg-primary rounded-t-sm transition-all duration-500 ease-out group-hover:bg-primary/80" 
                      style={{ height: `${day.percentage}%` }}
                    />
                  </div>
                  <span className="font-label-caps text-label-caps text-on-surface mt-sm tracking-tighter">{day.label}</span>
                  <span className="text-[10px] text-on-surface-variant font-bold mt-[-4px]">{day.dayLabel}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
