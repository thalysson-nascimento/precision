'use client';

import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

interface HeaderProps {
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  pendingRequestsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  searchTerm = '',
  onSearchChange,
  pendingRequestsCount,
}) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Fetch session
  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Unauthorized');
      })
      .then(data => {
        setCurrentUser(data);
      })
      .catch(() => {});
  }, []);

  // Load saved notifications
  useEffect(() => {
    const saved = localStorage.getItem('support-notifications');
    if (saved) {
      try {
        setNotifications(JSON.parse(saved));
      } catch (e) {
        localStorage.removeItem('support-notifications');
      }
    }
  }, []);

  // Connect to socket and listen for support messages
  useEffect(() => {
    if (!currentUser || currentUser.userRole === 'SUPERADMIN' || !currentUser.companyId) return;

    const socket = io();
    socket.emit('join-company', currentUser.companyId);

    socket.on('new-message', (message: any) => {
      // If the message is from SUPERADMIN and the chat widget is not active
      if (message.senderRole === 'SUPERADMIN') {
        const isChatOpen = sessionStorage.getItem('support-chat-active') === 'true';
        if (!isChatOpen) {
          setNotifications(prev => {
            if (prev.some(x => x.id === message.id)) return prev;
            const updated = [...prev, message];
            localStorage.setItem('support-notifications', JSON.stringify(updated));
            return updated;
          });
        }
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [currentUser]);

  const handleNotificationClick = (n: any) => {
    setDropdownOpen(false);
    setNotifications(prev => {
      const updated = prev.filter(x => x.id !== n.id);
      localStorage.setItem('support-notifications', JSON.stringify(updated));
      return updated;
    });
    // Open chat widget
    window.dispatchEvent(new CustomEvent('open-support-chat'));
  };

  const handleClearNotifications = () => {
    setNotifications([]);
    localStorage.removeItem('support-notifications');
  };

  return (
    <header className="bg-surface-container-lowest border-b border-outline-variant shadow-sm flex justify-between items-center px-xl w-full h-16 shrink-0 z-10 sticky top-0 hidden md:flex">
      {/* Search Bar */}
      {onSearchChange ? (
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
      ) : (
        <div className="flex-1" />
      )}
      
      {/* Right Actions */}
      <div className="flex items-center gap-md">
        <button className="text-on-surface-variant hover:bg-surface-container-high rounded-full p-2 transition-all duration-200 flex items-center justify-center cursor-pointer">
          <span className="material-symbols-outlined">help</span>
        </button>
        
        {/* Notification Button and Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="text-on-surface-variant hover:bg-surface-container-high rounded-full p-2 transition-all duration-200 flex items-center justify-center relative cursor-pointer"
          >
            <span className="material-symbols-outlined">notifications</span>
            {(notifications.length > 0 || pendingRequestsCount > 0) && (
              <span className="absolute top-0 right-0 min-w-[16px] h-4 bg-error text-white text-[9px] font-bold rounded-full flex items-center justify-center px-[4px] animate-pulse">
                {notifications.length + pendingRequestsCount}
              </span>
            )}
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-xs w-72 bg-white border border-outline-variant/60 rounded-2xl shadow-xl py-xs z-50 text-left text-on-surface animate-scale-up">
              <div className="px-md py-sm border-b border-outline-variant/60 flex justify-between items-center bg-surface-container-low rounded-t-2xl">
                <span className="font-bold text-body-sm">Notificações</span>
                {notifications.length > 0 && (
                  <button 
                    onClick={handleClearNotifications}
                    className="text-primary hover:text-primary-dark text-[11px] font-bold cursor-pointer"
                  >
                    Limpar todas
                  </button>
                )}
              </div>
              <div className="max-h-60 overflow-y-auto divide-y divide-outline-variant/40 custom-scrollbar">
                {notifications.length === 0 ? (
                  <div className="p-md text-center text-on-surface-variant text-body-xs font-semibold">
                    Nenhuma notificação de suporte
                  </div>
                ) : (
                  notifications.map((n, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => handleNotificationClick(n)}
                      className="p-md hover:bg-surface-container-high cursor-pointer transition-colors space-y-[2px]"
                    >
                      <p className="text-[11px] font-bold text-primary">Suporte Precision</p>
                      <p className="text-body-xs text-on-surface truncate">{n.text}</p>
                      <p className="text-[9px] text-on-surface-variant">
                        {new Date(n.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

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
