export default function PageTopo({
  etiqueta,
  titulo,
  children,
}: {
  etiqueta: string;
  titulo: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="bg-cerrado-900 px-5 pb-10 pt-28 text-algodao md:px-16 md:pb-16 md:pt-36">
      <div className="mx-auto flex max-w-[1312px] flex-col gap-4">
        <span className="text-xs font-bold uppercase tracking-[0.12em] text-grao md:text-[13px]">{etiqueta}</span>
        <h1 className="max-w-[900px] font-display text-[34px] font-bold leading-[1.04] tracking-tighter md:text-[56px]">
          {titulo}
        </h1>
        {children}
      </div>
    </section>
  );
}
