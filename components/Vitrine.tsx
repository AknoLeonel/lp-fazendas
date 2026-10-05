import Image from "next/image";
import { whatsappLink } from "../lib/site";

// TODO: trocar por fazendas reais da carteira da Realiza Agro antes de divulgar.
const imoveis = [
  {
    id: 1,
    titulo: "Fazenda Alto Padrão - 1.200 ha",
    localizacao: "Oeste Baiano - BA",
    aptidao: "Dupla Aptidão",
    descricao:
      "Área de topografia 100% plana, ideal para lavoura branca. Logística impecável na beira da rodovia.",
    imagem: "/fazenda-1.jpg",
    alt: "Lavoura em área plana de fazenda no Oeste Baiano",
  },
  {
    id: 2,
    titulo: "Fazenda Pecuária - 850 ha",
    localizacao: "Vale do Araguaia - GO",
    aptidao: "Pecuária de Corte",
    descricao:
      "Toda formada em pastagem, rica em água com represas e curralama completa. Pronta para lotação.",
    imagem: "/fazenda-2.jpg",
    alt: "Pastagem formada com gado em fazenda no Vale do Araguaia",
  },
  {
    id: 3,
    titulo: "Área para Compensação - 2.500 ha",
    localizacao: "Norte de Minas - MG",
    aptidao: "Reserva Legal",
    descricao:
      "Mata nativa preservada, documentação, georreferenciamento e CAR rigorosamente em dia.",
    imagem: "/fazenda-3.jpg",
    alt: "Área de mata nativa preservada no Norte de Minas",
  },
];

const mensagemPortfolio =
  "Olá, vim pelo site e gostaria de ver o portfólio completo de fazendas.";
const mensagemChacaras =
  "Olá, vim pelo site e gostaria de ver as opções de chácaras e sítios.";

export default function Vitrine() {
  return (
    <section
      id="vitrine"
      aria-labelledby="vitrine-titulo"
      className="scroll-mt-20 bg-white py-16 lg:py-28"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Cabeçalho da Seção */}
        <div className="mb-10 flex flex-col items-center justify-between gap-6 md:mb-12 md:flex-row md:items-end">
          <div className="max-w-2xl text-center md:text-left">
            <h2
              id="vitrine-titulo"
              className="mb-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl"
            >
              Vitrine Estratégica
            </h2>
            <p className="text-lg text-slate-600">
              Uma seleção restrita das melhores oportunidades do nosso
              portfólio, previamente auditadas pelo nosso setor jurídico.
            </p>
          </div>
          <a
            href={whatsappLink(mensagemPortfolio)}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 font-semibold text-green-700 underline-offset-4 transition-colors hover:text-green-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
          >
            Solicitar portfólio completo <span aria-hidden="true">&rarr;</span>
          </a>
        </div>

        {/* Grid de Imóveis */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {imoveis.map((imovel) => (
            <article
              key={imovel.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-1 hover:ring-green-500"
            >
              {/* Imagem do Imóvel */}
              <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300 sm:h-64">
                <Image
                  src={imovel.imagem}
                  alt={imovel.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  quality={75}
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute left-4 top-4 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur-md">
                  {imovel.aptidao}
                </div>
              </div>

              {/* Informações */}
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                    aria-hidden="true"
                  >
                    <path d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm30,173.53c-21.11,22.72-30,30-30,30s-8.9-7.3-30-30C72.53,160.47,56,131.94,56,104a72,72,0,0,1,144,0C200,131.94,183.47,160.47,158,189.53Z" />
                  </svg>
                  {imovel.localizacao}
                </div>
                <h3 className="mb-2 text-xl font-bold text-slate-900">
                  {imovel.titulo}
                </h3>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-600">
                  {imovel.descricao}
                </p>

                {/* Botão de Ação */}
                <a
                  href={whatsappLink(
                    `Olá, vim pelo site e tenho interesse na ${imovel.titulo}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Saber mais sobre ${imovel.titulo} pelo WhatsApp`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-50 px-4 py-3 font-semibold text-green-700 transition-colors hover:bg-green-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                    aria-hidden="true"
                  >
                    <path d="M187.58,144.84l-32-16a8,8,0,0,0-8,1.21l-15.7,12.16a71.72,71.72,0,0,1-34.58-34.58l12.16-15.7a8,8,0,0,0,1.21-8l-16-32A8,8,0,0,0,87.5,45.6c-4.18,1.06-16.79,4.6-26.37,20.86-10.74,18.25-10.37,39.69,1.1,64,13.29,28.16,35.34,50.21,63.5,63.5,24.31,11.47,45.75,11.84,64,1.1,16.26-9.58,19.8-22.19,20.86-26.37A8,8,0,0,0,187.58,144.84Z" />
                  </svg>
                  Saber Mais
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Bloco de Demanda Secundária */}
        <div className="mt-12 rounded-2xl bg-slate-100 p-8 text-center md:mt-16 md:p-12">
          <h3 className="mb-3 text-2xl font-bold text-slate-900">
            Busca por áreas menores?
          </h3>
          <p className="mx-auto mb-6 max-w-2xl text-slate-600">
            Além das grandes propriedades, também trabalhamos com um portfólio
            selecionado de chácaras, sítios e áreas de lazer de alto padrão.
          </p>
          <a
            href={whatsappLink(mensagemChacaras)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
          >
            Ver portfólio de chácaras e sítios
          </a>
        </div>
      </div>
    </section>
  );
}