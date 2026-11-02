import Link from "next/link";
import {
  ChevronDown,
  HelpCircle,
  ShieldCheck,
  ShoppingBag,
  Users,
} from "lucide-react";

import { site } from "@/lib/site";

const quickFaqs = [
  {
    q: "¿Cuánto tarda la entrega?",
    a: "Suele tardar menos de 5 minutos. Conéctate al servidor con el nick que indicaste al comprar.",
  },
  {
    q: "¿Qué pasa si me equivoco de nick?",
    a: "Escríbenos por Discord con tu referencia de compra. Si aún no se ha entregado, intentaremos corregirlo.",
  },
  {
    q: "¿Puedo comprar para otra persona?",
    a: "Sí. Indica el nick del destinatario al añadir el paquete o en el checkout cuando la opción de regalo esté disponible.",
  },
];

export function StoreSidebar() {
  return (
    <aside className="flex w-full shrink-0 flex-col gap-5 lg:w-70">
      <Link
        href="/categorias"
        className="group relative block w-full overflow-hidden rounded-2xl border-2 border-[#ffb81f]/40 bg-[#e11d48] p-4 text-left shadow-[0_6px_0_#9f1239] transition-all hover:translate-y-0.5 hover:bg-brand-hover hover:shadow-[0_4px_0_#9f1239] active:translate-y-1.5 active:shadow-none sm:p-5"
      >
        <div className="relative z-10 flex flex-col">
          <div className="mb-2 flex size-8 items-center justify-center rounded-lg bg-black/30 text-white shadow-inner">
            <ShoppingBag className="size-5" />
          </div>
          <span className="font-minecraft text-[10px] font-bold uppercase tracking-wider text-white/90 sm:text-xs">
            Click aquí para
          </span>
          <span className="mt-0.5 font-minecraft text-sm font-extrabold leading-snug tracking-wide text-white sm:text-base">
            SELECCIONAR UNA CATEGORÍA
          </span>
        </div>
        <div className="mt-3 flex justify-center">
          <picture>
            <source srcSet="/images/category-chest.webp" type="image/webp" />
            <img
              src="/images/category-chest.png"
              alt="Categorías"
              className="h-auto w-32 object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:scale-105 sm:w-36 lg:w-40"
            />
          </picture>
        </div>
      </Link>

      <div className="rounded-2xl border-2 border-brand-deep bg-[#170a0e]/95 p-4 shadow-[0_5px_0_#2a0812] sm:p-5">
        <div className="mb-3.5 flex items-center gap-2.5">
          <div className="flex size-7 items-center justify-center rounded-lg bg-[#e11d48]/20 text-[#e11d48]">
            <Users className="size-4" />
          </div>
          <div>
            <h4 className="font-minecraft text-xs font-bold uppercase tracking-wide text-white">
              PAGOS RECIENTES
            </h4>
            <span className="block text-[10px] font-medium text-[#ffd27a]">
              ¡Compra y aparece aquí!
            </span>
          </div>
        </div>
        <div className="rounded-xl border-2 border-brand-deep/40 bg-black/40 py-4 text-center shadow-inner">
          <span className="block font-minecraft text-[10px] text-white/50 sm:text-[11px]">
            ¡Sé el primero en comprar hoy!
          </span>
        </div>
      </div>

      <div className="rounded-2xl border-2 border-brand-deep bg-[#170a0e]/95 p-4 shadow-[0_5px_0_#2a0812] sm:p-5">
        <div className="mb-2.5 flex items-center gap-2.5">
          <div className="flex size-7 items-center justify-center rounded-lg bg-[#e11d48]/20 text-[#e11d48]">
            <ShieldCheck className="size-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold tracking-wide text-white">¿Eres padre o tutor?</h4>
            <span className="block text-[10px] text-white/50">Compra con tranquilidad</span>
          </div>
        </div>
        <p className="text-[10px] leading-relaxed text-white/65 sm:text-[11px]">
          {site.server.name} es un servidor de Minecraft multijugador independiente. Permite a los
          jugadores construir, crear y jugar juntos en un entorno moderado y supervisado por nuestro
          personal. Las compras ofrecidas aquí solo conciernen a artículos virtuales utilizables en
          nuestro servidor. No son obligatorias ni están afiliadas a Mojang o Microsoft. ¿Dudas con
          una compra? Contacta con nuestro equipo de soporte.
        </p>
      </div>

      <div className="rounded-2xl border-2 border-brand-deep bg-[#170a0e]/95 p-4 shadow-[0_5px_0_#2a0812] sm:p-5">
        <div className="mb-3.5 flex items-center gap-2.5">
          <div className="flex size-7 items-center justify-center rounded-lg bg-[#e11d48]/20 text-[#e11d48]">
            <HelpCircle className="size-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold tracking-wide text-white">Preguntas frecuentes</h4>
            <span className="block text-[10px] text-white/50">Resuelve tus dudas</span>
          </div>
        </div>
        <div className="w-full divide-y-2 divide-brand-deep/40 overflow-hidden rounded-xl border-2 border-brand-deep/60 bg-[#0f0508] shadow-[0_2px_0_#3a0a17]">
          {quickFaqs.map((item) => (
            <details key={item.q} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-3 py-2.5 text-left">
                <span className="text-[10px] font-semibold leading-snug text-white/75 transition group-open:text-white">
                  {item.q}
                </span>
                <ChevronDown className="size-3 shrink-0 text-[#ffd27a] transition group-open:rotate-180" />
              </summary>
              <p className="px-3 pb-3 text-[10px] leading-relaxed text-white/45">{item.a}</p>
            </details>
          ))}
        </div>
        <Link
          href="/como-iniciar-sesion"
          className="mt-3 inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-[#ffd27a] transition hover:text-white"
        >
          Ver todas las preguntas
        </Link>
      </div>
    </aside>
  );
}
