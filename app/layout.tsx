import type { Metadata, Viewport } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import Header from "../components/Header";
import MobileCtaBar from "../components/MobileCtaBar";
import Tracker from "../components/Tracker";
import { GTM_ID, SITE } from "../lib/site";

const display = Fraunces({
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
  themeColor: "#0d1a12",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable}`}>
      <body className="antialiased selection:bg-gold selection:text-forest-900">
        {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
        <Tracker />
        <Header />
        {children}
        <MobileCtaBar />
      </body>
    </html>
  );
}
