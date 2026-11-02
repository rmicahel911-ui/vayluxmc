/**
 * Configuración central de la tienda.
 * Cambia aquí el nombre, la IP, los textos y las secciones sin tocar el resto del código.
 */

const env = (key: string, fallback: string) => {
  const value = process.env[key];
  return value && value.trim().length > 0 ? value.trim() : fallback;
};

export const site = {
  name: env("NEXT_PUBLIC_STORE_NAME", "VayluxMC Network"),
  tagline: env("NEXT_PUBLIC_STORE_TAGLINE", "La tienda oficial de VayluxMC"),
  url: env("NEXT_PUBLIC_SITE_URL", "http://localhost:3000"),
  discord: env("NEXT_PUBLIC_DISCORD_URL", "https://discord.gg/"),
  supportEmail: env("NEXT_PUBLIC_SUPPORT_EMAIL", "soporte@vayluxmc.net"),
  server: {
    name: env("NEXT_PUBLIC_SERVER_NAME", "VayluxMC Network"),
    javaIp: env("NEXT_PUBLIC_SERVER_IP", "play.vayluxmc.net"),
    bedrockIp: env("NEXT_PUBLIC_SERVER_BEDROCK_IP", "play.vayluxmc.net"),
    bedrockPort: env("NEXT_PUBLIC_SERVER_BEDROCK_PORT", "19132"),
    version: env("NEXT_PUBLIC_SERVER_VERSION", "Java 1.8 - 1.21 · Bedrock"),
  },
  nav: [
    { href: "/", label: "Inicio" },
    { href: "/categorias", label: "Tienda" },
    { href: "/como-iniciar-sesion", label: "¿Cómo comprar?" },
  ],
  hero: {
    eyebrow: "Bienvenido a la tienda oficial de",
    title: env("NEXT_PUBLIC_STORE_NAME", "VayluxMC"),
    subtitle:
      "Rangos, cosméticos y packs exclusivos con entrega automática. Apoya al servidor y desbloquea recompensas al instante.",
    cta: "ENTRAR A LA TIENDA",
  },
  benefits: [
    {
      icon: "zap",
      title: "Entrega instantánea",
      text: "Recibes tu compra automáticamente en menos de 5 minutos. Solo tienes que estar conectado al servidor.",
    },
    {
      icon: "shield",
      title: "Pago 100% seguro",
      text: "El checkout lo gestiona Tebex Limited, Merchant of Record. No almacenamos datos de pago.",
    },
    {
      icon: "card",
      title: "+50 métodos de pago",
      text: "Tarjeta, PayPal, Google Pay, Apple Pay, OXXO, PIX, PSE, Mercado Pago y muchos más.",
    },
    {
      icon: "heart",
      title: "Apoya el proyecto",
      text: "Cada compra ayuda a mantener el servidor, traer actualizaciones y organizar eventos.",
    },
  ],
  steps: [
    {
      title: "Ingresa tu nombre",
      text: "Escribe tu nombre exacto del juego y elige tu plataforma: Java o Bedrock. En Bedrock añadimos el punto inicial automáticamente.",
    },
    {
      title: "Selecciona tu paquete",
      text: "Elige el paquete que desees de la tienda y completa el pago con tu método preferido.",
    },
    {
      title: "Recibe tu compra",
      text: "Recibe tus artículos en el juego en menos de 5 minutos. Solo tienes que estar conectado.",
    },
  ],
  faqs: [
    {
      q: "¿Cuánto tarda la entrega?",
      a: "La entrega es automática en la mayoría de los casos. Si el servidor está online, suele tardar menos de 5 minutos. Si pasados 20 minutos no has recibido nada, abre un ticket en Discord con tu nick y el ID de compra.",
    },
    {
      q: "¿Qué pasa si escribo mal mi nick?",
      a: "La compra se entregará al nick que indiques. Revísalo antes de pagar. Si te equivocas, contacta con soporte desde Discord y, si el artículo aún no se ha entregado, intentaremos ayudarte.",
    },
    {
      q: "¿Puedo comprar para otra persona?",
      a: "Sí. Añade el paquete con tu cuenta, y en la ficha del producto o en el checkout indica el nick del destinatario si la opción de regalo está disponible en tu tienda.",
    },
    {
      q: "¿Los pagos son reembolsables?",
      a: "Al tratarse de bienes digitales de consumo inmediato, las compras no son reembolsables, salvo que la ley aplicable disponga lo contrario. Tebex gestiona el pago como Merchant of Record y aplica su propia política.",
    },
    {
      q: "¿Necesito tener una cuenta en la web?",
      a: "No. Solo necesitas tu nick de Minecraft. El carrito se guarda en tu navegador mediante una cookie segura y el pago se completa en el checkout de Tebex.",
    },
    {
      q: "¿Qué métodos de pago hay?",
      a: "Tebex ofrece más de 100 métodos según el país: tarjetas, PayPal, Google Pay, Apple Pay, transferencias, pagos en efectivo y métodos locales. Verás todos los disponibles al ir al checkout.",
    },
  ],
  legal: {
    lastUpdated: "Octubre de 2026",
    owner: "VayluxMC",
    contact: "soporte@vayluxmc.net",
  },
} as const;

export type BenefitIcon = (typeof site.benefits)[number]["icon"];
