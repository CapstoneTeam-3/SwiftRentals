import StoreProvider from "@/redux/StoreProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Bounce, ToastContainer } from "react-toastify";
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
  const menuItems: string[] = ["Browse", "Profile", "Profile", "Login", "Admin", "Cars", "Add Car"];
  const menuLinks: string[] = ["/", "/", "/", "/login", "/admin", "/admin/cars", "/admin/cars/add"];
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            transition={Bounce}
          />
          <DesktopNav
            menuItems={menuItems}
            menuLinks={menuLinks}
            className="hidden sm:grid grid-cols-2 "
          />
          <MobileNav
            menuItems={menuItems}
            menuLinks={menuLinks}
            className="sm:hidden"
          />
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
