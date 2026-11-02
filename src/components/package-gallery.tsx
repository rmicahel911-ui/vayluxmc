"use client";

import { useState } from "react";

import { PixelImage } from "@/components/pixel-image";
import { cn } from "@/lib/format";

type GalleryImage = {
  url: string;
  label?: string | null;
};

type PackageGalleryProps = {
  images: GalleryImage[];
  alt: string;
};

export function PackageGallery({ images, alt }: PackageGalleryProps) {
  const gallery = images.length > 0 ? images : [{ url: "/images/package-fallback.svg", label: alt }];
  const [index, setIndex] = useState(0);
  const active = gallery[Math.min(index, gallery.length - 1)];

  return (
    <div className="space-y-3">
      <div className="surface relative overflow-hidden rounded-2xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(225,29,72,0.16),transparent_65%)]" />
        <div className="relative aspect-[4/3] w-full">
          <PixelImage
            src={active.url}
            alt={active.label ?? alt}
            loading="eager"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>

      {gallery.length > 1 ? (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {gallery.map((image, imageIndex) => (
            <button
              key={`${image.url}-${imageIndex}`}
              type="button"
              onClick={() => setIndex(imageIndex)}
              aria-label={`Ver imagen ${imageIndex + 1}`}
              aria-pressed={imageIndex === index}
              className={cn(
                "relative size-16 shrink-0 overflow-hidden rounded-lg border-2 transition",
                imageIndex === index
                  ? "border-brand-500"
                  : "border-brand-900/60 opacity-60 hover:opacity-100",
              )}
            >
              <PixelImage src={image.url} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
