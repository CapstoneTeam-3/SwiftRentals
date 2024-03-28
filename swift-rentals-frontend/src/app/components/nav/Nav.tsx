"use client";

import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { selectIsLoggedIn } from "@/redux/features/user/userSlice";
import NoSSRWrapper from "../NoSSRWrapper/NoSSRWrapper";

const Nav = () => {
  //get user status from store
  const isLoggedIn = useSelector((state: RootState) => selectIsLoggedIn(state));

  //list of nav items and their routes
  const menuItems: string[] = [
    "Browse",
    "Profile",
    "Admin",
    isLoggedIn ? "Logout" : "Login",
  ];
  const menuLinks: string[] = ["/cars", "/", "/admin", "/auth/login"];
  return (
    <React.Fragment>
      <NoSSRWrapper>
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
      </NoSSRWrapper>
    </React.Fragment>
  );
};
export default Nav;
