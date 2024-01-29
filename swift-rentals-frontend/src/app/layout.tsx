import type { Metadata } from "next";
import { Inter } from "next/font/google";
import DesktopNav from "./components/nav/DesktopNav";
import MobileNav from "./components/nav/MobileNav";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Swift Rentals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const menuItems: string[] = ["Browse", "Profile", "Profile", "Settings"];
  return (
    <html lang="en">
      <body className={inter.className}>
        <DesktopNav
          menuItems={menuItems}
          className="hidden sm:grid grid-cols-2 "
        />
        <MobileNav menuItems={menuItems} className="sm:hidden" />
        {children}
        <footer className="bg-green-200 w-full h-52"></footer>
      </body>
    </html>
  );
}
