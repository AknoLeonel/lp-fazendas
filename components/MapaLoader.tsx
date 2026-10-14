"use client";

import dynamic from "next/dynamic";
import type { PontoMapa } from "./MapaFazendas";

// Leaflet usa `window`, então o mapa só é carregado no navegador.
const Mapa = dynamic(() => import("./MapaFazendas"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[420px] w-full items-center justify-center rounded-xl bg-areia text-tinta-suave md:h-[560px]">
      Carregando mapa...
    </div>
  ),
});

export default function MapaLoader({ pontos }: { pontos: PontoMapa[] }) {
  return <Mapa pontos={pontos} />;
}
