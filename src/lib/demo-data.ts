import type { TebexCategory, TebexPackage, TebexWebstore } from "./types";

/**
 * Catálogo de ejemplo. Solo se usa cuando no hay TEBEX_PUBLIC_TOKEN
 * o cuando la API de Tebex no responde, para que la tienda nunca se vea vacía.
 */

const now = "2026-10-01T12:00:00.000Z";

export const demoStore: TebexWebstore = {
  id: 1831563,
  name: "VayluxMC Store",
  description:
    "Rangos, cosméticos y packs exclusivos con entrega automática para Minecraft Java y Bedrock.",
  webstore_url: "https://tienda.vayluxmc.net",
  currency: "USD",
  lang: "es",
  logo: "/images/logo.png",
  platform_type: "Minecraft",
  platform_type_id: "minecraft",
  disabled: false,
  created_at: now,
  supports_usernames: true,
  supports_gifting: true,
};

export const demoCategories: TebexCategory[] = [
  {
    id: 1,
    name: "Rangos",
    slug: "rangos",
    parent: null,
    tiered: false,
    description:
      "<p>Sube de nivel con un rango permanente. Incluye ventajas en el chat, cosméticos exclusivos, acceso a comandos y prioridad en la cola de conexión.</p>",
    packages: [],
    order: 1,
    display_type: "grid",
    image_url: "/images/package-rank.svg",
    dynamic: false,
  },
  {
    id: 2,
    name: "Cosméticos",
    slug: "cosmeticos",
    parent: null,
    tiered: false,
    description:
      "<p>Personaliza tu personaje con alas, auras, mascotas y efectos de partículas. Todos los cosméticos son permanentes.</p>",
    packages: [],
    order: 2,
    display_type: "grid",
    image_url: "/images/package-cosmetic.svg",
    dynamic: false,
  },
  {
    id: 3,
    name: "Cajas y llaves",
    slug: "cajas-y-llaves",
    parent: null,
    tiered: false,
    description:
      "<p>Abre cofres con recompensas aleatorias: monedas, cosméticos, objetos y packs de tiempo limitado.</p>",
    packages: [],
    order: 3,
    display_type: "grid",
    image_url: "/images/package-crate.svg",
    dynamic: false,
  },
  {
    id: 4,
    name: "Monedas",
    slug: "monedas",
    parent: null,
    tiered: false,
    description:
      "<p>Recarga tu monedero de la tienda y gasta en lo que quieras. Las monedas se entregan al instante.</p>",
    packages: [],
    order: 4,
    display_type: "grid",
    image_url: "/images/package-coins.svg",
    dynamic: false,
  },
  {
    id: 5,
    name: "Bundles",
    slug: "bundles",
    parent: null,
    tiered: false,
    description:
      "<p>Packs con varios artículos a precio reducido. La forma más eficiente de empezar con buen pie.</p>",
    packages: [],
    order: 5,
    display_type: "grid",
    image_url: "/images/package-bundle.svg",
    dynamic: false,
  },
];

type DemoSeed = {
  id: number;
  categoryId: number;
  name: string;
  slug: string;
  price: number;
  discount?: number;
  image: string;
  description: string;
  disableQuantity?: boolean;
};

const seeds: DemoSeed[] = [
  {
    id: 101,
    categoryId: 1,
    name: "Rango Bronce",
    slug: "rango-bronce",
    price: 4.99,
    image: "/images/package-rank.svg",
    description:
      "<p>El primer paso para destacar. Un rango permanente con ventajas básicas y un color propio en el chat.</p><ul><li>Prefijo <strong>[Bronce]</strong> en el chat</li><li>Acceso a <code>/fly</code> en el lobby</li><li>2 homes extra</li><li>Canal exclusivo de Discord</li></ul>",
  },
  {
    id: 102,
    categoryId: 1,
    name: "Rango Plata",
    slug: "rango-plata",
    price: 9.99,
    discount: 10,
    image: "/images/package-rank.svg",
    description:
      "<p>Más comandos, más homes y prioridad de conexión. Ideal si juegas cada día.</p><ul><li>Todo lo de Bronce</li><li>Prefijo <strong>[Plata]</strong> y formato de chat</li><li>4 homes extra</li><li>Prioridad en la cola</li><li>Acceso a cosméticos exclusivos</li></ul>",
  },
  {
    id: 103,
    categoryId: 1,
    name: "Rango Oro",
    slug: "rango-oro",
    price: 19.99,
    discount: 20,
    image: "/images/package-rank.svg",
    description:
      "<p>El rango más popular. Desbloquea la mayoría de comandos y ventajas del servidor.</p><ul><li>Todo lo de Plata</li><li>Prefijo <strong>[Oro]</strong> animado</li><li>8 homes extra</li><li>/nick y /hat</li><li>1 llave mítica al mes</li></ul>",
  },
  {
    id: 104,
    categoryId: 1,
    name: "Rango Titán",
    slug: "rango-titan",
    price: 39.99,
    image: "/images/package-rank.svg",
    description:
      "<p>La experiencia completa. Todas las ventajas, cosméticos y acceso anticipado a novedades.</p><ul><li>Todo lo de Oro</li><li>Prefijo <strong>[Titán]</strong> exclusivo</li><li>Homes ilimitados</li><li>Acceso a la beta de nuevos minijuegos</li><li>3 llaves míticas al mes</li></ul>",
  },
  {
    id: 201,
    categoryId: 2,
    name: "Alas de Dragón",
    slug: "alas-de-dragon",
    price: 7.99,
    image: "/images/package-cosmetic.svg",
    description:
      "<p>Un par de alas animadas con estela de partículas. Se muestran al caminar, volar y en el lobby.</p><ul><li>Efecto permanente</li><li>3 colores seleccionables</li><li>Compatible con todos los rangos</li></ul>",
  },
  {
    id: 202,
    categoryId: 2,
    name: "Aura Arcana",
    slug: "aura-arcana",
    price: 5.99,
    image: "/images/package-cosmetic.svg",
    description:
      "<p>Un aura de partículas mágicas que rodea a tu personaje. Perfecta para destacar en eventos y capturas.</p><ul><li>Partículas personalizables</li><li>Se activa con <code>/cosmetics</code></li><li>Permanente</li></ul>",
  },
  {
    id: 203,
    categoryId: 2,
    name: "Mascota Zorro",
    slug: "mascota-zorro",
    price: 6.99,
    image: "/images/package-cosmetic.svg",
    description:
      "<p>Un zorro pixelado que te sigue por el lobby y reacciona a tus movimientos.</p><ul><li>Mascota permanente</li><li>Nombre personalizable</li><li>Sonidos y animaciones</li></ul>",
  },
  {
    id: 301,
    categoryId: 3,
    name: "Llave Mítica x3",
    slug: "llave-mitica-x3",
    price: 4.99,
    image: "/images/package-crate.svg",
    description:
      "<p>Tres llaves para el cofre mítico. Cada apertura garantiza al menos una recompensa rara.</p><ul><li>3 llaves míticas</li><li>Entrega instantánea</li><li>Acumulables</li></ul>",
  },
  {
    id: 302,
    categoryId: 3,
    name: "Cofre Legendario",
    slug: "cofre-legendario",
    price: 12.99,
    discount: 15,
    image: "/images/package-crate.svg",
    description:
      "<p>Un cofre con 5 recompensas aleatorias y posibilidad de rango permanente.</p><ul><li>5 recompensas</li><li>Probabilidad de rango Oro</li><li>Monedas garantizadas</li></ul>",
  },
  {
    id: 401,
    categoryId: 4,
    name: "10.000 Monedas",
    slug: "10000-monedas",
    price: 9.99,
    image: "/images/package-coins.svg",
    description:
      "<p>Recarga tu monedero con 10.000 monedas de la tienda. Úsalas en cosméticos, llaves o mejoras.</p><ul><li>10.000 monedas</li><li>Entrega instantánea</li><li>No caducan</li></ul>",
  },
  {
    id: 402,
    categoryId: 4,
    name: "25.000 Monedas",
    slug: "25000-monedas",
    price: 19.99,
    discount: 20,
    image: "/images/package-coins.svg",
    description:
      "<p>El pack más rentable de monedas. Ahorra un 20 % frente a comprar packs pequeños.</p><ul><li>25.000 monedas</li><li>Entrega instantánea</li><li>No caducan</li></ul>",
  },
  {
    id: 501,
    categoryId: 5,
    name: "Bundle Inicio",
    slug: "bundle-inicio",
    price: 24.99,
    discount: 25,
    image: "/images/package-bundle.svg",
    description:
      "<p>Todo lo necesario para empezar: rango Plata, un cosmético y llaves.</p><ul><li>Rango Plata permanente</li><li>Alas de Dragón</li><li>2 llaves míticas</li><li>5.000 monedas</li></ul>",
  },
  {
    id: 502,
    categoryId: 5,
    name: "Bundle Titán",
    slug: "bundle-titan",
    price: 54.99,
    discount: 30,
    image: "/images/package-bundle.svg",
    description:
      "<p>El pack definitivo: rango Titán, todos los cosméticos y una lluvia de recompensas.</p><ul><li>Rango Titán permanente</li><li>3 cosméticos a elegir</li><li>6 llaves míticas</li><li>20.000 monedas</li></ul>",
  },
];

export const demoPackages: TebexPackage[] = seeds.map((seed, index) => {
  const category = demoCategories.find((item) => item.id === seed.categoryId)!;
  const discount = seed.discount ?? 0;
  const total = Math.round(seed.price * (1 - discount / 100) * 100) / 100;
  return {
    id: seed.id,
    name: seed.name,
    description: seed.description,
    image: seed.image,
    type: "single",
    category: { id: category.id, name: category.name },
    base_price: seed.price,
    sales_tax: 0,
    total_price: total,
    currency: "USD",
    prorate_price: null,
    discount,
    disable_quantity: seed.disableQuantity ?? true,
    disable_gifting: false,
    expiration_date: null,
    media: [{ type: "image", name: seed.name, url: seed.image, featured: true, primary: true }],
    order: index + 1,
    slug: seed.slug,
    user_limit: 0,
    options: [],
    variables: [],
    created_at: now,
    updated_at: now,
    ident: `demo_${seed.categoryId}_${seed.id}`,
  };
});

for (const category of demoCategories) {
  category.packages = demoPackages.filter((item) => item.category.id === category.id);
}

export const demoCatalog = {
  categories: demoCategories,
  packages: demoPackages,
  store: demoStore,
};

