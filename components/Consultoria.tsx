export default function Consultoria() {
  const beneficios = [
    {
      titulo: "Auditoria Rigorosa de Matrículas",
      descricao: "Análise profunda da cadeia dominial para garantir a inexistência de bloqueios, penhoras ou litígios.",
    },
    {
      titulo: "Adequação Ambiental (CAR e GEO)",
      descricao: "Verificação completa de Reserva Legal, APPs e georreferenciamento certificado no INCRA.",
    },
    {
      titulo: "Assessoria de Ponta a Ponta",
      descricao: "Acompanhamento desde a proposta de compra até a lavratura da escritura e registro final.",
    },
  ];

  return (
    <section className="bg-slate-900 py-20 lg:py-28 relative overflow-hidden">
      {/* Elemento de design para dar um ar moderno e sofisticado */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-green-500/10 blur-3xl"></div>
      <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-slate-500/10 blur-3xl"></div>

      <div className="container mx-auto relative z-10 px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-8">
          
          {/* Coluna da Esquerda: Textos e CTA */}
          <div className="max-w-xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 px-4 py-1.5 text-sm font-medium text-green-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2"></path>
                <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
              </svg>
              Diferencial Competitivo
            </div>
            
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
              Consultoria Jurídica em <br/>
              <span className="text-green-500">Regularização Fundiária</span>
            </h2>
            
            <p className="mb-8 text-lg text-slate-400">
              Não vendemos apenas terras, entregamos segurança. Nossa equipe jurídica especializada no agronegócio realiza uma blindagem completa no seu investimento, eliminando riscos documentais e ambientais.
            </p>

            <a 
              href="https://wa.me/557798196370?text=Olá,%20tenho%20interesse%20em%20saber%20mais%20sobre%20a%20consultoria%20de%20regularização%20fundiária." 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-green-500 bg-transparent px-6 py-3 font-semibold text-green-500 transition-colors hover:bg-green-500 hover:text-white"
            >
              Falar com o Setor Jurídico
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

          {/* Coluna da Direita: Lista de Benefícios */}
          <div className="flex flex-col gap-6 lg:pl-10">
            {beneficios.map((item, index) => (
              <div 
                key={index} 
                className="flex items-start gap-4 rounded-2xl border border-slate-700/50 bg-slate-800/50 p-6 transition-colors hover:border-slate-600 hover:bg-slate-800"
              >
                <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-700 text-green-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-slate-100">{item.titulo}</h3>
                  <p className="text-slate-400 leading-relaxed">{item.descricao}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}