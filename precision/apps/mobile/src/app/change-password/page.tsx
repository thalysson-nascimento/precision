'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/locales/useI18n';

export default function ChangePasswordPage() {
  const router = useRouter();
  const { t } = useI18n();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setError(t('auth.requiredFields'));
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(t('auth.passwordMismatch'));
      return;
    }

    if (newPassword.length < 6) {
      setError(t('auth.passwordTooShort'));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword, confirmPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t('auth.changePasswordError'));
      }

      // Success, replace route to home and refresh middleware context
      router.replace('/');
      router.refresh();
    } catch (err: any) {
      console.error(err);
      setError(err.message || t('auth.changePasswordError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-md">
      <div className="w-full max-w-3xl bg-surface-container-lowest border border-outline-variant rounded-2xl p-xl shadow-md space-y-lg">
        
        {/* Logo/Icon Header */}
        <div className="text-center space-y-xs">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary-container text-primary mb-xs">
            <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              lock_reset
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">
            {t('auth.changePasswordTitle')}
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto">
            {t('auth.changePasswordSubtitle')}
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-error-container text-on-error-container p-md rounded-xl text-body-sm font-medium flex items-center gap-xs">
            <span className="material-symbols-outlined text-[20px]">error</span>
            <span>{error}</span>
          </div>
        )}

        {/* Change Password Form */}
        <form onSubmit={handleSubmit} className="space-y-md">
          
          {/* New Password Input */}
          <div className="space-y-xs">
            <label className="font-label-caps text-label-caps text-on-surface-variant block">
              {t('auth.newPasswordLabel')}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant">
                lock
              </span>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder={t('auth.newPasswordPlaceholder')}
                className="w-full h-12 pl-10 pr-md border border-outline rounded-xl bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-body-md"
                required
                minLength={6}
              />
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="space-y-xs">
            <label className="font-label-caps text-label-caps text-on-surface-variant block">
              {t('auth.confirmPasswordLabel')}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant">
                lock
              </span>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={t('auth.confirmPasswordPlaceholder')}
                className="w-full h-12 pl-10 pr-md border border-outline rounded-xl bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-body-md"
                required
                minLength={6}
              />
            </div>
          </div>

          {/* Action Submit Button */}
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
                <span className="material-symbols-outlined">key</span>
                <span>{t('auth.changePasswordButton')}</span>
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
