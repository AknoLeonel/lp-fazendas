import type { Metadata } from "next";
import AdminLogin from "../../components/admin/AdminLogin";
import AdminPainel from "../../components/admin/AdminPainel";
import { adminConfigurado, estaLogado } from "../../lib/admin-auth";
import { lerParaPainel, storeConfigurado } from "../../lib/store";

export const metadata: Metadata = {
  title: "Painel | REALIZA Agro",
  robots: { index: false, follow: false },
};

// O painel nunca é pré-gerado: depende do cookie de quem acessa.
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const logado = await estaLogado();

  return (
    <main className="min-h-screen bg-areia px-4 py-8 md:px-10 md:py-12">
      <div className="mx-auto max-w-5xl">
        {logado ? (
          <AdminPainel inicial={await lerParaPainel()} storeConfigurado={storeConfigurado()} />
        ) : (
          <AdminLogin ativo={adminConfigurado()} />
        )}
      </div>
    </main>
  );
}
