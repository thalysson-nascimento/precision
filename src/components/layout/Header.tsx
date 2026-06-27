'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { CurrentDate } from '../ui/CurrentDate';

export const Header: React.FC = () => {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'inicio';

  if (currentTab === 'perfil') {
    return null;
  }

  return (
    <header className="bg-background sticky top-0 z-50 border-b border-outline-variant/30 backdrop-blur-md">
      {/* Top micro-bar for the Chronos branding */}
      <div className="max-w-7xl mx-auto px-container-margin py-[6px] flex justify-between items-center text-[10px] tracking-wider uppercase text-on-surface-variant font-bold border-b border-outline-variant/10">
        <span className="text-primary font-bold">Chronos</span>
        <div className="flex items-center gap-1">
          <span className="w-[6px] h-[6px] rounded-full bg-secondary shadow-sm animate-pulse"></span>
          <span>Sistema Ativo</span>
        </div>
      </div>
      
      {/* Main AppBar contents */}
      <div className="flex justify-between items-center w-full px-container-margin py-md max-w-7xl mx-auto">
        <div className="flex flex-col">
          <h1 className="text-headline-lg font-headline-lg font-semibold text-on-background">
            Olá, Thalysson Nascimento
          </h1>
          <p className="text-body-sm font-body-sm text-on-surface-variant">
            <CurrentDate />
          </p>
        </div>
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary-fixed shadow-sm">
          <img 
            className="w-full h-full object-cover" 
            alt="Thalysson Nascimento" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkp041NLPg5O5xO4J6IwCpf0q0CgXDwxkyFoEV1frk8mxb8YAwdbOFloVN46WTxhA4JaJsDLdGbqWWT-ZWGqrGGSPHo_JEOz2nE7UnWFFMTsu_XKcBoLtybRk_2bIEAm6t_etmvAJMYHmPwKXfYMtW4okrarTmB1wl1R94xR5DNp8VDde68GIvtRxY9U2wwh1lkHcQSngTHKPi3VSnAg0otn113hgliTAvyheeceReSJ-rsS6M08cPuA"
          />
        </div>
      </div>
    </header>
  );
};
