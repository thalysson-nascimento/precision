import React from 'react';
import { cookies } from 'next/headers';
import { I18nProvider } from '../locales/useI18n';
import { Locale } from '../locales';
import './globals.css';

export const metadata = {
  title: 'Precision - Gestão de Ponto Inteligente',
  description: 'Simplifique o controle de jornada da sua equipe com segurança, multitenancy e conformidade legal.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get('precision_locale');
  const initialLocale = (localeCookie?.value || 'pt') as Locale;

  return (
    <html lang={initialLocale}>
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        
        {/* Material Symbols Outlined */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body className="antialiased bg-background text-on-surface font-sans">
        <I18nProvider initialLocale={initialLocale}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
