import StoreProvider from "@/redux/StoreProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "./components/footer/Footer";
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
        <StoreProvider>
          <DesktopNav
            menuItems={menuItems}
            className="hidden sm:grid grid-cols-2 "
          />
          <MobileNav menuItems={menuItems} className="sm:hidden" />
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
