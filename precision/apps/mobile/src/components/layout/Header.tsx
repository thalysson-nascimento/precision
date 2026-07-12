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
    <header className="bg-[#4A7EA9] w-full text-white p-4 select-none">
      <div className="max-w-7xl mx-auto flex flex-col gap-4">
        {/* Logo + Brand Name */}
        <div className="flex items-center gap-2">
          <img
            alt="Precision Logo"
            className="w-6 h-auto object-contain"
            style={{ filter: 'brightness(0) invert(1)' }}
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAw600BN7q5ivLGkOrovv6d6A3taP3DE9GAfRfG6LZ7UYcXu_S-BaqgKSMAI8A8XAXKTRaU1qjau5-ngW9ghugWjZgK1Tnwfw2f2qVm9SMQY-VcK6AUTCUq6ehJKm_xkxBmKpVxzCFjgXAoUdoeku1ESq3Y7-pK9LHe29eLJeSt6vGDMOjrqVELidhE0nZ3sxlBb3dCZCVTK7ehgyOXMhwWFzzvpnrUljot15vo57VYgaNCp-DFrz08jTEbQ58OWdJNw"
          />
          <span className="font-bold text-lg tracking-tight font-sans text-white">Precision</span>
        </div>

        {/* Greeting + Date + Avatar Row */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-[24px] font-normal leading-tight font-sans text-white">
              {t('dashboard.greeting', { name: displayName })}
            </h1>
            <p className="text-[12px] font-normal opacity-90 font-sans mt-[2px] text-white">
              <CurrentDate />
            </p>
          </div>
          <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20 shadow-sm bg-white/10 flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-white text-3xl">account_circle</span>
          </div>
        </div>
      </div>
    </header>
  );
};
