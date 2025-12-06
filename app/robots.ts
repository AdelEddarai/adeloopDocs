export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    host: "https://adeloopdoc.netlify.app",
    sitemap: "https://adeloopdoc.netlify.app/sitemap.xml",
  };
}
