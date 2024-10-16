import type { Metadata } from "next";
import { Urbanist } from "next/font/google"; // Import Urbanist font
import "./globals.css";

// Import the Urbanist font from Google
const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-slate-900 text-slate-100">
      <body className={`${urbanist.className} antialiased`}>{children}</body>
    </html>
  );
}
