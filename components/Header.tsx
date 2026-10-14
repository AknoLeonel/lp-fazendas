import Link from "next/link";
import Logo from "./Logo";
import { SITE } from "../lib/site";

const links = [
  { href: "/#aptidoes", label: "Aptidões" },
  { href: "/fazendas", label: "Fazendas" },
  { href: "/#auditoria", label: "Auditoria" },
  { href: "/#mapa", label: "Mapa" },
  { href: "/#simulador", label: "Simulador" },
  { href: "/#oeste", label: "Oeste Baiano" },
];

export default function Header() {
  return (
    <header className="absolute left-0 top-0 z-40 w-full text-algodao">
      <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between gap-3 px-5 md:h-24 md:px-16">
        <Link href="/" aria-label={`${SITE.fullName} - início`}>
          <Logo />
        </Link>

        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-7 text-[15px] font-medium text-algodao/90 xl:flex"
        >
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-grao-claro">
              {l.label}
            </a>
          ))}
          <a
            href="#contato"
            data-track="header"
            className="rounded-lg bg-grao px-5 py-3 font-bold text-cerrado-900 transition-colors hover:bg-grao-claro"
          >
            Falar com especialista
          </a>
        </nav>

        {/* Menu mobile sem JavaScript */}
        <details className="group relative xl:hidden">
          <summary
            aria-label="Abrir menu"
            className="flex size-11 cursor-pointer items-center justify-center rounded-lg border border-algodao/30"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </summary>
          <nav
            aria-label="Menu"
            className="absolute right-0 top-14 flex w-64 flex-col gap-1 rounded-xl bg-cerrado-900 p-3 shadow-2xl"
          >
            {links.map((l) => (
              <a key={l.href} href={l.href} className="rounded-lg px-4 py-3 font-medium hover:bg-cerrado-800">
                {l.label}
              </a>
            ))}
            <a
              href="#contato"
              data-track="header_mobile"
              className="mt-1 rounded-lg bg-grao px-4 py-3 text-center font-bold text-cerrado-900"
            >
              Falar com especialista
            </a>
          </nav>
        </details>
      </div>
    </header>
  );
}
