"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ArrowRight, Pencil, ShoppingCart, X } from "lucide-react";

import { useStore } from "@/components/store-provider";
import { formatPrice } from "@/lib/format";
import { site } from "@/lib/site";

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { basket, basketCount, basketTotal, basketCurrency, loadingBasket } = useStore();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  const items = basket?.packages ?? [];

  return (
    <div className="fixed inset-0 z-[60] flex justify-end" role="dialog" aria-modal="true" aria-label="Carrito">
      <button
        type="button"
        aria-label="Cerrar carrito"
        onClick={onClose}
        className="absolute inset-0 animate-fade-in bg-black/70 backdrop-blur-sm"
      />

      <aside className="relative flex h-full w-full max-w-md animate-sheet-in-right flex-col border-l-2 border-brand-deep bg-[#1f0710] shadow-[-20px_0_60px_rgba(0,0,0,0.6)]">
        <div className="flex items-center justify-between gap-3 border-b-2 border-brand-deep/60 px-4 py-4 sm:px-5">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.png" alt="" className="size-9 object-contain drop-shadow" />
            <div>
              <p className="font-minecraft text-[10px] font-bold uppercase tracking-widest text-[#ffd27a]">
                Tu compra
              </p>
              <h2 className="font-minecraft text-sm font-black uppercase tracking-wide text-white">
                Carrito ({basketCount})
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="flex size-9 items-center justify-center rounded-lg border-2 border-brand-deep bg-[#170a0e] text-white/60 transition hover:border-[#e11d48] hover:text-white"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-5">
          {loadingBasket ? (
            <div className="space-y-3">
              {[0, 1].map((index) => (
                <div
                  key={index}
                  className="h-20 animate-pulse rounded-xl border-2 border-brand-deep/50 bg-[#170a0e]/80"
                />
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <div className="flex size-16 items-center justify-center rounded-2xl border-2 border-brand-deep bg-[#170a0e] text-[#ffd27a]">
                <ShoppingCart className="size-7" />
              </div>
              <p className="font-minecraft text-sm font-bold uppercase tracking-wide text-white">
                Tu carrito está vacío
              </p>
              <p className="max-w-56 text-[11px] leading-relaxed text-white/50">
                Elige una categoría y añade paquetes. La entrega es automática.
              </p>
              <Link href="/categorias" onClick={onClose} className="btn-3d mt-2 px-4 py-2.5 text-[10px]">
                Ver categorías
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-3 rounded-xl border-2 border-brand-deep/70 bg-[#170a0e] p-2.5 shadow-[0_3px_0_#3a0a17]"
                >
                  <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-brand-deep/60 bg-black/50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image || "/images/package-fallback.svg"}
                      alt=""
                      className="pixelated size-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-bold text-white">{item.name}</p>
                    <p className="mt-0.5 text-[10px] text-white/45">
                      {item.in_basket.quantity} × {formatPrice(item.in_basket.price, basketCurrency)}
                    </p>
                    <p className="mt-1 font-minecraft text-[11px] text-[#ffd27a]">
                      {formatPrice(item.in_basket.price * item.in_basket.quantity, basketCurrency)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label={`Ver ${item.name} en el carrito`}
                    className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-brand-deep/60 text-white/40 transition hover:border-[#e11d48] hover:text-[#ffd27a]"
                  >
                    <Pencil className="size-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 ? (
          <div className="border-t-2 border-brand-deep/60 bg-[#170a0e]/80 px-4 py-4 sm:px-5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-minecraft text-[10px] uppercase tracking-widest text-white/50">
                Total
              </span>
              <span className="font-minecraft text-base font-black text-white">
                {formatPrice(basketTotal, basketCurrency)}
              </span>
            </div>
            <p className="mt-1 text-[10px] leading-relaxed text-white/40">
              Impuestos incluidos. El pago se completa de forma segura en Tebex.
            </p>
            <Link href="/carrito" onClick={onClose} className="btn-3d mt-3 w-full px-4 py-3 text-xs">
              Ir al carrito
              <ArrowRight className="size-4" />
            </Link>
            <p className="mt-2.5 text-center text-[9px] uppercase tracking-wider text-white/30">
              {site.name} · Entrega automática
            </p>
          </div>
        ) : null}
      </aside>
    </div>
  );
}
