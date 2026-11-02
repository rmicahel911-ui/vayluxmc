import { NextResponse } from "next/server";

import {
  buildDemoBasket,
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
  removePackage,
  TebexError,
  updatePackageQuantity,
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
  console.error("[basket/package]", error);
  return NextResponse.json(
    { error: "No se pudo actualizar el carrito.", code: "INTERNAL_ERROR" },
    { status: 500 },
  );
}

async function demoStateFor(username: string) {
  const state = (await readDemoBasketState()) ?? { username, items: [] };
  state.username = username;
  return state;
}

export async function POST(request: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    body = {};
  }

  const packageIdent = typeof body.ident === "string" ? body.ident : null;
  if (!packageIdent) {
    return NextResponse.json({ error: "Falta el paquete.", code: "PACKAGE_REQUIRED" }, { status: 400 });
  }

  const rawQuantity = Number(body.quantity);
  const quantity = Number.isFinite(rawQuantity) ? Math.min(10, Math.max(1, Math.trunc(rawQuantity))) : 1;

  try {
    if (!isTebexConfigured()) {
      const username = normalizeUsername(body.username) ?? (await readUsername());
      if (!username) {
        return NextResponse.json(
          { error: "Escribe tu nick de Minecraft para continuar.", code: "USERNAME_REQUIRED" },
          { status: 401 },
        );
      }

      const state = await demoStateFor(username);
      const existing = state.items.find((item) => item.ident === packageIdent);
      if (existing) {
        existing.quantity = Math.min(10, existing.quantity + quantity);
      } else {
        state.items.push({ ident: packageIdent, quantity });
      }

      await saveDemoBasketState(state);
      return NextResponse.json({ basket: buildDemoBasket(state), demo: true });
    }

    const username = normalizeUsername(body.username) ?? (await readUsername());
    if (!username) {
      return NextResponse.json(
        { error: "Escribe tu nick de Minecraft para continuar.", code: "USERNAME_REQUIRED" },
        { status: 401 },
      );
    }

    let basket = null;
    const ident = await readBasketIdent();

    if (ident) {
      basket = await getBasket(ident);
      if (basket && basket.username && basket.username !== username) basket = null;
    }

    if (!basket) {
      basket = await createBasket({
        username,
        ipAddress: getIp(request),
        origin: getOrigin(request),
      });
      await saveBasketSession(basket.ident, username);
    }

    const updated = await addPackage(basket.ident, packageIdent, quantity);
    return NextResponse.json({ basket: updated, demo: false });
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(request: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    body = {};
  }

  const packageIdent = typeof body.ident === "string" ? body.ident : null;
  const rawQuantity = Number(body.quantity);

  if (!packageIdent || !Number.isFinite(rawQuantity)) {
    return NextResponse.json({ error: "Datos no válidos.", code: "INVALID_INPUT" }, { status: 400 });
  }

  const quantity = Math.min(10, Math.max(0, Math.trunc(rawQuantity)));

  try {
    if (!isTebexConfigured()) {
      const state = await readDemoBasketState();
      if (!state) return NextResponse.json({ basket: null, demo: true });

      if (quantity <= 0) {
        state.items = state.items.filter((item) => item.ident !== packageIdent);
      } else {
        const item = state.items.find((candidate) => candidate.ident === packageIdent);
        if (item) item.quantity = quantity;
      }

      await saveDemoBasketState(state);
      return NextResponse.json({ basket: buildDemoBasket(state), demo: true });
    }

    const ident = await readBasketIdent();
    if (!ident) {
      return NextResponse.json({ error: "No hay carrito activo.", code: "NO_BASKET" }, { status: 400 });
    }

    if (quantity <= 0) {
      const updated = await removePackage(ident, packageIdent);
      return NextResponse.json({ basket: updated, demo: false });
    }

    try {
      const updated = await updatePackageQuantity(ident, packageIdent, quantity);
      return NextResponse.json({ basket: updated, demo: false });
    } catch (error) {
      if (error instanceof TebexError && (error.status === 401 || error.status === 403 || error.status === 422)) {
        await removePackage(ident, packageIdent);
        const updated = await addPackage(ident, packageIdent, quantity);
        return NextResponse.json({ basket: updated, demo: false });
      }
      throw error;
    }
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(request: Request) {
  const packageIdent = new URL(request.url).searchParams.get("ident");
  if (!packageIdent) {
    return NextResponse.json({ error: "Falta el paquete.", code: "PACKAGE_REQUIRED" }, { status: 400 });
  }

  try {
    if (!isTebexConfigured()) {
      const state = await readDemoBasketState();
      if (!state) return NextResponse.json({ basket: null, demo: true });
      state.items = state.items.filter((item) => item.ident !== packageIdent);
      await saveDemoBasketState(state);
      return NextResponse.json({ basket: buildDemoBasket(state), demo: true });
    }

    const ident = await readBasketIdent();
    if (!ident) {
      return NextResponse.json({ error: "No hay carrito activo.", code: "NO_BASKET" }, { status: 400 });
    }

    const updated = await removePackage(ident, packageIdent);
    return NextResponse.json({ basket: updated, demo: false });
  } catch (error) {
    return handleError(error);
  }
}
