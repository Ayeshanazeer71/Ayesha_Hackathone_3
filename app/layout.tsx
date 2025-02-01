import type { Metadata } from "next";
import "./globals.css";
import dynamic from "next/dynamic";
import { Outfit } from "next/font/google";

import { WishlistProvider } from "./context/WishlistContext";
import ReduxProvider from "./redux/provider";

// Font Optimization: Using swap for better performance
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap", // Font display swap for better load performance
});

// Lazy Loading Navbar and Footer components
const Navbar = dynamic(() => import("./components/navbar"), { ssr: false });
const Footer = dynamic(() => import("./components/footer"), { ssr: false });

export const metadata: Metadata = {
  title: "Avion",
  description: "Create website by using next js and tailwind css and sanity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical fonts for faster rendering */}
        <link
          rel="preload"
          href="/path/to/font-file.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className={outfit.className}>
        {/* Wrap the entire layout with ReduxProvider and WishlistProvider */}
        <ReduxProvider>
          <WishlistProvider>
            <Navbar />
            {children}
            <Footer />
          </WishlistProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
