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
    template: "%s | Adeloop - Analytics & BI Platform",
    default: "Adeloop - Analytics & BI Platform",
  },
  description:
    "Adeloop is a next-generation analytics and business intelligence platform designed to solve real, high-value pain points that businesses face today in data analytics, dashboards, and actionable insights.",
  metadataBase: baseUrl,
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
          content=""
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>

      </body>
    </html>
  );
}
