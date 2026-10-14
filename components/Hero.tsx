import Link from "next/link";
import Image from "next/image";
import LeadForm from "./LeadForm";

type HeroProps = {
  etiqueta?: string;
  titulo?: React.ReactNode;
  subtitulo?: string;
  imagem?: string;
  alt?: string;
  aptidaoInicial?: string;
};

export default function Hero({
  etiqueta = "Formosa do Rio Preto · BA",
  titulo = (
    <>
      Fazendas de alto potencial.{" "}
      <span className="text-grao">Documentação 100% regularizada.</span>
    </>
  ),
  subtitulo = "Agricultura, pecuária e compensação ambiental no Oeste Baiano e além. Compre direto de quem conhece a terra e audita cada matrícula antes de anunciar.",
  imagem = "/hero.jpg",
  alt = "Vista aérea de fazenda no cerrado do Oeste Baiano",
  aptidaoInicial,
}: HeroProps) {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-titulo"
      className="relative overflow-hidden bg-cerrado-900 text-algodao"
    >
      <Image
        src={imagem}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[60%_72%]"
      />
      <div className="absolute inset-0 bg-cerrado-950/75" />

      <div className="relative mx-auto flex max-w-[1440px] flex-wrap items-center gap-12 px-5 pb-12 pt-28 md:min-h-[800px] md:gap-14 md:px-16 md:pb-24 md:pt-32">
        <div className="flex max-w-[720px] flex-1 basis-[520px] flex-col gap-5 md:gap-7">
          <span className="self-start rounded-md border border-grao/45 bg-cerrado-900/85 px-3 py-2 font-display text-xs tracking-[0.08em] text-grao md:px-4 md:text-sm">
            {etiqueta.toUpperCase()}
          </span>

          <h1
            id="hero-titulo"
            className="font-display text-[42px] font-bold leading-none tracking-tighter md:text-[76px] md:leading-[0.98]"
          >
            {titulo}
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-algodao/85 md:text-xl">
            {subtitulo}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:gap-3.5">
            <a
              href="#contato"
              data-track="hero_principal"
              className="flex min-h-14 items-center justify-center rounded-lg bg-grao px-7 text-base font-bold text-cerrado-900 transition-colors hover:bg-grao-claro md:text-[17px]"
            >
              Falar com um especialista agora
            </a>
            <Link
              href="/fazendas"
              className="flex min-h-13 items-center justify-center rounded-lg border border-algodao/45 px-7 text-base font-medium transition-colors hover:bg-algodao/10 md:text-[17px]"
            >
              Ver fazendas <span aria-hidden="true" className="ml-2">→</span>
            </Link>
          </div>
        </div>

        <div className="w-full md:w-[400px] md:flex-none">
          <LeadForm aptidaoInicial={aptidaoInicial} />
        </div>
      </div>
    </section>
  );
}
