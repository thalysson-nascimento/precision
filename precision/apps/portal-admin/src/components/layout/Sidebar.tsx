'use client';

import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import logoImg from '../../../../../public/images/precision.png';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const getLinkClass = (path: string) => {
    const isActive = pathname === path || (path !== '/' && pathname.startsWith(path));
    if (isActive) {
      return "flex items-center gap-md py-sm px-md rounded-lg text-primary font-bold border-r-4 border-primary bg-primary/5 font-body-lg text-body-lg cursor-pointer active:opacity-80 transition-all duration-200";
    }
    return "flex items-center gap-md py-sm px-md rounded-lg text-on-surface-variant hover:text-primary font-body-lg text-body-lg hover:bg-surface-container-high transition-all duration-200 cursor-pointer active:opacity-80";
  };

  const getIconStyle = (path: string) => {
    const isActive = pathname === path || (path !== '/' && pathname.startsWith(path));
    return isActive ? { fontVariationSettings: "'FILL' 1" } : undefined;
  };

  return (
    <nav className="bg-surface-container-low h-screen w-64 fixed left-0 top-0 border-r border-outline-variant flex flex-col py-lg px-md hidden md:flex z-20">
      {/* Header Brand */}
      <div className="mb-xl flex flex-col items-start pt-md px-md">
        <div className="flex items-center gap-sm">
          <Image src={logoImg} alt="Logo" width={30} height={30} />
          <span className="font-headline-lg text-headline-lg text-primary">Precision</span>
        </div>
        <span className="text-on-surface-variant font-body-sm text-body-sm mt-xs">Portal Administrativo</span>
      </div>
      {/* Navigation Links */}
      <ul className="flex flex-col gap-sm flex-grow">
        {/* Dashboard */}
        <li>
          <Link href="/" className={getLinkClass('/')}>
            <span className="material-symbols-outlined" style={getIconStyle('/')}>dashboard</span>
            <span>Dashboard</span>
          </Link>
        </li>
        {/* Equipes */}
        <li>
          <Link href="/teams" className={getLinkClass('/teams')}>
            <span className="material-symbols-outlined" style={getIconStyle('/teams')}>groups</span>
            <span>Equipes</span>
          </Link>
        </li>
        {/* Empresas */}
        <li>
          <Link href="/companies" className={getLinkClass('/companies')}>
            <span className="material-symbols-outlined" style={getIconStyle('/companies')}>domain</span>
            <span>Empresas</span>
          </Link>
        </li>
        {/* Cargos */}
        <li>
          <Link href="/roles" className={getLinkClass('/roles')}>
            <span className="material-symbols-outlined" style={getIconStyle('/roles')}>badge</span>
            <span>Cargos</span>
          </Link>
        </li>
        {/* Colaboradores */}
        <li>
          <a className="flex items-center gap-md py-sm px-md rounded-lg text-on-surface-variant hover:text-primary font-body-lg text-body-lg hover:bg-surface-container-high transition-colors duration-200 cursor-pointer active:opacity-80" href="#">
            <span className="material-symbols-outlined">group</span>
            <span>Colaboradores</span>
          </a>
        </li>
        {/* Relatórios */}
        <li>
          <a className="flex items-center gap-md py-sm px-md rounded-lg text-on-surface-variant hover:text-primary font-body-lg text-body-lg hover:bg-surface-container-high transition-colors duration-200 cursor-pointer active:opacity-80" href="#">
            <span className="material-symbols-outlined">assessment</span>
            <span>Relatórios</span>
          </a>
        </li>
        {/* Configurações */}
        <li>
          <a className="flex items-center gap-md py-sm px-md rounded-lg text-on-surface-variant hover:text-primary font-body-lg text-body-lg hover:bg-surface-container-high transition-colors duration-200 cursor-pointer active:opacity-80" href="#">
            <span className="material-symbols-outlined">settings</span>
            <span>Configurações</span>
          </a>
        </li>
      </ul>

      {/* User Profile Snippet in Sidebar */}
      <div className="mt-auto pt-lg border-t border-outline-variant flex items-center gap-md px-md">
        <img 
          className="w-10 h-10 rounded-full object-cover" 
          alt="Foto do Admin" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRiM7QS1zU-IRqR08jlEIhy_FT4UXtFUAsv2fx_R9upsEX4ckQVrO7O-APRFb2tdycG-fUYSbH7fJ-dGIQ2y5pQpRQTuxdHueM-peK6C55112MKx6Mu88Jwvyjoq5jkLkVfVUoBYj6s3x42IcjbrH-_k5ECpviQg7tLi7QF5Q8NKe9qH3KDeLGV0rknRZDfl_DN6Uhv8hKuh7znDo3i18X7bTj7YK-gh_3m1z2nFPKswO51SpTbx7z1w"
        />
        <div>
          <p className="font-body-sm text-body-sm text-on-surface font-semibold">Admin User</p>
          <p className="font-label-caps text-label-caps text-on-surface-variant">RH</p>
        </div>
      </div>
    </nav>
  );
};
