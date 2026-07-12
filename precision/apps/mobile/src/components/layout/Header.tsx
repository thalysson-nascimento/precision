'use client';

import { useI18n } from '@/locales/useI18n';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { CurrentDate } from '../ui/CurrentDate';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'inicio';
  const { t } = useI18n();
  
  const [employee, setEmployee] = useState<{ name: string; role: string } | null>(null);

  useEffect(() => {
    // Prevent fetching if on login/expired page
    if (pathname === '/login' || pathname === '/expired') {
      return;
    }
    
    fetch('/api/auth/me')
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Unauthorized');
      })
      .then(data => {
        const isExpired = 
          data.subscriptionStatus === 'EXPIRED' || 
          (data.subscriptionEndsAt && new Date(data.subscriptionEndsAt).getTime() < Date.now());
        
        if (isExpired) {
          window.location.href = '/expired';
          return;
        }
        setEmployee({ name: data.name, role: data.role });
      })
      .catch(() => {
        setEmployee(null);
      });
  }, [pathname]);

  // Hide header completely on login or expired views
  if (pathname === '/login' || pathname === '/expired') {
    return null;
  }

  if (currentTab === 'perfil') {
    return null;
  }

  const displayName = employee?.name || t('common.employee');

  return (
    <header className="bg-background sticky top-0 z-50 border-b border-outline-variant/30 backdrop-blur-md">
      {/* Top micro-bar for the Precision branding */}
      <div className="max-w-7xl mx-auto px-container-margin py-[6px] flex justify-between items-center text-[10px] tracking-wider uppercase text-on-surface-variant font-bold border-b border-outline-variant/10">
        <span className="text-primary font-bold">Precision</span>
      </div>
      
      {/* Main AppBar contents */}
      <div className="flex justify-between items-center w-full px-container-margin py-md max-w-7xl mx-auto">
        <div className="flex flex-col">
          <h1 className="text-headline-lg font-headline-lg font-semibold text-on-background">
            {t('dashboard.greeting', { name: displayName })}
          </h1>
          <p className="text-body-sm font-body-sm text-on-surface-variant">
            <CurrentDate />
          </p>
        </div>
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary-fixed shadow-sm bg-surface-container-high flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-3xl">account_circle</span>
        </div>
      </div>
    </header>
  );
};
