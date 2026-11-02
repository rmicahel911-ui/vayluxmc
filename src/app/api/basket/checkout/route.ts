import { NextResponse } from "next/server";

import { readBasketIdent } from "@/lib/basket";
import { site } from "@/lib/site";
import { getBasket, getBasketAuthUrl, isTebexConfigured, TebexError } from "@/lib/tebex";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  if (!isTebexConfigured()) {
    return NextResponse.json({
      demo: true,
      message:
        "Modo demo: el pago real se activa al configurar TEBEX_PUBLIC_TOKEN. Aun así, el carrito funciona de verdad.",
    });
  }

  try {
    const ident = await readBasketIdent();
    if (!ident) {
      return NextResponse.json({ error: "Tu carrito está vacío.", code: "NO_BASKET" }, { status: 400 });
    }

    const basket = await getBasket(ident);
    if (!basket || basket.packages.length === 0) {
      return NextResponse.json({ error: "Tu carrito está vacío.", code: "EMPTY_BASKET" }, { status: 400 });
    }

    if (basket.links?.checkout) {
      return NextResponse.json({ checkoutUrl: basket.links.checkout, demo: false });
    }

    const returnUrl = `${site.url.replace(/\/$/, "")}/carrito`;
    const authOptions = await getBasketAuthUrl(ident, returnUrl);
    const authUrl = authOptions.find((option) => option.url)?.url;

    if (authUrl) {
      return NextResponse.json({ authUrl, demo: false });
    }

    return NextResponse.json(
      {
        error:
          "Tebex no ha devuelto un enlace de pago. Revisa que el carrito tenga un nick válido y que la tienda esté activa.",
        code: "NO_CHECKOUT_LINK",
      },
      { status: 422 },
    );
  } catch (error) {
    if (error instanceof TebexError) {
      return NextResponse.json({ error: error.message, code: "TEBEX_ERROR" }, { status: 502 });
    }
    console.error("[basket/checkout]", error);
    return NextResponse.json(
      { error: "No se pudo iniciar el pago. Inténtalo de nuevo.", code: "INTERNAL_ERROR" },
      { status: 500 },
    );
  }
}
