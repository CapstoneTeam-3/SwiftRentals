import Link from "next/link";
import React, { useState } from "react";
import { MdArrowDropDown, MdArrowDropUp, MdNearbyError } from "react-icons/md";
import FilterItem from "./FilterItem";

const FilterDropDown = ({
  filterItems,
  heading,
  icon
}: {
  filterItems: FilterItem[];
  heading: string;
  icon: any
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <li className="relative">
      <div
        className="hover:bg-sky-100 flex gap-2 hover:text-sky-500 cursor-pointer transition-colors p-1 rounded-md text-gray-400 font-bold"
        onClick={toggleDropdown}
      >
        {icon ? (icon) : (<MdNearbyError size={28} />)}
        <span className="hidden md:block">{heading}</span>
        <div className="hidden md:block ml-auto">
          {showDropdown ? (
            <MdArrowDropUp size={28} />
          ) : (
            <MdArrowDropDown size={28} />
          )}
        </div>
      </div>
      <div
        className={`transition-all duration-300 ${
          showDropdown ? "opacity-100 max-h-96" : "opacity-0 max-h-0"
        } overflow-hidden`}
      >
        <ul>
          {filterItems.map((item: FilterItem, index) => (
            <li
              key={index}
              className="font-semibold text-sm sm:text-md text-gray-400 text-center transition-transform hover:scale-110 cursor-pointer hover:text-sky-500"
            >
              <Link href={item.href}>{item.subheading}</Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};
export default FilterDropDown;
