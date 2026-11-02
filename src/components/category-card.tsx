import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PixelImage } from "@/components/pixel-image";
import type { TebexCategory } from "@/lib/types";

export function CategoryCard({ category }: { category: TebexCategory }) {
  return (
    <Link
      href={`/category/${encodeURIComponent(category.slug ?? String(category.id))}`}
      className="group relative flex min-h-55 select-none flex-col justify-between overflow-hidden rounded-2xl border-2 border-brand-deep bg-[#170a0e]/90 p-6 shadow-[0_6px_0_#2a0812] transition-all duration-150 hover:-translate-y-1 hover:border-[#e11d48] hover:shadow-[0_10px_0_#3a0a17] md:p-8"
    >
      <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 [background:radial-gradient(450px_at_-200px_-200px,rgba(225,29,72,0.25),transparent_70%)]" />
      <div className="pointer-events-none absolute right-0 top-0 size-64 rounded-full bg-radial from-[#e11d48]/15 via-transparent to-transparent blur-2xl" />

      <div className="relative z-10 flex max-w-[75%] flex-col gap-1.5 sm:gap-2">
        <h3 className="font-minecraft text-xl font-black uppercase leading-tight tracking-normal text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] transition-colors group-hover:text-[#ffe9b8] sm:text-2xl md:text-3xl">
          {category.name}
        </h3>
      </div>

      <PixelImage
        src={category.image_url || "/images/category-chest.svg"}
        alt={category.name}
        loading="lazy"
        className="pixelated pointer-events-none absolute -bottom-2 -right-2 size-28 object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)] transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-110 sm:size-36 md:size-44"
      />

      <div className="relative z-10 mt-6 flex items-center justify-between border-t border-brand-deep/50 pt-3 sm:mt-8 sm:pt-4">
        <span className="inline-flex items-center gap-2 rounded-xl border border-brand-hover/40 bg-[#e11d48] px-3.5 py-1.5 font-minecraft text-xs font-bold uppercase tracking-wider text-white shadow-[0_3px_0_#9f1239] transition-all group-hover:bg-brand-hover group-hover:shadow-[0_4px_0_#9f1239]">
          <span>Explorar Categoría</span>
          <ArrowRight className="size-3.5 text-white transition-transform group-hover:translate-x-1 sm:size-4" />
        </span>
      </div>
    </Link>
  );
}
