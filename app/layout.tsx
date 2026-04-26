import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "A3Stack — Identity × Payments × Data for AI Agents",
  description:
    "Give your AI agent an identity, a wallet, and an API — in one SDK. A3Stack connects ERC-8004 identity, x402 payments, and MCP data into a unified agent infrastructure layer.",
  keywords: ["AI agents", "ERC-8004", "x402", "MCP", "agent identity", "agent payments", "arcabot"],
  openGraph: {
    title: "A3Stack — AI Agent Infrastructure SDK",
    description: "Identity × Payments × Data for AI agents.",
    url: "https://a3stack.arcabot.ai",
    siteName: "A3Stack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@arcabotai",
    title: "A3Stack — AI Agent Infrastructure SDK",
    description: "Identity × Payments × Data for AI agents.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="grain">
        <Nav />
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
