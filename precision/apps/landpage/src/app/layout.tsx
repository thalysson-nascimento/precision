import { cookies } from 'next/headers';
import React from 'react';
import { Locale } from '../locales';
import { I18nProvider } from '../locales/useI18n';
import './globals.css';

export async function generateMetadata() {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get('precision_locale');
  const locale = (localeCookie?.value || 'pt') as Locale;

  const seoData = {
    pt: {
      title: 'Precision | Gestão de Ponto Inteligente',
      description: 'Simplifique o controle de ponto eletrônico e a gestão de jornada da sua equipe. Precision oferece segurança, relatórios e facilidade de uso.',
      keywords: [
        'controle de ponto',
        'ponto eletrônico',
        'gestão de ponto',
        'registro de ponto',
        'ponto inteligente',
        'recursos humanos',
        'RH'
      ],
    },
    en: {
      title: 'Precision | Smart Time Tracking',
      description: 'Simplify employee time tracking and timesheet management. Precision offers security, reporting, and ease of use.',
      keywords: [
        'time tracking',
        'punch clock',
        'employee hours',
        'timesheet management',
        'smart time tracking',
        'human resources',
        'HR'
      ],
    },
    de: {
      title: 'Precision | Intelligente Zeiterfassung',
      description: 'Vereinfachen Sie die Arbeitszeiterfassung und Dienstplanverwaltung Ihres Teams. Precision bietet Sicherheit, Berichte und Benutzerfreundlichkeit.',
      keywords: [
        'zeiterfassung',
        'stempeluhr',
        'arbeitszeit',
        'dienstplanverwaltung',
        'intelligente zeiterfassung',
        'personalwesen',
        'HR'
      ],
    }
  };

  const selected = seoData[locale] || seoData.pt;

  return {
    title: selected.title,
    description: selected.description,
    keywords: selected.keywords,
    authors: [{ name: 'Precision Team' }],
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: 'website',
      locale: locale === 'pt' ? 'pt_BR' : locale === 'en' ? 'en_US' : 'de_DE',
      url: 'https://precision.com.br',
      title: selected.title,
      description: selected.description,
      siteName: 'Precision',
    },
    twitter: {
      card: 'summary_large_image',
      title: selected.title,
      description: selected.description,
    },
    icons: {
      icon: '/favicon.ico',
    }
  };
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
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
