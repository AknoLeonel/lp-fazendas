import Hero from "../components/Hero";
import Confianca from "../components/Confianca";
import Aptidoes from "../components/Aptidoes";
import Consultoria from "../components/Consultoria";
import Vitrine from "../components/Vitrine";
import FaqAutoridade from "../components/FaqAutoridade";
import Footer from "../components/Footer";
import { SITE } from "../lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: SITE.fullName,
  url: SITE.url,
  telephone: `+${SITE.whatsapp}`,
  email: SITE.email,
  areaServed: "BR",
  description:
    "Venda de fazendas de alto potencial com documentação 100% regularizada para agricultura, pecuária e compensação ambiental.",
};

export default function Home() {
  return (
    <>
      <main className="flex flex-col bg-paper">
        <Hero />
        <Confianca />
        <Aptidoes />
        <Consultoria />
        <Vitrine />
        <FaqAutoridade />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
