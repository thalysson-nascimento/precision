'use client';

import React from 'react';

interface LoginBannerProps {
  t: (key: any) => string;
}

export const LoginBanner: React.FC<LoginBannerProps> = ({ t }) => {
  return (
    <div
      className="hidden lg:flex p-12 relative flex-col justify-between overflow-hidden rounded-[2.5rem] bg-cover bg-center select-none shadow-inner"
      style={{ backgroundImage: "url('/images/login_blue_bg.png')", flex: '1 1 50%', minWidth: '0' }}
    >
      {/* Light overlay to enhance text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/40 to-slate-950/40 -z-10" />

      {/* Top Branding and Description */}
      <div className="space-y-8 text-white z-10 w-full">
        <div className="space-y-4">
          <img
            src="/images/precision.png"
            alt="Precision Logo"
            className="w-[72px] h-[72px] object-contain transition-transform hover:scale-105 duration-300"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
          <h2 className="text-xl font-bold tracking-wider font-sans text-white/90">
            Precision
          </h2>
        </div>

        <div className="space-y-3 w-full" style={{ maxWidth: '420px' }}>
          <h3 className="text-3xl font-extrabold tracking-tight leading-tight">
            {t('auth.welcomeTitle')}
          </h3>
          <p className="text-white/70 text-body-lg leading-relaxed font-light">
            {t('auth.welcomeDesc')}
          </p>
        </div>

        <p className="text-white/50 text-body-xs font-medium tracking-wide">
          Inicie a gestão eficiente da jornada de trabalho da sua equipe.
        </p>
      </div>

      {/* CSS/SVG Notched Box at the bottom */}
      <div className="relative p-6 min-h-[160px] flex flex-col justify-center mt-12 w-full text-white z-10">
        {/* Notched Background SVG */}
        <svg
          className="absolute inset-0 w-full h-full -z-10 text-white/[0.08]"
          viewBox="0 0 400 200"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path
            d="M 0 24 A 24 24 0 0 1 24 0 L 236 0 A 24 24 0 0 1 260 24 L 260 36 A 24 24 0 0 0 284 60 L 376 60 A 24 24 0 0 1 400 84 L 400 176 A 24 24 0 0 1 376 200 L 24 200 A 24 24 0 0 1 0 176 Z"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="2"
          />
        </svg>

        {/* Content Layout inside Notch Card */}
        <div className="grid grid-cols-12 gap-2 items-center h-full">
          <div className="col-span-8 pr-2">
            <h4 className="font-bold text-[17px] tracking-tight text-white mb-1">
              {t('auth.cardFeatureTitle')}
            </h4>
            <p className="text-white/70 text-[13px] leading-relaxed font-light">
              {t('auth.cardFeatureDesc')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
