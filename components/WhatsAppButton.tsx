export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href="https://wa.me/557798196370?text=Olá,%20estou%20no%20site%20e%20gostaria%20de%20atendimento."
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-green-500 shadow-2xl shadow-green-500/40 transition-transform duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-green-400"
        aria-label="Falar no WhatsApp"
      >
        {/* Efeito de Ping/Pulso (Chama a atenção) */}
        <span className="absolute -inset-2 animate-ping rounded-full bg-green-400 opacity-20 group-hover:animate-none"></span>
        
        {/* Ícone SVG do WhatsApp */}
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="white" viewBox="0 0 256 256">
          <path d="M187.58,144.84l-32-16a8,8,0,0,0-8,1.21l-15.7,12.16a71.72,71.72,0,0,1-34.58-34.58l12.16-15.7a8,8,0,0,0,1.21-8l-16-32A8,8,0,0,0,87.5,45.6c-4.18,1.06-16.79,4.6-26.37,20.86-10.74,18.25-10.37,39.69,1.1,64,13.29,28.16,35.34,50.21,63.5,63.5,24.31,11.47,45.75,11.84,64,1.1,16.26-9.58,19.8-22.19,20.86-26.37A8,8,0,0,0,187.58,144.84Z"></path>
        </svg>
      </a>
    </div>
  );
}