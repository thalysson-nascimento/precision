'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { useI18n } from '@/locales/useI18n';

interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  userRole: string;
  phone: string | null;
  address: string | null;
  contractNumber: string | null;
  isTeamLeader: boolean;
  isActive: boolean;
  isPasswordTemp: boolean;
  tempPassword: string | null;
  teamId: string | null;
  team: { id: string; name: string } | null;
  managerId: string | null;
  manager: { id: string; name: string } | null;
  company: { id: string; name: string } | null;
}

export default function EmployeesListPage() {
  const { t } = useI18n();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'active' | 'inactive'>('active');
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

      // 2. Fetch employees list
      const res = await fetch('/api/admin/employees');
      if (!res.ok) throw new Error(t('employees.editError'));
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      console.error(err);
      showToast(t('employees.editError'), 'error');
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

  const handleResetTempPassword = async (employee: Employee) => {
    if (!confirm(t('employees.confirmRegenerate'))) return;

    try {
      const res = await fetch(`/api/admin/employees/${employee.id}/reset-temp-password`, {
        method: 'POST',
      });

      if (!res.ok) {
        throw new Error(t('employees.regenerateError'));
      }

      const data = await res.json();
      showToast(`${t('employees.regenerateSuccess')} ${t('employees.tempPasswordValue', { password: data.tempPassword })}`, 'success');

      // Update local state
      setEmployees(prev =>
        prev.map(emp => (emp.id === employee.id ? { ...emp, isPasswordTemp: true, tempPassword: data.tempPassword } : emp))
      );
    } catch (err: any) {
      console.error(err);
      showToast(err.message || t('employees.regenerateError'), 'error');
    }
  };

  const handleToggleStatus = async (employee: Employee) => {
    const actionText = employee.isActive ? t('common.inactive').toLowerCase() : t('common.active').toLowerCase();
    if (!confirm(`${t('common.confirm')} ${actionText} ${employee.name}?`)) return;

    try {
      const res = await fetch(`/api/admin/employees/${employee.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...employee,
          isActive: !employee.isActive,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || t('employees.editError'));
      }

      showToast(t('employees.editSuccess'), 'success');
      
      // Update local state
      setEmployees(prev =>
        prev.map(emp => (emp.id === employee.id ? { ...emp, isActive: !emp.isActive } : emp))
      );
    } catch (err: any) {
      console.error(err);
      showToast(err.message || t('employees.editError'), 'error');
    }
  };

  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 0) return '';
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // Filter list based on search term and active tab
  const filteredEmployees = employees.filter(emp => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (emp.contractNumber && emp.contractNumber.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesTab = activeTab === 'active' ? emp.isActive : !emp.isActive;
    
    return matchesSearch && matchesTab;
  });

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
                  <h1 className="font-headline-lg text-headline-lg text-on-surface">{t('employees.title')}</h1>
                  <p className="font-body-lg text-body-lg text-on-surface-variant mt-xs">{t('employees.subtitle')}</p>
                </div>
                <Link 
                  href="/employees/new" 
                  className="bg-primary text-on-primary font-bold px-md py-sm rounded-lg flex items-center gap-xs hover:opacity-90 active:opacity-80 transition-all cursor-pointer font-label-caps text-label-caps"
                >
                  <span className="material-symbols-outlined text-[18px]">person_add</span>
                  {t('employees.addEmployee')}
                </Link>
              </section>

              {/* Segmented Control / Tabs */}
              <div className="flex border-b border-outline-variant gap-lg">
                <button
                  onClick={() => setActiveTab('active')}
                  className={`py-sm px-md font-bold text-body-lg relative cursor-pointer transition-colors duration-200 ${activeTab === 'active' ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
                >
                  {t('employees.activeTab')}
                  {activeTab === 'active' && (
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary rounded-t-full" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('inactive')}
                  className={`py-sm px-md font-bold text-body-lg relative cursor-pointer transition-colors duration-200 ${activeTab === 'inactive' ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
                >
                  {t('employees.inactiveTab')}
                  {activeTab === 'inactive' && (
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary rounded-t-full" />
                  )}
                </button>
              </div>

              {/* Table Card */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden flex flex-col">
                {loading ? (
                  <div className="p-xl flex justify-center items-center h-64">
                    <span className="animate-spin material-symbols-outlined text-primary text-[32px]">progress_activity</span>
                  </div>
                ) : filteredEmployees.length === 0 ? (
                  <div className="p-xl text-center text-on-surface-variant h-64 flex flex-col justify-center items-center gap-sm">
                    <span className="material-symbols-outlined text-[48px] text-outline">group</span>
                    <p className="font-body-lg text-body-lg">Nenhum colaborador encontrado.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-outline-variant bg-surface-container-low text-on-surface-variant font-label-caps text-label-caps">
                           <th className="py-md px-lg font-bold">{t('employees.tableHeaderEmployee')}</th>
                           <th className="py-md px-lg font-bold">{t('employees.tableHeaderEmail')}</th>
                           <th className="py-md px-lg font-bold">{t('employees.tempPasswordLabel')}</th>
                           <th className="py-md px-lg font-bold">{t('employees.tableHeaderContract')}</th>
                           <th className="py-md px-lg font-bold">{t('employees.tableHeaderTeam')}</th>
                           <th className="py-md px-lg font-bold text-right">{t('employees.tableHeaderActions')}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-outline-variant">
                        {filteredEmployees.map((emp) => {
                          const initials = getInitials(emp.name);
                          const isDeactivated = !emp.isActive;

                          return (
                            <tr 
                              key={emp.id} 
                              className={`transition-colors ${isDeactivated ? 'bg-surface-container-low/20 text-on-surface/60 hover:bg-surface-container-low/30' : 'hover:bg-surface-container-lowest/50'}`}
                            >
                              {/* Avatar and Name */}
                              <td className="py-md px-lg flex items-center gap-md">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-body-md select-none shrink-0 ${isDeactivated ? 'bg-outline-variant text-on-surface-variant/80' : 'bg-primary/10 text-primary'}`}>
                                  {initials}
                                </div>
                                <div className="min-w-0">
                                  <span className={`font-semibold text-body-lg block truncate ${isDeactivated ? 'text-on-surface-variant' : 'text-on-surface'}`}>
                                    {emp.name}
                                    {emp.isTeamLeader && (
                                      <span className="ml-xs bg-secondary/10 text-secondary text-[11px] font-bold px-xs py-[2px] rounded-full uppercase tracking-wider">
                                        {t('employees.isLeader')}
                                      </span>
                                    )}
                                  </span>
                                  <span className="font-medium text-body-sm text-on-surface-variant/75 block mt-[2px] truncate">
                                    {emp.role}
                                  </span>
                                </div>
                              </td>

                              {/* Contact & Email */}
                              <td className="py-md px-lg text-body-sm">
                                <span className="block truncate font-medium text-on-surface">{emp.email}</span>
                                <span className="block text-on-surface-variant/70 mt-[2px]">{emp.phone || 'Sem telefone'}</span>
                              </td>

                               {/* Temporary Password */}
                               <td className="py-md px-lg text-body-sm">
                                 {emp.isPasswordTemp ? (
                                   <span className="inline-flex items-center gap-xs bg-amber-500/10 text-amber-700 font-bold px-sm py-[2px] rounded-full text-xs font-mono select-all">
                                     {emp.tempPassword}
                                   </span>
                                 ) : (
                                   <span className="text-on-surface-variant/60 text-xs italic">
                                     {t('employees.passwordChanged')}
                                   </span>
                                 )}
                               </td>

                               {/* Contract Number */}
                               <td className="py-md px-lg text-body-sm font-mono text-on-surface-variant font-semibold">
                                 {emp.contractNumber || '---'}
                               </td>

                              {/* Team & Manager */}
                              <td className="py-md px-lg text-body-sm">
                                <span className="block font-medium text-on-surface">{emp.team?.name || t('employees.semEquipe')}</span>
                                <span className="block text-on-surface-variant/70 mt-[2px] text-xs">
                                  {emp.manager ? `Resp: ${emp.manager.name}` : t('employees.semGestor')}
                                </span>
                              </td>

                              {/* Actions */}
                              <td className="py-md px-lg text-right">
                                <div className="flex justify-end gap-sm items-center">
                                   {!isDeactivated ? (
                                     <>
                                       <button
                                         onClick={() => handleResetTempPassword(emp)}
                                         className="text-on-surface-variant hover:text-primary hover:bg-surface-container-high rounded-full p-2 transition-all flex items-center justify-center cursor-pointer"
                                         title={t('employees.regenerateTempPassword')}
                                       >
                                         <span className="material-symbols-outlined text-[20px]">vpn_key</span>
                                       </button>
                                       <Link 
                                         href={`/employees/edit/${emp.id}`}
                                         className="text-on-surface-variant hover:text-primary hover:bg-surface-container-high rounded-full p-2 transition-all flex items-center justify-center"
                                         title={t('common.edit')}
                                       >
                                         <span className="material-symbols-outlined text-[20px]">edit</span>
                                       </Link>
                                      <button 
                                        onClick={() => handleToggleStatus(emp)}
                                        className="text-on-surface-variant hover:text-error hover:bg-error/10 rounded-full p-2 transition-all flex items-center justify-center cursor-pointer"
                                        title={t('common.inactive')}
                                      >
                                        <span className="material-symbols-outlined text-[20px]">person_off</span>
                                      </button>
                                    </>
                                  ) : (
                                    <button 
                                      onClick={() => handleToggleStatus(emp)}
                                      className="bg-primary/10 text-primary hover:bg-primary hover:text-on-primary font-bold px-md py-xs rounded-lg text-xs tracking-wider uppercase transition-all cursor-pointer font-label-caps"
                                      title={t('common.active')}
                                    >
                                      {t('common.active')}
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
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
