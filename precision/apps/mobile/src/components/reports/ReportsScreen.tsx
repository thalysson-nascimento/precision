'use client';

import { reportService, ReportMonth, MonthlyReportsResponse } from '@precision/api-client';
import React, { useEffect, useState } from 'react';
import { useI18n } from '@/locales/useI18n';

export const ReportsScreen: React.FC = () => {
  const { t, locale } = useI18n();
  const [data, setData] = useState<MonthlyReportsResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setIsLoading(true);
        const res = await reportService.getMonthlyReports();
        setData(res);
      } catch (err) {
        console.error(err);
        setError(t('reports.loadError'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, []);

  // Helper para converter string "HH:MM" em número decimal de horas para o gráfico
  const timeStrToDecimal = (timeStr: string): number => {
    if (!timeStr || timeStr === '--:--') return 0;
    const [h, m] = timeStr.split(':').map(Number);
    return h + m / 60;
  };

  // Encontra o valor máximo para dimensionar a altura do gráfico
  const getMaxHoursValue = (reports: ReportMonth[]): number => {
    let max = 180; // Mínimo padrão de escala (180 horas)
    reports.forEach(r => {
      const worked = timeStrToDecimal(r.total);
      const expected = timeStrToDecimal(r.expected);
      if (worked > max) max = worked;
      if (expected > max) max = expected;
    });
    return max + 20; // Folga no topo
  };

  if (isLoading) {
    return <ReportsSkeleton />;
  }

  if (error || !data) {
    return (
      <div className="text-center py-xl bg-surface-container-low rounded-xl border border-dashed border-error/40 p-lg max-w-2xl mx-auto space-y-md">
        <span className="material-symbols-outlined text-error text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
          error
        </span>
        <p className="text-body-lg font-bold text-on-background">{error || 'Erro inesperado'}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-primary text-on-primary px-lg py-sm rounded-xl font-bold hover:bg-primary-container transition-colors cursor-pointer"
        >
          {t('common.tryAgain')}
        </button>
      </div>
    );
  }

  const { employee, reports, summary } = data;

  if (reports.length === 0) {
    return (
      <div className="text-center py-xl bg-surface-container-low rounded-xl border border-dashed border-outline-variant p-lg max-w-2xl mx-auto space-y-md">
        <span className="material-symbols-outlined text-outline text-4xl">
          analytics
        </span>
        <p className="text-body-lg font-bold text-on-background">
          {t('reports.noRecordsYet')}
        </p>
        <p className="text-body-sm text-on-surface-variant">
          {t('reports.noRecordsDesc')}
        </p>
      </div>
    );
  }

  const maxHours = getMaxHoursValue(reports);
  
  // Localize and format month key
  const formatMonthKey = (monthKey: string): string => {
    if (!monthKey) return '';
    const [year, month] = monthKey.split('-');
    const monthIndex = parseInt(month, 10) - 1;
    const tempDate = new Date(parseInt(year, 10), monthIndex, 1);
    const bcpLocale = locale === 'pt' ? 'pt-BR' : locale === 'en' ? 'en-US' : 'de-DE';
    const monthName = tempDate.toLocaleDateString(bcpLocale, { month: 'long' });
    const capitalizedMonthName = monthName.charAt(0).toUpperCase() + monthName.slice(1);
    return locale === 'pt' ? `${capitalizedMonthName}/${year}` : `${capitalizedMonthName} ${year}`;
  };

  // Encontrar relatório do mês atual (ou do último mês se não houver dados no banco para o corrente)
  const currentMonthKey = new Date().toISOString().slice(0, 7);
  const currentMonthReport = reports.find(r => r.monthKey === currentMonthKey) || reports[reports.length - 1];

  return (
    <div className="space-y-xl w-full">
      {/* Cabeçalho */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
        <div>
          <p className="text-body-sm text-on-surface-variant mt-xs">
            {employee.name} • <span className="font-semibold">{employee.role}</span>
          </p>
        </div>
        <div className="bg-surface-container p-sm px-md rounded-xl border border-outline-variant/30 text-body-sm text-on-surface font-semibold flex items-center gap-xs">
          <span className="material-symbols-outlined text-outline">calendar_month</span>
          {t('reports.fullWorkedPeriod')}
        </div>
      </section>

      {/* Cards de Resumo do Mês Atual */}
      {currentMonthReport && (
        <section className="grid grid-cols-2 gap-md w-full">
          {/* Card 1: Horas total trabalhadas */}
          <div className="glass-card rounded-xl p-md flex items-center gap-md border border-outline-variant/30 relative overflow-hidden">
            <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary shadow-sm flex-shrink-0">
              <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>schedule</span>
            </div>
            <div>
              <h4 className="text-label-caps font-label-caps text-on-surface-variant text-[10px]">{t('reports.totalHoursWorked')}</h4>
              <h2 className="text-headline-md md:text-headline-lg font-bold text-on-background mt-xs">{currentMonthReport.total}h</h2>
              <p className="text-body-sm text-outline mt-1 font-semibold text-[11px]">{formatMonthKey(currentMonthReport.monthKey)}</p>
            </div>
          </div>

          {/* Card 2: Horas extra trabalhadas */}
          <div className="glass-card rounded-xl p-md flex items-center gap-md border border-outline-variant/30 relative overflow-hidden">
            <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container shadow-sm flex-shrink-0">
              <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>trending_up</span>
            </div>
            <div>
              <h4 className="text-label-caps font-label-caps text-on-surface-variant text-[10px]">{t('reports.overtimeHoursWorked')}</h4>
              <h2 className="text-headline-md md:text-headline-lg font-bold text-secondary mt-xs">{currentMonthReport.totalOvertime}h</h2>
              <p className="text-body-sm text-outline mt-1 font-semibold text-[11px]">{formatMonthKey(currentMonthReport.monthKey)}</p>
            </div>
          </div>
        </section>
      )}

      {/* Gráfico de Barras Horizontais (Horas Trabalhadas vs. Previstas) */}
      <section className="glass-card rounded-xl p-lg space-y-lg">
        <div>
          <h3 className="text-headline-md font-headline-md text-on-background">{t('reports.monthlyWorkload')}</h3>
          <p className="text-body-sm text-on-surface-variant">{t('reports.workloadDescription')}</p>
        </div>

        {/* Gráfico Horizontal */}
        <div className="space-y-lg pt-sm">
          {reports.map(r => {
            const workedDec = timeStrToDecimal(r.total);
            const expectedDec = timeStrToDecimal(r.expected);

            // Largura em porcentagem (limita em no máximo 100%)
            const workedWidth = Math.min(100, Math.max(0, (workedDec / maxHours) * 100));
            const expectedWidth = Math.min(100, Math.max(0, (expectedDec / maxHours) * 100));

            return (
              <div key={r.monthKey} className="space-y-xs pb-sm border-b border-outline-variant/10 last:border-0 last:pb-0">
                {/* Título da Linha */}
                <div className="flex flex-col gap-[2px]">
                  <span className="text-body-lg font-bold text-on-background">
                    {formatMonthKey(r.monthKey)}
                  </span>
                  <span className="text-body-sm text-on-surface-variant font-medium">
                    {t('reports.worked')}: <strong className="text-on-background">{r.total}h</strong> / {t('reports.expected')}: {r.expected}h
                  </span>
                </div>

                {/* Linhas de Barras Horizontais */}
                <div className="space-y-[6px]">
                  {/* Barra Trabalhado */}
                  <div className="flex items-center">
                    <div className="flex-1 bg-surface-container/30 h-[10px] rounded-full overflow-hidden border border-outline-variant/10">
                      <div
                        style={{ width: `${workedWidth}%` }}
                        className="bg-primary h-full rounded-full transition-all duration-500 relative"
                      >
                        {workedDec > expectedDec && (
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-secondary-fixed/30 animate-pulse" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Barra Previsto */}
                  <div className="flex items-center">
                    <div className="flex-1 bg-surface-container/30 h-[10px] rounded-full overflow-hidden border border-outline-variant/10">
                      <div
                        style={{ width: `${expectedWidth}%` }}
                        className="bg-surface-container-high border border-outline-variant/50 h-full rounded-full transition-all duration-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legenda do Gráfico */}
        <div className="flex flex-wrap gap-md justify-center text-body-sm mt-sm pt-sm border-t border-outline-variant/10">
          <div className="flex items-center gap-xs">
            <span className="w-3 h-3 rounded bg-primary inline-block"></span>
            <span className="text-on-surface-variant font-medium">{t('reports.actualHours')}</span>
          </div>
          <div className="flex items-center gap-xs">
            <span className="w-3 h-3 rounded bg-surface-container-high border border-outline-variant inline-block"></span>
            <span className="text-on-surface-variant font-medium">{t('reports.expectedHours')}</span>
          </div>
        </div>
      </section>

      {/* Tabela de Dados Agregados por Mês */}
      <section className="space-y-md">
        <h3 className="text-headline-md font-headline-md text-on-background">{t('reports.monthlyBalanceDetails')}</h3>
        
        {/* Tabela Responsiva */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant text-label-caps font-label-caps text-on-surface-variant">
                  <th className="p-md font-bold whitespace-nowrap">{t('reports.monthYear')}</th>
                  <th className="p-md font-bold whitespace-nowrap text-right">{t('reports.total')}</th>
                  <th className="p-md font-bold whitespace-nowrap text-right">{t('reports.expectedHoursHeader')}</th>
                  <th className="p-md font-bold whitespace-nowrap text-right">{t('reports.totalOvertime')}</th>
                  <th className="p-md font-bold whitespace-nowrap text-right">{t('reports.overtimeNro')}</th>
                  <th className="p-md font-bold whitespace-nowrap text-right">{t('reports.maxDaily')}</th>
                  <th className="p-md font-bold whitespace-nowrap text-right">{t('reports.standard')}</th>
                  <th className="p-md font-bold whitespace-nowrap text-right">{t('reports.overtimeUpTo2')}</th>
                  <th className="p-md font-bold whitespace-nowrap text-right">{t('reports.overtimeAfter2')}</th>
                  <th className="p-md font-bold whitespace-nowrap text-right">{t('reports.saturday')}</th>
                  <th className="p-md font-bold whitespace-nowrap text-right">{t('reports.holidaySunday')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30 text-body-sm text-on-surface">
                {reports.map((row) => (
                  <tr key={row.monthKey} className="hover:bg-surface-container-low/40 transition-colors">
                    <td className="p-md font-bold flex items-center gap-xs whitespace-nowrap">
                      <span className="material-symbols-outlined text-primary text-lg">calendar_month</span>
                      {formatMonthKey(row.monthKey)}
                    </td>
                    <td className="p-md font-semibold text-right">{row.total}</td>
                    <td className="p-md text-right text-on-surface-variant">{row.expected || '--:--'}</td>
                    <td className="p-md font-semibold text-right text-secondary-container bg-secondary-container/5 rounded-md">{row.totalOvertime}</td>
                    <td className="p-md font-medium text-right text-on-surface-variant">{row.overtimeNro}</td>
                    <td className="p-md text-right text-outline">{row.maxDaily}</td>
                    <td className="p-md text-right text-outline">{row.standard}</td>
                    <td className="p-md text-right text-on-surface-variant">{row.overtimeUpTo2}</td>
                    <td className="p-md text-right text-on-surface-variant">{row.overtimeAfter2}</td>
                    <td className="p-md text-right text-on-surface-variant">{row.overtimeSaturday}</td>
                    <td className="p-md text-right text-on-surface-variant">{row.overtimeSunday}</td>
                  </tr>
                ))}
              </tbody>
              {/* Linha de Totais */}
              <tfoot>
                <tr className="bg-surface-container-low font-bold border-t border-outline-variant text-body-sm text-on-background">
                  <td className="p-md flex items-center gap-xs whitespace-nowrap">
                    <span className="material-symbols-outlined text-on-background text-lg">analytics</span>
                    {t('reports.accumulatedTotal')}
                  </td>
                  <td className="p-md text-right font-bold">{summary.totalWorked}</td>
                  <td className="p-md text-right font-bold text-on-surface-variant">{summary.totalExpected}</td>
                  <td className="p-md text-right font-bold text-secondary-container">{summary.totalOvertime}</td>
                  <td className="p-md text-right font-bold text-on-surface-variant">{summary.totalOvertimeNro}</td>
                  <td className="p-md text-right text-outline">--:--</td>
                  <td className="p-md text-right text-outline">--:--</td>
                  <td className="p-md text-right text-on-surface-variant">{summary.totalUpTo2}</td>
                  <td className="p-md text-right text-on-surface-variant">{summary.totalAfter2}</td>
                  <td className="p-md text-right text-on-surface-variant">{summary.totalSaturday}</td>
                  <td className="p-md text-right text-on-surface-variant">{summary.totalSunday}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

// Componente Local de Skeleton Loader
const ReportsSkeleton: React.FC = () => {
  return (
    <div className="space-y-xl w-full">
      {/* Header Skeleton */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
        <div className="space-y-sm w-full md:w-1/3">
          <div className="h-7 w-48 shimmer rounded"></div>
          <div className="h-4 w-64 shimmer rounded"></div>
        </div>
        <div className="h-10 w-44 shimmer rounded-xl"></div>
      </section>

      {/* Chart Card Skeleton */}
      <section className="glass-card rounded-xl p-lg space-y-lg">
        <div className="space-y-sm">
          <div className="h-6 w-36 shimmer rounded"></div>
          <div className="h-4 w-96 shimmer rounded"></div>
        </div>
        <div className="space-y-md">
          {[1, 2, 3].map(i => (
            <div key={i} className="space-y-sm">
              <div className="flex justify-between">
                <div className="h-5 w-24 shimmer rounded"></div>
                <div className="h-4 w-32 shimmer rounded"></div>
              </div>
              <div className="h-3 w-full bg-surface-container-low rounded-full shimmer"></div>
              <div className="h-3 w-4/5 bg-surface-container-low rounded-full shimmer"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Table Skeleton */}
      <section className="space-y-md">
        <div className="h-6 w-48 shimmer rounded"></div>
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden p-md space-y-md">
          <div className="h-10 w-full shimmer rounded"></div>
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-8 w-full shimmer rounded"></div>
          ))}
          <div className="h-12 w-full shimmer rounded pt-md"></div>
        </div>
      </section>
    </div>
  );
};
