"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { LogoMark } from "../Logo";

export default function AdminLogin({ ativo }: { ativo: boolean }) {
  const router = useRouter();
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function entrar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro("");
    setEnviando(true);
    const senha = String(new FormData(e.currentTarget).get("senha") ?? "");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ senha }),
    }).catch(() => null);
    setEnviando(false);
    if (res?.ok) {
      router.refresh();
      return;
    }
    const corpo = await res?.json().catch(() => ({}));
    setErro(corpo?.erro ?? "Não foi possível entrar.");
  }

  return (
    <form
      onSubmit={entrar}
      className="mx-auto mt-16 flex max-w-sm flex-col gap-4 rounded-xl border border-linha bg-algodao-claro p-8 shadow-xl"
    >
      <LogoMark size={44} />
      <h1 className="font-display text-2xl font-bold">Painel REALIZA Agro</h1>
      {!ativo && (
        <p role="alert" className="rounded-lg bg-areia p-3 text-sm">
          O painel ainda não foi ativado. Defina a variável <code>ADMIN_PASSWORD</code> na Vercel e publique de novo.
        </p>
      )}
      <label className="flex flex-col gap-1.5 text-sm font-semibold">
        Senha
        <input
          name="senha"
          type="password"
          required
          autoComplete="current-password"
          className="min-h-12 rounded-lg border border-linha bg-white px-4 text-base font-normal"
        />
      </label>
      {erro && (
        <p role="alert" className="text-sm text-red-700">
          {erro}
        </p>
      )}
      <button
        type="submit"
        disabled={enviando || !ativo}
        className="min-h-12 rounded-lg bg-grao font-bold text-cerrado-900 disabled:opacity-50"
      >
        {enviando ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
