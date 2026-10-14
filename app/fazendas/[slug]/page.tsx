import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import PageTopo from "../../../components/PageTopo";
import LeadForm from "../../../components/LeadForm";
import FazendaCard from "../../../components/FazendaCard";
import Footer from "../../../components/Footer";
import {
  DOCUMENTOS_AUDITADOS,
  aptidaoParaSelect,
  capa,
  coordenadaTexto,
  formatHa,
  formatPreco,
} from "../../../lib/fazendas";
import { lerPorSlug, lerPublicadas } from "../../../lib/store";
import { SITE, whatsappLink } from "../../../lib/site";

export async function generateStaticParams() {
  return (await lerPublicadas()).map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const f = await lerPorSlug(slug);
  if (!f) return {};
  return {
    title: `${f.titulo} em ${f.local} | REALIZA Agro`,
    description: `${f.descricao} Documentação auditada: matrícula, CAR e georreferenciamento.`,
    alternates: { canonical: `/fazendas/${f.slug}` },
    openGraph: { images: [{ url: capa(f).src, alt: capa(f).alt }] },
  };
}

export default async function FazendaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const f = await lerPorSlug(slug);
  if (!f) notFound();

  const outras = (await lerPublicadas()).filter((o) => o.slug !== f.slug).slice(0, 3);
  const mensagem = `Olá, vim pelo site e tenho interesse na ${f.titulo} (${f.local}).`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: f.titulo,
    description: f.descricao,
    url: `${SITE.url}/fazendas/${f.slug}`,
    image: capa(f).src.startsWith("http") ? capa(f).src : `${SITE.url}${capa(f).src}`,
    about: { "@type": "Place", name: f.local },
  };

  return (
    <>
      <main>
        <PageTopo etiqueta={`${f.local} · ${f.aptidaoLabel}`} titulo={f.titulo}>
          <Link href="/fazendas" className="self-start text-sm font-semibold text-grao-claro">
            ← Todas as fazendas
          </Link>
        </PageTopo>

        <section className="px-5 py-10 md:px-16 md:py-16">
          <div className="mx-auto flex max-w-[1312px] flex-wrap gap-10 md:gap-14">
            <div className="flex min-w-0 flex-1 basis-[560px] flex-col gap-8">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl md:aspect-[16/10]">
                <Image
                  src={capa(f).src}
                  alt={capa(f).alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover"
                />
                <span className="absolute left-4 top-4 rounded bg-cerrado-900 px-3 py-1.5 font-display text-xs font-semibold tracking-wide text-grao">
                  {coordenadaTexto(f)}
                </span>
              </div>

              {f.imagens.length > 1 && (
                <ul className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  {f.imagens.slice(1).map((g) => (
                    <li key={g.src} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                      <Image src={g.src} alt={g.alt} fill sizes="25vw" className="object-cover" />
                    </li>
                  ))}
                </ul>
              )}

              <dl className="grid grid-cols-2 gap-4 rounded-xl border border-linha bg-algodao-claro p-5 md:grid-cols-4 md:p-6">
                {[
                  ["Área", formatHa(f.hectares)],
                  ["Valor", formatPreco(f)],
                  ["Aptidão", f.aptidaoLabel],
                  ["Região", f.local],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-sm text-tinta-suave">{k}</dt>
                    <dd className="font-display text-lg font-bold leading-tight">{v}</dd>
                  </div>
                ))}
              </dl>

              <div className="flex flex-col gap-3">
                <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">Sobre a área</h2>
                <p className="text-base leading-relaxed text-tinta-suave md:text-lg">{f.descricao}</p>
                <ul className="flex flex-wrap gap-2 pt-1">
                  {f.destaques.map((d) => (
                    <li key={d} className="rounded-full bg-areia px-4 py-2 text-sm font-semibold">
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-4">
                <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">Dossiê jurídico</h2>
                <ul className="flex flex-col divide-y divide-linha rounded-xl border border-linha bg-algodao-claro">
                  {DOCUMENTOS_AUDITADOS.map((d) => (
                    <li key={d.nome} className="flex items-start gap-3 p-4 md:p-5">
                      <span aria-hidden="true" className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-folha text-sm text-white">
                        ✓
                      </span>
                      <div>
                        <p className="font-semibold">{d.nome}</p>
                        <p className="text-sm text-tinta-suave">{d.detalhe}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-tinta-suave">
                  Documentos completos liberados após cadastro e, quando exigido, termo de confidencialidade.
                </p>
              </div>
            </div>

            <aside className="flex w-full flex-col gap-4 md:flex-1 md:basis-[380px] md:self-start lg:sticky lg:top-6 lg:max-w-[420px]">
              <LeadForm
                titulo="Quero o dossiê completo desta fazenda"
                aptidaoInicial={aptidaoParaSelect(f.aptidao)}
                fazenda={f.titulo}
              />
              <a
                href={whatsappLink(mensagem)}
                target="_blank"
                rel="noopener noreferrer"
                data-track={`fazenda_whatsapp_${f.slug}`}
                className="flex min-h-13 items-center justify-center rounded-lg border-2 border-cerrado-900 px-6 font-bold"
              >
                Falar no WhatsApp sobre esta fazenda
              </a>
            </aside>
          </div>
        </section>

        {outras.length > 0 && (
          <section className="bg-areia px-5 py-12 md:px-16 md:py-16">
            <div className="mx-auto flex max-w-[1312px] flex-col gap-6">
              <h2 className="font-display text-2xl font-bold tracking-tight md:text-4xl">Outras oportunidades</h2>
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {outras.map((o) => (
                  <FazendaCard key={o.slug} fazenda={o} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
