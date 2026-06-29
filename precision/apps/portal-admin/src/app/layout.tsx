import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { cookies } from 'next/headers';
import { I18nProvider } from '@/locales/useI18n';
import { Locale } from '@/locales';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Precision - Portal Administrativo",
  description: "Painel administrativo de controle de ponto da Precision",
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
        <link 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="bg-background text-on-surface min-h-screen">
        <I18nProvider initialLocale={locale}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
