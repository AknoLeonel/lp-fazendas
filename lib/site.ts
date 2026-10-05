export const SITE = {
  name: "REALIZA",
  suffix: "Agro",
  fullName: "REALIZA Agro",
  url: "https://www.realizaagro.com.br",

  // TODO: confirmar com a Realiza Agro
  whatsapp: "557798196370", // formato: 55 + DDD + número, só dígitos
  phoneDisplay: "+55 77 9819-6370",
  email: "contato@realizaagro.com.br",
  creci: "XXXXX-J",
  cnpj: "XX.XXX.XXX/0001-XX",
  address: {
    line1: "Rodovia BR-XYZ, Km XX, Centro",
    line2: "Cidade - Estado, CEP 00000-000",
  },
} as const;

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${SITE.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}