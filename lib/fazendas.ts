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

export type Fazenda = {
  slug: string;
  titulo: string;
  local: string;
  aptidao: Aptidao;
  aptidaoLabel: string;
  hectares: number;
  /** Preço por hectare em R$. null = sob consulta. */
  precoPorHa: number | null;
  /** Coordenada para exibir como assinatura. Preencher com a real. */
  coordenada: string;
  descricao: string;
  destaques: string[];
  imagem: string;
  alt: string;
  galeria: { src: string; alt: string }[];
};

// TODO: trocar por fazendas reais da carteira da Realiza Agro antes de divulgar.
export const FAZENDAS: Fazenda[] = [
  {
    slug: "fazenda-alto-padrao-1200-ha-oeste-baiano",
    titulo: "Fazenda Alto Padrão · 1.200 ha",
    local: "Oeste Baiano · BA",
    aptidao: "agricultura",
    aptidaoLabel: "Dupla aptidão",
    hectares: 1200,
    precoPorHa: null,
    coordenada: "[00°00′S 00°00′O]",
    descricao:
      "Área de topografia 100% plana, ideal para lavoura branca. Logística impecável na beira da rodovia.",
    destaques: [
      "Topografia 100% plana",
      "Beira de rodovia",
      "Aptidão para soja, milho e algodão",
    ],
    imagem: "/fazenda-3.jpg",
    alt: "Vista aérea de área extensa de cerrado",
    galeria: [
      { src: "/fazenda-3.jpg", alt: "Vista aérea de área extensa de cerrado" },
      { src: "/hero.jpg", alt: "Fazenda com rio e rodovia ao fundo" },
    ],
  },
  {
    slug: "fazenda-pecuaria-850-ha-vale-do-araguaia",
    titulo: "Fazenda Pecuária · 850 ha",
    local: "Vale do Araguaia · GO",
    aptidao: "pecuaria",
    aptidaoLabel: "Pecuária de corte",
    hectares: 850,
    precoPorHa: null,
    coordenada: "[00°00′S 00°00′O]",
    descricao:
      "Toda formada em pastagem, rica em água com represas e curralama completa. Pronta para lotação.",
    destaques: ["Pastagem formada", "Represas", "Curralama completa"],
    imagem: "/fazenda-2.jpg",
    alt: "Sede com curral em fazenda de pecuária",
    galeria: [
      { src: "/fazenda-2.jpg", alt: "Sede com curral em fazenda de pecuária" },
    ],
  },
  {
    slug: "area-compensacao-2500-ha-norte-de-minas",
    titulo: "Área para compensação · 2.500 ha",
    local: "Norte de Minas · MG",
    aptidao: "compensacao-ambiental",
    aptidaoLabel: "Reserva legal",
    hectares: 2500,
    precoPorHa: null,
    coordenada: "[00°00′S 00°00′O]",
    descricao:
      "Mata nativa preservada, documentação, georreferenciamento e CAR rigorosamente em dia.",
    destaques: ["Mata nativa preservada", "CAR em dia", "Georreferenciamento"],
    imagem: "/fazenda-1.jpg",
    alt: "Mata nativa preservada com área alagada",
    galeria: [
      { src: "/fazenda-1.jpg", alt: "Mata nativa preservada com área alagada" },
    ],
  },
];

export const DOCUMENTOS_AUDITADOS = [
  { nome: "Matrícula", detalhe: "Cadeia dominial sem bloqueios, penhoras ou litígios." },
  { nome: "CAR", detalhe: "Cadastro Ambiental Rural regular, com Reserva Legal e APPs." },
  { nome: "Georreferenciamento", detalhe: "Certificado no INCRA, com limites conferidos." },
  { nome: "ITR e CCIR", detalhe: "Impostos e cadastro do imóvel em dia." },
  { nome: "Certidões", detalhe: "Negativas do proprietário e do imóvel." },
];

export function getFazenda(slug: string): Fazenda | undefined {
  return FAZENDAS.find((f) => f.slug === slug);
}

export function formatHa(ha: number): string {
  return `${ha.toLocaleString("pt-BR")} ha`;
}

export function formatPreco(f: Fazenda): string {
  return f.precoPorHa === null
    ? "Valor sob consulta"
    : `${f.precoPorHa.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} / ha`;
}
