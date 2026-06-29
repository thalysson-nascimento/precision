'use client';

import React from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';

export const BottomNav: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'inicio';

  // Hide BottomNav completely on login or expired views
  if (pathname === '/login' || pathname === '/expired') {
    return null;
  }

  const getLinkClasses = (tab: string) => {
    if (currentTab === tab) {
      return "flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-md py-xs scale-95 transition-transform";
    }
    return "flex flex-col items-center justify-center text-on-surface-variant px-md py-xs hover:bg-surface-container-high rounded-lg transition-colors";
  };

  const getIconStyle = (tab: string) => {
    return currentTab === tab ? { fontVariationSettings: "'FILL' 1" } : undefined;
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center bg-surface-container py-sm px-gutter border-t border-outline-variant shadow-lg rounded-t-xl">
      <Link 
        className={getLinkClasses('inicio')} 
        href="/?tab=inicio"
      >
        <span className="material-symbols-outlined" style={getIconStyle('inicio')}>
          home
        </span>
        <span className="text-label-caps font-label-caps">Início</span>
      </Link>
      
      <Link 
        className={getLinkClasses('historico')} 
        href="/?tab=historico"
      >
        <span className="material-symbols-outlined" style={getIconStyle('historico')}>
          history
        </span>
        <span className="text-label-caps font-label-caps">Histórico</span>
      </Link>
      
      <Link 
        className={getLinkClasses('relatorios')} 
        href="/?tab=relatorios"
      >
        <span className="material-symbols-outlined" style={getIconStyle('relatorios')}>
          assessment
        </span>
        <span className="text-label-caps font-label-caps">Relatórios</span>
      </Link>
      
      <Link 
        className={getLinkClasses('perfil')} 
        href="/?tab=perfil"
      >
        <span className="material-symbols-outlined" style={getIconStyle('perfil')}>
          person
        </span>
        <span className="text-label-caps font-label-caps">Perfil</span>
      </Link>
    </nav>
  );
};
