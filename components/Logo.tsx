import { SITE } from "../lib/site";

/** Símbolo: linhas de plantio convergindo no horizonte (campo visto de cima). */
export function LogoMark({
  size = 40,
  fundo = "#e3a72f",
  tra = "#12291c",
}: {
  size?: number;
  fundo?: string;
  tra?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <rect width="48" height="48" rx="11" fill={fundo} />
      <g stroke={tra} strokeWidth="2.6" strokeLinecap="round">
        <path d="M24 11 L6 44" />
        <path d="M24 11 L15 44" />
        <path d="M24 11 L24 44" />
        <path d="M24 11 L33 44" />
        <path d="M24 11 L42 44" />
        <path d="M8 11 H40" />
      </g>
    </svg>
  );
}

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark size={36} />
      <span className="font-display text-xl font-extrabold md:text-2xl">
        {SITE.name} <span className="font-medium text-grao">{SITE.suffix}</span>
      </span>
    </span>
  );
}
