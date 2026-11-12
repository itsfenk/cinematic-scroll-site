import type { Metadata } from "next";
import { Syne, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NOISEMAKER® — Stand Out From The Noise",
  description:
    "NOISEMAKER is a full-service advertising agency building loud, unmissable brands. Paid social, PPC, creative studio and growth — engineered to make you stand out from the noise.",
  keywords: [
    "advertising agency",
    "paid social",
    "PPC",
    "creative studio",
    "brand strategy",
    "NOISEMAKER",
  ],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "NOISEMAKER® — Stand Out From The Noise",
    description:
      "Full-service advertising agency building loud, unmissable brands.",
    siteName: "NOISEMAKER",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${grotesk.variable} antialiased bg-ink text-chalk`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
