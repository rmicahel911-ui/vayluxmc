"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { House, Layers, CircleHelp, ShoppingCart } from "lucide-react";

import { CartDrawer } from "@/components/cart-drawer";
import { PlayerAvatar } from "@/components/player-avatar";
import { useStore } from "@/components/store-provider";
import { formatPrice } from "@/lib/format";

const navItems = [
  { href: "/", label: "Inicio", icon: House },
  { href: "/categorias", label: "Tienda", icon: Layers },
  { href: "/como-iniciar-sesion", label: "¿Cómo comprar?", icon: CircleHelp },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [cartOpen, setCartOpen] = useState(false);
  const { username, openLogin, basketCount, basketTotal, basketCurrency } = useStore();

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header className="relative z-30 w-full px-4 pt-5 md:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <nav aria-label="Navegación principal" className="flex items-center gap-2 sm:gap-3">
            {navItems.map((item, index) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold uppercase tracking-wider transition-all sm:gap-2 sm:px-4",
                    "border-2 font-minecraft",
                    index > 0 ? "hidden sm:inline-flex" : "",
                    active
                      ? "translate-y-0.5 border-brand-hover/60 bg-[#e11d48] text-white shadow-[0_4px_0_#9f1239]"
                      : "border-brand-deep bg-[#170a0e]/90 text-white/90 shadow-[0_4px_0_#3a0a17] hover:translate-y-0.5 hover:border-[#e11d48] hover:bg-[#2a0f18] hover:text-white hover:shadow-[0_2px_0_#3a0a17] active:translate-y-1 active:shadow-none",
                  ].join(" ")}
                >
                  <Icon className="size-3.5 text-[#ffd27a] sm:size-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <div className="inline-flex min-h-12.5 select-none items-center gap-2 rounded-xl border-2 border-brand-deep bg-[#170a0e]/95 px-2.5 py-1.5 shadow-[0_4px_0_#3a0a17] transition-all duration-150 hover:-translate-y-0.5 hover:border-[#e11d48] hover:shadow-[0_2px_0_#3a0a17] active:translate-y-1 active:shadow-none sm:min-h-14 sm:gap-3.5 sm:px-4 sm:py-2">
              <button
                type="button"
                onClick={openLogin}
                aria-label="Iniciar sesión o cambiar de usuario"
                className="hidden flex-col text-right text-white sm:flex"
              >
                <span className="max-w-28 truncate font-minecraft text-xs font-black uppercase leading-tight tracking-wider">
                  {username ?? "Invitado"}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wide text-[#ffd27a]/70">
                  {username ? "Cambiar nick" : "Click para entrar"}
                </span>
              </button>

              <button
                type="button"
                onClick={openLogin}
                aria-label="Cambiar nick de Minecraft"
                className="group relative h-10 w-8 shrink-0 overflow-hidden sm:h-12 sm:w-10 [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]"
              >
                <span className="absolute inset-0 rounded-full bg-[#e11d48]/30 blur-md" />
                <span className="absolute -right-1 -top-1 z-10 flex size-4 items-center justify-center rounded-full border border-[#e11d48] bg-black/90 font-minecraft text-[9px] font-black text-white sm:size-5 sm:text-[11px]">
                  {username ? username.slice(0, 1).toUpperCase() : "?"}
                </span>
                <PlayerAvatar
                  username={username}
                  kind="body"
                  size={40}
                  className="absolute left-1/2 top-0 h-auto w-8 -translate-x-1/2 brightness-100 sm:w-10"
                />
              </button>

              <button
                type="button"
                onClick={() => setCartOpen(true)}
                aria-label={`Abrir carrito, ${basketCount} artículos`}
                className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-lg border border-brand-hover/50 bg-[#e11d48] px-2.5 py-1.5 text-xs font-black uppercase tracking-wide text-white shadow-[0_3px_0_#9f1239] transition-all hover:bg-brand-hover active:translate-y-0.5 active:shadow-none sm:gap-2 sm:px-3"
              >
                <ShoppingCart className="size-3.5" />
                <span className="flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-black/25 px-1 font-minecraft text-[10px] font-black">
                  {basketCount}
                </span>
                <span className="font-minecraft text-xs">
                  {formatPrice(basketTotal, basketCurrency)}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
