import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { estaLogado } from "../../../../lib/admin-auth";
import { apagarImagens, lerParaPainel, salvarTodas, storeConfigurado } from "../../../../lib/store";
import { validarFazenda } from "../../../../lib/validacao";

const naoAutorizado = () => NextResponse.json({ erro: "Entre no painel novamente." }, { status: 401 });
const semStore = () =>
  NextResponse.json({ erro: "Armazenamento não configurado (BLOB_READ_WRITE_TOKEN)." }, { status: 503 });

function atualizarSite() {
  revalidatePath("/", "layout");
}

export async function GET() {
  if (!(await estaLogado())) return naoAutorizado();
  return NextResponse.json({ fazendas: await lerParaPainel(), storeConfigurado: storeConfigurado() });
}

/** Cria ou atualiza uma fazenda (identificada pelo slug). */
export async function PUT(request: Request) {
  if (!(await estaLogado())) return naoAutorizado();
  if (!storeConfigurado()) return semStore();

  const corpo = await request.json().catch(() => null);
  const todas = await lerParaPainel();
  const r = validarFazenda(corpo, todas);
  if (!r.ok) return NextResponse.json({ erro: r.erro }, { status: 422 });

  const antes = todas.find((f) => f.slug === r.fazenda.slug);
  const proximas = antes ? todas.map((f) => (f.slug === r.fazenda.slug ? r.fazenda : f)) : [r.fazenda, ...todas];
  await salvarTodas(proximas);

  if (antes) {
    const novas = new Set(r.fazenda.imagens.map((i) => i.src));
    await apagarImagens(antes.imagens.map((i) => i.src).filter((s) => !novas.has(s)));
  }
  atualizarSite();
  return NextResponse.json({ ok: true, fazenda: r.fazenda });
}

export async function DELETE(request: Request) {
  if (!(await estaLogado())) return naoAutorizado();
  if (!storeConfigurado()) return semStore();

  const slug = new URL(request.url).searchParams.get("slug") ?? "";
  const todas = await lerParaPainel();
  const alvo = todas.find((f) => f.slug === slug);
  if (!alvo) return NextResponse.json({ erro: "Fazenda não encontrada." }, { status: 404 });

  await salvarTodas(todas.filter((f) => f.slug !== slug));
  await apagarImagens(alvo.imagens.map((i) => i.src));
  atualizarSite();
  return NextResponse.json({ ok: true });
}
