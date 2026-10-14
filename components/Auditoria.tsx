import { DOCUMENTOS_AUDITADOS } from "../lib/fazendas";
import { whatsappLink } from "../lib/site";

const mensagem =
  "Olá, vim pelo site e tenho interesse em saber mais sobre a consultoria de regularização fundiária.";

export default function Auditoria() {
  return (
    <section
      id="auditoria"
      aria-labelledby="auditoria-titulo"
      className="mt-8 scroll-mt-4 bg-cerrado-900 px-5 py-14 text-algodao md:mt-16 md:px-16 md:py-26"
    >
      <div className="mx-auto flex max-w-[1312px] flex-wrap gap-8 md:gap-16">
        <div className="flex flex-1 basis-[420px] flex-col gap-5 self-start md:gap-6">
          <span className="text-xs font-bold uppercase tracking-[0.12em] text-grao md:text-[13px]">
            Segurança jurídica
          </span>
          <h2
            id="auditoria-titulo"
            className="font-display text-[34px] font-bold leading-[1.04] tracking-tighter md:text-[52px]"
          >
            Só entra na vitrine o que passou na auditoria
          </h2>
          <p className="text-base leading-relaxed text-algodao/70 md:text-lg">
            Não vendemos apenas terras, entregamos segurança. Nossa equipe
            jurídica especializada no agronegócio faz uma blindagem completa, do
            primeiro contato à escritura.
          </p>
          <a
            href={whatsappLink(mensagem)}
            target="_blank"
            rel="noopener noreferrer"
            data-track="auditoria"
            className="flex min-h-13 items-center justify-center rounded-lg bg-grao px-7 font-bold text-cerrado-900 transition-colors hover:bg-grao-claro md:self-start"
          >
            Falar com o setor jurídico
          </a>
        </div>

        <ol className="flex flex-1 basis-[520px] flex-col">
          {DOCUMENTOS_AUDITADOS.map((d, i) => (
            <li key={d.nome} className="flex gap-4 border-t border-cerrado-800 py-5 md:gap-6 md:py-6">
              <span className="min-w-8 font-display text-lg font-bold text-grao md:text-xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-lg font-semibold md:text-[22px]">{d.nome}</h3>
                <p className="text-[15px] leading-relaxed text-algodao/65 md:text-base">{d.detalhe}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
