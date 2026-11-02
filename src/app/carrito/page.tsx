import type { Metadata } from "next";
import { LockKeyhole, RotateCcw, Truck, Wallet } from "lucide-react";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { CartView } from "@/components/cart-view";
import { site } from "@/lib/site";
import { getCatalog } from "@/lib/tebex";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Tu carrito",
  description: "Revisa tu pedido, aplica cupones y completa el pago de forma segura con Tebex.",
  robots: { index: false, follow: false },
};

export default async function CartPage() {
  const catalog = await getCatalog();
  const identById = Object.fromEntries(
    catalog.packages.map((item) => [String(item.id), item.ident]),
  );

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: "Tu carrito" }]} />

      <header className="mb-6">
        <p className="font-minecraft text-[10px] font-bold uppercase tracking-widest text-[#ffd27a]">
          Checkout seguro
        </p>
        <h1 className="mt-1 font-minecraft text-xl font-black uppercase tracking-tight text-white sm:text-2xl md:text-3xl">
          Carrito de Invitado
        </h1>
        <p className="mt-2 max-w-2xl text-xs leading-relaxed text-white/45 sm:text-sm">
          Revisa los artículos, aplica tu cupón y paga. La entrega se realiza automáticamente en{" "}
          {site.server.name}.
        </p>
      </header>

      <CartView identById={identById} />

      <div className="mt-8 grid gap-2 sm:grid-cols-3">
        {[
          { icon: LockKeyhole, title: "Pago cifrado", text: "Procesado por Tebex, Merchant of Record." },
          { icon: Truck, title: "Entrega automática", text: "Recibe tu compra en menos de 5 minutos." },
          { icon: RotateCcw, title: "Soporte cercano", text: "Resolvemos cualquier problema por Discord." },
        ].map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-2.5 rounded-xl border-2 border-brand-deep/70 bg-[#170a0e]/90 px-3 py-2.5 shadow-[0_3px_0_#3a0a17]"
          >
            <item.icon className="size-4 shrink-0 text-[#ffd27a]" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/70">{item.title}</p>
              <p className="text-[10px] text-white/35">{item.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-brand-deep/40 bg-black/20 px-4 py-3 text-[10px] text-white/30">
        <Wallet className="size-3.5" />
        Aceptamos tarjeta, PayPal, Google Pay, Apple Pay y más de 100 métodos locales.
      </div>
    </div>
  );
}
