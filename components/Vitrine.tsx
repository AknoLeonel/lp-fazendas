import Image from "next/image";
import { whatsappLink } from "../lib/site";

// TODO: trocar por fazendas reais da carteira da Realiza Agro antes de divulgar.
const imoveis = [
  {
    id: 1,
    titulo: "Fazenda Alto Padrão - 1.200 ha",
    localizacao: "Oeste Baiano · BA",
    aptidao: "Dupla Aptidão",
    descricao:
      "Área de topografia 100% plana, ideal para lavoura branca. Logística impecável na beira da rodovia.",
    imagem: "/fazenda-3.jpg",
    alt: "Vista aérea de área extensa de cerrado",
  },
  {
    id: 2,
    titulo: "Fazenda Pecuária - 850 ha",
    localizacao: "Vale do Araguaia · GO",
    aptidao: "Pecuária de Corte",
    descricao:
      "Toda formada em pastagem, rica em água com represas e curralama completa. Pronta para lotação.",
    imagem: "/fazenda-2.jpg",
    alt: "Sede com curral em fazenda de pecuária",
  },
  {
    id: 3,
    titulo: "Área para Compensação - 2.500 ha",
    localizacao: "Norte de Minas · MG",
    aptidao: "Reserva Legal",
    descricao:
      "Mata nativa preservada, documentação, georreferenciamento e CAR rigorosamente em dia.",
    imagem: "/fazenda-1.jpg",
    alt: "Mata nativa preservada com água",
  },
];

const selos = ["Matrícula", "CAR", "Georreferenciamento"];

const mensagemPortfolio =
  "Olá, vim pelo site e gostaria de ver o portfólio completo de fazendas.";
const mensagemChacaras =
  "Olá, vim pelo site e gostaria de ver as opções de chácaras e sítios.";

export default function Vitrine() {
  return (
    <section
      id="vitrine"
      aria-labelledby="vitrine-titulo"
      className="scroll-mt-4 px-5 pb-6 pt-14 md:px-16 md:pb-10 md:pt-26"
    >
      <div className="mx-auto flex max-w-[1312px] flex-col gap-6 md:gap-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex max-w-[700px] flex-col gap-2.5 md:gap-3.5">
            <span className="text-xs font-bold uppercase tracking-[0.12em] text-gold-dark md:text-[13px]">
              Vitrine estratégica
            </span>
            <h2
              id="vitrine-titulo"
              className="font-display text-[32px] font-normal leading-[1.08] tracking-tight md:text-[52px]"
            >
              Uma seleção restrita, auditada pelo nosso jurídico
            </h2>
          </div>
          <a
            href={whatsappLink(mensagemPortfolio)}
            target="_blank"
            rel="noopener noreferrer"
            data-track="portfolio_completo"
            className="border-b-2 border-gold pb-1 font-bold text-forest-700"
          >
            Solicitar portfólio completo →
          </a>
        </div>

        <div className="grid gap-5 md:grid-cols-2 md:gap-7 lg:grid-cols-3">
          {imoveis.map((m) => (
            <article
              key={m.id}
              className="flex flex-col overflow-hidden rounded-xl border border-line bg-paper-soft"
            >
              <div className="relative h-[200px] md:h-[260px]">
                <Image
                  src={m.imagem}
                  alt={m.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
                <span className="absolute left-3 top-3 rounded-full bg-forest-950/85 px-3 py-1.5 text-xs font-semibold tracking-wide text-paper md:left-4 md:top-4">
                  {m.aptidao}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-2.5 p-5 md:gap-3 md:p-6">
                <span className="text-[13px] font-medium text-ink-soft md:text-sm">
                  {m.localizacao}
                </span>
                <h3 className="font-display text-[23px] font-medium leading-tight md:text-[27px]">
                  {m.titulo}
                </h3>
                <p className="flex-1 text-[15px] leading-relaxed text-ink-soft">
                  {m.descricao}
                </p>
                <ul className="flex flex-wrap gap-1.5 pb-1.5 md:gap-2">
                  {selos.map((s) => (
                    <li
                      key={s}
                      className="rounded-full bg-[#e3eee4] px-2.5 py-1 text-xs font-semibold text-forest-700"
                    >
                      <span aria-hidden="true">✓ </span>
                      {s}
                    </li>
                  ))}
                </ul>
                <a
                  href={whatsappLink(
                    `Olá, vim pelo site e tenho interesse na ${m.titulo}.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Saber mais sobre ${m.titulo} pelo WhatsApp`}
                  data-track={`vitrine_${m.id}`}
                  className="flex min-h-13 items-center justify-center rounded-lg bg-forest-700 font-bold text-paper transition-colors hover:bg-forest-800"
                >
                  Saber mais
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-5 rounded-xl bg-sand p-6 md:gap-6 md:px-12 md:py-10">
          <div className="flex max-w-[640px] flex-col gap-2">
            <h3 className="font-display text-2xl font-medium md:text-3xl">
              Busca por áreas menores?
            </h3>
            <p className="leading-relaxed text-ink-soft">
              Além das grandes propriedades, trabalhamos com um portfólio
              selecionado de chácaras, sítios e áreas de lazer de alto padrão.
            </p>
          </div>
          <a
            href={whatsappLink(mensagemChacaras)}
            target="_blank"
            rel="noopener noreferrer"
            data-track="chacaras"
            className="flex min-h-13 w-full items-center justify-center rounded-full bg-forest-900 px-7 font-bold text-paper md:w-auto"
          >
            Ver chácaras e sítios
          </a>
        </div>
      </div>
    </section>
  );
}
