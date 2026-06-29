'use client';

import React from 'react';

export default function AdminSubscriptionExpiredPage() {
  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/login';
  };

  return (
    <div className="admin-theme min-h-screen bg-background flex flex-col justify-center items-center p-md">
      <div className="w-full max-w-3xl bg-surface-container-lowest border border-outline-variant rounded-2xl p-xl shadow-md space-y-lg text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-error/10 text-error mb-xs">
          <span className="material-symbols-outlined text-[36px]">
            credit_card_off
          </span>
        </div>
        
        <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">Assinatura Expirada</h1>
        
        <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
          A assinatura do <strong>Chronos</strong> da sua empresa está inativa ou expirou.
        </p>
        
        <p className="font-body-md text-body-md text-on-surface-variant/80">
          Para reativar a conta e permitir que seus colaboradores registrem o ponto novamente, realize o pagamento da assinatura ou entre em contato com nosso suporte técnico.
        </p>

        <div className="border-t border-outline-variant/30 pt-md space-y-sm">
          <button
            onClick={() => alert('Renovação automática via Stripe estará disponível em breve!')}
            className="w-full h-12 bg-primary text-on-primary hover:opacity-90 active:scale-[0.98] rounded-xl font-bold flex items-center justify-center gap-xs transition-all cursor-pointer shadow-sm"
          >
            <span className="material-symbols-outlined">payments</span>
            <span>Renovar Assinatura</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full h-12 border-2 border-outline text-on-surface hover:bg-surface-container-high active:scale-[0.98] rounded-xl font-bold flex items-center justify-center gap-xs transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined">logout</span>
            <span>Voltar para Login</span>
          </button>
        </div>
      </div>
    </div>
  );
}
