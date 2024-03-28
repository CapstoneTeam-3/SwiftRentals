"use client";

import { chatAPI } from "@/api/chat";
import { selectIsLoggedIn, selectUser } from "@/redux/features/user/userSlice";
import { RootState } from "@/redux/store";
import React, { ReactNode, useEffect, useState } from "react";
import { BiSolidMessageDetail as MessageIcon } from "react-icons/bi";
import { IoArrowBackOutline as BackButton } from "react-icons/io5";
import {
  RiArrowDropDownLine as DropDownIcon,
  RiArrowDropUpLine as DropUpIcon,
} from "react-icons/ri";
import { useSelector } from "react-redux";
import { ChatList } from "./ChatList";
import { ChatTab } from "./ChatTab";
import { Chat } from "@/types";

export function ChatDrawer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState({ chatId: "", reciever: "" });
  const userData = useSelector((state: RootState) => selectUser(state));
  const [userLoggedIn, setUserLoggedIn] = useState("");

 
  const IsUserLoggedIn = useSelector((state: RootState) =>
    selectIsLoggedIn(state)
  );
  useEffect(() => {
    if (userData._id)
      (async function getChatList() {
        const chatList = await chatAPI.getChatList(userData._id);
        setChats(chatList.data.chatList);
      })();
  }, [userData._id]);

  const setChatTab = (chat: Chat) => {
    console.log("chat:", chat);
    setCurrentChat({
      chatId: chat._id,
      reciever: chat.user._id,
    });
    // setReciever("reciever");
  };
  if (typeof IsUserLoggedIn === "undefined") {
    return null;
  }
  return (
    <React.Fragment>
      <div
        className={`z-50 bg-white shadow-2xl border border-gray-300 border-b-0 rounded-xl py-2 px-5 fixed bottom-0 right-24 `}
      >
        <div
          onClick={() => {
            setIsDrawerOpen((prev) => !prev);
          }}
          className="flex justify-center place-items-center gap-4 border-b-2 p-2"
        >
          {currentChat.reciever == "" ? (
            <MessageIcon />
          ) : (
            <BackButton
              onClick={() => {
                setCurrentChat((prev) => {
                  return { ...prev, reciever: "" };
                });
              }}
            />
          )}
          <span className="text-xl">Chat Messaging</span>
          <DropDownIcon
            className={`ml-10  ${isDrawerOpen ? "block" : "hidden"}`}
          />
          <DropUpIcon
            className={`ml-10 ${isDrawerOpen ? "hidden" : "block"}`}
          />
        </div>
        <div
          className={`h-[400px] my-2 ms-2  transition-all ease-in animate-[popOpen_150ms_ease-in] ${
            isDrawerOpen ? "block" : "hidden"
          }`}
        >
          {currentChat.reciever == "" ? (
            <ChatList chats={chats} onClick={setChatTab} />
          ) : (
            <ChatTab sender={userData._id} chat={currentChat} />
          )}
        </div>
        <div
          className={`animate-[popClose_150ms_ease-in] ${
            isDrawerOpen ? "hidden" : "block"
          } `}
        />
      </div>
    </React.Fragment>
  );
}
