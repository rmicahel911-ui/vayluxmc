import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Clock3,
  CreditCard,
  Gamepad2,
  HelpCircle,
  MessageCircle,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqList } from "@/components/faq-list";
import { FinalCta } from "@/components/final-cta";
import { ServerConnect } from "@/components/server-connect";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cómo comprar",
  description:
    "Guía paso a paso para comprar en la tienda: elige tu nick, añade paquetes al carrito y paga de forma segura con Tebex.",
  alternates: { canonical: "/como-comprar" },
};

const stepIcons = [UserRound, CreditCard, Gamepad2];

const helpCards = [
  {
    icon: Clock3,
    title: "No he recibido mi compra",
    text: "Espera 20 minutos y asegúrate de estar conectado con el nick correcto. Si sigue sin llegar, abre un ticket con tu referencia de pedido.",
  },
  {
    icon: UserRound,
    title: "Me equivoqué de nick",
    text: "Contacta con soporte lo antes posible. Si el artículo aún no se ha entregado, intentaremos corregirlo. Si ya se entregó, no siempre es posible revertirlo.",
  },
  {
    icon: ShieldCheck,
    title: "Pago rechazado",
    text: "Prueba otro método de pago o revisa con tu banco. Tebex nunca almacena los datos de tu tarjeta y algunos bancos bloquean compras internacionales.",
  },
  {
    icon: HelpCircle,
    title: "Quiero un reembolso",
    text: "Los bienes digitales de consumo inmediato no son reembolsables, salvo que la ley aplicable disponga lo contrario. Escríbenos y revisamos tu caso.",
  },
];

export default function HowToBuyPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: "Cómo comprar" }]} />

      <header className="relative overflow-hidden rounded-2xl border-2 border-brand-deep bg-[#170a0e]/95 p-5 shadow-[0_6px_0_#3a0a17] sm:p-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_120%_at_85%_0%,rgba(225,29,72,0.2),transparent_65%)]" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="font-minecraft text-[10px] font-bold uppercase tracking-widest text-[#ffd27a]">Guía rápida</p>
            <h1 className="mt-1 text-balance font-minecraft text-xl font-black uppercase tracking-wide text-white sm:text-2xl md:text-3xl">
              Cómo comprar en {site.name}
            </h1>
            <p className="mt-2 text-xs leading-relaxed text-white/50 sm:text-sm">
              Comprar es muy sencillo: solo necesitas tu nick de Minecraft. No hace falta crear una
              cuenta; el carrito se guarda en tu navegador y el pago se completa en el checkout de Tebex.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <Link href="/categorias" className="btn-3d px-5 py-2.5 text-[11px]">
                Ir a la tienda
                <ArrowRight className="size-3.5" />
              </Link>
              <a
                href={site.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost px-4 py-2.5 text-[11px]"
              >
                <MessageCircle className="size-3.5" />
                Soporte en Discord
              </a>
            </div>
          </div>

          {/* Vista previa del inicio de sesión */}
          <figure className="relative mx-auto w-full max-w-sm shrink-0 lg:mx-0 lg:w-[340px]">
            <div className="overflow-hidden rounded-xl border-2 border-brand-deep bg-[#050203] shadow-[0_6px_0_#3a0a17]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/guide-inicio.png"
                alt="Vista previa del cuadro para elegir plataforma e ingresar el nombre de usuario"
                className="h-auto w-full"
                loading="lazy"
              />
            </div>
            <figcaption className="mt-2 text-center font-minecraft text-[10px] uppercase tracking-wider text-[#ffd27a]/80 lg:text-left">
              Elige tu plataforma y escribe tu nick
            </figcaption>
          </figure>
        </div>
      </header>

      <section className="mt-8">
        <div className="grid gap-4 md:grid-cols-3">
          {site.steps.map((step, index) => {
            const Icon = stepIcons[index] ?? UserRound;
            return (
              <div key={step.title} className="relative overflow-hidden rounded-2xl border-2 border-brand-deep bg-[#170a0e]/95 p-5 shadow-[0_6px_0_#3a0a17]">
                <span className="absolute right-4 top-3 font-minecraft text-4xl text-white/[0.05]">
                  0{index + 1}
                </span>
                <span className="flex size-10 items-center justify-center rounded-xl border-2 border-brand-deep bg-[#e11d48]/15 text-[#ffd27a]">
                  <Icon className="size-5" />
                </span>
                <h2 className="mt-3 font-minecraft text-sm font-black uppercase tracking-wide text-white">{step.title}</h2>
                <p className="mt-1.5 text-[11px] leading-relaxed text-white/45">{step.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border-2 border-brand-deep bg-[#170a0e]/95 p-5 shadow-[0_6px_0_#3a0a17] sm:p-6">
          <p className="font-minecraft text-[10px] font-bold uppercase tracking-widest text-[#ffd27a] flex items-center gap-1.5">
            <CreditCard className="size-3" />
            Métodos de pago
          </p>
          <h2 className="mt-1 font-minecraft text-base font-black uppercase tracking-wide text-white sm:text-lg">Paga como prefieras</h2>
          <p className="mt-2 text-xs leading-relaxed text-white/45">
            Tebex ofrece más de 100 métodos de pago según el país. Verás todos los disponibles al
            tramitar el pedido.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "Visa",
              "Mastercard",
              "American Express",
              "PayPal",
              "Google Pay",
              "Apple Pay",
              "OXXO",
              "PIX",
              "PSE",
              "Mercado Pago",
              "SEPA",
              "Transferencia",
            ].map((method) => (
              <span
                key={method}
                className="rounded-lg border border-brand-deep/60 bg-black/30 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white/45"
              >
                {method}
              </span>
            ))}
          </div>

          {/* Ilustración de integración de pagos */}
          <div className="relative mt-4 overflow-hidden rounded-xl border-2 border-brand-deep/70 bg-[#0f0508]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/integracion.webp"
              alt="Integración de pagos seguros gestionada por Tebex"
              className="h-32 w-full object-cover opacity-50 invert mix-blend-screen sm:h-36"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(15,5,8,0.05)_0%,rgba(15,5,8,0.2)_55%,rgba(15,5,8,0.88)_100%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_100%_at_85%_0%,rgba(225,29,72,0.28),transparent_70%)]" />
            <p className="absolute inset-x-0 bottom-0 p-3 font-minecraft text-[10px] font-bold uppercase tracking-[2px] text-[#ffd27a] sm:text-xs">
              Checkout seguro · Tebex
            </p>
          </div>

          <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] px-3.5 py-3">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-emerald-300" />
            <p className="text-[11px] leading-relaxed text-emerald-100/70">
              El pago lo procesa Tebex Limited como Merchant of Record. Nosotros nunca vemos ni
              almacenamos los datos de tu tarjeta.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-brand-deep bg-[#170a0e]/95 p-5 shadow-[0_6px_0_#3a0a17] sm:p-6">
          <p className="font-minecraft text-[10px] font-bold uppercase tracking-widest text-[#ffd27a] flex items-center gap-1.5">
            <BadgeCheck className="size-3" />
            Antes de pagar
          </p>
          <h2 className="mt-1 font-minecraft text-base font-black uppercase tracking-wide text-white sm:text-lg">Revisa estos detalles</h2>
          <ul className="mt-4 space-y-3">
            {[
              "Tu nick debe coincidir exactamente con el de Minecraft, incluidas mayúsculas y números.",
              "Si juegas en Bedrock, usa el mismo nombre que aparece en el servidor.",
              "Puedes añadir varios paquetes al carrito y pagarlos juntos.",
              "Los cupones se aplican antes de tramitar el pedido.",
              "La entrega se hace al nick indicado; no se puede transferir después.",
            ].map((line) => (
              <li key={line} className="flex items-start gap-2 text-[11px] leading-relaxed text-white/50">
                <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-[#e11d48]/20 text-[8px] font-bold text-[#ffd27a]">
                  ✓
                </span>
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-6">
        <ServerConnect />
      </section>

      <section className="mt-6 grid gap-3 sm:grid-cols-2">
        {helpCards.map((card) => (
          <div key={card.title} className="rounded-2xl border-2 border-brand-deep bg-[#170a0e]/95 p-4 shadow-[0_4px_0_#3a0a17]">
            <div className="flex items-start gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-brand-deep bg-[#e11d48]/15 text-[#ffd27a]">
                <card.icon className="size-4" />
              </span>
              <div>
                <h3 className="text-xs font-bold text-white">{card.title}</h3>
                <p className="mt-1 text-[11px] leading-relaxed text-white/45">{card.text}</p>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section id="faq" className="mt-10 scroll-mt-24">
        <div className="mb-4 max-w-2xl">
          <p className="font-minecraft text-[10px] font-bold uppercase tracking-widest text-[#ffd27a]">FAQ</p>
          <h2 className="mt-1 text-balance font-minecraft text-lg font-black uppercase tracking-wide text-white sm:text-xl md:text-2xl">
            Preguntas frecuentes
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-white/45">
            Si no encuentras tu respuesta, escríbenos por Discord y te ayudamos.
          </p>
        </div>
        <FaqList items={site.faqs} />
      </section>

      <div className="mt-10">
        <FinalCta
          title="Todo listo para comprar"
          text="Explora el catálogo y elige tu primer paquete. La entrega es automática y el pago es seguro."
          primaryHref="/categorias"
          primaryLabel="Ver paquetes"
        />
      </div>
    </div>
  );
}
