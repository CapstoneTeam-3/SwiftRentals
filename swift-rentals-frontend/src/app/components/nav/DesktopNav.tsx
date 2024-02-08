"use client";

import { logoutUser } from "@/app/auth/login/userSlice";
import Image from "next/image";
import Link from "next/link";
import { IconContext } from "react-icons";
import {
  BsMoonStarsFill as DarkIcon,
  BsGearFill as SettingsIcon,
} from "react-icons/bs";
import { useDispatch } from "react-redux";

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
                  onClick={() => dispatch(logoutUser())}
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
          <DarkIcon />
          <SettingsIcon />
        </IconContext.Provider>
      </div>
    </nav>
  );
}
