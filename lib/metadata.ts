import { createMetadataImage } from "fumadocs-core/server";
import { source } from "./source";
import type { Metadata } from "next/types";

export const metadataImage = createMetadataImage({
  imageRoute: "/api/dynamic-og",
  source,
});

export function createMetadata(override: Metadata): Metadata {
  return {
    ...override,
    openGraph: {
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      url: "https://learn-the-web.vercel.app",
      images: "/og-image.png",
      siteName: "Learn The Web",
      ...override.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      creator: "@lil_poop__",
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      images: "/og-image.png",
      ...override.twitter,
    },
  };
}

export const baseUrl =
  process.env.NODE_ENV === "development" || !process.env.VERCEL_URL
    ? new URL("http://localhost:3000")
    : new URL("https://learn-the-web.vercel.app");
