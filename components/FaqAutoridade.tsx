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
  return (
    <>
      <section
        id="faq"
        aria-labelledby="autoridade-titulo"
        className="scroll-mt-4 px-5 pb-14 pt-10 md:px-16 md:py-26"
      >
        <div className="mx-auto flex max-w-[1312px] flex-wrap gap-10 md:gap-[72px]">
          <div className="flex flex-1 basis-[420px] flex-col gap-5 self-start md:gap-6">
            <span className="text-xs font-bold uppercase tracking-[0.12em] text-gold-dark md:text-[13px]">
              Transparência e segurança
            </span>
            <h2
              id="autoridade-titulo"
              className="font-display text-[32px] font-normal leading-[1.08] tracking-tight md:text-5xl"
            >
              Por que investir com a{" "}
              <em className="text-forest-700">{SITE.fullName}?</em>
            </h2>
            <p className="text-base leading-relaxed text-ink-soft md:text-lg">
              O mercado imobiliário rural exige um nível de precisão técnica que
              corretores tradicionais não oferecem. Unimos a inteligência na
              captação das melhores terras produtoras do país com uma blindagem
              jurídica implacável.
            </p>
            <p className="text-base leading-relaxed text-ink-soft md:text-lg">
              Do georreferenciamento à lavratura da escritura, especialistas em
              regularização fundiária protegem o seu capital a cada etapa.
            </p>
            <dl className="flex gap-10 border-t border-line pt-6 md:pt-7">
              <div>
                <dd className="font-display text-4xl md:text-[44px]">100%</dd>
                <dt className="text-sm text-ink-soft">Áreas auditadas</dt>
              </div>
              <div>
                <dd className="font-display text-4xl md:text-[44px]">Sigilo</dd>
                <dt className="text-sm text-ink-soft">Absoluto</dt>
              </div>
            </dl>
          </div>

          <div className="flex flex-1 basis-[520px] flex-col gap-3">
            <h3 className="mb-1 text-xl font-semibold md:text-[22px]">
              Dúvidas frequentes
            </h3>
            {faqs.map((faq) => (
              <details
                key={faq.pergunta}
                className="rounded-xl border border-line bg-paper-soft"
              >
                <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 p-[18px] text-base font-semibold leading-snug md:p-6 md:text-[17px]">
                  <span>{faq.pergunta}</span>
                  <span
                    aria-hidden="true"
                    className="faq-plus text-[28px] leading-none text-gold-dark transition-transform duration-200"
                  >
                    +
                  </span>
                </summary>
                <p className="px-[18px] pb-[18px] text-[15px] leading-relaxed text-ink-soft md:px-6 md:pb-6 md:text-base">
                  {faq.resposta}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest-700 px-5 py-14 text-paper md:px-16 md:py-20">
        <div className="mx-auto flex max-w-[1312px] flex-wrap items-center justify-between gap-8">
          <h2 className="max-w-[640px] font-display text-[30px] font-normal leading-[1.1] md:text-[44px]">
            Ficou com alguma dúvida? Fale direto com um especialista.
          </h2>
          <a
            href={whatsappLink(mensagemFaq)}
            target="_blank"
            rel="noopener noreferrer"
            data-track="faq_final"
            className="flex min-h-14 w-full items-center justify-center rounded-full bg-gold px-8 text-[17px] font-bold text-forest-900 transition-colors hover:bg-gold-light md:w-auto"
          >
            Chamar no WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
