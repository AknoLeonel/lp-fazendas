import { SITE, whatsappLink } from "../lib/site";

const mensagemHeader = "Olá, vim pelo site e gostaria de falar com um especialista.";

export default function Header() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-slate-200/50 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between gap-3 px-4 md:px-6">
        {/* Logo */}
        <a href="#" aria-label={`${SITE.fullName} - início`} className="flex items-center gap-2">
          <span className="text-xl font-black tracking-tighter text-slate-900 sm:text-2xl">
            {SITE.name} <span className="text-green-600">{SITE.suffix}</span>
          </span>
        </a>

        {/* Navegação Desktop */}
        <nav
          aria-label="Navegação principal"
          className="hidden text-sm font-medium text-slate-600 md:flex md:items-center md:gap-8"
        >
          <a href="#aptidoes" className="transition-colors hover:text-green-600">Aptidões</a>
          <a href="#consultoria" className="transition-colors hover:text-green-600">Consultoria</a>
          <a href="#vitrine" className="transition-colors hover:text-green-600">Vitrine</a>
          <a href="#faq" className="transition-colors hover:text-green-600">Dúvidas</a>
        </nav>

        {/* CTA */}
        <a
          href={whatsappLink(mensagemHeader)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center justify-center rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 sm:px-5"
        >
          <span className="hidden sm:inline">Falar com Especialista</span>
          <span className="sm:hidden">Falar agora</span>
        </a>
      </div>
    </header>
  );
}