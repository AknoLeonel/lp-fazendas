import Link from "next/link";
import PageTopo from "../components/PageTopo";
import Footer from "../components/Footer";

export default function NotFound() {
  return (
    <>
      <main>
        <PageTopo etiqueta="Erro 404" titulo="Essa página não existe">
          <Link href="/" className="self-start rounded-lg bg-grao px-6 py-3 font-bold text-cerrado-900">
            Voltar ao início
          </Link>
        </PageTopo>
      </main>
      <Footer />
    </>
  );
}
