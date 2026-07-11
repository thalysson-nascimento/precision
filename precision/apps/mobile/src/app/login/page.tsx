'use client';

import React from 'react';
import { useI18n } from '@/locales/useI18n';
import { LoginHeader } from './components/LoginHeader';
import { LoginForm } from './components/LoginForm';

export default function MobileLoginPage() {
  const { t } = useI18n();

  return (
    <div className="login-page min-h-screen flex flex-col justify-center items-center p-md relative overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        .mesh-gradient {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          z-index: -1;
          background: linear-gradient(135deg, #93c5fd 0%, #e0f2fe 50%, #f0f7ff 100%);
        }
        .glass-container {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 8px 32px 0 rgba(15, 23, 42, 0.04);
        }
        .input-soft {
          background: rgba(248, 250, 252, 0.8);
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease;
        }
        .input-soft:focus {
          background: #ffffff;
          border-color: #0ea5e9;
          box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.1);
          outline: none;
        }
        .btn-primary-gradient {
          background: linear-gradient(135deg, #0ea5e9 0%, #39b8fd 100%);
          box-shadow: 0 4px 14px 0 rgba(14, 165, 233, 0.3);
          transition: transform 0.2s ease, opacity 0.2s ease;
        }
        .btn-primary-gradient:active {
          transform: scale(0.97);
        }
      ` }} />

      <div className="mesh-gradient"></div>

      <LoginHeader />

      <div className="login-card glass-container w-full max-w-[400px] rounded-[32px] p-8 md:p-10 flex flex-col gap-y-lg relative z-10">
        <div className="login-card__welcome text-center">
          <h2 className="login-card__welcome-title font-headline-md text-headline-md text-on-surface mb-xs font-bold">
            {t('auth.welcomeTitle')}
          </h2>
          <p className="login-card__welcome-subtitle font-body-sm text-body-sm text-on-surface-variant">
            {t('auth.welcomeSubtitle')}
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
