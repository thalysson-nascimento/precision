'use client';

import React, { useEffect, useState } from 'react';
import { employeeService, Employee } from '@precision/api-client';
import { useI18n } from '@/locales/useI18n';
import { Locale } from '@/locales';

export const ProfileScreen: React.FC = () => {
  const { t, locale, setLocale } = useI18n();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsLoading(true);
        const data = await employeeService.getTodayRecords();
        setEmployee(data.employee);
      } catch (err) {
        console.error('Erro ao carregar perfil:', err);
        setError(t('common.error') + ': ' + t('common.loading'));
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [t]);

  const handleLogout = async () => {
    if (!confirm(t('common.logout') + '?')) return;
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.href = '/login';
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (error || !employee) {
    return (
      <div className="text-center py-xl bg-surface-container-low rounded-xl border border-dashed border-error/40 p-lg max-w-md mx-auto space-y-md">
        <span className="material-symbols-outlined text-error text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
          error
        </span>
        <p className="text-body-lg font-bold text-on-background">{error || t('common.employeeNotFound')}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-primary text-on-primary px-lg py-sm rounded-xl font-bold hover:bg-primary-container transition-colors cursor-pointer"
        >
          {t('common.tryAgain')}
        </button>
      </div>
    );
  }

  const emp = employee as any;
  const formattedId = emp.contractNumber || `#${emp.id?.substring(0, 5).toUpperCase()}`;
  const teamName = emp.team?.name || '---';
  const managerName = emp.manager?.name || '---';
  const admissionDate = emp.createdAt ? new Date(emp.createdAt).toLocaleDateString(
    locale === 'pt' ? 'pt-BR' : locale === 'en' ? 'en-US' : 'de-DE'
  ) : '---';

  return (
    <div className="w-full space-y-md">
      {/* TopAppBar customizada para o Perfil */}
      <header className="w-full bg-surface flex items-center justify-between h-16 border-b border-outline-variant/10">
        <div className="w-10"></div>
        <h1 className="font-headline-md text-headline-md text-on-surface font-bold">{t('common.profile')}</h1>
        <div className="w-10"></div>
      </header>

      {/* Seção do Avatar e Nome */}
      <section className="flex flex-col items-center py-md">
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-4 border-surface-container-lowest overflow-hidden shadow-md">
            <img 
              className="w-full h-full object-cover" 
              alt={employee.name} 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkp041NLPg5O5xO4J6IwCpf0q0CgXDwxkyFoEV1frk8mxb8YAwdbOFloVN46WTxhA4JaJsDLdGbqWWT-ZWGqrGGSPHo_JEOz2nE7UnWFFMTsu_XKcBoLtybRk_2bIEAm6t_etmvAJMYHmPwKXfYMtW4okrarTmB1wl1R94xR5DNp8VDde68GIvtRxY9U2wwh1lkHcQSngTHKPi3VSnAg0otn113hgliTAvyheeceReSJ-rsS6M08cPuA"
            />
          </div>
          <button className="absolute bottom-1 right-1 bg-primary text-on-primary w-8 h-8 rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">photo_camera</span>
          </button>
        </div>
        <div className="text-center mt-md">
          <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">{employee.name}</h2>
          <p className="font-body-lg text-body-lg text-secondary font-medium">{employee.role}</p>
        </div>
      </section>

      {/* Informações Profissionais */}
      <section className="space-y-xs">
        <h3 className="font-headline-sm text-headline-sm text-on-surface px-xs font-bold">{t('profile.professionalInfo')}</h3>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-sm">
          <ul className="space-y-md">
            <li className="flex items-center gap-md">
              <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary flex-shrink-0">
                <span className="material-symbols-outlined">group</span>
              </div>
              <div>
                <p className="font-label-caps text-label-caps text-on-surface-variant text-[10px] tracking-wide">{t('profile.team')}</p>
                <p className="font-body-lg text-body-lg text-on-surface font-semibold">{teamName}</p>
              </div>
            </li>
            <div className="border-t border-outline-variant/30"></div>
            <li className="flex items-center gap-md">
              <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary flex-shrink-0">
                <span className="material-symbols-outlined">person_pin</span>
              </div>
              <div>
                <p className="font-label-caps text-label-caps text-on-surface-variant text-[10px] tracking-wide">{t('profile.manager')}</p>
                <p className="font-body-lg text-body-lg text-on-surface font-semibold">{managerName}</p>
              </div>
            </li>
            <div className="border-t border-outline-variant/30"></div>
            <li className="flex items-center gap-md">
              <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary flex-shrink-0">
                <span className="material-symbols-outlined">badge</span>
              </div>
              <div>
                <p className="font-label-caps text-label-caps text-on-surface-variant text-[10px] tracking-wide">{t('profile.id')}</p>
                <p className="font-body-lg text-body-lg text-on-surface font-semibold">{formattedId}</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Seção de Dados Pessoais */}
      <section className="space-y-xs pt-xs">
        <h3 className="font-headline-sm text-headline-sm text-on-surface px-xs font-bold">{t('profile.personalData')}</h3>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-sm">
          <ul className="space-y-md">
            <li className="flex flex-col">
              <p className="font-label-caps text-label-caps text-on-surface-variant mb-xs text-[10px] tracking-wide">{t('profile.email')}</p>
              <p className="font-body-lg text-body-lg text-on-surface font-semibold">{employee.email}</p>
            </li>
            <div className="border-t border-outline-variant/30"></div>
            <li className="flex flex-col">
              <p className="font-label-caps text-label-caps text-on-surface-variant mb-xs text-[10px] tracking-wide">{t('profile.phone')}</p>
              <p className="font-body-lg text-body-lg text-on-surface font-semibold">{emp.phone || '---'}</p>
            </li>
            <div className="border-t border-outline-variant/30"></div>
            <li className="flex flex-col">
              <p className="font-label-caps text-label-caps text-on-surface-variant mb-xs text-[10px] tracking-wide">{t('profile.admissionDate')}</p>
              <p className="font-body-lg text-body-lg text-on-surface font-semibold">{admissionDate}</p>
            </li>
          </ul>
        </div>
      </section>

      {/* Preferências de Idioma */}
      <section className="space-y-xs pt-xs">
        <h3 className="font-headline-sm text-headline-sm text-on-surface px-xs font-bold">{t('common.preferences')}</h3>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-md">
              <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary flex-shrink-0">
                <span className="material-symbols-outlined">translate</span>
              </div>
              <div>
                <p className="font-label-caps text-label-caps text-on-surface-variant text-[10px] tracking-wide">{t('common.language')}</p>
                <p className="font-body-lg text-body-lg text-on-surface font-semibold">
                  {locale === 'pt' ? 'Português' : locale === 'en' ? 'English' : 'Deutsch'}
                </p>
              </div>
            </div>
            
            <select
              value={locale}
              onChange={(e) => setLocale(e.target.value as Locale)}
              className="bg-surface border border-outline-variant rounded-lg p-sm text-body-md font-bold focus:outline-none focus:ring-2 focus:ring-primary text-on-surface cursor-pointer"
            >
              <option value="pt">Português</option>
              <option value="en">English</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </div>
      </section>

      {/* Ações */}
      <section className="flex flex-col gap-md pt-md">
        <button 
          onClick={handleLogout}
          className="w-full h-14 text-error hover:bg-error/5 rounded-xl font-headline-md flex items-center justify-center gap-sm active:scale-[0.98] transition-all duration-100 cursor-pointer font-bold border border-error/25"
        >
          <span className="material-symbols-outlined">logout</span>
          {t('common.logout')}
        </button>
      </section>
    </div>
  );
};

const ProfileSkeleton: React.FC = () => {
  return (
    <div className="w-full space-y-md">
      <header className="w-full bg-surface flex items-center justify-between h-16 border-b border-outline-variant/10">
        <div className="w-10"></div>
        <div className="h-6 w-16 shimmer rounded"></div>
        <div className="w-10"></div>
      </header>

      <section className="flex flex-col items-center py-md space-y-md">
        <div className="w-32 h-32 rounded-full border-4 border-surface-container-lowest shadow-md shimmer"></div>
        <div className="space-y-sm text-center">
          <div className="h-6 w-44 shimmer rounded mx-auto"></div>
          <div className="h-5 w-36 shimmer rounded mx-auto"></div>
        </div>
      </section>

      <section className="space-y-sm">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-sm space-y-md">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center gap-md">
              <div className="w-10 h-10 rounded-lg shimmer flex-shrink-0"></div>
              <div className="space-y-xs w-full">
                <div className="h-3 w-16 shimmer rounded"></div>
                <div className="h-5 w-32 shimmer rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
