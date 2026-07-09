'use client';

import { useI18n } from '@/locales/useI18n';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { LoginForm } from './components/LoginForm';
import { LoginBanner } from './components/LoginBanner';

export default function AdminLoginPage() {
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
    <div className="admin-theme min-h-screen bg-slate-50 flex items-center justify-center p-4 lg:p-8 font-sans">
      <div 
        className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100/50 overflow-hidden flex flex-col lg:flex-row min-h-[680px] p-2"
        style={{ width: '100%', maxWidth: '1152px' }}
      >
        {/* Left side - Login Form */}
        <div 
          className="p-6 lg:p-12 flex flex-col justify-center bg-white rounded-[2.2rem]"
          style={{ flex: '1 1 50%', minWidth: '0' }}
        >
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            loading={loading}
            error={error}
            onSubmit={handleSubmit}
            t={t}
          />
        </div>

        {/* Right side - Design Banner */}
        <LoginBanner t={t} />
      </div>
    </div>
  );
}

