"use client";

import { useEffect } from "react";
import Link from "next/link";
import L from "leaflet";
import { Circle, MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export type PontoMapa = {
  slug: string;
  titulo: string;
  local: string;
  aptidao: string;
  aptidaoLabel: string;
  hectares: number;
  lat: number;
  lng: number;
  aproximada: boolean;
  capaSrc: string;
};

export const COR_APTIDAO: Record<string, string> = {
  agricultura: "#e3a72f",
  pecuaria: "#a94a25",
  "compensacao-ambiental": "#2f6b3a",
};

// Raio da área mostrada quando a localização é aproximada (protege o sigilo).
const RAIO_APROXIMADO_M = 12_000;

function icone(cor: string) {
  return L.divIcon({
    className: "",
    iconSize: [30, 38],
    iconAnchor: [15, 36],
    popupAnchor: [0, -32],
    html: `<svg width="30" height="38" viewBox="0 0 30 38" aria-hidden="true"><path d="M15 1C7.3 1 1 7.2 1 14.8 1 25 15 37 15 37s14-12 14-22.2C29 7.2 22.7 1 15 1z" fill="${cor}" stroke="#12291c" stroke-width="2"/><circle cx="15" cy="15" r="5" fill="#12291c"/></svg>`,
  });
}

function Ajustar({ pontos }: { pontos: PontoMapa[] }) {
  const map = useMap();
  useEffect(() => {
    if (pontos.length === 0) return;
    if (pontos.length === 1) {
      map.setView([pontos[0].lat, pontos[0].lng], 8);
      return;
    }
    map.fitBounds(L.latLngBounds(pontos.map((p) => [p.lat, p.lng] as [number, number])), {
      padding: [48, 48],
      maxZoom: 9,
    });
  }, [map, pontos]);
  return null;
}

export default function MapaFazendas({ pontos }: { pontos: PontoMapa[] }) {
  // No celular o mapa não captura o arrasto, para não prender a rolagem da página.
  const arrastar = typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches;

  return (
    <MapContainer
      center={[-13.5, -47]}
      zoom={5}
      scrollWheelZoom={false}
      dragging={arrastar}
      className="z-0 h-[420px] w-full rounded-xl border border-linha md:h-[560px]"
      aria-label="Mapa com a localização das fazendas"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Ajustar pontos={pontos} />
      {pontos.map((p) => {
        const cor = COR_APTIDAO[p.aptidao] ?? "#e3a72f";
        return (
          <span key={p.slug}>
            {p.aproximada && (
              <Circle
                center={[p.lat, p.lng]}
                radius={RAIO_APROXIMADO_M}
                pathOptions={{ color: cor, weight: 2, fillColor: cor, fillOpacity: 0.18 }}
              />
            )}
            <Marker position={[p.lat, p.lng]} icon={icone(cor)} title={p.titulo}>
              <Popup minWidth={220}>
                <div className="flex flex-col gap-1.5 font-sans">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.capaSrc} alt="" className="h-24 w-full rounded object-cover" />
                  <strong className="font-display text-base leading-tight">{p.titulo}</strong>
                  <span className="text-xs text-tinta-suave">
                    {p.local} · {p.aptidaoLabel} · {p.hectares.toLocaleString("pt-BR")} ha
                  </span>
                  {p.aproximada && (
                    <span className="text-[11px] text-tinta-suave">Localização aproximada.</span>
                  )}
                  <Link href={`/fazendas/${p.slug}`} className="text-sm font-bold text-folha underline">
                    Ver fazenda →
                  </Link>
                </div>
              </Popup>
            </Marker>
          </span>
        );
      })}
    </MapContainer>
  );
}
