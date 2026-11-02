import { CreditCard, Heart, ShieldCheck, Zap, type LucideIcon } from "lucide-react";

import { site, type BenefitIcon } from "@/lib/site";

const icons: Record<BenefitIcon, LucideIcon> = {
  zap: Zap,
  shield: ShieldCheck,
  card: CreditCard,
  heart: Heart,
};

export function Benefits() {
  return (
    <section className="relative overflow-hidden rounded-2xl border-2 border-brand-deep bg-[#170a0e]/95 p-5 shadow-[0_6px_0_#3a0a17] sm:p-6 md:p-8">
      <div className="corner-decor-tr" />

      <div className="flex flex-col justify-between gap-4 border-b-2 border-brand-deep/50 pb-5 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.png" alt="" className="size-9 shrink-0 object-contain drop-shadow-md sm:size-10" />
          <div>
            <span className="block font-minecraft text-[10px] font-bold uppercase tracking-widest text-[#ffd27a] sm:text-[11px]">
              Beneficios y Garantías
            </span>
            <h2 className="font-minecraft text-lg font-black tracking-wide text-white sm:text-xl md:text-2xl">
              ¿Por qué comprar en nuestra tienda?
            </h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 border-b-2 border-brand-deep/50 py-5 sm:grid-cols-2 sm:py-6 xl:grid-cols-4">
        {site.benefits.map((benefit) => {
          const Icon = icons[benefit.icon];
          return (
            <div key={benefit.title} className="space-y-1.5">
              <div className="flex size-7 items-center justify-center rounded-lg border border-brand-deep bg-[#e11d48]/15 text-[#e11d48] sm:size-8">
                <Icon className="size-3.5 sm:size-4" />
              </div>
              <h3 className="font-minecraft text-xs font-bold tracking-wide text-white sm:text-[13px]">
                {benefit.title}
              </h3>
              <p className="text-[10px] leading-relaxed text-white/65 sm:text-[11px]">{benefit.text}</p>
            </div>
          );
        })}
      </div>

      <div className="space-y-2 pt-5 text-center">
        <p className="mx-auto max-w-2xl text-[10px] leading-relaxed text-white/50 sm:text-[11px]">
          Todos los pagos son finales y no son reembolsables. El intento de reembolsar un pago tendrá
          como consecuencia una prohibición permanente e irreversible de nuestro servidor. El tiempo de
          espera suele ser de 5 a 20 minutos.
        </p>
      </div>
    </section>
  );
}
