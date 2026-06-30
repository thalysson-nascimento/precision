'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useI18n } from '@/locales/useI18n';

interface MonthlyStat {
  monthKey: string;
  label: string;
  workedHours: number;
  expectedHours: number;
  overtimeHours: number;
}

interface EmpHours {
  name: string;
  role: string;
  hours: number;
}

interface EmpListItem {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  teamName: string;
}

interface CompanyInfo {
  id?: string;
  name: string;
  address: string;
  number?: string;
  contact: string;
}

interface ReportData {
  company?: CompanyInfo;
  team?: {
    id: string;
    name: string;
  };
  employee?: {
    id: string;
    name: string;
    email: string;
    role: string;
    contractNumber: string;
    workStart: string;
    workEnd: string;
    lunchStart: string;
    lunchEnd: string;
  };
  monthlyStats?: MonthlyStat[];
  employeesHours?: EmpHours[];
  activeCount?: number;
  inactiveCount?: number;
  employees?: EmpListItem[];
  totalWorked?: string;
  totalExpected?: string;
  totalOvertime?: string;
  records?: {
    date: string;
    punches: { type: string; time: string }[];
    worked: string;
    expected: string;
    balance: string;
    balanceRaw: number;
  }[];
}

function PrintReportContent() {
  const { t, locale } = useI18n();
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || 'company';
  const id = searchParams.get('id') || '';

  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/admin/reports?type=${type}&id=${id}`);
        if (res.ok) {
          const json = await res.json();
          setData(json);
          // Trigger print dialog after a slight delay for rendering
          setTimeout(() => {
            window.print();
          }, 800);
        }
      } catch (err) {
        console.error('Erro ao carregar dados do relatório para impressão:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [type, id]);

  const getSlotLabel = (slotType: string) => {
    if (slotType === 'IN') return t('reports.entry');
    if (slotType === 'LUNCH_OUT') return t('reports.lunchStart');
    if (slotType === 'LUNCH_IN') return t('reports.lunchEnd');
    return t('reports.exit');
  };

  const formatPunchesText = (punches: { type: string; time: string }[] | undefined) => {
    if (!punches || !Array.isArray(punches)) return '-';
    return punches.map(p => `${getSlotLabel(p.type)}: ${p.time}`).join(' | ');
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black p-xl">
        <span className="animate-spin material-symbols-outlined text-[32px] text-primary">progress_activity</span>
        <p className="mt-md font-semibold text-body-lg">{t('common.loading')}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black p-xl">
        <span className="material-symbols-outlined text-[48px] text-error">error</span>
        <p className="mt-md font-semibold text-body-lg">{t('reports.loadError')}</p>
      </div>
    );
  }

  const dateNow = new Date().toLocaleDateString(locale === 'pt' ? 'pt-BR' : locale === 'en' ? 'en-US' : 'de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const maxWorkedHours = data.monthlyStats && data.monthlyStats.length > 0
    ? Math.max(...data.monthlyStats.map(s => Math.max(s.workedHours, s.expectedHours)), 1)
    : 100;

  const maxOvertimeHours = data.monthlyStats && data.monthlyStats.length > 0
    ? Math.max(...data.monthlyStats.map(s => s.overtimeHours), 1)
    : 10;

  return (
    <div className="bg-white text-black min-h-screen p-md md:p-xl font-sans relative">
      
      {/* Printable page controls (hidden in print) */}
      <div className="no-print bg-slate-100 border border-slate-200 rounded-xl p-md flex items-center justify-between mb-xl max-w-4xl mx-auto shadow-sm">
        <div className="flex items-center gap-xs">
          <span className="material-symbols-outlined text-primary">print</span>
          <span className="font-semibold text-slate-800 text-body-md">{t('reports.printPreview')}</span>
        </div>
        <div className="flex items-center gap-md">
          <button 
            onClick={() => window.close()}
            className="px-md py-sm bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg font-bold text-body-sm transition-colors cursor-pointer"
          >
            {t('common.close')}
          </button>
          <button 
            onClick={() => window.print()}
            className="px-md py-sm bg-primary text-white rounded-lg font-bold text-body-sm hover:bg-primary-container transition-colors cursor-pointer shadow-sm"
          >
            {t('reports.printSave')}
          </button>
        </div>
      </div>

      {/* A4 Shell Layout container */}
      <div className="max-w-[800px] mx-auto space-y-xl border border-transparent">
        
        {/* Header Branding */}
        <header className="flex justify-between items-start border-b border-black pb-md">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-primary">Precision</h1>
            <p className="text-xs text-slate-500 uppercase font-semibold mt-1">{t('reports.frequencyControl')}</p>
          </div>
          <div className="text-right text-xs">
            <h3 className="font-bold text-slate-800">{t('reports.printTitle')}</h3>
            <p className="text-slate-500 mt-[2px]">{t('reports.dateGenerated')}: {dateNow}</p>
          </div>
        </header>

        {/* Corporate Header Info Cards */}
        <section className="bg-slate-50 border border-slate-200 rounded-lg p-md grid grid-cols-2 gap-md text-xs">
          <div>
            <h4 className="font-bold text-slate-800 border-b border-slate-200 pb-[4px] mb-xs uppercase">{t('reports.company')}</h4>
            <p className="font-semibold text-sm text-slate-900">{data.company?.name || data.employee?.name}</p>
            <p className="text-slate-600 mt-[2px]">{data.company?.address || t('settings.companyAddress')}</p>
            <p className="text-slate-600">{data.company?.contact}</p>
          </div>
          <div>
            <h4 className="font-bold text-slate-800 border-b border-slate-200 pb-[4px] mb-xs uppercase">{t('reports.emissionDetails')}</h4>
            {type === 'company' && (
              <>
                <p><span className="font-semibold">{t('reports.status')}:</span> {t('reports.companyConsolidated')}</p>
                <p className="mt-[2px]"><span className="font-semibold">{t('reports.activeEmployees')}:</span> {data.activeCount}</p>
                <p><span className="font-semibold">{t('reports.inactiveEmployees')}:</span> {data.inactiveCount}</p>
              </>
            )}
            {type === 'team' && (
              <>
                <p><span className="font-semibold">{t('reports.group')}:</span> {data.team?.name}</p>
                <p className="mt-[2px]"><span className="font-semibold">{t('reports.activeEmployees')}:</span> {data.activeCount}</p>
                <p><span className="font-semibold">{t('reports.inactiveEmployees')}:</span> {data.inactiveCount}</p>
              </>
            )}
            {type === 'employee' && data.employee && (
              <>
                <p><span className="font-semibold">{t('reports.employee')}:</span> {data.employee.name}</p>
                <p className="mt-[2px]"><span className="font-semibold">{t('common.role')}:</span> {data.employee.role}</p>
                <p><span className="font-semibold">{t('reports.contract')}:</span> {data.employee.contractNumber}</p>
                <p><span className="font-semibold">{t('reports.schedule')}:</span> {data.employee.workStart}h - {data.employee.workEnd}h ({t('reports.lunch')}: {data.employee.lunchStart}h - {data.employee.lunchEnd}h)</p>
              </>
            )}
          </div>
        </section>

        {/* -------------------- STATISTICAL REPORTS & CHARTS (FOR COMPANY OR TEAM) -------------------- */}
        {(type === 'company' || type === 'team') && data.monthlyStats && (
          <section className="space-y-lg page-break-after">
            
            <h3 className="text-md font-bold text-slate-800 border-b border-slate-300 pb-[4px] uppercase">{t('reports.summary')}</h3>

            <div className="grid grid-cols-2 gap-lg pt-sm">
              
              {/* Chart 1: Worked vs Expected Hours */}
              <div className="border border-slate-200 rounded-lg p-md flex flex-col justify-between min-h-[220px]">
                <h4 className="text-xs font-bold text-slate-700 text-center mb-sm">{t('reports.workedVsExpected')}</h4>
                
                {/* Visual Chart Bars (Pure HTML/CSS vector bars) */}
                <div className="flex justify-around items-end h-32 border-b border-slate-300 pb-xs relative px-xs mt-sm">
                  {data.monthlyStats.map((s, idx) => {
                    const workedPct = (s.workedHours / maxWorkedHours) * 100;
                    const expectedPct = (s.expectedHours / maxWorkedHours) * 100;

                    return (
                      <div key={idx} className="flex gap-[4px] items-end h-full">
                        {/* Expected bar */}
                        <div className="w-3 bg-slate-300 rounded-t-sm" style={{ height: `${expectedPct}%` }} title={`Previsto: ${s.expectedHours}h`} />
                        {/* Worked bar */}
                        <div className="w-3 bg-primary rounded-t-sm" style={{ height: `${workedPct}%` }} title={`Trabalhado: ${s.workedHours}h`} />
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-around text-[9px] text-slate-600 mt-xs font-semibold">
                  {data.monthlyStats.map((s, idx) => (
                    <span key={idx}>{s.label}</span>
                  ))}
                </div>
                
                {/* Legends */}
                <div className="flex gap-md justify-center text-[10px] text-slate-600 mt-sm">
                  <div className="flex items-center gap-[4px]">
                    <span className="w-2.5 h-2.5 bg-primary rounded-sm inline-block"></span>
                    <span>{t('reports.hoursWorked')}</span>
                  </div>
                  <div className="flex items-center gap-[4px]">
                    <span className="w-2.5 h-2.5 bg-slate-300 rounded-sm inline-block"></span>
                    <span>{t('reports.hoursExpected')}</span>
                  </div>
                </div>
              </div>

              {/* Chart 2: Overtime trend */}
              <div className="border border-slate-200 rounded-lg p-md flex flex-col justify-between min-h-[220px]">
                <h4 className="text-xs font-bold text-slate-700 text-center mb-sm">{t('reports.overtimeComparative')}</h4>
                
                <div className="flex justify-around items-end h-32 border-b border-slate-300 pb-xs relative px-sm mt-sm">
                  {data.monthlyStats.map((s, idx) => {
                    const pct = (s.overtimeHours / maxOvertimeHours) * 100;
                    return (
                      <div key={idx} className="flex flex-col items-center w-8 group">
                        <span className="text-[9px] font-bold text-secondary mb-[2px]">{s.overtimeHours}h</span>
                        <div className="w-4 bg-secondary rounded-t-sm" style={{ height: `${Math.max(pct, 5)}%` }} />
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-around text-[9px] text-slate-600 mt-xs font-semibold">
                  {data.monthlyStats.map((s, idx) => (
                    <span key={idx}>{s.label}</span>
                  ))}
                </div>

                {/* Legends */}
                <div className="flex justify-center text-[10px] text-slate-600 mt-sm">
                  <div className="flex items-center gap-[4px]">
                    <span className="w-2.5 h-2.5 bg-secondary rounded-sm inline-block"></span>
                    <span>{t('reports.overtime')} ({t('reports.accumulatedOvertime')})</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Top employees distribution (Horizontal Bars Chart) */}
            {data.employeesHours && data.employeesHours.length > 0 && (
              <div className="border border-slate-200 rounded-lg p-md space-y-sm mt-md">
                <h4 className="text-xs font-bold text-slate-700 border-b border-slate-100 pb-xs">{t('reports.hoursDistribution')}</h4>
                
                <div className="space-y-xs pt-xs">
                  {data.employeesHours.map((emp, idx) => {
                    const maxH = Math.max(...(data.employeesHours?.map(e => e.hours) || [1]), 1);
                    const widthPct = (emp.hours / maxH) * 100;
                    return (
                      <div key={idx} className="flex items-center text-[11px] gap-sm">
                        <span className="w-28 font-semibold truncate text-slate-800">{emp.name}</span>
                        <div className="flex-1 bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200/50">
                          <div className="bg-primary h-full rounded-full" style={{ width: `${widthPct}%` }} />
                        </div>
                        <span className="w-12 text-right font-bold text-slate-700">{emp.hours}h</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </section>
        )}

        {/* -------------------- STATISTICAL REPORTS & SUMMARY (FOR INDIVIDUAL EMPLOYEE) -------------------- */}
        {type === 'employee' && (
          <section className="grid grid-cols-3 gap-md text-center">
            <div className="border border-slate-200 rounded-lg p-sm bg-slate-50">
              <h5 className="text-[10px] font-bold text-slate-500 uppercase">{t('reports.totalWorked')}</h5>
              <p className="text-lg font-bold text-primary mt-[2px]">{data.totalWorked}h</p>
            </div>
            <div className="border border-slate-200 rounded-lg p-sm bg-slate-50">
              <h5 className="text-[10px] font-bold text-slate-500 uppercase">{t('reports.totalExpected')}</h5>
              <p className="text-lg font-bold text-slate-800 mt-[2px]">{data.totalExpected}h</p>
            </div>
            <div className="border border-slate-200 rounded-lg p-sm bg-slate-50">
              <h5 className="text-[10px] font-bold text-slate-500 uppercase">{t('reports.totalOvertime')}</h5>
              <p className="text-lg font-bold text-secondary mt-[2px]">{data.totalOvertime}h</p>
            </div>
          </section>
        )}

        {/* -------------------- EMPLOYEES TABULAR DATA LIST (FOR COMPANY OR TEAM) -------------------- */}
        {(type === 'company' || type === 'team') && data.employees && (
          <section className="space-y-sm">
            <h3 className="text-md font-bold text-slate-800 border-b border-slate-300 pb-[4px] uppercase">{t('employees.title')}</h3>
            
            <table className="w-full text-left border-collapse text-[10px]">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-300 font-bold text-slate-700">
                  <th className="p-sm">{t('common.name')}</th>
                  <th className="p-sm">{t('common.role')}</th>
                  <th className="p-sm">{t('common.email')}</th>
                  {type === 'company' && <th className="p-sm">{t('reports.group')}</th>}
                  <th className="p-sm">{t('reports.status')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {data.employees.map((emp, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-sm font-semibold">{emp.name}</td>
                    <td className="p-sm text-slate-600">{emp.role}</td>
                    <td className="p-sm text-slate-600">{emp.email}</td>
                    {type === 'company' && <td className="p-sm text-slate-600">{emp.teamName}</td>}
                    <td className="p-sm">
                      <span className={`inline-block px-sm py-[2px] rounded-full text-[9px] font-bold ${emp.isActive ? 'bg-secondary/10 text-secondary' : 'bg-slate-200 text-slate-600'}`}>
                        {emp.isActive ? t('common.active') : t('common.inactive')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {/* -------------------- INDIVIDUAL REGISTER LOGS TABULAR RECORD (FOR EMPLOYEE) -------------------- */}
        {type === 'employee' && data.records && (
          <section className="space-y-sm">
            <h3 className="text-md font-bold text-slate-800 border-b border-slate-300 pb-[4px] uppercase">{t('reports.employeeDetails')}</h3>

            <table className="w-full text-left border-collapse text-[10px]">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-300 font-bold text-slate-700">
                  <th className="p-sm">{t('reports.date')}</th>
                  <th className="p-sm">{t('reports.punches')}</th>
                  <th className="p-sm text-right">{t('reports.hoursWorked')}</th>
                  <th className="p-sm text-right">{t('reports.hoursExpected')}</th>
                  <th className="p-sm text-right">{t('reports.balance')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {data.records.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-md text-center text-slate-500">
                      {t('reports.noPunchesFound')}
                    </td>
                  </tr>
                ) : (
                  data.records.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-sm font-semibold">{row.date}</td>
                      <td className="p-sm text-slate-600">{formatPunchesText(row.punches) || '-'}</td>
                      <td className="p-sm text-right font-medium">{row.worked}</td>
                      <td className="p-sm text-right text-slate-600">{row.expected}</td>
                      <td className={`p-sm text-right font-bold ${row.balanceRaw >= 0 ? 'text-secondary' : 'text-error'}`}>
                        {row.balance}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </section>
        )}

        {/* Signatures Areas (Supervisor and employee authorization signature slots) */}
        <section className="grid grid-cols-2 gap-xl pt-16 mt-16 text-center text-xs">
          <div className="space-y-xs">
            <div className="border-t border-slate-400 mx-lg pt-sm"></div>
            <p className="font-bold text-slate-800">{t('reports.signatureSupervisor')}</p>
            <p className="text-[10px] text-slate-500">{t('reports.hrDepartment')}</p>
          </div>
          <div className="space-y-xs">
            <div className="border-t border-slate-400 mx-lg pt-sm"></div>
            <p className="font-bold text-slate-800">
              {type === 'employee' ? t('reports.signatureEmployee') : t('reports.companyRepresentative')}
            </p>
            <p className="text-[10px] text-slate-500">{t('reports.signatureDesc')}</p>
          </div>
        </section>

      </div>

      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            background-color: white !important;
            color: black !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .page-break-after {
            page-break-after: always;
          }
        }
      `}</style>
    </div>
  );
}

export default function PrintReportPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black p-xl">
        <span className="animate-spin material-symbols-outlined text-[32px] text-primary">progress_activity</span>
        <p className="mt-md font-semibold text-body-lg">Inicializando página...</p>
      </div>
    }>
      <PrintReportContent />
    </Suspense>
  );
}
