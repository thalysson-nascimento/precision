'use client';

import React from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useI18n } from '@/locales/useI18n';

export const BottomNav: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'inicio';
  const { t } = useI18n();

  // Hide BottomNav completely on login or expired views
  if (pathname === '/login' || pathname === '/expired') {
    return null;
  }

  const getLinkClasses = (tab: string) => {
    if (currentTab === tab) {
      return "w-10 h-10 flex items-center justify-center bg-[#003D9B] text-white rounded-full transition-all duration-300 shadow-md shadow-[#003D9B]/30";
    }
    return "w-10 h-10 flex items-center justify-center text-[#4A4A4A] hover:bg-black/5 rounded-full transition-all duration-300";
  };

  const getIconStyle = (tab: string) => {
    return currentTab === tab ? { fontVariationSettings: "'FILL' 1" } : undefined;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center bg-[#DCE9FF] p-[16px] shadow-lg rounded-[24px] mx-[16px] mb-[16px] border border-white/20">
      <Link 
        className={getLinkClasses('inicio')} 
        href="/?tab=inicio"
      >
        <span className="material-symbols-outlined text-[28px]" style={getIconStyle('inicio')}>
          home
        </span>
      </Link>
      
      <Link 
        className={getLinkClasses('historico')} 
        href="/?tab=historico"
      >
        <span className="material-symbols-outlined text-[28px]" style={getIconStyle('historico')}>
          history
        </span>
      </Link>
      
      <Link 
        className={getLinkClasses('relatorios')} 
        href="/?tab=relatorios"
      >
        <span className="material-symbols-outlined text-[28px]" style={getIconStyle('relatorios')}>
          assessment
        </span>
      </Link>
      
      <Link 
        className={getLinkClasses('perfil')} 
        href="/?tab=perfil"
      >
        <span className="material-symbols-outlined text-[28px]" style={getIconStyle('perfil')}>
          person
        </span>
      </Link>
    </nav>
  );
};
