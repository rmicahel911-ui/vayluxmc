import { FlaskConical, Settings2 } from "lucide-react";

export function DemoBanner({ reason }: { reason?: string }) {
  return (
    <div className="mb-6 flex flex-col gap-3 rounded-xl border border-accent-400/30 bg-accent-500/[0.06] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border border-accent-400/30 bg-accent-500/10 text-accent-300">
          <FlaskConical className="size-4" />
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-accent-200">Modo demo activo</p>
          <p className="mt-0.5 text-[11px] leading-relaxed text-accent-100/60">
            {reason ?? "Añade tu token de Tebex para mostrar el catálogo real."} El carrito y los cupones
            funcionan de verdad con datos de ejemplo.
          </p>
        </div>
      </div>
      <p className="flex shrink-0 items-center gap-1.5 rounded-lg border border-accent-400/20 bg-black/25 px-2.5 py-1.5 font-mono text-[10px] text-accent-200/80">
        <Settings2 className="size-3" />
        TEBEX_PUBLIC_TOKEN
      </p>
    </div>
  );
}
