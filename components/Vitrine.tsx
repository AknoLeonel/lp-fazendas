import VitrineFiltro from "./VitrineFiltro";
import { FAZENDAS, type Aptidao } from "../lib/fazendas";
import { whatsappLink } from "../lib/site";

const mensagemPortfolio =
  "Olá, vim pelo site e gostaria de ver o portfólio completo de fazendas.";
const mensagemChacaras =
  "Olá, vim pelo site e gostaria de ver as opções de chácaras e sítios.";

export default function Vitrine({
  aptidao,
  titulo = "Seleção restrita, auditada pelo jurídico",
  exibirChacaras = true,
}: {
  aptidao?: Aptidao;
  titulo?: string;
  exibirChacaras?: boolean;
}) {
  const fazendas = aptidao ? FAZENDAS.filter((f) => f.aptidao === aptidao) : FAZENDAS;

  return (
    <section
      id="vitrine"
      aria-labelledby="vitrine-titulo"
      className="scroll-mt-4 px-5 pb-6 pt-14 md:px-16 md:pb-10 md:pt-26"
    >
      <div className="mx-auto flex max-w-[1312px] flex-col gap-6 md:gap-11">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex max-w-[720px] flex-col gap-2.5 md:gap-3.5">
            <span className="text-xs font-bold uppercase tracking-[0.12em] text-terra md:text-[13px]">
              Vitrine
            </span>
            <h2
              id="vitrine-titulo"
              className="font-display text-[34px] font-bold leading-[1.04] tracking-tighter md:text-[52px]"
            >
              {titulo}
            </h2>
          </div>
          <a
            href={whatsappLink(mensagemPortfolio)}
            target="_blank"
            rel="noopener noreferrer"
            data-track="portfolio_completo"
            className="border-b-2 border-grao pb-1 font-bold text-folha"
          >
            Solicitar portfólio completo →
          </a>
        </div>

        <VitrineFiltro fazendas={fazendas} />

        {exibirChacaras && (
          <div className="flex flex-wrap items-center justify-between gap-5 rounded-xl bg-areia p-6 md:gap-6 md:px-12 md:py-10">
            <div className="flex max-w-[640px] flex-col gap-2">
              <h3 className="font-display text-2xl font-bold md:text-3xl">Busca por áreas menores?</h3>
              <p className="leading-relaxed text-tinta-suave">
                Além das grandes propriedades, trabalhamos com um portfólio
                selecionado de chácaras, sítios e áreas de lazer de alto padrão.
              </p>
            </div>
            <a
              href={whatsappLink(mensagemChacaras)}
              target="_blank"
              rel="noopener noreferrer"
              data-track="chacaras"
              className="flex min-h-13 w-full items-center justify-center rounded-lg bg-cerrado-900 px-7 font-bold text-algodao md:w-auto"
            >
              Ver chácaras e sítios
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
