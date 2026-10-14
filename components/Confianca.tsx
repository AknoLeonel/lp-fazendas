const itens = [
  { destaque: "100%", texto: "das áreas auditadas juridicamente" },
  { destaque: "Sigilo", texto: "absoluto em toda negociação" },
  { destaque: "Ponta a ponta", texto: "da proposta à escritura" },
  { destaque: "Venda direta", texto: "sem intermediários" },
];

export default function Confianca() {
  return (
    <section
      aria-label="Diferenciais"
      className="bg-forest-900 text-paper"
    >
      <dl className="mx-auto grid max-w-[1440px] grid-cols-2 gap-x-4 gap-y-5 px-5 py-6 md:grid-cols-4 md:gap-6 md:px-16 md:py-7">
        {itens.map((i) => (
          <div key={i.destaque} className="flex flex-col gap-0.5">
            <dt className="font-display text-[22px] text-gold md:text-[28px]">{i.destaque}</dt>
            <dd className="text-[13px] leading-snug text-paper/70 md:text-sm">{i.texto}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
