import { BottomNav } from "@/components/layout/BottomNav";
import { Header } from "@/components/layout/Header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from 'react';
import "./globals.css";

import { Locale } from '@/locales';
import { I18nProvider } from '@/locales/useI18n';
import { cookies } from 'next/headers';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Precision - Registro de Horas",
  description: "Sistema moderno para registro e controle de ponto de funcionários",
  icons: {
    icon: '/favicon.ico',
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('precision_locale')?.value || 'pt') as Locale;

  return (
    <html lang={locale} className={inter.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="bg-background text-on-surface min-h-screen">
        <I18nProvider initialLocale={locale}>
          <Suspense fallback={null}>
            <Header />
          </Suspense>
          {children}
          <Suspense fallback={null}>
            <BottomNav />
          </Suspense>
        </I18nProvider>
      </body>
    </html>
  );
}
