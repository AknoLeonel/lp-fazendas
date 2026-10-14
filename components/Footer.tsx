import { SITE } from "../lib/site";

// Dados ainda não preenchidos (com "XX") não aparecem no site público.
const isPlaceholder = (valor: string) => valor.includes("XX");

const navegacao = [
  { href: "#inicio", label: "Início" },
  { href: "#aptidoes", label: "Aptidões e Perfil" },
  { href: "#consultoria", label: "Consultoria Jurídica" },
  { href: "#vitrine", label: "Vitrine de Fazendas" },
  { href: "#faq", label: "Dúvidas Frequentes" },
];

export default function Footer() {
  const mostrarCreci = !isPlaceholder(SITE.creci);
  const mostrarCnpj = !isPlaceholder(SITE.cnpj);
  const mostrarEndereco = !isPlaceholder(SITE.address.line1);

  return (
    <footer className="bg-forest-950 px-5 pb-28 pt-10 text-sm text-paper/65 md:px-16 md:pb-10 md:pt-14">
      <div className="mx-auto flex max-w-[1312px] flex-col gap-9">
        <div className="flex flex-wrap justify-between gap-10">
          <div className="flex max-w-sm flex-col gap-2.5">
            <p className="font-display text-2xl text-paper md:text-[26px]">
              {SITE.name} <span className="text-gold">{SITE.suffix}</span>
            </p>
            <p className="text-[15px] leading-relaxed">
              Especialistas em intermediação de fazendas de alto padrão e
              consultoria jurídica para regularização fundiária.
            </p>
            {(mostrarCreci || mostrarCnpj) && (
              <p>
                {mostrarCreci && <>CRECI: {SITE.creci}</>}
                {mostrarCreci && mostrarCnpj && " · "}
                {mostrarCnpj && <>CNPJ: {SITE.cnpj}</>}
              </p>
            )}
          </div>

          <nav aria-label="Navegação do rodapé" className="flex flex-col gap-2.5 text-[15px]">
            <strong className="text-paper">Navegação</strong>
            {navegacao.map((n) => (
              <a key={n.href} href={n.href} className="transition-colors hover:text-gold-light">
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-2.5 text-[15px]">
            <strong className="text-paper">Contato</strong>
            <a href={`tel:+${SITE.whatsapp}`} className="hover:text-gold-light">
              {SITE.phoneDisplay}
            </a>
            <a href={`mailto:${SITE.email}`} className="hover:text-gold-light">
              {SITE.email}
            </a>
            {mostrarEndereco && (
              <address className="not-italic">
                {SITE.address.line1}
                <br />
                {SITE.address.line2}
              </address>
            )}
          </div>
        </div>

        <p className="border-t border-forest-800 pt-6 text-[13px]">
          © {new Date().getFullYear()} {SITE.fullName}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
