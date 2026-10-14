import type { Metadata } from "next";
import PageTopo from "../../components/PageTopo";
import Footer from "../../components/Footer";
import { SITE } from "../../lib/site";

export const metadata: Metadata = {
  title: "Política de privacidade | REALIZA Agro",
  robots: { index: true, follow: true },
  alternates: { canonical: "/politica-de-privacidade" },
};

export default function Privacidade() {
  return (
    <>
      <main>
        <PageTopo etiqueta="LGPD" titulo="Política de privacidade" />
        <article className="px-5 py-12 md:px-16 md:py-16">
          <div className="mx-auto flex max-w-[760px] flex-col gap-5 text-base leading-relaxed text-tinta-suave">
            <p>
              {/* TODO: revisar este texto com o jurídico da Realiza Agro antes de publicar. */}
              A {SITE.fullName} trata seus dados pessoais conforme a Lei Geral de Proteção de Dados (Lei 13.709/2018).
            </p>
            <h2 className="font-display text-2xl font-bold text-tinta">Quais dados coletamos</h2>
            <p>
              Nome, telefone/WhatsApp e o tipo de fazenda de seu interesse, informados por você no formulário. Também
              registramos a origem da visita (por exemplo, o anúncio em que você clicou) e dados de navegação, caso você
              aceite os cookies.
            </p>
            <h2 className="font-display text-2xl font-bold text-tinta">Para que usamos</h2>
            <p>
              Para entrar em contato sobre as fazendas, enviar o dossiê solicitado e medir o desempenho dos nossos
              anúncios. Não vendemos seus dados.
            </p>
            <h2 className="font-display text-2xl font-bold text-tinta">Cookies</h2>
            <p>
              Só carregamos ferramentas de medição (Google Tag Manager) depois que você aceita. Se recusar, o site
              funciona normalmente, sem rastreamento.
            </p>
            <h2 className="font-display text-2xl font-bold text-tinta">Seus direitos</h2>
            <p>
              Você pode pedir acesso, correção ou exclusão dos seus dados a qualquer momento pelo e-mail{" "}
              <a href={`mailto:${SITE.email}`} className="font-semibold underline">
                {SITE.email}
              </a>
              .
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
