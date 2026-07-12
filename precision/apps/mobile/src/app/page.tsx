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
    return (
      <main className="w-full max-w-7xl mx-auto px-container-margin space-y-xl pb-28 pt-md">
        <HistoryScreen />
      </main>
    );
  }

  if (currentTab === 'relatorios') {
    return (
      <main className="w-full max-w-7xl mx-auto px-container-margin space-y-xl pb-28 pt-md">
        <ReportsScreen />
      </main>
    );
  }

  if (currentTab === 'perfil') {
    return (
      <main className="w-full max-w-7xl mx-auto px-container-margin space-y-xl pb-28 pt-md">
        <ProfileScreen />
      </main>
    );
  }

  // Home (tab === 'inicio') -> edge-to-edge layout, no container padding/margin-top
  return (
    <main className="w-full max-w-7xl mx-auto pb-28">
      <PunchCard />
    </main>
  );
}

export default function Home() {
  const { t } = useI18n();
  return (
    <Suspense fallback={
      <div className="text-center py-xl text-on-surface-variant font-semibold">
        {t('common.loading')}
      </div>
    }>
      <MainContent />
    </Suspense>
  );
}
