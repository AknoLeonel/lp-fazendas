import { whatsappLink } from "../lib/site";

export default function CtaFinal({
  mensagem = "Olá, vim pelo site e gostaria de falar com um especialista.",
}: {
  mensagem?: string;
}) {
  return (
    <section className="bg-grao px-5 py-14 text-cerrado-900 md:px-16 md:py-18">
      <div className="mx-auto flex max-w-[1312px] flex-wrap items-center justify-between gap-8">
        <h2 className="max-w-[680px] font-display text-[32px] font-bold leading-[1.05] tracking-tighter md:text-[46px]">
          Fale direto com quem conhece a terra.
        </h2>
        <a
          href={whatsappLink(mensagem)}
          target="_blank"
          rel="noopener noreferrer"
          data-track="cta_final"
          className="flex min-h-14 w-full items-center justify-center rounded-lg bg-cerrado-900 px-8 text-[17px] font-bold text-algodao md:w-auto"
        >
          Chamar no WhatsApp
        </a>
      </div>
    </section>
  );
}
