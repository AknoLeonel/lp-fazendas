export type Aptidao = "agricultura" | "pecuaria" | "compensacao-ambiental";

export const APTIDOES: Record<
  Aptidao,
  { nome: string; selo: string; resumo: string }
> = {
  agricultura: {
    nome: "Agricultura",
    selo: "Soja · Milho · Algodão",
    resumo:
      "Áreas de topografia plana, alto índice pluviométrico, logística escoadora facilitada e solo de excelência para safra e safrinha.",
  },
  pecuaria: {
    nome: "Pecuária",
    selo: "Corte · Cria · Recria",
    resumo:
      "Fazendas já estruturadas, formadas em pastagens de alta qualidade, ricas em recursos hídricos e capacidade para alta lotação.",
  },
  "compensacao-ambiental": {
    nome: "Compensação ambiental",
    selo: "Reserva Legal",
    resumo:
      "Áreas de vegetação nativa com biomas específicos, documentação rigorosamente em dia para regularização de passivo ambiental.",
  },
};

export type Imagem = { src: string; alt: string };

export type Fazenda = {
  slug: string;
  titulo: string;
  local: string;
  aptidao: Aptidao;
  /** Rótulo livre exibido no card (ex.: "Dupla aptidão"). */
  aptidaoLabel: string;
  hectares: number;
  /** Preço por hectare em R$. null = sob consulta. */
  precoPorHa: number | null;
  lat: number | null;
  lng: number | null;
  /** "aproximada" protege o sigilo: o mapa mostra uma área em vez do ponto. */
  precisaoMapa: "aproximada" | "exata";
  descricao: string;
  destaques: string[];
  /** A primeira imagem é a capa. */
  imagens: Imagem[];
  publicado: boolean;
  atualizadoEm: string;
};

// Fazendas de exemplo, usadas enquanto nada foi cadastrado no painel (/admin).
// As coordenadas são aproximadas e servem só para demonstrar o mapa.
export const FAZENDAS_EXEMPLO: Fazenda[] = [
  {
    slug: "fazenda-alto-padrao-1200-ha-oeste-baiano",
    titulo: "Fazenda Alto Padrão · 1.200 ha",
    local: "Oeste Baiano · BA",
    aptidao: "agricultura",
    aptidaoLabel: "Dupla aptidão",
    hectares: 1200,
    precoPorHa: null,
    lat: -11.05,
    lng: -45.19,
    precisaoMapa: "aproximada",
    descricao:
      "Área de topografia 100% plana, ideal para lavoura branca. Logística impecável na beira da rodovia.",
    destaques: ["Topografia 100% plana", "Beira de rodovia", "Aptidão para soja, milho e algodão"],
    imagens: [
      { src: "/fazenda-3.jpg", alt: "Vista aérea de área extensa de cerrado" },
      { src: "/hero.jpg", alt: "Fazenda com rio e rodovia ao fundo" },
    ],
    publicado: true,
    atualizadoEm: "2026-10-14T00:00:00.000Z",
  },
  {
    slug: "fazenda-pecuaria-850-ha-vale-do-araguaia",
    titulo: "Fazenda Pecuária · 850 ha",
    local: "Vale do Araguaia · GO",
    aptidao: "pecuaria",
    aptidaoLabel: "Pecuária de corte",
    hectares: 850,
    precoPorHa: null,
    lat: -14.9,
    lng: -51.1,
    precisaoMapa: "aproximada",
    descricao:
      "Toda formada em pastagem, rica em água com represas e curralama completa. Pronta para lotação.",
    destaques: ["Pastagem formada", "Represas", "Curralama completa"],
    imagens: [{ src: "/fazenda-2.jpg", alt: "Sede com curral em fazenda de pecuária" }],
    publicado: true,
    atualizadoEm: "2026-10-14T00:00:00.000Z",
  },
  {
    slug: "area-compensacao-2500-ha-norte-de-minas",
    titulo: "Área para compensação · 2.500 ha",
    local: "Norte de Minas · MG",
    aptidao: "compensacao-ambiental",
    aptidaoLabel: "Reserva legal",
    hectares: 2500,
    precoPorHa: null,
    lat: -16.7,
    lng: -43.9,
    precisaoMapa: "aproximada",
    descricao:
      "Mata nativa preservada, documentação, georreferenciamento e CAR rigorosamente em dia.",
    destaques: ["Mata nativa preservada", "CAR em dia", "Georreferenciamento"],
    imagens: [{ src: "/fazenda-1.jpg", alt: "Mata nativa preservada com área alagada" }],
    publicado: true,
    atualizadoEm: "2026-10-14T00:00:00.000Z",
  },
];

export const DOCUMENTOS_AUDITADOS = [
  { nome: "Matrícula", detalhe: "Cadeia dominial sem bloqueios, penhoras ou litígios." },
  { nome: "CAR", detalhe: "Cadastro Ambiental Rural regular, com Reserva Legal e APPs." },
  { nome: "Georreferenciamento", detalhe: "Certificado no INCRA, com limites conferidos." },
  { nome: "ITR e CCIR", detalhe: "Impostos e cadastro do imóvel em dia." },
  { nome: "Certidões", detalhe: "Negativas do proprietário e do imóvel." },
];

export function capa(f: Fazenda): Imagem {
  return f.imagens[0] ?? { src: "/hero.jpg", alt: f.titulo };
}

export function temMapa(f: Fazenda): boolean {
  return f.lat !== null && f.lng !== null;
}

function dms(valor: number, positivo: string, negativo: string, segundos: boolean): string {
  const abs = Math.abs(valor);
  let graus = Math.floor(abs);
  let min = Math.floor((abs - graus) * 60);
  let seg = Math.round(((abs - graus) * 60 - min) * 60);
  if (!segundos) {
    min = Math.round((abs - graus) * 60);
    seg = 0;
  }
  if (seg === 60) { seg = 0; min += 1; }
  if (min === 60) { min = 0; graus += 1; }
  const m = String(min).padStart(2, "0");
  const base = `${graus}°${m}′`;
  const sufixo = valor < 0 ? negativo : positivo;
  return segundos ? `${base}${String(seg).padStart(2, "0")}″${sufixo}` : `${base}${sufixo}`;
}

/** Coordenada para exibir. Em localização aproximada, só até os minutos. */
export function coordenadaTexto(f: Fazenda): string {
  if (f.lat === null || f.lng === null) return "Localização sob consulta";
  const seg = f.precisaoMapa === "exata";
  return `${dms(f.lat, "N", "S", seg)} ${dms(f.lng, "L", "O", seg)}`;
}

export function formatHa(ha: number): string {
  return `${ha.toLocaleString("pt-BR")} ha`;
}

export function formatPreco(f: Fazenda): string {
  return f.precoPorHa === null
    ? "Valor sob consulta"
    : `${f.precoPorHa.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} / ha`;
}

export function aptidaoParaSelect(a: Aptidao): string {
  return a === "agricultura" ? "Agricultura" : a === "pecuaria" ? "Pecuária" : "Compensação ambiental";
}
