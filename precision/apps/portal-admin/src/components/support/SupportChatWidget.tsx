'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useI18n } from '@/locales/useI18n';
import { Message } from '@/types/support';
import { io } from 'socket.io-client';

export function SupportChatWidget() {
  const { t } = useI18n();
  const [currentUser, setCurrentUser] = useState<any>(null);
  
  // Widget states
  const [visible, setVisible] = useState(false);
  const [minimized, setMinimized] = useState(true);
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

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

  // Listen to custom trigger events to open the chat dynamically
  useEffect(() => {
    const handleOpenChat = () => {
      setVisible(true);
      setMinimized(false);
    };

    window.addEventListener('open-support-chat', handleOpenChat);
    return () => {
      window.removeEventListener('open-support-chat', handleOpenChat);
    };
  }, []);

  // Load messages dynamically when visible and not minimized
  const fetchMessages = async () => {
    if (!currentUser || currentUser.userRole === 'SUPERADMIN') return;
    try {
      const res = await fetch('/api/admin/support');
      if (res.ok) {
        const json = await res.json();
        setMessages(json);
      }
    } catch (e) {
      console.error('Error fetching chat widget messages:', e);
    }
  };

  // Fetch chat history once when chat is expanded
  useEffect(() => {
    if (!visible || minimized || !currentUser || currentUser.userRole === 'SUPERADMIN') return;
    fetchMessages();
  }, [visible, minimized, currentUser]);

  // Connect to Socket.io and listen for real-time messages
  useEffect(() => {
    if (!visible || !currentUser || currentUser.userRole === 'SUPERADMIN' || !currentUser.companyId) return;

    const socket = io();
    socket.emit('join-company', currentUser.companyId);

    // Set sessionStorage flag indicating the chat widget is active
    sessionStorage.setItem('support-chat-active', minimized ? 'false' : 'true');

    socket.on('new-message', (message: Message) => {
      setMessages(prev => {
        if (prev.some(x => x.id === message.id)) return prev;
        return [...prev, message];
      });
    });

    return () => {
      socket.disconnect();
      sessionStorage.setItem('support-chat-active', 'false');
    };
  }, [visible, minimized, currentUser]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, minimized, visible]);

  // Send message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || sending) return;

    const messageText = inputText.trim();
    setInputText(''); // Clear input immediately
    setSending(true);

    // Optimistically add user's message locally so it appears in the chat immediately
    const tempMsg: Message = {
      id: `temp-${Date.now()}`,
      companyId: currentUser.companyId,
      senderId: currentUser.userId,
      senderName: currentUser.name,
      senderRole: currentUser.userRole,
      text: messageText,
      createdAt: new Date().toISOString(),
    };
    setMessages(prev => [...prev, tempMsg]);

    try {
      const res = await fetch('/api/admin/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: messageText }),
      });

      if (res.ok) {
        // Fetch full updated messages list including the database-generated auto-reply
        const freshRes = await fetch('/api/admin/support');
        if (freshRes.ok) {
          const freshJson = await freshRes.json();
          setMessages(freshJson);
        }
      }
    } catch (err) {
      console.error('Error sending support widget message:', err);
    } finally {
      setSending(false);
    }
  };

  // If user is not logged in or is the SUPERADMIN, we do not render the floating widget
  if (!currentUser || currentUser.userRole === 'SUPERADMIN') {
    return null;
  }

  // If the widget is completely closed (not visible), return nothing
  if (!visible) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans flex flex-col items-end">
      
      {/* 1. Minimized Round Icon Button */}
      {minimized ? (
        <button
          onClick={() => setMinimized(false)}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white flex items-center justify-center shadow-xl hover:shadow-2xl active:scale-[0.9] hover:scale-105 duration-200 transition-all cursor-pointer"
          title={t('common.support')}
        >
          <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            chat
          </span>
        </button>
      ) : (
        /* 2. Expanded Chat Dialog Popup Window */
        <div className="w-[360px] h-[480px] bg-white rounded-3xl border border-outline-variant/60 shadow-2xl flex flex-col overflow-hidden transition-all duration-300 transform scale-100 ease-out animate-scale-up">
          
          {/* Header */}
          <div className="bg-primary text-white px-md py-sm flex justify-between items-center shadow-md">
            <div className="flex items-center gap-xs">
              <span className="material-symbols-outlined text-[20px]">support_agent</span>
              <div className="flex flex-col">
                <span className="font-bold text-body-sm leading-none">{t('common.supportChatTitle')}</span>
                <span className="text-[10px] opacity-75 mt-[2px]">{t('common.chatWithUs')}</span>
              </div>
            </div>
            
            {/* Header Action Buttons */}
            <div className="flex items-center gap-2">
              {/* Minimize Button */}
              <button 
                onClick={() => setMinimized(true)}
                className="hover:bg-white/20 rounded-full p-1 transition-colors flex items-center justify-center cursor-pointer"
                title="Minimizar"
              >
                <span className="material-symbols-outlined text-[18px]">remove</span>
              </button>
              {/* Close Button */}
              <button 
                onClick={() => setVisible(false)}
                className="hover:bg-white/20 rounded-full p-1 transition-colors flex items-center justify-center cursor-pointer"
                title="Fechar"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
          </div>

          {/* Messages List Area */}
          <div className="flex-1 overflow-y-auto p-md space-y-sm bg-surface-container-lowest custom-scrollbar">
            {messages.length === 0 ? (
              <div className="text-center py-xl text-on-surface-variant font-medium text-body-xs">
                {t('common.noMessages')}
              </div>
            ) : (
              messages.map(msg => {
                const isOwnMessage = msg.senderRole !== 'SUPERADMIN';
                return (
                  <div 
                    key={msg.id}
                    className={`flex flex-col max-w-[80%] ${isOwnMessage ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                  >
                    <div className={`p-sm px-md rounded-2xl text-body-xs leading-relaxed shadow-sm ${isOwnMessage ? 'bg-primary text-white rounded-tr-none' : 'bg-surface-container-high text-on-surface rounded-tl-none'}`}>
                      <p className="font-semibold text-[9px] opacity-75 mb-[2px]">
                        {msg.senderName}
                      </p>
                      <p className="break-words whitespace-pre-wrap">{msg.text}</p>
                    </div>
                    <span className="text-[9px] text-on-surface-variant/75 mt-[2px] px-xs">
                      {new Date(msg.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Custom Input form with submit button outside input element, but with premium styling */}
          <form 
            onSubmit={handleSendMessage}
            className="p-md bg-surface-container-low border-t border-outline-variant/60 flex items-center gap-sm"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t('common.typeMessage')}
              className="flex-1 px-md py-sm rounded-xl border border-outline-variant/60 bg-surface-bright hover:bg-surface-container-high focus:bg-surface-bright focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-semibold text-body-sm text-on-surface"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || sending}
              className="w-10 h-10 bg-primary hover:bg-primary-dark disabled:opacity-50 text-white rounded-xl flex items-center justify-center transition-all active:scale-[0.93] cursor-pointer shadow shrink-0"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </form>

        </div>
      )}

      {/* Premium Spring Scale Up Animation */}
      <style>{`
        @keyframes scaleUp {
          from { transform: scale(0.35) translateY(45px); opacity: 0; }
          to { transform: scale(1) translateY(0); opacity: 1; }
        }
        .animate-scale-up {
          animation: scaleUp 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>

    </div>
  );
}
