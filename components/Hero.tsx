import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative flex h-[90vh] min-h-[650px] w-full items-center justify-center overflow-hidden">
      {/* Background Image otimizado para Next.js */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.webp"
          alt="Fazenda de alto padrão com aptidão agrícola e pecuária"
          fill
          priority // Prioriza o carregamento desta imagem para o LCP
          className="object-cover object-center"
          quality={90}
        />
        {/* Overlay escuro para garantir contraste e leitura do texto */}
        <div className="absolute inset-0 bg-black/65"></div>
      </div>

      {/* Conteúdo Principal */}
      <div className="relative z-10 container mx-auto flex flex-col items-center px-4 text-center text-white md:px-6">
        {/* Badge de Autoridade */}
        <span className="mb-6 rounded-full border border-green-500/50 bg-green-900/40 px-5 py-2 text-sm font-semibold tracking-wide text-green-400 backdrop-blur-md">
          Segurança Jurídica & Alta Rentabilidade
        </span>
        
        {/* Headline Principal (H1 para SEO) */}
        <h1 className="mb-6 max-w-4xl text-4xl font-extrabold tracking-tight drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl">
          Fazendas de Alto Potencial com <br className="hidden md:block" />
          <span className="text-green-500">Documentação 100% Regularizada</span>
        </h1>
        
        {/* Sub-headline com quebra de objeções */}
        <p className="mb-10 max-w-2xl text-lg text-gray-200 drop-shadow-md sm:text-xl md:text-2xl">
          As melhores áreas para agricultura, pecuária e compensação ambiental. Compre direto com quem garante a auditoria jurídica completa e elimina riscos.
        </p>
        
        {/* Botão de CTA para WhatsApp */}
        <a 
          href="https://wa.me/557798196370?text=Olá,%20vim%20pelo%20site%20e%20gostaria%20de%20saber%20mais%20sobre%20as%20fazendas%20disponíveis." 
          target="_blank" 
          rel="noopener noreferrer"
          className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-green-600 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-green-500 hover:shadow-[0_0_25px_rgba(34,197,94,0.5)]"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="28" 
            height="28" 
            fill="currentColor" 
            viewBox="0 0 256 256"
          >
            <path d="M187.58,144.84l-32-16a8,8,0,0,0-8,1.21l-15.7,12.16a71.72,71.72,0,0,1-34.58-34.58l12.16-15.7a8,8,0,0,0,1.21-8l-16-32A8,8,0,0,0,87.5,45.6c-4.18,1.06-16.79,4.6-26.37,20.86-10.74,18.25-10.37,39.69,1.1,64,13.29,28.16,35.34,50.21,63.5,63.5,24.31,11.47,45.75,11.84,64,1.1,16.26-9.58,19.8-22.19,20.86-26.37A8,8,0,0,0,187.58,144.84Z"></path>
          </svg>
          Falar com um Especialista Agora
        </a>

        {/* Gatilho de Urgência/Escassez Discreto */}
        <p className="mt-6 text-sm font-medium text-gray-400">
          Atendimento exclusivo para investidores e produtores rurais.
        </p>
      </div>
    </section>
  );
}