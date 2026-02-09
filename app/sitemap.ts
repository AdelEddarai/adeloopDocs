import type { MetadataRoute } from "next";
import { baseUrl } from "@/lib/metadata";
import { source } from "@/lib/source";
import { stat } from "fs/promises";
import { join } from "path";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = (path: string): string => new URL(path, baseUrl).toString();

  // Helper function to get last modified date from file system
  const getLastModified = async (page: {
    file?: { path: string };
    url: string;
  }): Promise<Date | undefined> => {
    try {
      // Try to get file modification time if file path exists
      if (page.file?.path) {
        const basePath = join(process.cwd(), "content", "docs");
        let filePath = join(basePath, page.file.path);
        
        // Try the path as-is first (might already include .mdx)
        try {
          const stats = await stat(filePath);
          return stats.mtime;
        } catch {
          // If that fails, try adding .mdx extension if not present
          if (!filePath.endsWith(".mdx") && !filePath.endsWith(".md")) {
            const mdxPath = `${filePath}.mdx`;
            try {
              const stats = await stat(mdxPath);
              return stats.mtime;
            } catch {
              // Try index.mdx in directory (for index pages)
              const indexPath = join(filePath, "index.mdx");
              try {
                const stats = await stat(indexPath);
                return stats.mtime;
              } catch {
                // Last resort: try without the last segment (directory-based routing)
                const dirPath = filePath.split("/").slice(0, -1).join("/");
                const dirIndexPath = join(dirPath, "index.mdx");
                try {
                  const stats = await stat(dirIndexPath);
                  return stats.mtime;
                } catch {
                  // If all fail, return undefined (optional field)
                  return undefined;
                }
              }
            }
          }
        }
      }
    } catch {
      // If file doesn't exist or can't be accessed, return undefined
      // This is fine - lastModified is optional in sitemap
    }
    return undefined;
  };

  // Calculate priority based on URL depth
  // URLs are like: /docs/adeloop, /docs/adeloop/jupyter-features
  const getPriority = (url: string): number => {
    // Remove leading/trailing slashes and split
    const parts = url.replace(/^\/|\/$/g, "").split("/").filter(Boolean);
    const depth = parts.length;
    
    if (depth === 0) return 1.0; // Homepage
    if (depth === 1) return 0.9; // /docs/adeloop
    if (depth === 2) return 0.8; // /docs/adeloop/jupyter-features
    if (depth === 3) return 0.7; // /docs/adeloop/sub/page
    return 0.6; // Deeper pages
  };

  // Determine change frequency based on URL
  const getChangeFrequency = (
    url: string
  ): "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never" => {
    if (url === "/") return "monthly";
    // Documentation pages change more frequently
    return "weekly";
  };

  // Homepage entry
  const homepage: MetadataRoute.Sitemap[number] = {
    url: url("/"),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1.0,
  };

  // Documentation pages
  const docPages = await Promise.all(
    source.getPages().map(async (page) => {
      const lastModified = await getLastModified(page);
      const priority = getPriority(page.url);
      const changeFrequency = getChangeFrequency(page.url);

      return {
        url: url(page.url),
        lastModified,
        changeFrequency,
        priority,
      } as MetadataRoute.Sitemap[number];
    })
  );

  return [homepage, ...docPages];
}
