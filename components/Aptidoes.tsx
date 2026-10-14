import Image from "next/image";
import { APTIDOES, type Aptidao } from "../lib/fazendas";

const cartoes: { id: Aptidao; imagem: string; alt: string }[] = [
  { id: "agricultura", imagem: "/fazenda-3.jpg", alt: "Área extensa de cerrado com rodovia e rio ao fundo" },
  { id: "pecuaria", imagem: "/fazenda-2.jpg", alt: "Sede de fazenda com curral e estrada de terra" },
  { id: "compensacao-ambiental", imagem: "/fazenda-1.jpg", alt: "Mata nativa preservada com área alagada" },
];

export default function Aptidoes() {
  return (
    <section
      id="aptidoes"
      aria-labelledby="aptidoes-titulo"
      className="scroll-mt-4 px-5 pb-6 pt-14 md:px-16 md:pb-10 md:pt-26"
    >
      <div className="mx-auto flex max-w-[1312px] flex-col gap-6 md:gap-11">
        <div className="flex max-w-[760px] flex-col gap-2.5 md:gap-3.5">
          <span className="text-xs font-bold uppercase tracking-[0.12em] text-terra md:text-[13px]">
            Aptidões
          </span>
          <h2
            id="aptidoes-titulo"
            className="font-display text-[34px] font-bold leading-[1.04] tracking-tighter md:text-[52px]"
          >
            Escolha pelo que a terra vai render
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {cartoes.map((c) => {
            const a = APTIDOES[c.id];
            return (
              <a
                key={c.id}
                href={`/lp/${c.id}`}
                data-track={`aptidao_${c.id}`}
                className="group relative flex min-h-[300px] flex-col justify-end overflow-hidden rounded-xl text-algodao md:min-h-[460px]"
              >
                <Image
                  src={c.imagem}
                  alt={c.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent from-35% to-cerrado-950/95" />
                <div className="relative flex flex-col gap-2 p-5 md:gap-2.5 md:p-7">
                  <span className="self-start rounded bg-grao px-2 py-1 font-display text-[11px] font-bold uppercase tracking-[0.08em] text-cerrado-900 md:text-[13px]">
                    {a.selo}
                  </span>
                  <h3 className="font-display text-[27px] font-bold tracking-tight md:text-[32px]">
                    {a.nome}
                  </h3>
                  <p className="text-sm leading-relaxed text-algodao/85 md:text-[15px]">{a.resumo}</p>
                  <span className="text-sm font-semibold text-grao-claro md:text-[15px]">
                    Ver fazendas e simular →
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
