import "server-only";

import { demoCatalog } from "./demo-data";
import type {
  Catalog,
  TebexBasket,
  TebexCategory,
  TebexPackage,
  TebexWebstore,
} from "./types";

const API_BASE = "https://headless.tebex.io/api/accounts";
const BASKET_API_BASE = "https://headless.tebex.io/api/baskets";

export class TebexError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status = 500, details?: unknown) {
    super(message);
    this.name = "TebexError";
    this.status = status;
    this.details = details;
  }
}

export function getPublicToken() {
  return process.env.TEBEX_PUBLIC_TOKEN?.trim() ?? "";
}

export function isTebexConfigured() {
  return getPublicToken().length > 0;
}

export function getPrivateKey() {
  return process.env.TEBEX_PRIVATE_KEY?.trim() ?? "";
}

export function hasPrivateKey() {
  return getPrivateKey().length > 0;
}

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  revalidate?: number;
  authenticated?: boolean;
  tags?: string[];
  base?: "account" | "basket";
};

export async function tebexRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const token = getPublicToken();
  if (!token) {
    throw new TebexError("TEBEX_PUBLIC_TOKEN no está configurado.", 503);
  }

  const { method = "GET", body, revalidate, authenticated, tags, base = "account" } = options;
  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (body !== undefined) headers["Content-Type"] = "application/json";

  if (authenticated) {
    const privateKey = getPrivateKey();
    if (!privateKey) {
      throw new TebexError("TEBEX_PRIVATE_KEY no está configurado para esta operación.", 503);
    }
    headers.Authorization = `Basic ${Buffer.from(`${token}:${privateKey}`).toString("base64")}`;
  }

  const baseUrl =
    base === "basket" ? BASKET_API_BASE : `${API_BASE}/${encodeURIComponent(token)}`;

  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: revalidate ? undefined : "no-store",
    next: revalidate ? { revalidate, tags } : undefined,
  });

  const text = await response.text();
  let payload: unknown = null;

  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = text;
    }
  }

  if (!response.ok) {
    throw new TebexError(
      getTebexErrorMessage(response.status, payload),
      response.status,
      payload,
    );
  }

  return payload as T;
}

function getTebexErrorMessage(status: number, payload: unknown) {
  const record =
    typeof payload === "object" && payload !== null
      ? (payload as {
          detail?: string;
          message?: string;
          title?: string;
        })
      : null;

  const detail = record?.detail?.trim() ?? "";
  const title = record?.title?.trim() ?? "";
  const generic = record?.message?.trim() ?? "";
  const raw = `${title} ${detail} ${generic}`.toLowerCase();

  if (raw.includes("banned")) {
    return "Tebex ha bloqueado este nick o tu dirección IP. Revisa Creator Panel > Customers > Bans o contacta con el soporte de Tebex.";
  }

  if (raw.includes("basic auth credentials are required")) {
    return "Tebex necesita la clave privada del servidor (TEBEX_PRIVATE_KEY) para registrar la IP real del cliente. Configúrala en el servidor; nunca en el navegador.";
  }

  if (raw.includes("invalid basic auth credentials")) {
    return "La clave privada de Tebex no es válida. Revisa TEBEX_PRIVATE_KEY en el servidor.";
  }

  if (raw.includes("invalid username")) {
    return "Ese nick de Minecraft no es válido en Tebex. Escríbelo exactamente igual que en el juego.";
  }

  return detail || title || generic || `Tebex respondió con el código ${status}.`;
}

function sortCategories(categories: TebexCategory[]) {
  return [...categories].sort((a, b) => a.order - b.order || a.id - b.id);
}

function sortPackages(packages: TebexPackage[]) {
  return [...packages].sort((a, b) => a.order - b.order || a.id - b.id);
}

export async function getCatalog(): Promise<Catalog> {
  if (!isTebexConfigured()) {
    return {
      ...demoCatalog,
      demo: true,
      demoReason: "Añade tu TEBEX_PUBLIC_TOKEN para mostrar tu catálogo real.",
    };
  }

  try {
    const [storeResponse, categoriesResponse] = await Promise.all([
      tebexRequest<{ data: TebexWebstore }>("/", { revalidate: 300, tags: ["tebex-catalog"] }),
      tebexRequest<{ data: TebexCategory[] }>("/categories?includePackages=1", {
        revalidate: 60,
        tags: ["tebex-catalog"],
      }),
    ]);

    const categories = sortCategories(categoriesResponse.data ?? []).map((category) => ({
      ...category,
      packages: category.packages ? sortPackages(category.packages) : [],
    }));

    const seen = new Set<string>();
    const packages: TebexPackage[] = [];

    for (const category of categories) {
      for (const item of category.packages ?? []) {
        if (!seen.has(item.ident)) {
          seen.add(item.ident);
          packages.push(item);
        }
      }
    }

    return {
      store: storeResponse.data,
      categories,
      packages: sortPackages(packages),
      demo: false,
    };
  } catch (error) {
    return {
      ...demoCatalog,
      demo: true,
      demoReason:
        error instanceof Error
          ? `No se pudo cargar Tebex (${error.message}). Mostrando catálogo de ejemplo.`
          : "No se pudo cargar Tebex. Mostrando catálogo de ejemplo.",
    };
  }
}

export async function getPackage(ident: string): Promise<{
  package: TebexPackage;
  demo: boolean;
  demoReason?: string;
}> {
  if (!isTebexConfigured()) {
    const found = demoCatalog.packages.find((item) => item.ident === ident);
    if (!found) throw new TebexError("Paquete no encontrado.", 404);
    return { package: found, demo: true, demoReason: "Modo demo activo." };
  }

  try {
    const response = await tebexRequest<{ data: TebexPackage }>(
      `/packages/${encodeURIComponent(ident)}`,
      { revalidate: 60, tags: ["tebex-catalog"] },
    );
    return { package: response.data, demo: false };
  } catch (error) {
    const found = demoCatalog.packages.find((item) => item.ident === ident);
    if (found) {
      return {
        package: found,
        demo: true,
        demoReason:
          error instanceof Error ? error.message : "No se pudo cargar el paquete desde Tebex.",
      };
    }
    throw error;
  }
}

export async function getBasket(ident: string): Promise<TebexBasket | null> {
  if (!isTebexConfigured()) return null;

  try {
    const response = await tebexRequest<{ data: TebexBasket }>(
      `/baskets/${encodeURIComponent(ident)}`,
    );
    return response.data;
  } catch (error) {
    if (error instanceof TebexError && (error.status === 404 || error.status === 422)) {
      return null;
    }
    throw error;
  }
}

export type CreateBasketInput = {
  username: string;
  ipAddress?: string;
  origin: string;
};

export async function createBasket({ username, ipAddress, origin }: CreateBasketInput) {
  const signed = hasPrivateKey();

  const body: Record<string, unknown> = {
    username,
    complete_url: `${origin}/checkout/complete`,
    cancel_url: `${origin}/checkout/cancel`,
    complete_auto_redirect: true,
  };

  // Tebex solo acepta `ip_address` con Basic Auth (token público + clave privada).
  // Sin clave privada creamos el carrito sin IP para no romper el flujo.
  if (signed && ipAddress) body.ip_address = ipAddress;

  const response = await tebexRequest<{ data: TebexBasket }>("/baskets", {
    method: "POST",
    body,
    authenticated: signed,
  });
  return response.data;
}

export async function addPackage(ident: string, packageIdent: string, quantity = 1) {
  const response = await tebexRequest<{ data: TebexBasket }>(
    `/${encodeURIComponent(ident)}/packages`,
    {
      method: "POST",
      base: "basket",
      body: { package_id: packageIdent, quantity },
    },
  );
  return response.data;
}

export async function removePackage(ident: string, packageIdent: string) {
  const response = await tebexRequest<{ data: TebexBasket }>(
    `/${encodeURIComponent(ident)}/packages/remove`,
    {
      method: "POST",
      base: "basket",
      body: { package_id: packageIdent },
    },
  );
  return response.data;
}

export async function updatePackageQuantity(ident: string, packageIdent: string, quantity: number) {
  const response = await tebexRequest<{ data: TebexBasket }>(
    `/${encodeURIComponent(ident)}/packages/${encodeURIComponent(packageIdent)}`,
    {
      method: "PUT",
      base: "basket",
      body: { quantity },
    },
  );
  return response.data;
}

export async function applyCoupon(ident: string, code: string) {
  return tebexRequest<{ success: boolean; message: string }>(
    `/baskets/${encodeURIComponent(ident)}/coupons`,
    {
      method: "POST",
      body: { coupon_code: code },
    },
  );
}

export async function removeCoupon(ident: string, code: string) {
  return tebexRequest<{ success?: boolean; message?: string }>(
    `/baskets/${encodeURIComponent(ident)}/coupons/remove`,
    {
      method: "POST",
      body: { coupon_code: code },
    },
  );
}

export async function getBasketAuthUrl(ident: string, returnUrl: string) {
  const response = await tebexRequest<Array<{ name: string; url: string }>>(
    `/baskets/${encodeURIComponent(ident)}/auth?returnUrl=${encodeURIComponent(returnUrl)}`,
  );
  return response;
}
