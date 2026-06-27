'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PunchCard } from '@/components/forms/PunchCard';
import { HistoryScreen } from '@/components/history/HistoryScreen';
import { ReportsScreen } from '@/components/reports/ReportsScreen';
import { ProfileScreen } from '@/components/profile/ProfileScreen';

function MainContent() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'inicio';

  if (currentTab === 'historico') {
    return <HistoryScreen />;
  }

  if (currentTab === 'relatorios') {
    return <ReportsScreen />;
  }

  if (currentTab === 'perfil') {
    return <ProfileScreen />;
  }

  return <PunchCard />;
}

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-container-margin space-y-xl pb-4 pt-md">
      <Suspense fallback={
        <div className="text-center py-xl text-on-surface-variant font-semibold">
          Carregando...
        </div>
      }>
        <MainContent />
      </Suspense>
    </main>
  );
}
