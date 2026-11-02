import "server-only";

import { cookies } from "next/headers";

import { demoCatalog } from "./demo-data";
import { isTebexConfigured } from "./tebex";
import type { TebexBasket } from "./types";

export const BASKET_COOKIE = "tbx_basket";
export const USER_COOKIE = "tbx_user";
export const DEMO_BASKET_COOKIE = "tbx_demo_basket";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

type CookieOptions = {
  httpOnly: true;
  sameSite: "lax";
  secure: boolean;
  path: "/";
  maxAge: number;
};

function cookieOptions(): CookieOptions {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  };
}

export async function readBasketIdent() {
  return (await cookies()).get(BASKET_COOKIE)?.value ?? null;
}

export async function readUsername() {
  return (await cookies()).get(USER_COOKIE)?.value ?? null;
}

export async function saveBasketSession(ident: string, username: string) {
  const store = await cookies();
  store.set(BASKET_COOKIE, ident, cookieOptions());
  store.set(USER_COOKIE, username, cookieOptions());
}

export async function clearBasketSession() {
  const store = await cookies();
  store.delete(BASKET_COOKIE);
  store.delete(USER_COOKIE);
  store.delete(DEMO_BASKET_COOKIE);
}

export type DemoBasketState = {
  username: string;
  items: { ident: string; quantity: number }[];
  coupon?: string;
};

export async function readDemoBasketState(): Promise<DemoBasketState | null> {
  const raw = (await cookies()).get(DEMO_BASKET_COOKIE)?.value;
  if (!raw) return null;

  try {
    const parsed = JSON.parse(Buffer.from(raw, "base64url").toString("utf8")) as DemoBasketState;
    if (!parsed || !Array.isArray(parsed.items)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function saveDemoBasketState(state: DemoBasketState) {
  const encoded = Buffer.from(JSON.stringify(state)).toString("base64url");
  (await cookies()).set(DEMO_BASKET_COOKIE, encoded, cookieOptions());
}

export function buildDemoBasket(state: DemoBasketState | null): TebexBasket | null {
  if (!state || state.items.length === 0) return null;

  const packages = state.items
    .map((item) => {
      const found = demoCatalog.packages.find((pkg) => pkg.ident === item.ident);
      if (!found) return null;
      return {
        id: found.id,
        description: found.description,
        image: found.image ?? "",
        name: found.name,
        slug: found.slug,
        in_basket: {
          quantity: item.quantity,
          price: found.total_price,
        },
        type: "single" as const,
        is_recurring: false,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  if (packages.length === 0) return null;

  const basePrice = packages.reduce((total, item) => {
    const pkg = demoCatalog.packages.find((candidate) => candidate.id === item.id);
    return total + (pkg?.base_price ?? 0) * item.in_basket.quantity;
  }, 0);

  const subtotal = packages.reduce(
    (total, item) => total + item.in_basket.price * item.in_basket.quantity,
    0,
  );

  const coupon = state.coupon?.toUpperCase();
  const discount = coupon === "DEMO10" ? subtotal * 0.1 : 0;
  const total = Math.max(0, Math.round((subtotal - discount) * 100) / 100);

  return {
    id: "demo-basket",
    ident: "demo-basket",
    complete: false,
    email: null,
    username: state.username,
    coupons: coupon ? [{ code: coupon }] : [],
    cancel_url: "/checkout/cancel",
    complete_url: "/checkout/complete",
    complete_auto_redirect: true,
    country: "ES",
    ip: "127.0.0.1",
    username_id: 1,
    base_price: Math.round(basePrice * 100) / 100,
    sales_tax: 0,
    total_price: total,
    currency: demoCatalog.store.currency,
    packages,
    custom: { demo: true },
    links: {},
  };
}

export async function getDemoBasket() {
  return buildDemoBasket(await readDemoBasketState());
}

export function ensureDemoMode() {
  return !isTebexConfigured();
}
