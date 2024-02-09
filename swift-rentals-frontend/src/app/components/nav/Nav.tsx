"use client";

import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const Nav = () => {
  //get user status from store
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  //list of nav items and their routes
  const menuItems: string[] = [
    "Browse",
    "Profile",
    "Admin",
    isLoggedIn ? "Logout" : "Login",
  ];
  const menuLinks: string[] = ["/", "/", "/admin", "/auth/login"];
  return (
    <React.Fragment>
      <DesktopNav
        isLoggedIn={isLoggedIn}
        menuItems={menuItems}
        menuLinks={menuLinks}
        className="hidden sm:grid grid-cols-2 "
      />
      <MobileNav
        isLoggedIn={isLoggedIn}
        menuItems={menuItems}
        menuLinks={menuLinks}
        className="sm:hidden"
      />
    </React.Fragment>
  );
};
export default Nav;
