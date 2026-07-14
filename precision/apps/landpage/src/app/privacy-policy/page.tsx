'use client';

import React from 'react';
import { useI18n } from '@/locales/useI18n';
import { PrivacyPolicy } from '@precision/shared';

export default function PrivacyPolicyPage() {
  const { locale } = useI18n();
  return <PrivacyPolicy locale={locale} />;
}
