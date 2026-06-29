'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import Link from 'next/link';

interface Company {
  id: string;
  name: string;
}

interface Team {
  id: string;
  name: string;
  companyId: string;
}

interface Employee {
  id: string;
  name: string;
  isTeamLeader: boolean;
  companyId: string | null;
}

export default function EditEmployeePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  // User session state
  const [currentUser, setCurrentUser] = useState<{ userRole: string; companyId: string | null } | null>(null);

  // Dropdown lists
  const [companies, setCompanies] = useState<Company[]>([]);
  const [allTeams, setAllTeams] = useState<Team[]>([]);
  const [allEmployees, setAllEmployees] = useState<Employee[]>([]);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [userRole, setUserRole] = useState('EMPLOYEE');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [contractNumber, setContractNumber] = useState('');
  const [isTeamLeader, setIsTeamLeader] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [selectedCompanyId, setSelectedCompanyId] = useState('');
  const [selectedTeamId, setSelectedTeamId] = useState('');
  const [selectedManagerId, setSelectedManagerId] = useState('');

  // Times
  const [workStart, setWorkStart] = useState('09:00');
  const [lunchStart, setLunchStart] = useState('12:00');
  const [lunchEnd, setLunchEnd] = useState('13:00');
  const [workEnd, setWorkEnd] = useState('18:00');

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchInitialData = async () => {
    try {
      // 1. Fetch user session
      const meRes = await fetch('/api/auth/me');
      if (!meRes.ok) throw new Error('Não autorizado');
      const meData = await meRes.json();
      setCurrentUser(meData);

      // 2. Fetch employee details
      const empRes = await fetch(`/api/admin/employees/${id}`);
      if (!empRes.ok) {
        throw new Error('Colaborador não encontrado');
      }
      const employeeData = await empRes.json();

      // Populate form
      setName(employeeData.name);
      setEmail(employeeData.email);
      setRole(employeeData.role);
      setUserRole(employeeData.userRole);
      setPhone(employeeData.phone || '');
      setAddress(employeeData.address || '');
      setContractNumber(employeeData.contractNumber || '');
      setIsTeamLeader(employeeData.isTeamLeader);
      setIsActive(employeeData.isActive);
      setSelectedCompanyId(employeeData.companyId || '');
      setSelectedTeamId(employeeData.teamId || '');
      setSelectedManagerId(employeeData.managerId || '');
      setWorkStart(employeeData.workStart);
      setLunchStart(employeeData.lunchStart);
      setLunchEnd(employeeData.lunchEnd);
      setWorkEnd(employeeData.workEnd);

      // 3. Fetch companies if SuperAdmin
      const isSuperAdmin = meData.userRole === 'SUPERADMIN';
      if (isSuperAdmin) {
        const companiesRes = await fetch('/api/admin/companies');
        if (companiesRes.ok) {
          const companiesData = await companiesRes.json();
          setCompanies(companiesData);
        }
      }

      // 4. Fetch all teams
      const teamsRes = await fetch('/api/admin/teams');
      if (teamsRes.ok) {
        const teamsData = await teamsRes.json();
        setAllTeams(teamsData);
      }

      // 5. Fetch all employees
      const empsRes = await fetch('/api/admin/employees');
      if (empsRes.ok) {
        const empsData = await empsRes.json();
        setAllEmployees(empsData);
      }

      // 6. Fetch pending requests
      const dashRes = await fetch('/api/admin/dashboard');
      if (dashRes.ok) {
        const dashData = await dashRes.json();
        setPendingCount(dashData.metrics.pendingRequestsCount || 0);
      }
    } catch (err: any) {
      console.error(err);
      showToast(err.message || 'Erro ao carregar dados do colaborador.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return showToast('O nome é obrigatório.', 'error');
    if (!email.trim()) return showToast('O e-mail é obrigatório.', 'error');
    if (!role.trim()) return showToast('O cargo é obrigatório.', 'error');
    if (!selectedCompanyId) return showToast('Selecione uma empresa.', 'error');

    setSaving(true);
    try {
      const res = await fetch(`/api/admin/employees/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          role,
          userRole,
          phone,
          address,
          contractNumber,
          isTeamLeader,
          isActive,
          teamId: selectedTeamId || null,
          managerId: selectedManagerId || null,
          companyId: selectedCompanyId,
          workStart,
          lunchStart,
          lunchEnd,
          workEnd,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Erro ao atualizar colaborador');
      }

      showToast('Colaborador atualizado com sucesso!', 'success');
      setTimeout(() => {
        router.push('/employees');
      }, 1500);
    } catch (err: any) {
      console.error(err);
      showToast(err.message || 'Erro ao atualizar colaborador.', 'error');
    } finally {
      setSaving(false);
    }
  };

  // Filtered selections based on selected company
  const filteredTeams = allTeams.filter(t => t.companyId === selectedCompanyId);
  const filteredManagers = allEmployees.filter(
    e => e.companyId === selectedCompanyId && e.isTeamLeader && e.id !== id // Cannot manage oneself
  );

  const isSuperAdmin = currentUser?.userRole === 'SUPERADMIN';

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
          <Header pendingRequestsCount={pendingCount} />

          <div className="flex-1 overflow-y-auto p-container-margin md:p-xl">
            <div className="max-w-[800px] mx-auto flex flex-col gap-xl">
              
              {/* Back link */}
              <Link 
                href="/employees"
                className="inline-flex items-center gap-xs text-on-surface-variant hover:text-primary transition-all text-body-sm font-semibold"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                VOLTAR PARA LISTA
              </Link>

              {/* Title */}
              <div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface">Editar Colaborador</h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant mt-xs">Ajuste os dados cadastrais, nível de permissão ou a escala de ponto do colaborador.</p>
              </div>

              {loading ? (
                <div className="p-xl flex justify-center items-center h-64">
                  <span className="animate-spin material-symbols-outlined text-primary text-[32px]">progress_activity</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-xl shadow-sm space-y-xl">
                  
                  {/* Informações Básicas */}
                  <div className="space-y-md">
                    <h2 className="text-body-lg font-bold text-primary border-b border-outline-variant pb-xs flex items-center gap-xs">
                      <span className="material-symbols-outlined text-[20px]">badge</span>
                      Dados Pessoais & Contrato
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                      {/* Nome */}
                      <div className="flex flex-col gap-xs">
                        <label className="text-on-surface-variant font-bold text-xs tracking-wider uppercase">Nome Completo *</label>
                        <input 
                          type="text" 
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Ex: Thalysson Nascimento"
                          className="h-12 px-md border border-outline rounded-xl bg-surface text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-body-lg font-medium"
                        />
                      </div>

                      {/* E-mail */}
                      <div className="flex flex-col gap-xs">
                        <label className="text-on-surface-variant font-bold text-xs tracking-wider uppercase">E-mail Corporativo *</label>
                        <input 
                          type="email" 
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Ex: thalysson@empresa.com"
                          className="h-12 px-md border border-outline rounded-xl bg-surface text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-body-lg font-medium"
                        />
                      </div>

                      {/* Cargo */}
                      <div className="flex flex-col gap-xs">
                        <label className="text-on-surface-variant font-bold text-xs tracking-wider uppercase">Cargo *</label>
                        <input 
                          type="text" 
                          required
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          placeholder="Ex: Desenvolvedor Senior"
                          className="h-12 px-md border border-outline rounded-xl bg-surface text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-body-lg font-medium"
                        />
                      </div>

                      {/* Nível de Acesso */}
                      <div className="flex flex-col gap-xs">
                        <label className="text-on-surface-variant font-bold text-xs tracking-wider uppercase">Nível de Acesso *</label>
                        <select 
                          value={userRole}
                          onChange={(e) => setUserRole(e.target.value)}
                          className="h-12 px-md border border-outline rounded-xl bg-surface text-on-surface focus:border-primary outline-none transition-all text-body-lg font-medium"
                        >
                          <option value="EMPLOYEE">Colaborador (Apenas Mobile)</option>
                          <option value="ADMIN">Administrador (Portal e RH)</option>
                          <option value="OWNER">Dono da Empresa (Acesso Total)</option>
                        </select>
                      </div>

                      {/* Contato */}
                      <div className="flex flex-col gap-xs">
                        <label className="text-on-surface-variant font-bold text-xs tracking-wider uppercase">Contato (Telefone)</label>
                        <input 
                          type="text" 
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Ex: (11) 98888-8888"
                          className="h-12 px-md border border-outline rounded-xl bg-surface text-on-surface focus:border-primary outline-none transition-all text-body-lg font-medium"
                        />
                      </div>

                      {/* Código do Contrato */}
                      <div className="flex flex-col gap-xs">
                        <label className="text-on-surface-variant font-bold text-xs tracking-wider uppercase">Código do Contrato</label>
                        <input 
                          type="text" 
                          value={contractNumber}
                          onChange={(e) => setContractNumber(e.target.value)}
                          placeholder="Ex: #CT-8041"
                          className="h-12 px-md border border-outline rounded-xl bg-surface text-on-surface focus:border-primary outline-none transition-all text-body-lg font-medium font-mono font-bold"
                        />
                      </div>
                    </div>

                    {/* Endereço */}
                    <div className="flex flex-col gap-xs">
                      <label className="text-on-surface-variant font-bold text-xs tracking-wider uppercase">Endereço Completo</label>
                      <input 
                        type="text" 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Ex: Rua Augusta, 400 - São Paulo, SP"
                        className="h-12 px-md border border-outline rounded-xl bg-surface text-on-surface focus:border-primary outline-none transition-all text-body-lg font-medium"
                      />
                    </div>
                  </div>

                  {/* Estrutura Organizacional */}
                  <div className="space-y-md">
                    <h2 className="text-body-lg font-bold text-primary border-b border-outline-variant pb-xs flex items-center gap-xs">
                      <span className="material-symbols-outlined text-[20px]">corporate_fare</span>
                      Estrutura Organizacional & Permissões
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                      {/* Empresa (SuperAdmin Only) */}
                      {isSuperAdmin ? (
                        <div className="flex flex-col gap-xs">
                          <label className="text-on-surface-variant font-bold text-xs tracking-wider uppercase">Empresa *</label>
                          <select 
                            required
                            value={selectedCompanyId}
                            onChange={(e) => {
                              setSelectedCompanyId(e.target.value);
                              setSelectedTeamId('');
                              setSelectedManagerId('');
                            }}
                            className="h-12 px-md border border-outline rounded-xl bg-surface text-on-surface focus:border-primary outline-none transition-all text-body-lg font-medium"
                          >
                            <option value="">Selecione uma Empresa</option>
                            {companies.map(c => (
                              <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-xs opacity-60">
                          <label className="text-on-surface-variant font-bold text-xs tracking-wider uppercase">Empresa</label>
                          <input 
                            type="text" 
                            disabled
                            value="Empresa Logada"
                            className="h-12 px-md border border-outline rounded-xl bg-surface-container-low text-on-surface outline-none transition-all text-body-lg font-medium"
                          />
                        </div>
                      )}

                      {/* Equipe */}
                      <div className="flex flex-col gap-xs">
                        <label className="text-on-surface-variant font-bold text-xs tracking-wider uppercase">Equipe / Setor</label>
                        <select 
                          value={selectedTeamId}
                          onChange={(e) => setSelectedTeamId(e.target.value)}
                          className="h-12 px-md border border-outline rounded-xl bg-surface text-on-surface focus:border-primary outline-none transition-all text-body-lg font-medium"
                        >
                          <option value="">Nenhuma Equipe</option>
                          {filteredTeams.map(t => (
                            <option key={t.id} value={t.id}>{t.name}</option>
                          ))}
                        </select>
                      </div>

                      {/* Gestor Responsável */}
                      <div className="flex flex-col gap-xs col-span-1 md:col-span-2">
                        <label className="text-on-surface-variant font-bold text-xs tracking-wider uppercase">Gestor Responsável</label>
                        <select 
                          value={selectedManagerId}
                          onChange={(e) => setSelectedManagerId(e.target.value)}
                          className="h-12 px-md border border-outline rounded-xl bg-surface text-on-surface focus:border-primary outline-none transition-all text-body-lg font-medium"
                        >
                          <option value="">Sem Responsável Direto (Livre)</option>
                          {filteredManagers.map(m => (
                            <option key={m.id} value={m.id}>{m.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Switch: É Gestor */}
                    <div className="flex items-center justify-between bg-surface-container-low p-md rounded-xl border border-outline-variant/60">
                      <div className="space-y-[2px]">
                        <p className="font-semibold text-body-lg text-on-surface">Este colaborador é líder / gestor?</p>
                        <p className="text-body-sm text-on-surface-variant/80">Se ativo, ele poderá ser selecionado como responsável por outros colaboradores.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer select-none">
                        <input 
                          type="checkbox" 
                          checked={isTeamLeader}
                          onChange={(e) => setIsTeamLeader(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-outline rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>

                    {/* Status de Ativação */}
                    <div className="flex items-center justify-between bg-surface-container-low p-md rounded-xl border border-outline-variant/60">
                      <div className="space-y-[2px]">
                        <p className="font-semibold text-body-lg text-on-surface">Ativo no Sistema</p>
                        <p className="text-body-sm text-on-surface-variant/80">Se desativado, o funcionário não conseguirá bater o ponto ou realizar logins.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer select-none">
                        <input 
                          type="checkbox" 
                          checked={isActive}
                          onChange={(e) => setIsActive(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-outline rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>

                  {/* Definições de Jornada */}
                  <div className="space-y-md">
                    <h2 className="text-body-lg font-bold text-primary border-b border-outline-variant pb-xs flex items-center gap-xs">
                      <span className="material-symbols-outlined text-[20px]">schedule</span>
                      Definição da Jornada de Ponto
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
                      {/* Entrada */}
                      <div className="flex flex-col gap-xs">
                        <label className="text-on-surface-variant font-bold text-xs tracking-wider uppercase">Entrada *</label>
                        <input 
                          type="text" 
                          required
                          value={workStart}
                          onChange={(e) => setWorkStart(e.target.value)}
                          placeholder="09:00"
                          className="h-12 px-md border border-outline rounded-xl bg-surface text-on-surface focus:border-primary outline-none transition-all text-body-lg font-semibold text-center"
                        />
                      </div>

                      {/* Saída Almoço */}
                      <div className="flex flex-col gap-xs">
                        <label className="text-on-surface-variant font-bold text-xs tracking-wider uppercase">Almoço (Saída) *</label>
                        <input 
                          type="text" 
                          required
                          value={lunchStart}
                          onChange={(e) => setLunchStart(e.target.value)}
                          placeholder="12:00"
                          className="h-12 px-md border border-outline rounded-xl bg-surface text-on-surface focus:border-primary outline-none transition-all text-body-lg font-semibold text-center"
                        />
                      </div>

                      {/* Retorno Almoço */}
                      <div className="flex flex-col gap-xs">
                        <label className="text-on-surface-variant font-bold text-xs tracking-wider uppercase">Almoço (Retorno) *</label>
                        <input 
                          type="text" 
                          required
                          value={lunchEnd}
                          onChange={(e) => setLunchEnd(e.target.value)}
                          placeholder="13:00"
                          className="h-12 px-md border border-outline rounded-xl bg-surface text-on-surface focus:border-primary outline-none transition-all text-body-lg font-semibold text-center"
                        />
                      </div>

                      {/* Saída */}
                      <div className="flex flex-col gap-xs">
                        <label className="text-on-surface-variant font-bold text-xs tracking-wider uppercase">Saída *</label>
                        <input 
                          type="text" 
                          required
                          value={workEnd}
                          onChange={(e) => setWorkEnd(e.target.value)}
                          placeholder="18:00"
                          className="h-12 px-md border border-outline rounded-xl bg-surface text-on-surface focus:border-primary outline-none transition-all text-body-lg font-semibold text-center"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Botões */}
                  <div className="flex items-center justify-end gap-md pt-lg border-t border-outline-variant">
                    <Link 
                      href="/employees"
                      className="h-12 px-lg border border-outline text-on-surface hover:bg-surface-container-high rounded-xl font-bold flex items-center justify-center transition-all cursor-pointer font-label-caps"
                    >
                      CANCELAR
                    </Link>
                    <button
                      type="submit"
                      disabled={saving}
                      className="h-12 px-xl bg-primary text-on-primary font-bold hover:opacity-90 active:scale-[0.98] rounded-xl flex items-center justify-center gap-xs transition-all cursor-pointer shadow-sm disabled:opacity-50"
                    >
                      {saving ? (
                        <>
                          <span className="animate-spin material-symbols-outlined text-[18px]">progress_activity</span>
                          <span>SALVANDO...</span>
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-[18px]">check</span>
                          <span>SALVAR ALTERAÇÕES</span>
                        </>
                      )}
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
