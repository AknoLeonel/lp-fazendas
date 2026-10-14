"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GoogleTagManager } from "@next/third-parties/google";
import { GTM_ID } from "../lib/site";

const KEY = "realiza_cookies";
const EVENTO = "realiza-cookies-change";

type Escolha = "aceito" | "recusado" | "pendente";

function subscribe(callback: () => void) {
  window.addEventListener(EVENTO, callback);
  return () => window.removeEventListener(EVENTO, callback);
}

function lerEscolha(): Escolha {
  try {
    const v = localStorage.getItem(KEY);
    return v === "aceito" || v === "recusado" ? v : "pendente";
  } catch {
    return "pendente";
  }
}

// No servidor (e na hidratação) não mostramos nada, para evitar piscar o banner.
const escolhaNoServidor = (): Escolha | "carregando" => "carregando";

/**
 * Banner de cookies (LGPD). O Google Tag Manager só carrega depois que o
 * visitante aceita; quem recusa não é rastreado.
 */
export default function ConsentGTM() {
  const escolha = useSyncExternalStore(subscribe, lerEscolha, escolhaNoServidor);
  const noAdmin = usePathname()?.startsWith("/admin");

  function decidir(valor: "aceito" | "recusado") {
    try {
      localStorage.setItem(KEY, valor);
    } catch {
      // sem storage: a escolha vale só até recarregar
    }
    window.dispatchEvent(new Event(EVENTO));
  }

  return (
    <>
      {GTM_ID && escolha === "aceito" && <GoogleTagManager gtmId={GTM_ID} />}
      {escolha === "pendente" && !noAdmin && (
        <div
          role="dialog"
          aria-label="Aviso de cookies"
          className="fixed inset-x-3 bottom-20 z-[60] mx-auto flex max-w-3xl flex-col gap-3 rounded-xl border border-linha bg-algodao-claro p-4 text-sm text-tinta shadow-2xl md:bottom-6 md:flex-row md:items-center md:gap-6 md:p-5"
        >
          <p className="flex-1 leading-relaxed text-tinta-suave">
            Usamos cookies para medir o desempenho do site e melhorar os
            anúncios. Veja a{" "}
            <Link href="/politica-de-privacidade" className="font-semibold underline">
              política de privacidade
            </Link>
            .
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => decidir("recusado")}
              className="min-h-11 flex-1 rounded-lg border border-linha px-4 font-semibold md:flex-none"
            >
              Recusar
            </button>
            <button
              type="button"
              onClick={() => decidir("aceito")}
              className="min-h-11 flex-1 rounded-lg bg-cerrado-900 px-4 font-bold text-algodao md:flex-none"
            >
              Aceitar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
