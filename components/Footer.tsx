export default function Footer() {
  return (
    <footer className="bg-slate-950 pt-16 pb-8 text-slate-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:gap-8">
          
          {/* Coluna 1: Marca e Credenciais (Vital para aprovação no Google Ads) */}
          <div>
            <h3 className="mb-4 text-2xl font-bold text-white">
              AKNOTECH <span className="text-green-500">Agro</span>
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-slate-400 pr-4">
              Especialistas em intermediação de fazendas de alto padrão e consultoria jurídica para regularização fundiária. Segurança e rentabilidade para o seu investimento rural.
            </p>
            <div className="space-y-1 text-sm font-medium text-slate-500">
              <p>CRECI: XXXXX-J</p>
              <p>CNPJ: XX.XXX.XXX/0001-XX</p>
            </div>
          </div>

          {/* Coluna 2: Navegação Interna */}
          <div>
            <h4 className="mb-6 text-lg font-semibold text-white">Navegação</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="transition-colors hover:text-green-500">Início</a></li>
              <li><a href="#" className="transition-colors hover:text-green-500">Aptidões e Perfil</a></li>
              <li><a href="#" className="transition-colors hover:text-green-500">Consultoria Jurídica</a></li>
              <li><a href="#" className="transition-colors hover:text-green-500">Vitrine de Fazendas</a></li>
            </ul>
          </div>

          {/* Coluna 3: Contato e SEO Local */}
          <div>
            <h4 className="mb-6 text-lg font-semibold text-white">Contato & Endereço</h4>
            <ul className="space-y-4 text-sm">
              {/* Endereço Físico - Forte sinal de confiança para o Google */}
              <li className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="shrink-0 text-green-500" viewBox="0 0 256 256"><path d="M128,16a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,112a24,24,0,1,1,24-24A24,24,0,0,1,128,128Z"></path></svg>
                <span>Rodovia BR-XYZ, Km XX, Centro<br/>Cidade - Estado, CEP 00000-000</span>
              </li>
              
              {/* WhatsApp */}
              <li className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="shrink-0 text-green-500" viewBox="0 0 256 256"><path d="M222.37,158.46l-47.11-21.11-.13-.06a16,16,0,0,0-15.17,1.4,8.12,8.12,0,0,0-.75.56L134.87,160c-15.42-7.49-31.34-23.41-38.83-38.83l20.78-24.34a8.12,8.12,0,0,0,.56-.75,16,16,0,0,0,1.4-15.17l-.06-.13L97.63,33.63a16,16,0,0,0-16.82-9.26L33.7,32.8A16.05,16.05,0,0,0,20,48.49C21.8,119.78,80.77,198.81,192.68,235.25a27.18,27.18,0,0,0,8.37,1.3,15.65,15.65,0,0,0,12.35-6l29.41-38A16,16,0,0,0,222.37,158.46Z"></path></svg>
                <a href="https://wa.me/557798196370" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-green-500">
                  +55 77 9819-6370
                </a>
              </li>
              
              {/* E-mail Profissional */}
              <li className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="shrink-0 text-green-500" viewBox="0 0 256 256"><path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,133.15,52.57,64ZM216,192H40V74.19l82.59,75.71a16,16,0,0,0,21.82,0L226.54,74.1C229.41,71.49,232,68.7,232,65.61V192Z"></path></svg>
                <a href="mailto:contato@aknotech.com.br" className="transition-colors hover:text-green-500">
                  contato@aknotech.com.br
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Barra Inferior - Direitos e Links Legais (OBRIGATÓRIOS) */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 text-xs text-slate-500 md:flex-row">
          <p>© {new Date().getFullYear()} AKNOTECH Agro. Todos os direitos reservados.</p>
          
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-slate-300 underline underline-offset-2">Políticas de Privacidade</a>
            <a href="#" className="transition-colors hover:text-slate-300 underline underline-offset-2">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}