'use client';

import React, { useEffect, useState } from 'react';
import { employeeService, Employee } from '@precision/api-client';

export const ProfileScreen: React.FC = () => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsLoading(true);
        const data = await employeeService.getTodayRecords();
        setEmployee(data.employee);
      } catch (err) {
        console.error('Erro ao carregar perfil:', err);
        setError('Não foi possível carregar os dados do perfil.');
      } finally {
        setIsLoading(false);
      }
    };

    setTimeout(() => {
      loadProfile();
    }, 0);
  }, []);

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (error || !employee) {
    return (
      <div className="text-center py-xl bg-surface-container-low rounded-xl border border-dashed border-error/40 p-lg max-w-md mx-auto space-y-md">
        <span className="material-symbols-outlined text-error text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
          error
        </span>
        <p className="text-body-lg font-bold text-on-background">{error || 'Funcionário não encontrado'}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-primary text-on-primary px-lg py-sm rounded-xl font-bold hover:bg-primary-container transition-colors cursor-pointer"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  const formattedId = `#${employee.id.substring(0, 5).toUpperCase()}`;

  return (
    <div className="w-full space-y-md">
      {/* TopAppBar customizada para o Perfil (Sem botão de voltar e sem o cabeçalho padrão) */}
      <header className="w-full bg-surface flex items-center justify-between h-16 border-b border-outline-variant/10">
        <div className="w-10"></div> {/* Espaçador para centralizar título */}
        <h1 className="font-headline-md text-headline-md text-on-surface font-bold">Perfil</h1>
        <button className="w-10 h-10 flex items-center justify-center rounded-full text-primary hover:bg-surface-container-low active:scale-95 duration-100 cursor-pointer">
          <span className="material-symbols-outlined">settings</span>
        </button>
      </header>

      {/* Seção do Avatar e Nome */}
      <section className="flex flex-col items-center py-md">
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-4 border-surface-container-lowest overflow-hidden shadow-md">
            <img 
              className="w-full h-full object-cover" 
              alt={employee.name} 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkp041NLPg5O5xO4J6IwCpf0q0CgXDwxkyFoEV1frk8mxb8YAwdbOFloVN46WTxhA4JaJsDLdGbqWWT-ZWGqrGGSPHo_JEOz2nE7UnWFFMTsu_XKcBoLtybRk_2bIEAm6t_etmvAJMYHmPwKXfYMtW4okrarTmB1wl1R94xR5DNp8VDde68GIvtRxY9U2wwh1lkHcQSngTHKPi3VSnAg0otn113hgliTAvyheeceReSJ-rsS6M08cPuA"
            />
          </div>
          <button className="absolute bottom-1 right-1 bg-primary text-on-primary w-8 h-8 rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">photo_camera</span>
          </button>
        </div>
        <div className="text-center mt-md">
          <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">{employee.name}</h2>
          <p className="font-body-lg text-body-lg text-secondary font-medium">{employee.role}</p>
        </div>
      </section>

      {/* Cartão de Informações Profissionais */}
      <section className="space-y-sm">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-sm">
          <ul className="space-y-md">
            <li className="flex items-center gap-md">
              <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary flex-shrink-0">
                <span className="material-symbols-outlined">group</span>
              </div>
              <div>
                <p className="font-label-caps text-label-caps text-on-surface-variant text-[10px] tracking-wide">EQUIPE</p>
                <p className="font-body-lg text-body-lg text-on-surface font-semibold">Tecnologia</p>
              </div>
            </li>
            <div className="border-t border-outline-variant/30"></div>
            <li className="flex items-center gap-md">
              <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary flex-shrink-0">
                <span className="material-symbols-outlined">person_pin</span>
              </div>
              <div>
                <p className="font-label-caps text-label-caps text-on-surface-variant text-[10px] tracking-wide">GESTOR</p>
                <p className="font-body-lg text-body-lg text-on-surface font-semibold">Maria Silva</p>
              </div>
            </li>
            <div className="border-t border-outline-variant/30"></div>
            <li className="flex items-center gap-md">
              <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary flex-shrink-0">
                <span className="material-symbols-outlined">badge</span>
              </div>
              <div>
                <p className="font-label-caps text-label-caps text-on-surface-variant text-[10px] tracking-wide">ID</p>
                <p className="font-body-lg text-body-lg text-on-surface font-semibold">{formattedId}</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Seção de Dados Pessoais */}
      <section className="space-y-md">
        <h3 className="font-headline-md text-headline-md text-on-surface px-xs">Dados Pessoais</h3>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-sm">
          <ul className="space-y-md">
            <li className="flex flex-col">
              <p className="font-label-caps text-label-caps text-on-surface-variant mb-xs text-[10px] tracking-wide">E-MAIL</p>
              <p className="font-body-lg text-body-lg text-on-surface font-semibold">{employee.email}</p>
            </li>
            <div className="border-t border-outline-variant/30"></div>
            <li className="flex flex-col">
              <p className="font-label-caps text-label-caps text-on-surface-variant mb-xs text-[10px] tracking-wide">TELEFONE</p>
              <p className="font-body-lg text-body-lg text-on-surface font-semibold">(11) 98888-8888</p>
            </li>
            <div className="border-t border-outline-variant/30"></div>
            <li className="flex flex-col">
              <p className="font-label-caps text-label-caps text-on-surface-variant mb-xs text-[10px] tracking-wide">DATA DE ADMISSÃO</p>
              <p className="font-body-lg text-body-lg text-on-surface font-semibold">15/03/2022</p>
            </li>
          </ul>
        </div>
      </section>

      {/* Ações */}
      <section className="flex flex-col gap-md pt-md">
        <button className="w-full h-14 border-2 border-primary text-primary hover:bg-primary/5 rounded-xl font-headline-md flex items-center justify-center gap-sm active:scale-[0.98] transition-all duration-100 cursor-pointer font-bold">
          <span className="material-symbols-outlined">edit</span>
          Editar Perfil
        </button>
        <button className="w-full h-14 text-error hover:bg-error/5 rounded-xl font-headline-md flex items-center justify-center gap-sm active:scale-[0.98] transition-all duration-100 cursor-pointer font-bold">
          <span className="material-symbols-outlined">logout</span>
          Sair
        </button>
      </section>
    </div>
  );
};

// Componente Local de Skeleton Loader para Perfil
const ProfileSkeleton: React.FC = () => {
  return (
    <div className="w-full space-y-md">
      {/* Header Skeleton */}
      <header className="w-full bg-surface flex items-center justify-between h-16 border-b border-outline-variant/10">
        <div className="w-10"></div>
        <div className="h-6 w-16 shimmer rounded"></div>
        <div className="w-10 h-10 rounded-full shimmer"></div>
      </header>

      {/* Avatar and Name Skeleton */}
      <section className="flex flex-col items-center py-md space-y-md">
        <div className="w-32 h-32 rounded-full border-4 border-surface-container-lowest shadow-md shimmer"></div>
        <div className="space-y-sm text-center">
          <div className="h-6 w-44 shimmer rounded mx-auto"></div>
          <div className="h-5 w-36 shimmer rounded mx-auto"></div>
        </div>
      </section>

      {/* Professional Info Card Skeleton */}
      <section className="space-y-sm">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-sm space-y-md">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center gap-md">
              <div className="w-10 h-10 rounded-lg shimmer flex-shrink-0"></div>
              <div className="space-y-xs w-full">
                <div className="h-3 w-16 shimmer rounded"></div>
                <div className="h-5 w-32 shimmer rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Personal Info Card Skeleton */}
      <section className="space-y-md">
        <div className="h-6 w-32 shimmer rounded px-xs"></div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-sm space-y-md">
          {[1, 2, 3].map(i => (
            <div key={i} className="space-y-xs">
              <div className="h-3 w-20 shimmer rounded"></div>
              <div className="h-5 w-48 shimmer rounded"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Action Buttons Skeleton */}
      <section className="flex flex-col gap-md pt-md">
        <div className="w-full h-14 shimmer rounded-xl"></div>
        <div className="w-full h-14 shimmer rounded-xl"></div>
      </section>
    </div>
  );
};
