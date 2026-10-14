"use client";

import { useEffect } from "react";
import { captureAttribution, trackEvent } from "../lib/tracking";

/** Guarda a origem do clique (UTM/gclid) e dispara eventos de conversão no GTM. */
export default function Tracker() {
  useEffect(() => {
    captureAttribution();

    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a");
      if (!link) return;
      const label = link.getAttribute("data-track");
      if (link.href.startsWith("https://wa.me/")) {
        trackEvent("whatsapp_click", { origem: label ?? "link" });
      } else if (label) {
        trackEvent("cta_click", { origem: label });
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
