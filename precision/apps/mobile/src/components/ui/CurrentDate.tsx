'use client';

import React, { useEffect, useState } from 'react';

export const CurrentDate: React.FC = () => {
  const [dateStr, setDateStr] = useState<string>('Sexta, 26 de junho');

  useEffect(() => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    };
    
    // Obter data formatada
    const formatted = new Date().toLocaleDateString('pt-BR', options);
    
    // Capitalizar primeira letra do dia da semana
    let capitalized = formatted.charAt(0).toUpperCase() + formatted.slice(1);
    
    // Limpar "sexta-feira" para apenas "Sexta" se houver hífen
    if (capitalized.includes('-')) {
      const parts = capitalized.split('-');
      const weekday = parts[0];
      // Achar o resto da string que começa após o dia da semana completo
      // Exemplo: "Sexta-feira, 26 de junho" -> "Sexta, 26 de junho"
      const rest = capitalized.substring(capitalized.indexOf(','));
      capitalized = `${weekday}${rest}`;
    }
    
    setTimeout(() => {
      setDateStr(capitalized);
    }, 0);
  }, []);

  return <>{dateStr}</>;
};
