import { SITE } from "../lib/site";

const links = [
  { href: "#aptidoes", label: "Aptidões" },
  { href: "#consultoria", label: "Consultoria" },
  { href: "#vitrine", label: "Vitrine" },
  { href: "#faq", label: "Dúvidas" },
];

export default function Header() {
  return (
    <header className="absolute left-0 top-0 z-40 w-full text-paper">
      <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between gap-3 px-5 md:h-24 md:px-16">
        <a
          href="#inicio"
          aria-label={`${SITE.fullName} - início`}
          className="font-display text-xl tracking-wider md:text-[26px]"
        >
          {SITE.name} <span className="text-gold">{SITE.suffix}</span>
        </a>

        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-9 text-[15px] font-medium text-paper/90 md:flex"
        >
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-gold-light">
              {l.label}
            </a>
          ))}
          <a
            href="#contato"
            data-track="header"
            className="rounded-full bg-gold px-5 py-3 font-bold text-forest-900 transition-colors hover:bg-gold-light"
          >
            Falar com especialista
          </a>
        </nav>

        <a
          href="#contato"
          data-track="header_mobile"
          className="inline-flex min-h-11 items-center rounded-full bg-gold px-5 text-sm font-bold text-forest-900 md:hidden"
        >
          Falar agora
        </a>
      </div>
    </header>
  );
}
