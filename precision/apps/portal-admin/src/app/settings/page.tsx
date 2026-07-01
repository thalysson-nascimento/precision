'use client';

import React, { useEffect, useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { useI18n } from '@/locales/useI18n';
import { Locale } from '@/locales';

export default function SettingsPage() {
  const { t, locale, setLocale } = useI18n();
  const [pendingCount, setPendingCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Company details state
  const [company, setCompany] = useState<any>(null);
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyNumber, setCompanyNumber] = useState('');
  const [companyContact, setCompanyContact] = useState('');

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchSettingsData = async () => {
    try {
      // 1. Fetch dashboard metrics
      const dashRes = await fetch('/api/admin/dashboard');
      if (dashRes.ok) {
        const dashData = await dashRes.json();
        setPendingCount(dashData.metrics.pendingRequestsCount || 0);
      }

      // 2. Fetch companies list to edit details
      const compRes = await fetch('/api/admin/companies');
      if (compRes.ok) {
        const compData = await compRes.json();
        if (compData && compData.length > 0) {
          const comp = compData[0];
          setCompany(comp);
          setCompanyName(comp.name);
          setCompanyAddress(comp.address);
          setCompanyNumber(comp.number);
          setCompanyContact(comp.contact);
        }
      }
    } catch (e) {
      console.error('Erro ao buscar dados das configurações:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettingsData();
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company) return;

    setSaveLoading(true);
    try {
      const res = await fetch(`/api/admin/companies/${company.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: companyName,
          address: companyAddress,
          number: companyNumber,
          contact: companyContact,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        showToast(t('settings.saveSuccess'), 'success');
        setCompany(result);
      } else {
        showToast(result.error || t('settings.saveError'), 'error');
      }
    } catch (err) {
      console.error(err);
      showToast(t('settings.saveError'), 'error');
    } finally {
      setSaveLoading(false);
    }
  };

  const formatPlanEndsAt = (endsAtStr: string) => {
    if (!endsAtStr) return 'N/A';
    const date = new Date(endsAtStr);
    return date.toLocaleDateString(locale === 'pt' ? 'pt-BR' : locale === 'en' ? 'en-US' : 'de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.href = '/login';
    } catch (err) {
      console.error('Erro ao fazer logout:', err);
    }
  };

  return (
    <div className="admin-theme bg-background text-on-surface font-body-sm min-h-screen">
      <div className="flex h-screen overflow-hidden">
        
        {/* Toast Notification */}
        {toast && (
          <div className={`fixed top-4 right-4 z-50 px-md py-sm rounded-lg shadow-lg text-white font-semibold transition-all duration-300 transform scale-100 flex items-center gap-sm ${toast.type === 'success' ? 'bg-secondary' : 'bg-error'}`}>
            <span className="material-symbols-outlined">{toast.type === 'success' ? 'check_circle' : 'error'}</span>
            <span>{toast.message}</span>
          </div>
        )}

        <Sidebar />

        <main className="flex-1 ml-0 md:ml-64 flex flex-col h-screen overflow-hidden bg-background">
          <Header pendingRequestsCount={pendingCount} />

          <div className="flex-1 overflow-y-auto p-container-margin md:p-xl">
            <div className="max-w-[800px] mx-auto flex flex-col gap-xl">
              
              {/* Header Title */}
              <div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface">{t('common.settings')}</h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant mt-xs">
                  {t('common.preferences')}
                </p>
              </div>

              {loading ? (
                <div className="p-xl flex justify-center items-center h-64">
                  <span className="animate-spin material-symbols-outlined text-primary text-[32px]">progress_activity</span>
                </div>
              ) : (
                <div className="space-y-xl">
                  
                  {/* Company settings Form */}
                  {company && (
                    <form 
                      onSubmit={handleSaveSettings}
                      className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg md:p-xl shadow-sm space-y-lg"
                    >
                      <h2 className="text-body-lg font-bold text-primary border-b border-outline-variant pb-xs flex items-center gap-xs">
                        <span className="material-symbols-outlined text-[20px]">domain</span>
                        {t('settings.companySettings')}
                      </h2>
                      <p className="text-body-sm text-on-surface-variant mt-[-8px]">
                        {t('settings.companySettingsDesc')}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                        {/* Company Name */}
                        <div className="flex flex-col gap-xs">
                          <label className="text-label-caps font-label-caps text-on-surface-variant">{t('settings.companyName')}</label>
                          <input 
                            type="text"
                            required
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="h-11 px-md border border-outline rounded-xl bg-surface text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-body-md"
                          />
                        </div>

                        {/* Company Contact */}
                        <div className="flex flex-col gap-xs">
                          <label className="text-label-caps font-label-caps text-on-surface-variant">{t('settings.companyContact')}</label>
                          <input 
                            type="text"
                            required
                            value={companyContact}
                            onChange={(e) => setCompanyContact(e.target.value)}
                            className="h-11 px-md border border-outline rounded-xl bg-surface text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-body-md"
                          />
                        </div>

                        {/* Address */}
                        <div className="flex flex-col gap-xs md:col-span-2">
                          <div className="grid grid-cols-4 gap-md">
                            <div className="col-span-3 flex flex-col gap-xs">
                              <label className="text-label-caps font-label-caps text-on-surface-variant">{t('settings.companyAddress')}</label>
                              <input 
                                type="text"
                                required
                                value={companyAddress}
                                onChange={(e) => setCompanyAddress(e.target.value)}
                                className="h-11 px-md border border-outline rounded-xl bg-surface text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-body-md"
                              />
                            </div>
                            <div className="col-span-1 flex flex-col gap-xs">
                              <label className="text-label-caps font-label-caps text-on-surface-variant">{t('settings.companyNumber')}</label>
                              <input 
                                type="text"
                                required
                                value={companyNumber}
                                onChange={(e) => setCompanyNumber(e.target.value)}
                                className="h-11 px-md border border-outline rounded-xl bg-surface text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-body-md"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Default Schedule Info */}
                      <div className="bg-surface-container-low p-md rounded-xl border border-outline-variant/40 space-y-xs">
                        <h4 className="font-semibold text-body-md text-on-surface flex items-center gap-xs">
                          <span className="material-symbols-outlined text-[18px]">schedule</span>
                          {t('settings.defaultSchedule')}
                        </h4>
                        <p className="text-body-xs text-on-surface-variant">
                          {t('settings.defaultScheduleDesc')}
                        </p>
                        <div className="flex gap-lg text-body-sm font-semibold text-primary pt-xs">
                          <span>Entrada: 08:00</span>
                          <span>Almoço: 12:00 às 13:00</span>
                          <span>Saída: 18:00</span>
                        </div>
                      </div>

                      {/* Save button */}
                      <div className="flex justify-end pt-sm border-t border-outline-variant/60">
                        <button
                          type="submit"
                          disabled={saveLoading}
                          className="bg-primary text-on-primary hover:bg-primary-container px-lg h-11 rounded-xl font-bold transition-all duration-150 active:scale-[0.98] cursor-pointer shadow-sm disabled:opacity-50 flex items-center gap-xs"
                        >
                          {saveLoading ? (
                            <>
                              <span className="animate-spin material-symbols-outlined text-[20px]">progress_activity</span>
                              <span>Salvando...</span>
                            </>
                          ) : (
                            <>
                              <span className="material-symbols-outlined text-[20px]">save</span>
                              <span>{t('settings.saveSettings')}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Idioma Preferences section */}
                  <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg md:p-xl shadow-sm space-y-md">
                    <h2 className="text-body-lg font-bold text-primary border-b border-outline-variant pb-xs flex items-center gap-xs">
                      <span className="material-symbols-outlined text-[20px]">translate</span>
                      {t('common.language')}
                    </h2>

                    <div className="flex flex-col md:flex-row md:items-center justify-between bg-surface-container-low p-md rounded-xl border border-outline-variant/60 gap-lg">
                      <div className="space-y-[4px] flex-1">
                        <p className="font-semibold text-body-lg text-on-surface">
                          {t('common.language')}
                        </p>
                        <p className="text-body-sm text-on-surface-variant/80">
                          {t('settings.languageDesc')}
                        </p>
                      </div>

                      <div className="flex-shrink-0 w-full md:w-auto">
                        <select
                          value={locale}
                          onChange={(e) => setLocale(e.target.value as Locale)}
                          className="h-12 w-full md:w-56 px-md border border-outline rounded-xl bg-surface text-on-surface focus:border-primary outline-none transition-all text-body-lg font-semibold cursor-pointer"
                        >
                          <option value="pt">Português</option>
                          <option value="en">English</option>
                          <option value="de">Deutsch</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Subscription card info */}
                  {company && (
                    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg md:p-xl shadow-sm space-y-md">
                      <h2 className="text-body-lg font-bold text-primary border-b border-outline-variant pb-xs flex items-center gap-xs">
                        <span className="material-symbols-outlined text-[20px]">receipt_long</span>
                        {t('settings.subscriptionInfo')}
                      </h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
                        <div className="bg-surface-container-low p-md rounded-xl border border-outline-variant/40">
                          <p className="text-body-xs text-on-surface-variant font-medium uppercase">{t('settings.subscriptionPlan')}</p>
                          <p className="text-body-lg font-bold text-on-surface mt-xs">{company.subscriptionPlan}</p>
                        </div>
                        <div className="bg-surface-container-low p-md rounded-xl border border-outline-variant/40">
                          <p className="text-body-xs text-on-surface-variant font-medium uppercase">{t('settings.subscriptionStatus')}</p>
                          <p className="text-body-lg font-bold text-secondary mt-xs">{company.subscriptionStatus}</p>
                        </div>
                        <div className="bg-surface-container-low p-md rounded-xl border border-outline-variant/40">
                          <p className="text-body-xs text-on-surface-variant font-medium uppercase">{t('settings.subscriptionEnds')}</p>
                          <p className="text-body-lg font-bold text-on-surface mt-xs">{formatPlanEndsAt(company.subscriptionEndsAt)}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Logout section */}
                  <div className="bg-surface-container-lowest border border-error/30 rounded-xl p-lg md:p-xl shadow-sm space-y-md">
                    <h2 className="text-body-lg font-bold text-error border-b border-error/20 pb-xs flex items-center gap-xs">
                      <span className="material-symbols-outlined text-[20px]">logout</span>
                      {t('settings.logoutSectionTitle')}
                    </h2>
                    <div className="flex flex-col md:flex-row md:items-center justify-between bg-error/5 p-md rounded-xl border border-error/15 gap-lg">
                      <div className="space-y-[4px] flex-1">
                        <p className="font-semibold text-body-lg text-on-surface">
                          {t('settings.logoutSectionTitle')}
                        </p>
                        <p className="text-body-sm text-on-surface-variant/80">
                          {t('settings.logoutSectionDesc')}
                        </p>
                      </div>
                      <div className="flex-shrink-0 w-full md:w-auto">
                        <button
                          onClick={handleLogout}
                          className="h-12 w-full md:w-56 bg-error hover:bg-error/95 text-white font-bold rounded-xl text-body-md transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-xs shadow-sm shadow-error/10"
                        >
                          <span className="material-symbols-outlined text-[20px]">logout</span>
                          <span>{t('common.logout')}</span>
                        </button>
                      </div>
                    </div>
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
