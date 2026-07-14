'use client';

import React, { useState } from 'react';

interface TermsOfUseProps {
  locale: 'pt' | 'en' | 'de';
}

export const TermsOfUse: React.FC<TermsOfUseProps> = ({ locale }) => {
  const [activeSection, setActiveSection] = useState<string>('acceptance');

  const content = {
    pt: {
      title: 'Termos de Uso Globais',
      lastUpdated: 'Última atualização: 14 de Julho de 2026',
      introText: 'Bem-vindo à Precision. Estes Termos de Uso regem o acesso e a utilização da nossa plataforma SaaS de controle de ponto. Ao acessar ou usar nosso sistema, você concorda com as condições aqui estabelecidas.',
      sections: [
        {
          id: 'acceptance',
          title: '1. Aceitação e Elegibilidade',
          text: 'Ao criar uma conta ou utilizar os serviços da Precision, você declara ter capacidade legal para contratar e compromete-se a cumprir todas as regras contidas neste documento. O uso é condicionado à autorização pela sua empresa empregadora.'
        },
        {
          id: 'description',
          title: '2. Descrição do Serviço',
          text: 'A Precision disponibiliza uma plataforma baseada em nuvem para gerenciamento, registro e controle de ponto de colaboradores. O serviço inclui um painel web para administradores e um aplicativo móvel/portal simplificado para o registro diário por colaboradores.'
        },
        {
          id: 'accounts',
          title: '3. Cadastro e Segurança das Contas',
          text: 'Você é responsável por manter a confidencialidade das credenciais de acesso (e-mail e senha) e por todas as atividades que ocorram na sua conta. Caso identifique qualquer uso não autorizado, deve notificar imediatamente o administrador da sua empresa ou o nosso suporte.'
        },
        {
          id: 'acceptable-use',
          title: '4. Uso Aceitável e Antifraude',
          text: 'Você concorda em utilizar o sistema apenas de acordo com a legislação aplicável e de boa-fé. \n\nIMPORTANTE (TRAVA ANTIFRAUDE E REGULARIDADE):\n• É estritamente proibido falsificar coordenadas de geolocalização por meio de aplicativos simuladores (GPS spoofing), proxies ou VPNs corporativas para alterar a localização real no momento do ponto.\n• As tentativas de simular, alterar ou burlar o horário local e os dados de rede para forjar marcações de ponto serão consideradas violações graves de conduta de uso. Tais atos serão registrados em logs e reportados imediatamente à empresa empregadora (Controladora dos Dados), sujeitando o usuário às penalidades administrativas e disciplinares previstas na legislação trabalhista local.'
        },
        {
          id: 'subscriptions',
          title: '5. Planos, Assinaturas e Cancelamento',
          text: 'O acesso da empresa empregadora depende da contratação e manutenção de uma assinatura válida (Trimestral, Semestral ou período experimental/trial). Em caso de inadimplência ou encerramento do prazo contratual, a Precision reserva-se o direito de bloquear temporariamente os acessos e registros de ponto de todos os colaboradores associados à empresa até a regularização do plano.'
        },
        {
          id: 'intellectual-property',
          title: '6. Propriedade Intelectual',
          text: 'Todos os direitos autorais, patentes, marcas comerciais, códigos-fonte, designs e demais propriedades intelectuais relacionados à plataforma Precision pertencem exclusivamente à Precision Technologies. Nenhuma parte deste sistema pode ser copiada, reproduzida ou modificada sem autorização prévia por escrito.'
        },
        {
          id: 'liability',
          title: '7. Limitação de Responsabilidade Trabalhista',
          text: 'ISENÇÃO DE RESPONSABILIDADE TRABALHISTA E LEGAL:\n• A Precision é uma ferramenta tecnológica de processamento de registros de frequência. A conformidade trabalhista geral, as regras de cálculo de horas adicionais, a correta aplicação dos acordos coletivos e a regularidade de escalas e banco de horas são de responsabilidade única e exclusiva da empresa empregadora (Controladora dos Dados).\n• A Precision não será responsabilizada em hipótese alguma por quaisquer disputas legais, reclamações trabalhistas, processos judiciais ou prejuízos financeiros decorrentes do relacionamento trabalhista entre o empregador e o colaborador.'
        },
        {
          id: 'termination',
          title: '8. Rescisão de Acesso',
          text: 'Podemos suspender ou encerrar seu acesso à plataforma imediatamente em caso de descumprimento destes Termos, violação de segurança do sistema, suspeita de fraude reiterada ou solicitação da empresa contratante da assinatura.'
        },
        {
          id: 'jurisdiction',
          title: '9. Legislação e Foro',
          text: 'Estes Termos são regidos pelas leis da República Federativa do Brasil para transações e acessos originados no Brasil. Para conflitos internacionais envolvendo usuários fora do território brasileiro, as partes tentarão resolução amigável antes de recorrer a arbitragens ou jurisdições locais.'
        }
      ]
    },
    en: {
      title: 'Global Terms of Use',
      lastUpdated: 'Last updated: July 14, 2026',
      introText: 'Welcome to Precision. These Terms of Use govern your access and utilization of our SaaS time tracking platform. By accessing or using our system, you agree to comply with the terms set forth herein.',
      sections: [
        {
          id: 'acceptance',
          title: '1. Acceptance and Eligibility',
          text: 'By creating an account or using Precision services, you declare you have legal capacity and agree to comply with all rules in this document. Access is conditioned on authorization by your employer company.'
        },
        {
          id: 'description',
          title: '2. Description of Service',
          text: 'Precision provides a cloud-based platform for shift management and employee time tracking. The service includes a web dashboard for administrators and a simplified mobile app/portal for daily clock-ins by employees.'
        },
        {
          id: 'accounts',
          title: '3. Registration and Account Security',
          text: 'You are responsible for maintaining the confidentiality of your credentials (email and password) and for all activities that occur under your account. If you identify any unauthorized use, notify your company administrator or our support team immediately.'
        },
        {
          id: 'acceptable-use',
          title: '4. Acceptable Use and Anti-Fraud',
          text: 'You agree to use the system only in accordance with applicable laws and in good faith. \n\nIMPORTANT (ANTI-FRAUD AND COMPLIANCE RULES):\n• It is strictly prohibited to forge geolocation coordinates using simulator apps (GPS spoofing), proxies, or corporate VPNs to alter your actual location when clocking in.\n• Any attempts to simulate, alter, or bypass local time and network data to forge time log entries will be considered severe violations of use. Such acts will be logged and reported immediately to your employer company (Data Controller), subject to administrative and disciplinary penalties under local labor laws.'
        },
        {
          id: 'subscriptions',
          title: '5. Plans, Subscriptions, and Cancellation',
          text: 'The employer company’s access depends on contracting and maintaining a valid subscription (Quarterly, Bi-annual, or a free trial period). In case of payment failure or expiration of the subscription, Precision reserves the right to temporarily block access and clock-in records for all linked employees until the plan is regularized.'
        },
        {
          id: 'intellectual-property',
          title: '6. Intellectual Property',
          text: 'All copyrights, patents, trademarks, source code, designs, and other intellectual property rights related to the Precision platform belong exclusively to Precision Technologies. No part of this system may be copied, reproduced, or modified without prior written consent.'
        },
        {
          id: 'liability',
          title: '7. Limitation of Labor and Legal Liability',
          text: 'DISCLAIMER OF LABOR AND LEGAL LIABILITY:\n• Precision is a technological tool for processing attendance logs. Overall labor compliance, overtime hours calculations, correct application of collective bargaining agreements, and validity of shifts and hour banks are the sole and exclusive responsibility of the employer company (Data Controller).\n• Precision shall in no event be held liable for any legal disputes, labor claims, lawsuits, or financial losses arising from the employment relationship between the employer and the employee.'
        },
        {
          id: 'termination',
          title: '8. Termination of Access',
          text: 'We may suspend or terminate your access to the platform immediately in case of breach of these Terms, security violations, suspected repeated fraud, or upon request from the company holding the subscription.'
        },
        {
          id: 'jurisdiction',
          title: '9. Governing Law and Jurisdiction',
          text: 'These Terms are governed by the laws of the Federative Republic of Brazil for accesses originating in Brazil. For international disputes involving users outside Brazil, the parties will seek amicable resolution before resorting to arbitration or local court jurisdictions.'
        }
      ]
    },
    de: {
      title: 'Globale Nutzungsbedingungen',
      lastUpdated: 'Zuletzt aktualisiert: 14. Juli 2026',
      introText: 'Willkommen bei Precision. Diese Nutzungsbedingungen regeln Ihren Zugriff auf unsere SaaS-Zeiterfassungsplattform und deren Nutzung. Durch den Zugriff auf unser System erklären Sie sich mit den hierin festgelegten Bedingungen einverstanden.',
      sections: [
        {
          id: 'acceptance',
          title: '1. Annahme und Berechtigung',
          text: 'Durch die Erstellung eines Kontos oder die Nutzung von Precision-Diensten erklären Sie, dass Sie geschäftsfähig sind und verpflichten sich, alle Regeln in diesem Dokument einzuhalten. Der Zugang ist an die Autorisierung durch Ihr Arbeitgeberunternehmen gebunden.'
        },
        {
          id: 'description',
          title: '2. Beschreibung des Dienstes',
          text: 'Precision stellt eine cloudbasierte Plattform für das Schichtmanagement und die Mitarbeiterzeiterfassung bereit. Der Dienst umfasst ein Web-Dashboard für Administratoren und eine vereinfachte mobile App/ein Portal für tägliche Buchungen durch Mitarbeiter.'
        },
        {
          id: 'accounts',
          title: '3. Registrierung und Kontosicherheit',
          text: 'Sie sind dafür verantwortlich, die Vertraulichkeit Ihrer Zugangsdaten (E-Mail und Passwort) zu wahren und für alle Aktivitäten, die unter Ihrem Konto stattfinden. Wenn Sie eine unbefugte Nutzung feststellen, benachrichtigen Sie unverzüglich Ihren Unternehmensadministrator oder unseren Support.'
        },
        {
          id: 'acceptable-use',
          title: '4. Zulässige Nutzung und Betrugsbekämpfung',
          text: 'Sie verpflichten sich, das System nur in Übereinstimmung mit den geltenden Gesetzen und in gutem Glauben zu nutzen. \n\nWICHTIG (BETRUGSBEKÄMPFUNG UND REGELN ZUR EINHALTUNG):\n• Es ist strengstens verboten, Geolokalisierungskoordinaten mithilfe von Simulator-Apps (GPS-Spoofing), Proxys oder Unternehmens-VPNs zu fälschen, um Ihren tatsächlichen Standort beim Stempeln zu ändern.\n• Alle Versuche, die Ortszeit und Netzwerkdaten zu simulieren, zu ändern oder zu umgehen, um Zeiterfassungseinträge zu fälschen, gelten als schwerwiegende Nutzungsverstöße. Solche Handlungen werden protokolliert und unverzüglich Ihrem Arbeitgeberunternehmen (Verantwortlicher) gemeldet und können arbeitsrechtliche Sanktionen nach sich ziehen.'
        },
        {
          id: 'subscriptions',
          title: '5. Pläne, Abonnements und Kündigung',
          text: 'Der Zugriff des Arbeitgebers hängt vom Abschluss und der Aufrechterhaltung eines gültigen Abonnements ab (Vierteljährlich, Halbjährlich oder Testzeitraum). Bei Zahlungsausfall oder Ablauf des Abonnements behält sich Precision das Recht vor, den Zugang und die Zeiterfassung für alle verknüpften Mitarbeiter vorübergehend zu sperren, bis der Plan ausgeglichen ist.'
        },
        {
          id: 'intellectual-property',
          title: '6. Geistiges Eigentum',
          text: 'Alle Urheberrechte, Patente, Marken, Quellcodes, Designs und sonstigen geistigen Eigentumsrechte im Zusammenhang mit der Precision-Plattform liegen ausschließlich bei Precision Technologies. Kein Teil dieses Systems darf ohne vorherige schriftliche Zustimmung kopiert, reproduziert oder verändert werden.'
        },
        {
          id: 'liability',
          title: '7. Haftungsbeschränkung für Arbeitsrecht',
          text: 'HAFTUNGSAUSSCHLUSS FÜR ARBEITSRECHT UND RECHTLICHE VERPFLICHTUNGEN:\n• Precision ist ein technologisches Werkzeug zur Verarbeitung von Anwesenheitsprotokollen. Die allgemeine Einhaltung des Arbeitsrechts, die Berechnung von Überstunden, die korrekte Anwendung von Tarifverträgen sowie die Gültigkeit von Schichten und Arbeitszeitkonten liegen in der alleinigen und ausschließlichen Verantwortung des Arbeitgeberunternehmens (Verantwortlicher).\n• Precision haftet in keinem Fall für rechtliche Streitigkeiten, arbeitsrechtliche Ansprüche, Klagen oder finanzielle Verluste, die sich aus dem Beschäftigungsverhältnis zwischen dem Arbeitgeber und dem Arbeitnehmer ergeben.'
        },
        {
          id: 'termination',
          title: '8. Kündigung des Zugangs',
          text: 'Wir können Ihren Zugriff auf die Plattform bei Verstößen gegen diese Bedingungen, Sicherheitsverletzungen, Verdacht auf wiederholten Betrug oder auf Anfrage des Abonnentenunternehmens unverzüglich sperren oder kündigen.'
        },
        {
          id: 'jurisdiction',
          title: '9. Anwendbares Recht und Gerichtsstand',
          text: 'Diese Bedingungen unterliegen für Zugriffe aus Brasilien den Gesetzen der Föderativen Republik Brasilien. Bei internationalen Streitigkeiten, an denen Nutzer außerhalb Brasiliens beteiligt sind, streben die Parteien eine gütliche Einigung an, bevor sie ein Schiedsverfahren oder lokale Gerichte anrufen.'
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
