import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/sito";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/redazione", "/demo", "/pilota", "/riservatezza", "/privacy"].map((p) => ({
    url: `${SITE_URL}${p}`,
    changeFrequency: "weekly",
    priority: p === "" ? 1 : 0.6,
  }));
}
