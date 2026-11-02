"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Info, Loader2, ShoppingCart } from "lucide-react";

import { PixelImage } from "@/components/pixel-image";
import { useStore } from "@/components/store-provider";
import { formatPrice } from "@/lib/format";
import type { TebexPackage } from "@/lib/types";

type CategoryPackageCardProps = {
  item: TebexPackage;
};

export function CategoryPackageCard({ item }: CategoryPackageCardProps) {
  const { username, openLogin, refreshBasket, showToast } = useStore();
  const [pending, setPending] = useState(false);
  const [added, setAdded] = useState(false);

  const media = item.media?.find((entry) => entry.primary) ?? item.media?.[0];
  const image = media?.url || item.image || "/images/package-fallback.svg";

  const add = async () => {
    if (!username) {
      showToast("Escribe tu nick de Minecraft para continuar.");
      openLogin();
      return;
    }

    setPending(true);
    try {
      const response = await fetch("/api/basket/package", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ident: item.ident, quantity: 1, username }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        showToast(data.error ?? "No se pudo añadir el paquete al carrito.");
        return;
      }

      await refreshBasket();
      setAdded(true);
      showToast(`${item.name} añadido al carrito.`);
      window.setTimeout(() => setAdded(false), 2200);
    } catch {
      showToast("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 border-brand-deep bg-[#170a0e]/95 p-5 shadow-[0_6px_0_#2a0812] transition-all duration-150 hover:-translate-y-1 hover:border-[#e11d48] hover:shadow-[0_8px_0_#3a0a17]">
      <Link
        href={`/paquete/${encodeURIComponent(item.ident)}`}
        className="flex flex-col outline-none"
      >
        <div className="flex items-center justify-center py-4">
          <div className="flex size-24 shrink-0 select-none items-center justify-center overflow-hidden rounded-2xl border-2 border-brand-deep/60 bg-[#0f0508] text-[#e11d48] shadow-inner transition-transform duration-200 group-hover:scale-105 sm:size-28">
            <PixelImage
              src={image}
              alt={item.name}
              className="h-full w-full object-contain p-2"
            />
          </div>
        </div>

        <div className="mb-4 space-y-1 text-center">
          <h3 className="line-clamp-2 font-minecraft text-xs font-bold tracking-wide text-white sm:text-sm">
            {item.name}
          </h3>
        </div>
      </Link>

      <div className="my-2 flex items-center justify-center gap-2 rounded-xl border-2 border-brand-deep bg-[#0f0508] px-3 py-1.5 shadow-[0_3px_0_#2a0812] sm:gap-2.5">
        <span className="font-minecraft text-sm font-bold tracking-wide text-[#ffd27a] sm:text-base">
          {formatPrice(item.total_price, item.currency)}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-2 border-t-2 border-brand-deep/50 pt-3">
        <Link
          href={`/paquete/${encodeURIComponent(item.ident)}`}
          title="Ver información completa"
          aria-label={`Ver información de ${item.name}`}
          className="flex h-10 w-11 shrink-0 items-center justify-center rounded-xl border-2 border-brand-deep bg-[#170a0e] text-white/80 shadow-[0_4px_0_#3a0a17] transition-all hover:-translate-y-0.5 hover:border-[#e11d48] hover:bg-[#2a0f18] hover:text-white hover:shadow-[0_2px_0_#3a0a17] active:translate-y-1 active:shadow-none"
        >
          <Info className="size-4 text-[#e11d48]" />
        </Link>

        <button
          type="button"
          onClick={() => void add()}
          disabled={pending}
          className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border-2 border-brand-hover/50 bg-[#e11d48] font-minecraft text-xs font-black uppercase tracking-wider text-white shadow-[0_4px_0_#9f1239] transition-all hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-[0_2px_0_#9f1239] active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:opacity-70"
        >
          {pending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : added ? (
            <Check className="size-4" />
          ) : (
            <ShoppingCart className="size-4" />
          )}
          <span>{pending ? "AÑADIENDO" : added ? "AÑADIDO" : "AGREGAR"}</span>
        </button>
      </div>
    </div>
  );
}
