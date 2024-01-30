"use client";

import Image from "next/image";
import React, { useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";

export default function MobileNav({
  menuItems,
  className,
}: {
  menuItems: string[];
  className: string;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuClickHandler = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className={className}>
      <nav className={`flex justify-between place-items-center`}>
        <div className="flex items-center">
          <Image
            className="mx-5"
            src={`/logo.png`}
            alt="main logo of swift rentals"
            width={40}
            height={40}
          />
          <h1 className="font-bold text-2xl p-0 m-4">
            <span>Swift</span>
            <span className="text-blue-600">Rentals</span>
          </h1>
        </div>
        {isMenuOpen ? (
          <IoClose
            onClick={menuClickHandler}
            size={24}
            className="m-3 cursor-pointer hover:scale-110"
          />
        ) : (
          <IoMenu
            onClick={menuClickHandler}
            size={24}
            className="m-3 cursor-pointer hover:scale-110"
          />
        )}
      </nav>
      <section
        className={`w-screen border-t-2 transition-all duration-500 ease-in-out ${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="p-4">
          {menuItems.map((item, i) => (
            <li
              key={i}
              className="font-semibold text-center m-1 transition-transform hover:scale-110 cursor-pointer hover:text-blue-600"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
