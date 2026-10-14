"use client";

import { useState, type FormEvent } from "react";
import { getAttribution, trackEvent } from "../lib/tracking";
import { whatsappLink } from "../lib/site";

type Status = "idle" | "sending" | "done" | "error";

const campo =
  "min-h-12 w-full rounded-lg border border-linha bg-white px-4 py-3 text-base font-normal text-tinta placeholder:text-tinta-suave/60";

export default function LeadForm({
  id = "contato",
  aptidaoInicial = "Agricultura",
  fazenda,
  titulo = "Receba as fazendas do seu perfil",
}: {
  id?: string;
  aptidaoInicial?: string;
  /** Título da fazenda quando o formulário está numa página de fazenda. */
  fazenda?: string;
  titulo?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [resumo, setResumo] = useState({ nome: "", aptidao: "" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const nome = String(form.get("nome") ?? "").trim();
    const aptidao = String(form.get("aptidao") ?? "");
    setResumo({ nome, aptidao });
    setStatus("sending");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          aptidao,
          whatsapp: form.get("whatsapp"),
          website: form.get("website"),
          fazenda,
          atribuicao: getAttribution(),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      trackEvent("generate_lead", { aptidao, fazenda });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div
        id={id}
        role="status"
        className="flex scroll-mt-24 flex-col gap-4 rounded-xl bg-algodao p-6 text-tinta sm:p-8"
      >
        <h2 className="font-display font-bold text-2xl leading-tight sm:text-3xl">
          Recebemos seu contato, {resumo.nome.split(" ")[0]}.
        </h2>
        <p className="text-tinta-suave">
          Um especialista vai falar com você em breve. Para adiantar, continue
          pelo WhatsApp:
        </p>
        <a
          href={whatsappLink(
            fazenda
            ? `Olá, sou ${resumo.nome} e tenho interesse na ${fazenda}.`
            : `Olá, sou ${resumo.nome} e tenho interesse em fazendas para ${resumo.aptidao.toLowerCase()}.`,
          )}
          target="_blank"
          rel="noopener noreferrer"
          data-track="pos_formulario"
          className="flex min-h-12 items-center justify-center rounded-lg bg-grao px-6 font-bold text-cerrado-900 hover:bg-grao-claro"
        >
          Continuar no WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form
      id={id}
      onSubmit={onSubmit}
      className="flex scroll-mt-24 flex-col gap-4 rounded-xl bg-algodao p-6 text-tinta shadow-2xl sm:p-8"
    >
      <h2 className="font-display font-bold text-2xl leading-tight sm:text-3xl">
        {titulo}
      </h2>

      <label className="flex flex-col gap-1.5 text-sm font-semibold">
        Aptidão
        <select name="aptidao" className={campo} defaultValue={aptidaoInicial}>
          <option>Agricultura</option>
          <option>Pecuária</option>
          <option>Compensação ambiental</option>
        </select>
      </label>

      <label className="flex flex-col gap-1.5 text-sm font-semibold">
        Seu nome
        <input
          name="nome"
          type="text"
          required
          minLength={2}
          autoComplete="name"
          className={campo}
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm font-semibold">
        WhatsApp
        <input
          name="whatsapp"
          type="tel"
          inputMode="tel"
          required
          autoComplete="tel"
          placeholder="(77) 90000-0000"
          className={campo}
        />
      </label>

      {/* Campo isca contra robôs */}
      <input
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <button
        type="submit"
        disabled={status === "sending"}
        className="min-h-13 rounded-lg bg-grao px-6 text-base font-bold text-cerrado-900 transition-colors hover:bg-grao-claro disabled:opacity-60 sm:rounded-lg"
      >
        {status === "sending" ? "Enviando..." : "Ver oportunidades"}
      </button>

      {status === "error" && (
        <p role="alert" className="text-sm text-red-700">
          Não conseguimos enviar agora.{" "}
          <a
            href={whatsappLink("Olá, vim pelo site e gostaria de ver as fazendas disponíveis.")}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline"
          >
            Fale direto pelo WhatsApp
          </a>
          .
        </p>
      )}

      <p className="text-[13px] leading-snug text-tinta-suave">
        Sigilo absoluto. Seus dados são usados só para este contato (LGPD).
      </p>
    </form>
  );
}
