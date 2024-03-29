"use client";

import { chatAPI } from "@/api/chat";
import { selectUser } from "@/app/auth/login/userSlice";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
import { BiSolidMessageDetail as MessageIcon } from "react-icons/bi";
import { IoArrowBackOutline as BackButton } from "react-icons/io5";
import {
  RiArrowDropDownLine as DropDownIcon,
  RiArrowDropUpLine as DropUpIcon,
} from "react-icons/ri";
import { useSelector } from "react-redux";
import { ChatItem } from "./ChatItem";
import { ChatList } from "./ChatList";
import { ChatTab } from "./ChatTab";

export function ChatDrawer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState({ chatId: "", reciever: "" });
  const userData = useSelector((state: RootState) => selectUser(state));
  interface Chat {
    _id: string;
    user2: { _id: string };
  }

  useEffect(() => {
    const getChatList = async () => {
      const chatList = await chatAPI.getChatList(userData._id);
      setChats(chatList.data.chatList);
    };
    getChatList();
  }, [userData._id]);

  const setChatTab = (chat: Chat) => {
    console.log("chat:", chat);
    setCurrentChat({
      chatId: chat._id,
      reciever:
        userData._id === chat.user2._id ? chat.user1._id : chat.user2._id,
    });
    // setReciever("reciever");
  };

  return (
    <div className="z-50 bg-white shadow-2xl border border-gray-300 border-b-0 rounded-xl py-2 px-5 fixed bottom-0 right-24">
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
        {isDrawerOpen ? (
          <DropDownIcon className="ml-10" />
        ) : (
          <DropUpIcon className="ml-10" />
        )}
      </div>
      {isDrawerOpen ? (
        <div className="h-[400px] m-2 transition-all ease-in animate-[popOpen_150ms_ease-in]">
          {currentChat.reciever == "" ? (
            <ChatList chats={chats} onClick={setChatTab} />
          ) : (
            <ChatTab sender={userData._id} chat={currentChat} />
          )}
        </div>
      ) : (
        <div className="animate-[popClose_150ms_ease-in]" />
      )}
    </div>
  );
}
