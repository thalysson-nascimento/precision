'use client';

import React, { useEffect, useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { useI18n } from '@/locales/useI18n';
import priceMapping from '@/lib/stripe-prices.json';

interface Plan {
  id: string;
  limit: number;
  priceStr: string;
  originalPriceStr: string | null;
  currency: 'BRL' | 'EUR' | 'USD' | 'CAD';
}

export default function SubscriptionPlansPage() {
  const { t, locale } = useI18n();
  const [pendingCount, setPendingCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [company, setCompany] = useState<any>(null);
  const [billingCycle, setBillingCycle] = useState<'MONTHLY' | 'ANNUAL'>('MONTHLY');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchSubscriptionData = async () => {
    try {
      // 1. Fetch dashboard metrics for header
      const dashRes = await fetch('/api/admin/dashboard');
      if (dashRes.ok) {
        const dashData = await dashRes.json();
        setPendingCount(dashData.metrics.pendingRequestsCount || 0);
      }

      // 2. Fetch company data
      const compRes = await fetch('/api/admin/companies');
      if (compRes.ok) {
        const compData = await compRes.json();
        if (compData && compData.length > 0) {
          setCompany(compData[0]);
        }
      }
    } catch (err) {
      console.error(err);
      showToast('Erro ao carregar dados da assinatura.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptionData();
  }, []);

  // Determine currency based on company country
  const getCurrency = (): 'BRL' | 'EUR' | 'USD' | 'CAD' => {
    if (!company) return 'BRL';
    const country = (company.country || 'BR').toUpperCase();
    if (country === 'BR' || country === 'BRASIL') return 'BRL';
    if (country === 'US' || country === 'USA' || country === 'UNITED STATES') return 'USD';
    if (country === 'CA' || country === 'CANADA') return 'CAD';
    return 'EUR';
  };

  const currency = getCurrency();

  const getCurrencySymbol = (cur: 'BRL' | 'EUR' | 'USD' | 'CAD') => {
    if (cur === 'BRL') return 'R$';
    if (cur === 'EUR') return '€';
    if (cur === 'USD') return '$';
    if (cur === 'CAD') return '$';
    return '$';
  };

  const getOriginalPrice = (price: string) => {
    const numeric = parseFloat(price.replace(/\./g, '').replace(',', '.'));
    const original = Math.ceil(numeric * 2) - 0.01;
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(original);
  };

  const getPlansData = (cur: 'BRL' | 'EUR' | 'USD' | 'CAD', cycle: 'MONTHLY' | 'ANNUAL'): Plan[] => {
    if (cur === 'BRL') {
      return [
        {
          id: `15_EMPLOYEES_${cycle}`,
          limit: 15,
          priceStr: cycle === 'MONTHLY' ? '189,99' : '1.599,99',
          originalPriceStr: getOriginalPrice(cycle === 'MONTHLY' ? '189,99' : '1.599,99'),
          currency: 'BRL',
        },
        {
          id: `30_EMPLOYEES_${cycle}`,
          limit: 30,
          priceStr: cycle === 'MONTHLY' ? '329,99' : '2.769,99',
          originalPriceStr: getOriginalPrice(cycle === 'MONTHLY' ? '329,99' : '2.769,99'),
          currency: 'BRL',
        },
        {
          id: `50_EMPLOYEES_${cycle}`,
          limit: 50,
          priceStr: cycle === 'MONTHLY' ? '499,99' : '4.199,99',
          originalPriceStr: getOriginalPrice(cycle === 'MONTHLY' ? '499,99' : '4.199,99'),
          currency: 'BRL',
        },
      ];
    } else {
      return [
        {
          id: `15_EMPLOYEES_${cycle}`,
          limit: 15,
          priceStr: cycle === 'MONTHLY' ? '99,99' : '839,99',
          originalPriceStr: getOriginalPrice(cycle === 'MONTHLY' ? '99,99' : '839,99'),
          currency: cur,
        },
        {
          id: `30_EMPLOYEES_${cycle}`,
          limit: 30,
          priceStr: cycle === 'MONTHLY' ? '169,99' : '1.429,99',
          originalPriceStr: getOriginalPrice(cycle === 'MONTHLY' ? '169,99' : '1.429,99'),
          currency: cur,
        },
        {
          id: `50_EMPLOYEES_${cycle}`,
          limit: 50,
          priceStr: cycle === 'MONTHLY' ? '249,99' : '2.099,99',
          originalPriceStr: getOriginalPrice(cycle === 'MONTHLY' ? '249,99' : '2.099,99'),
          currency: cur,
        },
      ];
    }
  };

  const handleSelectPlan = async (planId: string) => {
    if (!company) return;
    setSaveLoading(true);
    try {
      const res = await fetch('/api/admin/billing/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId: planId,
        }),
      });

      const result = await res.json();
      if (res.ok && result.url) {
        window.location.href = result.url;
      } else {
        showToast(result.error || 'Erro ao iniciar o pagamento.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Erro ao conectar ao Stripe.', 'error');
    } finally {
      setSaveLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    if (!company || !company.stripeCustomerId) return;
    setSaveLoading(true);
    try {
      const res = await fetch('/api/admin/billing/portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const result = await res.json();
      if (res.ok && result.url) {
        window.location.href = result.url;
      } else {
        showToast(result.error || 'Erro ao carregar o portal financeiro.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Erro ao carregar o portal financeiro.', 'error');
    } finally {
      setSaveLoading(false);
    }
  };

  const getPlanTexts = () => {
    if (locale === 'pt') {
      return {
        title: 'Planos de Assinatura',
        subtitle: 'Selecione o plano ideal com base no número de colaboradores ativos na sua empresa.',
        monthly: 'Mensal',
        annual: 'Anual',
        discountLabel: 'Economia de 50% anual',
        featEmployees: 'Até {limit} colaboradores ativos',
        featTrial: '30 dias grátis na primeira ativação',
        featReports: 'Relatórios de ponto e geolocalização',
        btnSelect: 'Assinar Plano',
        btnCurrent: 'Plano Atual',
        btnManage: 'Gerenciar pelo Portal Financeiro',
        currencyLabel: `Exibindo planos em ${
          currency === 'BRL' ? 'Real (BRL)' : 
          currency === 'USD' ? 'Dólar Americano (USD)' : 
          currency === 'CAD' ? 'Dólar Canadense (CAD)' : 'Euro (EUR)'
        } travado pelo país de cadastro da empresa (${company?.country || 'BR'}).`,
        subtitle15: 'Ideal para pequenas empresas que estão começando a automatizar a gestão de ponto.',
        subtitle30: 'Perfeito para empresas em crescimento que precisam de um controle de ponto confiável.',
        subtitle50: 'Para médias empresas que exigem máxima flexibilidade e controle da jornada de trabalho.'
      };
    } else {
      return {
        title: 'Subscription Plans',
        subtitle: 'Choose the best plan based on the number of active employees in your company.',
        monthly: 'Monthly',
        annual: 'Annual',
        discountLabel: 'Save 50% annually',
        featEmployees: 'Up to {limit} active employees',
        featTrial: '30 days free trial on first activation',
        featReports: 'Time tracking & geolocation reports',
        btnSelect: 'Subscribe',
        btnCurrent: 'Current Plan',
        btnManage: 'Manage on Billing Portal',
        currencyLabel: `Displaying prices in ${
          currency === 'BRL' ? 'Real (BRL)' : 
          currency === 'USD' ? 'US Dollar (USD)' : 
          currency === 'CAD' ? 'Canadian Dollar (CAD)' : 'Euro (EUR)'
        } locked by your registered company country (${company?.country || 'BR'}).`,
        subtitle15: 'Perfect for small teams starting to automate time tracking.',
        subtitle30: 'Great for growing teams that need solid attendance management.',
        subtitle50: 'For larger teams requiring full control over work shifts and logs.'
      };
    }
  };

  return (
    <div className="admin-theme bg-background text-on-surface font-body-sm min-h-screen">
      <div className="flex h-screen overflow-hidden">
        {toast && (
          <div className={`fixed top-4 right-4 z-50 px-md py-sm rounded-lg shadow-lg text-white font-semibold transition-all duration-300 transform scale-100 flex items-center gap-sm ${toast.type === 'success' ? 'bg-secondary' : 'bg-error'}`}>
            <span className="material-symbols-outlined">{toast.type === 'success' ? 'check_circle' : 'error'}</span>
            <span>{toast.message}</span>
          </div>
        )}

        <Sidebar />

        <main className="flex-1 ml-0 md:ml-64 flex flex-col h-screen overflow-hidden bg-background">
          <Header 
            searchTerm="" 
            onSearchChange={() => {}} 
            pendingRequestsCount={pendingCount} 
          />

          <div className="flex-1 overflow-y-auto p-container-margin md:p-xl">
            <div className="max-w-[1200px] mx-auto flex flex-col gap-xl">
              
              {/* Back to settings breadcrumb */}
              <div className="flex items-center gap-xs">
                <button
                  onClick={() => window.location.href = '/settings'}
                  className="inline-flex items-center gap-xs text-primary hover:opacity-85 font-semibold cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                  <span>Voltar para Configurações</span>
                </button>
              </div>

              {company && (
                <div className="space-y-lg">
                  {/* Header title */}
                  <div className="space-y-xs">
                    <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">
                      {getPlanTexts().title}
                    </h1>
                    <p className="text-body-md text-on-surface-variant">
                      {getPlanTexts().subtitle}
                    </p>
                  </div>

                  {/* Billing cycle Switcher */}
                  <div className="flex justify-center my-md">
                    <div className="bg-surface-container-low p-xs rounded-full flex gap-xs border border-outline-variant/50 relative shadow-sm">
                      <button
                        type="button"
                        onClick={() => setBillingCycle('MONTHLY')}
                        className={`px-lg py-xs rounded-full font-bold text-body-sm transition-all duration-200 cursor-pointer ${billingCycle === 'MONTHLY' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
                      >
                        {getPlanTexts().monthly}
                      </button>
                      <button
                        type="button"
                        onClick={() => setBillingCycle('ANNUAL')}
                        className={`px-lg py-xs rounded-full font-bold text-body-sm transition-all duration-200 cursor-pointer flex items-center gap-xs ${billingCycle === 'ANNUAL' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
                      >
                        {getPlanTexts().annual}
                        <span className="bg-success text-on-success text-[10px] font-extrabold px-xs py-[2px] rounded-full uppercase leading-none">
                          -50%
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Locked currency indicator */}
                  <div className="text-center text-body-xs text-on-surface-variant/80 -mt-sm flex justify-center items-center gap-xs font-medium">
                    <span className="material-symbols-outlined text-[16px] text-primary">lock</span>
                    {getPlanTexts().currencyLabel}
                  </div>

                  {/* Notice if they have an active Stripe Subscription */}
                  {company.stripeSubscriptionId && (
                    <div className="bg-primary/5 border border-primary/20 p-md rounded-xl max-w-2xl mx-auto flex items-center gap-md">
                      <span className="material-symbols-outlined text-primary text-[28px]">info</span>
                      <div className="text-body-xs text-on-surface-variant leading-relaxed">
                        Como você possui uma assinatura Stripe ativa, alterações ou cancelamentos devem ser feitos através do <strong>Portal de Faturas da Stripe</strong> para garantir as prorrogações corretas.
                      </div>
                    </div>
                  )}

                  {/* Plans Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-lg pt-md max-w-5xl mx-auto">
                    {getPlansData(currency, billingCycle).map((plan) => {
                      const isCurrent = company.subscriptionPlan === plan.id;
                      const hasActiveSubscription = !!company.stripeSubscriptionId;

                      const subtitleStr = plan.limit === 15 
                        ? getPlanTexts().subtitle15 
                        : plan.limit === 30 
                          ? getPlanTexts().subtitle30 
                          : getPlanTexts().subtitle50;

                      let cardStyle = '';
                      if (isCurrent) {
                        cardStyle = 'border-primary bg-primary/[0.03] ring-2 ring-primary ring-opacity-50 opacity-100 shadow-md';
                      } else if (hasActiveSubscription) {
                        cardStyle = 'border-outline-variant bg-surface-container-lowest opacity-40 cursor-not-allowed';
                      } else {
                        cardStyle = 'border-outline-variant bg-surface-container-lowest opacity-75 hover:opacity-100 hover:scale-[1.01] transition-all duration-200';
                      }

                      return (
                        <div
                          key={plan.id}
                          style={{ contentVisibility: 'auto' }}
                          className={`border rounded-3xl p-lg flex flex-col justify-between transition-all duration-300 min-h-[380px] relative overflow-hidden shadow-sm ${cardStyle}`}
                        >
                          {isCurrent && (
                            <span className="absolute top-4 right-4 bg-primary text-on-primary font-extrabold text-[10px] px-sm py-[4px] rounded-full uppercase tracking-wider shadow-sm">
                              {getPlanTexts().btnCurrent}
                            </span>
                          )}
                          
                          <div className="space-y-md">
                            <h4 className="font-bold text-headline-sm text-on-surface flex items-center gap-xs">
                              <span className="material-symbols-outlined text-primary text-[24px]">groups</span>
                              {getPlanTexts().featEmployees.replace('{limit}', String(plan.limit))}
                            </h4>
                            <p className="text-body-sm text-on-surface-variant/90 leading-relaxed">
                              {subtitleStr}
                            </p>
                            
                            <div className="mt-md flex flex-col justify-end min-h-[70px]">
                              {plan.originalPriceStr && (
                                <span className="text-body-sm text-on-surface-variant/60 line-through font-semibold">
                                  {getCurrencySymbol(plan.currency)} {plan.originalPriceStr}
                                </span>
                              )}
                              <div>
                                <span className="font-display-time-mobile text-display-time text-on-surface font-bold tracking-tight">
                                  {getCurrencySymbol(plan.currency)} {plan.priceStr}
                                </span>
                                <span className="text-body-xs text-on-surface-variant/80 ml-xs font-semibold">
                                  /{billingCycle === 'MONTHLY' ? 'mês' : 'ano'}
                                </span>
                              </div>
                              {billingCycle === 'ANNUAL' && (
                                <div className="text-success text-body-xs font-bold mt-xs flex items-center gap-xs">
                                  <span className="material-symbols-outlined text-[16px]">savings</span>
                                  {getPlanTexts().discountLabel}
                                </div>
                              )}
                            </div>

                            <ul className="mt-md space-y-sm text-body-xs text-on-surface-variant/90 border-t border-outline-variant/30 pt-md">
                              <li className="flex items-center gap-xs font-medium">
                                <span className="material-symbols-outlined text-success text-[16px]">check_circle</span>
                                {getPlanTexts().featEmployees.replace('{limit}', String(plan.limit))}
                              </li>
                              <li className="flex items-center gap-xs font-medium">
                                <span className="material-symbols-outlined text-success text-[16px]">check_circle</span>
                                {getPlanTexts().featTrial}
                              </li>
                              <li className="flex items-center gap-xs font-medium">
                                <span className="material-symbols-outlined text-success text-[16px]">check_circle</span>
                                {getPlanTexts().featReports}
                              </li>
                            </ul>
                          </div>

                          <div className="pt-lg">
                            {hasActiveSubscription ? (
                              isCurrent ? (
                                <button
                                  type="button"
                                  onClick={handleManageSubscription}
                                  disabled={saveLoading}
                                  className="w-full h-12 rounded-2xl font-bold bg-secondary text-on-secondary hover:opacity-90 active:scale-[0.98] transition-all text-body-sm flex items-center justify-center gap-xs cursor-pointer shadow-sm"
                                >
                                  <span className="material-symbols-outlined text-[20px]">credit_card</span>
                                  <span>{getPlanTexts().btnManage}</span>
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  disabled
                                  className="w-full h-12 rounded-2xl font-bold bg-outline-variant text-on-surface-variant/40 border border-outline-variant cursor-not-allowed text-body-md"
                                >
                                  Indisponível
                                </button>
                              )
                            ) : (
                              isCurrent ? (
                                <button
                                  type="button"
                                  disabled
                                  className="w-full h-12 rounded-2xl font-bold bg-outline-variant text-on-surface-variant/50 border border-outline-variant cursor-not-allowed text-body-md"
                                >
                                  {getPlanTexts().btnCurrent}
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  disabled={saveLoading}
                                  onClick={() => handleSelectPlan(plan.id)}
                                  className="w-full h-12 rounded-2xl font-bold bg-primary text-on-primary hover:opacity-90 active:scale-[0.98] transition-all text-body-md cursor-pointer shadow-sm"
                                >
                                  {getPlanTexts().btnSelect}
                                </button>
                              )
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
