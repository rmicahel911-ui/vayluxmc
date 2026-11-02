import type { Metadata } from "next";

import { Benefits } from "@/components/benefits";
import { DemoBanner } from "@/components/demo-banner";
import { DiscordBanner } from "@/components/discord-banner";
import { Hero } from "@/components/hero";
import { HowToBuy } from "@/components/how-to-buy";
import { ServerConnect } from "@/components/server-connect";
import { StoreSidebar } from "@/components/store-sidebar";
import { site } from "@/lib/site";
import { getCatalog } from "@/lib/tebex";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Tienda Oficial | Rangos, Beneficios y Cosméticos",
  description:
    "Adquiere rangos exclusivos, cosméticos, paquetes y beneficios premium con entrega instantánea para Minecraft Java & Bedrock.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const catalog = await getCatalog();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: site.name,
    url: site.url,
    description: catalog.store.description,
    image: `${site.url}/images/og.svg`,
    currenciesAccepted: catalog.store.currency,
    paymentAccepted: "Visa, Mastercard, PayPal, Google Pay, Apple Pay",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="w-full pb-16">
        <Hero />

        <section className="relative z-10 mx-auto mb-12 w-full max-w-7xl px-4 md:px-6">
          {catalog.demo ? (
            <div className="mb-5">
              <DemoBanner reason={catalog.demoReason} />
            </div>
          ) : null}

          <div className="flex flex-col items-start gap-6 lg:flex-row lg:gap-8">
            <StoreSidebar />

            <div className="flex w-full min-w-0 flex-1 flex-col gap-6 lg:gap-8">
              <Benefits />
              <HowToBuy />
            </div>
          </div>
        </section>

        <div className="mt-8">
          <DiscordBanner />
        </div>

        <ServerConnect />
      </div>
    </>
  );
}
