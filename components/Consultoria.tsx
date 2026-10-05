import { whatsappLink } from "../lib/site";

const beneficios = [
  {
    titulo: "Auditoria Rigorosa de Matrículas",
    descricao:
      "Análise profunda da cadeia dominial para garantir a inexistência de bloqueios, penhoras ou litígios.",
  },
  {
    titulo: "Adequação Ambiental (CAR e GEO)",
    descricao:
      "Verificação completa de Reserva Legal, APPs e georreferenciamento certificado no INCRA.",
  },
  {
    titulo: "Assessoria de Ponta a Ponta",
    descricao:
      "Acompanhamento desde a proposta de compra até a lavratura da escritura e registro final.",
  },
];

const mensagemJuridico =
  "Olá, vim pelo site e tenho interesse em saber mais sobre a consultoria de regularização fundiária.";

export default function Consultoria() {
  return (
    <section
      id="consultoria"
      aria-labelledby="consultoria-titulo"
      className="relative scroll-mt-20 overflow-hidden bg-slate-900 py-16 lg:py-28"
    >
      {/* Elementos de design decorativos */}
      <div
        aria-hidden="true"
        className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-green-500/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-slate-500/10 blur-3xl"
      />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-8">
          {/* Coluna da Esquerda: Textos e CTA */}
          <div className="max-w-xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 px-4 py-1.5 text-sm font-medium text-green-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 256 256"
                aria-hidden="true"
              >
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
              </svg>
              Diferencial Competitivo
            </div>

            <h2
              id="consultoria-titulo"
              className="mb-6 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl"
            >
              Consultoria Jurídica em{" "}
              <span className="text-green-500">Regularização Fundiária</span>
            </h2>

            <p className="mb-8 text-lg text-slate-400">
              Não vendemos apenas terras, entregamos segurança. Nossa equipe
              jurídica especializada no agronegócio realiza uma blindagem
              completa no seu investimento, eliminando riscos documentais e
              ambientais.
            </p>

            <a
              href={whatsappLink(mensagemJuridico)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-green-500 bg-transparent px-6 py-3 font-semibold text-green-500 transition-colors hover:bg-green-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            >
              Falar com o Setor Jurídico
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

          {/* Coluna da Direita: Lista de Benefícios */}
          <ul className="flex flex-col gap-4 lg:gap-6 lg:pl-10">
            {beneficios.map((item) => (
              <li
                key={item.titulo}
                className="flex items-start gap-4 rounded-2xl border border-slate-700/50 bg-slate-800/50 p-5 md:p-6"
              >
                <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-700 text-green-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-slate-100">
                    {item.titulo}
                  </h3>
                  <p className="leading-relaxed text-slate-400">
                    {item.descricao}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}