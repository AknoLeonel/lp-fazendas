"use client";

import { usePathname } from "next/navigation";

/** O painel (/admin) não mostra o cabeçalho, a barra de WhatsApp nem o aviso de cookies do site. */
export default function EsconderNoAdmin({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <>{children}</>;
}
