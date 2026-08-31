import Hero from "../components/Hero";
import Aptidoes from "../components/Aptidoes";
import Consultoria from "../components/Consultoria";
import Vitrine from "../components/Vitrine";
import FaqAutoridade from "../components/FaqAutoridade";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-slate-50">
      <Hero />
      <Aptidoes />
      <Consultoria />
      <Vitrine />
      <FaqAutoridade />
      <Footer />
    </main>
  );
}