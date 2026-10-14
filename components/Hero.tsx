import Image from "next/image";
import LeadForm from "./LeadForm";

export default function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-titulo"
      className="relative overflow-hidden bg-forest-950 text-paper"
    >
      <Image
        src="/hero.jpg"
        alt="Vista aérea de fazenda no cerrado com rio e rodovia"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[60%_70%]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-forest-950/70 to-forest-950/90 md:bg-gradient-to-r md:from-forest-950/90 md:via-forest-950/70 md:to-forest-950/35" />

      <div className="relative mx-auto flex max-w-[1440px] flex-wrap items-center gap-12 px-5 pb-12 pt-28 md:min-h-[780px] md:gap-14 md:px-16 md:pb-24 md:pt-32">
        <div className="flex max-w-[700px] flex-1 basis-[520px] flex-col gap-5 md:gap-7">
          <span className="self-start rounded-full border border-gold/60 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-gold-light md:px-[18px] md:py-2 md:text-[13px] md:tracking-[0.12em]">
            Segurança jurídica &amp; alta rentabilidade
          </span>

          <h1
            id="hero-titulo"
            className="font-display text-[40px] font-normal leading-[1.05] tracking-tight md:text-7xl md:leading-[1.02]"
          >
            Fazendas de alto potencial com{" "}
            <em className="text-gold">documentação 100% regularizada</em>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-paper/80 md:text-xl">
            As melhores áreas para agricultura, pecuária e compensação
            ambiental. Compre direto com quem garante a auditoria jurídica
            completa e elimina riscos.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:gap-3.5">
            <a
              href="#contato"
              data-track="hero_principal"
              className="flex min-h-14 items-center justify-center rounded-full bg-gold px-7 text-base font-bold text-forest-900 transition-colors hover:bg-gold-light md:text-[17px]"
            >
              Falar com um especialista agora
            </a>
            <a
              href="#vitrine"
              className="flex min-h-13 items-center justify-center rounded-full border border-paper/45 px-7 text-base font-medium transition-colors hover:bg-paper/10 md:text-[17px]"
            >
              Ver fazendas <span aria-hidden="true" className="ml-2">↓</span>
            </a>
          </div>

          <p className="text-sm text-paper/60">
            Atendimento exclusivo para investidores e produtores rurais.
          </p>
        </div>

        <div className="w-full md:w-[400px] md:flex-none">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
