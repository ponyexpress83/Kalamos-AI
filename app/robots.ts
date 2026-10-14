import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/sito";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/workspace", "/login", "/scheda/s/", "/pilota/grazie"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
