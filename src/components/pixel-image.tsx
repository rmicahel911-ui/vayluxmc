/* eslint-disable @next/next/no-img-element */
import type { CSSProperties } from "react";

import { cn } from "@/lib/format";

type PixelImageProps = {
  src?: string | null;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  style?: CSSProperties;
  loading?: "lazy" | "eager";
  pixelated?: boolean;
};

export function PixelImage({
  src,
  alt,
  className,
  width,
  height,
  style,
  loading = "lazy",
  pixelated = false,
}: PixelImageProps) {
  return (
    <img
      src={src || "/images/package-fallback.svg"}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
      draggable={false}
      className={cn(pixelated && "pixelated", className)}
      style={style}
    />
  );
}
