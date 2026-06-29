'use client';

import React, { useEffect, useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { useI18n } from '@/locales/useI18n';

interface EmployeeSummary {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}

interface TeamSummary {
  id: string;
  name: string;
  employees: EmployeeSummary[];
}

interface CompanySummary {
  id: string;
  name: string;
  address: string;
  contact: string;
  teams: TeamSummary[];
  employees: EmployeeSummary[]; // unassigned
}

export default function ReportsPage() {
  const { t } = useI18n();
  const [companies, setCompanies] = useState<CompanySummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [pendingCount, setPendingCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Expanded accordions state
  const [expandedCompanies, setExpandedCompanies] = useState<Record<string, boolean>>({});
  const [expandedTeams, setExpandedTeams] = useState<Record<string, boolean>>({});
  const [expandedUnassigned, setExpandedUnassigned] = useState<Record<string, boolean>>({});

  const fetchData = async () => {
    try {
      // Get dashboard metrics for header
      const dashRes = await fetch('/api/admin/dashboard');
      if (dashRes.ok) {
        const dashData = await dashRes.json();
        setPendingCount(dashData.metrics.pendingRequestsCount || 0);
      }

      // Get reports data
      const res = await fetch('/api/admin/reports');
      if (res.ok) {
        const data = await res.json();
        setCompanies(data);
        
        // Auto expand first company
        if (data.length > 0) {
          setExpandedCompanies({ [data[0].id]: true });
        }
      }
    } catch (e) {
      console.error('Erro ao buscar dados do relatório:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleCompany = (id: string) => {
    setExpandedCompanies(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleTeam = (id: string) => {
    setExpandedTeams(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleUnassigned = (id: string) => {
    setExpandedUnassigned(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePrint = (type: 'company' | 'team' | 'employee', id: string) => {
    window.open(`/reports/print?type=${type}&id=${id}`, '_blank');
  };

  // Filter logic: if search term is provided, filter hierarchy
  const filteredCompanies = companies.map(company => {
    const term = searchTerm.toLowerCase();
    
    // Filter teams that match search, or have employees that match search
    const filteredTeams = company.teams.map(team => {
      const matchingEmployees = team.employees.filter(emp =>
        emp.name.toLowerCase().includes(term) ||
        emp.email.toLowerCase().includes(term) ||
        emp.role.toLowerCase().includes(term)
      );

      const teamMatches = team.name.toLowerCase().includes(term);

      if (teamMatches || matchingEmployees.length > 0) {
        return {
          ...team,
          employees: teamMatches ? team.employees : matchingEmployees
        };
      }
      return null;
    }).filter(Boolean) as TeamSummary[];

    // Filter unassigned employees that match search
    const filteredUnassigned = company.employees.filter(emp =>
      emp.name.toLowerCase().includes(term) ||
      emp.email.toLowerCase().includes(term) ||
      emp.role.toLowerCase().includes(term)
    );

    const companyMatches = company.name.toLowerCase().includes(term);

    if (companyMatches || filteredTeams.length > 0 || filteredUnassigned.length > 0) {
      return {
        ...company,
        teams: companyMatches ? company.teams : filteredTeams,
        employees: companyMatches ? company.employees : filteredUnassigned
      };
    }
    return null;
  }).filter(Boolean) as CompanySummary[];

  return (
    <div className="admin-theme bg-background text-on-surface font-body-sm min-h-screen">
      <div className="flex h-screen overflow-hidden">
        
        <Sidebar />

        <main className="flex-1 ml-0 md:ml-64 flex flex-col h-screen overflow-hidden bg-background">
          <Header pendingRequestsCount={pendingCount} />

          <div className="flex-1 overflow-y-auto p-container-margin md:p-xl">
            <div className="max-w-[1000px] mx-auto flex flex-col gap-xl">
              
              {/* Page Title */}
              <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
                <div>
                  <h1 className="font-headline-lg text-headline-lg text-on-surface">{t('reports.title')}</h1>
                  <p className="font-body-lg text-body-lg text-on-surface-variant mt-xs">
                    {t('reports.subtitle')}
                  </p>
                </div>
                
                {/* Search box */}
                <div className="relative w-full md:w-80">
                  <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Filtrar empresa, grupo ou funcionário..."
                    className="w-full h-10 pl-xl pr-sm border border-outline-variant rounded-xl bg-surface-container-low focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-body-sm"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-sm top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                  )}
                </div>
              </section>

              {loading ? (
                <div className="p-xl flex justify-center items-center h-64">
                  <span className="animate-spin material-symbols-outlined text-primary text-[32px]">progress_activity</span>
                </div>
              ) : filteredCompanies.length === 0 ? (
                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-xl shadow-sm text-center py-16">
                  <span className="material-symbols-outlined text-[48px] text-outline mb-md">assessment</span>
                  <p className="font-body-lg text-body-lg text-on-surface-variant">
                    {searchTerm ? 'Nenhum resultado encontrado para a busca.' : t('reports.emptyList')}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-lg">
                  {filteredCompanies.map(company => {
                    const isCompanyExpanded = !!expandedCompanies[company.id];
                    const totalEmployees = company.employees.length + company.teams.reduce((acc, t) => acc + t.employees.length, 0);

                    return (
                      <div 
                        key={company.id}
                        className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm transition-all duration-200"
                      >
                        {/* Company Header Row */}
                        <div className="flex flex-wrap items-center justify-between p-md md:p-lg bg-surface-container-low border-b border-outline-variant gap-sm">
                          <button
                            onClick={() => toggleCompany(company.id)}
                            className="flex items-center gap-sm text-left font-bold text-headline-md text-on-surface hover:text-primary transition-colors cursor-pointer flex-1"
                          >
                            <span className="material-symbols-outlined text-primary">domain</span>
                            <span>{company.name}</span>
                            <span className="text-body-sm text-on-surface-variant font-medium normal-case ml-xs">
                              ({totalEmployees} {totalEmployees === 1 ? t('reports.employee').toLowerCase() : 'colaboradores'})
                            </span>
                            <span className="material-symbols-outlined transition-transform duration-200" style={{ transform: isCompanyExpanded ? 'rotate(180deg)' : 'rotate(0)' }}>
                              expand_more
                            </span>
                          </button>

                          <button
                            onClick={() => handlePrint('company', company.id)}
                            className="bg-primary/10 text-primary hover:bg-primary/20 px-md py-sm rounded-lg font-bold text-body-sm cursor-pointer transition-colors flex items-center gap-xs"
                          >
                            <span className="material-symbols-outlined text-[18px]">print</span>
                            <span>{t('reports.companyReport')}</span>
                          </button>
                        </div>

                        {/* Company content (Teams and Employees) */}
                        {isCompanyExpanded && (
                          <div className="p-md md:p-lg space-y-md">
                            
                            {/* Teams / Groups Header */}
                            {company.teams.length > 0 && (
                              <div className="space-y-sm">
                                {company.teams.map(team => {
                                  const isTeamExpanded = !!expandedTeams[team.id];
                                  
                                  return (
                                    <div 
                                      key={team.id}
                                      className="border border-outline-variant/60 rounded-lg overflow-hidden"
                                    >
                                      {/* Team Accordion Header */}
                                      <div className="flex items-center justify-between p-sm px-md bg-surface-container-lowest border-b border-outline-variant/40 gap-sm">
                                        <button
                                          onClick={() => toggleTeam(team.id)}
                                          className="flex items-center gap-xs font-semibold text-body-lg text-on-surface hover:text-primary transition-colors cursor-pointer text-left flex-1"
                                        >
                                          <span className="material-symbols-outlined text-outline">groups</span>
                                          <span>{team.name}</span>
                                          <span className="text-body-xs text-on-surface-variant font-medium ml-xs">
                                            ({team.employees.length} {team.employees.length === 1 ? t('reports.employee').toLowerCase() : 'colaboradores'})
                                          </span>
                                          <span className="material-symbols-outlined text-[18px] transition-transform duration-200" style={{ transform: isTeamExpanded ? 'rotate(180deg)' : 'rotate(0)' }}>
                                            expand_more
                                          </span>
                                        </button>

                                        <button
                                          onClick={() => handlePrint('team', team.id)}
                                          className="text-secondary hover:bg-secondary/10 px-sm py-xs rounded-md font-semibold text-body-xs cursor-pointer transition-colors flex items-center gap-xs border border-secondary/20"
                                        >
                                          <span className="material-symbols-outlined text-[16px]">print</span>
                                          <span>{t('reports.groupReport')}</span>
                                        </button>
                                      </div>

                                      {/* Team Employees list */}
                                      {isTeamExpanded && (
                                        <div className="overflow-x-auto">
                                          <table className="w-full text-left border-collapse min-w-[600px] text-body-sm">
                                            <thead>
                                              <tr className="bg-surface-container-low/40 border-b border-outline-variant/40 text-label-caps font-semibold text-on-surface-variant">
                                                <th className="p-sm px-md">Nome</th>
                                                <th className="p-sm px-md">Cargo</th>
                                                <th className="p-sm px-md">E-mail</th>
                                                <th className="p-sm px-md">Status</th>
                                                <th className="p-sm px-md text-right">Relatório</th>
                                              </tr>
                                            </thead>
                                            <tbody className="divide-y divide-outline-variant/20">
                                              {team.employees.length === 0 ? (
                                                <tr>
                                                  <td colSpan={5} className="p-md text-center text-on-surface-variant/70">
                                                    Nenhum colaborador alocado neste grupo.
                                                  </td>
                                                </tr>
                                              ) : (
                                                team.employees.map(emp => (
                                                  <tr key={emp.id} className="hover:bg-surface-container-low/20 transition-colors">
                                                    <td className="p-sm px-md font-semibold text-on-surface">{emp.name}</td>
                                                    <td className="p-sm px-md text-on-surface-variant">{emp.role}</td>
                                                    <td className="p-sm px-md text-on-surface-variant">{emp.email}</td>
                                                    <td className="p-sm px-md">
                                                      <span className={`inline-flex px-xs py-[2px] rounded-full text-[10px] font-bold ${emp.isActive ? 'bg-secondary/15 text-secondary' : 'bg-outline/15 text-outline'}`}>
                                                        {emp.isActive ? t('common.active') : t('common.inactive')}
                                                      </span>
                                                    </td>
                                                    <td className="p-sm px-md text-right">
                                                      <button
                                                        onClick={() => handlePrint('employee', emp.id)}
                                                        className="text-primary hover:underline font-semibold cursor-pointer text-body-xs"
                                                      >
                                                        {t('reports.employeeReport')}
                                                      </button>
                                                    </td>
                                                  </tr>
                                                ))
                                              )}
                                            </tbody>
                                          </table>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            )}

                            {/* Unassigned Employees (Sem Equipe) */}
                            {company.employees.length > 0 && (
                              <div className="border border-outline-variant/60 rounded-lg overflow-hidden">
                                <div className="flex items-center justify-between p-sm px-md bg-surface-container-lowest border-b border-outline-variant/40">
                                  <button
                                    onClick={() => toggleUnassigned(company.id)}
                                    className="flex items-center gap-xs font-semibold text-body-lg text-on-surface hover:text-primary transition-colors cursor-pointer text-left flex-1"
                                  >
                                    <span className="material-symbols-outlined text-outline">group</span>
                                    <span>{t('reports.noGroup')}</span>
                                    <span className="text-body-xs text-on-surface-variant font-medium ml-xs">
                                      ({company.employees.length})
                                    </span>
                                    <span className="material-symbols-outlined text-[18px] transition-transform duration-200" style={{ transform: expandedUnassigned[company.id] ? 'rotate(180deg)' : 'rotate(0)' }}>
                                      expand_more
                                    </span>
                                  </button>
                                </div>

                                {expandedUnassigned[company.id] && (
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse min-w-[600px] text-body-sm">
                                      <thead>
                                        <tr className="bg-surface-container-low/40 border-b border-outline-variant/40 text-label-caps font-semibold text-on-surface-variant">
                                          <th className="p-sm px-md">Nome</th>
                                          <th className="p-sm px-md">Cargo</th>
                                          <th className="p-sm px-md">E-mail</th>
                                          <th className="p-sm px-md">Status</th>
                                          <th className="p-sm px-md text-right">Relatório</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-outline-variant/20">
                                        {company.employees.map(emp => (
                                          <tr key={emp.id} className="hover:bg-surface-container-low/20 transition-colors">
                                            <td className="p-sm px-md font-semibold text-on-surface">{emp.name}</td>
                                            <td className="p-sm px-md text-on-surface-variant">{emp.role}</td>
                                            <td className="p-sm px-md text-on-surface-variant">{emp.email}</td>
                                            <td className="p-sm px-md">
                                              <span className={`inline-flex px-xs py-[2px] rounded-full text-[10px] font-bold ${emp.isActive ? 'bg-secondary/15 text-secondary' : 'bg-outline/15 text-outline'}`}>
                                                {emp.isActive ? t('common.active') : t('common.inactive')}
                                              </span>
                                            </td>
                                            <td className="p-sm px-md text-right">
                                              <button
                                                onClick={() => handlePrint('employee', emp.id)}
                                                className="text-primary hover:underline font-semibold cursor-pointer text-body-xs"
                                              >
                                                {t('reports.employeeReport')}
                                              </button>
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                )}
                              </div>
                            )}

                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          </div>
        </main>

      </div>
    </div>
  );
}
