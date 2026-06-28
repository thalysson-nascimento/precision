'use client';

import React, { useEffect, useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { MetricsSummary } from '@/components/dashboard/MetricsSummary';
import { MonthlyOvertimeChart } from '@/components/dashboard/MonthlyOvertimeChart';
import { RecentActivitiesList } from '@/components/dashboard/RecentActivitiesList';
import { PendingRequestsTable } from '@/components/dashboard/PendingRequestsTable';
import { DashboardData } from '@/types';

export default function PortalAdmin() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null); // Armazena o ID do request que está processando
  const [bulkLoading, setBulkLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Buscar dados ao iniciar a página
  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/admin/dashboard');
      if (!response.ok) throw new Error('Falha ao carregar dados do dashboard');
      const json = await response.json();
      setData(json);
    } catch (err) {
      console.error(err);
      showToast('Erro ao carregar os dados do painel.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Processar aprovação ou rejeição
  const handleRequestAction = async (requestId: string, action: 'approve' | 'reject') => {
    setActionLoading(requestId);
    try {
      const response = await fetch('/api/admin/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requestId, action }),
      });
      const result = await response.json();
      
      if (!response.ok) throw new Error(result.error || 'Erro ao processar requisição');

      showToast(action === 'approve' ? 'Solicitação aprovada com sucesso!' : 'Solicitação rejeitada.', 'success');
      
      // Recarregar os dados do dashboard para atualizar tabelas e estatísticas
      await fetchDashboardData();
    } catch (err: any) {
      console.error(err);
      showToast(err.message || 'Ocorreu um erro no processamento.', 'error');
    } finally {
      setActionLoading(null);
    }
  };

  // Processar aprovação em massa
  const handleBulkApprove = async () => {
    if (!data || data.pendingRequests.length === 0) {
      showToast('Não há pendências para resolver.', 'error');
      return;
    }
    setBulkLoading(true);
    try {
      const response = await fetch('/api/admin/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'bulk_approve' }),
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.error || 'Erro na aprovação em massa');

      showToast('Todas as pendências foram aprovadas com sucesso!', 'success');
      await fetchDashboardData();
    } catch (err: any) {
      console.error(err);
      showToast(err.message || 'Erro na aprovação em massa.', 'error');
    } finally {
      setBulkLoading(false);
    }
  };

  const getFormattedDate = () => {
    const d = new Date();
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' }).toUpperCase();
  };

  // Filtrar os colaboradores com pendências
  const filteredRequests = data?.pendingRequests.filter(req => 
    req.employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="admin-theme bg-background text-on-surface font-body-sm min-h-screen">
      {/* Shell Container */}
      <div className="flex h-screen overflow-hidden">
        
        {/* Toast Alert */}
        {toast && (
          <div className={`fixed top-4 right-4 z-50 px-md py-sm rounded-lg shadow-lg text-white font-semibold transition-all duration-300 transform scale-100 flex items-center gap-sm ${toast.type === 'success' ? 'bg-secondary' : 'bg-error'}`}>
            <span className="material-symbols-outlined">{toast.type === 'success' ? 'check_circle' : 'error'}</span>
            <span>{toast.message}</span>
          </div>
        )}

        {/* SideNavBar */}
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 ml-0 md:ml-64 flex flex-col h-screen overflow-hidden bg-background">
          
          {/* TopNavBar */}
          <Header 
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm} 
            pendingRequestsCount={data?.metrics.pendingRequestsCount || 0} 
          />

          {/* Scrollable Content Canvas */}
          <div className="flex-1 overflow-y-auto p-container-margin md:p-xl">
            <div className="max-w-[1200px] mx-auto flex flex-col gap-xl">
              
              {/* Content Header */}
              <section className="flex flex-col md:flex-row md:items-end justify-between gap-md">
                <div>
                  <h1 className="font-headline-lg text-headline-lg text-on-surface">Dashboard Administrativo</h1>
                  <p className="font-body-lg text-body-lg text-on-surface-variant mt-xs">Visão geral e status em tempo real da equipe.</p>
                </div>
                <div className="flex items-center gap-sm bg-surface-container-low px-md py-sm rounded-lg border border-outline-variant">
                  <span className="material-symbols-outlined text-primary">calendar_today</span>
                  <span className="font-label-caps text-label-caps text-on-surface">HOJE, {getFormattedDate()}</span>
                </div>
              </section>

              {/* Indicators (Cards) */}
              <MetricsSummary metrics={data?.metrics} loading={loading} />

              {/* Main Grid: Charts & Activity */}
              <section className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
                <MonthlyOvertimeChart monthlyOvertime={data?.monthlyOvertime} loading={loading} />
                <RecentActivitiesList activities={data?.recentActivities} loading={loading} />
              </section>

              {/* Bottom Section: Table Pending Actions */}
              <PendingRequestsTable 
                requests={filteredRequests}
                searchTerm={searchTerm}
                onSearchClear={() => setSearchTerm('')}
                actionLoading={actionLoading}
                bulkLoading={bulkLoading}
                onApprove={(id) => handleRequestAction(id, 'approve')}
                onReject={(id) => handleRequestAction(id, 'reject')}
                onBulkApprove={handleBulkApprove}
                loading={loading}
              />

            </div>
          </div>
        </main>
      </div>

      <style jsx global>{`
        /* Custom scrollbar for inner content if needed */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1; 
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8; 
        }
      `}</style>
    </div>
  );
}
