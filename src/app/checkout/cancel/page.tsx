import type { Metadata } from "next";

import { CheckoutResult } from "@/components/checkout-result";

export const metadata: Metadata = {
  title: "Pago cancelado",
  description: "El pago no se ha completado.",
  robots: { index: false, follow: false },
};

export default function CheckoutCancelPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-16">
      <CheckoutResult variant="cancel" />
    </div>
  );
}
