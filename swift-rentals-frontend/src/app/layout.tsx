import StoreProvider from "@/redux/StoreProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Bounce, ToastContainer } from "react-toastify";
import Footer from "./components/footer/Footer";
import DesktopNav from "./components/nav/DesktopNav";
import MobileNav from "./components/nav/MobileNav";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Nav from "./components/nav/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Swift Rentals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const menuItems: string[] = ["Browse", "Profile", "Profile", "Login", "Admin", "Cars", "Add Car", "User Cars"];
  const menuLinks: string[] = ["/", "/", "/", "/login", "/admin", "/admin/cars", "/admin/cars/add", "/cars"];
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
          <Nav />
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
