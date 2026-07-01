'use client';

import React, { useState } from 'react';
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
    formCompany: 'Nome da Empresa',
    formAdminName: 'Nome Completo do Gestor',
    formEmail: 'E-mail Corporativo',
    formPassword: 'Senha de Acesso',
    formEmployees: 'Quantidade de Funcionários',
    formEmployeesOption1: '1 a 10 funcionários',
    formEmployeesOption2: '11 a 50 funcionários',
    formEmployeesOption3: 'Mais de 50 funcionários',
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
    formCompany: 'Company Name',
    formAdminName: 'Manager Full Name',
    formEmail: 'Corporate Email',
    formPassword: 'Access Password',
    formEmployees: 'Number of Employees',
    formEmployeesOption1: '1 to 10 employees',
    formEmployeesOption2: '11 to 50 employees',
    formEmployeesOption3: 'More than 50 employees',
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
    formCompany: 'Unternehmensname',
    formAdminName: 'Vollständiger Name des Managers',
    formEmail: 'Firmen-E-Mail',
    formPassword: 'Zugangspasswort',
    formEmployees: 'Anzahl der Mitarbeiter',
    formEmployeesOption1: '1 bis 10 Mitarbeiter',
    formEmployeesOption2: '11 bis 50 Mitarbeiter',
    formEmployeesOption3: 'Mehr als 50 Mitarbeiter',
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

  const [company, setCompany] = useState('');
  const [manager, setManager] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [employees, setEmployees] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (company && manager && email && password && employees) {
      setIsSuccess(true);
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-surface select-none relative overflow-x-hidden flex flex-col justify-between font-sans">
      
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
                href="http://localhost:3001/login"
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
                  
                  {/* Company Name */}
                  <div className="flex flex-col gap-xs">
                    <label className="text-[12px] font-bold text-on-surface-muted uppercase tracking-wider">
                      {tLocal.formCompany}
                    </label>
                    <input 
                      type="text" 
                      required 
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Ex: Precision Tech Ltda"
                      className="w-full px-md py-md rounded-xl border border-border/60 bg-background/30 hover:bg-background/10 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-semibold text-body-sm"
                    />
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
                        <option value="1-10">{tLocal.formEmployeesOption1}</option>
                        <option value="11-50">{tLocal.formEmployeesOption2}</option>
                        <option value="50+">{tLocal.formEmployeesOption3}</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-muted">
                        keyboard_arrow_down
                      </span>
                    </div>
                  </div>

                  {/* Submit Button with 16px padding */}
                  <button 
                    type="submit"
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
