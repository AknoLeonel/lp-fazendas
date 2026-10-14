import { NextResponse } from "next/server";
import { estaLogado } from "../../../../lib/admin-auth";
import { enviarImagem, storeConfigurado } from "../../../../lib/store";

const TIPOS = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX = 4 * 1024 * 1024; // limite de corpo da Vercel é 4,5 MB; o painel reduz as fotos antes

export async function POST(request: Request) {
  if (!(await estaLogado())) return NextResponse.json({ erro: "Entre no painel novamente." }, { status: 401 });
  if (!storeConfigurado()) {
    return NextResponse.json({ erro: "Armazenamento não configurado (BLOB_READ_WRITE_TOKEN)." }, { status: 503 });
  }

  const form = await request.formData().catch(() => null);
  const arquivo = form?.get("arquivo");
  if (!(arquivo instanceof File)) return NextResponse.json({ erro: "Nenhum arquivo." }, { status: 400 });
  if (!TIPOS.has(arquivo.type)) return NextResponse.json({ erro: "Use JPG, PNG ou WebP." }, { status: 415 });
  if (arquivo.size > MAX) return NextResponse.json({ erro: "Foto grande demais (máx. 4 MB)." }, { status: 413 });

  const url = await enviarImagem(arquivo.name, arquivo);
  return NextResponse.json({ url });
}
