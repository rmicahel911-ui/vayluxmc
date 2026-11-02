"use client";

import { useState } from "react";

import { cn } from "@/lib/format";

type PlayerAvatarProps = {
  username?: string | null;
  className?: string;
  size?: number;
  kind?: "head" | "body";
};

export function PlayerAvatar({ username, className, size = 40, kind = "head" }: PlayerAvatarProps) {
  const [failedFor, setFailedFor] = useState<string | null>(null);

  const fallback = "/images/skin-fallback.png";
  const clean = username?.trim() || null;
  const failed = clean !== null && failedFor === clean;
  const src =
    clean && !failed
      ? `https://mc-heads.net/${kind === "body" ? "body" : "avatar"}/${encodeURIComponent(clean)}${
          kind === "body" ? "" : `/${size}`
        }`
      : fallback;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={clean ? `Skin de ${clean}` : "Invitado"}
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      onError={() => setFailedFor(clean)}
      className={cn("pixelated object-contain", className)}
    />
  );
}
