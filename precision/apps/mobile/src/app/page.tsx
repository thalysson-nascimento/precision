'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PunchCard } from '@/components/forms/PunchCard';
import { HistoryScreen } from '@/components/history/HistoryScreen';
import { ReportsScreen } from '@/components/reports/ReportsScreen';
import { ProfileScreen } from '@/components/profile/ProfileScreen';
import { useI18n } from '@/locales/useI18n';

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
  const { t } = useI18n();
  return (
    <main className="max-w-7xl mx-auto px-container-margin space-y-xl pb-28 pt-md">
      <Suspense fallback={
        <div className="text-center py-xl text-on-surface-variant font-semibold">
          {t('common.loading')}
        </div>
      }>
        <MainContent />
      </Suspense>
    </main>
  );
}
