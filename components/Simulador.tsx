"use client";

import { useState } from "react";
import { whatsappLink } from "../lib/site";
import { trackEvent } from "../lib/tracking";

const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

const num = (v: string) => {
  const n = Number(v.replace(/\./g, "").replace(",", "."));
  return Number.isFinite(n) && n > 0 ? n : 0;
};

const campo =
  "min-h-12 w-full rounded-lg border border-linha bg-white px-4 py-3 text-base text-tinta placeholder:text-tinta-suave/60";

/**
 * Simulador ilustrativo: o visitante informa os próprios números.
 * Não há valores de mercado embutidos; o resultado é só aritmética.
 */
export default function Simulador() {
  const [area, setArea] = useState("");
  const [preco, setPreco] = useState("");
  const [renda, setRenda] = useState("");

  const ha = num(area);
  const precoHa = num(preco);
  const rendaHa = num(renda);
  const investimento = ha * precoHa;
  const rendaAnual = ha * rendaHa;
  const retorno = investimento > 0 ? (rendaAnual / investimento) * 100 : 0;
  const payback = rendaAnual > 0 ? investimento / rendaAnual : 0;
  const pronto = investimento > 0 && rendaAnual > 0;

  const mensagem = pronto
    ? `Olá, fiz uma simulação no site: ${ha.toLocaleString("pt-BR")} ha, investimento de ${brl(investimento)} e renda anual de ${brl(rendaAnual)}. Gostaria de conversar.`
    : "Olá, vim pelo site e gostaria de ajuda para simular um investimento em fazenda.";

  return (
    <section
      id="simulador"
      aria-labelledby="simulador-titulo"
      className="scroll-mt-4 px-5 pb-6 pt-14 md:px-16 md:pb-10 md:pt-26"
    >
      <div className="mx-auto flex max-w-[1312px] flex-wrap gap-8 rounded-2xl bg-areia p-6 md:gap-14 md:p-14">
        <div className="flex flex-1 basis-[380px] flex-col gap-4 self-start">
          <span className="text-xs font-bold uppercase tracking-[0.12em] text-terra md:text-[13px]">
            Simulador de retorno
          </span>
          <h2
            id="simulador-titulo"
            className="font-display text-[30px] font-bold leading-[1.06] tracking-tighter md:text-[44px]"
          >
            Quanto a terra pode render para você?
          </h2>
          <p className="text-base leading-relaxed text-tinta-suave">
            Informe a área, o valor por hectare e a renda anual esperada
            (arrendamento ou resultado da lavoura). A conta é só aritmética,
            com os números que você colocar. Os valores reais de cada fazenda
            passamos em conversa com o especialista.
          </p>
        </div>

        <div className="flex flex-1 basis-[420px] flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <label className="flex flex-col gap-1.5 text-sm font-semibold">
              Área (ha)
              <input
                inputMode="decimal"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="Ex.: 1000"
                className={campo}
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-semibold">
              Valor por ha (R$)
              <input
                inputMode="decimal"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                placeholder="Ex.: 30000"
                className={campo}
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-semibold">
              Renda por ha/ano (R$)
              <input
                inputMode="decimal"
                value={renda}
                onChange={(e) => setRenda(e.target.value)}
                placeholder="Ex.: 2000"
                className={campo}
              />
            </label>
          </div>

          <div className="grid gap-3 rounded-xl bg-cerrado-900 p-5 text-algodao sm:grid-cols-2" aria-live="polite">
            <Resultado rotulo="Investimento total" valor={investimento > 0 ? brl(investimento) : "—"} />
            <Resultado rotulo="Renda anual estimada" valor={rendaAnual > 0 ? brl(rendaAnual) : "—"} />
            <Resultado rotulo="Retorno ao ano" valor={pronto ? `${retorno.toFixed(1).replace(".", ",")}%` : "—"} />
            <Resultado rotulo="Retorno do capital em" valor={pronto ? `${payback.toFixed(1).replace(".", ",")} anos` : "—"} />
          </div>

          <p className="text-xs leading-snug text-tinta-suave">
            Simulação ilustrativa, sem garantia de resultado. Não considera
            impostos, custos de operação, benfeitorias nem variação de preço da terra.
          </p>

          <a
            href={whatsappLink(mensagem)}
            target="_blank"
            rel="noopener noreferrer"
            data-track="simulador"
            onClick={() => trackEvent("simulador_whatsapp", { pronto })}
            className="flex min-h-13 items-center justify-center rounded-lg bg-grao px-7 font-bold text-cerrado-900 transition-colors hover:bg-grao-claro"
          >
            Conversar sobre esses números
          </a>
        </div>
      </div>
    </section>
  );
}

function Resultado({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[13px] text-algodao/65">{rotulo}</span>
      <span className="font-display text-2xl font-bold text-grao md:text-[28px]">{valor}</span>
    </div>
  );
}
