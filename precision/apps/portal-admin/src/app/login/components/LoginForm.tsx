'use client';

import React from 'react';

interface LoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  loading: boolean;
  error: string | null;
  onSubmit: (e: React.FormEvent) => void;
  t: (key: any) => string;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  loading,
  error,
  onSubmit,
  t,
}) => {
  return (
    <div className="w-full mx-auto" style={{ maxWidth: '400px' }}>
      {/* Brand Header */}
      <div className="flex items-center gap-xs mb-10 select-none">
        <img
          src="/images/precision.png"
          alt="Precision Logo"
          className="w-10 h-10 object-contain"
        />
        <span className="font-sans font-bold text-[22px] tracking-tight text-on-background">
          Precision
        </span>
      </div>

      {/* Page Title */}
      <h1 className="font-sans text-[32px] font-bold text-on-background mb-8 leading-tight">
        Entrar
      </h1>

      {/* Error Alert */}
      {error && (
        <div className="bg-error/10 text-error p-md rounded-xl text-body-sm font-semibold flex items-center gap-xs border border-error/20 mb-6 animate-fadeIn">
          <span className="material-symbols-outlined text-[20px]">error</span>
          <span>{error}</span>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-xs">
          <label className="font-sans text-[13px] font-semibold text-on-surface-variant/80 tracking-wide uppercase block">
            {t('auth.email')}
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant/60 text-[20px]">
              mail
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="gestor@empresa.com"
              className="w-full h-[52px] pl-11 pr-md border border-outline/35 rounded-xl bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-body-md text-on-surface shadow-sm"
              required
            />
          </div>
        </div>

        <div className="space-y-xs">
          <label className="font-sans text-[13px] font-semibold text-on-surface-variant/80 tracking-wide uppercase block">
            {t('auth.password')}
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant/60 text-[20px]">
              lock
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-[52px] pl-11 pr-md border border-outline/35 rounded-xl bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-body-md text-on-surface shadow-sm"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-[52px] bg-primary text-on-primary hover:opacity-95 active:scale-[0.98] disabled:opacity-50 rounded-xl font-bold flex items-center justify-center gap-xs transition-all cursor-pointer shadow-md mt-8 text-body-md"
        >
          {loading ? (
            <>
              <span className="animate-spin material-symbols-outlined text-[20px]">
                progress_activity
              </span>
              <span>{t('common.loading')}</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[20px]">login</span>
              <span>{t('auth.loginButton')}</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
