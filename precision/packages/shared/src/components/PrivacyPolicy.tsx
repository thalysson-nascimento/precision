'use client';

import React, { useState, useEffect } from 'react';

interface PrivacyPolicyProps {
  locale: 'pt' | 'en' | 'de';
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ locale }) => {
  const [activeSection, setActiveSection] = useState<string>('intro');

  const content = {
    pt: {
      title: 'Política de Privacidade Global',
      lastUpdated: 'Última atualização: 14 de Julho de 2026',
      introText: 'A Precision Technologies valoriza a privacidade e a segurança dos dados dos seus usuários. Esta Política de Privacidade explica como coletamos, usamos, armazenamos e protegemos os seus dados ao utilizar nossa plataforma SaaS de controle de ponto.',
      sections: [
        {
          id: 'intro',
          title: '1. Introdução e Escopo',
          text: 'Esta Política aplica-se a todos os usuários da Precision, incluindo Administradores de Empresas, Gestores, Líderes de Equipe e Colaboradores. A Precision atua como Operadora de Dados (Data Processor) sob a LGPD e GDPR, processando dados pessoais em nome e sob as instruções da empresa empregadora, que é a Controladora de Dados (Data Controller).'
        },
        {
          id: 'data-collection',
          title: '2. Dados Coletados',
          text: 'Coletamos e processamos os seguintes dados para viabilizar o serviço:\n• Informações de Cadastro: Nome completo, endereço de e-mail corporativo, telefone, cargo, equipe e empresa vinculada.\n• Dados de Registro de Ponto: Horários de entrada, início/fim de almoço, saída, justificativas de ajustes e assinatura digital.\n• Geolocalização: Coordenadas geográficas (latitude e longitude) coletadas no momento exato do registro de ponto.\n• Informações de Rede: Endereços IP utilizados para validar se o registro foi efetuado a partir de uma rede autorizada.'
        },
        {
          id: 'purpose',
          title: '3. Finalidade do Processamento',
          text: 'Os dados coletados são tratados estritamente para as seguintes finalidades:\n• Validação de Localização e IP: Assegurar que os registros de ponto sejam feitos em conformidade com as regras geográficas e de rede da empresa.\n• Relatórios e Auditorias: Permitir a geração e exportação de relatórios de horas trabalhadas, horas extras e saldos mensais para conformidade trabalhista.\n• Segurança e Autenticação: Prevenir fraudes, marcações indevidas e garantir a segurança do acesso das contas.\n\nIMPORTANTE: A geolocalização NÃO é rastreada em tempo real ou em segundo plano. Os dados de localização geográfica são coletados unicamente e no exato instante em que o colaborador clica para registrar o ponto.'
        },
        {
          id: 'sharing',
          title: '4. Compartilhamento e Transferência',
          text: 'Não vendemos ou alugamos dados pessoais para terceiros. O compartilhamento ocorre apenas com:\n• A empresa empregadora (Controladora de Dados), que tem acesso integral aos registros e relatórios dos seus colaboradores.\n• Provedores de infraestrutura de nuvem contratados sob estritos termos de confidencialidade (ex: hospedagem segura em servidores em conformidade com ISO/IEC 27001).\n• Autoridades legais quando exigido por lei ou ordem judicial.'
        },
        {
          id: 'rights',
          title: '5. Direitos do Usuário (LGPD & GDPR)',
          text: 'Independentemente do seu país de origem, garantimos o cumprimento dos seus direitos fundamentais:\n• LGPD (Brasil): Confirmação da existência de tratamento, acesso aos dados, correção de dados incompletos/inexatos e anonimização/bloqueio.\n• GDPR (Europa): Direito de acesso, retificação, exclusão (direito ao esquecimento), restrição de processamento e portabilidade de dados.\n\nComo a Precision atua como operadora, qualquer solicitação de exclusão ou alteração de histórico de ponto deve ser direcionada ao departamento de RH da sua empresa (Controladora dos Dados).'
        },
        {
          id: 'security',
          title: '6. Segurança e Armazenamento',
          text: 'Implementamos medidas técnicas e organizacionais avançadas para proteger seus dados, tais como criptografia de ponta a ponta (HTTPS), senhas com hash seguro no banco de dados e controle rigoroso de acessos administrativos. Mantemos os registros pelo tempo determinado pela empresa empregadora em conformidade com os prazos legais de prescrição trabalhista do país aplicável.'
        },
        {
          id: 'changes',
          title: '7. Alterações e Contato',
          text: 'Podemos atualizar esta política de tempos em tempos para refletir mudanças regulatórias ou nas nossas funcionalidades. Notificaremos os usuários sobre mudanças significativas através do portal ou do aplicativo. Para dúvidas sobre esta política, entre em contato via e-mail: privacidade@precision.com.'
        }
      ]
    },
    en: {
      title: 'Global Privacy Policy',
      lastUpdated: 'Last updated: July 14, 2026',
      introText: 'Precision Technologies values your privacy and data security. This Privacy Policy explains how we collect, use, store, and protect your data when you use our SaaS time tracking platform.',
      sections: [
        {
          id: 'intro',
          title: '1. Introduction and Scope',
          text: 'This Policy applies to all users of Precision, including Company Administrators, Managers, Team Leaders, and Employees. Precision acts as a Data Processor under LGPD and GDPR, processing personal data on behalf of and under the instructions of the employer company, which acts as the Data Controller.'
        },
        {
          id: 'data-collection',
          title: '2. Collected Data',
          text: 'We collect and process the following data to provide the service:\n• Registration Information: Full name, corporate email address, telephone, job role, team, and linked company.\n• Time Log Data: Clock-in/out times, lunch break start/end, adjustments justifications, and digital signatures.\n• Geolocation: Geographic coordinates (latitude and longitude) captured at the exact moment of clocking in/out.\n• Network Information: IP addresses used to validate whether the clock-in was made from an authorized network.'
        },
        {
          id: 'purpose',
          title: '3. Purpose of Processing',
          text: 'The collected data is processed strictly for the following purposes:\n• Geolocation and IP Validation: Ensure that clock-in records comply with company-defined geographic and network boundaries.\n• Reports and Auditing: Allow generation and exportation of worked hours, overtime, and monthly balances for labor compliance.\n• Security and Authentication: Prevent fraud, unauthorized clock-ins, and secure account access.\n\nIMPORTANT: Geolocation is NOT tracked in real-time or in the background. Geolocation data is captured uniquely and solely at the exact instant the employee clicks to clock in/out.'
        },
        {
          id: 'sharing',
          title: '4. Sharing and Transfers',
          text: 'We do not sell or rent personal data to third parties. Data sharing occurs only with:\n• The employer company (Data Controller), which has full access to their employees’ records and reports.\n• Cloud infrastructure providers contracted under strict confidentiality terms (e.g., secure hosting on ISO/IEC 27001 compliant servers).\n• Legal authorities when required by law or court order.'
        },
        {
          id: 'rights',
          title: '5. User Rights (GDPR & LGPD)',
          text: 'Regardless of your country of residence, we guarantee compliance with your fundamental privacy rights:\n• GDPR (Europe): Right of access, rectification, erasure (right to be forgotten), restriction of processing, and data portability.\n• LGPD (Brazil): Confirmation of processing, access to data, correction of incomplete/inaccurate data, and anonymization/blocking.\n\nSince Precision acts as a data processor, any requests for erasure or modification of time logs must be directed to your company\'s HR department (the Data Controller).'
        },
        {
          id: 'security',
          title: '6. Security and Storage',
          text: 'We implement advanced technical and organizational measures to protect your data, including end-to-end encryption (HTTPS), secure password hashing, and restricted administrative accesses. We retain records for the duration specified by the employer company in compliance with local labor and statutory limitation periods.'
        },
        {
          id: 'changes',
          title: '7. Changes and Contact',
          text: 'We may update this policy from time to time to reflect regulatory changes or modifications in our features. We will notify users of significant changes via the portal or mobile application. For inquiries regarding this policy, contact us via email: privacy@precision.com.'
        }
      ]
    },
    de: {
      title: 'Globale Datenschutzerklärung',
      lastUpdated: 'Zuletzt aktualisiert: 14. Juli 2026',
      introText: 'Precision Technologies legt großen Wert auf Ihre Privatsphäre und Datensicherheit. Diese Datenschutzerklärung erklärt, wie wir Ihre Daten erfassen, verwenden, speichern und schützen, wenn Sie unsere SaaS-Zeiterfassungsplattform nutzen.',
      sections: [
        {
          id: 'intro',
          title: '1. Einführung und Geltungsbereich',
          text: 'Diese Richtlinie gilt für alle Nutzer von Precision, einschließlich Unternehmensadministratoren, Managern, Teamleitern und Mitarbeitern. Precision fungiert als Auftragsverarbeiter (Data Processor) gemäß DSGVO und LGPD und verarbeitet personenbezogene Daten im Auftrag und auf Anweisung des Arbeitgeberunternehmens, das als Verantwortlicher (Data Controller) agiert.'
        },
        {
          id: 'data-collection',
          title: '2. Erfasste Daten',
          text: 'Wir erfassen und verarbeiten die folgenden Daten, um den Dienst bereitzustellen:\n• Registrierungsinformationen: Vollständiger Name, geschäftliche E-Mail-Adresse, Telefonnummer, Rolle, Team und verknüpftes Unternehmen.\n• Zeiterfassungsdaten: Kommen-/Gehen-Zeiten, Pausenbeginn/-ende, Begründungen für manuelle Anpassungen und digitale Signaturen.\n• Geolokalisierung: Geografische Koordinaten (Breiten- und Längengrad), die im genauen Moment des Stempelns erfasst werden.\n• Netzwerkinformationen: IP-Adressen zur Validierung, ob das Stempeln aus einem autorisierten Netzwerk erfolgt ist.'
        },
        {
          id: 'purpose',
          title: '3. Zweck der Verarbeitung',
          text: 'Die erfassten Daten werden ausschließlich für folgende Zwecke verarbeitet:\n• Geolokalisierung und IP-Validierung: Sicherstellen, dass Zeiterfassungen mit den vom Unternehmen definierten geografischen und netzwerkbasierten Grenzen übereinstimmen.\n• Berichte und Prüfungen: Ermöglichen der Erstellung und des Exports von Berichten über Arbeitsstunden, Überstunden und Monatssalden zur Einhaltung arbeitsrechtlicher Vorschriften.\n• Sicherheit und Authentifizierung: Betrugsbekämpfung, Verhinderung unbefugten Stempelns und Sicherung des Kontozugriffs.\n\nWICHTIG: Die Geolokalisierung wird NICHT in Echtzeit oder im Hintergrund verfolgt. Standortdaten werden ausschließlich in dem Moment erfasst, in dem der Mitarbeiter auf Stempeln klickt.'
        },
        {
          id: 'sharing',
          title: '4. Weitergabe und Übertragung',
          text: 'Wir verkaufen oder vermieten keine personenbezogenen Daten an Dritte. Die Weitergabe erfolgt nur an:\n• Das Arbeitgeberunternehmen (Verantwortlicher), das vollen Zugriff auf die Aufzeichnungen und Berichte seiner Mitarbeiter hat.\n• Cloud-Infrastrukturanbieter, die unter strengen Vertraulichkeitsbedingungen vertraglich gebunden sind (z. B. sicheres Hosting auf Servern, die ISO/IEC 27001 entsprechen).\n• Gesetzliche Behörden, wenn dies gesetzlich oder durch eine gerichtliche Anordnung erforderlich ist.'
        },
        {
          id: 'rights',
          title: '5. Nutzerrechte (DSGVO & LGPD)',
          text: 'Unabhängig von Ihrem Wohnsitzland garantieren wir die Einhaltung Ihrer grundlegenden Datenschutzrechte:\n• DSGVO (Europa): Recht auf Auskunft, Berichtigung, Löschung (Recht auf Vergessenwerden), Einschränkung der Verarbeitung und Datenübertragbarkeit.\n• LGPD (Brasilien): Bestätigung der Verarbeitung, Auskunft über Daten, Berichtigung unvollständiger/unrichtiger Daten und Anonymisierung/Sperrung.\n\nDa Precision als Auftragsverarbeiter agiert, müssen Anträge auf Löschung oder Änderung von Arbeitszeitprotokollen an die Personalabteilung Ihres Unternehmens (den Verantwortlichen) gerichtet werden.'
        },
        {
          id: 'security',
          title: '6. Sicherheit und Speicherung',
          text: 'Wir implementieren fortschrittliche technische und organisatorische Maßnahmen zum Schutz Ihrer Daten, einschließlich Ende-zu-Ende-Verschlüsselung (HTTPS), sicheres Passwort-Hashing und restriktive administrative Zugriffsrechte. Wir bewahren Aufzeichnungen für die vom Arbeitgeber festgelegte Dauer in Übereinstimmung mit den lokalen arbeitsrechtlichen Verjährungsfristen auf.'
        },
        {
          id: 'changes',
          title: '7. Änderungen und Kontakt',
          text: 'Wir können diese Richtlinie von Zeit zu Zeit aktualisieren, um regulatorische Änderungen oder Anpassungen unserer Funktionen widerzuspiegeln. Wir werden Nutzer über wesentliche Änderungen über das Portal oder die mobile Anwendung benachrichtigen. Bei Fragen zu dieser Richtlinie kontaktieren Sie uns per E-Mail: datenschutz@precision.com.'
        }
      ]
    }
  };

  const activeContent = content[locale] || content['pt'];

  const handleIndexClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50/50 py-12 px-container-margin md:px-lg text-slate-800">
      <div className="max-w-6xl mx-auto space-y-xl">
        
        {/* Header */}
        <div className="text-center md:text-left space-y-xs pb-lg border-b border-slate-200">
          <h1 className="text-headline-lg md:text-[36px] font-black text-slate-900 tracking-tight">
            {activeContent.title}
          </h1>
          <p className="text-body-sm text-slate-500 font-semibold">
            {activeContent.lastUpdated}
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-white border border-slate-200 rounded-2xl p-md md:p-lg shadow-sm">
          <p className="text-body-md text-slate-600 leading-relaxed font-medium">
            {activeContent.introText}
          </p>
        </div>

        {/* Sidebar + Main Content layout */}
        <div className="flex flex-col lg:flex-row gap-lg items-start">
          
          {/* Sticky Table of Contents (Index) */}
          <aside className="w-full lg:w-1/4 sticky top-24 bg-white border border-slate-200 rounded-2xl p-md shadow-sm space-y-sm flex-shrink-0">
            <span className="font-bold text-slate-400 text-[10px] uppercase tracking-wider block border-b border-slate-100 pb-xs">
              {locale === 'pt' ? 'Tópicos' : locale === 'de' ? 'Inhalte' : 'Topics'}
            </span>
            <nav className="flex flex-col gap-xs">
              {activeContent.sections.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  onClick={(e) => handleIndexClick(e, sec.id)}
                  className={`text-body-sm font-semibold py-xs px-sm rounded-lg transition-all ${
                    activeSection === sec.id
                      ? 'bg-[#0052cc]/10 text-[#0052cc]'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                  }`}
                >
                  {sec.title.split('. ')[1] || sec.title}
                </a>
              ))}
            </nav>
          </aside>

          {/* Main content body */}
          <div className="flex-1 w-full space-y-lg">
            {activeContent.sections.map((sec) => (
              <section 
                key={sec.id} 
                id={sec.id}
                className={`bg-white border rounded-2xl p-md md:p-lg shadow-sm transition-all duration-300 ${
                  activeSection === sec.id
                    ? 'border-[#0052cc]/50 shadow-md ring-4 ring-[#0052cc]/5'
                    : 'border-slate-200'
                }`}
              >
                <h3 className="text-headline-md font-bold text-slate-900 border-b border-slate-100 pb-sm mb-md flex items-center gap-xs">
                  <span className="w-2 h-5 bg-[#0052cc] rounded-full inline-block"></span>
                  {sec.title}
                </h3>
                <p className="text-body-sm text-slate-600 leading-relaxed whitespace-pre-line font-medium">
                  {sec.text}
                </p>
              </section>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};
