import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const COOKIE_ADMIN = "realiza_admin";

export const adminConfigurado = () => Boolean(process.env.ADMIN_PASSWORD);

function assinatura(): string {
  const segredo = process.env.ADMIN_SECRET ?? process.env.ADMIN_PASSWORD ?? "";
  return createHmac("sha256", segredo).update("realiza-admin-v1").digest("hex");
}

export function senhaCorreta(tentativa: string): boolean {
  const esperada = process.env.ADMIN_PASSWORD ?? "";
  const a = Buffer.from(createHmac("sha256", "cmp").update(tentativa).digest("hex"));
  const b = Buffer.from(createHmac("sha256", "cmp").update(esperada).digest("hex"));
  return esperada.length > 0 && timingSafeEqual(a, b);
}

export function valorDoCookie(): string {
  return assinatura();
}

export async function estaLogado(): Promise<boolean> {
  if (!adminConfigurado()) return false;
  const v = (await cookies()).get(COOKIE_ADMIN)?.value;
  if (!v) return false;
  const a = Buffer.from(v);
  const b = Buffer.from(assinatura());
  return a.length === b.length && timingSafeEqual(a, b);
}
