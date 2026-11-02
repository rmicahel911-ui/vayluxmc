import type { Metadata } from "next";

import { CategoryCard } from "@/components/category-card";
import { DemoBanner } from "@/components/demo-banner";
import { Layers } from "lucide-react";
import { site } from "@/lib/site";
import { getCatalog } from "@/lib/tebex";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Tienda Oficial | Rangos, Beneficios y Cosméticos",
  description:
    "Explora todas las categorías de la tienda: rangos, cosméticos, cajas, monedas y packs con entrega automática para Minecraft Java y Bedrock.",
  alternates: { canonical: "/categorias" },
};

export default async function CategoriesPage() {
  const catalog = await getCatalog();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-4 md:px-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="mb-1 inline-flex items-center gap-2 font-minecraft text-[10px] font-bold uppercase tracking-wider text-[#ffd27a] sm:text-xs">
            <Layers className="size-3.5 text-[#e11d48] sm:size-4" />
            <span>Tienda Oficial {site.server.name}</span>
          </div>
          <h1 className="font-minecraft text-xl font-black uppercase tracking-tight text-white sm:text-2xl md:text-3xl">
            Categorías Principales
          </h1>
        </div>
      </div>

      {catalog.demo ? (
        <div className="mb-5">
          <DemoBanner reason={catalog.demoReason} />
        </div>
      ) : null}

      {catalog.categories.length > 0 ? (
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {catalog.categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border-2 border-brand-deep bg-[#170a0e]/95 px-6 py-14 text-center shadow-[0_6px_0_#3a0a17]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/category-chest.svg"
            alt=""
            aria-hidden="true"
            className="mx-auto mb-4 h-28 w-auto opacity-80 drop-shadow-[0_12px_20px_rgba(0,0,0,0.6)] sm:h-32"
          />
          <p className="font-minecraft text-sm text-white">Todavía no hay categorías publicadas</p>
          <p className="mx-auto mt-2 max-w-sm text-xs leading-relaxed text-white/45">
            Crea categorías y paquetes en tu panel de Tebex y aparecerán aquí automáticamente.
          </p>
        </div>
      )}
    </div>
  );
}
