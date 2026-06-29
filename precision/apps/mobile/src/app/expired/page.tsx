'use client';

import React from 'react';

export default function MobileSubscriptionExpiredPage() {
  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-md">
      <div className="w-full max-w-3xl bg-surface-container-lowest border border-outline-variant rounded-2xl p-xl shadow-md space-y-lg text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-error/10 text-error mb-xs">
          <span className="material-symbols-outlined text-[36px]">
            lock_person
          </span>
        </div>
        
        <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">Assinatura Expirada</h1>
        
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          A assinatura dos serviços da sua empresa com o <strong>Chronos</strong> está inativa ou expirou.
        </p>
        
        <p className="font-body-sm text-body-sm text-on-surface-variant/80">
          Entre em contato com o responsável financeiro da sua empresa para reativar os serviços.
        </p>

        <button
          onClick={handleLogout}
          className="w-full h-12 border-2 border-outline text-on-surface hover:bg-surface-container-high active:scale-[0.98] rounded-xl font-bold flex items-center justify-center gap-xs transition-all cursor-pointer mt-lg"
        >
          <span className="material-symbols-outlined">logout</span>
          <span>Voltar para Login</span>
        </button>
      </div>
    </div>
  );
}
