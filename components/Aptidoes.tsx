export default function Aptidoes() {
  const categorias = [
    {
      id: "agricultura",
      titulo: "Agricultura",
      descricao: "Áreas de topografia plana, alto índice pluviométrico, logística escoadora facilitada e solo de excelência para safra e safrinha.",
      icone: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8m0 0a8.998 8.998 0 00-8.998-9h-1.5a1.5 1.5 0 00-1.5 1.5v1.5a8.999 8.999 0 009 8.998h3zm0 0a8.998 8.998 0 018.998-9h1.5a1.5 1.5 0 011.5 1.5v1.5a8.999 8.999 0 01-9 8.998h-3z" />
        </svg>
      ),
    },
    {
      id: "pecuaria",
      titulo: "Pecuária",
      descricao: "Fazendas já estruturadas, formadas em pastagens de alta qualidade, ricas em recursos hídricos e capacidade para alta lotação.",
      icone: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 11V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4M3 11v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6M3 15h18M8 11v4M16 11v4M12 7v4" />
        </svg>
      ),
    },
    {
      id: "compensacao",
      titulo: "Compensação Ambiental",
      descricao: "Áreas de vegetação nativa com biomas específicos, documentação rigorosamente em dia para regularização de passivo ambiental.",
      icone: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 22v-8m0 0l-4-4m4 4l4-4m-4-8a4 4 0 100 8 4 4 0 000-8z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-slate-50 py-20 lg:py-28">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Cabeçalho da Seção */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
            Aptidões Exclusivas
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Filtramos e auditamos as melhores oportunidades do mercado de acordo com o seu objetivo estratégico de investimento.
          </p>
        </div>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {categorias.map((cat) => (
            <div 
              key={cat.id} 
              className="group flex flex-col items-center rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-green-500/50"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-700 transition-colors group-hover:bg-green-600 group-hover:text-white">
                {cat.icone}
              </div>
              <h3 className="mb-3 text-2xl font-semibold text-slate-900">
                {cat.titulo}
              </h3>
              <p className="leading-relaxed text-slate-600">
                {cat.descricao}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}