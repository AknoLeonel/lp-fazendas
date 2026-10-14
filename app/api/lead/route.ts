// Recebe leads do formulário. Se LEAD_WEBHOOK_URL estiver definido (CRM, Make,
// Zapier, RD Station...), repassa o lead; sempre registra no log do servidor.

const APTIDOES = new Set(["Agricultura", "Pecuária", "Compensação ambiental"]);

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  // Campo isca: robôs preenchem, pessoas não veem.
  if (clean(body.website, 50)) return Response.json({ ok: true });

  const nome = clean(body.nome, 120);
  const whatsapp = clean(body.whatsapp, 30).replace(/[^\d+]/g, "");
  const aptidao = clean(body.aptidao, 40);
  const digits = whatsapp.replace(/\D/g, "");

  if (nome.length < 2 || digits.length < 10 || digits.length > 14) {
    return Response.json({ error: "invalid_fields" }, { status: 422 });
  }

  const lead = {
    nome,
    whatsapp,
    aptidao: APTIDOES.has(aptidao) ? aptidao : "Não informado",
    fazenda: clean(body.fazenda, 120) || undefined,
    atribuicao:
      typeof body.atribuicao === "object" && body.atribuicao !== null
        ? body.atribuicao
        : {},
    recebido_em: new Date().toISOString(),
  };

  console.log("[lead]", JSON.stringify(lead));

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!res.ok) console.error("[lead] webhook respondeu", res.status);
    } catch (err) {
      console.error("[lead] falha ao enviar webhook", err);
    }
  }

  return Response.json({ ok: true });
}
