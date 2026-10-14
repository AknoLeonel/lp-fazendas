import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Hero from "../../../components/Hero";
import Confianca from "../../../components/Confianca";
import Vitrine from "../../../components/Vitrine";
import Simulador from "../../../components/Simulador";
import Auditoria from "../../../components/Auditoria";
import Faq from "../../../components/Faq";
import CtaFinal from "../../../components/CtaFinal";
import Footer from "../../../components/Footer";
import { APTIDOES, type Aptidao } from "../../../lib/fazendas";

// Páginas de campanha: um destino específico para cada grupo de anúncios.
const PAGINAS: Record<
  Aptidao,
  {
    metaTitulo: string;
    metaDescricao: string;
    etiqueta: string;
    titulo: React.ReactNode;
    subtitulo: string;
    imagem: string;
    alt: string;
    aptidaoInicial: string;
    simulador: boolean;
  }
> = {
  agricultura: {
    metaTitulo: "Fazendas para Agricultura no Oeste Baiano | REALIZA Agro",
    metaDescricao:
      "Fazendas planas para soja, milho e algodão, com logística facilitada e documentação 100% auditada. Fale com um especialista.",
    etiqueta: "Fazendas para agricultura",
    titulo: (
      <>
        Terra plana para safra grande.{" "}
        <span className="text-grao">Documentação 100% regularizada.</span>
      </>
    ),
    subtitulo:
      "Áreas de topografia plana, boa pluviosidade e logística facilitada para soja, milho e algodão, auditadas antes de chegar até você.",
    imagem: "/fazenda-3.jpg",
    alt: "Área extensa de cerrado com rodovia e rio ao fundo",
    aptidaoInicial: "Agricultura",
    simulador: true,
  },
  pecuaria: {
    metaTitulo: "Fazendas para Pecuária de Corte | REALIZA Agro",
    metaDescricao:
      "Fazendas formadas em pastagem, com água e curralama, prontas para lotação e com documentação auditada. Fale com um especialista.",
    etiqueta: "Fazendas para pecuária",
    titulo: (
      <>
        Pasto formado, água e curral.{" "}
        <span className="text-grao">Pronta para lotar.</span>
      </>
    ),
    subtitulo:
      "Fazendas estruturadas para corte, cria e recria, com documentação auditada e sigilo em toda a negociação.",
    imagem: "/fazenda-2.jpg",
    alt: "Sede de fazenda com curral e estrada de terra",
    aptidaoInicial: "Pecuária",
    simulador: true,
  },
  "compensacao-ambiental": {
    metaTitulo: "Áreas para Compensação Ambiental e Reserva Legal | REALIZA Agro",
    metaDescricao:
      "Áreas de vegetação nativa com CAR e georreferenciamento em dia para regularizar passivo ambiental. Fale com um especialista.",
    etiqueta: "Compensação ambiental",
    titulo: (
      <>
        Regularize seu passivo ambiental{" "}
        <span className="text-grao">com área 100% documentada.</span>
      </>
    ),
    subtitulo:
      "Vegetação nativa preservada, com matrícula, CAR e georreferenciamento auditados para compensação de Reserva Legal.",
    imagem: "/fazenda-1.jpg",
    alt: "Mata nativa preservada com área alagada e rio",
    aptidaoInicial: "Compensação ambiental",
    simulador: false,
  },
};

export function generateStaticParams() {
  return (Object.keys(PAGINAS) as Aptidao[]).map((aptidao) => ({ aptidao }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ aptidao: string }>;
}): Promise<Metadata> {
  const { aptidao } = await params;
  const p = PAGINAS[aptidao as Aptidao];
  if (!p) return {};
  return {
    title: p.metaTitulo,
    description: p.metaDescricao,
    alternates: { canonical: `/lp/${aptidao}` },
  };
}

export default async function CampanhaPage({
  params,
}: {
  params: Promise<{ aptidao: string }>;
}) {
  const { aptidao } = await params;
  const p = PAGINAS[aptidao as Aptidao];
  if (!p) notFound();
  const id = aptidao as Aptidao;

  return (
    <>
      <main className="flex flex-col bg-algodao">
        <Hero
          etiqueta={p.etiqueta}
          titulo={p.titulo}
          subtitulo={p.subtitulo}
          imagem={p.imagem}
          alt={p.alt}
          aptidaoInicial={p.aptidaoInicial}
        />
        <Confianca />
        <Vitrine
          aptidao={id}
          titulo={`${APTIDOES[id].nome}: oportunidades auditadas`}
          exibirChacaras={false}
        />
        {p.simulador && <Simulador />}
        <Auditoria />
        <Faq />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
