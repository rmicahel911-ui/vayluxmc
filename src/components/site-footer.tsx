import Link from "next/link";

import { site } from "@/lib/site";

const legalLinks = [
  { href: "/terms", label: "Términos y Condiciones" },
  { href: "/terms/impressum", label: "Aviso Legal" },
  { href: "/tebex-privacy", label: "Privacidad" },
];

export function SiteFooter() {
  return (
    <footer className="relative z-10 mt-auto box-border w-full border-t-2 border-brand-deep bg-[#1f0710]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 sm:py-7">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="max-w-3xl">
            <p className="m-0 font-minecraft text-sm font-bold tracking-wide text-white">
              Copyright © Tienda Oficial {new Date().getFullYear()}. Todos los derechos reservados.
            </p>
            <p className="mt-1 text-xs leading-relaxed text-[#ffd27a]/60">
              No estamos afiliados, asociados ni respaldados por Mojang AB ni Microsoft. Minecraft es
              marca registrada de Mojang Synergies AB.
            </p>
          </div>
        </div>

        <div className="h-px w-full bg-[#3a0a17]/50" />

        <div className="flex flex-col items-start justify-between gap-4 text-xs md:flex-row md:items-center">
          <div className="flex max-w-2xl items-center gap-3 text-[#ffd27a]/70">
            <a
              href="https://www.tebex.io"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-lg border border-brand-deep/50 bg-[#170a0e] p-1.5 shadow-[0_2px_0_#3a0a17] transition-all hover:border-[#e11d48]"
              title="Tecnología de pago por Tebex"
            >
              <span className="flex h-[23px] items-center px-1.5 font-minecraft text-sm font-black tracking-widest text-[#e11d48]">
                TEBEX
              </span>
            </a>
            <span className="text-[11px] leading-relaxed">
              Este sitio web y su proceso de compra son operados por Tebex Limited como comerciante
              registrado oficial.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#ffd27a]/80">
            {legalLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg border border-brand-deep/50 bg-[#170a0e] px-2.5 py-1 shadow-[0_2px_0_#3a0a17] transition-all hover:border-[#e11d48] hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <p className="text-center text-[10px] leading-relaxed text-white/25">
          {site.name} · {site.server.name} · Hecho con cariño para la comunidad.
        </p>
      </div>
    </footer>
  );
}
