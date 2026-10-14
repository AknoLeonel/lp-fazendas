import { whatsappLink } from "../lib/site";

export const FAQS = [
  {
    pergunta: "Como funciona a auditoria jurídica das fazendas?",
    resposta:
      "Nossa equipe realiza uma varredura completa na cadeia dominial, analisando matrículas, certidões negativas e passivos ambientais (CAR e Georreferenciamento) para garantir que a propriedade está livre de litígios ou bloqueios antes de ser negociada.",
  },
  {
    pergunta: "Vocês trabalham com áreas para compensação ambiental em outros estados?",
    resposta:
      "Sim. Mapeamos áreas de vegetação nativa em diversos biomas que atendem aos critérios do IBAMA e dos órgãos estaduais para regularização de reserva legal de propriedades rurais.",
  },
  {
    pergunta: "Como agendar uma visita técnica à propriedade?",
    resposta:
      "Após uma reunião de alinhamento e, em alguns casos, assinatura de termo de confidencialidade (exigência de propriedades off-market), nossa equipe organiza a logística da visita com o acompanhamento de um especialista.",
  },
  {
    pergunta: "As fazendas já possuem infraestrutura de escoamento?",
    resposta:
      "Filtramos rigorosamente nosso portfólio. A grande maioria das áreas agrícolas possui proximidade com rodovias pavimentadas, silos de armazenagem e facilidade logística para escoamento de safra.",
  },
];

export default function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-titulo" className="scroll-mt-4 px-5 pb-14 pt-14 md:px-16 md:py-26">
      <div className="mx-auto flex max-w-[920px] flex-col gap-3">
        <h2
          id="faq-titulo"
          className="mb-3 font-display text-[34px] font-bold tracking-tighter md:mb-5 md:text-[44px]"
        >
          Dúvidas frequentes
        </h2>
        {FAQS.map((faq) => (
          <details key={faq.pergunta} className="rounded-xl border border-linha bg-algodao-claro">
            <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 p-[18px] text-base font-semibold leading-snug md:p-6 md:text-[17px]">
              <span>{faq.pergunta}</span>
              <span aria-hidden="true" className="faq-plus text-[28px] leading-none text-terra transition-transform duration-200">
                +
              </span>
            </summary>
            <p className="px-[18px] pb-[18px] text-[15px] leading-relaxed text-tinta-suave md:px-6 md:pb-6 md:text-base">
              {faq.resposta}
            </p>
          </details>
        ))}
        <a
          href={whatsappLink("Olá, vim pelo site e fiquei com uma dúvida sobre as fazendas e a documentação.")}
          target="_blank"
          rel="noopener noreferrer"
          data-track="faq"
          className="mt-3 self-start font-bold text-folha underline underline-offset-4"
        >
          Outra dúvida? Fale com um especialista →
        </a>
      </div>
    </section>
  );
}
