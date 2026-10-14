import type { MetadataRoute } from "next";
import { SITE } from "../lib/site";
import { APTIDOES, FAZENDAS } from "../lib/fazendas";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.url, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/fazendas`, changeFrequency: "weekly", priority: 0.9 },
    ...Object.keys(APTIDOES).map((a) => ({
      url: `${SITE.url}/lp/${a}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...FAZENDAS.map((f) => ({
      url: `${SITE.url}/fazendas/${f.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    { url: `${SITE.url}/politica-de-privacidade`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
