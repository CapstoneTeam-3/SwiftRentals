"use client";

import { log } from "console";
import { usePathname } from "next/navigation";
import React from "react";
import BreadCrumb from "../components/breadcrumbs/BreadCrumb";
import FilterDropDown from "../ui/Filter/FilterDropDown/FilterDropDown";
import FilterItem from "../ui/Filter/FilterDropDown/FilterItem";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentPath = usePathname()
    .split("/")
    .pop()!
    .replace(/_/g, " ")
    .toUpperCase();

  return (
    <section className="flex">
      <div className="w-1/4 sm:w-1/6 h-screen shadow bg-gray-100 rounded-md">
        <ul className="p-5 flex flex-col m-1">
          <FilterDropDown
            heading="User"
            filterItems={[
              new FilterItem("User List", "/admin/user/user_list"),
              new FilterItem("create user", "/admin/user/create_user"),
            ]}
          />
          <FilterDropDown
            heading="Cars"
            filterItems={[
              new FilterItem("List car", "/admin/cars"),
              new FilterItem("Add car", "/admin/cars/add_car"),
              new FilterItem("Edit car", "/admin/cars/edit_car"),
            ]}
          />
        </ul>
      </div>
      <div className="mx-10 my-5">
        <h2 className="text-3xl font-semibold block">{currentPath}</h2>
        <BreadCrumb
          homeElement={"Home"}
          separator={<span> | </span>}
          activeClasses="text-sky-500"
          containerClasses="flex py-5 to-blue-600"
          listClasses="hover:underline mx-2"
          capitalizeLinks
        />
        {children}
      </div>
    </section>
  );
}
