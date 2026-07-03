'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { useI18n } from '@/locales/useI18n';
import { useRouter } from 'next/navigation';
import { Message, CompanyWithChat as Company } from '@/types/support';
import { io } from 'socket.io-client';

export default function SupportPage() {
  const { t } = useI18n();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  // SuperAdmin subscription edit controls
  const [targetPlan, setTargetPlan] = useState('THREE_MONTHS');
  const [targetStatus, setTargetStatus] = useState('ACTIVE');
  const [updatingSubscription, setUpdatingSubscription] = useState(false);
  const [updateSuccessMsg, setUpdateSuccessMsg] = useState('');

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Load current user on start
  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Unauthorized');
      })
      .then(data => {
        setCurrentUser(data);
      })
      .catch(err => {
        console.error('Error fetching user:', err);
      });
  }, []);

  // Standard user redirection to dashboard to trigger floating widget
  useEffect(() => {
    if (currentUser && currentUser.userRole !== 'SUPERADMIN') {
      router.push('/');
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('open-support-chat'));
      }, 500);
    }
  }, [currentUser, router]);

  // Fetch initial data or list of companies
  const loadData = async () => {
    if (!currentUser) return;
    try {
      setLoading(true);
      const isSuperAdmin = currentUser.userRole === 'SUPERADMIN';
      
      const res = await fetch('/api/admin/support');
      if (res.ok) {
        const json = await res.ok ? await res.json() : [];
        if (isSuperAdmin) {
          setCompanies(json);
        } else {
          setMessages(json);
        }
      }
    } catch (e) {
      console.error('Error loading support data:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [currentUser]);

  // Load messages for the selected company (SUPERADMIN ONLY)
  useEffect(() => {
    if (!currentUser || currentUser.userRole !== 'SUPERADMIN' || !selectedCompanyId) return;

    const fetchCompanyMessages = async () => {
      try {
        const res = await fetch(`/api/admin/support?companyId=${selectedCompanyId}`);
        if (res.ok) {
          const json = await res.json();
          setMessages(json);
        }
      } catch (err) {
        console.error('Error fetching company messages:', err);
      }
    };

    fetchCompanyMessages();
  }, [selectedCompanyId, currentUser]);

  // Connect to superadmin Socket.io room and listen for incoming messages in real-time
  useEffect(() => {
    if (!currentUser || currentUser.userRole !== 'SUPERADMIN') return;

    const socket = io();
    socket.emit('join-superadmin');

    socket.on('new-message', (message: Message) => {
      // 1. If message belongs to active selected company, append it instantly
      if (selectedCompanyId === message.companyId) {
        setMessages(prev => {
          if (prev.some(x => x.id === message.id)) return prev;
          return [...prev, message];
        });
      }

      // 2. Update company list reactively (and move company with new message to top)
      setCompanies(prevCompanies => {
        const updated = prevCompanies.map(c => {
          if (c.id === message.companyId) {
            return {
              ...c,
              supportMessages: [message],
            };
          }
          return c;
        });

        return updated.sort((a, b) => {
          const aHasMsg = a.supportMessages.length > 0;
          const bHasMsg = b.supportMessages.length > 0;
          if (aHasMsg && !bHasMsg) return -1;
          if (!aHasMsg && bHasMsg) return 1;
          
          const aTime = aHasMsg ? new Date(a.supportMessages[0].createdAt).getTime() : 0;
          const bTime = bHasMsg ? new Date(b.supportMessages[0].createdAt).getTime() : 0;
          if (aTime !== bTime) return bTime - aTime;

          return a.name.localeCompare(b.name);
        });
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [currentUser, selectedCompanyId]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || sending) return;

    setSending(true);
    try {
      const isSuperAdmin = currentUser?.userRole === 'SUPERADMIN';
      const body = {
        text: inputText,
        companyId: isSuperAdmin ? selectedCompanyId : undefined,
      };

      const res = await fetch('/api/admin/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        const newMessage = await res.json();
        setMessages(prev => [...prev, newMessage]);
        setInputText('');
        
        // Refresh companies list to update last message if superadmin
        if (isSuperAdmin) {
          const cRes = await fetch('/api/admin/support');
          if (cRes.ok) {
            setCompanies(await cRes.json());
          }
        }
      }
    } catch (err) {
      console.error('Error sending message:', err);
    } finally {
      setSending(false);
    }
  };

  // Update subscription status (SUPERADMIN ONLY)
  const handleUpdateSubscription = async () => {
    if (!selectedCompanyId || !currentUser || currentUser.userRole !== 'SUPERADMIN') return;

    setUpdatingSubscription(true);
    setUpdateSuccessMsg('');
    try {
      const selectedCompany = companies.find(c => c.id === selectedCompanyId);
      if (!selectedCompany) return;

      const res = await fetch(`/api/admin/companies/${selectedCompanyId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: selectedCompany.name,
          address: selectedCompany.address || '...',
          number: selectedCompany.number || '...',
          contact: selectedCompany.contact || '...',
          subscriptionPlan: targetPlan,
          subscriptionStatus: targetStatus,
        }),
      });

      if (res.ok) {
        setUpdateSuccessMsg('Assinatura atualizada com sucesso!');
        setTimeout(() => setUpdateSuccessMsg(''), 4000);
        
        // Refresh company details
        const cRes = await fetch('/api/admin/support');
        if (cRes.ok) {
          const freshCompanies = await cRes.json();
          setCompanies(freshCompanies);
        }
      } else {
        const errorResult = await res.json();
        alert(errorResult.error || 'Erro ao atualizar assinatura');
      }
    } catch (err) {
      console.error('Error updating subscription:', err);
    } finally {
      setUpdatingSubscription(false);
    }
  };

  const isSuperAdmin = currentUser?.userRole === 'SUPERADMIN';
  const activeCompany = isSuperAdmin ? companies.find(c => c.id === selectedCompanyId) : null;

  return (
    <div className="admin-theme bg-background text-on-surface font-body-sm min-h-screen">
      <div className="flex h-screen overflow-hidden">
        
        {/* Sidebar Nav */}
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 ml-0 md:ml-64 flex flex-col h-screen overflow-hidden bg-background">
          
          {/* Header */}
          <header className="bg-surface-container-lowest border-b border-outline-variant shadow-sm px-xl h-16 flex items-center justify-between shrink-0">
            <div>
              <h1 className="text-headline-md font-bold text-on-surface">{t('common.supportChatTitle')}</h1>
              <p className="text-body-xs text-on-surface-variant">
                {isSuperAdmin ? 'Gerenciamento de conversas e liberação de planos.' : t('common.chatWithUs')}
              </p>
            </div>
          </header>

          {/* Chat Layout Container */}
          <div className="flex flex-1 overflow-hidden">
            
            {/* 1. SuperAdmin Side Panel (Company List) */}
            {isSuperAdmin && (
              <div className="w-80 border-r border-outline-variant bg-surface-container-low flex flex-col overflow-y-auto">
                <div className="p-md border-b border-outline-variant bg-surface-container-lowest">
                  <span className="font-bold text-headline-sm text-on-surface">{t('common.companyList')}</span>
                </div>
                <div className="divide-y divide-outline-variant/45">
                  {companies.map(c => {
                    const hasMessages = c.supportMessages.length > 0;
                    const lastMsgText = hasMessages ? c.supportMessages[0].text : 'Nenhuma mensagem';
                    const isExp = c.subscriptionStatus === 'EXPIRED';
                    
                    return (
                      <div 
                        key={c.id}
                        onClick={() => {
                          setSelectedCompanyId(c.id);
                          setTargetPlan(c.subscriptionPlan);
                          setTargetStatus(c.subscriptionStatus);
                        }}
                        className={`p-md cursor-pointer hover:bg-surface-container-high transition-colors flex flex-col gap-xs ${selectedCompanyId === c.id ? 'bg-primary/5 border-r-4 border-primary' : ''}`}
                      >
                        <div className="flex justify-between items-start gap-sm">
                          <span className="font-semibold text-body-sm text-on-surface truncate">{c.name}</span>
                          <span className={`text-[10px] font-bold px-sm py-[2px] rounded-full uppercase ${isExp ? 'bg-error/15 text-error' : 'bg-secondary/15 text-secondary'}`}>
                            {isExp ? t('common.statusExpired') : t('common.statusActive')}
                          </span>
                        </div>
                        <span className="text-body-xs text-on-surface-variant truncate">{lastMsgText}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 2. Chat Conversation Box */}
            <div className="flex-1 flex flex-col overflow-hidden bg-surface-container-lowest support-chat-container">
              
              {/* Superadmin Subscription Actions Header */}
              {isSuperAdmin && activeCompany && (
                <div className="p-md border-b border-outline-variant bg-surface-container-low flex flex-wrap gap-md justify-between items-center z-10 shadow-sm">
                  <div className="space-y-xs">
                    <div className="flex items-center gap-sm">
                      <span className="font-bold text-body-lg text-on-surface">{activeCompany.name}</span>
                      <span className={`text-[10px] font-bold px-sm py-[2px] rounded-full uppercase ${activeCompany.subscriptionStatus === 'EXPIRED' ? 'bg-error/15 text-error' : 'bg-secondary/15 text-secondary'}`}>
                        {activeCompany.subscriptionStatus === 'EXPIRED' ? t('common.statusExpired') : t('common.statusActive')}
                      </span>
                    </div>
                    <p className="text-body-xs text-on-surface-variant">
                      Plano Atual: <strong className="text-primary">{activeCompany.subscriptionPlan}</strong>
                      {activeCompany.subscriptionEndsAt && ` • Expira em: ${new Date(activeCompany.subscriptionEndsAt).toLocaleDateString('pt-BR')}`}
                    </p>
                  </div>

                  {/* Actions Form */}
                  <div className="flex items-center gap-sm">
                    <select
                      value={targetPlan}
                      onChange={(e) => setTargetPlan(e.target.value)}
                      className="bg-surface-bright border border-outline-variant rounded-md px-sm py-xs text-body-xs focus:ring-1 focus:ring-primary focus:outline-none"
                    >
                      <option value="TRIAL">Trial (15 dias)</option>
                      <option value="THREE_MONTHS">{t('common.planThreeMonths')}</option>
                      <option value="SIX_MONTHS">{t('common.planSixMonths')}</option>
                    </select>

                    <select
                      value={targetStatus}
                      onChange={(e) => setTargetStatus(e.target.value)}
                      className="bg-surface-bright border border-outline-variant rounded-md px-sm py-xs text-body-xs focus:ring-1 focus:ring-primary focus:outline-none"
                    >
                      <option value="ACTIVE">{t('common.statusActive')}</option>
                      <option value="EXPIRED">{t('common.statusExpired')}</option>
                    </select>

                    <button
                      disabled={updatingSubscription}
                      onClick={handleUpdateSubscription}
                      className="bg-primary hover:bg-primary-dark disabled:opacity-50 text-white font-semibold text-body-xs px-md py-xs rounded-md shadow transition-all active:scale-[0.98] cursor-pointer"
                    >
                      {updatingSubscription ? 'Ajustando...' : t('common.activateSubscription')}
                    </button>
                  </div>

                  {updateSuccessMsg && (
                    <div className="w-full text-secondary font-bold text-body-xs mt-1 animate-pulse">
                      {updateSuccessMsg}
                    </div>
                  )}
                </div>
              )}

              {/* Chat Messages Frame */}
              <div className="flex-1 overflow-y-auto p-md space-y-md custom-scrollbar bg-background/30">
                {loading && messages.length === 0 ? (
                  <div className="text-center py-xl text-on-surface-variant font-semibold">
                    {t('common.loading')}
                  </div>
                ) : messages.length === 0 ? (
                  <div className="text-center py-xl text-on-surface-variant font-medium">
                    {t('common.noMessages')}
                  </div>
                ) : (
                  messages.map(msg => {
                    const isOwnMessage = isSuperAdmin 
                      ? msg.senderRole === 'SUPERADMIN' 
                      : msg.senderRole !== 'SUPERADMIN';
                    
                    return (
                      <div 
                        key={msg.id}
                        className={`flex flex-col max-w-[70%] ${isOwnMessage ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                      >
                        {/* Bubble Wrapper */}
                        <div className={`p-md rounded-2xl shadow-sm leading-relaxed ${isOwnMessage ? 'bg-primary text-white rounded-tr-none' : 'bg-surface-container-high text-on-surface rounded-tl-none'}`}>
                          <p className="text-body-sm font-semibold mb-xs text-[11px] opacity-75">
                            {msg.senderName} • {msg.senderRole}
                          </p>
                          <p className="text-body-sm break-words whitespace-pre-wrap">{msg.text}</p>
                        </div>
                        <span className="text-[10px] text-on-surface-variant mt-1 px-xs">
                          {new Date(msg.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input Form */}
              {(!isSuperAdmin || selectedCompanyId) && (
                <form 
                  onSubmit={handleSendMessage}
                  className="p-md border-t border-outline-variant bg-surface-container-low flex items-center gap-sm shrink-0 support-chat-input z-10"
                >
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={t('common.typeMessage')}
                    className="flex-1 bg-surface-bright border border-outline-variant rounded-xl px-md py-sm text-body-sm font-body-sm focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition-all text-on-surface"
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim() || sending}
                    className="bg-primary hover:bg-primary-dark disabled:opacity-50 text-white rounded-xl px-lg py-sm font-bold text-body-sm transition-all active:scale-[0.97] flex items-center gap-xs cursor-pointer shadow-md shadow-primary/10"
                  >
                    <span className="material-symbols-outlined text-[16px]">send</span>
                    <span>{t('common.send')}</span>
                  </button>
                </form>
              )}

            </div>

          </div>

        </main>
      </div>
    </div>
  );
}
