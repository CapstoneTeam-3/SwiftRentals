"use client";

import Image from "next/image";
import { useState } from "react";
import { BiSolidMessageDetail as MessageIcon } from "react-icons/bi";
import {
  RiArrowDropDownLine as DropDownIcon,
  RiArrowDropUpLine as DropUpIcon,
} from "react-icons/ri";
import { ChatItem } from "./ChatItem";

export function ChatDrawer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <div className="z-50 bg-white shadow-2xl border border-gray-300 border-b-0 rounded-xl py-2 px-5 fixed bottom-0 right-24">
      <div
        onClick={() => {
          setIsDrawerOpen((prev) => !prev);
        }}
        className="flex justify-center place-items-center gap-4 border-b-2 p-2"
      >
        <MessageIcon />
        <span className="text-xl">Chat Messaging</span>
        {isDrawerOpen ? (
          <DropDownIcon className="ml-10" />
        ) : (
          <DropUpIcon className="ml-10" />
        )}
      </div>
      {isDrawerOpen ? (
        <div className="h-[400px] m-2 transition-all ease-in animate-[popOpen_150ms_ease-in]">
          <ChatItem
            name="Gordon Freeman 1"
            date="23-01-2024"
            href="/images/profile.jpg"
          />
          <ChatItem
            name="Gordon Freeman 2"
            date="10-08-2022"
            href="/images/profile.png"
          />
        </div>
      ) : (
        <div className="animate-[popClose_150ms_ease-in]" />
      )}
    </div>
  );
}
