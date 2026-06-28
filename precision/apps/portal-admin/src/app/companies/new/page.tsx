'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';

export default function NewCompanyPage() {
  const router = useRouter();
  
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [contact, setContact] = useState('');
  
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      showToast('O nome da empresa é obrigatório.', 'error');
      return;
    }
    if (!address.trim()) {
      showToast('O endereço é obrigatório.', 'error');
      return;
    }
    if (!number.trim()) {
      showToast('O número do endereço é obrigatório.', 'error');
      return;
    }
    if (!contact.trim()) {
      showToast('O contato é obrigatório.', 'error');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/admin/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, address, number, contact }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Erro ao criar empresa');
      }

      showToast('Empresa criada com sucesso!', 'success');
      setTimeout(() => {
        router.push('/companies');
      }, 1000);
    } catch (err: any) {
      console.error(err);
      showToast(err.message || 'Erro ao criar empresa.', 'error');
      setSubmitting(false);
    }
  };

  return (
    <div className="admin-theme bg-background text-on-surface font-body-sm min-h-screen">
      <div className="flex h-screen overflow-hidden">
        
        {/* Toast Notification */}
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
            pendingRequestsCount={0} 
          />

          <div className="flex-1 overflow-y-auto p-container-margin md:p-xl">
            <div className="max-w-[800px] mx-auto flex flex-col gap-xl">
              
              {/* Back Button and Title */}
              <section className="flex flex-col gap-xs">
                <button 
                  onClick={() => router.push('/companies')}
                  className="self-start text-on-surface-variant hover:text-primary flex items-center gap-xs font-label-caps text-label-caps transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                  VOLTAR PARA LISTA
                </button>
                <h1 className="font-headline-lg text-headline-lg text-on-surface mt-sm">Adicionar Empresa</h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant">Cadastre uma nova empresa ou filial no sistema.</p>
              </section>

              {/* Form Card */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm">
                <form onSubmit={handleSubmit} className="flex flex-col gap-lg">
                  {/* Name field */}
                  <div className="flex flex-col gap-xs">
                    <label htmlFor="companyName" className="font-label-caps text-label-caps text-on-surface-variant font-bold">
                      NOME DA EMPRESA
                    </label>
                    <input 
                      id="companyName"
                      type="text"
                      className="bg-surface-bright border border-outline-variant rounded-md py-sm px-md text-body-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition-all text-on-surface"
                      placeholder="Ex: Precision Matriz"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={submitting}
                    />
                  </div>

                  {/* Address and Number row */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-md">
                    <div className="flex flex-col gap-xs md:col-span-3">
                      <label htmlFor="companyAddress" className="font-label-caps text-label-caps text-on-surface-variant font-bold">
                        ENDEREÇO
                      </label>
                      <input 
                        id="companyAddress"
                        type="text"
                        className="bg-surface-bright border border-outline-variant rounded-md py-sm px-md text-body-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition-all text-on-surface"
                        placeholder="Ex: Avenida Paulista"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        disabled={submitting}
                      />
                    </div>
                    <div className="flex flex-col gap-xs">
                      <label htmlFor="companyNumber" className="font-label-caps text-label-caps text-on-surface-variant font-bold">
                        NÚMERO
                      </label>
                      <input 
                        id="companyNumber"
                        type="text"
                        className="bg-surface-bright border border-outline-variant rounded-md py-sm px-md text-body-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition-all text-on-surface"
                        placeholder="Ex: 123"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        disabled={submitting}
                      />
                    </div>
                  </div>

                  {/* Contact field */}
                  <div className="flex flex-col gap-xs">
                    <label htmlFor="companyContact" className="font-label-caps text-label-caps text-on-surface-variant font-bold">
                      CONTATO (TELEFONE/EMAIL)
                    </label>
                    <input 
                      id="companyContact"
                      type="text"
                      className="bg-surface-bright border border-outline-variant rounded-md py-sm px-md text-body-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition-all text-on-surface"
                      placeholder="Ex: contato@precision.com.br ou (11) 98765-4321"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      disabled={submitting}
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-md mt-sm">
                    <button 
                      type="submit"
                      disabled={submitting}
                      className="bg-primary text-on-primary font-bold px-md py-sm rounded-lg flex items-center justify-center gap-sm hover:opacity-90 active:opacity-80 transition-all cursor-pointer font-label-caps text-label-caps min-w-[120px]"
                    >
                      {submitting ? (
                        <span className="animate-spin material-symbols-outlined text-[18px]">progress_activity</span>
                      ) : (
                        'SALVAR'
                      )}
                    </button>
                    <button 
                      type="button"
                      onClick={() => router.push('/companies')}
                      disabled={submitting}
                      className="border border-outline text-on-surface-variant font-bold px-md py-sm rounded-lg hover:bg-surface-container-high active:opacity-80 transition-all cursor-pointer font-label-caps text-label-caps"
                    >
                      CANCELAR
                    </button>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
