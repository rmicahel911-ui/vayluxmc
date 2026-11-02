import { Plus } from "lucide-react";

type FaqItem = {
  q: string;
  a: string;
};

export function FaqList({ items, id }: { items: readonly FaqItem[]; id?: string }) {
  return (
    <div id={id} className="divide-y-2 divide-brand-deep/40 overflow-hidden rounded-2xl border-2 border-brand-deep bg-[#170a0e]/95 shadow-[0_5px_0_#3a0a17]">
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 text-left transition hover:bg-white/[0.02] sm:px-5">
            <span className="text-xs font-bold text-white/85 transition group-open:text-white sm:text-sm">
              {item.q}
            </span>
            <span className="flex size-6 shrink-0 items-center justify-center rounded-md border border-brand-deep bg-black/30 text-[#ffd27a] transition group-open:rotate-45 group-open:border-[#e11d48] group-open:text-white">
              <Plus className="size-3.5" />
            </span>
          </summary>
          <div className="px-4 pb-4 sm:px-5">
            <p className="max-w-3xl text-[11px] leading-relaxed text-white/50 sm:text-xs">{item.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
