import { NextResponse } from "next/server";

import {
  buildDemoBasket,
  getDemoBasket,
  readBasketIdent,
  readDemoBasketState,
  saveDemoBasketState,
} from "@/lib/basket";
import { applyCoupon, getBasket, isTebexConfigured, removeCoupon, TebexError } from "@/lib/tebex";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function handleError(error: unknown) {
  if (error instanceof TebexError) {
    const status = error.status >= 400 && error.status < 600 ? error.status : 500;
    return NextResponse.json({ error: error.message, code: "TEBEX_ERROR" }, { status });
  }
  console.error("[basket/coupon]", error);
  return NextResponse.json(
    { error: "No se pudo aplicar el cupón.", code: "INTERNAL_ERROR" },
    { status: 500 },
  );
}

export async function POST(request: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    body = {};
  }

  const code = typeof body.code === "string" ? body.code.trim().toUpperCase() : "";
  if (!code) {
    return NextResponse.json({ error: "Escribe un código.", code: "COUPON_REQUIRED" }, { status: 400 });
  }

  try {
    if (!isTebexConfigured()) {
      if (code !== "DEMO10") {
        return NextResponse.json(
          { error: "En modo demo usa el cupón DEMO10.", code: "DEMO_COUPON" },
          { status: 400 },
        );
      }
      const state = await readDemoBasketState();
      if (!state) return NextResponse.json({ basket: null, demo: true, message: "Cupón aplicado." });
      state.coupon = code;
      await saveDemoBasketState(state);
      return NextResponse.json({
        basket: buildDemoBasket(state),
        demo: true,
        message: "Cupón DEMO10 aplicado: 10 % de descuento.",
      });
    }

    const ident = await readBasketIdent();
    if (!ident) {
      return NextResponse.json({ error: "No hay carrito activo.", code: "NO_BASKET" }, { status: 400 });
    }

    const result = await applyCoupon(ident, code);
    const basket = await getBasket(ident);
    return NextResponse.json({
      basket,
      demo: false,
      message: result.message || "Cupón aplicado.",
    });
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(request: Request) {
  const code = new URL(request.url).searchParams.get("code")?.trim().toUpperCase() ?? "";

  try {
    if (!isTebexConfigured()) {
      const state = await readDemoBasketState();
      if (state) {
        delete state.coupon;
        await saveDemoBasketState(state);
      }
      return NextResponse.json({ basket: await getDemoBasket(), demo: true });
    }

    const ident = await readBasketIdent();
    if (!ident) {
      return NextResponse.json({ error: "No hay carrito activo.", code: "NO_BASKET" }, { status: 400 });
    }

    if (code) await removeCoupon(ident, code);
    const basket = await getBasket(ident);
    return NextResponse.json({ basket, demo: false });
  } catch (error) {
    return handleError(error);
  }
}
