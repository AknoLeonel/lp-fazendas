import Image from "next/image";

const categorias = [
  {
    id: "agricultura",
    titulo: "Agricultura",
    descricao:
      "Áreas de topografia plana, alto índice pluviométrico, logística escoadora facilitada e solo de excelência para safra e safrinha.",
    imagem: "/fazenda-3.jpg",
    alt: "Área extensa de cerrado com rodovia e rio ao fundo",
  },
  {
    id: "pecuaria",
    titulo: "Pecuária",
    descricao:
      "Fazendas já estruturadas, formadas em pastagens de alta qualidade, ricas em recursos hídricos e capacidade para alta lotação.",
    imagem: "/fazenda-2.jpg",
    alt: "Sede de fazenda com curral e estrada de terra",
  },
  {
    id: "compensacao",
    titulo: "Compensação Ambiental",
    descricao:
      "Áreas de vegetação nativa com biomas específicos, documentação rigorosamente em dia para regularização de passivo ambiental.",
    imagem: "/fazenda-1.jpg",
    alt: "Mata nativa preservada com área alagada e rio",
  },
];

export default function Aptidoes() {
  return (
    <section
      id="aptidoes"
      aria-labelledby="aptidoes-titulo"
      className="scroll-mt-4 px-5 pb-6 pt-14 md:px-16 md:pb-10 md:pt-26"
    >
      <div className="mx-auto flex max-w-[1312px] flex-col gap-6 md:gap-12">
        <div className="flex max-w-[720px] flex-col gap-2.5 md:gap-3.5">
          <span className="text-xs font-bold uppercase tracking-[0.12em] text-gold-dark md:text-[13px]">
            Aptidões exclusivas
          </span>
          <h2
            id="aptidoes-titulo"
            className="font-display text-[32px] font-normal leading-[1.08] tracking-tight md:text-[52px]"
          >
            Escolha pelo objetivo do seu investimento
          </h2>
          <p className="hidden text-lg leading-relaxed text-ink-soft md:block">
            Filtramos e auditamos as melhores oportunidades do mercado de acordo
            com o seu objetivo estratégico.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {categorias.map((c) => (
            <a
              key={c.id}
              href="#vitrine"
              className="group relative flex min-h-[300px] flex-col justify-end overflow-hidden rounded-xl text-paper md:min-h-[460px]"
            >
              <Image
                src={c.imagem}
                alt={c.alt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent from-30% to-forest-950/95" />
              <div className="relative flex flex-col gap-2 p-5 md:gap-2.5 md:p-7">
                <h3 className="font-display text-[26px] font-medium md:text-[32px]">
                  {c.titulo}
                </h3>
                <p className="text-sm leading-relaxed text-paper/85 md:text-[15px]">
                  {c.descricao}
                </p>
                <span className="text-sm font-semibold text-gold-light md:text-[15px]">
                  Ver oportunidades →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
