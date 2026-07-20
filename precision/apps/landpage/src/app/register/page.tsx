'use client';

import React, { useState } from 'react';
import { sendGTMEvent } from '@next/third-parties/google';
import { useI18n } from '../../locales/useI18n';
import { Locale } from '../../locales';

const content = {
  pt: {
    title: 'Crie sua conta corporativa',
    subtitle: 'Cadastre sua empresa, organize suas equipes e controle o ponto de forma inteligente.',
    infoTitle: 'Avaliação Gratuita de 30 Dias',
    infoBullet1: 'Cadastre sua empresa e configure suas regras de negócio.',
    infoBullet2: 'Cadastre quantos colaboradores precisar sem custos adicionais.',
    infoBullet3: 'Use todos os recursos de geolocalização e relatórios vetoriais.',
    infoBullet4: 'Após o período de 30 dias, escolha o plano ideal para continuar.',
    formCompany: 'Nome Fantasia / Nome da Empresa',
    formCorporateName: 'Razão Social',
    formCountry: 'País da Empresa',
    formCountryPlaceholder: 'Selecione o país...',
    formDocument: 'Número do Documento (VAT)',
    formDocumentCNPJ: 'CNPJ',
    formStreet: 'Rua',
    formNumber: 'Número',
    formCity: 'Cidade',
    formState: 'Estado',
    formZip: 'CEP / Código Postal',
    searchTooltip: 'Pressione Enter ou clique fora para buscar',
    loadingData: 'Consultando API...',
    countryBR: 'Brasil',
    countryGB: 'Reino Unido',
    countryDE: 'Alemanha',
    countryCH: 'Suíça',
    countryPT: 'Portugal',
    countryAT: 'Áustria',
    countryIE: 'Irlanda',
    countryNL: 'Países Baixos',
    countrySE: 'Suécia',
    countryNO: 'Noruega',
    countryDK: 'Dinamarca',
    formAdminName: 'Nome Completo do Gestor',
    formEmail: 'E-mail Corporativo',
    formPassword: 'Senha de Acesso',
    formEmployees: 'Quantidade de Funcionários',
    formEmployeesOption1: 'Até 15 funcionários',
    formEmployeesOption2: 'Até 30 funcionários',
    formEmployeesOption3: 'Até 50 funcionários',
    submitButton: 'Iniciar Teste de 30 Dias Grátis',
    footerSecurity: 'Ambiente seguro e em total conformidade com a LGPD e as portarias do MTE.',
    backHome: 'Voltar para o início',
    successTitle: 'Cadastro realizado com sucesso!',
    successMessage: 'Sua empresa foi registrada e seu período trial de 30 dias está ativo. Você receberá um e-mail de confirmação.',
    successRedirect: 'Acessar Painel Administrativo'
  },
  en: {
    title: 'Create your corporate account',
    subtitle: 'Register your company, manage your teams, and track shifts intelligently.',
    infoTitle: '30-Day Free Trial',
    infoBullet1: 'Register your company and configure your custom business rules.',
    infoBullet2: 'Register as many employees as you need without extra fees.',
    infoBullet3: 'Use all geolocation and vector print report features.',
    infoBullet4: 'After 30 days, choose the ideal plan for your company to continue.',
    formCompany: 'Trade Name / Company Name',
    formCorporateName: 'Corporate Name',
    formCountry: 'Company Country',
    formCountryPlaceholder: 'Select a country...',
    formDocument: 'Document Number (VAT)',
    formDocumentCNPJ: 'CNPJ',
    formStreet: 'Street',
    formNumber: 'Number',
    formCity: 'City',
    formState: 'State / Province',
    formZip: 'Postal Code / ZIP',
    searchTooltip: 'Press Enter or click outside to search',
    loadingData: 'Querying API...',
    countryBR: 'Brazil',
    countryGB: 'United Kingdom',
    countryDE: 'Germany',
    countryCH: 'Switzerland',
    countryPT: 'Portugal',
    countryAT: 'Austria',
    countryIE: 'Ireland',
    countryNL: 'Netherlands',
    countrySE: 'Sweden',
    countryNO: 'Norway',
    countryDK: 'Denmark',
    formAdminName: 'Manager Full Name',
    formEmail: 'Corporate Email',
    formPassword: 'Access Password',
    formEmployees: 'Number of Employees',
    formEmployeesOption1: 'Up to 15 employees',
    formEmployeesOption2: 'Up to 30 employees',
    formEmployeesOption3: 'Up to 50 employees',
    submitButton: 'Start 30-Day Free Trial',
    footerSecurity: 'Secure environment in full compliance with local labor regulations.',
    backHome: 'Back to home',
    successTitle: 'Registration completed successfully!',
    successMessage: 'Your company has been registered and your 30-day trial period is active. You will receive a confirmation email shortly.',
    successRedirect: 'Access Admin Dashboard'
  },
  de: {
    title: 'Erstellen Sie Ihr Firmenkonto',
    subtitle: 'Registrieren Sie Ihr Unternehmen, verwalten Sie Ihre Teams und erfassen Sie Zeiten intelligent.',
    infoTitle: '30-tägige kostenlose Testversion',
    infoBullet1: 'Registrieren Sie Ihr Unternehmen und konfigurieren Sie eigene Regeln.',
    infoBullet2: 'Registrieren Sie beliebig viele Mitarbeiter ohne Aufpreis.',
    infoBullet3: 'Nutzen Sie alle Geolokalisierungs- und Vektorbericht-Funktionen.',
    infoBullet4: 'Wählen Sie nach 30 Tagen den passenden Plan, um fortzufahren.',
    formCompany: 'Unternehmensname / Handelsname',
    formCorporateName: 'Firmenname (Eingetragen)',
    formCountry: 'Land des Unternehmens',
    formCountryPlaceholder: 'Land auswählen...',
    formDocument: 'Dokumentennummer (USt-IdNr.)',
    formDocumentCNPJ: 'CNPJ (Brasilien)',
    formStreet: 'Straße',
    formNumber: 'Hausnummer',
    formCity: 'Stadt',
    formState: 'Bundesland / Kanton',
    formZip: 'Postleitzahl',
    searchTooltip: 'Drücken Sie die Eingabetaste oder klicken Sie nach draußen, um zu suchen',
    loadingData: 'API wird abgefragt...',
    countryBR: 'Brasilien',
    countryGB: 'Vereinigtes Königreich',
    countryDE: 'Deutschland',
    countryCH: 'Schweiz',
    countryPT: 'Portugal',
    countryAT: 'Österreich',
    countryIE: 'Irland',
    countryNL: 'Niederlande',
    countrySE: 'Schweden',
    countryNO: 'Norwegen',
    countryDK: 'Dänemark',
    formAdminName: 'Vollständiger Name des Managers',
    formEmail: 'Firmen-E-Mail',
    formPassword: 'Zugangspasswort',
    formEmployees: 'Anzahl der Mitarbeiter',
    formEmployeesOption1: 'Bis zu 15 Mitarbeiter',
    formEmployeesOption2: 'Bis zu 30 Mitarbeiter',
    formEmployeesOption3: 'Bis zu 50 Mitarbeiter',
    submitButton: '30-tägige Testphase starten',
    footerSecurity: 'Sichere Umgebung in voller Übereinstimmung mit den gesetzlichen Vorgaben.',
    backHome: 'Zurück zur Startseite',
    successTitle: 'Registrierung erfolgreich abgeschlossen!',
    successMessage: 'Ihr Unternehmen wurde registriert und Ihre 30-tägige Testphase ist aktiv. Sie erhalten in Kürze eine Bestätigungs-E-Mail.',
    successRedirect: 'Zum Admin-Dashboard'
  }
};

export default function Register() {
  const { locale } = useI18n();
  const currentLocale = (locale || 'pt') as Locale;
  const tLocal = content[currentLocale] || content['pt'];

  // Form State
  const [country, setCountry] = useState('');
  const [document, setDocument] = useState('');
  const [company, setCompany] = useState('');
  const [corporateName, setCorporateName] = useState('');
  
  // Address State
  const [zip, setZip] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');

  // Manager and Other details State
  const [manager, setManager] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [employees, setEmployees] = useState('');

  // UI Flow State
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  // CNPJ Format Mask
  const formatCNPJ = (val: string) => {
    const clean = val.replace(/\D/g, '');
    if (clean.length <= 2) return clean;
    if (clean.length <= 5) return `${clean.slice(0, 2)}.${clean.slice(2)}`;
    if (clean.length <= 8) return `${clean.slice(0, 2)}.${clean.slice(2, 5)}.${clean.slice(5)}`;
    if (clean.length <= 12) return `${clean.slice(0, 2)}.${clean.slice(2, 5)}.${clean.slice(5, 8)}/${clean.slice(8)}`;
    return `${clean.slice(0, 2)}.${clean.slice(2, 5)}.${clean.slice(5, 8)}/${clean.slice(8, 12)}-${clean.slice(12, 14)}`;
  };

  // Fetch Company Data using Proxy API Routes
  const triggerLookup = async (selectedCountry: string, docVal: string) => {
    if (!docVal) return;
    setIsLoading(true);
    try {
      let url = '';
      if (selectedCountry === 'BR') {
        url = `/api/lookup/cnpj?cnpj=${encodeURIComponent(docVal)}`;
      } else {
        url = `/api/lookup/vat?country=${encodeURIComponent(selectedCountry)}&vat=${encodeURIComponent(docVal)}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || (selectedCountry === 'BR' ? 'Erro ao consultar CNPJ' : 'Erro ao consultar documento'));
      }

      setCorporateName(data.razao_social || '');
      setCompany(data.nome_fantasia || data.razao_social || '');
      setStreet(data.street || '');
      setNumber(data.number || '');
      setCity(data.city || '');
      setStateName(data.state || '');
      setZip(data.zip || '');

      showToast(
        currentLocale === 'pt' ? 'Dados carregados com sucesso!' :
        currentLocale === 'de' ? 'Daten erfolgreich geladen!' :
        'Company data loaded successfully!',
        'success'
      );
    } catch (err: any) {
      console.error(err);
      showToast(err.message || 'Erro de conexão ao buscar dados corporativos.', 'error');
      // Reset loaded company and address fields on lookup error
      setCorporateName('');
      setCompany('');
      setStreet('');
      setNumber('');
      setCity('');
      setStateName('');
      setZip('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (country === 'BR') {
      const formatted = formatCNPJ(val);
      setDocument(formatted);
      
      const clean = formatted.replace(/\D/g, '');
      if (clean.length === 14) {
        triggerLookup('BR', clean);
      }
    } else {
      setDocument(val);
    }
  };

  const handleDocumentBlur = () => {
    if (country && country !== 'BR' && document.trim().length >= 4) {
      triggerLookup(country, document.trim());
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !country || 
      !document || 
      !company || 
      !corporateName || 
      !street || 
      !number || 
      !city || 
      !stateName || 
      !zip || 
      !manager || 
      !email || 
      !password || 
      !employees
    ) {
      showToast(
        currentLocale === 'pt' ? 'Por favor, preencha todos os campos obrigatórios.' :
        currentLocale === 'de' ? 'Bitte füllen Sie alle Pflichtfelder aus.' :
        'Please fill in all required fields.',
        'error'
      );
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          country,
          document,
          company,
          corporateName,
          zip,
          street,
          number,
          city,
          stateName,
          manager,
          email,
          password,
          employees,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Erro ao realizar o cadastro da empresa');
      }

      setIsSuccess(true);
    } catch (err: any) {
      console.error(err);
      showToast(err.message || 'Erro ao conectar ao servidor para realizar o cadastro.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-surface select-none relative overflow-x-hidden flex flex-col justify-between font-sans">
      
      {/* Toast Notification Container */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-lg py-md rounded-2xl shadow-xl text-white font-semibold transition-all duration-300 transform scale-100 flex items-center gap-sm animate-fade-in ${
          toast.type === 'success' ? 'bg-secondary border border-secondary/25' : 'bg-error border border-error/25'
        }`}>
          <span className="material-symbols-outlined text-[20px] font-bold">
            {toast.type === 'success' ? 'check_circle' : 'error'}
          </span>
          <span className="text-body-sm">{toast.message}</span>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 apple-blur-nav w-full transition-all duration-300">
        <div className="max-w-7xl mx-auto h-16 px-md md:px-lg flex items-center justify-between">
          
          <a href="/" className="flex items-center gap-xs cursor-pointer">
            <img 
              src="/images/precision.png" 
              alt="Precision Logo" 
              className="w-8 h-8 object-contain" 
            />
            <span className="font-bold text-headline-lg tracking-tight text-on-background">Precision</span>
          </a>

          <a 
            href="/"
            className="flex items-center gap-xs text-body-sm font-semibold text-primary hover:text-primary-dark transition-colors px-md py-sm rounded-lg"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            {tLocal.backHome}
          </a>

        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-md py-xl flex items-center justify-center">
        
        {isSuccess ? (
          /* Success State Card */
          <div className="bg-white rounded-3xl border border-border/80 shadow-2xl p-xl max-w-[540px] w-full text-center space-y-lg transform animate-fade-in py-16">
            <div className="w-16 h-16 rounded-full bg-secondary/15 text-secondary flex items-center justify-center mx-auto mb-md animate-bounce">
              <span className="material-symbols-outlined text-[36px] font-bold">check_circle</span>
            </div>
            <h2 className="font-extrabold text-[28px] tracking-tight text-on-background leading-tight">
              {tLocal.successTitle}
            </h2>
            <p className="text-body-lg text-on-surface-muted leading-relaxed px-md">
              {tLocal.successMessage}
            </p>
            <div className="pt-md">
              <a
                href={
                  typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
                    ? 'http://localhost:3002/login'
                    : `${process.env.NEXT_PUBLIC_PORTAL_ADMIN_URL || 'https://precision-portal-admin.vercel.app'}/login`
                }
                className="inline-flex bg-primary hover:bg-primary-dark text-white px-xl py-md rounded-full text-body-md font-bold transition-all hover:scale-105 active:scale-95 duration-200 shadow-md shadow-primary/20 cursor-pointer"
              >
                {tLocal.successRedirect}
              </a>
            </div>
          </div>
        ) : (
          /* Split Layout Registration Form */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl w-full items-stretch">
            
            {/* Left Info Column */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-lg text-left pr-lg">
              <span className="bg-primary/10 text-primary text-[11px] font-black px-md py-[6px] rounded-full uppercase tracking-wider self-start">
                {tLocal.infoTitle}
              </span>
              <h1 className="text-display-time-mobile md:text-[44px] md:leading-[52px] font-extrabold tracking-tight text-on-background">
                {tLocal.title}
              </h1>
              <p className="text-body-lg text-on-surface-muted leading-relaxed">
                {tLocal.subtitle}
              </p>

              {/* Informative Checklist */}
              <div className="space-y-md pt-md">
                <div className="flex items-start gap-sm">
                  <span className="material-symbols-outlined text-secondary bg-secondary/10 p-[6px] rounded-full text-md font-black">check</span>
                  <span className="text-body-sm font-semibold text-on-surface-variant leading-relaxed">
                    {tLocal.infoBullet1}
                  </span>
                </div>
                <div className="flex items-start gap-sm">
                  <span className="material-symbols-outlined text-secondary bg-secondary/10 p-[6px] rounded-full text-md font-black">check</span>
                  <span className="text-body-sm font-semibold text-on-surface-variant leading-relaxed">
                    {tLocal.infoBullet2}
                  </span>
                </div>
                <div className="flex items-start gap-sm">
                  <span className="material-symbols-outlined text-secondary bg-secondary/10 p-[6px] rounded-full text-md font-black">check</span>
                  <span className="text-body-sm font-semibold text-on-surface-variant leading-relaxed">
                    {tLocal.infoBullet3}
                  </span>
                </div>
                <div className="flex items-start gap-sm">
                  <span className="material-symbols-outlined text-secondary bg-secondary/10 p-[6px] rounded-full text-md font-black">check</span>
                  <span className="text-body-sm font-semibold text-on-surface-variant leading-relaxed">
                    {tLocal.infoBullet4}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Registration Card Column */}
            <div className="lg:col-span-7 flex items-center justify-center">
              <div className="bg-white rounded-3xl border border-border/80 shadow-2xl p-md md:p-xl w-full max-w-[620px] space-y-md">
                <form onSubmit={handleSubmit} className="space-y-md">
                  
                  {/* Select Country */}
                  <div className="flex flex-col gap-xs">
                    <label className="text-[12px] font-bold text-on-surface-muted uppercase tracking-wider">
                      {tLocal.formCountry}
                    </label>
                    <div className="relative">
                      <select 
                        required 
                        value={country}
                        onChange={(e) => {
                          setCountry(e.target.value);
                          setDocument('');
                          setCompany('');
                          setCorporateName('');
                          setZip('');
                          setStreet('');
                          setNumber('');
                          setCity('');
                          setStateName('');
                        }}
                        className="w-full px-md py-md rounded-xl border border-border/60 bg-background/30 hover:bg-background/10 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-semibold text-body-sm appearance-none cursor-pointer"
                      >
                        <option value="" disabled hidden>{tLocal.formCountryPlaceholder}</option>
                        <option value="BR">{tLocal.countryBR}</option>
                        <option value="GB">{tLocal.countryGB}</option>
                        <option value="DE">{tLocal.countryDE}</option>
                        <option value="CH">{tLocal.countryCH}</option>
                        <option value="PT">{tLocal.countryPT}</option>
                        <option value="AT">{tLocal.countryAT}</option>
                        <option value="IE">{tLocal.countryIE}</option>
                        <option value="NL">{tLocal.countryNL}</option>
                        <option value="SE">{tLocal.countrySE}</option>
                        <option value="NO">{tLocal.countryNO}</option>
                        <option value="DK">{tLocal.countryDK}</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-muted">
                        keyboard_arrow_down
                      </span>
                    </div>
                  </div>

                  {/* Document (CNPJ or VAT) */}
                  <div className="flex flex-col gap-xs">
                    <label className="text-[12px] font-bold text-on-surface-muted uppercase tracking-wider">
                      {country === 'BR' ? tLocal.formDocumentCNPJ : tLocal.formDocument}
                    </label>
                    <div className="relative flex items-center">
                      <input 
                        type="text" 
                        required 
                        disabled={!country}
                        value={document}
                        onChange={handleDocumentChange}
                        onBlur={handleDocumentBlur}
                        placeholder={
                          !country ? '---' : 
                          country === 'BR' ? '00.000.000/0000-00' : 
                          'Ex: DE123456789'
                        }
                        className={`w-full px-md py-md rounded-xl border border-border/60 outline-none transition-all font-semibold text-body-sm 
                          ${!country ? 'bg-background/10 text-on-surface-muted cursor-not-allowed border-border/40' : 'bg-background/30 hover:bg-background/10 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20'} 
                          ${isLoading ? 'pr-12' : ''}`}
                      />
                      {isLoading && (
                        <div className="absolute right-4 flex items-center">
                          <span className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full"></span>
                        </div>
                      )}
                    </div>
                    {country && country !== 'BR' && (
                      <span className="text-[10px] text-on-surface-muted italic">
                        {tLocal.searchTooltip}
                      </span>
                    )}
                  </div>

                  {/* Corporate Name (Razão Social) - Disabled */}
                  <div className="flex flex-col gap-xs">
                    <label className="text-[12px] font-bold text-on-surface-muted uppercase tracking-wider">
                      {tLocal.formCorporateName}
                    </label>
                    <input 
                      type="text" 
                      required 
                      disabled
                      value={corporateName}
                      placeholder={country ? '...' : '---'}
                      className="w-full px-md py-md rounded-xl border border-border/40 bg-background/10 text-on-surface-muted font-semibold text-body-sm cursor-not-allowed"
                    />
                  </div>

                  {/* Trade Name (Nome Fantasia) - Disabled */}
                  <div className="flex flex-col gap-xs">
                    <label className="text-[12px] font-bold text-on-surface-muted uppercase tracking-wider">
                      {tLocal.formCompany}
                    </label>
                    <input 
                      type="text" 
                      required 
                      disabled
                      value={company}
                      placeholder={country ? '...' : '---'}
                      className="w-full px-md py-md rounded-xl border border-border/40 bg-background/10 text-on-surface-muted font-semibold text-body-sm cursor-not-allowed"
                    />
                  </div>

                  {/* Address Grid: ZIP / Postal Code & Street */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-md">
                    <div className="flex flex-col gap-xs">
                      <label className="text-[12px] font-bold text-on-surface-muted uppercase tracking-wider">
                        {tLocal.formZip}
                      </label>
                      <input 
                        type="text" 
                        required 
                        disabled={!country}
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        placeholder="Ex: 01001-000"
                        className={`w-full px-md py-md rounded-xl border border-border/60 outline-none transition-all font-semibold text-body-sm 
                          ${!country ? 'bg-background/10 text-on-surface-muted cursor-not-allowed border-border/40' : 'bg-background/30 hover:bg-background/10 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20'}`}
                      />
                    </div>
                    <div className="sm:col-span-2 flex flex-col gap-xs">
                      <label className="text-[12px] font-bold text-on-surface-muted uppercase tracking-wider">
                        {tLocal.formStreet}
                      </label>
                      <input 
                        type="text" 
                        required 
                        disabled={!country}
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        placeholder="Ex: Av. Paulista"
                        className={`w-full px-md py-md rounded-xl border border-border/60 outline-none transition-all font-semibold text-body-sm 
                          ${!country ? 'bg-background/10 text-on-surface-muted cursor-not-allowed border-border/40' : 'bg-background/30 hover:bg-background/10 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20'}`}
                      />
                    </div>
                  </div>

                  {/* Address Grid: Number, City, State */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-md">
                    <div className="flex flex-col gap-xs">
                      <label className="text-[12px] font-bold text-on-surface-muted uppercase tracking-wider">
                        {tLocal.formNumber}
                      </label>
                      <input 
                        type="text" 
                        required 
                        disabled={!country}
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        placeholder="Ex: 1000"
                        className={`w-full px-md py-md rounded-xl border border-border/60 outline-none transition-all font-semibold text-body-sm 
                          ${!country ? 'bg-background/10 text-on-surface-muted cursor-not-allowed border-border/40' : 'bg-background/30 hover:bg-background/10 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20'}`}
                      />
                    </div>
                    <div className="flex flex-col gap-xs">
                      <label className="text-[12px] font-bold text-on-surface-muted uppercase tracking-wider">
                        {tLocal.formCity}
                      </label>
                      <input 
                        type="text" 
                        required 
                        disabled={!country}
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Ex: São Paulo"
                        className={`w-full px-md py-md rounded-xl border border-border/60 outline-none transition-all font-semibold text-body-sm 
                          ${!country ? 'bg-background/10 text-on-surface-muted cursor-not-allowed border-border/40' : 'bg-background/30 hover:bg-background/10 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20'}`}
                      />
                    </div>
                    <div className="flex flex-col gap-xs">
                      <label className="text-[12px] font-bold text-on-surface-muted uppercase tracking-wider">
                        {tLocal.formState}
                      </label>
                      <input 
                        type="text" 
                        required 
                        disabled={!country}
                        value={stateName}
                        onChange={(e) => setStateName(e.target.value)}
                        placeholder="Ex: SP"
                        className={`w-full px-md py-md rounded-xl border border-border/60 outline-none transition-all font-semibold text-body-sm 
                          ${!country ? 'bg-background/10 text-on-surface-muted cursor-not-allowed border-border/40' : 'bg-background/30 hover:bg-background/10 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20'}`}
                      />
                    </div>
                  </div>

                  {/* Manager Name */}
                  <div className="flex flex-col gap-xs">
                    <label className="text-[12px] font-bold text-on-surface-muted uppercase tracking-wider">
                      {tLocal.formAdminName}
                    </label>
                    <input 
                      type="text" 
                      required 
                      value={manager}
                      onChange={(e) => setManager(e.target.value)}
                      placeholder="Ex: João Silva"
                      className="w-full px-md py-md rounded-xl border border-border/60 bg-background/30 hover:bg-background/10 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-semibold text-body-sm"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-xs">
                    <label className="text-[12px] font-bold text-on-surface-muted uppercase tracking-wider">
                      {tLocal.formEmail}
                    </label>
                    <input 
                      type="email" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="contato@empresa.com"
                      className="w-full px-md py-md rounded-xl border border-border/60 bg-background/30 hover:bg-background/10 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-semibold text-body-sm"
                    />
                  </div>

                  {/* Password */}
                  <div className="flex flex-col gap-xs">
                    <label className="text-[12px] font-bold text-on-surface-muted uppercase tracking-wider">
                      {tLocal.formPassword}
                    </label>
                    <input 
                      type="password" 
                      required 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-md py-md rounded-xl border border-border/60 bg-background/30 hover:bg-background/10 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-semibold text-body-sm"
                    />
                  </div>

                  {/* Employees Count Select */}
                  <div className="flex flex-col gap-xs">
                    <label className="text-[12px] font-bold text-on-surface-muted uppercase tracking-wider">
                      {tLocal.formEmployees}
                    </label>
                    <div className="relative">
                      <select 
                        required 
                        value={employees}
                        onChange={(e) => setEmployees(e.target.value)}
                        className="w-full px-md py-md rounded-xl border border-border/60 bg-background/30 hover:bg-background/10 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-semibold text-body-sm appearance-none cursor-pointer"
                      >
                        <option value="" disabled hidden>Selecione...</option>
                        <option value="15">{tLocal.formEmployeesOption1}</option>
                        <option value="30">{tLocal.formEmployeesOption2}</option>
                        <option value="50">{tLocal.formEmployeesOption3}</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-muted">
                        keyboard_arrow_down
                      </span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    onClick={() => sendGTMEvent({ event: 'GA4::Register:click_start_trial' })}
                    className="w-full py-md bg-primary hover:bg-primary-dark text-white font-bold rounded-xl text-body-md transition-all hover:scale-[1.01] active:scale-[0.99] duration-200 shadow-md shadow-primary/20 cursor-pointer text-center mt-lg"
                  >
                    {tLocal.submitButton}
                  </button>

                </form>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-background border-t border-border/40 py-md text-center text-body-sm text-on-surface-muted">
        <div className="max-w-7xl mx-auto px-md flex flex-col sm:flex-row justify-between items-center gap-xs">
          <p>{tLocal.footerSecurity}</p>
          <p>© 2026 Precision Technologies.</p>
        </div>
      </footer>

    </div>
  );
}
