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
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyDocument, setCompanyDocument] = useState('');
  const [companyCorporateName, setCompanyCorporateName] = useState('');
  const [companyCountry, setCompanyCountry] = useState('');
  const [companyZip, setCompanyZip] = useState('');
  const [companyStreet, setCompanyStreet] = useState('');
  const [companyCity, setCompanyCity] = useState('');
  const [companyState, setCompanyState] = useState('');

  // States for subscription plans
  const [currency, setCurrency] = useState<'BRL' | 'EUR'>('BRL');
  const [billingCycle, setBillingCycle] = useState<'MONTHLY' | 'ANNUAL'>('MONTHLY');

  // Detect location and set default language and currency
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const browserLang = navigator.language || '';
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      
      const isBrazil = browserLang.startsWith('pt') || 
                       timeZone.includes('Sao_Paulo') || 
                       timeZone.includes('Brazil') || 
                       timeZone.includes('Fortaleza') || 
                       timeZone.includes('Recife') || 
                       timeZone.includes('Rio');
                       
      if (isBrazil) {
        setLocale('pt');
        setCurrency('BRL');
      } else {
        const defaultLang: Locale = browserLang.startsWith('de') ? 'de' : 'en';
        setLocale(defaultLang);
        setCurrency('EUR');
      }
    }
  }, []);

  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale);
    if (newLocale === 'pt') {
      setCurrency('BRL');
    } else {
      setCurrency('EUR');
    }
  };

  const getLocalizedPlanName = (planKey: string) => {
    if (!planKey) return 'N/A';
    if (planKey === 'TRIAL') return 'Período de Testes (Trial)';
    if (planKey === 'THREE_MONTHS') return 'Plano Trimestral (Seeding)';
    if (planKey === 'SIX_MONTHS') return 'Plano Semestral (Seeding)';
    
    const match = planKey.match(/^(\d+)_EMPLOYEES_(MONTHLY|ANNUAL)$/);
    if (match) {
      const [, employees, period] = match;
      const periodStr = period === 'MONTHLY' ? 'Mensal' : 'Anual';
      return `Até ${employees} Colaboradores (${periodStr})`;
    }
    return planKey;
  };

  const getPlansData = (cur: 'BRL' | 'EUR', cycle: 'MONTHLY' | 'ANNUAL') => {
    if (cur === 'BRL') {
      return [
        {
          id: `15_EMPLOYEES_${cycle}`,
          limit: 15,
          priceStr: cycle === 'MONTHLY' ? '189,99' : '1.599,99',
          originalPriceStr: cycle === 'ANNUAL' ? '2.279,99' : null,
          currency: 'BRL',
        },
        {
          id: `30_EMPLOYEES_${cycle}`,
          limit: 30,
          priceStr: cycle === 'MONTHLY' ? '329,99' : '2.769,99',
          originalPriceStr: cycle === 'ANNUAL' ? '3.959,99' : null,
          currency: 'BRL',
        },
        {
          id: `50_EMPLOYEES_${cycle}`,
          limit: 50,
          priceStr: cycle === 'MONTHLY' ? '499,99' : '4.199,99',
          originalPriceStr: cycle === 'ANNUAL' ? '5.999,99' : null,
          currency: 'BRL',
        },
      ];
    } else {
      return [
        {
          id: `15_EMPLOYEES_${cycle}`,
          limit: 15,
          priceStr: cycle === 'MONTHLY' ? '99,99' : '839,99',
          originalPriceStr: cycle === 'ANNUAL' ? '1.199,99' : null,
          currency: 'EUR',
        },
        {
          id: `30_EMPLOYEES_${cycle}`,
          limit: 30,
          priceStr: cycle === 'MONTHLY' ? '169,99' : '1.429,99',
          originalPriceStr: cycle === 'ANNUAL' ? '2.039,99' : null,
          currency: 'EUR',
        },
        {
          id: `50_EMPLOYEES_${cycle}`,
          limit: 50,
          priceStr: cycle === 'MONTHLY' ? '249,99' : '2.099,99',
          originalPriceStr: cycle === 'ANNUAL' ? '2.999,99' : null,
          currency: 'EUR',
        },
      ];
    }
  };

  const getPlanTexts = () => {
    if (locale === 'pt') {
      return {
        billingCycleLabel: 'Ciclo de Faturamento',
        monthly: 'Mensal',
        annual: 'Anual',
        discountLabel: 'Economia de 30% inclusa',
        currencyLabel: `Exibindo planos em ${currency === 'BRL' ? 'Real (BRL)' : 'Euro (EUR)'} baseado em sua localização.`,
        subtitle15: 'Ideal para pequenas empresas e startups em crescimento.',
        subtitle30: 'Ideal para empresas de médio porte com equipes estruturadas.',
        subtitle50: 'Ideal para empresas consolidadas e em franca expansão.',
        featEmployees: 'Até {limit} colaboradores ativos',
        featTrial: 'Validade de 30 dias após ativação',
        featReports: 'Relatórios de ponto e geolocalização',
        btnSelect: 'Selecionar Plano',
        btnCurrent: 'Plano Atual',
        plansTitle: 'Planos de Assinatura',
      };
    } else if (locale === 'de') {
      return {
        billingCycleLabel: 'Abrechnungszyklus',
        monthly: 'Monatlich',
        annual: 'Jährlich',
        discountLabel: '30% Ersparnis inklusive',
        currencyLabel: `Anzeige der Tarife in ${currency === 'BRL' ? 'Real (BRL)' : 'Euro (EUR)'} basierend auf Ihrem Standort.`,
        subtitle15: 'Ideal für kleine Unternehmen und wachsende Start-ups.',
        subtitle30: 'Ideal für mittlere Unternehmen mit strukturierten Teams.',
        subtitle50: 'Ideal für etablierte und schnell expandierende Unternehmen.',
        featEmployees: 'Bis zu {limit} aktive Mitarbeiter',
        featTrial: '30 Tage Gültigkeit nach Aktivierung',
        featReports: 'Zeiterfassung & Geolokalisierungsberichte',
        btnSelect: 'Tarif Auswählen',
        btnCurrent: 'Aktueller Tarif',
        plansTitle: 'Abonnement-Tarife',
      };
    } else {
      return {
        billingCycleLabel: 'Billing Cycle',
        monthly: 'Monthly',
        annual: 'Annual',
        discountLabel: '30% savings included',
        currencyLabel: `Displaying plans in ${currency === 'BRL' ? 'Real (BRL)' : 'Euro (EUR)'} based on your location.`,
        subtitle15: 'Ideal for small businesses and growing startups.',
        subtitle30: 'Ideal for medium-sized businesses with structured teams.',
        subtitle50: 'Ideal for established and rapidly expanding companies.',
        featEmployees: 'Up to {limit} active employees',
        featTrial: '30 days validity after activation',
        featReports: 'Time tracking & geolocation reports',
        btnSelect: 'Select Plan',
        btnCurrent: 'Current Plan',
        plansTitle: 'Subscription Plans',
      };
    }
  };

  const handleSelectPlan = async (planId: string) => {
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
          email: companyEmail,
          document: companyDocument,
          corporateName: companyCorporateName,
          country: companyCountry,
          zip: companyZip,
          street: companyStreet,
          city: companyCity,
          state: companyState,
          subscriptionPlan: planId,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        showToast(t('settings.saveSuccess'), 'success');
        setCompany(result);
        setCompanyAddress(result.address || '');
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
          setCompanyName(comp.name || '');
          setCompanyAddress(comp.address || '');
          setCompanyNumber(comp.number || '');
          setCompanyContact(comp.contact || '');
          setCompanyEmail(comp.email || '');
          setCompanyDocument(comp.document || '');
          setCompanyCorporateName(comp.corporateName || '');
          setCompanyCountry(comp.country || '');
          setCompanyZip(comp.zip || '');
          setCompanyStreet(comp.street || '');
          setCompanyCity(comp.city || '');
          setCompanyState(comp.state || '');
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
      // Sync composite address field if individual address components are edited
      let finalAddress = companyAddress;
      if (companyStreet || companyCity || companyState) {
        finalAddress = `${companyStreet || ''}, ${companyCity || ''} - ${companyState || ''}`.trim();
        if (finalAddress === ',  -') finalAddress = companyAddress;
      }

      const res = await fetch(`/api/admin/companies/${company.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: companyName,
          address: finalAddress,
          number: companyNumber,
          contact: companyContact,
          email: companyEmail,
          document: companyDocument,
          corporateName: companyCorporateName,
          country: companyCountry,
          zip: companyZip,
          street: companyStreet,
          city: companyCity,
          state: companyState,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        showToast(t('settings.saveSuccess'), 'success');
        setCompany(result);
        setCompanyAddress(result.address || '');
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
                            disabled
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="h-11 px-md border border-outline-variant/60 rounded-xl bg-background/50 text-on-surface-variant/70 cursor-not-allowed outline-none select-none text-body-md"
                          />
                        </div>

                        {/* Corporate Name (Razão Social) */}
                        <div className="flex flex-col gap-xs">
                          <label className="text-label-caps font-label-caps text-on-surface-variant">{t('settings.companyCorporateName')}</label>
                          <input 
                            type="text"
                            disabled
                            value={companyCorporateName}
                            onChange={(e) => setCompanyCorporateName(e.target.value)}
                            className="h-11 px-md border border-outline-variant/60 rounded-xl bg-background/50 text-on-surface-variant/70 cursor-not-allowed outline-none select-none text-body-md"
                          />
                        </div>

                        {/* Document (CNPJ / VAT) */}
                        <div className="flex flex-col gap-xs">
                          <label className="text-label-caps font-label-caps text-on-surface-variant">{t('settings.companyDocument')}</label>
                          <input 
                            type="text"
                            disabled
                            value={companyDocument}
                            onChange={(e) => setCompanyDocument(e.target.value)}
                            className="h-11 px-md border border-outline-variant/60 rounded-xl bg-background/50 text-on-surface-variant/70 cursor-not-allowed outline-none select-none text-body-md"
                          />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-xs">
                          <label className="text-label-caps font-label-caps text-on-surface-variant">{t('settings.companyEmail')}</label>
                          <input 
                            type="email"
                            disabled
                            value={companyEmail}
                            onChange={(e) => setCompanyEmail(e.target.value)}
                            className="h-11 px-md border border-outline-variant/60 rounded-xl bg-background/50 text-on-surface-variant/70 cursor-not-allowed outline-none select-none text-body-md"
                          />
                        </div>

                        {/* Country */}
                        <div className="flex flex-col gap-xs">
                          <label className="text-label-caps font-label-caps text-on-surface-variant">{t('settings.companyCountry')}</label>
                          <input 
                            type="text"
                            disabled
                            value={companyCountry}
                            onChange={(e) => setCompanyCountry(e.target.value)}
                            className="h-11 px-md border border-outline-variant/60 rounded-xl bg-background/50 text-on-surface-variant/70 cursor-not-allowed outline-none select-none text-body-md"
                          />
                        </div>

                        {/* Company Contact */}
                        <div className="flex flex-col gap-xs">
                          <label className="text-label-caps font-label-caps text-on-surface-variant">{t('settings.companyContact')}</label>
                          <input 
                            type="text"
                            required
                            disabled
                            value={companyContact}
                            onChange={(e) => setCompanyContact(e.target.value)}
                            className="h-11 px-md border border-outline-variant/60 rounded-xl bg-background/50 text-on-surface-variant/70 cursor-not-allowed outline-none select-none text-body-md"
                          />
                        </div>

                        {/* ZIP / CEP */}
                        <div className="flex flex-col gap-xs">
                          <label className="text-label-caps font-label-caps text-on-surface-variant">{t('settings.companyZip')}</label>
                          <input 
                            type="text"
                            value={companyZip}
                            onChange={(e) => setCompanyZip(e.target.value)}
                            className="h-11 px-md border border-outline rounded-xl bg-surface text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-body-md"
                          />
                        </div>

                        {/* Street / Rua */}
                        <div className="flex flex-col gap-xs">
                          <label className="text-label-caps font-label-caps text-on-surface-variant">{t('settings.companyStreet')}</label>
                          <input 
                            type="text"
                            value={companyStreet}
                            onChange={(e) => setCompanyStreet(e.target.value)}
                            className="h-11 px-md border border-outline rounded-xl bg-surface text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-body-md"
                          />
                        </div>

                        {/* Number */}
                        <div className="flex flex-col gap-xs">
                          <label className="text-label-caps font-label-caps text-on-surface-variant">{t('settings.companyNumber')}</label>
                          <input 
                            type="text"
                            required
                            value={companyNumber}
                            onChange={(e) => setCompanyNumber(e.target.value)}
                            className="h-11 px-md border border-outline rounded-xl bg-surface text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-body-md"
                          />
                        </div>

                        {/* City */}
                        <div className="flex flex-col gap-xs">
                          <label className="text-label-caps font-label-caps text-on-surface-variant">{t('settings.companyCity')}</label>
                          <input 
                            type="text"
                            value={companyCity}
                            onChange={(e) => setCompanyCity(e.target.value)}
                            className="h-11 px-md border border-outline rounded-xl bg-surface text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-body-md"
                          />
                        </div>

                        {/* State */}
                        <div className="flex flex-col gap-xs">
                          <label className="text-label-caps font-label-caps text-on-surface-variant">{t('settings.companyState')}</label>
                          <input 
                            type="text"
                            value={companyState}
                            onChange={(e) => setCompanyState(e.target.value)}
                            className="h-11 px-md border border-outline rounded-xl bg-surface text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-body-md"
                          />
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
                          onChange={(e) => handleLocaleChange(e.target.value as Locale)}
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
                    <div className="space-y-md">
                      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg md:p-xl shadow-sm space-y-md">
                        <h2 className="text-body-lg font-bold text-primary border-b border-outline-variant pb-xs flex items-center gap-xs">
                          <span className="material-symbols-outlined text-[20px]">receipt_long</span>
                          {t('settings.subscriptionInfo')}
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
                          <div className="bg-surface-container-low p-md rounded-xl border border-outline-variant/40">
                            <p className="text-body-xs text-on-surface-variant font-medium uppercase">{t('settings.subscriptionPlan')}</p>
                            <p className="text-body-lg font-bold text-on-surface mt-xs">{getLocalizedPlanName(company.subscriptionPlan)}</p>
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

                      {/* Plans section */}
                      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg md:p-xl shadow-sm space-y-lg">
                        <h2 className="text-body-lg font-bold text-primary border-b border-outline-variant pb-xs flex items-center gap-xs">
                          <span className="material-symbols-outlined text-[20px]">loyalty</span>
                          {getPlanTexts().plansTitle}
                        </h2>
                        
                        {/* Billing period switcher */}
                        <div className="flex justify-center my-md">
                          <div className="bg-surface-container-low p-xs rounded-full flex gap-xs border border-outline-variant/50 relative">
                            <button
                              type="button"
                              onClick={() => setBillingCycle('MONTHLY')}
                              className={`px-lg py-xs rounded-full font-bold text-body-sm transition-all duration-200 cursor-pointer ${billingCycle === 'MONTHLY' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
                            >
                              {getPlanTexts().monthly}
                            </button>
                            <button
                              type="button"
                              onClick={() => setBillingCycle('ANNUAL')}
                              className={`px-lg py-xs rounded-full font-bold text-body-sm transition-all duration-200 cursor-pointer flex items-center gap-xs ${billingCycle === 'ANNUAL' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
                            >
                              {getPlanTexts().annual}
                              <span className="bg-success text-on-success text-[10px] font-extrabold px-xs py-[2px] rounded-full uppercase leading-none">
                                -30%
                              </span>
                            </button>
                          </div>
                        </div>

                        {/* Location / currency label */}
                        <div className="text-center text-body-xs text-on-surface-variant/80 -mt-sm flex justify-center items-center gap-xs">
                          <span className="material-symbols-outlined text-[14px]">public</span>
                          {getPlanTexts().currencyLabel}
                        </div>

                        {/* Plans Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-md pt-sm">
                          {getPlansData(currency, billingCycle).map((plan) => {
                            const isCurrent = company.subscriptionPlan === plan.id;
                            const subtitleStr = plan.limit === 15 
                              ? getPlanTexts().subtitle15 
                              : plan.limit === 30 
                                ? getPlanTexts().subtitle30 
                                : getPlanTexts().subtitle50;

                            return (
                              <div
                                key={plan.id}
                                className={`border rounded-2xl p-md flex flex-col justify-between transition-all duration-200 min-h-[320px] relative overflow-hidden hover:shadow-md ${
                                  isCurrent 
                                    ? 'border-primary bg-primary/5 ring-1 ring-primary' 
                                    : 'border-outline-variant bg-surface-container-low'
                                }`}
                              >
                                {isCurrent && (
                                  <span className="absolute top-2 right-2 bg-primary text-on-primary font-bold text-[10px] px-sm py-[2px] rounded-full uppercase">
                                    {getPlanTexts().btnCurrent}
                                  </span>
                                )}
                                
                                <div>
                                  <h4 className="font-bold text-body-lg text-on-surface flex items-center gap-xs">
                                    <span className="material-symbols-outlined text-primary text-[20px]">groups</span>
                                    {getPlanTexts().featEmployees.replace('{limit}', String(plan.limit))}
                                  </h4>
                                  <p className="text-body-xs text-on-surface-variant/85 mt-xs leading-normal">
                                    {subtitleStr}
                                  </p>
                                  
                                  <div className="mt-md flex flex-col justify-end min-h-[60px]">
                                    {plan.originalPriceStr && (
                                      <span className="text-body-xs text-on-surface-variant/60 line-through">
                                        {plan.currency === 'BRL' ? 'R$' : '€'} {plan.originalPriceStr}
                                      </span>
                                    )}
                                    <div>
                                      <span className="font-display-time-mobile text-display-time-mobile text-on-surface font-bold">
                                        {plan.currency === 'BRL' ? 'R$' : '€'} {plan.priceStr}
                                      </span>
                                      <span className="text-body-xs text-on-surface-variant/80 ml-xs">
                                        /{billingCycle === 'MONTHLY' ? 'mês' : 'ano'}
                                      </span>
                                    </div>
                                    {billingCycle === 'ANNUAL' && (
                                      <div className="text-success text-body-xs font-semibold mt-xs flex items-center gap-xs">
                                        <span className="material-symbols-outlined text-[16px]">savings</span>
                                        {getPlanTexts().discountLabel}
                                      </div>
                                    )}
                                  </div>

                                  <ul className="mt-md space-y-xs text-body-xs text-on-surface-variant/90 border-t border-outline-variant/40 pt-sm">
                                    <li className="flex items-center gap-xs">
                                      <span className="material-symbols-outlined text-success text-[14px]">check_circle</span>
                                      {getPlanTexts().featEmployees.replace('{limit}', String(plan.limit))}
                                    </li>
                                    <li className="flex items-center gap-xs">
                                      <span className="material-symbols-outlined text-success text-[14px]">check_circle</span>
                                      {getPlanTexts().featTrial}
                                    </li>
                                    <li className="flex items-center gap-xs">
                                      <span className="material-symbols-outlined text-success text-[14px]">check_circle</span>
                                      {getPlanTexts().featReports}
                                    </li>
                                  </ul>
                                </div>

                                <button
                                  type="button"
                                  disabled={isCurrent || saveLoading}
                                  onClick={() => handleSelectPlan(plan.id)}
                                  className={`w-full h-10 rounded-xl font-bold transition-all text-body-sm mt-lg flex items-center justify-center gap-xs cursor-pointer ${
                                    isCurrent
                                      ? 'bg-outline-variant text-on-surface-variant/50 cursor-not-allowed border border-outline-variant'
                                      : 'bg-primary text-on-primary hover:opacity-90 active:scale-[0.98]'
                                  }`}
                                >
                                  {isCurrent ? getPlanTexts().btnCurrent : getPlanTexts().btnSelect}
                                </button>
                              </div>
                            );
                          })}
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
