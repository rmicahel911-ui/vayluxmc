import type { MetadataRoute } from "next";

import { site } from "@/lib/site";
import { getCatalog } from "@/lib/tebex";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = site.url.replace(/\/$/, "");
  const catalog = await getCatalog();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${base}/categorias`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/como-comprar`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/legal`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = catalog.categories.map((category) => ({
    url: `${base}/category/${encodeURIComponent(category.slug ?? String(category.id))}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const packageRoutes: MetadataRoute.Sitemap = catalog.packages.map((item) => ({
    url: `${base}/paquete/${encodeURIComponent(item.ident)}`,
    lastModified: new Date(item.updated_at || item.created_at || now),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...packageRoutes];
}
