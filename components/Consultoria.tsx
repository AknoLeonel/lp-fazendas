import { whatsappLink } from "../lib/site";

const beneficios = [
  {
    titulo: "Auditoria Rigorosa de Matrículas",
    descricao:
      "Análise profunda da cadeia dominial para garantir a inexistência de bloqueios, penhoras ou litígios.",
  },
  {
    titulo: "Adequação Ambiental (CAR e GEO)",
    descricao:
      "Verificação completa de Reserva Legal, APPs e georreferenciamento certificado no INCRA.",
  },
  {
    titulo: "Assessoria de Ponta a Ponta",
    descricao:
      "Acompanhamento desde a proposta de compra até a lavratura da escritura e registro final.",
  },
];

const mensagemJuridico =
  "Olá, vim pelo site e tenho interesse em saber mais sobre a consultoria de regularização fundiária.";

export default function Consultoria() {
  return (
    <section
      id="consultoria"
      aria-labelledby="consultoria-titulo"
      className="mt-8 scroll-mt-4 bg-forest-900 px-5 py-14 text-paper md:mt-16 md:px-16 md:py-26"
    >
      <div className="mx-auto flex max-w-[1312px] flex-wrap gap-6 md:gap-16">
        <div className="flex flex-1 basis-[440px] flex-col gap-5 self-start md:gap-6">
          <span className="text-xs font-bold uppercase tracking-[0.12em] text-gold md:text-[13px]">
            Diferencial competitivo
          </span>
          <h2
            id="consultoria-titulo"
            className="font-display text-[32px] font-normal leading-[1.08] tracking-tight md:text-[52px]"
          >
            Consultoria jurídica em{" "}
            <em className="text-gold">regularização fundiária</em>
          </h2>
          <p className="text-base leading-relaxed text-paper/70 md:text-lg">
            Não vendemos apenas terras, entregamos segurança. Nossa equipe
            jurídica especializada no agronegócio realiza uma blindagem completa
            no seu investimento, eliminando riscos documentais e ambientais.
          </p>
          <a
            href={whatsappLink(mensagemJuridico)}
            target="_blank"
            rel="noopener noreferrer"
            data-track="consultoria"
            className="flex min-h-13 items-center justify-center rounded-full border-[1.5px] border-gold px-7 font-bold text-gold-light transition-colors hover:bg-gold hover:text-forest-900 md:self-start"
          >
            Falar com o setor jurídico →
          </a>
        </div>

        <ol className="flex flex-1 basis-[480px] flex-col gap-4">
          {beneficios.map((b, i) => (
            <li
              key={b.titulo}
              className="flex gap-4 rounded-xl border border-forest-800 bg-paper/[0.03] p-5 md:gap-5 md:p-7"
            >
              <span className="font-display text-3xl leading-none text-gold md:text-[40px]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-1.5 md:gap-2">
                <h3 className="text-lg font-semibold md:text-[21px]">{b.titulo}</h3>
                <p className="text-[15px] leading-relaxed text-paper/65 md:text-base">
                  {b.descricao}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
