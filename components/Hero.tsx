import Image from "next/image";
import { whatsappLink } from "../lib/site";

const mensagemHero =
  "Olá, vim pelo site e gostaria de saber mais sobre as fazendas disponíveis.";

export default function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-titulo"
      className="relative flex min-h-[620px] w-full items-center justify-center overflow-hidden bg-slate-900 py-20 md:h-[calc(100svh-5rem)] md:py-0"
    >
      {/* Imagem de fundo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.jpg"
          alt="Fazenda de alto padrão com aptidão agrícola e pecuária"
          fill
          priority
          sizes="100vw"
          quality={75}
          className="object-cover object-center"
        />
        {/* Overlay para garantir contraste e leitura do texto */}
        <div className="absolute inset-0 bg-black/65" />
      </div>

      {/* Conteúdo Principal */}
      <div className="container relative z-10 mx-auto flex flex-col items-center px-4 text-center text-white md:px-6">
        {/* Badge */}
        <span className="mb-6 rounded-full border border-green-500/50 bg-green-900/40 px-5 py-2 text-sm font-semibold tracking-wide text-green-400 backdrop-blur-md">
          Segurança Jurídica &amp; Alta Rentabilidade
        </span>

        {/* H1 */}
        <h1
          id="hero-titulo"
          className="mb-6 max-w-4xl text-4xl font-extrabold tracking-tight drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Fazendas de Alto Potencial com{" "}
          <span className="text-green-500">Documentação 100% Regularizada</span>
        </h1>

        {/* Sub-headline */}
        <p className="mb-10 max-w-2xl text-lg text-gray-200 drop-shadow-md sm:text-xl md:text-2xl">
          As melhores áreas para agricultura, pecuária e compensação ambiental.
          Compre direto com quem garante a auditoria jurídica completa e
          elimina riscos.
        </p>

        {/* CTAs */}
        <div className="flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
          <a
            href={whatsappLink(mensagemHero)}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-green-600 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:bg-green-500 hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 sm:w-auto sm:hover:scale-105"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="currentColor"
              viewBox="0 0 256 256"
              aria-hidden="true"
            >
              <path d="M187.58,144.84l-32-16a8,8,0,0,0-8,1.21l-15.7,12.16a71.72,71.72,0,0,1-34.58-34.58l12.16-15.7a8,8,0,0,0,1.21-8l-16-32A8,8,0,0,0,87.5,45.6c-4.18,1.06-16.79,4.6-26.37,20.86-10.74,18.25-10.37,39.69,1.1,64,13.29,28.16,35.34,50.21,63.5,63.5,24.31,11.47,45.75,11.84,64,1.1,16.26-9.58,19.8-22.19,20.86-26.37A8,8,0,0,0,187.58,144.84Z" />
            </svg>
            Falar com um Especialista Agora
          </a>

          <a
            href="#vitrine"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/40 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 sm:w-auto"
          >
            Ver fazendas
            <span aria-hidden="true">↓</span>
          </a>
        </div>

        <p className="mt-6 text-sm font-medium text-gray-300">
          Atendimento exclusivo para investidores e produtores rurais.
        </p>
      </div>
    </section>
  );
}