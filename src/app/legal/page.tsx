import type { Metadata } from "next";
import { ExternalLink, Scale, ShieldCheck } from "lucide-react";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Información legal",
  description:
    "Términos de compra, política de entregas y devoluciones, privacidad y datos de contacto de la tienda.",
  alternates: { canonical: "/legal" },
};

const sections = [
  {
    id: "titular",
    title: "Titular del servicio",
    body: [
      `Este sitio es la tienda oficial de ${site.server.name} y es operado por ${site.legal.owner}.`,
      "La venta y el procesamiento de pagos se realizan a través de Tebex Limited, que actúa como Merchant of Record. Tebex es el vendedor legal de los artículos adquiridos y aplica sus propias condiciones de venta.",
      `Para cualquier consulta puedes escribir a ${site.supportEmail} o abrir un ticket en nuestro Discord.`,
    ],
  },
  {
    id: "productos",
    title: "Productos y entregas",
    body: [
      "Todos los artículos ofrecidos son bienes digitales virtuales utilizables únicamente dentro de nuestros servidores de Minecraft. No tienen valor monetario real y no son transferibles ni canjeables por dinero.",
      "Las compras se entregan automáticamente al nick de Minecraft indicado durante el proceso de compra. Es responsabilidad del comprador escribir correctamente su nick.",
      "La entrega suele completarse en menos de 5 minutos. Si el servidor está en mantenimiento, la entrega puede retrasarse hasta que vuelva a estar disponible.",
      "Los artículos pueden ser modificados, reequilibrados o retirados por motivos técnicos o de juego. Esto no genera derecho a reembolso, salvo que la ley aplicable disponga lo contrario.",
    ],
  },
  {
    id: "devoluciones",
    title: "Devoluciones y reembolsos",
    body: [
      "Dado que los artículos son bienes digitales de consumo inmediato y la entrega comienza tras la confirmación del pago, las compras no son reembolsables una vez entregadas.",
      "Si no has recibido tu compra o recibiste un artículo incorrecto, contacta con soporte con tu nick y la referencia del pedido. Revisaremos el caso y, cuando corresponda, entregaremos el artículo o gestionaremos la solución adecuada.",
      "Tebex actúa como Merchant of Record y puede aplicar su propia política de devoluciones. Las solicitudes también pueden gestionarse a través de Tebex.",
      "Nada en esta política limita los derechos que la legislación de consumo aplicable te reconozca como usuario.",
    ],
  },
  {
    id: "pagos",
    title: "Pagos y seguridad",
    body: [
      "Los pagos se procesan en el entorno seguro de Tebex. No almacenamos ni tenemos acceso a los datos completos de tu tarjeta.",
      "Los precios se muestran en la moneda configurada en la tienda e incluyen los impuestos aplicables cuando corresponda. El importe final se confirma en el checkout.",
      "Algunos métodos de pago pueden no estar disponibles según tu país. Tebex mostrará las opciones válidas durante el proceso de compra.",
    ],
  },
  {
    id: "privacidad",
    title: "Privacidad y datos",
    body: [
      "Para procesar tu compra utilizamos tu nick de Minecraft y los datos necesarios para gestionar el pedido. El pago y los datos asociados se tratan a través de Tebex conforme a su política de privacidad.",
      "Guardamos una cookie técnica con el identificador del carrito y tu nick para mantener la sesión de compra. No utilizamos cookies publicitarias de terceros.",
      "Puedes solicitar información sobre tus datos o su eliminación escribiendo a nuestro correo de soporte.",
    ],
  },
  {
    id: "conducta",
    title: "Normas de la comunidad",
    body: [
      "El uso de la tienda y de los artículos adquiridos está sujeto a las normas del servidor. El incumplimiento de las normas puede suponer la suspensión o expulsión de la comunidad.",
      "La suspensión por incumplimiento de las normas no genera derecho a reembolso de compras ya entregadas.",
    ],
  },
  {
    id: "marcas",
    title: "Marcas y afiliación",
    body: [
      "Este sitio no está afiliado, asociado, autorizado, respaldado ni vinculado de ninguna forma con Mojang AB ni Microsoft. Minecraft es una marca registrada de Mojang Synergies AB.",
      "Todos los nombres de productos, logos y marcas mencionados pertenecen a sus respectivos propietarios.",
    ],
  },
];

export default function LegalPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: "Información legal" }]} />

      <header className="relative overflow-hidden rounded-2xl border-2 border-brand-deep bg-[#170a0e]/95 p-5 shadow-[0_6px_0_#3a0a17] sm:p-7">
        <p className="font-minecraft text-[10px] font-bold uppercase tracking-widest text-[#ffd27a] flex items-center gap-1.5">
          <Scale className="size-3" />
          Legal
        </p>
        <h1 className="mt-1 text-balance font-minecraft text-xl font-black uppercase tracking-wide text-white sm:text-2xl md:text-3xl">
          Información legal y condiciones de compra
        </h1>
        <p className="mt-2 max-w-2xl text-xs leading-relaxed text-white/50 sm:text-sm">
          Última actualización: {site.legal.lastUpdated}. Al realizar una compra aceptas estas
          condiciones y las de Tebex como Merchant of Record.
        </p>

        <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-brand-deep/60 bg-black/25 px-3.5 py-3">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-[#ffd27a]" />
          <p className="text-[11px] leading-relaxed text-white/45">
            Este texto es una plantilla orientativa y no constituye asesoramiento jurídico. Adáptalo a
            tu situación, país y forma jurídica antes de publicar la tienda.
          </p>
        </div>
      </header>

      <div className="mt-6 grid gap-6 lg:grid-cols-[220px_1fr] lg:items-start">
        <nav className="rounded-2xl border-2 border-brand-deep bg-[#170a0e]/95 p-3 shadow-[0_5px_0_#3a0a17] lg:sticky lg:top-6" aria-label="Índice legal">
          <p className="font-minecraft text-[10px] font-bold uppercase tracking-widest text-[#ffd27a] px-2 py-1">Índice</p>
          <ul className="space-y-0.5">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="block rounded-lg px-2.5 py-2 text-[11px] font-semibold text-white/50 transition hover:bg-white/5 hover:text-white"
                >
                  {section.title}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contacto"
                className="block rounded-lg px-2.5 py-2 text-[11px] font-semibold text-white/50 transition hover:bg-white/5 hover:text-white"
              >
                Contacto
              </a>
            </li>
          </ul>
        </nav>

        <div className="space-y-4">
          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-24 rounded-2xl border-2 border-brand-deep bg-[#170a0e]/95 p-5 shadow-[0_5px_0_#3a0a17] sm:p-6"
            >
              <h2 className="font-minecraft text-sm font-black uppercase tracking-wide text-white">{section.title}</h2>
              <div className="mt-3 space-y-2.5">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="text-[11px] leading-relaxed text-white/50 sm:text-xs">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}

          <section id="contacto" className="scroll-mt-24 rounded-2xl border-2 border-brand-deep bg-[#170a0e]/95 p-5 shadow-[0_5px_0_#3a0a17] sm:p-6">
            <h2 className="font-minecraft text-sm font-black uppercase tracking-wide text-white">Contacto</h2>
            <ul className="mt-3 space-y-2 text-[11px] text-white/50 sm:text-xs">
              <li>
                Correo:{" "}
                <a href={`mailto:${site.supportEmail}`} className="text-[#ffd27a] hover:text-white">
                  {site.supportEmail}
                </a>
              </li>
              <li>
                Discord:{" "}
                <a
                  href={site.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#ffd27a] hover:text-white"
                >
                  Únete al servidor
                  <ExternalLink className="size-3" />
                </a>
              </li>
              <li>
                Política de privacidad de Tebex:{" "}
                <a
                  href="https://www.tebex.io/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#ffd27a] hover:text-white"
                >
                  tebex.io/privacy
                  <ExternalLink className="size-3" />
                </a>
              </li>
              <li>
                Términos de Tebex:{" "}
                <a
                  href="https://www.tebex.io/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#ffd27a] hover:text-white"
                >
                  tebex.io/terms
                  <ExternalLink className="size-3" />
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
