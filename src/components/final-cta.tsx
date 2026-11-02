import Link from "next/link";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";

import { site } from "@/lib/site";

type FinalCtaProps = {
  title?: string;
  text?: string;
  primaryHref?: string;
  primaryLabel?: string;
};

export function FinalCta({
  title = "¿Listo para subir de nivel?",
  text = "Elige tu paquete, paga de forma segura y recibe tus recompensas automáticamente en el servidor.",
  primaryHref = "/categorias",
  primaryLabel = "Explorar la tienda",
}: FinalCtaProps) {
  return (
    <section className="surface relative overflow-hidden rounded-2xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_120%_at_15%_0%,rgba(225,29,72,0.22),transparent_65%)]" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/hero-chest.svg"
        alt=""
        className="pointer-events-none absolute -bottom-10 -right-6 hidden h-56 w-auto opacity-70 sm:block lg:h-64"
      />

      <div className="relative z-10 flex flex-col gap-5 p-6 sm:p-8 lg:max-w-xl">
        <div>
          <p className="label-pixel flex items-center gap-1.5">
            <Sparkles className="size-3" />
            Apoya el servidor
          </p>
          <h2 className="mt-2 text-balance font-display text-xl text-white sm:text-2xl">{title}</h2>
          <p className="mt-2 text-xs leading-relaxed text-white/50 sm:text-sm">{text}</p>
        </div>

        <div className="flex flex-col gap-2.5 sm:flex-row">
          <Link href={primaryHref} className="btn-3d px-5 py-3 text-xs">
            {primaryLabel}
            <ArrowRight className="size-4" />
          </Link>
          <a
            href={site.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost px-5 py-3 text-xs"
          >
            <MessageCircle className="size-4" />
            Unirse a Discord
          </a>
        </div>
      </div>
    </section>
  );
}
