import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PixelImage } from "@/components/pixel-image";
import { discountPercent, formatPrice, stripHtml, truncate } from "@/lib/format";
import type { TebexPackage } from "@/lib/types";

export function PackageCard({ item }: { item: TebexPackage }) {
  const media = item.media?.find((entry) => entry.primary) ?? item.media?.[0];
  const image = media?.url || item.image || "/images/package-fallback.svg";
  const discount = discountPercent(item.base_price, item.total_price);
  const description = truncate(stripHtml(item.description ?? ""), 110);

  return (
    <Link
      href={`/paquete/${encodeURIComponent(item.ident)}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border-2 border-brand-deep bg-[#170a0e]/95 shadow-[0_6px_0_#3a0a17] transition-all hover:-translate-y-1 hover:border-[#e11d48] hover:shadow-[0_10px_0_#3a0a17]"
    >
      <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-brand-deep/60 bg-black/50">
        <div className="absolute inset-0 bg-radial from-[#e11d48]/20 via-transparent to-transparent" />
        <PixelImage
          src={image}
          alt={item.name}
          className="relative h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0f0508] to-transparent" />

        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <span className="rounded-md border border-brand-deep/60 bg-black/60 px-2 py-1 font-minecraft text-[9px] font-bold uppercase tracking-wider text-[#ffd27a] backdrop-blur">
            {item.category?.name ?? "Paquete"}
          </span>
          {discount > 0 ? (
            <span className="rounded-md border border-accent-400/40 bg-accent-500/15 px-2 py-1 font-minecraft text-[9px] font-black uppercase tracking-wider text-accent-200 backdrop-blur">
              -{discount}%
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-minecraft text-sm font-bold leading-snug tracking-wide text-white transition group-hover:text-[#ffd27a]">
          {item.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-[11px] leading-relaxed text-white/45">{description}</p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div>
            {discount > 0 ? (
              <p className="text-[10px] font-semibold text-white/30 line-through">
                {formatPrice(item.base_price, item.currency)}
              </p>
            ) : null}
            <p className="font-minecraft text-base text-[#ffd27a]">
              {formatPrice(item.total_price, item.currency)}
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-brand-hover/50 bg-[#e11d48] px-2.5 py-1.5 font-minecraft text-[10px] font-bold uppercase tracking-wide text-white shadow-[0_3px_0_#9f1239] transition group-hover:bg-brand-hover">
            Ver
            <ArrowRight className="size-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}
