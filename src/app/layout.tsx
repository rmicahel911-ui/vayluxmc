import type { Metadata, Viewport } from "next";
import { Pixelify_Sans, Roboto } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StoreProvider } from "@/components/store-provider";
import { UsernameDialog } from "@/components/username-dialog";
import { site } from "@/lib/site";

import "./globals.css";

const pixel = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-pixel",
  display: "swap",
});

const body = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `Tienda Oficial | Rangos, Beneficios y Cosméticos`,
    template: `%s | ${site.name}`,
  },
  description:
    "Adquiere rangos exclusivos, cosméticos, paquetes y beneficios premium con entrega instantánea para Minecraft Java & Bedrock.",
  keywords: [
    "Minecraft",
    "Tienda Minecraft",
    site.server.name,
    "Rangos Minecraft",
    "Minecraft Bedrock",
    "Minecraft Java",
    "Servidor Minecraft",
  ],
  authors: [{ name: site.server.name }],
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: site.url,
    siteName: site.name,
    title: `Tienda Oficial | ${site.server.name}`,
    description:
      "Adquiere rangos exclusivos, cosméticos, paquetes y beneficios premium con entrega instantánea para Minecraft Java & Bedrock.",
    images: [{ url: "/images/og.svg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Tienda Oficial | ${site.server.name}`,
    description:
      "Adquiere rangos exclusivos, cosméticos, paquetes y beneficios premium con entrega instantánea para Minecraft Java & Bedrock.",
    images: ["/images/og.svg"],
  },
  icons: {
    icon: [
      { url: "/images/favicon.svg", type: "image/svg+xml" },
      { url: "/images/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: [{ url: "/images/favicon-32.png", type: "image/png" }],
    apple: [{ url: "/images/favicon-32.png", type: "image/png", sizes: "32x32" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0f0508",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${pixel.variable} ${body.variable}`}>
      <body className="relative flex min-h-screen flex-col justify-between antialiased selection:bg-[#e11d48] selection:text-white">
        <StoreProvider>
          <div className="store-bg" aria-hidden="true" />
          <SiteHeader />
          <main className="w-full flex-1">{children}</main>
          <SiteFooter />
          <UsernameDialog />
        </StoreProvider>
      </body>
    </html>
  );
}
