'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/locales/useI18n';

export default function MobileLoginPage() {
  const router = useRouter();
  const { t } = useI18n();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError(t('auth.requiredFields'));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t('auth.loginError'));
      }

      router.replace('/');
      router.refresh();
    } catch (err: any) {
      console.error(err);
      setError(err.message || t('auth.errorCredentials'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-md">
      <div className="w-full max-w-3xl bg-surface-container-lowest border border-outline-variant rounded-2xl p-xl shadow-md space-y-lg">
        {/* Brand/Header */}
        <div className="text-center space-y-xs">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary-container text-primary mb-xs">
            <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              schedule
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">{t('auth.title')}</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">{t('auth.subtitle')}</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-error-container text-on-error-container p-md rounded-xl text-body-sm font-medium flex items-center gap-xs">
            <span className="material-symbols-outlined text-[20px]">error</span>
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-md">
          <div className="space-y-xs">
            <label className="font-label-caps text-label-caps text-on-surface-variant block">{t('auth.email')}</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant">
                mail
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemplo@empresa.com"
                className="w-full h-12 pl-10 pr-md border border-outline rounded-xl bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-body-md"
                required
              />
            </div>
          </div>

          <div className="space-y-xs">
            <label className="font-label-caps text-label-caps text-on-surface-variant block">{t('auth.password')}</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant">
                lock
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('auth.passwordPlaceholder')}
                className="w-full h-12 pl-10 pr-md border border-outline rounded-xl bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-body-md"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-primary text-on-primary hover:opacity-90 active:scale-[0.98] disabled:opacity-50 rounded-xl font-bold flex items-center justify-center gap-xs transition-all cursor-pointer mt-lg shadow-sm"
          >
            {loading ? (
              <>
                <span className="animate-spin material-symbols-outlined">progress_activity</span>
                <span>{t('common.loading')}</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined">login</span>
                <span>{t('auth.loginButton')}</span>
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-xs">
          <span className="text-body-xs font-body-xs text-on-surface-variant">
            {t('auth.tempPasswordDesc', { password: '123456' })}
          </span>
        </div>
      </div>
    </div>
  );
}
