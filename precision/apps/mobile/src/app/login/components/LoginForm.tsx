import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/locales/useI18n';
import { InputField } from './InputField';

export const LoginForm: React.FC = () => {
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

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-card__form-container flex flex-col gap-y-lg">
      {/* Error Alert */}
      {error && (
        <div className="login-card__error bg-error-container text-on-error-container p-md rounded-xl text-body-sm font-medium flex items-center gap-xs">
          <span className="material-symbols-outlined text-[20px]">error</span>
          <span>{error}</span>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="login-card__form space-y-md">
        <InputField
          label={t('auth.email')}
          id="email"
          type="email"
          value={email}
          placeholder="exemplo@precision.com"
          icon="mail"
          onChange={setEmail}
          required
        />

        <InputField
          label={t('auth.password')}
          id="password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          placeholder="••••••••"
          icon="lock"
          onChange={setPassword}
          required
          suffixIcon={showPassword ? 'visibility_off' : 'visibility'}
          onSuffixClick={() => setShowPassword(!showPassword)}
        />

        <div className="pt-stack-sm">
          <button
            type="submit"
            disabled={loading}
            className="login-card__button btn-primary-gradient w-full h-14 rounded-full font-body-lg text-body-lg text-white font-semibold flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <span className="animate-spin material-symbols-outlined">progress_activity</span>
                <span>{t('common.loading')}</span>
              </>
            ) : (
              <>
                <span>{t('auth.loginButton')}</span>
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
