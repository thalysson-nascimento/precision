'use client';

import React, { useEffect, useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { useI18n } from '@/locales/useI18n';

interface DateBlockage {
  id: string;
  date: string;
  reason: string;
}

export default function BlockagesPage() {
  const { t, locale } = useI18n();

  // State
  const [weeklyBlocks, setWeeklyBlocks] = useState<number[]>([]);
  const [dateBlocks, setDateBlocks] = useState<DateBlockage[]>([]);
  const [newDate, setNewDate] = useState('');
  const [newReason, setNewReason] = useState('');
  const [loading, setLoading] = useState(true);
  const [savingWeekly, setSavingWeekly] = useState(false);
  const [addingDate, setAddingDate] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [companyId, setCompanyId] = useState<string | null>(null);
  
  // Feedback alerts
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const fetchBlockages = async () => {
    try {
      setLoading(true);
      
      // 1. Resolve company context
      const compRes = await fetch('/api/admin/companies');
      let targetCompanyId = '';
      if (compRes.ok) {
        const compData = await compRes.json();
        if (compData && compData.length > 0) {
          targetCompanyId = compData[0].id;
          setCompanyId(targetCompanyId);
        }
      }

      if (targetCompanyId) {
        // 2. Fetch blockages for resolved company
        const res = await fetch(`/api/admin/blockages?companyId=${targetCompanyId}`);
        if (res.ok) {
          const data = await res.json();
          setWeeklyBlocks(data.weekdays || []);
          setDateBlocks(data.dates || []);
        }
      }

      // 3. Fetch dashboard pending requests for header count
      const dashRes = await fetch('/api/admin/dashboard');
      if (dashRes.ok) {
        const dashData = await dashRes.json();
        setPendingCount(dashData.metrics.pendingRequestsCount || 0);
      }
    } catch (error) {
      console.error('Erro ao buscar bloqueios:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlockages();
  }, []);

  const handleWeekdayToggle = (day: number) => {
    setWeeklyBlocks((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSaveWeekly = async () => {
    if (!companyId) {
      showToast('error', t('blockages.saveError'));
      return;
    }
    try {
      setSavingWeekly(true);
      const res = await fetch('/api/admin/blockages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'WEEKDAY',
          dayOfWeek: weeklyBlocks,
          companyIdParam: companyId,
        }),
      });

      if (res.ok) {
        showToast('success', t('blockages.saveSuccess'));
      } else {
        showToast('error', t('blockages.saveError'));
      }
    } catch (error) {
      showToast('error', t('blockages.saveError'));
    } finally {
      setSavingWeekly(false);
    }
  };

  const handleAddDateBlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyId) {
      showToast('error', t('blockages.saveError'));
      return;
    }
    if (!newDate) {
      showToast('error', t('blockages.dateRequired'));
      return;
    }
    if (!newReason.trim()) {
      showToast('error', t('blockages.reasonRequired'));
      return;
    }

    try {
      setAddingDate(true);
      const res = await fetch('/api/admin/blockages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'DATE',
          date: newDate,
          reason: newReason.trim(),
          companyIdParam: companyId,
        }),
      });

      if (res.ok) {
        const json = await res.json();
        setDateBlocks((prev) => [json.block, ...prev]);
        setNewDate('');
        setNewReason('');
        showToast('success', t('blockages.saveSuccess'));
      } else {
        const errJson = await res.json();
        if (errJson.error === 'duplicateBlock') {
          showToast('error', t('blockages.duplicateBlock'));
        } else {
          showToast('error', t('blockages.saveError'));
        }
      }
    } catch (error) {
      showToast('error', t('blockages.saveError'));
    } finally {
      setAddingDate(false);
    }
  };

  const handleDeleteDateBlock = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/blockages?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setDateBlocks((prev) => prev.filter((item) => item.id !== id));
        showToast('success', t('blockages.deleteSuccess'));
      } else {
        showToast('error', t('blockages.deleteError'));
      }
    } catch (error) {
      showToast('error', t('blockages.deleteError'));
    }
  };

  const weekdaysList = [
    { value: 1, label: t('blockages.monday') },
    { value: 2, label: t('blockages.tuesday') },
    { value: 3, label: t('blockages.wednesday') },
    { value: 4, label: t('blockages.thursday') },
    { value: 5, label: t('blockages.friday') },
    { value: 6, label: t('blockages.saturday'), isWeekend: true },
    { value: 0, label: t('blockages.sunday'), isWeekend: true },
  ];

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    if (locale === 'pt') return `${day}/${month}/${year}`;
    if (locale === 'de') return `${day}.${month}.${year}`;
    return dateStr; // YYYY-MM-DD
  };

  return (
    <div className="admin-theme bg-background text-on-surface font-body-sm min-h-screen">
      <div className="flex h-screen overflow-hidden">
        
        {/* Toast Notification Banner */}
        {toast && (
          <div className={`fixed top-4 right-4 z-50 flex items-center gap-xs px-md py-sm rounded-xl shadow-lg border text-white transition-all duration-300 ${toast.type === 'success' ? 'bg-secondary border-secondary/20' : 'bg-error border-error/20'}`}>
            <span className="material-symbols-outlined">{toast.type === 'success' ? 'check_circle' : 'error'}</span>
            <span className="font-semibold text-body-md">{toast.message}</span>
          </div>
        )}

        <Sidebar />

        <main className="flex-1 ml-0 md:ml-64 flex flex-col h-screen overflow-hidden bg-background">
          <Header pendingRequestsCount={pendingCount} />

          <div className="flex-1 overflow-y-auto p-container-margin md:p-xl">
            <div className="max-w-6xl mx-auto flex flex-col gap-lg pb-xl">

              {/* Page Header */}
              <header className="space-y-xs">
                <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">
                  {t('blockages.title')}
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {t('blockages.subtitle')}
                </p>
              </header>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <span className="animate-spin material-symbols-outlined text-[32px] text-primary">progress_activity</span>
                  <p className="mt-md font-semibold text-body-lg text-on-surface-variant">{t('common.loading')}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
                  
                  {/* Left/Middle Column: Blockage Settings Forms */}
                  <div className="lg:col-span-2 space-y-lg">
                    
                    {/* Card 1: Weekly Weekday blockages */}
                    <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm space-y-md">
                      <div className="border-b border-outline-variant pb-xs">
                        <h2 className="text-body-lg font-bold text-primary flex items-center gap-xs">
                          <span className="material-symbols-outlined text-[22px]">date_range</span>
                          {t('blockages.weeklyBlock')}
                        </h2>
                        <p className="text-body-sm text-on-surface-variant mt-[2px]">{t('blockages.weeklyBlockDesc')}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-sm pt-xs">
                        {weekdaysList.map((day) => {
                          const isChecked = weeklyBlocks.includes(day.value);
                          return (
                            <button
                              key={day.value}
                              type="button"
                              onClick={() => handleWeekdayToggle(day.value)}
                              className={`flex items-center justify-between p-md rounded-xl border transition-all text-left cursor-pointer active:scale-[0.98] ${isChecked ? 'bg-error/5 border-error text-error font-semibold' : 'bg-surface-container-low border-outline-variant/60 text-on-surface hover:border-primary/40'}`}
                            >
                              <div className="flex items-center gap-sm">
                                <span className={`material-symbols-outlined text-[20px] ${day.isWeekend ? 'text-secondary' : 'text-on-surface-variant'}`}>
                                  {day.isWeekend ? 'weekend' : 'calendar_today'}
                                </span>
                                <span className="text-body-md">{day.label}</span>
                              </div>
                              <span className="material-symbols-outlined text-[24px]">
                                {isChecked ? 'check_box' : 'check_box_outline_blank'}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      <div className="flex justify-end pt-sm border-t border-outline-variant/30">
                        <button
                          onClick={handleSaveWeekly}
                          disabled={savingWeekly}
                          className="h-12 px-lg bg-primary hover:bg-primary-container disabled:opacity-50 text-white font-bold rounded-xl flex items-center gap-xs cursor-pointer active:opacity-90 transition-all shadow-sm"
                        >
                          {savingWeekly ? (
                            <span className="animate-spin material-symbols-outlined text-[20px]">progress_activity</span>
                          ) : (
                            <span className="material-symbols-outlined text-[20px]">save</span>
                          )}
                          {t('blockages.saveWeekly')}
                        </button>
                      </div>
                    </section>

                    {/* Card 2: Date Holiday Exclusions Form */}
                    <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm space-y-md">
                      <div className="border-b border-outline-variant pb-xs">
                        <h2 className="text-body-lg font-bold text-primary flex items-center gap-xs">
                          <span className="material-symbols-outlined text-[22px]">event_busy</span>
                          {t('blockages.specificBlock')}
                        </h2>
                        <p className="text-body-sm text-on-surface-variant mt-[2px]">{t('blockages.specificBlockDesc')}</p>
                      </div>

                      <form onSubmit={handleAddDateBlock} className="grid grid-cols-1 md:grid-cols-3 gap-md items-end">
                        
                        {/* Date Input */}
                        <div className="space-y-xs">
                          <label htmlFor="block-date" className="block text-body-sm font-semibold text-on-surface">
                            {t('blockages.dateLabel')}
                          </label>
                          <input
                            id="block-date"
                            type="date"
                            value={newDate}
                            onChange={(e) => setNewDate(e.target.value)}
                            className="w-full h-12 px-md border border-outline rounded-xl bg-surface text-on-surface focus:border-primary outline-none transition-all text-body-md"
                          />
                        </div>

                        {/* Reason Input */}
                        <div className="space-y-xs md:col-span-2 flex flex-col md:flex-row gap-md items-end w-full">
                          <div className="space-y-xs w-full">
                            <label htmlFor="block-reason" className="block text-body-sm font-semibold text-on-surface">
                              {t('blockages.reasonLabel')}
                            </label>
                            <input
                              id="block-reason"
                              type="text"
                              placeholder={t('blockages.reasonPlaceholder')}
                              value={newReason}
                              onChange={(e) => setNewReason(e.target.value)}
                              className="w-full h-12 px-md border border-outline rounded-xl bg-surface text-on-surface focus:border-primary outline-none transition-all text-body-md"
                            />
                          </div>

                          <button
                            type="submit"
                            disabled={addingDate}
                            className="h-12 w-full md:w-auto px-lg bg-primary hover:bg-primary-container disabled:opacity-50 text-white font-bold rounded-xl flex items-center justify-center gap-xs cursor-pointer active:opacity-90 transition-all flex-shrink-0 shadow-sm"
                          >
                            {addingDate ? (
                              <span className="animate-spin material-symbols-outlined text-[20px]">progress_activity</span>
                            ) : (
                              <span className="material-symbols-outlined text-[20px]">add</span>
                            )}
                            {t('blockages.addBlock')}
                          </button>
                        </div>

                      </form>
                    </section>

                  </div>

                  {/* Right Column: Active Custom Blockage Dates List */}
                  <div className="lg:col-span-1">
                    <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm space-y-md h-full min-h-[400px] flex flex-col">
                      <div className="border-b border-outline-variant pb-xs flex items-center justify-between">
                        <h2 className="text-body-md font-bold text-on-surface uppercase tracking-wider flex items-center gap-xs">
                          <span className="material-symbols-outlined text-primary text-[20px]">event_available</span>
                          Datas Bloqueadas
                        </h2>
                        <span className="bg-secondary/15 text-secondary text-[11px] font-bold px-sm py-[2px] rounded-full">
                          {dateBlocks.length}
                        </span>
                      </div>

                      <div className="flex-1 overflow-y-auto space-y-sm max-h-[500px] pr-[2px]">
                        {dateBlocks.length === 0 ? (
                          <div className="flex flex-col items-center justify-center py-20 text-center text-on-surface-variant/60">
                            <span className="material-symbols-outlined text-[40px] mb-xs">calendar_today</span>
                            <p className="text-body-sm font-medium">{t('blockages.listEmpty')}</p>
                          </div>
                        ) : (
                          dateBlocks.map((block) => (
                            <div
                              key={block.id}
                              className="bg-surface-container-low border border-outline-variant/60 rounded-xl p-md flex items-center justify-between gap-sm hover:border-outline-variant transition-colors"
                            >
                              <div className="space-y-[2px] min-w-0">
                                <p className="font-bold text-body-md text-error flex items-center gap-[4px]">
                                  <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                                  {formatDate(block.date)}
                                </p>
                                <p className="text-body-sm font-medium text-on-surface truncate" title={block.reason}>
                                  {block.reason}
                                </p>
                              </div>

                              <button
                                type="button"
                                onClick={() => handleDeleteDateBlock(block.id)}
                                className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-error hover:bg-error/10 transition-colors cursor-pointer active:scale-95"
                                title={t('common.delete')}
                              >
                                <span className="material-symbols-outlined text-[20px]">delete</span>
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </section>
                  </div>

                </div>
              )}

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
