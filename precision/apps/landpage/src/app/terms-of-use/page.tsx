'use client';

import React from 'react';
import { useI18n } from '@/locales/useI18n';
import { TermsOfUse } from '@precision/shared';

export default function TermsOfUsePage() {
  const { locale } = useI18n();
  return <TermsOfUse locale={locale} />;
}
