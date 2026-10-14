"use client";

import { useState } from "react";
import FazendaCard from "./FazendaCard";
import { APTIDOES, type Aptidao, type Fazenda } from "../lib/fazendas";
import { trackEvent } from "../lib/tracking";

const ordenacoes = [
  { id: "relevancia", label: "Em destaque" },
  { id: "maior", label: "Maior área" },
  { id: "menor", label: "Menor área" },
] as const;

type Ordem = (typeof ordenacoes)[number]["id"];

export default function VitrineFiltro({ fazendas }: { fazendas: Fazenda[] }) {
  const [aptidao, setAptidao] = useState<Aptidao | "todas">("todas");
  const [ordem, setOrdem] = useState<Ordem>("relevancia");

  const lista = fazendas
    .filter((f) => aptidao === "todas" || f.aptidao === aptidao)
    .sort((a, b) =>
      ordem === "maior" ? b.hectares - a.hectares : ordem === "menor" ? a.hectares - b.hectares : 0,
    );

  const chip = (ativo: boolean) =>
    `min-h-11 rounded-full border px-4 text-sm font-semibold transition-colors ${
      ativo
        ? "border-cerrado-900 bg-cerrado-900 text-algodao"
        : "border-linha bg-algodao-claro text-tinta hover:border-cerrado-900"
    }`;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div role="group" aria-label="Filtrar por aptidão" className="flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={aptidao === "todas"}
            onClick={() => setAptidao("todas")}
            className={chip(aptidao === "todas")}
          >
            Todas
          </button>
          {(Object.keys(APTIDOES) as Aptidao[]).map((id) => (
            <button
              key={id}
              type="button"
              aria-pressed={aptidao === id}
              onClick={() => {
                setAptidao(id);
                trackEvent("filtro_aptidao", { aptidao: id });
              }}
              className={chip(aptidao === id)}
            >
              {APTIDOES[id].nome}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 text-sm font-semibold">
          Ordenar
          <select
            value={ordem}
            onChange={(e) => setOrdem(e.target.value as Ordem)}
            className="min-h-11 rounded-lg border border-linha bg-algodao-claro px-3 font-normal"
          >
            {ordenacoes.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="text-sm text-tinta-suave" aria-live="polite">
        {lista.length} {lista.length === 1 ? "fazenda encontrada" : "fazendas encontradas"}
      </p>

      {lista.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 md:gap-7 lg:grid-cols-3">
          {lista.map((f) => (
            <FazendaCard key={f.slug} fazenda={f} />
          ))}
        </div>
      ) : (
        <p className="rounded-xl bg-areia p-8 text-center text-tinta-suave">
          Nenhuma fazenda nessa aptidão agora. Fale com um especialista: temos
          áreas que ainda não estão na vitrine.
        </p>
      )}
    </div>
  );
}
