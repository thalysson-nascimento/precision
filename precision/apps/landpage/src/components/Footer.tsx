import React from 'react';

interface FooterProps {
  t: (key: any) => string;
  scrollToSection: (e: React.MouseEvent<any>, id: string) => void;
}

export function Footer({ t, scrollToSection }: FooterProps) {
  return (
    <footer className="bg-background-dark text-white/60 py-16 text-body-sm border-t border-white/10 w-full">
      <div className="max-w-7xl mx-auto px-md md:px-lg flex flex-col md:flex-row justify-between items-start gap-xl pb-12 border-b border-white/5">
        
        {/* Brand Info Column */}
        <div className="space-y-sm w-full md:max-w-[300px] flex-shrink-0">
          <div className="flex items-center gap-xs">
            <img 
              src="/images/precision.png" 
              alt="Precision Logo" 
              className="w-10 h-10 object-contain" 
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            <span className="font-bold text-headline-lg text-white font-sans">Precision</span>
          </div>
          <p className="text-body-xs text-white/40 leading-relaxed">
            {t('landpage.footerDesc')}
          </p>
        </div>

        {/* Links and Contact Column Wrapper */}
        <div className="flex flex-wrap md:flex-nowrap gap-xl md:gap-2xl w-full justify-start md:justify-end">
          
          {/* Quick Links Column */}
          <div className="flex flex-col gap-sm min-w-[140px]">
            <span className="font-bold text-white uppercase text-[11px] tracking-wider">{t('landpage.footerNavTitle')}</span>
            <div className="flex flex-col gap-xs">
              <a href="#inicio" onClick={(e) => scrollToSection(e, 'inicio')} className="hover:text-white transition-colors py-[2px]">{t('landpage.footerNavHome')}</a>
              <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="hover:text-white transition-colors py-[2px]">{t('landpage.features')}</a>
              <a href="#reports" onClick={(e) => scrollToSection(e, 'reports')} className="hover:text-white transition-colors py-[2px]">{t('landpage.reports')}</a>
              <a href="#pricing" onClick={(e) => scrollToSection(e, 'pricing')} className="hover:text-white transition-colors py-[2px]">{t('landpage.footerNavPlans')}</a>
            </div>
          </div>

          {/* Legal Column */}
          <div className="flex flex-col gap-sm min-w-[140px]">
            <span className="font-bold text-white uppercase text-[11px] tracking-wider">Legal</span>
            <div className="flex flex-col gap-xs">
              <a href="/terms-of-use" className="hover:text-white transition-colors py-[2px]">{t('landpage.termsLink')}</a>
              <a href="/privacy-policy" className="hover:text-white transition-colors py-[2px]">{t('landpage.privacyLink')}</a>
            </div>
          </div>

          {/* Support/Info Column */}
          <div className="flex flex-col gap-sm min-w-[220px] whitespace-nowrap">
            <span className="font-bold text-white uppercase text-[11px] tracking-wider">{t('landpage.footerSupportTitle')}</span>
            <div className="flex flex-col gap-xs">
              <a href="mailto:precisionmanagement.hr@gmail.com" className="hover:text-white transition-colors flex items-center gap-xs py-[2px]">
                <span className="material-symbols-outlined text-[16px] text-white/50">mail</span>
                precisionmanagement.hr@gmail.com
              </a>
              <a href="tel:+551140030000" className="hover:text-white transition-colors flex items-center gap-xs py-[2px]">
                <span className="material-symbols-outlined text-[16px] text-white/50">call</span>
                {/* +55 (11) 4003-0000 */}
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* Copyright Sub-footer */}
      <div className="max-w-7xl mx-auto px-md md:px-lg pt-8 flex flex-col sm:flex-row justify-between items-center gap-md">
        <span>{t('landpage.footerCopyright')}</span>
        <span className="text-white/40 text-body-xs">{t('landpage.footerMadeWith')}</span>
      </div>
    </footer>
  );
}
