import { APTIDOES, type Aptidao, type Fazenda } from "./fazendas";

const texto = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export function slugify(titulo: string): string {
  return titulo
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/** Lê números em formato brasileiro ("1.200", "1.200,5") ou decimal com ponto ("-45.19"). */
function numeroOuNull(v: unknown): number | null {
  if (v === null || v === undefined || v === "") return null;
  if (typeof v === "number") return Number.isFinite(v) ? v : NaN;
  const t = String(v).trim();
  let normal = t;
  if (t.includes(",")) normal = t.replace(/\./g, "").replace(",", ".");
  else if (/^-?\d{1,3}(\.\d{3})+$/.test(t)) normal = t.replace(/\./g, "");
  const n = Number(normal);
  return Number.isFinite(n) ? n : NaN;
}

const urlImagemValida = (src: string) =>
  src.startsWith("/") || /^https:\/\/[a-z0-9-]+\.public\.blob\.vercel-storage\.com\//.test(src);

export type Resultado = { ok: true; fazenda: Fazenda } | { ok: false; erro: string };

/** Valida e normaliza o que veio do painel. Nunca confia no cliente. */
export function validarFazenda(entrada: unknown, existentes: Fazenda[]): Resultado {
  if (typeof entrada !== "object" || entrada === null) return { ok: false, erro: "Dados inválidos." };
  const e = entrada as Record<string, unknown>;

  const titulo = texto(e.titulo, 120);
  const local = texto(e.local, 120);
  const descricao = texto(e.descricao, 1200);
  if (titulo.length < 3) return { ok: false, erro: "Informe o título." };
  if (local.length < 3) return { ok: false, erro: "Informe a localização (ex.: Oeste Baiano · BA)." };
  if (descricao.length < 10) return { ok: false, erro: "Escreva uma descrição." };

  const aptidao = texto(e.aptidao, 40) as Aptidao;
  if (!(aptidao in APTIDOES)) return { ok: false, erro: "Escolha a aptidão." };

  const hectares = numeroOuNull(e.hectares);
  if (hectares === null || Number.isNaN(hectares) || hectares <= 0 || hectares > 10_000_000)
    return { ok: false, erro: "Informe a área em hectares." };

  const precoPorHa = numeroOuNull(e.precoPorHa);
  if (precoPorHa !== null && (Number.isNaN(precoPorHa) || precoPorHa <= 0))
    return { ok: false, erro: "Valor por hectare inválido." };

  const lat = numeroOuNull(e.lat);
  const lng = numeroOuNull(e.lng);
  if (Number.isNaN(lat) || Number.isNaN(lng)) return { ok: false, erro: "Coordenadas inválidas." };
  if ((lat === null) !== (lng === null)) return { ok: false, erro: "Informe latitude e longitude." };
  if (lat !== null && lng !== null && (lat < -34 || lat > 6 || lng < -75 || lng > -32))
    return { ok: false, erro: "A coordenada está fora do Brasil. Confira o sinal (ex.: -11,05 e -45,19)." };

  const destaques = (Array.isArray(e.destaques) ? e.destaques : [])
    .map((d) => texto(d, 80))
    .filter(Boolean)
    .slice(0, 8);

  const imagens = (Array.isArray(e.imagens) ? e.imagens : [])
    .map((i) => {
      const o = (i ?? {}) as Record<string, unknown>;
      return { src: texto(o.src, 500), alt: texto(o.alt, 160) || titulo };
    })
    .filter((i) => i.src && urlImagemValida(i.src))
    .slice(0, 12);
  if (imagens.length === 0) return { ok: false, erro: "Envie pelo menos uma foto." };

  const slugAtual = texto(e.slug, 100);
  const ocupados = new Set(existentes.filter((f) => f.slug !== slugAtual).map((f) => f.slug));
  let slug = slugAtual || slugify(titulo);
  if (!slug) slug = `fazenda-${Date.now()}`;
  if (!slugAtual) {
    const base = slug;
    let n = 2;
    while (ocupados.has(slug)) slug = `${base}-${n++}`;
  }

  return {
    ok: true,
    fazenda: {
      slug,
      titulo,
      local,
      aptidao,
      aptidaoLabel: texto(e.aptidaoLabel, 40) || APTIDOES[aptidao].nome,
      hectares,
      precoPorHa,
      lat,
      lng,
      precisaoMapa: e.precisaoMapa === "exata" ? "exata" : "aproximada",
      descricao,
      destaques,
      imagens,
      publicado: e.publicado !== false,
      atualizadoEm: new Date().toISOString(),
    },
  };
}
