import "./global.css";
import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import { RootProvider } from "fumadocs-ui/provider";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { baseUrl, createMetadata } from "@/lib/metadata";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = createMetadata({
  title: {
    template: "%s | Adeloop - AI-Powered Analytics Platform",
    default: "Adeloop - Next-Gen AI Analytics & BI Platform",
  },
  description:
    "Adeloop is a cloud-native analytics platform combining DuckDB performance with AI-driven insights (RAG). Analyze data from CSVs, Databases, and Warehouses with a Jupyter-like experience.",
  metadataBase: baseUrl,
  keywords: ["Adeloop", "Analytics", "BI", "Business Intelligence", "DuckDB", "RAG", "AI Analytics", "Data Visualization", "Jupyter Notebook", "Cloud Analytics"],
  openGraph: {
    title: "Adeloop - Next-Gen AI Analytics & BI Platform",
    description: "Analyze data from CSVs, Databases, and Warehouses with a Jupyter-like experience. Powered by DuckDB and AI.",
    url: baseUrl,
    siteName: "Adeloop Docs",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/notebook1.png",
        width: 1200,
        height: 630,
        alt: "Adeloop Analytics Platform Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adeloop - AI-Powered Analytics",
    description: "Cloud-native analytics platform combining DuckDB performance with AI-driven insights.",
    images: ["/notebook1.png"],
  },
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased scroll-smooth selection:bg-neutral-400/25`}
      suppressHydrationWarning
    >
      <head>
        <meta
          name="google-site-verification"
          content="jwCuOJVBgD3jYqsISRs-VSJKzXYvtQYel_mVuy5nkJ8"
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>

      </body>
    </html>
  );
}
