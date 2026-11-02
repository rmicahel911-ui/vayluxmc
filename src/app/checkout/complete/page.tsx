import type { Metadata } from "next";

import { CheckoutResult } from "@/components/checkout-result";

export const metadata: Metadata = {
  title: "Pedido completado",
  description: "Tu pedido se ha completado correctamente.",
  robots: { index: false, follow: false },
};

type CompletePageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function firstValue(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0] ?? null;
  return value ?? null;
}

export default async function CheckoutCompletePage({ searchParams }: CompletePageProps) {
  const params = await searchParams;
  const reference =
    firstValue(params.transaction_id) ??
    firstValue(params.txn_id) ??
    firstValue(params.order_id) ??
    firstValue(params.id);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-16">
      <CheckoutResult variant="complete" reference={reference} />

      <div className="mx-auto mt-6 grid max-w-2xl gap-2 sm:grid-cols-3">
        {[
          { step: "1", title: "Pago confirmado", text: "Tebex ha procesado tu pago correctamente." },
          { step: "2", title: "Entrega", text: "El servidor ejecutará la entrega automáticamente." },
          { step: "3", title: "Disfruta", text: "Conéctate y usa tus recompensas." },
        ].map((item) => (
          <div key={item.step} className="rounded-xl border border-brand-900/50 bg-night-900/50 px-3 py-3">
            <span className="flex size-6 items-center justify-center rounded-md bg-brand-600/15 font-display text-[10px] text-brand-300">
              {item.step}
            </span>
            <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-white/70">{item.title}</p>
            <p className="mt-0.5 text-[10px] leading-relaxed text-white/35">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
