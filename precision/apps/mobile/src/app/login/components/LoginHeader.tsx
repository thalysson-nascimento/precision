import React from 'react';
import { useI18n } from '@/locales/useI18n';

export const LoginHeader: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="login-header flex flex-col items-center justify-center text-center mb-[64px] relative z-10 w-full">
      <div className="login-header__logo-wrapper flex items-center gap-x-sm">
        <img
          alt="Precision Logo"
          className="login-header__logo w-10 h-auto object-contain"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAw600BN7q5ivLGkOrovv6d6A3taP3DE9GAfRfG6LZ7UYcXu_S-BaqgKSMAI8A8XAXKTRaU1qjau5-ngW9ghugWjZgK1Tnwfw2f2qVm9SMQY-VcK6AUTCUq6ehJKm_xkxBmKpVxzCFjgXAoUdoeku1ESq3Y7-pK9LHe29eLJeSt6vGDMOjrqVELidhE0nZ3sxlBb3dCZCVTK7ehgyOXMhwWFzzvpnrUljot15vo57VYgaNCp-DFrz08jTEbQ58OWdJNw"
        />
        <span className="login-header__app-name font-headline-lg text-headline-lg font-bold text-primary">
          {t('auth.title')}
        </span>
      </div>
    </div>
  );
};
