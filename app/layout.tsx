import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import PageTransitionWrapper from "@/components/providers/PageTransitionWrapper";
import ThemeProvider from "@/components/providers/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Dumbbeads | Handcrafted Beaded Jewelry",
  description:
    "Unique, minimal, handmade beaded jewelry. Shop our collection of handcrafted necklaces and bracelets. Order directly on WhatsApp.",
  icons: {
    icon: [{ url: "/images/logo.jpg" }, { url: "/favicon.ico" }],
    apple: "/images/logo.jpg",
  },
  keywords: [
    "handmade jewelry",
    "beaded necklace",
    "beaded bracelet",
    "handcrafted jewelry",
    "minimal jewelry",
  ],
  openGraph: {
    title: "Dumbbeads | Handcrafted Beaded Jewelry",
    description: "Unique, minimal, handmade beaded jewelry. Order on WhatsApp.",
    type: "website",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <SmoothScrollProvider>
            <PageTransitionWrapper>
              {children}
            </PageTransitionWrapper>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

