'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import logoImg from '../../../../../public/images/precision.png';
import { useI18n } from '@/locales/useI18n';
import { SupportChatWidget } from '../support/SupportChatWidget';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { t } = useI18n();

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isExpired, setIsExpired] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch current user and check subscription expiration
  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Unauthorized');
      })
      .then(data => {
        setCurrentUser(data);
        
        if (data.userRole !== 'SUPERADMIN') {
          const isExp = 
            data.subscriptionStatus === 'EXPIRED' || 
            (data.subscriptionEndsAt && new Date(data.subscriptionEndsAt).getTime() < Date.now());
          setIsExpired(!!isExp);
        }
      })
      .catch(() => {});
  }, [pathname]);

  const getLinkClass = (path: string) => {
    const isActive = pathname === path || (path !== '/' && pathname.startsWith(path));
    if (isActive) {
      return "flex items-center gap-md py-sm px-md rounded-lg text-primary font-bold border-r-4 border-primary bg-primary/5 font-body-lg text-body-lg cursor-pointer active:opacity-80 transition-all duration-200";
    }
    return "flex items-center gap-md py-sm px-md rounded-lg text-on-surface-variant hover:text-primary font-body-lg text-body-lg hover:bg-surface-container-high transition-all duration-200 cursor-pointer active:opacity-80";
  };

  const getIconStyle = (path: string) => {
    const isActive = pathname === path || (path !== '/' && pathname.startsWith(path));
    return isActive ? { fontVariationSettings: "'FILL' 1" } : undefined;
  };

  const isSuperAdmin = currentUser?.userRole === 'SUPERADMIN';

  // Helper method to render a menu link (either standard or locked/premium)
  const renderNavItem = (path: string, icon: string, label: string, isBlockedPath: boolean) => {
    const blocked = isExpired && isBlockedPath;

    const content = (
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-md">
          <span className="material-symbols-outlined text-[22px]" style={getIconStyle(path)}>{icon}</span>
          <span>{label}</span>
        </div>
        {blocked && (
          <img 
            src="/images/icon-premium.png" 
            alt="Premium" 
            className="w-5 h-5 rounded-full object-cover ml-auto shrink-0 shadow-sm border border-outline-variant/30"
          />
        )}
      </div>
    );

    if (blocked) {
      return (
        <button
          onClick={(e) => {
            e.preventDefault();
            setModalOpen(true);
          }}
          className={`${getLinkClass(path)} opacity-50 hover:bg-transparent w-full text-left`}
        >
          {content}
        </button>
      );
    }

    // Special click handler for standard company managers contacting support
    if (path === '/support' && !isSuperAdmin) {
      return (
        <button
          onClick={(e) => {
            e.preventDefault();
            window.dispatchEvent(new CustomEvent('open-support-chat'));
          }}
          className={`${getLinkClass(path)} w-full text-left`}
        >
          {content}
        </button>
      );
    }

    return (
      <Link href={path} className={getLinkClass(path)}>
        {content}
      </Link>
    );
  };

  return (
    <>
      {/* Expired Subscription Banner */}
      {isExpired && (
        <>
          <div className="fixed top-0 left-0 md:left-64 right-0 h-11 bg-error text-white font-semibold flex items-center justify-between px-md z-30 shadow-md">
            <div className="flex items-center gap-xs">
              <span className="material-symbols-outlined text-[20px]">warning</span>
              <span className="text-body-sm">{t('common.expiredBanner')}</span>
            </div>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-support-chat'))}
              className="bg-white text-error px-sm py-[4px] rounded text-body-xs font-bold hover:bg-surface-bright transition-colors shrink-0 cursor-pointer"
            >
              {t('common.talkToSupport')}
            </button>
          </div>
          <style>{`
            main, header {
              margin-top: 44px !important;
            }
            header {
              top: 44px !important;
            }
          `}</style>
        </>
      )}

      <nav className="bg-surface-container-low h-screen w-64 fixed left-0 top-0 border-r border-outline-variant flex flex-col py-lg px-md hidden md:flex z-20">
        {/* Header Brand */}
        <div className="mb-xl flex flex-col items-start pt-md px-md">
          <div className="flex items-center gap-sm">
            <Image src={logoImg} alt="Logo" width={30} height={30} />
            <span className="font-headline-lg text-headline-lg text-primary">Precision</span>
          </div>
          <span className="text-on-surface-variant font-body-sm text-body-sm mt-xs">Portal Administrativo</span>
        </div>
        
        {/* Navigation Links */}
        <ul className="flex flex-col gap-sm flex-grow">
          {/* Dashboard */}
          <li>
            {renderNavItem('/', 'dashboard', t('dashboard.title'), false)}
          </li>
          {/* Equipes */}
          <li>
            {renderNavItem('/teams', 'groups', t('common.teams'), true)}
          </li>
          {/* Empresas */}
          <li>
            {renderNavItem('/companies', 'domain', t('common.companies'), true)}
          </li>
          {/* Cargos */}
          <li>
            {renderNavItem('/roles', 'badge', t('common.roles'), true)}
          </li>
          {/* Colaboradores */}
          <li>
            {renderNavItem('/employees', 'group', t('employees.title'), true)}
          </li>
          {/* Relatórios */}
          <li>
            {renderNavItem('/reports', 'assessment', t('common.reports'), true)}
          </li>
          {/* Bloqueios */}
          <li>
            {renderNavItem('/blockages', 'calendar_month', t('common.blockages'), true)}
          </li>
          {/* Suporte / Chat */}
          <li>
            {renderNavItem('/support', 'chat', t('common.support'), false)}
          </li>
          {/* Configurações */}
          <li>
            {renderNavItem('/settings', 'settings', t('common.settings'), false)}
          </li>
        </ul>

        {/* User Profile Snippet in Sidebar */}
        <div className="mt-auto pt-lg border-t border-outline-variant flex items-center gap-md px-md">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant bg-surface-container-high flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-2xl">account_circle</span>
          </div>
          <div>
            <p className="font-body-sm text-body-sm text-on-surface font-semibold truncate max-w-[140px]">
              {currentUser?.name || t('common.loading')}
            </p>
            <p className="font-label-caps text-label-caps text-on-surface-variant">
              {currentUser?.userRole === 'SUPERADMIN' ? t('common.globalAdmin') : (currentUser?.role || 'RH')}
            </p>
          </div>
        </div>
      </nav>

      {/* Subscription Blockage Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-md subscription-modal animate-fade-in">
          <div className="bg-white rounded-3xl border border-outline-variant max-w-[480px] w-full p-lg space-y-lg shadow-2xl relative text-center">
            <div className="mx-auto inline-flex items-center justify-center w-16 h-16 rounded-full bg-error/10 text-error mb-xs">
              <span className="material-symbols-outlined text-[36px]">lock_person</span>
            </div>
            
            <h3 className="font-bold text-[22px] text-on-surface leading-tight">
              {t('common.expiredModalTitle')}
            </h3>
            
            <p className="text-body-md text-on-surface-variant leading-relaxed">
              {t('common.expiredModalDesc')}
            </p>
            
            <div className="flex flex-col gap-sm pt-md">
              <button 
                onClick={() => {
                  setModalOpen(false);
                  window.dispatchEvent(new CustomEvent('open-support-chat'));
                }}
                className="w-full py-md bg-primary hover:bg-primary-dark text-white font-bold rounded-xl text-body-sm transition-all duration-200 cursor-pointer block text-center shadow-lg shadow-primary/20"
              >
                {t('common.talkToSupport')}
              </button>
              <button 
                onClick={() => setModalOpen(false)}
                className="w-full py-md border-2 border-outline hover:bg-surface-container-high text-on-surface font-bold rounded-xl text-body-sm transition-all duration-200 cursor-pointer block text-center"
              >
                {t('common.close')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Chat Widget Rendered Globally */}
      <SupportChatWidget />
    </>
  );
};
