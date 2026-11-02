import { site } from "@/lib/site";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-md">
      <div className="relative flex animate-pop-in flex-col items-center justify-center gap-4 overflow-hidden rounded-3xl border border-[#be123c]/50 bg-[#3a0a17]/90 p-8 shadow-2xl">
        <div className="pointer-events-none absolute inset-0 bg-radial from-[#e11d48]/25 via-transparent to-transparent blur-xl" />
        <div className="relative flex size-14 items-center justify-center">
          <div className="loader-ring absolute inset-0 rounded-full border-[3px] border-transparent border-r-[#be123c] border-t-[#e11d48]" />
          <div className="loader-ring-inner absolute inset-2 rounded-full border-2 border-transparent border-b-[#ffb81f] border-l-[#ffb81f]" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.png" alt="" className="size-6 object-contain drop-shadow" />
        </div>
        <div className="z-10 flex flex-col items-center gap-1">
          <span className="font-minecraft text-xs font-bold uppercase tracking-widest text-white">
            Cargando {site.name}
          </span>
          <span className="loader-pulse font-minecraft text-[10px] text-[#ffd27a]/70">
            Sincronizando catálogo con Tebex...
          </span>
        </div>
      </div>
    </div>
  );
}
