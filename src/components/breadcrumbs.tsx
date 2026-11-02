import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Crumb = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Migas de pan" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1.5 font-minecraft text-[10px] font-bold uppercase tracking-wider text-white/40">
        <li>
          <Link href="/" className="transition hover:text-white">
            Inicio
          </Link>
        </li>
        {items.map((item) => (
          <li key={`${item.label}-${item.href ?? ""}`} className="flex items-center gap-1.5">
            <ChevronRight className="size-3 text-[#ffb81f]/40" />
            {item.href ? (
              <Link href={item.href} className="transition hover:text-white">
                {item.label}
              </Link>
            ) : (
              <span className="max-w-[220px] truncate text-[#ffd27a]/80">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
