import Image from "next/image";

export default function OesteBaiano() {
  return (
    <section id="oeste" aria-labelledby="oeste-titulo" className="flex scroll-mt-4 flex-col md:flex-row">
      <div className="relative h-60 md:h-auto md:min-h-[480px] md:flex-1">
        <Image
          src="/fazenda-2.jpg"
          alt="Sede de fazenda com curral e estrada de terra no Oeste Baiano"
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col justify-center gap-4 bg-areia px-5 pb-11 pt-9 md:flex-1 md:gap-5 md:px-16 md:py-20">
        <span className="text-xs font-bold uppercase tracking-[0.12em] text-terra md:text-[13px]">
          Raiz no Oeste Baiano
        </span>
        <h2
          id="oeste-titulo"
          className="font-display text-[30px] font-bold leading-[1.06] tracking-tighter md:text-[44px]"
        >
          Quem é de Formosa do Rio Preto conhece a terra pelo nome do dono
        </h2>
        <p className="text-base leading-relaxed text-tinta-suave md:text-lg">
          Estamos no município da maior vaquejada do Oeste da Bahia e de uma das
          fronteiras agrícolas que mais crescem no país. Conhecemos o produtor,
          a região e a história de cada área que apresentamos.
        </p>
      </div>
    </section>
  );
}
