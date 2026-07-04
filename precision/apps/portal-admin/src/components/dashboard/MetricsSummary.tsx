import React from 'react';
import { MetricData } from '@/types';

interface MetricsSummaryProps {
  metrics: MetricData | undefined;
  loading: boolean;
}

export const MetricsSummary: React.FC<MetricsSummaryProps> = ({
  metrics,
  loading,
}) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md">
      {/* Card 1: Total Funcionários */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col gap-sm shadow-sm hover:shadow-md transition-shadow duration-200 min-h-[140px] justify-between relative overflow-hidden">
        {loading ? (
          <div className="absolute inset-0 shimmer" />
        ) : (
          <>
            <div className="flex justify-between items-start">
              <span className="font-label-caps text-label-caps text-on-surface-variant">TOTAL DE FUNCIONÁRIOS</span>
              <span className="material-symbols-outlined text-primary bg-primary/5 p-sm rounded-full">groups</span>
            </div>
            <div className="font-display-time-mobile text-display-time-mobile text-on-surface mt-sm">
              {metrics?.totalEmployees}
            </div>
            <div className={`flex items-center gap-xs mt-xs ${
              metrics?.totalEmployeesGrowth?.startsWith('+0') ? 'text-on-surface-variant/70' : 'text-secondary'
            }`}>
              <span className="material-symbols-outlined text-[16px]">
                {metrics?.totalEmployeesGrowth?.startsWith('+0') ? 'trending_flat' : 'arrow_upward'}
              </span>
              <span className="font-body-sm text-body-sm font-semibold">{metrics?.totalEmployeesGrowth}</span>
            </div>
          </>
        )}
      </div>

      {/* Card 2: Presentes Agora */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col gap-sm shadow-sm hover:shadow-md transition-shadow duration-200 min-h-[140px] justify-between relative overflow-hidden">
        {loading ? (
          <div className="absolute inset-0 shimmer" />
        ) : (
          <>
            <div className="flex justify-between items-start">
              <span className="font-label-caps text-label-caps text-on-surface-variant">PRESENTES AGORA</span>
              <span className="material-symbols-outlined text-secondary bg-secondary-container/20 p-sm rounded-full">how_to_reg</span>
            </div>
            <div className="font-display-time-mobile text-display-time-mobile text-on-surface mt-sm">
              {metrics?.presentNow}
            </div>
            <div className="flex items-center gap-xs text-on-surface-variant mt-xs">
              <span className="font-body-sm text-body-sm">{metrics?.presentNowPercentage}</span>
            </div>
          </>
        )}
      </div>

      {/* Card 3: Pendências */}
      <div 
        className={`bg-surface-container-lowest border rounded-xl p-md flex flex-col gap-sm shadow-sm hover:shadow-md transition-all duration-200 min-h-[140px] justify-between relative overflow-hidden ${
          metrics && metrics.pendingRequestsCount > 0 ? 'border-error-container bg-error-container/5' : 'border-outline-variant'
        }`}
      >
        {loading ? (
          <div className="absolute inset-0 shimmer" />
        ) : (
          <>
            <div className="flex justify-between items-start">
              <span className={`font-label-caps text-label-caps ${metrics && metrics.pendingRequestsCount > 0 ? 'text-error font-bold' : 'text-on-surface-variant'}`}>
                PENDÊNCIAS DE REGISTRO
              </span>
              <span 
                className={`material-symbols-outlined p-sm rounded-full ${
                  metrics && metrics.pendingRequestsCount > 0 ? 'text-error bg-error-container/30 animate-pulse' : 'text-outline bg-surface-container-high'
                }`}
              >
                warning
              </span>
            </div>
            <div className="font-display-time-mobile text-display-time-mobile text-on-surface mt-sm">
              {metrics?.pendingRequestsCount}
            </div>
            <div className="flex items-center gap-xs text-on-surface-variant mt-xs">
              <span className="font-body-sm text-body-sm">Aguardando validação RH</span>
            </div>
          </>
        )}
      </div>

      {/* Card 4: Horas Extras */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col gap-sm shadow-sm hover:shadow-md transition-shadow duration-200 min-h-[140px] justify-between relative overflow-hidden">
        {loading ? (
          <div className="absolute inset-0 shimmer" />
        ) : (
          <>
            <div className="flex justify-between items-start">
              <span className="font-label-caps text-label-caps text-on-surface-variant">HORAS EXTRAS (MÊS)</span>
              <span className="material-symbols-outlined text-tertiary bg-tertiary-container/10 p-sm rounded-full">schedule</span>
            </div>
            <div className="font-display-time-mobile text-display-time-mobile text-on-surface mt-sm">
              {metrics?.overtimeHours}
            </div>
            <div className={`flex items-center gap-xs mt-xs ${
              metrics?.overtimeGrowth?.startsWith('-') ? 'text-success' : 
              metrics?.overtimeGrowth?.startsWith('0') ? 'text-secondary' : 'text-error'
            }`}>
              <span className="material-symbols-outlined text-[16px]">
                {metrics?.overtimeGrowth?.startsWith('-') ? 'trending_down' : 
                 metrics?.overtimeGrowth?.startsWith('0') ? 'trending_flat' : 'trending_up'}
              </span>
              <span className="font-body-sm text-body-sm font-semibold">{metrics?.overtimeGrowth}</span>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
