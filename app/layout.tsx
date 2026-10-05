import type { Metadata } from "next";
import { GoogleTagManager } from '@next/third-parties/google';
import "./globals.css";
import Header from "../components/Header";
import WhatsAppButton from "../components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Venda de Fazendas & Regularização Fundiária | REALIZA Agro",
  description: "Fazendas de alto padrão para agricultura, pecuária e compensação ambiental com documentação 100% regularizada. Fale com nossos especialistas.",
  keywords: "comprar fazenda, fazenda a venda, regularização fundiária, fazenda para pecuária, compensação ambiental",
  openGraph: {
    title: "Venda de Fazendas & Regularização Fundiária | REALIZA Agro",
    description: "Fazendas de alto padrão auditadas juridicamente. Clique para conferir o portfólio completo.",
    type: "website",
    locale: "pt_BR",
    siteName: "REALIZA Agro",
    // url: "https://www.seudominio.com.br", // Atualizar quando publicar
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className="antialiased selection:bg-green-500 selection:text-white">
        <Header />
        
        {/* Um padding top (pt-20) é necessário no conteúdo principal porque o Header é fixo */}
        <div className="pt-20">
          {children}
        </div>
        
        <WhatsAppButton />
      </body>
      
      {/* TODO: substituir 'GTM-XXXXXXX' pelo ID do Google Tag Manager da Realiza Agro */}
      <GoogleTagManager gtmId="GTM-XXXXXXX" />
    </html>
  );
}