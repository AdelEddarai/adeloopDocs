export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    host: "https://learn-the-web.vercel.app",
    sitemap: "https://learn-the-web.vercel.app/sitemap.xml",
  };
}
