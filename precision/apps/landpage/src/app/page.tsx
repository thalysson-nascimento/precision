'use client';

import React, { useEffect, useState } from 'react';
import { sendGTMEvent } from '@next/third-parties/google';
import { Footer } from '../components/Footer';
import { Locale } from '../locales';
import { useI18n } from '../locales/useI18n';
import { CountryCode, CurrencyCode, COUNTRIES, getCurrencySymbol } from '../locales/countries';

export default function Landpage() {
  const { t, locale, setLocale } = useI18n();
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'inicio' | 'features' | 'reports' | 'support'>('inicio');

  // Subscription plans states
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>('BR');
  const [currency, setCurrency] = useState<CurrencyCode>('BRL');
  const [billingCycle, setBillingCycle] = useState<'MONTHLY' | 'ANNUAL'>('MONTHLY');

  // Detect location and set default country, language and currency (only on mount)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
        return null;
      };

      const savedCountry = getCookie('precision_country');
      if (savedCountry) {
        const country = COUNTRIES.find((c) => c.code === savedCountry);
        if (country) {
          setSelectedCountry(country.code);
          setLocale(country.locale);
          setCurrency(country.currency);
          return;
        }
      }

      const savedLocale = getCookie('precision_locale');
      if (savedLocale) {
        setLocale(savedLocale as Locale);
        if (savedLocale === 'pt') {
          setSelectedCountry('BR');
          setCurrency('BRL');
        } else if (savedLocale === 'de') {
          setSelectedCountry('DE');
          setCurrency('EUR');
        } else {
          setSelectedCountry('US');
          setCurrency('USD');
        }
      } else {
        const browserLang = navigator.language || '';
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
        
        let detectedCountryCode: CountryCode = 'US'; // Default

        const isUS = timeZone.includes('New_York') || 
                     timeZone.includes('Chicago') || 
                     timeZone.includes('Denver') || 
                     timeZone.includes('Los_Angeles') || 
                     timeZone.includes('America/US') ||
                     browserLang.includes('en-US');

        const isCA = timeZone.includes('Toronto') || 
                     timeZone.includes('Vancouver') || 
                     timeZone.includes('Winnipeg') || 
                     timeZone.includes('Halifax') ||
                     browserLang.includes('en-CA') ||
                     browserLang.includes('fr-CA');

        const isGermany = timeZone.includes('Berlin') || 
                          browserLang.startsWith('de');

        const isBrazil = browserLang.startsWith('pt') || 
                         timeZone.includes('Sao_Paulo') || 
                         timeZone.includes('Brazil') || 
                         timeZone.includes('Fortaleza') || 
                         timeZone.includes('Recife') || 
                         timeZone.includes('Rio');

        const isSpain = timeZone.includes('Madrid') || browserLang.includes('es-ES');
        const isFrance = timeZone.includes('Paris') || browserLang.includes('fr-FR');
        const isItaly = timeZone.includes('Rome') || browserLang.includes('it-IT');
        const isPortugal = timeZone.includes('Lisbon') || browserLang.includes('pt-PT');
        const isNetherlands = timeZone.includes('Amsterdam') || browserLang.includes('nl-NL');
        const isIreland = timeZone.includes('Dublin') || browserLang.includes('en-IE');
        const isBelgium = timeZone.includes('Brussels') || browserLang.includes('nl-BE') || browserLang.includes('fr-BE');
        const isAustria = timeZone.includes('Vienna') || browserLang.includes('de-AT');

        if (isBrazil) {
          detectedCountryCode = 'BR';
        } else if (isGermany) {
          detectedCountryCode = 'DE';
        } else if (isUS) {
          detectedCountryCode = 'US';
        } else if (isCA) {
          detectedCountryCode = 'CA';
        } else if (isSpain) {
          detectedCountryCode = 'ES';
        } else if (isFrance) {
          detectedCountryCode = 'FR';
        } else if (isItaly) {
          detectedCountryCode = 'IT';
        } else if (isPortugal) {
          detectedCountryCode = 'PT';
        } else if (isNetherlands) {
          detectedCountryCode = 'NL';
        } else if (isIreland) {
          detectedCountryCode = 'IE';
        } else if (isBelgium) {
          detectedCountryCode = 'BE';
        } else if (isAustria) {
          detectedCountryCode = 'AT';
        } else if (
          timeZone.includes('Europe') || 
          timeZone.includes('London') || 
          browserLang.includes('en-GB') ||
          browserLang.startsWith('en')
        ) {
          detectedCountryCode = 'ES'; // Fallback for Europe
        }

        const country = COUNTRIES.find((c) => c.code === detectedCountryCode) || COUNTRIES[0];
        setSelectedCountry(country.code);
        setLocale(country.locale);
        setCurrency(country.currency);
      }
    }
  }, []);

  const handleCountryChange = (newCountryCode: CountryCode) => {
    const country = COUNTRIES.find((c) => c.code === newCountryCode) || COUNTRIES[0];
    setSelectedCountry(newCountryCode);
    setLocale(country.locale);
    setCurrency(country.currency);
    document.cookie = `precision_country=${newCountryCode}; path=/; max-age=31536000; SameSite=Lax`;
    document.cookie = `precision_locale=${country.locale}; path=/; max-age=31536000; SameSite=Lax`;
  };

  const getMonthlyEquivalent = (priceStr: string): string => {
    const numeric = parseFloat(priceStr.replace(/\./g, '').replace(',', '.'));
    const monthly = numeric / 12;
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(monthly);
  };

  const getPlansData = (cur: CurrencyCode, cycle: 'MONTHLY' | 'ANNUAL') => {
    const getOriginalPrice = (price: string) => {
      const numeric = parseFloat(price.replace(/\./g, '').replace(',', '.'));
      const original = Math.ceil(numeric * 2) - 0.01;
      return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(original);
    };

    if (cur === 'BRL') {
      return [
        {
          id: `15_EMPLOYEES_${cycle}`,
          limit: 15,
          priceStr: cycle === 'MONTHLY' ? '189,99' : '1.599,99',
          originalPriceStr: getOriginalPrice(cycle === 'MONTHLY' ? '189,99' : '1.599,99'),
          currency: 'BRL' as CurrencyCode,
          badge: t('landpage.beginnerBadge'),
          title: t('landpage.plan15Title'),
          description: t('landpage.plan15Desc'),
        },
        {
          id: `30_EMPLOYEES_${cycle}`,
          limit: 30,
          priceStr: cycle === 'MONTHLY' ? '329,99' : '2.769,99',
          originalPriceStr: getOriginalPrice(cycle === 'MONTHLY' ? '329,99' : '2.769,99'),
          currency: 'BRL' as CurrencyCode,
          badge: t('landpage.professionalBadge'),
          title: t('landpage.plan30Title'),
          description: t('landpage.plan30Desc'),
        },
        {
          id: `50_EMPLOYEES_${cycle}`,
          limit: 50,
          priceStr: cycle === 'MONTHLY' ? '499,99' : '4.199,99',
          originalPriceStr: getOriginalPrice(cycle === 'MONTHLY' ? '499,99' : '4.199,99'),
          currency: 'BRL' as CurrencyCode,
          badge: t('landpage.corporateBadge'),
          title: t('landpage.plan50Title'),
          description: t('landpage.plan50Desc'),
        },
      ];
    } else {
      return [
        {
          id: `15_EMPLOYEES_${cycle}`,
          limit: 15,
          priceStr: cycle === 'MONTHLY' ? '99,99' : '839,99',
          originalPriceStr: getOriginalPrice(cycle === 'MONTHLY' ? '99,99' : '839,99'),
          currency: cur,
          badge: t('landpage.beginnerBadge'),
          title: t('landpage.plan15Title'),
          description: t('landpage.plan15Desc'),
        },
        {
          id: `30_EMPLOYEES_${cycle}`,
          limit: 30,
          priceStr: cycle === 'MONTHLY' ? '169,99' : '1.429,99',
          originalPriceStr: getOriginalPrice(cycle === 'MONTHLY' ? '169,99' : '1.429,99'),
          currency: cur,
          badge: t('landpage.professionalBadge'),
          title: t('landpage.plan30Title'),
          description: t('landpage.plan30Desc'),
        },
        {
          id: `50_EMPLOYEES_${cycle}`,
          limit: 50,
          priceStr: cycle === 'MONTHLY' ? '249,99' : '2.099,99',
          originalPriceStr: getOriginalPrice(cycle === 'MONTHLY' ? '249,99' : '2.099,99'),
          currency: cur,
          badge: t('landpage.corporateBadge'),
          title: t('landpage.plan50Title'),
          description: t('landpage.plan50Desc'),
        },
      ];
    }
  };

  const getPricingTexts = () => {
    if (locale === 'pt') {
      return {
        billingCycleLabel: 'Ciclo de Faturamento',
        monthly: 'Mensal',
        annual: 'Anual',
        discountLabel: '30% de desconto incluso',
        currencyLabel: `Exibindo valores em ${currency === 'BRL' ? 'Real (BRL)' : 'Euro (EUR)'} com base na sua localização.`,
        trialPeriod: '30 dias de teste gratuito inclusos em todos os planos',
        selectPlanButton: 'Selecionar Plano',
        bestValue: 'Mais Popular',
      };
    } else if (locale === 'de') {
      return {
        billingCycleLabel: 'Abrechnungszyklus',
        monthly: 'Monatlich',
        annual: 'Jährlich',
        discountLabel: '30% Rabatt inklusive',
        currencyLabel: `Preise in ${currency === 'BRL' ? 'Real (BRL)' : 'Euro (EUR)'} basierend auf Ihrem Standort.`,
        trialPeriod: '30 Tage kostenlose Testversion in allen Tarifen enthalten',
        selectPlanButton: 'Tarif Auswählen',
        bestValue: 'Am Beliebtesten',
      };
    } else {
      return {
        billingCycleLabel: 'Billing Cycle',
        monthly: 'Monthly',
        annual: 'Annual',
        discountLabel: '30% discount included',
        currencyLabel: `Displaying prices in ${currency === 'BRL' ? 'Real (BRL)' : 'Euro (EUR)'} based on your location.`,
        trialPeriod: '30 days free trial included in all plans',
        selectPlanButton: 'Select Plan',
        bestValue: 'Most Popular',
      };
    }
  };

  const scrollToSection = (e: React.MouseEvent<any>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Dynamic portal links configuration for dev/production environment
  const getAdminUrl = () => {
    if (typeof window === 'undefined') return '#';
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:3002/login';
    }
    return process.env.NEXT_PUBLIC_PORTAL_ADMIN_URL ? `${process.env.NEXT_PUBLIC_PORTAL_ADMIN_URL}/login` : 'https://portal-admin.precision-hour.com/login';
  };

  const getEmployeeUrl = () => {
    if (typeof window === 'undefined') return '#';
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:3001/login';
    }
    return process.env.NEXT_PUBLIC_MOBILE_URL ? `${process.env.NEXT_PUBLIC_MOBILE_URL}/login` : 'https://mobile.precision-hour.com/login';
  };

  // Mock states for interactive weekly switches inside Card 2
  const [demoWeekdays, setDemoWeekdays] = useState<number[]>([0, 6]); // Default: Sat & Sun blocked
  const toggleDemoWeekday = (day: number) => {
    setDemoWeekdays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  return (
    <div id="inicio" className="min-h-screen bg-background text-on-surface select-none relative overflow-x-hidden">
      
      {/* Sticky Blur Header */}
      <header className="sticky top-0 z-40 apple-blur-nav w-full transition-all duration-300">
        <div className="max-w-7xl mx-auto h-16 px-md md:px-lg flex items-center justify-between">
          
          {/* Logo Brand matching image */}
          <div className="flex items-center gap-xs cursor-pointer" onClick={(e) => { scrollToSection(e, 'inicio'); setActiveTab('inicio'); }}>
            <img 
              src="/images/precision.png" 
              alt="Precision Logo" 
              className="w-8 h-8 object-contain transition-transform duration-300 hover:scale-105" 
            />
            <span className="hidden sm:inline font-bold text-headline-lg tracking-tight text-on-background font-sans">Precision</span>
          </div>

          {/* Navigation Links centered */}
          <nav className="hidden md:flex items-center gap-lg">
            <a 
              href="#inicio"
              onClick={(e) => { scrollToSection(e, 'inicio'); setActiveTab('inicio'); }}
              className={`text-body-sm font-semibold transition-all relative py-1 cursor-pointer ${activeTab === 'inicio' ? 'text-primary' : 'text-on-surface-muted hover:text-on-surface'}`}
            >
              Início
              {activeTab === 'inicio' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-full transition-all"></span>}
            </a>
            <a 
              href="#features" 
              onClick={(e) => { scrollToSection(e, 'features'); setActiveTab('features'); }}
              className={`text-body-sm font-semibold transition-all relative py-1 cursor-pointer ${activeTab === 'features' ? 'text-primary' : 'text-on-surface-muted hover:text-on-surface'}`}
            >
              {t('landpage.features')}
              {activeTab === 'features' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-full transition-all"></span>}
            </a>
            <a 
              href="#reports" 
              onClick={(e) => { scrollToSection(e, 'reports'); setActiveTab('reports'); }}
              className={`text-body-sm font-semibold transition-all relative py-1 cursor-pointer ${activeTab === 'reports' ? 'text-primary' : 'text-on-surface-muted hover:text-on-surface'}`}
            >
              {t('landpage.reports')}
              {activeTab === 'reports' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-full transition-all"></span>}
            </a>
            <a 
              href="#pricing" 
              onClick={(e) => { scrollToSection(e, 'pricing'); setActiveTab('support'); }}
              className={`text-body-sm font-semibold transition-all relative py-1 cursor-pointer ${activeTab === 'support' ? 'text-primary' : 'text-on-surface-muted hover:text-on-surface'}`}
            >
              Planos
              {activeTab === 'support' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-full transition-all"></span>}
            </a>
          </nav>

          {/* Right Action buttons and country/language switches */}
          <div className="flex items-center gap-xs sm:gap-md">
            
            {/* Country Dropdown Selector with responsive padding */}
            <div className="flex items-center gap-xs border border-border/50 bg-white/50 px-xs py-xs sm:px-md sm:py-md rounded-xl text-body-sm font-semibold text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px] text-on-surface-muted">public</span>
              <select 
                value={selectedCountry} 
                onChange={(e) => handleCountryChange(e.target.value as CountryCode)}
                className="bg-transparent border-none outline-none cursor-pointer text-body-sm font-bold text-on-surface max-w-[140px] sm:max-w-[180px] truncate"
              >
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.names[locale] || c.names['en']} ({c.currency})
                  </option>
                ))}
              </select>
            </div>

            {/* Login button (outline white) */}
            <button 
              onClick={() => setModalOpen(true)}
              className="inline-flex border border-border bg-white text-on-surface font-bold hover:bg-background px-md py-xs sm:px-lg sm:py-md rounded-full text-body-sm transition-all duration-200 cursor-pointer shadow-sm"
            >
              {t('landpage.enter')}
            </button>

            {/* Register button (solid blue) */}
            <a 
              href="/register"
              className="inline-flex bg-primary text-white font-bold hover:bg-primary-dark px-md py-xs sm:px-lg sm:py-md rounded-full text-body-sm transition-all duration-200 cursor-pointer shadow-sm text-center"
            >
              {t('landpage.register')}
            </a>

          </div>

        </div>
      </header>

      {/* Hero Section: Styled with clean typography and gradient colors */}
      <section className="pt-20 pb-16 px-md max-w-7xl mx-auto flex flex-col items-center text-center space-y-md">
        
        <h1 className="text-display-time-mobile md:text-[64px] md:leading-[72px] font-extrabold tracking-tight max-w-[900px] text-on-background">
          {(() => {
            const titleText = t('landpage.title');
            const words = titleText.split(' ');
            const lastWord = words.pop() || '';
            const mainText = words.join(' ');
            return (
              <>
                {mainText} <span className="text-primary">{lastWord}</span>
              </>
            );
          })()}
        </h1>
        
        <p className="text-body-lg md:text-xl text-on-surface-muted max-w-[650px] leading-relaxed mt-md">
          {t('landpage.subtitle')}
        </p>

        {/* Hero CTA Button */}
        <div className="pt-md">
          <a 
            href="/register"
            className="inline-flex bg-primary hover:bg-primary-dark text-white px-xl py-md rounded-full text-body-md font-bold transition-all hover:scale-105 active:scale-95 duration-200 shadow-md shadow-primary/20 cursor-pointer text-center"
          >
            {t('landpage.ctaButton')}
          </a>
        </div>

        {/* Dashboard Preview Graphic Card mockup matching user visual request */}
        <div id="reports" className="pt-16 w-full max-w-[950px] mx-auto">
          <div className="bg-white rounded-2xl border border-border/80 shadow-2xl p-md md:p-xl space-y-xl text-left transform hover:-translate-y-1 transition-all duration-300">
            
            {/* Mock Header Info */}
            <div className="flex items-center justify-between border-b border-border/40 pb-md">
              <div className="flex items-center gap-sm">
                <span className="w-3 h-3 rounded-full bg-red-400"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                <span className="w-3 h-3 rounded-full bg-green-400"></span>
                <span className="text-body-sm font-semibold text-on-surface-muted ml-xs">Dashboard Corporativo • Precision Admin</span>
              </div>
              <span className="bg-primary/10 text-primary text-[11px] font-bold px-sm py-[2px] rounded-full uppercase tracking-wider">Live Preview</span>
            </div>

            {/* 4 Stats Cards matching the attached image */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md">
              
              {/* Stat 1: Total Employees */}
              <div className="bg-surface border border-border/50 rounded-xl p-md space-y-xs hover:border-primary/30 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-label-caps text-on-surface-muted font-bold tracking-wider">{t('landpage.totalEmployees')}</span>
                  <span className="material-symbols-outlined text-primary bg-primary/10 p-xs rounded-full text-lg">group</span>
                </div>
                <div className="space-y-[2px]">
                  <p className="text-[32px] font-black tracking-tight text-on-surface">248</p>
                  <p className="text-body-sm text-secondary font-semibold">{t('landpage.employeesDescription')}</p>
                </div>
              </div>

              {/* Stat 2: Active Employees Now */}
              <div className="bg-surface border border-border/50 rounded-xl p-md space-y-xs hover:border-secondary/30 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-label-caps text-on-surface-muted font-bold tracking-wider">{t('landpage.pendingNow')}</span>
                  <span className="material-symbols-outlined text-secondary bg-secondary/10 p-xs rounded-full text-lg">person_check</span>
                </div>
                <div className="space-y-[2px]">
                  <p className="text-[32px] font-black tracking-tight text-on-surface">192</p>
                  <p className="text-body-sm text-on-surface-muted font-medium">{t('landpage.pendingDescription')}</p>
                </div>
              </div>

              {/* Stat 3: Unresolved registration queries */}
              <div className="bg-surface border border-border/50 rounded-xl p-md space-y-xs hover:border-error/30 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-label-caps text-on-surface-muted font-bold tracking-wider">{t('landpage.unresolvedPunches')}</span>
                  <span className="material-symbols-outlined text-error bg-error/10 p-xs rounded-full text-lg">warning</span>
                </div>
                <div className="space-y-[2px]">
                  <p className="text-[32px] font-black tracking-tight text-on-surface">12</p>
                  <p className="text-body-sm text-error font-medium">{t('landpage.unresolvedDescription')}</p>
                </div>
              </div>

              {/* Stat 4: Overtime accumulated */}
              <div className="bg-surface border border-border/50 rounded-xl p-md space-y-xs hover:border-tertiary/30 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-label-caps text-on-surface-muted font-bold tracking-wider">{t('landpage.overtimeMonth')}</span>
                  <span className="material-symbols-outlined text-primary bg-primary/10 p-xs rounded-full text-lg font-bold">insights</span>
                </div>
                <div className="space-y-[2px]">
                  <p className="text-[32px] font-black tracking-tight text-on-surface">84h</p>
                  <p className="text-body-sm text-secondary font-semibold">{t('landpage.overtimeDescription')}</p>
                </div>
              </div>

            </div>

            {/* Graphics Curve and Attendance History chart curve rendering in Vector */}
            <div className="bg-surface border border-border/40 rounded-xl p-md space-y-md">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-body-md text-on-surface">Histórico Semanal de Frequência</h3>
                  <p className="text-body-sm text-on-surface-muted">Percentual médio de registros concluídos</p>
                </div>
                <div className="flex items-center gap-xs">
                  <span className="w-3 h-3 rounded-full bg-primary"></span>
                  <span className="text-body-sm font-semibold text-on-surface">Período Atual</span>
                </div>
              </div>
              
              <div className="h-48 w-full flex items-end pt-md relative">
                {/* SVG vector curves chart matching clean aesthetic */}
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(0,82,204,0.15)"/>
                      <stop offset="100%" stopColor="rgba(0,82,204,0)"/>
                    </linearGradient>
                  </defs>
                  
                  {/* Fill area */}
                  <path d="M 0 160 Q 150 70 300 120 T 600 50 T 900 30 L 950 30 L 950 192 L 0 192 Z" fill="url(#chart-glow)"/>
                  
                  {/* Line stroke */}
                  <path d="M 0 160 Q 150 70 300 120 T 600 50 T 900 30 L 950 30" fill="none" stroke="#0052cc" strokeWidth="4" strokeLinecap="round"/>
                  
                  {/* Glowing data points */}
                  <circle cx="300" cy="120" r="6" fill="#0052cc" stroke="#ffffff" strokeWidth="2"/>
                  <circle cx="600" cy="50" r="6" fill="#0052cc" stroke="#ffffff" strokeWidth="2"/>
                  <circle cx="900" cy="30" r="6" fill="#0052cc" stroke="#ffffff" strokeWidth="2"/>
                </svg>
                
                {/* Bottom weekday labels */}
                <div className="w-full flex justify-between text-body-sm font-semibold text-on-surface-muted z-10 pt-xl border-t border-border/20 mt-auto">
                  <span>Segunda</span>
                  <span>Terça</span>
                  <span>Quarta</span>
                  <span>Quinta</span>
                  <span>Sexta</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* AirPods-inspired Grid Section: "Conheça o Precision de perto." */}
      <section id="features" className="py-24 bg-white border-t border-border/30">
        <div className="max-w-7xl mx-auto px-md md:px-lg space-y-xl">
          
          {/* Headline matching styling of AirPods showcase section */}
          <div className="text-center md:text-left space-y-xs max-w-2xl">
            <h2 className="text-headline-lg md:text-[48px] md:leading-[56px] font-extrabold tracking-tight text-on-background">
              {t('landpage.exploreTitle')}
            </h2>
            <p className="text-body-lg text-on-surface-muted leading-relaxed">
              {t('landpage.exploreSubtitle')}
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg pt-md">
            
            {/* Card 1: Geofencing validation */}
            <div className="bg-background rounded-3xl p-lg flex flex-col justify-between h-[450px] shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden">
              <div className="space-y-sm">
                <span className="text-label-caps text-primary font-bold uppercase tracking-wider">Origem do Registro</span>
                <h3 className="font-bold text-[22px] leading-tight text-on-surface">{t('landpage.card1Title')}</h3>
                <p className="text-body-sm text-on-surface-muted leading-relaxed">{t('landpage.card1Desc')}</p>
              </div>
              
              {/* Custom micro-interactive map radar widget */}
              <div className="h-40 w-full bg-white/60 border border-border/40 rounded-2xl flex items-center justify-center relative mt-lg overflow-hidden">
                <div className="absolute w-28 h-28 rounded-full border border-primary/20 animate-ping"></div>
                <div className="absolute w-16 h-16 rounded-full border border-primary/40 bg-primary/5"></div>
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white relative z-10 shadow-lg shadow-primary/30">
                  <span className="material-symbols-outlined text-[18px]">location_on</span>
                </div>
                {/* Floating tags */}
                <div className="absolute bottom-3 right-3 bg-secondary text-white font-bold text-[9px] px-sm py-[2px] rounded-full uppercase tracking-wider flex items-center gap-[2px]">
                  <span className="material-symbols-outlined text-[10px]">check_circle</span>
                  IP Autorizado
                </div>
              </div>
            </div>

            {/* Card 2: Exclusions and custom weekdays block */}
            <div className="bg-background rounded-3xl p-lg flex flex-col justify-between h-[450px] shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden">
              <div className="space-y-sm">
                <span className="text-label-caps text-secondary font-bold uppercase tracking-wider">Controle Operacional</span>
                <h3 className="font-bold text-[22px] leading-tight text-on-surface">{t('landpage.card2Title')}</h3>
                <p className="text-body-sm text-on-surface-muted leading-relaxed">{t('landpage.card2Desc')}</p>
              </div>

              {/* Interactive Weekly buttons mock */}
              <div className="bg-white/60 border border-border/40 rounded-2xl p-sm space-y-xs mt-lg">
                <p className="text-[10px] font-bold text-on-surface-muted uppercase tracking-wider border-b border-border/30 pb-xs mb-xs">Controle de Escala (Demo)</p>
                <div className="grid grid-cols-4 gap-xs">
                  {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((d, index) => {
                    // Match weekdays: Sat (6) and Sun (0)
                    const dayVal = index === 6 ? 0 : index;
                    const isBlocked = demoWeekdays.includes(dayVal);
                    return (
                      <button
                        key={index}
                        onClick={() => toggleDemoWeekday(dayVal)}
                        className={`py-xs rounded-lg font-bold text-body-sm cursor-pointer transition-colors text-center ${isBlocked ? 'bg-error/10 text-error border border-error/30' : 'bg-surface border border-border/50 text-on-surface hover:border-primary/40'}`}
                      >
                        {d}
                      </button>
                    );
                  })}
                </div>
                <div className="text-[9px] text-on-surface-muted text-center pt-xs font-semibold">
                  Clique para marcar/bloquear o dia
                </div>
              </div>
            </div>

            {/* Card 3: A4 Print sheets */}
            <div className="bg-background rounded-3xl p-lg flex flex-col justify-between h-[450px] shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden">
              <div className="space-y-sm">
                <span className="text-label-caps text-primary font-bold uppercase tracking-wider">Exportação & Assinatura</span>
                <h3 className="font-bold text-[22px] leading-tight text-on-surface">{t('landpage.card3Title')}</h3>
                <p className="text-body-sm text-on-surface-muted leading-relaxed">{t('landpage.card3Desc')}</p>
              </div>

              {/* Graphic Mock PDF vector sheet */}
              <div className="h-40 w-full bg-white/70 border border-border/30 rounded-2xl p-md flex flex-col gap-xs mt-lg relative overflow-hidden">
                <div className="border-b border-border/40 pb-xs flex justify-between items-center">
                  <span className="text-[9px] font-bold text-on-surface">FOLHA_DE_PONTO_A4.pdf</span>
                  <span className="material-symbols-outlined text-[14px] text-primary">download</span>
                </div>
                {/* Horizontal skeleton lines */}
                <div className="w-full h-2 bg-border/40 rounded"></div>
                <div className="w-4/5 h-2 bg-border/40 rounded"></div>
                <div className="w-5/6 h-2 bg-border/40 rounded"></div>
                
                {/* Mock stats graphics inside PDF */}
                <div className="flex gap-sm items-center pt-xs mt-auto">
                  <div className="w-12 h-6 bg-secondary/15 rounded flex items-center justify-center text-[8px] font-black text-secondary">
                    OK
                  </div>
                  <div className="flex-1 border-t border-dashed border-border/60"></div>
                  <span className="text-[9px] font-semibold text-on-surface-muted italic">Assinado digitalmente</span>
                </div>
              </div>
            </div>

            {/* Card 4: Hour bank compliance rules */}
            <div className="bg-background rounded-3xl p-lg flex flex-col justify-between h-[450px] shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden">
              <div className="space-y-sm">
                <span className="text-label-caps text-secondary font-bold uppercase tracking-wider">Segurança Jurídica</span>
                <h3 className="font-bold text-[22px] leading-tight text-on-surface">{t('landpage.card4Title')}</h3>
                <p className="text-body-sm text-on-surface-muted leading-relaxed">{t('landpage.card4Desc')}</p>
              </div>

              {/* Mock users cards stack with status circles */}
              <div className="bg-white/60 border border-border/40 rounded-2xl p-sm space-y-sm mt-lg">
                <div className="flex items-center gap-xs">
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary font-black text-body-sm flex items-center justify-center">TL</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[10px] text-on-surface truncate">Thalysson Lima</p>
                    <p className="text-[9px] text-secondary font-semibold">Líder de Equipe</p>
                  </div>
                  <span className="material-symbols-outlined text-[16px] text-secondary">check_circle</span>
                </div>

                <div className="flex items-center gap-xs">
                  <div className="w-8 h-8 rounded-full bg-secondary/20 text-secondary font-black text-body-sm flex items-center justify-center">AD</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[10px] text-on-surface truncate">Admin Supervisor</p>
                    <p className="text-[9px] text-on-surface-muted font-medium">Gestor Geral</p>
                  </div>
                  <span className="bg-secondary text-white text-[8px] font-bold px-sm py-[2px] rounded-full">Ativo</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Mobile App Showcase Section */}
      <section className="py-24 bg-[#F8F9FF] border-t border-border/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-md md:px-lg grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">
          
          {/* Left Column: Title and Bullet List */}
          <div className="space-y-lg text-left">
            <h2 className="text-headline-lg md:text-[48px] md:leading-[56px] font-extrabold tracking-tight text-on-background">
              {t('landpage.mobileShowcaseTitle')}
            </h2>
            <p className="text-body-lg text-on-surface-muted leading-relaxed">
              {t('landpage.mobileShowcaseSubtitle')}
            </p>
            <ul className="space-y-md text-body-md text-on-surface-muted">
              <li className="flex items-start gap-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-primary mt-[6px] flex-shrink-0"></span>
                <span>{t('landpage.mobileFeat1')}</span>
              </li>
              <li className="flex items-start gap-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-primary mt-[6px] flex-shrink-0"></span>
                <span>{t('landpage.mobileFeat2')}</span>
              </li>
              <li className="flex items-start gap-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-primary mt-[6px] flex-shrink-0"></span>
                <span>{t('landpage.mobileFeat3')}</span>
              </li>
              <li className="flex items-start gap-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-primary mt-[6px] flex-shrink-0"></span>
                <span>{t('landpage.mobileFeat4')}</span>
              </li>
              <li className="flex items-start gap-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-primary mt-[6px] flex-shrink-0"></span>
                <span>{t('landpage.mobileFeat5')}</span>
              </li>
            </ul>
          </div>

          {/* Right Column: Mobile App Screenshot */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[420px] rounded-[36px] overflow-hidden shadow-2xl border border-border/20 transition-transform duration-500 hover:scale-[1.02] bg-white">
              <img 
                src="/images/home.png" 
                alt="Precision Mobile App Showcase"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Pricing Section: Highly visible plans */}
      <section id="pricing" className="py-24 bg-background border-t border-border/30">
        <div className="max-w-7xl mx-auto px-md md:px-lg space-y-xl">
          
          <div className="text-center space-y-md max-w-2xl mx-auto">
            <h2 className="text-headline-lg md:text-[40px] font-extrabold tracking-tight text-on-background">
              {t('landpage.pricingTitle')}
            </h2>
            <p className="text-body-lg text-on-surface-muted leading-relaxed">
              {t('landpage.pricingSubtitle')}
            </p>

            {/* Billing cycle switch (mensal / anual) */}
            <div className="flex justify-center pt-md">
              <div className="bg-white border border-border/80 p-[4px] rounded-full flex gap-xs relative shadow-sm">
                <button
                  type="button"
                  onClick={() => setBillingCycle('MONTHLY')}
                  className={`px-lg py-xs rounded-full font-bold text-body-sm transition-all duration-200 cursor-pointer flex items-center gap-xs ${billingCycle === 'MONTHLY' ? 'bg-primary text-white shadow-sm' : 'text-on-surface-muted hover:text-on-surface'}`}
                >
                  <span>{t('landpage.pricingMonthly')}</span>
                  <span className={`pointer-events-none ${billingCycle === 'MONTHLY' ? 'bg-white text-primary' : 'bg-success text-white'} text-[9px] font-extrabold px-xs py-[2px] rounded-full uppercase leading-none`}>
                    -50%
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setBillingCycle('ANNUAL')}
                  className={`px-lg py-xs rounded-full font-bold text-body-sm transition-all duration-200 cursor-pointer flex items-center gap-xs ${billingCycle === 'ANNUAL' ? 'bg-primary text-white shadow-sm' : 'text-on-surface-muted hover:text-on-surface'}`}
                >
                  <span>{t('landpage.pricingAnnual')}</span>
                  <span className={`pointer-events-none ${billingCycle === 'ANNUAL' ? 'bg-white text-primary' : 'bg-success text-white'} text-[9px] font-extrabold px-xs py-[2px] rounded-full uppercase leading-none`}>
                    -50%
                  </span>
                </button>
              </div>
            </div>

            {/* Currency indicator based on location */}
            <div className="text-center text-body-xs text-on-surface-muted/90 flex justify-center items-center gap-xs">
              <span className="material-symbols-outlined text-[14px]">public</span>
              {currency === 'BRL' && t('landpage.pricingCurrencyLabelBRL')}
              {currency === 'EUR' && t('landpage.pricingCurrencyLabelEUR')}
              {currency === 'USD' && t('landpage.pricingCurrencyLabelUSD')}
              {currency === 'CAD' && t('landpage.pricingCurrencyLabelCAD')}
            </div>
          </div>

          {/* Pricing cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg max-w-5xl mx-auto pt-sm">
            {getPlansData(currency, billingCycle).map((plan) => {
              const isRecommended = plan.limit === 30; // 30 employees is "most popular / recommended"
              const planNames: Record<number, string> = {
                15: 'fifteen-employees',
                30: 'thirty-employees',
                50: 'fifty-employees'
              };
              const planKey = planNames[plan.limit] || 'custom';
              const eventName = `GA4::Landpage:plan_${planKey}`;

              return (
                <div
                  key={plan.id}
                  className={`bg-white border rounded-3xl p-lg flex flex-col justify-between relative transition-all duration-300 min-h-[580px] hover:scale-[1.01] ${
                    isRecommended 
                      ? 'border-2 border-primary shadow-lg shadow-primary/5 ring-1 ring-primary/10' 
                      : 'border-border/60 shadow-sm hover:shadow-md'
                  }`}
                >
                  {isRecommended && (
                    <div className="absolute -top-3 right-6 bg-primary text-white text-[9px] font-black px-md py-[3px] rounded-full uppercase tracking-wider">
                      {t('landpage.pricingBestValue')}
                    </div>
                  )}

                  <div className="space-y-md">
                    <span className={`text-[10px] font-bold px-sm py-[3px] rounded-full uppercase tracking-wider ${
                      isRecommended ? 'bg-primary/10 text-primary' : 'bg-on-surface/10 text-on-surface'
                    }`}>
                      {plan.badge}
                    </span>
                    <h3 className="font-bold text-[24px] text-on-surface">{plan.title}</h3>
                    <p className="text-body-sm text-on-surface-muted leading-relaxed">{plan.description}</p>
                  </div>

                  <div className="space-y-sm pt-md border-t border-border/30">
                    <div className="flex flex-col">
                      <div className="flex flex-col gap-y-xs">
                        {plan.originalPriceStr && (
                          <span className="text-body-xs text-on-surface-muted/50 line-through">
                            {getCurrencySymbol(plan.currency)} {billingCycle === 'ANNUAL' ? getMonthlyEquivalent(plan.originalPriceStr) : plan.originalPriceStr}
                          </span>
                        )}
                        <div className="flex items-baseline">
                          <span className="text-[40px] font-black tracking-tight text-on-surface font-bold">
                            {getCurrencySymbol(plan.currency)} {billingCycle === 'ANNUAL' ? getMonthlyEquivalent(plan.priceStr) : plan.priceStr}
                          </span>
                          <span className="text-body-sm text-on-surface-muted ml-xs font-normal">
                            /{t('landpage.pricingMonthlySuffix')}
                          </span>
                        </div>
                        <div className="text-body-xs text-on-surface-muted font-medium">
                          {t('landpage.pricingTotal', {
                            currency: getCurrencySymbol(plan.currency),
                            price: plan.priceStr,
                            period: billingCycle === 'ANNUAL' ? t('landpage.pricingAnnualSuffix') : t('landpage.pricingMonthlySuffix')
                          })}
                        </div>
                        <div className="text-success text-body-xs font-semibold flex items-center gap-xs mt-xs">
                          <span className="material-symbols-outlined text-[16px]">savings</span>
                          {billingCycle === 'MONTHLY' ? t('landpage.pricingDiscount') : t('landpage.pricingDiscountAnnual')}
                        </div>
                      </div>
                    </div>

                    <p className="text-body-xs text-on-surface-muted/90 font-medium pt-sm">
                      {t('landpage.pricingTrialPeriod')}
                    </p>

                    <ul className="mt-lg space-y-sm text-body-xs text-on-surface-muted/95 border-t border-border/30 pt-md">
                      <li className="flex items-center gap-xs">
                        <span className="material-symbols-outlined text-success text-[14px]">check_circle</span>
                        {t('landpage.pricingFeatEmployees', { limit: plan.limit })}
                      </li>
                      <li className="flex items-center gap-xs">
                        <span className="material-symbols-outlined text-success text-[14px]">check_circle</span>
                        {t('landpage.pricingFeatTimeTracking')}
                      </li>
                      <li className="flex items-center gap-xs">
                        <span className="material-symbols-outlined text-success text-[14px]">check_circle</span>
                        {t('landpage.pricingFeatTeams')}
                      </li>
                      <li className="flex items-center gap-xs">
                        <span className="material-symbols-outlined text-success text-[14px]">check_circle</span>
                        {t('landpage.pricingFeatBlockDays')}
                      </li>
                      <li className="flex items-center gap-xs">
                        <span className="material-symbols-outlined text-success text-[14px]">check_circle</span>
                        {t('landpage.pricingFeatBlockUsers')}
                      </li>
                      <li className="flex items-center gap-xs">
                        <span className="material-symbols-outlined text-success text-[14px]">check_circle</span>
                        {t('landpage.pricingFeatReportsTrack')}
                      </li>
                      <li className="flex items-center gap-xs">
                        <span className="material-symbols-outlined text-success text-[14px]">check_circle</span>
                        {t('landpage.pricingFeatLocation')}
                      </li>
                    </ul>

                    <a 
                      href="/register"
                      onClick={() => sendGTMEvent({ event: eventName })}
                      className={`w-full py-md font-bold rounded-xl text-body-sm transition-all duration-200 mt-md cursor-pointer text-center block ${
                        isRecommended
                          ? 'bg-primary hover:bg-primary-dark text-white'
                          : 'bg-on-surface/10 hover:bg-on-surface/20 text-on-surface'
                      }`}
                    >
                      {t('landpage.selectPlanButton')}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      <Footer t={t} scrollToSection={scrollToSection} />

      {/* Access Selection Modal with modern glassmorphism design */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-md animate-fade-in">
          <div className="bg-white rounded-3xl border border-border max-w-[480px] w-full p-lg space-y-lg shadow-2xl relative">
            
            {/* Close Button */}
            <button 
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-background hover:bg-border/30 text-on-surface-variant flex items-center justify-center cursor-pointer transition-colors active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>

            {/* Modal Header */}
            <div className="text-center space-y-xs pt-sm">
              <h3 className="font-extrabold text-[22px] tracking-tight text-on-surface">{t('landpage.selectPortal')}</h3>
              <p className="text-body-sm text-on-surface-muted">Selecione o acesso correspondente ao seu perfil para continuar</p>
            </div>

            {/* Choices Grid */}
            <div className="space-y-sm pt-xs">
              
              {/* Option 1: Manager Portal */}
              <a 
                href={getAdminUrl()}
                className="flex items-center gap-md p-md rounded-2xl border border-border/80 hover:border-primary/60 bg-background/50 hover:bg-primary/[0.02] transition-all group block text-left"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-105 transition-transform flex-shrink-0">
                  <span className="material-symbols-outlined text-[24px]">group</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-body-md text-on-surface">{t('landpage.portalAdmin')}</h4>
                  <p className="text-body-sm text-on-surface-muted truncate">Acesso para administradores, líderes de equipe e RH.</p>
                </div>
                <span className="material-symbols-outlined text-on-surface-muted group-hover:text-primary transition-colors text-[20px]">chevron_right</span>
              </a>

              {/* Option 2: Employee Portal */}
              <a 
                href={getEmployeeUrl()}
                className="flex items-center gap-md p-md rounded-2xl border border-border/80 hover:border-secondary/60 bg-background/50 hover:bg-secondary/[0.02] transition-all group block text-left"
              >
                <div className="w-11 h-11 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center group-hover:scale-105 transition-transform flex-shrink-0">
                  <span className="material-symbols-outlined text-[24px]">calendar_today</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-body-md text-on-surface">{t('landpage.portalEmployee')}</h4>
                  <p className="text-body-sm text-on-surface-muted truncate">Acesso para colaboradores registrarem ponto e ajustarem horas.</p>
                </div>
                <span className="material-symbols-outlined text-on-surface-muted group-hover:text-secondary transition-colors text-[20px]">chevron_right</span>
              </a>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
