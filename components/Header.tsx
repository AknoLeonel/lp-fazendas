export default function Header() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-slate-200/50 bg-white/80 backdrop-blur-md transition-all">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <span className="text-2xl font-black tracking-tighter text-slate-900">
            AKNOTECH <span className="text-green-600">Agro</span>
          </span>
        </a>

        {/* Navegação Desktop (Escondida no Mobile) */}
        <nav className="hidden md:flex md:items-center md:gap-8 text-sm font-medium text-slate-600">
          <a href="#" className="hover:text-green-600 transition-colors">Aptidões</a>
          <a href="#" className="hover:text-green-600 transition-colors">Consultoria</a>
          <a href="#" className="hover:text-green-600 transition-colors">Vitrine</a>
        </nav>

        {/* CTA Secundário */}
        <a 
          href="https://wa.me/557798196370" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
        >
          Falar com Especialista
        </a>
      </div>
    </header>
  );
}