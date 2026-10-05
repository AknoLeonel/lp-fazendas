'use client';

import { useState } from "react";
import { SITE, whatsappLink } from "../lib/site";

const faqs = [
  {
    pergunta: "Como funciona a auditoria jurídica das fazendas?",
    resposta:
      "Nossa equipe realiza uma varredura completa na cadeia dominial, analisando matrículas, certidões negativas e passivos ambientais (CAR e Georreferenciamento) para garantir que a propriedade está 100% livre de litígios ou bloqueios antes de ser negociada.",
  },
  {
    pergunta:
      "Vocês trabalham com áreas para compensação ambiental em outros estados?",
    resposta:
      "Sim. Mapeamos áreas de vegetação nativa em diversos biomas que atendem aos rigorosos critérios do IBAMA e dos órgãos estaduais para regularização de reserva legal de propriedades rurais.",
  },
  {
    pergunta: "Como agendar uma visita técnica à propriedade?",
    resposta:
      "Após uma reunião de alinhamento e, em alguns casos, assinatura de termo de confidencialidade (exigência de propriedades “off-market”), nossa equipe organiza a logística para a visitação in loco com o acompanhamento de um especialista.",
  },
  {
    pergunta: "As fazendas já possuem infraestrutura de escoamento?",
    resposta:
      "Filtramos rigorosamente nosso portfólio. A grande maioria das áreas agrícolas listadas possui proximidade com rodovias pavimentadas, silos de armazenagem e facilidade logística para escoamento de safra.",
  },
];

const mensagemFaq =
  "Olá, vim pelo site e fiquei com uma dúvida sobre as fazendas e a documentação. Podem me ajudar?";

export default function FaqAutoridade() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      aria-labelledby="autoridade-titulo"
      className="scroll-mt-20 bg-white py-16 lg:py-28"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Coluna de Autoridade */}
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-sm font-semibold text-slate-700">
              <span
                aria-hidden="true"
                className="flex h-2 w-2 rounded-full bg-green-500"
              />
              Transparência e Segurança
            </div>

            <h2
              id="autoridade-titulo"
              className="mb-6 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl"
            >
              Por que investir com a{" "}
              <span className="text-green-600">{SITE.fullName}?</span>
            </h2>

            <p className="mb-6 text-lg leading-relaxed text-slate-600">
              O mercado imobiliário rural exige um nível de precisão técnica
              que corretores tradicionais não oferecem. Nós unimos a
              inteligência na captação das melhores terras produtoras do país
              com uma blindagem jurídica implacável.
            </p>
            <p className="mb-8 text-lg leading-relaxed text-slate-600">
              Do georreferenciamento à lavratura da escritura, você conta com
              especialistas em regularização fundiária protegendo o seu capital
              a cada etapa da negociação.
            </p>

            {/* Indicadores de Confiança */}
            <dl className="flex flex-wrap gap-6 border-t border-slate-100 pt-8">
              <div>
                <dt className="sr-only">Áreas auditadas</dt>
                <dd className="text-3xl font-black text-slate-900">100%</dd>
                <p className="text-sm font-medium text-slate-500" aria-hidden="true">
                  Áreas Auditadas
                </p>
              </div>
              <div className="w-px bg-slate-200" aria-hidden="true" />
              <div>
                <dt className="sr-only">Confidencialidade</dt>
                <dd className="text-3xl font-black text-slate-900">Sigilo</dd>
                <p className="text-sm font-medium text-slate-500" aria-hidden="true">
                  Absoluto
                </p>
              </div>
            </dl>
          </div>

          {/* Coluna de FAQ (Acordeão) */}
          <div className="flex flex-col justify-center">
            <h3 className="mb-6 text-2xl font-bold text-slate-900 lg:mb-8">
              Dúvidas Frequentes
            </h3>

            <div className="space-y-3 lg:space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                const buttonId = `faq-botao-${index}`;
                const panelId = `faq-painel-${index}`;

                return (
                  <div
                    key={faq.pergunta}
                    className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                      isOpen
                        ? "border-green-500 bg-green-50/30"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <h4>
                      <button
                        id={buttonId}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                        className="flex w-full items-center justify-between p-5 text-left font-semibold text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-green-500 md:p-6"
                      >
                        <span className="pr-4 text-base md:text-lg">
                          {faq.pergunta}
                        </span>
                        <span
                          aria-hidden="true"
                          className={`shrink-0 transition-transform duration-300 ${
                            isOpen ? "rotate-180 text-green-600" : "text-slate-400"
                          }`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </button>
                    </h4>

                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      aria-hidden={!isOpen}
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-5 pb-5 leading-relaxed text-slate-600 md:px-6 md:pb-6">
                          {faq.resposta}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA após as dúvidas */}
            <div className="mt-8 flex flex-col items-start gap-3 rounded-2xl bg-slate-50 p-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-medium text-slate-700">
                Ficou com alguma dúvida? Fale direto com um especialista.
              </p>
              <a
                href={whatsappLink(mensagemFaq)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center rounded-full bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
              >
                Chamar no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}