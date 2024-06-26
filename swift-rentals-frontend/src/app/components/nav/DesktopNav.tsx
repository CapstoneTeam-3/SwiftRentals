"use client";

import { logoutUser, selectUser } from "@/redux/features/user/userSlice";
import { RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import {
  BsMoonStarsFill as DarkIcon,
  BsSunFill as LightIcon,
  BsGearFill as SettingsIcon,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

export default function DesktopNav({
  menuItems,
  menuLinks,
  className,
  isLoggedIn,
}: {
  menuItems: string[];
  menuLinks: string[];
  className: string;
  isLoggedIn: boolean;
}) {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => selectUser(state));
  const userId = userData._id;
  const route = useRouter();

  const handleLogout = () => {
    route.push("/auth/login");
    dispatch(logoutUser());
  };

  const [activeTheme, setActiveTheme] = useState("light");

  useEffect(() => {
    document.body.dataset.theme = activeTheme;
  }, [activeTheme]);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  return (
    <nav className={`${className} h-16 w-full`}>
      <div className="flex items-center ">
        <Link href="/">
          <Image
            className="mx-5"
            src={`/logo.png`}
            alt="main logo of swift rentals"
            width={40}
            height={40}
          />
        </Link>
        <Link href="/">
          <h1 className="font-bold text-2xl p-0 m-4">
            <span>Swift</span>
            <span className="text-blue-600">Rentals</span>
          </h1>
        </Link>
      </div>
      <div className="flex items-center justify-end">
        <ul className="h-full gap-4 font-semibold flex justify-evenly items-center mx-2">
          {menuItems.map((item, i) => {
            if (item === "Logout")
              return (
                <button
                  onClick={handleLogout}
                  key={i}
                  className="transition-transform hover:scale-110 cursor-pointer hover:text-blue-600"
                >
                  {item}
                </button>
              );
            else
              return (
                <li
                  key={i}
                  className="transition-transform hover:scale-110 cursor-pointer hover:text-blue-600"
                >
                  <Link href={menuLinks[i]}>{item}</Link>
                </li>
              );
          })}
        </ul>
        <div className="border-r-2 rounded-2xl opacity-10 h-6 mx-2 border-black"></div>
        <IconContext.Provider
          value={{
            className:
              "m-4 cursor-pointer hover:scale-125 transition ease-in-out",
          }}
        >
          {activeTheme === "light" ? (
            <DarkIcon onClick={() => setActiveTheme("dark")} />
          ) : (
            <LightIcon onClick={() => setActiveTheme("light")} />
          )}
          <SettingsIcon className="hover:rotate-180" onClick={toggleSubMenu} />

          {isSubMenuOpen && (
            <div className="absolute top-16 right-1 mt-2 p-2 bg-white shadow-lg rounded z-50">
              <ul>
                <li>
                  <Link href="#">Profile</Link>
                </li>
                <li>
                  <Link href="/booking">Your Requests</Link>
                </li>
                {userData.role === "car rental" && (<li>
                  <Link href="/cars/wishlist">Your Wishlist</Link>
                </li>)}
                {userData.role === "car owner" && (<li>
                  <Link href="/cars/add_car">Add Car</Link>
                </li>)}
              </ul>
            </div>
          )}
        </IconContext.Provider>
      </div>
    </nav>
  );
}
DesktopNav.getInitialProps = async () => {
  return {};
};
