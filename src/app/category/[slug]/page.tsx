import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { CategoryPackageCard } from "@/components/category-package-card";
import { DemoBanner } from "@/components/demo-banner";
import { PixelImage } from "@/components/pixel-image";
import { cn, stripHtml } from "@/lib/format";
import { getCatalog } from "@/lib/tebex";

export const revalidate = 60;

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

async function findCategory(slug: string) {
  const catalog = await getCatalog();
  const decoded = decodeURIComponent(slug);
  const category = catalog.categories.find(
    (item) => item.slug === decoded || String(item.id) === decoded,
  );
  return { catalog, category };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { category } = await findCategory(slug);

  if (!category) return { title: "Categoría no encontrada" };

  const description =
    stripHtml(category.description ?? "").slice(0, 155) ||
    `Paquetes de ${category.name} con entrega automática.`;

  return {
    title: category.name,
    description,
    alternates: { canonical: `/category/${category.slug ?? category.id}` },
    openGraph: {
      title: category.name,
      description,
      images: [category.image_url || "/images/og.svg"],
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const { catalog, category } = await findCategory(slug);

  if (!category) notFound();

  const packages = category.packages ?? [];
  const children = catalog.categories.filter((item) => item.parent?.id === category.id);
  const chips = children.length > 0 ? children : catalog.categories;
  const subtitle = category.parent?.name ?? "Paquetes disponibles";

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 pb-16 pt-4 md:px-6">
      {catalog.demo ? <DemoBanner reason={catalog.demoReason} /> : null}

      <div className="relative grid min-h-35 grid-cols-1 items-center gap-6 md:min-h-42.5 md:grid-cols-2">
        <div className="z-10 flex flex-col items-center text-center md:items-start md:text-left">
          <h1 className="font-minecraft text-xl font-bold tracking-wider text-white drop-shadow-[0_0_20px_rgba(225,29,72,0.5)] sm:text-2xl md:text-3xl lg:text-4xl">
            {category.name}
          </h1>
          <span className="mt-1 font-minecraft text-xs font-medium tracking-wide text-[#ffb81f] sm:text-sm">
            ➥ {subtitle}
          </span>
        </div>

        <div className="relative hidden h-45 items-center justify-center md:flex lg:h-50">
          <div className="pointer-events-none absolute inset-0 bg-radial from-[#e11d48]/35 via-[#be123c]/15 to-transparent blur-3xl" />
          <PixelImage
            src="/images/server-datos.png"
            alt="Mascota"
            loading="eager"
            className="z-10 h-auto w-45 animate-hero-float object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)] lg:w-52.5"
          />
        </div>
      </div>

      <div className="flex flex-col items-start gap-6 lg:flex-row">
        <aside className="sticky top-0 z-40 w-full shrink-0 bg-[#1f0710]/95 py-1.5 backdrop-blur-md lg:top-4 lg:w-67.5 lg:bg-transparent lg:py-0 lg:backdrop-blur-none">
          <div className="rounded-2xl border-2 border-brand-deep bg-[#170a0e]/95 p-4 shadow-[0_6px_0_#3a0a17] backdrop-blur-md">
            <div className="mb-3.5 flex min-w-0 items-center gap-2.5 border-b-2 border-brand-deep/50 pb-3.5">
              <PixelImage
                src={category.image_url || "/images/category-chest.svg"}
                alt={category.name}
                className="pixelated size-6 shrink-0 object-contain"
              />
              <span className="truncate font-minecraft text-xs font-black uppercase tracking-wider text-white">
                {category.name}
              </span>
            </div>

            <div className="mb-2 px-1">
              <span className="font-minecraft text-[10px] font-bold uppercase tracking-widest text-[#ffd27a]/70">
                {children.length > 0 ? "Subcategorías" : "Categorías"}
              </span>
            </div>

            <div className="scrollbar-none flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-x-visible lg:pb-0">
              {chips.map((chip) => {
                const active = chip.id === category.id;
                return (
                  <Link
                    key={chip.id}
                    href={`/category/${encodeURIComponent(chip.slug ?? String(chip.id))}`}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative flex shrink-0 select-none items-center justify-between gap-3 overflow-hidden rounded-xl border-2 px-3.5 py-2.5 text-left font-minecraft text-xs transition-all lg:shrink",
                      active
                        ? "translate-y-0.5 border-brand-hover bg-[#e11d48] font-bold text-white shadow-[0_3px_0_#9f1239]"
                        : "border-brand-deep/70 bg-[#170a0e] text-white/80 shadow-[0_3px_0_#2a0812] hover:border-[#e11d48] hover:text-white",
                    )}
                  >
                    <div className="relative z-10 flex min-w-0 items-center gap-2">
                      <ChevronRight
                        className={cn(
                          "size-3.5 transition-transform",
                          active ? "translate-x-0.5 text-white" : "text-[#ffb81f]/50",
                        )}
                      />
                      <span className={cn("truncate", active ? "text-white" : "text-white/90")}>
                        {chip.name}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </aside>

        <main className="relative z-10 w-full min-w-0 flex-1">
          <div className="relative overflow-hidden rounded-2xl border-2 border-brand-deep bg-[#170a0e]/95 p-5 shadow-[0_8px_0_#3a0a17] md:p-7">
            <div className="corner-decor-tr" />

            <div className="mb-6 flex items-center justify-between border-b-2 border-brand-deep/50 pb-4">
              <div className="flex items-center gap-2">
                <span className="font-minecraft text-sm font-bold uppercase tracking-wider text-white">
                  {category.name}
                </span>
              </div>
              <Link
                href="/categorias"
                className="font-minecraft text-xs text-[#ffd27a] transition-colors hover:text-white"
              >
                Todas las categorías ➔
              </Link>
            </div>

            {packages.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {packages.map((item) => (
                  <CategoryPackageCard key={item.ident} item={item} />
                ))}
              </div>
            ) : (
              <div className="py-14 text-center">
                <p className="font-minecraft text-sm text-white">Esta categoría está vacía</p>
                <p className="mx-auto mt-2 max-w-sm text-xs leading-relaxed text-white/45">
                  Añade paquetes a esta categoría desde tu panel de Tebex y aparecerán aquí
                  automáticamente.
                </p>
                <Link href="/categorias" className="btn-ghost mt-5 px-4 py-2.5 text-[11px]">
                  Ver otras categorías
                </Link>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
