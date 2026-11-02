import { NextResponse } from "next/server";

import {
  buildDemoBasket,
  clearBasketSession,
  getDemoBasket,
  readBasketIdent,
  readDemoBasketState,
  readUsername,
  saveBasketSession,
  saveDemoBasketState,
} from "@/lib/basket";
import { site } from "@/lib/site";
import {
  addPackage,
  createBasket,
  getBasket,
  isTebexConfigured,
  TebexError,
} from "@/lib/tebex";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function normalizeUsername(value: unknown) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim().slice(0, 32);
  return trimmed.length > 0 ? trimmed : null;
}

function getOrigin(request: Request) {
  const configured = site.url.replace(/\/$/, "");
  if (configured && !configured.includes("localhost") && !configured.includes("127.0.0.1")) {
    return configured;
  }
  return new URL(request.url).origin;
}

function getIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "127.0.0.1"
  );
}

function handleError(error: unknown) {
  if (error instanceof TebexError) {
    const status = error.status >= 400 && error.status < 600 ? error.status : 500;
    return NextResponse.json({ error: error.message, code: "TEBEX_ERROR" }, { status });
  }
  console.error("[basket]", error);
  return NextResponse.json(
    { error: "No se pudo procesar el carrito. Inténtalo de nuevo.", code: "INTERNAL_ERROR" },
    { status: 500 },
  );
}

export async function GET() {
  if (!isTebexConfigured()) {
    return NextResponse.json({ basket: await getDemoBasket(), demo: true });
  }

  const ident = await readBasketIdent();
  if (!ident) return NextResponse.json({ basket: null, demo: false });

  try {
    const basket = await getBasket(ident);
    if (!basket) {
      await clearBasketSession();
      return NextResponse.json({ basket: null, demo: false });
    }
    return NextResponse.json({ basket, demo: false });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    body = {};
  }

  const username = normalizeUsername(body.username);
  if (!username) {
    return NextResponse.json(
      { error: "Escribe tu nick de Minecraft para continuar.", code: "USERNAME_REQUIRED" },
      { status: 400 },
    );
  }

  const packageIdent = typeof body.packageIdent === "string" ? body.packageIdent : null;
  const rawQuantity = Number(body.quantity);
  const quantity = Number.isFinite(rawQuantity) ? Math.min(10, Math.max(1, Math.trunc(rawQuantity))) : 1;

  try {
    if (!isTebexConfigured()) {
      const state = (await readDemoBasketState()) ?? { username, items: [] };
      state.username = username;

      if (packageIdent) {
        const existing = state.items.find((item) => item.ident === packageIdent);
        if (existing) {
          existing.quantity = Math.min(10, existing.quantity + quantity);
        } else {
          state.items.push({ ident: packageIdent, quantity });
        }
      }

      await saveDemoBasketState(state);
      return NextResponse.json({ basket: buildDemoBasket(state), demo: true });
    }

    let basket = null;
    const ident = await readBasketIdent();
    const storedUsername = await readUsername();

    if (ident && storedUsername === username) {
      basket = await getBasket(ident);
    }

    if (!basket || basket.complete) {
      basket = await createBasket({
        username,
        ipAddress: getIp(request),
        origin: getOrigin(request),
      });
      await saveBasketSession(basket.ident, username);
    }

    if (packageIdent) {
      basket = await addPackage(basket.ident, packageIdent, quantity);
    }

    return NextResponse.json({ basket, demo: false });
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE() {
  await clearBasketSession();
  return NextResponse.json({ ok: true });
}
