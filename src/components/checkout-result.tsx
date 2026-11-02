"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Clock3, Copy, MessageCircle, XCircle } from "lucide-react";

import { useStore } from "@/components/store-provider";
import { site } from "@/lib/site";

type CheckoutResultProps = {
  variant: "complete" | "cancel";
  reference?: string | null;
};

export function CheckoutResult({ variant, reference }: CheckoutResultProps) {
  const { refreshBasket, showToast } = useStore();
  const [copied, setCopied] = useState(false);
  const handled = useRef(false);

  useEffect(() => {
    if (variant !== "complete" || handled.current) return;
    handled.current = true;

    const clear = async () => {
      try {
        await fetch("/api/basket", { method: "DELETE" });
      } finally {
        await refreshBasket();
      }
    };

    void clear();
  }, [variant, refreshBasket]);

  const copyReference = async () => {
    if (!reference) return;
    try {
      await navigator.clipboard.writeText(reference);
      setCopied(true);
      showToast("Referencia copiada.");
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const complete = variant === "complete";

  return (
    <div className="surface relative mx-auto max-w-2xl overflow-hidden rounded-2xl px-6 py-10 text-center sm:px-10 sm:py-14">
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-56 ${
          complete
            ? "bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(16,185,129,0.22),transparent_70%)]"
            : "bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(225,29,72,0.22),transparent_70%)]"
        }`}
      />

      <div className="relative">
        <span
          className={`mx-auto flex size-16 items-center justify-center rounded-2xl border ${
            complete
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
              : "border-brand-700/50 bg-brand-900/25 text-brand-300"
          }`}
        >
          {complete ? <CheckCircle2 className="size-8" /> : <XCircle className="size-8" />}
        </span>

        <p className="label-pixel mt-5">{complete ? "Pedido completado" : "Pago cancelado"}</p>
        <h1 className="mt-2 text-balance font-display text-xl text-white sm:text-2xl">
          {complete ? "¡Gracias por tu compra!" : "No se ha completado el pago"}
        </h1>

        <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-white/50 sm:text-sm">
          {complete
            ? "Hemos recibido tu pedido. Las recompensas se entregan automáticamente en el servidor en menos de 5 minutos. Asegúrate de estar conectado con el nick que indicaste."
            : "Tu carrito sigue guardado. Puedes volver a intentarlo cuando quieras o contactar con soporte si el problema continúa."}
        </p>

        {complete && reference ? (
          <div className="mx-auto mt-5 flex max-w-sm items-center justify-between gap-2 rounded-xl border border-brand-900/60 bg-black/30 px-3 py-2.5">
            <div className="min-w-0 text-left">
              <p className="text-[9px] font-bold uppercase tracking-wider text-white/35">Referencia</p>
              <p className="truncate font-mono text-[11px] text-white/80">{reference}</p>
            </div>
            <button
              type="button"
              onClick={() => void copyReference()}
              className="btn-ghost shrink-0 px-2.5 py-1.5 text-[10px]"
            >
              <Copy className="size-3" />
              {copied ? "Copiado" : "Copiar"}
            </button>
          </div>
        ) : null}

        {complete ? (
          <div className="mx-auto mt-5 flex max-w-md items-start gap-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] px-4 py-3 text-left">
            <Clock3 className="mt-0.5 size-4 shrink-0 text-emerald-300" />
            <p className="text-[11px] leading-relaxed text-emerald-100/70">
              Si pasados 20 minutos no has recibido nada, abre un ticket en Discord con tu nick y la
              referencia del pedido.
            </p>
          </div>
        ) : null}

        <div className="mt-7 flex flex-col justify-center gap-2.5 sm:flex-row">
          <Link href={complete ? "/categorias" : "/carrito"} className="btn-3d px-5 py-3 text-xs">
            {complete ? "Seguir comprando" : "Volver al carrito"}
          </Link>
          <a
            href={site.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost px-5 py-3 text-xs"
          >
            <MessageCircle className="size-4" />
            Contactar soporte
          </a>
        </div>
      </div>
    </div>
  );
}
