'use client';

import { useState } from "react";

export default function FaqAutoridade() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      pergunta: "Como funciona a auditoria jurídica das fazendas?",
      resposta: "Nossa equipe realiza uma varredura completa na cadeia dominial, analisando matrículas, certidões negativas e passivos ambientais (CAR e Georreferenciamento) para garantir que a propriedade está 100% livre de litígios ou bloqueios antes de ser negociada."
    },
    {
      pergunta: "Vocês trabalham com áreas para compensação ambiental em outros estados?",
      resposta: "Sim. Mapeamos áreas de vegetação nativa em diversos biomas que atendem aos rigorosos critérios do IBAMA e dos órgãos estaduais para regularização de reserva legal de propriedades rurais."
    },
    {
      pergunta: "Como agendar uma visita técnica à propriedade?",
      resposta: "Após uma reunião de alinhamento e, em alguns casos, assinatura de termo de confidencialidade (exigência de propriedades *off-market*), nossa equipe organiza a logística para a visitação in loco com o acompanhamento de um especialista."
    },
    {
      pergunta: "As fazendas já possuem infraestrutura de escoamento?",
      resposta: "Filtramos rigorosamente nosso portfólio. A grande maioria das áreas agrícolas listadas possui proximidade com rodovias pavimentadas, silos de armazenagem e facilidade logística para escoamento de safra."
    }
  ];

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-8">
          
          {/* Coluna de Autoridade */}
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-sm font-semibold text-slate-700">
              <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
              Transparência e Segurança
            </div>
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Por que investir com a <br className="hidden md:block"/>
              <span className="text-green-600">AKNOTECH Agro?</span>
            </h2>
            <p className="mb-6 text-lg text-slate-600 leading-relaxed">
              O mercado imobiliário rural exige um nível de precisão técnica que corretores tradicionais não oferecem. Nós unimos a inteligência na captação das melhores terras produtoras do país com uma blindagem jurídica implacável.
            </p>
            <p className="mb-8 text-lg text-slate-600 leading-relaxed">
              Do georreferenciamento à lavratura da escritura, você conta com especialistas em regularização fundiária protegendo o seu capital a cada etapa da negociação.
            </p>
            
            {/* Indicadores de Confiança */}
            <div className="flex flex-wrap gap-6 border-t border-slate-100 pt-8">
              <div>
                <p className="text-3xl font-black text-slate-900">100%</p>
                <p className="text-sm font-medium text-slate-500">Áreas Auditadas</p>
              </div>
              <div className="w-px bg-slate-200"></div>
              <div>
                <p className="text-3xl font-black text-slate-900">Sigilo</p>
                <p className="text-sm font-medium text-slate-500">Absoluto</p>
              </div>
            </div>
          </div>

          {/* Coluna de FAQ (Acordeão) */}
          <div className="flex flex-col justify-center">
            <h3 className="mb-8 text-2xl font-bold text-slate-900">Dúvidas Frequentes</h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                    openIndex === index ? 'border-green-500 bg-green-50/30' : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="flex w-full items-center justify-between p-6 text-left font-semibold text-slate-900 focus:outline-none"
                  >
                    <span className="pr-4 text-lg">{faq.pergunta}</span>
                    <span className={`shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-green-600' : 'text-slate-400'}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  
                  <div 
                    className={`grid transition-all duration-300 ease-in-out ${
                      openIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-slate-600 leading-relaxed">
                        {faq.resposta}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}