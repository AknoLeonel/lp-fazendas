import type { Metadata } from "next";
import PageTopo from "../../components/PageTopo";
import VitrineFiltro from "../../components/VitrineFiltro";
import SecaoMapa from "../../components/SecaoMapa";
import CtaFinal from "../../components/CtaFinal";
import Footer from "../../components/Footer";
import { lerPublicadas } from "../../lib/store";

export const metadata: Metadata = {
  title: "Fazendas à venda | REALIZA Agro",
  description:
    "Fazendas para agricultura, pecuária e compensação ambiental com documentação auditada. Filtre por aptidão e veja o dossiê de cada área.",
  alternates: { canonical: "/fazendas" },
};

export default async function FazendasPage() {
  const fazendas = await lerPublicadas();
  return (
    <>
      <main>
        <PageTopo etiqueta="Vitrine" titulo="Fazendas à venda, todas auditadas pelo jurídico">
          <p className="max-w-2xl text-base leading-relaxed text-algodao/75 md:text-lg">
            Filtre por aptidão e abra o dossiê de cada área antes de falar com a gente.
          </p>
        </PageTopo>
        <section className="px-5 py-10 md:px-16 md:py-16">
          <div className="mx-auto max-w-[1312px]">
            <VitrineFiltro fazendas={fazendas} />
          </div>
        </section>
        <SecaoMapa compacta />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
