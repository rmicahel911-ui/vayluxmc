"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Loader2,
  Lock,
  ShoppingBag,
  Tag,
  Trash2,
  TriangleAlert,
  X,
} from "lucide-react";

import { PixelImage } from "@/components/pixel-image";
import { PlayerAvatar } from "@/components/player-avatar";
import { QuantityStepper } from "@/components/quantity-stepper";
import { useStore } from "@/components/store-provider";
import { formatPrice } from "@/lib/format";
import { site } from "@/lib/site";

type ApiResponse = {
  error?: string;
  message?: string;
  checkoutUrl?: string;
  authUrl?: string;
  demo?: boolean;
};

export function CartView({ identById }: { identById: Record<string, string> }) {
  const {
    basket,
    loadingBasket,
    refreshBasket,
    username,
    openLogin,
    demo,
    showToast,
  } = useStore();

  const [busyItem, setBusyItem] = useState<string | null>(null);
  const [coupon, setCoupon] = useState("");
  const [couponPending, setCouponPending] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);

  const packages = basket?.packages ?? [];
  const itemCount = packages.reduce((total, item) => total + item.in_basket.quantity, 0);
  const subtotal = packages.reduce(
    (total, item) => total + item.in_basket.price * item.in_basket.quantity,
    0,
  );
  const tax = basket?.sales_tax ?? 0;
  const total = basket?.total_price ?? 0;
  const discount = Math.max(0, subtotal + tax - total);
  const currency = basket?.currency ?? "EUR";
  const appliedCoupon = basket?.coupons?.[0]?.code;

  const changeQuantity = async (ident: string, quantity: number) => {
    setBusyItem(ident);
    try {
      const response = await fetch("/api/basket/package", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ident, quantity }),
      });
      const data = (await response.json()) as ApiResponse;
      if (!response.ok) {
        showToast(data.error ?? "No se pudo actualizar la cantidad.");
        return;
      }
      await refreshBasket();
    } catch {
      showToast("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setBusyItem(null);
    }
  };

  const removeItem = async (ident: string, name: string) => {
    setBusyItem(ident);
    try {
      const response = await fetch(`/api/basket/package?ident=${encodeURIComponent(ident)}`, {
        method: "DELETE",
      });
      const data = (await response.json()) as ApiResponse;
      if (!response.ok) {
        showToast(data.error ?? "No se pudo quitar el paquete.");
        return;
      }
      await refreshBasket();
      showToast(`${name} eliminado del carrito.`);
    } catch {
      showToast("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setBusyItem(null);
    }
  };

  const applyCoupon = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const code = coupon.trim();
    if (!code) return;

    setCouponPending(true);
    try {
      const response = await fetch("/api/basket/coupon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = (await response.json()) as ApiResponse;
      if (!response.ok) {
        showToast(data.error ?? "Cupón no válido.");
        return;
      }
      setCoupon("");
      await refreshBasket();
      showToast(data.message ?? "Cupón aplicado.");
    } catch {
      showToast("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setCouponPending(false);
    }
  };

  const removeCoupon = async () => {
    if (!appliedCoupon) return;
    setCouponPending(true);
    try {
      const response = await fetch(
        `/api/basket/coupon?code=${encodeURIComponent(appliedCoupon)}`,
        { method: "DELETE" },
      );
      const data = (await response.json()) as ApiResponse;
      if (!response.ok) {
        showToast(data.error ?? "No se pudo quitar el cupón.");
        return;
      }
      await refreshBasket();
      showToast("Cupón eliminado.");
    } catch {
      showToast("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setCouponPending(false);
    }
  };

  const checkout = async () => {
    if (!username) {
      openLogin();
      return;
    }

    setCheckingOut(true);
    try {
      const response = await fetch("/api/basket/checkout", { method: "POST" });
      const data = (await response.json()) as ApiResponse;

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }

      if (data.authUrl) {
        window.location.href = data.authUrl;
        return;
      }

      if (data.demo) {
        showToast(
          data.message ??
            "Modo demo: configura tu token de Tebex para habilitar el pago real.",
        );
        return;
      }

      showToast(data.error ?? "No se pudo iniciar el pago.");
    } catch {
      showToast("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setCheckingOut(false);
    }
  };

  if (loadingBasket) {
    return (
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="animate-pulse rounded-2xl border-2 border-brand-deep bg-[#170a0e] p-6 shadow-[0_6px_0_#3a0a17]">
          <div className="h-4 w-32 rounded bg-white/10" />
          <div className="mt-5 space-y-3">
            <div className="h-20 rounded-xl bg-white/5" />
            <div className="h-20 rounded-xl bg-white/5" />
          </div>
        </div>
        <div className="h-56 animate-pulse rounded-2xl border-2 border-brand-deep bg-[#170a0e] shadow-[0_6px_0_#3a0a17]" />
      </div>
    );
  }

  if (!basket || packages.length === 0) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border-2 border-brand-deep bg-[#170a0e]/95 px-6 py-14 text-center shadow-[0_6px_0_#3a0a17]">
        <span className="mx-auto flex size-16 items-center justify-center rounded-2xl border-2 border-brand-deep bg-[#e11d48]/10 text-[#ffd27a]">
          <ShoppingBag className="size-7" />
        </span>
        <h2 className="mt-5 font-minecraft text-base font-black uppercase tracking-wide text-white">
          Tu carrito está vacío
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-xs leading-relaxed text-white/45">
          Añade un rango, un cosmético o un pack de monedas para empezar. La entrega es automática.
        </p>
        <Link href="/categorias" className="btn-3d mt-6 px-6 py-3 text-xs">
          Ver la tienda
          <ArrowRight className="size-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[1fr_360px]">
      <div className="space-y-4">
        <div className="overflow-hidden rounded-2xl border-2 border-brand-deep bg-[#170a0e]/95 shadow-[0_6px_0_#3a0a17]">
          <div className="flex items-center justify-between gap-3 border-b-2 border-brand-deep/60 px-4 py-3.5 sm:px-5">
            <div className="flex items-center gap-2">
              <ShoppingBag className="size-4 text-[#ffd27a]" />
              <h2 className="font-minecraft text-xs font-black uppercase tracking-wide text-white sm:text-sm">
                Tu carrito ({itemCount})
              </h2>
            </div>
            {username ? (
              <div className="flex items-center gap-2">
                <PlayerAvatar username={username} size={24} className="size-6 rounded border border-brand-deep/70" />
                <span className="max-w-32 truncate text-[11px] font-bold text-white/70">{username}</span>
                <button
                  type="button"
                  onClick={openLogin}
                  className="text-[10px] font-bold uppercase tracking-wider text-[#ffd27a] transition hover:text-white"
                >
                  Cambiar
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={openLogin}
                className="text-[10px] font-bold uppercase tracking-wider text-[#ffd27a] transition hover:text-white"
              >
                Añadir nick
              </button>
            )}
          </div>

          <ul className="divide-y-2 divide-brand-deep/40">
            {packages.map((item) => {
              const key = identById[String(item.id)] ?? String(item.id);
              const busy = busyItem === key;
              const image = item.image || "/images/package-fallback.svg";
              return (
                <li key={item.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:p-5">
                  <div className="relative h-20 w-full shrink-0 overflow-hidden rounded-lg border-2 border-brand-deep/60 bg-black/50 sm:w-28">
                    <PixelImage src={image} alt={item.name} className="h-full w-full object-cover" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/paquete/${encodeURIComponent(identById[String(item.id)] ?? item.slug)}`}
                      className="line-clamp-2 text-xs font-bold text-white transition hover:text-[#ffd27a] sm:text-sm"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-1 text-[11px] text-white/40">
                      {formatPrice(item.in_basket.price, currency)} / unidad
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                    <QuantityStepper
                      value={item.in_basket.quantity}
                      onChange={(quantity) => void changeQuantity(key, quantity)}
                      min={1}
                      max={10}
                      size="sm"
                      disabled={busy}
                    />
                    <div className="flex items-center gap-3">
                      <span className="font-minecraft text-sm font-bold text-theme-accent">
                        {formatPrice(item.in_basket.price * item.in_basket.quantity, currency)}
                      </span>
                      <button
                        type="button"
                        onClick={() => void removeItem(key, item.name)}
                        disabled={busy}
                        className="rounded-md p-1.5 text-white/35 transition hover:bg-[#3a0a17]/40 hover:text-[#ffd27a] disabled:opacity-40"
                        aria-label={`Quitar ${item.name}`}
                      >
                        {busy ? <Loader2 className="size-3.5 animate-spin" /> : <Trash2 className="size-3.5" />}
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="border-t-2 border-brand-deep/50 px-4 py-4 sm:px-5">
            <Link
              href="/categorias"
              className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#ffd27a] transition hover:text-white"
            >
              ← Seguir comprando
            </Link>
          </div>
        </div>

        {demo ? (
          <div className="flex items-start gap-2.5 rounded-xl border-2 border-accent-400/25 bg-accent-500/[0.06] px-4 py-3">
            <TriangleAlert className="mt-0.5 size-4 shrink-0 text-accent-300" />
            <p className="text-[11px] leading-relaxed text-accent-100/70">
              Estás en modo demo. El carrito y los cupones funcionan, pero el pago real se activa al
              configurar <span className="font-mono text-accent-200">TEBEX_PUBLIC_TOKEN</span>. Usa el cupón{" "}
              <span className="font-mono text-accent-200">DEMO10</span> para probar el descuento.
            </p>
          </div>
        ) : null}
      </div>

      <aside className="space-y-4 rounded-2xl border-2 border-brand-deep bg-[#170a0e]/95 p-5 shadow-[0_6px_0_#3a0a17] lg:sticky lg:top-6">
        <h2 className="font-minecraft text-sm font-black uppercase tracking-wide text-white">
          Resumen del pedido
        </h2>

        <form onSubmit={applyCoupon} className="space-y-2">
          <label
            htmlFor="coupon"
            className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white/50"
          >
            <Tag className="size-3" />
            Cupón de descuento
          </label>

          {appliedCoupon ? (
            <div className="flex items-center justify-between gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2">
              <span className="font-mono text-xs font-bold text-emerald-300">{appliedCoupon}</span>
              <button
                type="button"
                onClick={() => void removeCoupon()}
                disabled={couponPending}
                className="rounded p-1 text-emerald-300/70 transition hover:bg-black/20 hover:text-white"
                aria-label="Quitar cupón"
              >
                {couponPending ? <Loader2 className="size-3.5 animate-spin" /> : <X className="size-3.5" />}
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                id="coupon"
                value={coupon}
                onChange={(event) => setCoupon(event.target.value.toUpperCase())}
                placeholder="CÓDIGO"
                maxLength={24}
                className="min-w-0 flex-1 rounded-lg border-2 border-brand-deep/70 bg-black/40 px-3 py-2 text-xs font-semibold uppercase text-white placeholder:text-white/25 outline-none transition focus:border-[#e11d48]"
              />
              <button
                type="submit"
                disabled={couponPending || !coupon.trim()}
                className="btn-ghost shrink-0 px-3 py-2 text-[10px]"
              >
                {couponPending ? <Loader2 className="size-3.5 animate-spin" /> : "Aplicar"}
              </button>
            </div>
          )}
        </form>

        <dl className="space-y-2 border-t-2 border-brand-deep/50 pt-4 text-xs">
          <div className="flex items-center justify-between text-white/55">
            <dt>Subtotal</dt>
            <dd className="font-semibold text-white/80">{formatPrice(subtotal, currency)}</dd>
          </div>

          {tax > 0 ? (
            <div className="flex items-center justify-between text-white/55">
              <dt>Impuestos</dt>
              <dd className="font-semibold text-white/80">{formatPrice(tax, currency)}</dd>
            </div>
          ) : null}

          {discount > 0 ? (
            <div className="flex items-center justify-between text-emerald-300">
              <dt>Descuento</dt>
              <dd className="font-semibold">−{formatPrice(discount, currency)}</dd>
            </div>
          ) : null}

          <div className="flex items-center justify-between border-t-2 border-brand-deep/50 pt-3">
            <dt className="font-minecraft text-[11px] uppercase tracking-wider text-white">Total</dt>
            <dd className="font-minecraft text-lg font-black text-theme-accent">
              {formatPrice(total, currency)}
            </dd>
          </div>
        </dl>

        <button
          type="button"
          onClick={() => void checkout()}
          disabled={checkingOut}
          className="btn-3d w-full px-5 py-3.5 text-xs"
        >
          {checkingOut ? <Loader2 className="size-4 animate-spin" /> : <Lock className="size-4" />}
          {checkingOut ? "Abriendo pago…" : "Tramitar pedido"}
        </button>

        <p className="flex items-start gap-1.5 text-[10px] leading-relaxed text-white/35">
          <Lock className="mt-0.5 size-3 shrink-0 text-emerald-400/70" />
          Pago seguro en el checkout de Tebex. No almacenamos datos de tu tarjeta.
        </p>

        <div className="rounded-lg border border-brand-deep/50 bg-black/25 px-3 py-2.5">
          <p className="text-[9px] font-bold uppercase tracking-wider text-white/35">Soporte</p>
          <a
            href={site.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-[#ffd27a] transition hover:text-white"
          >
            ¿Problemas con tu compra? Abre un ticket →
          </a>
        </div>
      </aside>
    </div>
  );
}
