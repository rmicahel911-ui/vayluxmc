import Link from "next/link";
import { ArrowRight } from "lucide-react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  linkLabel = "Ver todo",
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={`flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between ${
        align === "center" ? "text-center sm:text-center" : ""
      }`}
    >
      <div className={align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"}>
        {eyebrow ? <p className="mb-2 font-minecraft text-[10px] font-bold uppercase tracking-widest text-[#ffd27a]">{eyebrow}</p> : null}
        <h2 className="text-balance font-minecraft text-lg font-black uppercase tracking-wide text-white sm:text-xl md:text-2xl">{title}</h2>
        {description ? (
          <p className="mt-2 text-sm leading-relaxed text-white/50">{description}</p>
        ) : null}
      </div>

      {href ? (
        <Link
          href={href}
          className="group inline-flex shrink-0 items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#ffd27a] transition hover:text-white"
        >
          {linkLabel}
          <ArrowRight className="size-3.5 transition group-hover:translate-x-0.5" />
        </Link>
      ) : null}
    </div>
  );
}
