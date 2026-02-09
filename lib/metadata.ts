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
    other: {
      "google-site-verification": "jwCuOJVBgD3jYqsISRs-VSJKzXYvtQYel_mVuy5nkJ8",
      ...override.other,
    },
  };
}

// Determine the base URL based on environment
function getBaseUrl(): URL {
  // Check for explicit SITE_URL environment variable (highest priority)
  if (process.env.SITE_URL) {
    return new URL(process.env.SITE_URL);
  }

  // Check for Netlify URL (for Netlify deployments)
  if (process.env.URL) {
    return new URL(process.env.URL);
  }

  // Check for Netlify deploy URL
  if (process.env.DEPLOY_PRIME_URL) {
    return new URL(process.env.DEPLOY_PRIME_URL);
  }

  // Check for Vercel URL (for Vercel deployments)
  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}`);
  }

  // Production fallback - use the actual production domain
  if (process.env.NODE_ENV === "production") {
    return new URL("https://adeloopdoc.netlify.app");
  }

  // Development fallback
  return new URL("http://localhost:3000");
}

export const baseUrl = getBaseUrl();
