'use client';

import React, { useEffect, useState } from 'react';
import { useI18n } from '@/locales/useI18n';

export const CurrentDate: React.FC = () => {
  const { locale } = useI18n();
  const [dateStr, setDateStr] = useState<string>('');

  useEffect(() => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    };
    
    const bcpLocale = locale === 'pt' ? 'pt-BR' : locale === 'en' ? 'en-US' : 'de-DE';
    
    // Obter data formatada
    const formatted = new Date().toLocaleDateString(bcpLocale, options);
    
    // Capitalizar primeira letra do dia da semana
    let capitalized = formatted.charAt(0).toUpperCase() + formatted.slice(1);
    
    // Limpar "sexta-feira" para apenas "Sexta" se houver hífen
    if (locale === 'pt' && capitalized.includes('-')) {
      const parts = capitalized.split('-');
      const weekday = parts[0];
      // Achar o resto da string que começa após o dia da semana completo
      // Exemplo: "Sexta-feira, 26 de junho" -> "Sexta, 26 de junho"
      const rest = capitalized.substring(capitalized.indexOf(','));
      capitalized = `${weekday}${rest}`;
    }
    
    setDateStr(capitalized);
  }, [locale]);

  return <>{dateStr}</>;
};
