"use client";

import { logoutUser } from "@/app/auth/login/userSlice";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { useDispatch } from "react-redux";
import {
  BsMoonStarsFill as DarkIcon,
  BsGearFill as SettingsIcon,
} from "react-icons/bs";

export default function MobileNav({
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuClickHandler = () => {
    setIsMenuOpen((prev) => !prev);
  };
  const dispatch = useDispatch();
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  return (
    <div className={className}>
      <nav className={`flex justify-between place-items-center`}>
        <div className="flex items-center">
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
        <SettingsIcon size={24} onClick={toggleSubMenu} />

          {isSubMenuOpen && (
            <div className="absolute top-16 right-1 mt-2 p-2 bg-white shadow-lg rounded z-50">
              <ul>
                <li>
                  <Link href="#">Profile</Link>
                </li>
                <li>
                  <Link href="/booking">Your Requests</Link>
                </li>
                <li>
                  <Link href="/cars/wishlist">Your Wishlist</Link>
                </li>
              </ul>
            </div>
          )}
        {isMenuOpen ? (
          <IoClose
            onClick={menuClickHandler}
            size={24}
            role="button"
            data-testid="close-icon"
            className="m-3 cursor-pointer hover:scale-110"
          />
        ) : (
          <IoMenu
            onClick={menuClickHandler}
            role="button"
            size={24}
            data-testid="hamburger-icon"
            className="m-3 cursor-pointer hover:scale-110"
          />
        )}
      </nav>
      <section
        className={`w-screen border-t-2 transition-all duration-500 ease-in-out ${
          isMenuOpen ? "max-min-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="p-4">
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
                  className="font-semibold text-center m-1 transition-transform hover:scale-110 cursor-pointer hover:text-blue-600"
                >
                  <Link href={menuLinks[i]}>{item}</Link>
                </li>
              );
          })}
        </ul>
      </section>
    </div>
  );
}
