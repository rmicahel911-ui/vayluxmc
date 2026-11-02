# VayluxMC Store — Tienda Tebex Headless

Tienda completa para Minecraft construida con **Next.js 16**, **TypeScript** y **Tailwind CSS 4**, conectada a la **Headless API de Tebex**. Incluye catálogo, categorías, fichas de producto, carrito, cupones, checkout y páginas legales.

La estética es propia: Minecraft oscuro con acentos azul y azul claro. Inspirada en la estructura de otras tiendas, pero sin copiar sus assets, código ni textos.

---

## 1. Arrancar el proyecto

```bash
npm install
npm run dev
```

Abre <http://localhost:3000>.

La web arranca en **modo demo** (catálogo de ejemplo, carrito y cupón `DEMO10` funcionales) hasta que configures tu token de Tebex.

```bash
npm run lint     # ESLint
npm run build    # Build de producción
npm start        # Servir el build
```

---

## 2. Conectar tu tienda de Tebex

1. Entra en el [Creator Panel de Tebex](https://creator.tebex.io/developers/api-keys).
2. Copia el **Public Token** de tu tienda (suele empezar por 4 caracteres y un guion, por ejemplo `spk3-...`).
3. Crea un archivo `.env.local` a partir de `.env.example`:

```bash
cp .env.example .env.local
```

4. Rellena el token:

```env
TEBEX_PUBLIC_TOKEN=tu_token_publico
```

5. Reinicia el servidor (`Ctrl+C` y `npm run dev`).

En cuanto el token sea válido, la tienda carga automáticamente **tus categorías, paquetes, precios, imágenes y moneda** desde Tebex. Si Tebex falla o el token no es válido, se mantiene el modo demo para que la web nunca se rompa.

> **Importante:** el token público puede ir en el servidor. El `TEBEX_PRIVATE_KEY` es opcional y **nunca** debe exponerse en el navegador ni en variables `NEXT_PUBLIC_*`. La app no lo necesita para el flujo normal de compra.

### Qué usa de la Headless API

| Acción | Endpoint |
| --- | --- |
| Información de la tienda | `GET /` |
| Categorías + paquetes | `GET /categories?includePackages=1` |
| Detalle de paquete | `GET /packages/{ident}` |
| Crear carrito | `POST /baskets` |
| Añadir paquete | `POST /baskets/{ident}/packages` |
| Cambiar cantidad | `PUT /baskets/{ident}/packages/{ident}` |
| Quitar paquete | `POST /baskets/{ident}/packages/remove` |
| Aplicar cupón | `POST /baskets/{ident}/coupons` |
| Quitar cupón | `POST /baskets/{ident}/coupons/remove` |
| Autorizar carrito | `GET /baskets/{ident}/auth` |
| Checkout | `basket.links.checkout` (URL alojada por Tebex) |

El identificador del carrito y el nick se guardan en **cookies httpOnly**. El nick también se copia a `localStorage` para mostrarlo en la interfaz.

---

## 3. Personalizar la tienda

### Marca, IPs, textos y FAQ

Casi todo el contenido editable está en **`src/lib/site.ts`**:

- Nombre de la tienda y lema.
- IP de Java, IP/puerto de Bedrock y versión.
- Discord, correo de soporte y URL del sitio.
- Menú de navegación.
- Textos del hero.
- Beneficios, pasos de compra y preguntas frecuentes.
- Datos legales.

También puedes sobrescribir parte de esto desde `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://tienda.tudominio.com
NEXT_PUBLIC_STORE_NAME=Mi Tienda
NEXT_PUBLIC_SERVER_NAME=Mi Servidor
NEXT_PUBLIC_SERVER_IP=play.tudominio.com
NEXT_PUBLIC_DISCORD_URL=https://discord.gg/tuinvitacion
NEXT_PUBLIC_SUPPORT_EMAIL=soporte@tudominio.com
```

### Imágenes

Sustituye los archivos de `public/images/` manteniendo el mismo nombre (o cambia las rutas):

| Archivo | Uso |
| --- | --- |
| `logo.svg` | Logo del header y footer |
| `favicon.svg` | Icono de la pestaña |
| `og.svg` | Imagen para redes sociales (1200×630) |
| `hero-chest.svg` | Cofre del hero |
| `category-chest.svg` | Ilustración del sidebar |
| `package-rank.svg` | Categoría Rangos |
| `package-cosmetic.svg` | Categoría Cosméticos |
| `package-crate.svg` | Categoría Cajas |
| `package-coins.svg` | Categoría Monedas |
| `package-bundle.svg` | Categoría Bundles |
| `package-fallback.svg` | Imagen por defecto |
| `skin-fallback.svg` | Skin por defecto |
| `server-mascot.svg` | Mascota del servidor |
| `platform-java.svg` | Tarjeta «Edición Java» del inicio de sesión |
| `platform-bedrock.svg` | Tarjeta «Edición Bedrock» del inicio de sesión |

Las imágenes de tus paquetes reales llegan directamente desde Tebex: si subes una imagen al paquete en el Creator Panel, se muestra automáticamente.

### Catálogo de ejemplo

`src/lib/demo-data.ts` contiene los paquetes, categorías y precios del modo demo. Edítalo si quieres otro catálogo de ejemplo, o simplemente ignóralo cuando conectes Tebex.

### Colores y estilos

Los tokens de diseño están en `src/app/globals.css` (`@theme`):

- `night-*`: fondos azul noche.
- `brand-*`: azul principal (botones, enlaces, bordes).
- `accent-*`: azul claro / celeste para precios y brillos.
- Botones 3D (`.btn-3d`), superficies (`.surface`), tipografía pixel (`.label-pixel`).

---

## 4. Estructura del proyecto

```
src/
├─ app/
│  ├─ page.tsx                  # Home
│  ├─ categorias/               # Todas las categorías y paquetes
│  ├─ category/[slug]/          # Categoría
│  ├─ paquete/[ident]/          # Ficha de producto
│  ├─ carrito/                  # Carrito + cupones + checkout
│  ├─ checkout/complete/        # Pedido completado
│  ├─ checkout/cancel/          # Pago cancelado
│  ├─ como-comprar/             # Guía + FAQ
│  ├─ legal/                    # Legal
│  ├─ api/
│  │  ├─ basket/                # GET/POST/DELETE carrito
│  │  ├─ basket/package/        # Añadir, cambiar cantidad, quitar
│  │  ├─ basket/coupon/         # Aplicar / quitar cupón
│  │  ├─ basket/checkout/       # Obtener URL de pago o auth
│  │  └─ server-status/         # Estado del servidor (mcsrvstat.us)
│  ├─ sitemap.ts / robots.ts
│  └─ not-found.tsx
├─ components/                  # UI reutilizable
└─ lib/
   ├─ tebex.ts                  # Cliente Headless API
   ├─ basket.ts                 # Cookies + carrito demo
   ├─ demo-data.ts              # Catálogo de ejemplo
   ├─ site.ts                   # Contenido editable
   ├─ types.ts
   └─ format.ts
```

---

## 5. Cómo funciona el checkout

1. El usuario elige plataforma (Java o Bedrock) y escribe su nick (se guarda en cookie + `localStorage`). En Bedrock se añade el punto inicial automáticamente.
2. Al añadir un paquete se crea un basket en Tebex con `username` y `ip_address`.
3. El carrito se modifica desde el servidor; nunca se expone el token privado.
4. Al pulsar **Tramitar pedido** se abre `basket.links.checkout` en Tebex.
5. Si Tebex requiere autorización, se redirige al enlace de `/baskets/{ident}/auth`.
6. Tras el pago, Tebex vuelve a `/checkout/complete` y el carrito local se vacía.

> En modo demo el botón de pago muestra un aviso y no cobra nada.

---

## 6. Despliegue

### Vercel

1. Sube el proyecto a un repositorio de GitHub.
2. Importa el repo en Vercel.
3. Añade las variables de `.env.example` en **Settings → Environment Variables**.
4. Configura `NEXT_PUBLIC_SITE_URL` con tu dominio final (necesario para las URLs de retorno del checkout).
5. Deploy.

### Servidor propio (Node)

```bash
npm ci
npm run build
npm start
```

Usa un proxy inverso (Nginx/Caddy) con HTTPS. Las cookies se marcan `secure` automáticamente en producción.

---

## 7. Notas legales

- Tebex Limited actúa como **Merchant of Record**: es el vendedor legal y gestiona el pago.
- Esta tienda no está afiliada a Mojang AB ni a Microsoft. Minecraft es una marca registrada de Mojang Synergies AB.
- Revisa y adapta `src/app/legal/page.tsx` a tu país, forma jurídica y política real de devoluciones antes de publicar.

---

## 8. Modo demo

Se activa cuando `TEBEX_PUBLIC_TOKEN` está vacío o cuando la API de Tebex devuelve un error.

- Catálogo local realista.
- Carrito persistente por cookie.
- Cupón **`DEMO10`** (10 % de descuento).
- El botón de pago explica que el cobro real se habilita al configurar Tebex.

Cuando quieras ver tu catálogo real, solo tienes que pegar el token y reiniciar.
#   v a y l u x m c  
 