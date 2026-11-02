import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BadgeCheck,
  ChevronRight,
  Clock3,
  CreditCard,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

import { AddToCart } from "@/components/add-to-cart";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { DemoBanner } from "@/components/demo-banner";
import { FaqList } from "@/components/faq-list";
import { PackageCard } from "@/components/package-card";
import { PackageGallery } from "@/components/package-gallery";
import { discountPercent, formatPrice, stripHtml, truncate } from "@/lib/format";
import { site } from "@/lib/site";
import { getCatalog, getPackage } from "@/lib/tebex";
import type { TebexPackage } from "@/lib/types";

export const revalidate = 60;

type PackagePageProps = {
  params: Promise<{ ident: string }>;
};

async function loadPackage(ident: string): Promise<TebexPackage | null> {
  try {
    const result = await getPackage(decodeURIComponent(ident));
    return result.package;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PackagePageProps): Promise<Metadata> {
  const { ident } = await params;
  const item = await loadPackage(ident);

  if (!item) return { title: "Paquete no encontrado" };

  const description =
    truncate(stripHtml(item.description ?? ""), 155) ||
    `${item.name} con entrega automática en ${site.server.name}.`;

  return {
    title: item.name,
    description,
    alternates: { canonical: `/paquete/${item.ident}` },
    openGraph: {
      title: item.name,
      description,
      images: [item.image || "/images/og.svg"],
    },
  };
}

export default async function PackagePage({ params }: PackagePageProps) {
  const { ident } = await params;
  const result = await getPackage(decodeURIComponent(ident)).catch(() => null);

  if (!result) notFound();

  const item = result.package;
  const catalog = await getCatalog();
  const discount = discountPercent(item.base_price, item.total_price);

  const images =
    item.media
      ?.filter((media) => media.type === "image")
      .map((media) => ({ url: media.url, label: media.name ?? item.name })) ?? [];

  if (images.length === 0) {
    images.push({ url: item.image || "/images/package-fallback.svg", label: item.name });
  }

  const related = catalog.packages
    .filter((candidate) => candidate.category?.id === item.category?.id && candidate.ident !== item.ident)
    .slice(0, 4);

  const categorySlug = item.category?.id
    ? (catalog.categories.find((c) => c.id === item.category?.id)?.slug ?? String(item.category.id))
    : null;

  const highlights = [
    { icon: Zap, title: "Entrega automática", text: "En menos de 5 minutos tras el pago." },
    { icon: BadgeCheck, title: "Java & Bedrock", text: "Compatible con todas las versiones." },
    { icon: ShieldCheck, title: "Pago seguro", text: "Checkout cifrado gestionado por Tebex." },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-4 md:px-6">
      <Breadcrumbs
        items={[
          { label: "Tienda", href: "/categorias" },
          {
            label: item.category?.name ?? "Paquetes",
            href: categorySlug
              ? `/category/${encodeURIComponent(categorySlug)}`
              : "/categorias",
          },
          { label: item.name },
        ]}
      />

      {result.demo ? <DemoBanner reason={result.demoReason} /> : null}

      <div className="grid items-start gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <div className="space-y-4">
          <PackageGallery images={images} alt={item.name} />

          <div className="relative overflow-hidden rounded-2xl border-2 border-brand-deep bg-[#170a0e]/95 p-5 shadow-[0_6px_0_#3a0a17] sm:p-6">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-theme-accent" />
              <h2 className="font-minecraft text-sm font-black uppercase tracking-wide text-white">
                Qué incluye
              </h2>
            </div>
            <div
              className="psky-store mt-3 text-xs"
              dangerouslySetInnerHTML={{ __html: item.description || "<p>Sin descripción.</p>" }}
            />
          </div>
        </div>

        <div className="space-y-4 lg:sticky lg:top-6">
          <div className="relative overflow-hidden rounded-2xl border-2 border-brand-deep bg-[#170a0e]/95 p-5 shadow-[0_6px_0_#3a0a17] sm:p-6">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_80%_0%,rgba(225,29,72,0.2),transparent_65%)]" />

            <div className="relative">
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href="/categorias"
                  className="rounded-md border-2 border-brand-deep/60 bg-black/40 px-2 py-1 font-minecraft text-[9px] font-bold uppercase tracking-wider text-[#ffd27a] transition hover:border-[#e11d48] hover:text-white"
                >
                  {item.category?.name ?? "Paquete"}
                </Link>
                {discount > 0 ? (
                  <span className="rounded-md border border-accent-400/40 bg-accent-500/15 px-2 py-1 font-minecraft text-[9px] font-black uppercase tracking-wider text-accent-200">
                    Ahorra {discount}%
                  </span>
                ) : null}
                {item.type === "subscription" ? (
                  <span className="rounded-md border border-[#ffb81f]/30 bg-[#ffb81f]/10 px-2 py-1 font-minecraft text-[9px] font-bold uppercase tracking-wider text-[#ffd27a]">
                    Suscripción
                  </span>
                ) : null}
              </div>

              <h1 className="mt-3 text-balance font-minecraft text-xl font-black uppercase leading-tight tracking-wide text-white sm:text-2xl">
                {item.name}
              </h1>

              <p className="mt-2 text-xs leading-relaxed text-white/50">
                {truncate(stripHtml(item.description ?? ""), 170)}
              </p>

              <div className="mt-5 flex items-end gap-3">
                <span className="font-minecraft text-2xl font-black text-theme-accent drop-shadow-[0_0_14px_rgba(255,184,31,0.25)] sm:text-3xl">
                  {formatPrice(item.total_price, item.currency)}
                </span>
                {discount > 0 ? (
                  <span className="pb-1 text-sm font-semibold text-white/30 line-through">
                    {formatPrice(item.base_price, item.currency)}
                  </span>
                ) : null}
              </div>
              <p className="mt-1 text-[10px] text-white/35">
                Impuestos incluidos · Precio final en {item.currency}
              </p>

              <div className="mt-5">
                <AddToCart
                  ident={item.ident}
                  name={item.name}
                  price={item.total_price}
                  currency={item.currency}
                  allowQuantity={!item.disable_quantity}
                />
              </div>
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
            {highlights.map((highlight) => (
              <div
                key={highlight.title}
                className="flex items-center gap-3 rounded-xl border-2 border-brand-deep/70 bg-[#170a0e]/90 px-3 py-2.5 shadow-[0_3px_0_#3a0a17]"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-brand-deep bg-[#e11d48]/15 text-[#ffd27a]">
                  <highlight.icon className="size-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-white">{highlight.title}</p>
                  <p className="truncate text-[10px] text-white/40">{highlight.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border-2 border-brand-deep bg-[#170a0e]/95 p-4 shadow-[0_5px_0_#3a0a17]">
            <div className="flex items-start gap-2.5">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-300">
                <Clock3 className="size-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Entrega en {site.server.name}</p>
                <p className="mt-0.5 text-[10px] leading-relaxed text-white/45">
                  Conéctate a{" "}
                  <span className="font-mono text-[#ffd27a]">{site.server.javaIp}</span> con el nick
                  indicado. Si no llega en 20 minutos, abre un ticket.
                </p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5 border-t border-brand-deep/40 pt-3">
              {["Visa", "Mastercard", "PayPal", "Apple Pay", "Google Pay"].map((method) => (
                <span
                  key={method}
                  className="rounded border border-brand-deep/60 bg-black/30 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-white/35"
                >
                  {method}
                </span>
              ))}
              <span className="text-[8px] font-semibold uppercase tracking-wide text-white/25">
                +100 métodos
              </span>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="relative overflow-hidden rounded-2xl border-2 border-brand-deep bg-[#170a0e]/95 p-5 shadow-[0_6px_0_#3a0a17] sm:p-6">
          <p className="label-pixel flex items-center gap-1.5">
            <PackageCheck className="size-3" />
            Antes de comprar
          </p>
          <h2 className="mt-2 font-minecraft text-base font-black uppercase tracking-wide text-white">
            Información de entrega
          </h2>
          <ul className="mt-3 space-y-2.5">
            {[
              "Revisa que tu nick esté escrito exactamente igual que en Minecraft.",
              "La entrega es automática; no necesitas reclamar nada.",
              "Los artículos son virtuales y no reemplazan compras anteriores.",
              "Puedes combinar varios paquetes en un mismo pedido.",
            ].map((line) => (
              <li key={line} className="flex items-start gap-2 text-[11px] leading-relaxed text-white/50">
                <ChevronRight className="mt-0.5 size-3 shrink-0 text-[#e11d48]" />
                {line}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-brand-deep/50 bg-black/25 px-3 py-2">
            <CreditCard className="size-3.5 text-[#ffd27a]" />
            <p className="text-[10px] text-white/45">
              Puedes pagar con tarjeta, PayPal, Google Pay, Apple Pay y métodos locales.
            </p>
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-minecraft text-base font-black uppercase tracking-wide text-white">
              Preguntas frecuentes
            </h2>
            <Link
              href="/como-iniciar-sesion#faq"
              className="text-[10px] font-bold uppercase tracking-wider text-[#ffd27a] transition hover:text-white"
            >
              Ver todas
            </Link>
          </div>
          <FaqList items={site.faqs.slice(0, 4)} />
        </div>
      </section>

      {related.length > 0 ? (
        <section className="mt-10">
          <div className="mb-4 flex flex-col gap-1">
            <p className="font-minecraft text-[10px] font-bold uppercase tracking-widest text-[#ffd27a]">
              También te puede interesar
            </p>
            <h2 className="font-minecraft text-lg font-black uppercase tracking-wide text-white sm:text-xl">
              Más de {item.category?.name ?? "esta categoría"}
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((candidate) => (
              <PackageCard key={candidate.ident} item={candidate} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
