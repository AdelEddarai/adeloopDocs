import { baseUrl } from "@/lib/metadata";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    host: baseUrl.toString(),
    sitemap: new URL("/sitemap.xml", baseUrl).toString(),
  };
}
