import "./globals.css";
//import "../sass/main.scss";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nibble: Quick & Easy API Requests",
  description:
    "A lightweight, intuitive HTTP client designed to make API testing and development easy",
  /*icons: [
        {
            "src": "/favicon-32x32.png",
            "type": "image/png",
            "sizes": "32x32"
        },
        {
            "src": "/icon-16x16.png",
            "type": "image/png",
            "sizes": "16x16"
        }
  ],*/
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>{children}</body>
    </html>
  );
}
