import { whatsappLink } from "../lib/site";

const mensagem = "Olá, vim pelo site e gostaria de atendimento.";

/** Barra fixa de conversão (mobile) e botão flutuante de WhatsApp (desktop). */
export default function MobileCtaBar() {
  return (
    <>
      <div
        className="fixed inset-x-0 bottom-0 z-50 flex gap-2.5 border-t border-cerrado-800 bg-cerrado-950/95 px-4 pt-2.5 backdrop-blur md:hidden"
        style={{ paddingBottom: "max(0.625rem, env(safe-area-inset-bottom))" }}
      >
        <a
          href="#contato"
          data-track="barra_fixa"
          className="flex min-h-12 flex-1 items-center justify-center rounded-lg bg-grao font-bold text-cerrado-900"
        >
          Receber fazendas
        </a>
        <a
          href={whatsappLink(mensagem)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar no WhatsApp"
          data-track="barra_fixa_whatsapp"
          className="flex size-12 items-center justify-center rounded-lg bg-[#25a559]"
        >
          <WhatsAppIcon className="size-6" />
        </a>
      </div>

      <a
        href={whatsappLink(mensagem)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        data-track="whatsapp_flutuante"
        className="fixed bottom-6 right-6 z-50 hidden size-16 items-center justify-center rounded-full bg-[#25a559] shadow-2xl shadow-black/30 transition-transform hover:-translate-y-1 md:flex"
      >
        <WhatsAppIcon className="size-8" />
      </a>
    </>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.7-5.2A8.5 8.5 0 1 1 21 11.5z" />
    </svg>
  );
}
