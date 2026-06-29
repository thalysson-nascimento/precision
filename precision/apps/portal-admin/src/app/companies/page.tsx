'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';

interface Company {
  id: string;
  name: string;
  address: string;
  number: string;
  contact: string;
  createdAt: string;
}

export default function CompaniesListPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [pendingCount, setPendingCount] = useState(0);
  const [userRole, setUserRole] = useState<string | null>(null);

  const fetchProfileAndData = async () => {
    try {
      // 1. Fetch user role
      const profileRes = await fetch('/api/auth/me');
      if (profileRes.ok) {
        const profileData = await profileRes.json();
        setUserRole(profileData.userRole);
      }

      // 2. Fetch companies list
      const res = await fetch('/api/admin/companies');
      if (!res.ok) throw new Error('Falha ao carregar empresas');
      const data = await res.json();
      setCompanies(data);
    } catch (err) {
      console.error(err);
      showToast('Erro ao carregar dados das empresas.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingCount = async () => {
    try {
      const res = await fetch('/api/admin/dashboard');
      if (res.ok) {
        const data = await res.json();
        setPendingCount(data.metrics.pendingRequestsCount || 0);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchProfileAndData();
    fetchPendingCount();
  }, []);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Deseja realmente excluir esta empresa?')) return;

    try {
      const res = await fetch(`/api/admin/companies/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Erro ao excluir empresa');
      }

      showToast('Empresa excluída com sucesso!', 'success');
      // Re-fetch list
      const companiesRes = await fetch('/api/admin/companies');
      if (companiesRes.ok) {
        const data = await companiesRes.json();
        setCompanies(data);
      }
    } catch (err: any) {
      console.error(err);
      showToast(err.message || 'Erro ao excluir empresa.', 'error');
    }
  };

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isSuperAdmin = userRole === 'SUPERADMIN';

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
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm} 
            pendingRequestsCount={pendingCount} 
          />

          <div className="flex-1 overflow-y-auto p-container-margin md:p-xl">
            <div className="max-w-[1200px] mx-auto flex flex-col gap-xl">
              
              {/* Content Header */}
              <section className="flex flex-col md:flex-row md:items-end justify-between gap-md">
                <div>
                  <h1 className="font-headline-lg text-headline-lg text-on-surface">Empresas</h1>
                  <p className="font-body-lg text-body-lg text-on-surface-variant mt-xs">
                    {isSuperAdmin ? 'Gerencie todas as empresas organizadas no sistema.' : 'Gerencie os dados cadastrais da sua empresa.'}
                  </p>
                </div>
                {isSuperAdmin && (
                  <Link 
                    href="/companies/new" 
                    className="bg-primary text-on-primary font-bold px-md py-sm rounded-lg flex items-center gap-xs hover:opacity-90 active:opacity-80 transition-all cursor-pointer font-label-caps text-label-caps"
                  >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                    ADICIONAR EMPRESA
                  </Link>
                )}
              </section>

              {/* Table Card */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden flex flex-col">
                {loading ? (
                  <div className="p-xl flex justify-center items-center h-64">
                    <span className="animate-spin material-symbols-outlined text-primary text-[32px]">progress_activity</span>
                  </div>
                ) : filteredCompanies.length === 0 ? (
                  <div className="p-xl text-center text-on-surface-variant h-64 flex flex-col justify-center items-center gap-sm">
                    <span className="material-symbols-outlined text-[48px] text-outline">domain</span>
                    <p className="font-body-lg text-body-lg">Nenhuma empresa encontrada.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-outline-variant bg-surface-container-low text-on-surface-variant font-label-caps text-label-caps">
                          <th className="py-md px-lg font-bold">Empresa</th>
                          <th className="py-md px-lg font-bold">Endereço</th>
                          <th className="py-md px-lg font-bold">Contato</th>
                          <th className="py-md px-lg text-right font-bold">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-outline-variant">
                        {filteredCompanies.map((company) => (
                          <tr key={company.id} className="hover:bg-surface-container-lowest/50 transition-colors">
                            <td className="py-md px-lg">
                              <span className="font-semibold text-on-surface text-body-lg block">{company.name}</span>
                            </td>
                            <td className="py-md px-lg text-on-surface-variant font-medium text-body-sm">
                              {company.address}, Nº {company.number}
                            </td>
                            <td className="py-md px-lg text-on-surface-variant font-medium text-body-sm">
                              {company.contact}
                            </td>
                            <td className="py-md px-lg text-right">
                              <div className="flex justify-end gap-sm">
                                <Link 
                                  href={`/companies/edit/${company.id}`}
                                  className="text-on-surface-variant hover:text-primary hover:bg-surface-container-high rounded-full p-2 transition-all flex items-center justify-center"
                                  title="Editar"
                                >
                                  <span className="material-symbols-outlined text-[20px]">edit</span>
                                </Link>
                                {isSuperAdmin && (
                                  <button 
                                    onClick={() => handleDelete(company.id)}
                                    className="text-on-surface-variant hover:text-error hover:bg-error/10 rounded-full p-2 transition-all flex items-center justify-center cursor-pointer"
                                    title="Excluir"
                                  >
                                    <span className="material-symbols-outlined text-[20px]">delete</span>
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
