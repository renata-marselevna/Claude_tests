import type { Metadata } from "next";
import localFont from "next/font/local";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const suiGeneris = localFont({
  src: "./fonts/sui_generis.otf",
  variable: "--font-sui-generis",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: "STARCO – UFO School",
  description: "Explore all the planets of this system",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${suiGeneris.variable} ${spaceGrotesk.variable} h-full`}>
      <body className="min-h-full bg-black">{children}</body>
    </html>
  );
}
