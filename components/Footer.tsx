import Logo from "./Logo";
import { SITE } from "../lib/site";

// Dados ainda não preenchidos (com "XX") não aparecem no site público.
const isPlaceholder = (valor: string) => valor.includes("XX");

const navegacao = [
  { href: "/#aptidoes", label: "Aptidões" },
  { href: "/fazendas", label: "Fazendas à venda" },
  { href: "/#auditoria", label: "Auditoria jurídica" },
  { href: "/#simulador", label: "Simulador" },
  { href: "/politica-de-privacidade", label: "Política de privacidade" },
];

export default function Footer() {
  const mostrarCreci = !isPlaceholder(SITE.creci);
  const mostrarCnpj = !isPlaceholder(SITE.cnpj);
  const mostrarEndereco = !isPlaceholder(SITE.address.line1);

  return (
    <footer className="bg-cerrado-950 px-5 pb-28 pt-10 text-sm text-algodao/65 md:px-16 md:pb-10 md:pt-14">
      <div className="mx-auto flex max-w-[1312px] flex-col gap-9">
        <div className="flex flex-wrap justify-between gap-10">
          <div className="flex max-w-sm flex-col gap-3">
            <Logo className="text-algodao" />
            <p className="text-[15px] leading-relaxed">
              Fazendas de alto potencial com documentação 100% regularizada.
              Formosa do Rio Preto · BA.
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
            <strong className="text-algodao">Navegação</strong>
            {navegacao.map((n) => (
              <a key={n.href} href={n.href} className="transition-colors hover:text-grao-claro">
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-2.5 text-[15px]">
            <strong className="text-algodao">Contato</strong>
            <a href={`tel:+${SITE.whatsapp}`} className="hover:text-grao-claro">
              {SITE.phoneDisplay}
            </a>
            <a href={`mailto:${SITE.email}`} className="hover:text-grao-claro">
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

        <p className="border-t border-cerrado-800 pt-6 text-[13px]">
          © {new Date().getFullYear()} {SITE.fullName}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
