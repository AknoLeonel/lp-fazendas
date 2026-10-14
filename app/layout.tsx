import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import MobileCtaBar from "../components/MobileCtaBar";
import Tracker from "../components/Tracker";
import EsconderNoAdmin from "../components/EsconderNoAdmin";
import ConsentGTM from "../components/ConsentGTM";
import { SITE } from "../lib/site";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const title = "Venda de Fazendas & Regularização Fundiária | REALIZA Agro";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title,
  description:
    "Fazendas de alto padrão para agricultura, pecuária e compensação ambiental com documentação 100% regularizada. Fale com nossos especialistas.",
  keywords:
    "comprar fazenda, fazenda a venda, regularização fundiária, fazenda para pecuária, compensação ambiental",
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description:
      "Fazendas de alto padrão auditadas juridicamente. Clique para conferir o portfólio completo.",
    type: "website",
    locale: "pt_BR",
    siteName: SITE.fullName,
    url: "/",
    images: [{ url: "/hero.jpg", width: 1800, height: 1346, alt: "Vista aérea de fazenda" }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#12291c",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable}`}>
      <body className="antialiased selection:bg-grao selection:text-cerrado-900">
        <ConsentGTM />
        <Tracker />
        <EsconderNoAdmin>
          <Header />
        </EsconderNoAdmin>
        {children}
        <EsconderNoAdmin>
          <MobileCtaBar />
        </EsconderNoAdmin>
      </body>
    </html>
  );
}
