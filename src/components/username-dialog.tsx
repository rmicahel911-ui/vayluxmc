"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, Check, LogIn, LogOut, MessageCircle, TriangleAlert, X } from "lucide-react";

import { PlayerAvatar } from "@/components/player-avatar";
import { type MinecraftPlatform, useStore } from "@/components/store-provider";
import { cn } from "@/lib/format";
import { site } from "@/lib/site";

const platforms = [
  {
    id: "java" as const,
    label: "EDICIÓN JAVA",
    subtitle: "PC · Mac · Linux",
    image: "/images/platform-java.png",
  },
  {
    id: "bedrock" as const,
    label: "EDICIÓN BEDROCK",
    subtitle: "Móvil · Consola · Win 10/11",
    image: "/images/platform-bedrock.png",
  },
];

export function UsernameDialog() {
  const { loginOpen } = useStore();
  if (!loginOpen) return null;
  return <UsernamePanel />;
}

function UsernamePanel() {
  const { closeLogin, username, platform, saveUsername, logout } = useStore();
  const [selected, setSelected] = useState<MinecraftPlatform>(platform);
  const [value, setValue] = useState(username?.replace(/^\.+/, "") ?? "");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLogin();
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [closeLogin]);

  const clean = value.trim().replace(/^\.+/, "");
  const previewName = clean
    ? selected === "bedrock"
      ? `.${clean}`
      : clean
    : null;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (clean.length < 2) {
      setError("Escribe un nick válido (mínimo 2 caracteres).");
      return;
    }

    setSaving(true);
    setError(null);
    try {
      await saveUsername(clean, selected);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="username-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeLogin();
      }}
    >
      <div className="relative flex max-h-[92vh] w-full max-w-4xl animate-pop-in flex-col overflow-x-hidden overflow-y-auto rounded-3xl border-2 border-brand-deep bg-[#170a0e] shadow-[0_12px_0_#3a0a17,0_30px_80px_rgba(0,0,0,0.75)] md:flex-row">
        <button
          type="button"
          onClick={closeLogin}
          aria-label="Cerrar"
          className="absolute right-4 top-4 z-20 flex size-9 items-center justify-center rounded-xl border-2 border-brand-deep bg-[#0f0508] text-white/70 shadow-[0_3px_0_#3a0a17] transition-all hover:border-[#e11d48] hover:text-white active:translate-y-0.5 active:shadow-none"
        >
          <X className="size-4.5" />
        </button>

        {/* Columna informativa */}
        <div className="flex shrink-0 flex-col items-center justify-between border-b-2 border-brand-deep bg-[#1f0710] p-5 sm:p-6 md:w-5/12 md:border-b-0 md:border-r-2">
          <div className="flex w-full flex-col items-center pt-2">
            <div className="relative flex h-40 w-full items-center justify-center sm:h-52">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_55%,rgba(225,29,72,0.35),transparent_70%)]" />
              <div className="absolute size-32 rounded-full bg-[#ffb81f]/10 blur-2xl sm:size-40" />
              <PlayerAvatar
                username={previewName}
                kind="body"
                size={160}
                className="relative h-36 w-auto drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)] transition-all duration-300 sm:h-44"
              />
            </div>

            <h3
              id="username-title"
              className="mt-3 text-center font-minecraft text-lg font-bold text-white"
            >
              ¿Es tu primera compra?
            </h3>
            <p className="mt-1 text-center text-xs text-[#ffd27a]/70">
              Mira la guía paso a paso. Es muy fácil.
            </p>
          </div>

          <div className="mt-4 w-full space-y-2.5">
            <Link
              href="/como-iniciar-sesion"
              onClick={closeLogin}
              className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-brand-hover/40 bg-[#e11d48] py-2.5 font-minecraft text-xs font-bold uppercase tracking-wider text-white shadow-[0_4px_0_#9f1239] transition-all hover:translate-y-0.5 hover:bg-brand-hover hover:shadow-[0_2px_0_#9f1239] active:translate-y-1 active:shadow-none"
            >
              <BookOpen className="size-4" />
              <span>Ver la guía</span>
            </Link>

            <a
              href={site.discord}
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center gap-2 py-1 text-[11px] text-white/60 transition-colors hover:text-white"
            >
              <MessageCircle className="size-3.5" />
              <span>¿Dudas? Escríbenos en Discord</span>
            </a>
          </div>
        </div>

        {/* Columna del formulario */}
        <div className="flex flex-col justify-between p-6 md:w-7/12 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <section>
              <div className="mb-3 flex items-center gap-2.5">
                <span className="flex size-6 items-center justify-center rounded-md bg-[#e11d48] font-minecraft text-xs font-bold text-white shadow-[0_2px_0_#9f1239]">
                  1
                </span>
                <div>
                  <h4 className="font-minecraft text-sm font-bold text-white">
                    Elige tu plataforma
                  </h4>
                  <p className="text-[11px] text-white/60">
                    Selecciona la versión de Minecraft en la que juegas.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1 sm:gap-4">
                {platforms.map((item) => {
                  const active = selected === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setSelected(item.id);
                        setError(null);
                      }}
                      aria-pressed={active}
                      className={cn(
                        "group relative cursor-pointer select-none rounded-xl border-2 p-2 text-left transition-all duration-200",
                        active
                          ? "z-10 translate-y-0.5 border-[#e11d48] bg-[#e11d48]/20 opacity-100 shadow-[0_3px_0_#9f1239]"
                          : "border-brand-deep/70 bg-[#0f0508] opacity-60 shadow-[0_3px_0_#2a0812] hover:opacity-90",
                      )}
                    >
                      <div className="overflow-hidden rounded-lg border border-white/5 bg-[#050203]">
                        {/* Reemplaza estas imágenes en public/images/ para personalizar */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image}
                          alt={
                            item.id === "java"
                              ? "Edición Java para PC, Mac y Linux"
                              : "Edición Bedrock para móvil, consola y Windows"
                          }
                          className="h-20 w-full object-cover sm:h-24"
                        />
                      </div>
                      <div className="px-0.5 pt-2">
                        <span className="block font-minecraft text-[10px] font-bold tracking-wide text-white sm:text-[11px]">
                          {item.label}
                        </span>
                        <span className="mt-0.5 block text-[9px] font-medium text-white/50 sm:text-[10px]">
                          {item.subtitle}
                        </span>
                      </div>
                      {active ? (
                        <span className="absolute right-1.5 top-1.5 flex size-5 items-center justify-center rounded-full bg-[#ffb81f] text-[#0f0508] shadow">
                          <Check className="size-3.5" strokeWidth={3} />
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </section>

            <section>
              <div className="mb-3 flex items-center gap-2.5">
                <span className="flex size-6 items-center justify-center rounded-md bg-[#e11d48] font-minecraft text-xs font-bold text-white shadow-[0_2px_0_#9f1239]">
                  2
                </span>
                <div>
                  <h4 className="font-minecraft text-sm font-bold text-white">
                    Ingresa tu nombre de usuario
                  </h4>
                  <p className="text-[11px] text-white/60">
                    Escríbelo exacto, con mayúsculas y minúsculas tal como aparece en el juego.
                  </p>
                </div>
              </div>

              <div className="relative flex items-center">
                <div className="absolute left-3 z-10 flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#e11d48]/40 bg-black/40">
                  <PlayerAvatar
                    username={previewName}
                    kind="head"
                    size={32}
                    className="size-full object-cover"
                  />
                </div>
                {selected === "bedrock" ? (
                  <span className="absolute left-14 z-10 select-none font-minecraft text-sm font-bold text-white/90">
                    .
                  </span>
                ) : null}
                <input
                  autoFocus
                  value={value}
                  onChange={(event) => {
                    setValue(event.target.value);
                    setError(null);
                  }}
                  maxLength={32}
                  placeholder="Tu nombre de usuario"
                  required
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="none"
                  spellCheck={false}
                  className={cn(
                    "w-full rounded-xl border-2 border-brand-deep/80 bg-[#0f0508] py-3 pr-4 font-minecraft text-sm font-bold tracking-wide text-white outline-none transition placeholder:font-sans placeholder:font-medium placeholder:text-white/40 focus:border-[#e11d48]",
                    selected === "bedrock" ? "pl-16" : "pl-14",
                  )}
                />
              </div>

              {selected === "bedrock" ? (
                <p className="mt-2 text-[10px] leading-relaxed text-[#ffd27a]/60">
                  En Bedrock usamos el punto inicial (ej.{" "}
                  <strong className="text-[#ffd27a]">.Steve</strong>) para identificar tu cuenta. Lo
                  añadimos automáticamente.
                </p>
              ) : null}
            </section>

            <div className="flex items-start gap-2 rounded-lg border-2 border-[#ffb81f]/25 bg-[#e11d48]/[0.06] px-3 py-2.5">
              <TriangleAlert className="mt-0.5 size-3.5 shrink-0 text-[#ffd27a]" />
              <p className="text-[10px] leading-relaxed text-[#ffe9b8]/70">
                Usa tu nombre <strong className="text-[#ffd27a]">exacto</strong> de Minecraft. Si no
                es correcto, no podremos entregarte tu compra.
              </p>
            </div>

            {error ? (
              <p className="flex items-start gap-2 rounded-lg border-2 border-red-500/50 bg-red-500/10 px-3 py-2 text-[11px] font-semibold text-red-200">
                <TriangleAlert className="mt-0.5 size-3.5 shrink-0 text-red-400" />
                <span>{error}</span>
              </p>
            ) : null}

            <div className="flex flex-col gap-2">
              <button
                type="submit"
                disabled={saving || clean.length < 2}
                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-brand-hover/50 bg-[#e11d48] py-3 font-minecraft text-xs font-bold uppercase tracking-wider text-white shadow-[0_4px_0_#9f1239] transition-all hover:translate-y-0.5 hover:bg-brand-hover hover:shadow-[0_2px_0_#9f1239] active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:hover:translate-y-0 sm:py-3.5 sm:text-sm"
              >
                <span>{saving ? "CONECTANDO..." : "INICIAR SESIÓN"}</span>
                <LogIn className="size-4" />
              </button>

              {username ? (
                <button
                  type="button"
                  onClick={() => void logout()}
                  className="btn-ghost w-full px-4 py-2.5 text-[10px]"
                >
                  <LogOut className="size-3.5" />
                  Cerrar sesión ({username})
                </button>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
