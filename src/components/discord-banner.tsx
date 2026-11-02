import { ArrowRight, MessageCircle } from "lucide-react";

import { site } from "@/lib/site";

export function DiscordBanner() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 md:px-6">
      <a
        href={site.discord}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block overflow-hidden rounded-2xl border-2 border-brand-deep bg-[#170a0e] shadow-[0_6px_0_#3a0a17] transition-all hover:border-[#e11d48] hover:shadow-[0_8px_0_#3a0a17]"
      >
        {/* Fondo con el banner de la comunidad */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/discord-banner.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#0f0508_0%,rgba(15,5,8,0.94)_48%,rgba(15,5,8,0.35)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_130%_at_85%_0%,rgba(225,29,72,0.4),transparent_70%)]" />
        <div className="pointer-events-none absolute -bottom-16 -right-10 size-52 rounded-full bg-[#ffb81f]/10 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7 md:p-8">
          <div className="max-w-xl">
            <p className="font-minecraft text-[10px] font-bold uppercase tracking-[3px] text-[#ffd27a] sm:text-xs sm:tracking-[4px]">
              Comunidad
            </p>
            <h2 className="mt-1 font-minecraft text-xl font-black uppercase tracking-wide text-white drop-shadow-[0_0_18px_rgba(225,29,72,0.55)] sm:text-2xl md:text-3xl">
              Únete a Discord
            </h2>
            <p className="mt-2 text-[11px] leading-relaxed text-white/65 sm:text-xs">
              Conecta con la comunidad de {site.server.name}. Soporte rápido, sorteos y eventos
              especiales.
            </p>
          </div>

          <span className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-brand-hover/60 bg-[#e11d48] px-5 py-3 font-minecraft text-xs font-bold uppercase tracking-wider text-white shadow-[0_5px_0_#9f1239] transition-all group-hover:translate-y-0.5 group-hover:bg-brand-hover group-hover:shadow-[0_3px_0_#9f1239] sm:w-auto sm:shrink-0 sm:px-6 sm:text-sm">
            <MessageCircle className="size-4" />
            Unirse a Discord
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </a>
    </section>
  );
}
