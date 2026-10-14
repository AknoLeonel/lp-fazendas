import Hero from "../components/Hero";
import Confianca from "../components/Confianca";
import Aptidoes from "../components/Aptidoes";
import Auditoria from "../components/Auditoria";
import OesteBaiano from "../components/OesteBaiano";
import Vitrine from "../components/Vitrine";
import SecaoMapa from "../components/SecaoMapa";
import Simulador from "../components/Simulador";
import Faq, { FAQS } from "../components/Faq";
import CtaFinal from "../components/CtaFinal";
import Footer from "../components/Footer";
import { SITE } from "../lib/site";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: SITE.fullName,
    url: SITE.url,
    telephone: `+${SITE.whatsapp}`,
    email: SITE.email,
    areaServed: "BR",
    address: { "@type": "PostalAddress", addressLocality: "Formosa do Rio Preto", addressRegion: "BA", addressCountry: "BR" },
    description:
      "Venda de fazendas de alto potencial com documentação 100% regularizada para agricultura, pecuária e compensação ambiental.",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.pergunta,
      acceptedAnswer: { "@type": "Answer", text: f.resposta },
    })),
  },
];

export default function Home() {
  return (
    <>
      <main className="flex flex-col bg-algodao">
        <Hero />
        <Confianca />
        <Aptidoes />
        <Auditoria />
        <OesteBaiano />
        <Vitrine />
        <SecaoMapa />
        <Simulador />
        <Faq />
        <CtaFinal />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
