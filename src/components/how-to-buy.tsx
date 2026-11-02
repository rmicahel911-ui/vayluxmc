import { site } from "@/lib/site";

export function HowToBuy() {
  return (
    <section className="relative overflow-hidden rounded-2xl border-2 border-brand-deep bg-[#170a0e]/95 p-5 shadow-[0_6px_0_#3a0a17] sm:p-6 md:p-8">
      <div className="mb-6 text-center sm:mb-8">
        <h3 className="font-minecraft text-lg font-black uppercase tracking-wide text-white sm:text-xl md:text-2xl">
          ¿Cómo comprar en <span className="text-[#e11d48]">la tienda</span>?
        </h3>
      </div>

      <div className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {site.steps.map((step, index) => (
          <div
            key={step.title}
            className="flex flex-col items-center gap-2 text-center md:items-start md:text-left"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#e11d48] text-xs font-black text-white shadow-[0_3px_0_#9f1239] sm:size-7 sm:text-sm">
                {index + 1}
              </div>
              <h4 className="text-xs font-bold text-white sm:text-sm">{step.title}</h4>
            </div>
            <p className="mt-0.5 text-[11px] font-medium leading-relaxed text-white/70 sm:text-xs">
              {step.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
