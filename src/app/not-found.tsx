import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-20 text-center sm:px-6">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-brand-600/20 blur-3xl" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-chest.svg"
          alt=""
          className="relative h-44 w-auto animate-float drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)]"
        />
      </div>

      <p className="label-pixel mt-6">Error 404</p>
      <h1 className="mt-2 text-balance font-display text-2xl text-white sm:text-3xl">
        Este cofre no existe
      </h1>
      <p className="mt-3 max-w-md text-xs leading-relaxed text-white/45 sm:text-sm">
        La página que buscas no está disponible. Puede que el paquete se haya retirado o que el enlace
        esté mal escrito.
      </p>

      <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
        <Link href="/" className="btn-3d px-5 py-3 text-xs">
          <ArrowLeft className="size-4" />
          Volver al inicio
        </Link>
        <Link href="/categorias" className="btn-ghost px-5 py-3 text-xs">
          <Compass className="size-4" />
          Explorar la tienda
        </Link>
      </div>
    </div>
  );
}
