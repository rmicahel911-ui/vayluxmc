"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Check, Loader2, ShoppingCart, Zap } from "lucide-react";

import { QuantityStepper } from "@/components/quantity-stepper";
import { useStore } from "@/components/store-provider";
import { formatPrice } from "@/lib/format";

type AddToCartProps = {
  ident: string;
  name: string;
  price: number;
  currency: string;
  allowQuantity?: boolean;
};

export function AddToCart({ ident, name, price, currency, allowQuantity = true }: AddToCartProps) {
  const router = useRouter();
  const { username, openLogin, refreshBasket, showToast } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [pending, setPending] = useState<"add" | "buy" | null>(null);
  const [added, setAdded] = useState(false);

  const add = async (redirect: boolean) => {
    if (!username) {
      showToast("Escribe tu nick de Minecraft para continuar.");
      openLogin();
      return;
    }

    setPending(redirect ? "buy" : "add");
    try {
      const response = await fetch("/api/basket/package", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ident, quantity, username }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        showToast(data.error ?? "No se pudo añadir el paquete al carrito.");
        return;
      }

      await refreshBasket();
      setAdded(true);
      showToast(`${name} añadido al carrito.`);
      window.setTimeout(() => setAdded(false), 2200);

      if (redirect) router.push("/carrito");
    } catch {
      showToast("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setPending(null);
    }
  };

  const total = price * quantity;

  return (
    <div className="space-y-3">
      {allowQuantity ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-brand-900/60 bg-black/25 px-3 py-2.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-white/55">Cantidad</span>
          <div className="flex items-center gap-3">
            <QuantityStepper value={quantity} onChange={setQuantity} max={10} />
            <span className="min-w-16 text-right font-display text-sm text-white">
              {formatPrice(total, currency)}
            </span>
          </div>
        </div>
      ) : null}

      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={() => void add(false)}
          disabled={pending !== null}
          className="btn-3d flex-1 px-5 py-3.5 text-xs"
        >
          {pending === "add" ? (
            <Loader2 className="size-4 animate-spin" />
          ) : added ? (
            <Check className="size-4" />
          ) : (
            <ShoppingCart className="size-4" />
          )}
          {pending === "add" ? "Añadiendo…" : added ? "Añadido" : "Añadir al carrito"}
        </button>

        <button
          type="button"
          onClick={() => void add(true)}
          disabled={pending !== null}
          className="btn-ghost flex-1 px-5 py-3.5 text-xs"
        >
          {pending === "buy" ? <Loader2 className="size-4 animate-spin" /> : <Zap className="size-4" />}
          {pending === "buy" ? "Preparando…" : "Comprar ahora"}
        </button>
      </div>

      <p className="text-center text-[10px] leading-relaxed text-white/35 sm:text-left">
        {username
          ? `Se entregará a la cuenta ${username}.`
          : "Escribe tu nick primero; lo usamos para entregarte la compra."}
      </p>
    </div>
  );
}
