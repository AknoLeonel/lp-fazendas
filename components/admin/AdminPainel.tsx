"use client";

import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { APTIDOES, formatHa, type Aptidao, type Fazenda, type Imagem } from "../../lib/fazendas";

type Form = {
  slug: string;
  titulo: string;
  local: string;
  aptidao: Aptidao;
  aptidaoLabel: string;
  hectares: string;
  precoPorHa: string;
  coordenadas: string;
  lat: string;
  lng: string;
  precisaoMapa: "aproximada" | "exata";
  descricao: string;
  destaques: string;
  imagens: Imagem[];
  publicado: boolean;
};

const VAZIO: Form = {
  slug: "",
  titulo: "",
  local: "",
  aptidao: "agricultura",
  aptidaoLabel: "",
  hectares: "",
  precoPorHa: "",
  coordenadas: "",
  lat: "",
  lng: "",
  precisaoMapa: "aproximada",
  descricao: "",
  destaques: "",
  imagens: [],
  publicado: true,
};

const campo = "min-h-12 w-full rounded-lg border border-linha bg-white px-4 py-3 text-base font-normal";
const rotulo = "flex flex-col gap-1.5 text-sm font-semibold";

function paraForm(f: Fazenda): Form {
  return {
    slug: f.slug,
    titulo: f.titulo,
    local: f.local,
    aptidao: f.aptidao,
    aptidaoLabel: f.aptidaoLabel,
    hectares: String(f.hectares),
    precoPorHa: f.precoPorHa === null ? "" : String(f.precoPorHa),
    coordenadas: "",
    lat: f.lat === null ? "" : String(f.lat),
    lng: f.lng === null ? "" : String(f.lng),
    precisaoMapa: f.precisaoMapa,
    descricao: f.descricao,
    destaques: f.destaques.join("\n"),
    imagens: f.imagens,
    publicado: f.publicado,
  };
}

/** Aceita "-11.0486, -45.1936" (copiado do Google Maps) e preenche latitude e longitude. */
function lerCoordenadas(texto: string): { lat: string; lng: string } | null {
  const m = texto.match(/(-?\d+(?:[.,]\d+)?)\s*[,;\s]\s*(-?\d+(?:[.,]\d+)?)/);
  if (!m) return null;
  return { lat: m[1].replace(",", "."), lng: m[2].replace(",", ".") };
}

/** Reduz a foto antes de enviar: fotos de drone passam de 10 MB. */
async function reduzirFoto(arquivo: File): Promise<File> {
  const bitmap = await createImageBitmap(arquivo);
  const escala = Math.min(1, 1800 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * escala);
  canvas.height = Math.round(bitmap.height * escala);
  canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/jpeg", 0.8));
  if (!blob) throw new Error("Não foi possível processar a foto.");
  return new File([blob], arquivo.name.replace(/\.[^.]+$/, "") + ".jpg", { type: "image/jpeg" });
}

export default function AdminPainel({
  inicial,
  storeConfigurado,
}: {
  inicial: Fazenda[];
  storeConfigurado: boolean;
}) {
  const router = useRouter();
  const [fazendas, setFazendas] = useState(inicial);
  const [form, setForm] = useState<Form | null>(null);
  const [msg, setMsg] = useState<{ tipo: "ok" | "erro"; texto: string } | null>(null);
  const [salvando, setSalvando] = useState(false);
  const [enviandoFotos, setEnviandoFotos] = useState(false);
  const topo = useRef<HTMLDivElement>(null);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => (f ? { ...f, [k]: v } : f));

  async function recarregar() {
    const res = await fetch("/api/admin/fazendas");
    if (res.ok) setFazendas((await res.json()).fazendas);
    router.refresh();
  }

  async function sair() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.refresh();
  }

  async function enviarFotos(arquivos: FileList | null) {
    if (!arquivos || arquivos.length === 0 || !form) return;
    setEnviandoFotos(true);
    setMsg(null);
    try {
      const novas: Imagem[] = [];
      for (const original of Array.from(arquivos)) {
        const arquivo = await reduzirFoto(original);
        const dados = new FormData();
        dados.append("arquivo", arquivo);
        const res = await fetch("/api/admin/upload", { method: "POST", body: dados });
        const corpo = await res.json();
        if (!res.ok) throw new Error(corpo.erro ?? "Falha no envio.");
        novas.push({ src: corpo.url, alt: "" });
      }
      setForm((f) => (f ? { ...f, imagens: [...f.imagens, ...novas] } : f));
    } catch (e) {
      setMsg({ tipo: "erro", texto: e instanceof Error ? e.message : "Falha no envio da foto." });
    }
    setEnviandoFotos(false);
  }

  function moverFoto(i: number, d: -1 | 1) {
    setForm((f) => {
      if (!f) return f;
      const j = i + d;
      if (j < 0 || j >= f.imagens.length) return f;
      const imagens = [...f.imagens];
      [imagens[i], imagens[j]] = [imagens[j], imagens[i]];
      return { ...f, imagens };
    });
  }

  async function salvar(e: FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSalvando(true);
    setMsg(null);
    const res = await fetch("/api/admin/fazendas", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        destaques: form.destaques.split("\n"),
        imagens: form.imagens.map((i) => ({ ...i, alt: i.alt || form.titulo })),
      }),
    }).catch(() => null);
    const corpo = await res?.json().catch(() => ({}));
    setSalvando(false);
    if (!res?.ok) {
      setMsg({ tipo: "erro", texto: corpo?.erro ?? "Não foi possível salvar." });
      return;
    }
    setMsg({ tipo: "ok", texto: "Salvo! O site já foi atualizado." });
    setForm(null);
    await recarregar();
    topo.current?.scrollIntoView({ behavior: "smooth" });
  }

  async function excluir(f: Fazenda) {
    if (!confirm(`Excluir "${f.titulo}"? Isso apaga também as fotos.`)) return;
    const res = await fetch(`/api/admin/fazendas?slug=${encodeURIComponent(f.slug)}`, { method: "DELETE" });
    if (!res.ok) {
      setMsg({ tipo: "erro", texto: (await res.json().catch(() => ({}))).erro ?? "Não foi possível excluir." });
      return;
    }
    setMsg({ tipo: "ok", texto: "Fazenda excluída." });
    await recarregar();
  }

  async function alternarPublicacao(f: Fazenda) {
    const res = await fetch("/api/admin/fazendas", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...f, publicado: !f.publicado }),
    });
    if (!res.ok) {
      setMsg({ tipo: "erro", texto: (await res.json().catch(() => ({}))).erro ?? "Não foi possível alterar." });
      return;
    }
    await recarregar();
  }

  return (
    <div ref={topo} className="flex flex-col gap-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl font-bold tracking-tight">Fazendas cadastradas</h1>
        <div className="flex gap-2">
          <a href="/" target="_blank" className="flex min-h-11 items-center rounded-lg border border-cerrado-900 px-4 font-semibold">
            Ver o site
          </a>
          <button type="button" onClick={sair} className="min-h-11 rounded-lg border border-linha bg-algodao-claro px-4 font-semibold">
            Sair
          </button>
        </div>
      </header>

      {!storeConfigurado && (
        <p role="alert" className="rounded-xl border border-terra/40 bg-algodao-claro p-4 text-sm leading-relaxed">
          <strong>Armazenamento não configurado.</strong> Na Vercel, abra o projeto, vá em Storage, crie um Blob store{" "}
          <strong>público</strong> e conecte ao projeto (isso cria <code>BLOB_READ_WRITE_TOKEN</code>). Publique de novo e
          volte aqui. Enquanto isso, você só vê as fazendas de exemplo e não consegue salvar.
        </p>
      )}

      {fazendas.length === 0 && storeConfigurado && (
        <p className="rounded-xl bg-algodao-claro p-4 text-sm">
          Nenhuma fazenda cadastrada ainda. Enquanto estiver vazio, o site mostra fazendas de exemplo. Ao publicar a
          primeira, os exemplos saem do ar.
        </p>
      )}

      {msg && (
        <p role="status" className={`rounded-lg p-3 text-sm font-semibold ${msg.tipo === "ok" ? "bg-[#e1eddc] text-folha-escura" : "bg-red-50 text-red-800"}`}>
          {msg.texto}
        </p>
      )}

      {!form && (
        <button
          type="button"
          onClick={() => {
            setMsg(null);
            setForm(VAZIO);
          }}
          className="min-h-13 self-start rounded-lg bg-grao px-6 font-bold text-cerrado-900"
        >
          + Cadastrar fazenda
        </button>
      )}

      {form && (
        <form onSubmit={salvar} className="flex flex-col gap-5 rounded-xl border border-linha bg-algodao-claro p-5 md:p-8">
          <h2 className="font-display text-2xl font-bold">{form.slug ? "Editar fazenda" : "Nova fazenda"}</h2>

          <label className={rotulo}>
            Título
            <input className={campo} value={form.titulo} onChange={(e) => set("titulo", e.target.value)} placeholder="Ex.: Fazenda Boa Vista · 1.200 ha" required />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className={rotulo}>
              Localização
              <input className={campo} value={form.local} onChange={(e) => set("local", e.target.value)} placeholder="Ex.: Oeste Baiano · BA" required />
            </label>
            <label className={rotulo}>
              Aptidão
              <select className={campo} value={form.aptidao} onChange={(e) => set("aptidao", e.target.value as Aptidao)}>
                {(Object.keys(APTIDOES) as Aptidao[]).map((a) => (
                  <option key={a} value={a}>
                    {APTIDOES[a].nome}
                  </option>
                ))}
              </select>
            </label>
            <label className={rotulo}>
              Etiqueta no card (opcional)
              <input className={campo} value={form.aptidaoLabel} onChange={(e) => set("aptidaoLabel", e.target.value)} placeholder="Ex.: Dupla aptidão" />
            </label>
            <label className={rotulo}>
              Área (hectares)
              <input className={campo} inputMode="decimal" value={form.hectares} onChange={(e) => set("hectares", e.target.value)} placeholder="1200" required />
            </label>
            <label className={rotulo}>
              Valor por hectare em R$ (vazio = sob consulta)
              <input className={campo} inputMode="decimal" value={form.precoPorHa} onChange={(e) => set("precoPorHa", e.target.value)} placeholder="30000" />
            </label>
          </div>

          <fieldset className="flex flex-col gap-3 rounded-lg border border-linha p-4">
            <legend className="px-1 text-sm font-semibold">Localização no mapa</legend>
            <label className={rotulo}>
              Cole a coordenada do Google Maps (clique com o botão direito no local)
              <input
                className={campo}
                value={form.coordenadas}
                onChange={(e) => {
                  const v = e.target.value;
                  const c = lerCoordenadas(v);
                  setForm((f) => (f ? { ...f, coordenadas: v, ...(c ?? {}) } : f));
                }}
                placeholder="-11.0486, -45.1936"
              />
            </label>
            <div className="grid gap-4 md:grid-cols-2">
              <label className={rotulo}>
                Latitude
                <input className={campo} inputMode="decimal" value={form.lat} onChange={(e) => set("lat", e.target.value)} placeholder="-11.0486" />
              </label>
              <label className={rotulo}>
                Longitude
                <input className={campo} inputMode="decimal" value={form.lng} onChange={(e) => set("lng", e.target.value)} placeholder="-45.1936" />
              </label>
            </div>
            <label className={rotulo}>
              Como mostrar no site
              <select className={campo} value={form.precisaoMapa} onChange={(e) => set("precisaoMapa", e.target.value as Form["precisaoMapa"])}>
                <option value="aproximada">Região aproximada (recomendado: protege o sigilo)</option>
                <option value="exata">Ponto exato</option>
              </select>
            </label>
            <p className="text-xs text-tinta-suave">Sem coordenada, a fazenda aparece no site mas não no mapa.</p>
          </fieldset>

          <label className={rotulo}>
            Descrição
            <textarea className={`${campo} min-h-28`} value={form.descricao} onChange={(e) => set("descricao", e.target.value)} required />
          </label>

          <label className={rotulo}>
            Destaques (um por linha)
            <textarea className={`${campo} min-h-24`} value={form.destaques} onChange={(e) => set("destaques", e.target.value)} placeholder={"Topografia plana\nBeira de rodovia"} />
          </label>

          <div className="flex flex-col gap-3">
            <span className="text-sm font-semibold">Fotos (a primeira é a capa)</span>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              disabled={enviandoFotos}
              onChange={(e) => {
                enviarFotos(e.target.files);
                e.target.value = "";
              }}
              className="text-sm"
            />
            {enviandoFotos && <p className="text-sm">Reduzindo e enviando fotos...</p>}
            <ul className="grid gap-3 sm:grid-cols-2">
              {form.imagens.map((img, i) => (
                <li key={img.src} className="flex gap-3 rounded-lg border border-linha bg-white p-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.src} alt="" className="size-20 shrink-0 rounded object-cover" />
                  <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                    <input
                      aria-label={`Descrição da foto ${i + 1}`}
                      className="min-h-10 w-full rounded border border-linha px-2 text-sm"
                      placeholder="Descreva a foto (acessibilidade)"
                      value={img.alt}
                      onChange={(e) =>
                        setForm((f) => (f ? { ...f, imagens: f.imagens.map((x, k) => (k === i ? { ...x, alt: e.target.value } : x)) } : f))
                      }
                    />
                    <div className="flex gap-1.5 text-xs">
                      <button type="button" onClick={() => moverFoto(i, -1)} disabled={i === 0} className="min-h-9 rounded border border-linha px-2 disabled:opacity-40">
                        ← Antes
                      </button>
                      <button type="button" onClick={() => moverFoto(i, 1)} disabled={i === form.imagens.length - 1} className="min-h-9 rounded border border-linha px-2 disabled:opacity-40">
                        Depois →
                      </button>
                      <button
                        type="button"
                        onClick={() => setForm((f) => (f ? { ...f, imagens: f.imagens.filter((_, k) => k !== i) } : f))}
                        className="min-h-9 rounded border border-red-300 px-2 text-red-800"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <label className="flex items-center gap-3 text-sm font-semibold">
            <input type="checkbox" className="size-5" checked={form.publicado} onChange={(e) => set("publicado", e.target.checked)} />
            Publicada no site
          </label>

          <div className="flex flex-wrap gap-3">
            <button type="submit" disabled={salvando || enviandoFotos} className="min-h-13 rounded-lg bg-cerrado-900 px-8 font-bold text-algodao disabled:opacity-50">
              {salvando ? "Salvando..." : "Salvar e publicar"}
            </button>
            <button type="button" onClick={() => setForm(null)} className="min-h-13 rounded-lg border border-linha px-6 font-semibold">
              Cancelar
            </button>
          </div>
        </form>
      )}

      <ul className="flex flex-col gap-3">
        {fazendas.map((f) => (
          <li key={f.slug} className="flex flex-wrap items-center gap-4 rounded-xl border border-linha bg-algodao-claro p-3 md:p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={f.imagens[0]?.src} alt="" className="h-16 w-24 shrink-0 rounded object-cover" />
            <div className="min-w-0 flex-1 basis-56">
              <p className="font-display text-lg font-bold leading-tight">{f.titulo}</p>
              <p className="text-sm text-tinta-suave">
                {f.local} · {formatHa(f.hectares)} ·{" "}
                <span className={f.publicado ? "font-semibold text-folha-escura" : "font-semibold text-terra"}>
                  {f.publicado ? "Publicada" : "Rascunho"}
                </span>
                {f.lat === null && " · sem mapa"}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-sm">
              <a href={`/fazendas/${f.slug}`} target="_blank" className="flex min-h-11 items-center rounded-lg border border-linha px-3 font-semibold">
                Ver
              </a>
              <button type="button" onClick={() => { setMsg(null); setForm(paraForm(f)); topo.current?.scrollIntoView({ behavior: "smooth" }); }} className="min-h-11 rounded-lg border border-linha px-3 font-semibold">
                Editar
              </button>
              <button type="button" onClick={() => alternarPublicacao(f)} className="min-h-11 rounded-lg border border-linha px-3 font-semibold">
                {f.publicado ? "Despublicar" : "Publicar"}
              </button>
              <button type="button" onClick={() => excluir(f)} className="min-h-11 rounded-lg border border-red-300 px-3 font-semibold text-red-800">
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
