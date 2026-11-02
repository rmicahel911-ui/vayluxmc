"use client";

import { ArrowRight, MessageCircle } from "lucide-react";

import { useStore } from "@/components/store-provider";
import { site } from "@/lib/site";

export function Hero() {
  const { openLogin } = useStore();

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-8 pt-3 sm:pt-4 md:px-6">
      <div className="relative overflow-hidden rounded-3xl border-2 border-brand-deep bg-[#170a0e] shadow-[0_9px_0_#3a0a17]">
        {/* Banner de fondo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/banner.webp"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#0f0508_0%,rgba(15,5,8,0.94)_42%,rgba(15,5,8,0.45)_78%,rgba(15,5,8,0.2)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_120%_at_15%_0%,rgba(225,29,72,0.32),transparent_65%)]" />
        <div className="pointer-events-none absolute -bottom-24 -right-16 size-72 rounded-full bg-[#e11d48]/20 blur-3xl" />

        <div className="relative z-10 grid min-h-80 grid-cols-1 items-center gap-8 p-5 sm:min-h-95 sm:p-8 md:min-h-105 md:grid-cols-[1.08fr_0.92fr] md:p-10">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div className="mb-2 font-minecraft text-[10px] font-bold uppercase tracking-[3px] text-[#ffd27a] drop-shadow-[0_0_16px_rgba(225,29,72,0.6)] sm:text-xs sm:tracking-[4px] md:text-sm md:tracking-[6px]">
              {site.hero.eyebrow}
            </div>

            <h1 className="font-minecraft text-3xl font-extrabold uppercase leading-none tracking-wider text-white drop-shadow-[0_0_20px_rgba(225,29,72,0.55)] sm:text-4xl md:text-5xl lg:text-6xl">
              {site.hero.title}
            </h1>

            <p className="mt-4 max-w-xl text-xs leading-relaxed text-white/70 sm:text-sm">
              {site.hero.subtitle}
            </p>

            <div className="mt-6 flex flex-col items-center gap-2.5 sm:flex-row md:items-start">
              <button
                type="button"
                onClick={openLogin}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-brand-hover/60 bg-[#e11d48] px-6 py-3 text-center font-minecraft text-xs font-bold uppercase tracking-wider text-white shadow-[0_5px_0_#9f1239] transition-all hover:translate-y-0.5 hover:bg-brand-hover hover:shadow-[0_2px_0_#9f1239] active:translate-y-1 active:shadow-none sm:px-7 sm:text-sm"
              >
                <span className="flex flex-col items-start leading-tight">
                  <span className="text-xs tracking-wide sm:text-sm">{site.hero.cta}</span>
                  <small className="mt-0.5 block font-sans text-[9px] font-bold uppercase tracking-[2px] text-white/80">
                    NOMBRE DE USUARIO
                  </small>
                </span>
                <ArrowRight className="size-4 shrink-0" />
              </button>

              <a
                href={site.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-brand-deep bg-[#170a0e]/90 px-5 py-3 font-minecraft text-xs font-bold uppercase tracking-wider text-white/90 shadow-[0_4px_0_#2a0812] transition-all hover:-translate-y-0.5 hover:border-[#e11d48] hover:text-white hover:shadow-[0_2px_0_#2a0812] active:translate-y-0.5 active:shadow-none"
              >
                <MessageCircle className="size-4 text-[#ffb81f]" />
                Discord
              </a>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-minecraft text-[10px] uppercase tracking-wider text-[#ffd27a]/80 md:justify-start">
              <span>Java &amp; Bedrock</span>
              <span className="text-[#9f1239]">◆</span>
              <span>Entrega automática</span>
              <span className="text-[#9f1239]">◆</span>
              <span>Pago 100% seguro</span>
            </div>
          </div>

          <div className="relative flex h-64 items-center justify-center sm:h-80 md:h-96">
            <div className="pointer-events-none absolute inset-0 bg-radial from-[#e11d48]/40 via-[#9f1239]/20 to-transparent blur-3xl" />
            <div className="pointer-events-none absolute h-44 w-44 rounded-full bg-[#ffb81f]/15 blur-2xl sm:h-56 sm:w-56" />

            <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
              <div className="absolute h-3.5 w-3.5 animate-particle-orbit-1 rounded-full border border-white/60 bg-[#ffb81f] shadow-[0_0_12px_#ffb81f] sm:h-4 sm:w-4" />
              <div className="absolute h-3 w-3 animate-particle-orbit-2 rotate-45 rounded-sm border border-[#ffe9b8]/80 bg-[#ffb81f] shadow-[0_0_14px_#ffb81f] sm:h-3.5 sm:w-3.5" />
              <div className="absolute h-4 w-4 animate-particle-orbit-3 rounded-full border border-[#ffd27a]/80 bg-[#e11d48] shadow-[0_0_16px_#e11d48] sm:h-4.5 sm:w-4.5" />
            </div>

            <div className="pointer-events-none absolute left-[12%] top-[8%] h-2.5 w-2.5 animate-particle-sparkle rounded-full bg-[#ffb81f] shadow-[0_0_10px_#ffb81f] sm:h-3 sm:w-3" />
            <div className="pointer-events-none absolute right-[14%] top-[16%] h-2 w-2 animate-particle-sparkle rounded-full bg-[#ffb81f] shadow-[0_0_10px_#ffb81f] [animation-delay:0.8s] sm:h-2.5 sm:w-2.5" />
            <div className="pointer-events-none absolute bottom-[14%] left-[16%] h-3 w-3 animate-particle-sparkle rotate-12 rounded-sm bg-[#e11d48] shadow-[0_0_12px_#e11d48] [animation-delay:1.4s] sm:h-3.5 sm:w-3.5" />
            <div className="pointer-events-none absolute bottom-[10%] right-[18%] h-2.5 w-2.5 animate-particle-sparkle rounded-full bg-[#ffb81f] shadow-[0_0_10px_#ffb81f] [animation-delay:0.4s] sm:h-3 sm:w-3" />

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo.png"
              alt={`Logotipo de ${site.name}`}
              className="pixelated z-10 max-h-80 w-47.5 animate-hero-logo-bounce select-none object-contain drop-shadow-[0_20px_35px_rgba(225,29,72,0.6)] sm:w-62.5 md:w-77.5 lg:w-85"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
