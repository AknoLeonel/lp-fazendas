"use client";

const STORAGE_KEY = "realiza_attribution";
const PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "gbraid",
  "wbraid",
] as const;

export type Attribution = Partial<Record<(typeof PARAMS)[number], string>> & {
  landing_page?: string;
  referrer?: string;
};

type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] };

/** Guarda UTM/gclid da primeira visita da sessão para anexar aos leads. */
export function captureAttribution(): void {
  try {
    const search = new URLSearchParams(window.location.search);
    const found: Attribution = {};
    for (const key of PARAMS) {
      const value = search.get(key);
      if (value) found[key] = value.slice(0, 200);
    }
    const hasNew = Object.keys(found).length > 0;
    if (!hasNew && sessionStorage.getItem(STORAGE_KEY)) return;
    found.landing_page = window.location.pathname;
    found.referrer = document.referrer.slice(0, 300) || undefined;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found));
  } catch {
    // storage indisponível (modo privado): segue sem atribuição
  }
}

export function getAttribution(): Attribution {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "{}") as Attribution;
  } catch {
    return {};
  }
}

export function trackEvent(
  event: string,
  data: Record<string, unknown> = {},
): void {
  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ event, ...data });
}
