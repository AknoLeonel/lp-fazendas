import "server-only";
import { list, put, del } from "@vercel/blob";
import { FAZENDAS_EXEMPLO, type Fazenda } from "./fazendas";

const CAMINHO = "realiza/fazendas.json";

export const storeConfigurado = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);

type Arquivo = { versao: 1; fazendas: Fazenda[] };

/**
 * Fonte dos dados: arquivo JSON no Vercel Blob. Enquanto o Blob não estiver
 * configurado, ou o arquivo ainda não existir, usa as fazendas de exemplo.
 */
export async function lerTodas(): Promise<Fazenda[]> {
  if (!storeConfigurado()) return FAZENDAS_EXEMPLO;
  try {
    const { blobs } = await list({ prefix: CAMINHO, limit: 1 });
    const arquivo = blobs.find((b) => b.pathname === CAMINHO);
    if (!arquivo) return FAZENDAS_EXEMPLO;
    const res = await fetch(arquivo.url, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`blob ${res.status}`);
    const dados = (await res.json()) as Arquivo;
    return Array.isArray(dados.fazendas) ? dados.fazendas : FAZENDAS_EXEMPLO;
  } catch (err) {
    console.error("[store] falha ao ler fazendas, usando exemplos", err);
    return FAZENDAS_EXEMPLO;
  }
}

export async function lerPublicadas(): Promise<Fazenda[]> {
  return (await lerTodas()).filter((f) => f.publicado);
}

export async function lerPorSlug(slug: string): Promise<Fazenda | undefined> {
  return (await lerPublicadas()).find((f) => f.slug === slug);
}

/** Lista para o painel: sem cache, para refletir o que acabou de ser salvo. */
export async function lerParaPainel(): Promise<Fazenda[]> {
  if (!storeConfigurado()) return FAZENDAS_EXEMPLO;
  const { blobs } = await list({ prefix: CAMINHO, limit: 1 });
  const arquivo = blobs.find((b) => b.pathname === CAMINHO);
  // Nada cadastrado ainda: o painel começa vazio (o site mostra exemplos até o primeiro cadastro).
  if (!arquivo) return [];
  const res = await fetch(`${arquivo.url}?t=${Date.now()}`, { cache: "no-store" });
  const dados = (await res.json()) as Arquivo;
  return dados.fazendas;
}

export async function salvarTodas(fazendas: Fazenda[]): Promise<void> {
  const corpo: Arquivo = { versao: 1, fazendas };
  await put(CAMINHO, JSON.stringify(corpo), {
    access: "public",
    allowOverwrite: true,
    addRandomSuffix: false,
    contentType: "application/json",
    cacheControlMaxAge: 60,
  });
}

export async function enviarImagem(nome: string, dados: Blob): Promise<string> {
  const limpo = nome.toLowerCase().replace(/[^a-z0-9.]+/g, "-").slice(0, 60) || "foto.jpg";
  const { url } = await put(`realiza/img/${Date.now()}-${limpo}`, dados, {
    access: "public",
    addRandomSuffix: true,
    contentType: dados.type || "image/jpeg",
  });
  return url;
}

export async function apagarImagens(urls: string[]): Promise<void> {
  const blobs = urls.filter((u) => u.includes(".public.blob.vercel-storage.com"));
  if (blobs.length > 0) await del(blobs).catch(() => undefined);
}
