import React from 'react';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  pendingRequestsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  searchTerm,
  onSearchChange,
  pendingRequestsCount,
}) => {
  return (
    <header className="bg-surface-container-lowest border-b border-outline-variant shadow-sm flex justify-between items-center px-xl w-full h-16 shrink-0 z-10 sticky top-0 hidden md:flex">
      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-sm text-on-surface-variant">search</span>
          <input 
            className="w-full bg-surface-bright border border-outline-variant rounded-md py-sm pl-xl pr-sm text-body-sm font-body-sm focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition-all duration-200 text-on-surface" 
            placeholder="Buscar colaboradores na tabela..." 
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
      
      {/* Right Actions */}
      <div className="flex items-center gap-md">
        <button className="text-on-surface-variant hover:bg-surface-container-high rounded-full p-2 transition-all duration-200 flex items-center justify-center">
          <span className="material-symbols-outlined">help</span>
        </button>
        <button className="text-on-surface-variant hover:bg-surface-container-high rounded-full p-2 transition-all duration-200 flex items-center justify-center relative">
          <span className="material-symbols-outlined">notifications</span>
          {pendingRequestsCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full animate-pulse"></span>
          )}
        </button>
        <div className="ml-sm border-l border-outline-variant pl-md">
          <img 
            alt="Foto do Administrador" 
            className="w-8 h-8 rounded-full object-cover border border-outline-variant" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYLmuggzigzKAr0jBYDd90zxYupKSWzQ5kWbiEsnZqvVP5rLH_II5gRfljXT61if4QI72TGi75tO3zFYRXp1jRJEVnKfVfb6k4zPVG-FFStDtl-oMSRhDzzAsVzlkmGiC43hjESB3p0B4AD2jv2XXOQofYUZkS13IrdUoFi8PM28yanxORo2J4bmFknXgC-3FFzPTNk1XUv4l5CSBEPOW-KPP2t3-nj5t_mt2Cfm-zBzXjyankR9zvew"
          />
        </div>
      </div>
    </header>
  );
};
