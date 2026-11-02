"use client";

import { useEffect, useState } from "react";
import {
  Check,
  Copy,
  Gamepad2,
  Monitor,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

import { site } from "@/lib/site";

type ServerStatus = {
  configured: boolean;
  online: boolean;
  players: { online?: number; max?: number } | null;
  version: string | null;
  motd: string | null;
  ip: string;
  icon?: string | null;
  error?: boolean;
};

const platforms: { label: string; icon: LucideIcon }[] = [
  { label: "PC", icon: Monitor },
  { label: "Móvil", icon: Smartphone },
  { label: "Xbox", icon: Gamepad2 },
  { label: "PlayStation", icon: Gamepad2 },
  { label: "Nintendo Switch", icon: Gamepad2 },
];

export function ServerConnect() {
  const [platform, setPlatform] = useState<"java" | "bedrock">("java");
  const [status, setStatus] = useState<ServerStatus | null>(null);
  const [copied, setCopied] = useState(false);

  const ip = platform === "java" ? site.server.javaIp : site.server.bedrockIp;
  const port = site.server.bedrockPort;
  const address = platform === "java" ? ip : `${ip}:${port}`;
  const configured = Boolean(ip) && !ip.toLowerCase().includes("no configurada");

  useEffect(() => {
    let active = true;
    fetch("/api/server-status", { cache: "no-store" })
      .then((response) => response.json())
      .then((data: ServerStatus) => {
        if (active) setStatus(data);
      })
      .catch(() => {
        if (active) {
          setStatus({
            configured: true,
            online: false,
            players: null,
            version: null,
            motd: null,
            ip: site.server.javaIp,
            error: true,
          });
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const copyAddress = async () => {
    if (!configured) return;
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const online = status?.online ?? false;

  return (
    <section className="relative z-10 mt-8 w-full">
      <div className="mx-auto flex w-full max-w-[897px] items-end gap-2 px-4">
        <button
          type="button"
          onClick={() => setPlatform("java")}
          className={`relative flex flex-1 select-none items-center justify-center overflow-hidden rounded-t-2xl border-x-2 border-t-2 px-5 py-3 font-minecraft text-base font-bold uppercase transition-all sm:text-lg ${
            platform === "java"
              ? "border-[#f43f5e]/60 bg-[#e11d48] text-white shadow-[0_-2px_0_#9f1239]"
              : "border-[#9f1239]/70 bg-[#170a0e]/95 text-white/50 hover:text-white/80"
          }`}
        >
          Java
        </button>
        <button
          type="button"
          onClick={() => setPlatform("bedrock")}
          className={`relative flex flex-1 select-none items-center justify-center overflow-hidden rounded-t-2xl border-x-2 border-t-2 px-5 py-3 font-minecraft text-base font-bold uppercase transition-all sm:text-lg ${
            platform === "bedrock"
              ? "border-[#f43f5e]/60 bg-[#e11d48] text-white shadow-[0_-2px_0_#9f1239]"
              : "border-[#9f1239]/70 bg-[#170a0e]/95 text-white/50 hover:text-white/80"
          }`}
        >
          Bedrock
        </button>
      </div>

      <div className="relative mx-auto -mt-px flex w-full max-w-[1053px] flex-col items-center overflow-hidden rounded-2xl border-2 border-[#9f1239] bg-[#170a0e]/95 p-5 shadow-[0_8px_0_#3a0a17] sm:p-8 md:p-10">
        <div className="relative z-10 flex w-full flex-col items-center justify-center gap-6 md:flex-row md:gap-8 md:gap-12">
          <div className="w-full rounded-2xl border-2 border-[#9f1239] bg-[#0f0508] p-5 shadow-[0_4px_0_#2a0812] sm:p-6 md:w-[384px]">
            <div className="flex flex-col gap-3">
              <div>
                <div className="mb-1 font-minecraft text-[10px] font-semibold uppercase tracking-wider text-white/70 sm:text-xs">
                  Nombre del Servidor
                </div>
                <div className="rounded-xl border border-[#9f1239]/50 bg-black/60 p-2.5 shadow-inner sm:p-3">
                  <b className="font-minecraft text-sm uppercase tracking-wide text-white sm:text-base">
                    {site.server.name}
                  </b>
                </div>
              </div>
              <div>
                <div className="mb-1 font-minecraft text-[10px] font-semibold uppercase tracking-wider text-white/70 sm:text-xs">
                  IP del Servidor
                </div>
                <div className="flex items-center justify-between rounded-xl border border-[#9f1239]/50 bg-black/60 p-2.5 shadow-inner sm:p-3">
                  <b className="truncate font-minecraft text-sm tracking-wide text-white sm:text-base">
                    {configured ? (platform === "java" ? ip : address) : "IP no configurada"}
                  </b>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col items-start gap-3 text-center md:w-[320px] md:gap-4 md:text-left">
            <div>
              <h4 className="mb-1.5 font-minecraft text-base font-black uppercase tracking-wide text-white drop-shadow-md sm:text-lg">
                ¡Juega con nosotros!
              </h4>
              <p className="text-[11px] font-medium leading-relaxed text-white/70 sm:text-xs">
                Dirígete a <strong className="text-white">Multijugador</strong>, añade el servidor e
                introduce los datos para conectarte.{" "}
                <em className="font-semibold italic text-[#ffd27a]">¡Así de fácil!</em>
              </p>
            </div>
            <div className="flex w-full justify-center md:justify-start">
              <button
                type="button"
                disabled={!configured}
                onClick={copyAddress}
                className={`flex h-[50px] w-full items-center justify-center gap-2 rounded-xl border-2 font-minecraft text-base font-black uppercase tracking-wider transition-all sm:h-[52px] sm:w-[256px] sm:text-lg ${
                  configured
                    ? "border-[#f43f5e]/60 bg-[#e11d48] text-white shadow-[0_4px_0_#9f1239] hover:translate-y-0.5 hover:bg-brand-hover hover:shadow-[0_2px_0_#9f1239] active:translate-y-1 active:shadow-none"
                    : "cursor-not-allowed border-[#9f1239]/40 bg-[#2a0f18]/80 text-white/40"
                }`}
              >
                {configured ? (
                  copied ? (
                    <Check className="size-4" />
                  ) : (
                    <Copy className="size-4" />
                  )
                ) : null}
                <span className="text-xs sm:text-sm">
                  {!configured
                    ? "IP NO CONFIGURADA"
                    : copied
                      ? "¡COPIADA!"
                      : platform === "java"
                        ? "COPIAR IP"
                        : "COPIAR IP + PUERTO"}
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-6 w-full max-w-[752px] sm:mt-8">
          <div className="w-full select-none rounded-xl border-2 border-[#3a0a17] bg-black/70 p-2.5 shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)] sm:p-3">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex size-16 min-h-16 min-w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border-2 border-[#3a0a17] bg-black/80 shadow-inner">
                {status?.icon ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={status.icon} alt="" className="pixelated size-full object-cover" />
                ) : (
                  <Gamepad2 className="size-8 text-white/30" />
                )}
              </div>

              <div className="flex min-w-0 flex-1 flex-col justify-between overflow-hidden py-0.5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="truncate font-minecraft text-sm font-bold tracking-wide text-white drop-shadow-[2px_2px_0_rgba(0,0,0,0.9)] sm:text-base">
                    {site.server.name}
                  </h3>
                </div>
                <div className="mt-1 truncate font-minecraft text-xs leading-snug drop-shadow-[2px_2px_0_rgba(0,0,0,0.9)] sm:text-[13px]">
                  <span className={online ? "text-[#55ff55]" : "text-[#ff5555]"}>
                    {status
                      ? online
                        ? status.motd || "¡Servidor online!"
                        : "No se puede conectar al servidor."
                      : "Comprobando estado del servidor…"}
                  </span>
                </div>
              </div>

              <div className="flex shrink-0 flex-col items-end justify-between gap-1.5 self-stretch py-0.5 pl-2">
                <div
                  className={`flex cursor-help items-center gap-1.5 rounded-md border px-2 py-0.5 shadow-[0_2px_0_#3a0a17] ${
                    online
                      ? "border-emerald-900 bg-emerald-950/40"
                      : "border-[#3a0a17] bg-[#2a0812]/40"
                  }`}
                  title={online ? "Servidor conectado" : "Servidor desconectado"}
                >
                  <span
                    className={`font-minecraft text-xs font-black leading-none drop-shadow-[1px_1px_0_rgba(0,0,0,0.9)] ${
                      online ? "text-[#55ff55]" : "text-[#ff5555]"
                    }`}
                  >
                    {online ? "✓" : "✕"}
                  </span>
                </div>
                <div className="rounded-md border border-[#9f1239]/50 bg-black/60 px-2 py-0.5 text-right font-minecraft text-xs shadow-[0_2px_0_#3a0a17] sm:text-[13px]">
                  <span className={online ? "text-[#ffff55]" : "text-[#aa0000]"}>
                    {online && status?.players
                      ? `${status.players.online ?? 0}/${status.players.max ?? "?"}`
                      : "???"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/server-datos.png"
          alt=""
          className="pointer-events-none absolute right-6 top-1/2 z-0 hidden h-auto max-h-[190px] w-auto max-w-[190px] -translate-y-1/2 object-contain opacity-40 drop-shadow-[0_10px_20px_rgba(0,0,0,0.45)] xl:block"
        />
      </div>

      <div className="mt-7 flex items-center justify-center gap-8 text-white/80">
        {platforms.map((item) => {
          const Icon = item.icon;
          return (
            <span
              key={item.label}
              title={item.label}
              className="cursor-pointer transition-all hover:-translate-y-1 hover:text-white"
            >
              <Icon className="size-7 sm:size-8" />
            </span>
          );
        })}
      </div>
    </section>
  );
}
