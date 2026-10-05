import { whatsappLink } from "../lib/site";

const mensagem = "Olá, vim pelo site e gostaria de atendimento.";

export default function WhatsAppButton() {
  return (
    <div
      className="fixed right-4 z-50 sm:right-6"
      style={{ bottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
    >
      <a
        href={whatsappLink(mensagem)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        data-gtm="whatsapp_flutuante"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-green-500 shadow-2xl shadow-green-500/40 transition-transform duration-300 hover:-translate-y-1 hover:bg-green-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300 focus-visible:ring-offset-2 sm:h-16 sm:w-16 sm:hover:scale-105"
      >
        {/* Pulso para chamar atenção (desligado para quem prefere menos movimento) */}
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-ping rounded-full bg-green-400 opacity-20 group-hover:animate-none motion-reduce:hidden"
        />

        {/* Ícone */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 256 256"
          aria-hidden="true"
          className="relative h-8 w-8 sm:h-9 sm:w-9"
        >
          <path d="M187.58,144.84l-32-16a8,8,0,0,0-8,1.21l-15.7,12.16a71.72,71.72,0,0,1-34.58-34.58l12.16-15.7a8,8,0,0,0,1.21-8l-16-32A8,8,0,0,0,87.5,45.6c-4.18,1.06-16.79,4.6-26.37,20.86-10.74,18.25-10.37,39.69,1.1,64,13.29,28.16,35.34,50.21,63.5,63.5,24.31,11.47,45.75,11.84,64,1.1,16.26-9.58,19.8-22.19,20.86-26.37A8,8,0,0,0,187.58,144.84Z" />
        </svg>
      </a>
    </div>
  );
}