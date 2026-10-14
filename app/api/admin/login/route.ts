import { NextResponse } from "next/server";
import { COOKIE_ADMIN, adminConfigurado, senhaCorreta, valorDoCookie } from "../../../../lib/admin-auth";

// Limite simples por instância contra tentativas em sequência.
const tentativas = new Map<string, { n: number; ate: number }>();

export async function POST(request: Request) {
  if (!adminConfigurado()) {
    return NextResponse.json({ erro: "O painel ainda não foi ativado (defina ADMIN_PASSWORD)." }, { status: 503 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  const t = tentativas.get(ip);
  if (t && t.n >= 5 && Date.now() < t.ate) {
    return NextResponse.json({ erro: "Muitas tentativas. Aguarde alguns minutos." }, { status: 429 });
  }

  const corpo = (await request.json().catch(() => ({}))) as { senha?: unknown };
  if (typeof corpo.senha !== "string" || !senhaCorreta(corpo.senha)) {
    tentativas.set(ip, { n: (t && Date.now() < t.ate ? t.n : 0) + 1, ate: Date.now() + 10 * 60_000 });
    await new Promise((r) => setTimeout(r, 600));
    return NextResponse.json({ erro: "Senha incorreta." }, { status: 401 });
  }

  tentativas.delete(ip);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_ADMIN, valorDoCookie(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(COOKIE_ADMIN);
  return res;
}
