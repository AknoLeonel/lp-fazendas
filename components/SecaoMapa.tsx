import MapaLoader from "./MapaLoader";
import { capa, temMapa } from "../lib/fazendas";
import { lerPublicadas } from "../lib/store";
import type { PontoMapa } from "./MapaFazendas";

const legenda = [
  { cor: "#e3a72f", nome: "Agricultura" },
  { cor: "#a94a25", nome: "Pecuária" },
  { cor: "#2f6b3a", nome: "Compensação ambiental" },
];

export default async function SecaoMapa({ compacta = false }: { compacta?: boolean }) {
  const fazendas = (await lerPublicadas()).filter(temMapa);
  if (fazendas.length === 0) return null;

  const pontos: PontoMapa[] = fazendas.map((f) => ({
    slug: f.slug,
    titulo: f.titulo,
    local: f.local,
    aptidao: f.aptidao,
    aptidaoLabel: f.aptidaoLabel,
    hectares: f.hectares,
    lat: f.lat as number,
    lng: f.lng as number,
    aproximada: f.precisaoMapa === "aproximada",
    capaSrc: capa(f).src,
  }));

  return (
    <section
      id="mapa"
      aria-labelledby="mapa-titulo"
      className={`scroll-mt-4 px-5 md:px-16 ${compacta ? "pb-6 pt-2" : "pb-6 pt-14 md:pb-10 md:pt-26"}`}
    >
      <div className="mx-auto flex max-w-[1312px] flex-col gap-5 md:gap-8">
        {!compacta && (
          <div className="flex max-w-[760px] flex-col gap-2.5 md:gap-3.5">
            <span className="text-xs font-bold uppercase tracking-[0.12em] text-terra md:text-[13px]">Mapa</span>
            <h2
              id="mapa-titulo"
              className="font-display text-[34px] font-bold leading-[1.04] tracking-tighter md:text-[52px]"
            >
              Onde estão as fazendas
            </h2>
            <p className="text-base leading-relaxed text-tinta-suave md:text-lg">
              Toque num ponto para ver a fazenda. Em áreas sigilosas mostramos só a região.
            </p>
          </div>
        )}
        {compacta && <h2 id="mapa-titulo" className="sr-only">Mapa das fazendas</h2>}

        <MapaLoader pontos={pontos} />

        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm" aria-label="Legenda do mapa">
          {legenda.map((l) => (
            <li key={l.nome} className="flex items-center gap-2">
              <span aria-hidden="true" className="size-3.5 rounded-full border-2 border-cerrado-900" style={{ background: l.cor }} />
              {l.nome}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
