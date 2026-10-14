import Image from "next/image";
import { formatHa, formatPreco, type Fazenda } from "../lib/fazendas";

const selos = ["Matrícula", "CAR", "Georreferenciamento"];

export default function FazendaCard({ fazenda: f }: { fazenda: Fazenda }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-linha bg-algodao-claro">
      <a href={`/fazendas/${f.slug}`} aria-label={`Ver detalhes de ${f.titulo}`} className="relative block h-[200px] md:h-[250px]">
        <Image
          src={f.imagem}
          alt={f.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
        <span className="absolute left-3 top-3 rounded bg-cerrado-900 px-2.5 py-1.5 font-display text-[11px] font-semibold tracking-wide text-grao md:left-3.5 md:top-3.5 md:text-xs">
          {f.coordenada}
        </span>
      </a>

      <div className="flex flex-1 flex-col gap-2.5 p-5 md:gap-3 md:p-6">
        <span className="text-[13px] font-semibold text-tinta-suave md:text-sm">
          {f.local} · {f.aptidaoLabel}
        </span>
        <h3 className="font-display text-[23px] font-bold leading-tight tracking-tight md:text-[26px]">
          {f.titulo}
        </h3>
        <p className="flex-1 text-[15px] leading-relaxed text-tinta-suave">{f.descricao}</p>

        <dl className="flex gap-6 border-y border-linha py-3 text-sm">
          <div>
            <dt className="text-tinta-suave">Área</dt>
            <dd className="font-bold">{formatHa(f.hectares)}</dd>
          </div>
          <div>
            <dt className="text-tinta-suave">Valor</dt>
            <dd className="font-bold">{formatPreco(f)}</dd>
          </div>
        </dl>

        <ul className="flex flex-wrap gap-1.5 pb-1 md:gap-2">
          {selos.map((s) => (
            <li key={s} className="rounded bg-[#e1eddc] px-2.5 py-1 text-xs font-semibold text-folha-escura">
              <span aria-hidden="true">✓ </span>
              {s}
            </li>
          ))}
        </ul>

        <a
          href={`/fazendas/${f.slug}`}
          data-track={`card_${f.slug}`}
          className="flex min-h-13 items-center justify-center rounded-lg bg-cerrado-900 font-bold text-algodao transition-colors hover:bg-cerrado-800"
        >
          Ver detalhes e dossiê
        </a>
      </div>
    </article>
  );
}
