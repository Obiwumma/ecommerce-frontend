import type { Metadata } from "next";
import "./globals.css";
// 1. Import the header
import Header from "./components/Header";

export const metadata: Metadata = {
  title: "My E-Commerce Store",
  description: "E-Commerce store for buying your luxury jerseys",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">
        {/* 2. Place the Header here so it sits on top of every page! */}
        <Header />
        
        {/* 3. Wrap children in a min-height so the footer (if we add one) stays at the bottom */}
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}