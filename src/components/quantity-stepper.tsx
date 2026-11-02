"use client";

import { Minus, Plus } from "lucide-react";

import { cn } from "@/lib/format";

type QuantityStepperProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  size?: "sm" | "md";
  label?: string;
};

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 10,
  disabled = false,
  size = "md",
  label = "Cantidad",
}: QuantityStepperProps) {
  const buttonClass = cn(
    "flex items-center justify-center text-white/70 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-30",
    size === "sm" ? "size-7" : "size-9",
  );

  return (
    <div
      className={cn(
        "inline-flex items-center overflow-hidden rounded-lg border border-brand-900/70 bg-black/40",
        disabled && "opacity-60",
      )}
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        className={buttonClass}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={disabled || value <= min}
        aria-label="Quitar una unidad"
      >
        <Minus className={size === "sm" ? "size-3" : "size-3.5"} />
      </button>

      <span
        className={cn(
          "min-w-8 border-x border-brand-900/60 text-center font-display text-white",
          size === "sm" ? "px-1.5 py-1 text-[11px]" : "px-2 py-1.5 text-xs",
        )}
        aria-live="polite"
      >
        {value}
      </span>

      <button
        type="button"
        className={buttonClass}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={disabled || value >= max}
        aria-label="Añadir una unidad"
      >
        <Plus className={size === "sm" ? "size-3" : "size-3.5"} />
      </button>
    </div>
  );
}
