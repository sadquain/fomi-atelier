import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Fomi Atelier — Next-Gen AI Content Studio",
  description:
    "Generate breathtaking images and cinematic videos with Fomi's generative AI canvas. Refined control, instant synthesis, and collaborative workspace.",
  keywords: ["AI art", "AI image generator", "Fomi", "text to video", "diffusion studio"],
  openGraph: {
    title: "Fomi Atelier — Next-Gen AI Content Studio",
    description:
      "Generate breathtaking images and cinematic videos with Fomi's generative AI canvas. Refined control, instant synthesis, and collaborative workspace.",
    url: "https://fomi.art",
    siteName: "Fomi Atelier",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fomi Atelier — Next-Gen AI Content Studio",
    description:
      "Generate breathtaking images and cinematic videos with Fomi's generative AI canvas.",
    creator: "@fomi_art",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF7F4" },
    { media: "(prefers-color-scheme: dark)", color: "#151312" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${plusJakarta.variable}`}>
      <body className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] font-sans antialiased selection:bg-[#E8967F]/30 selection:text-[var(--text-primary)]">
        {children}
      </body>
    </html>
  );
}
