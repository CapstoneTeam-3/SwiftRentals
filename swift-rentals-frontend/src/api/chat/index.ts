import { getMessage } from "@reduxjs/toolkit/dist/actionCreatorInvariantMiddleware";
import axios from "axios";
const BASEURL = "http://localhost:3001/api";
const token = "";

export const chatAPI = {
  getChatList: (userId: string | null, token: string | null) => {
    return axios.get(`${BASEURL}/chat/get-chat-list?user_id=${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
  },
  getMessagesByChatId: (chatId: string | null, token: string | null) => {
    return axios.get(`${BASEURL}/chat/get-messages?chatList_id=${chatId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
  },
  createChatList: (user1: string, user2: string) => {
    return axios.post(`${BASEURL}/chat/create-chat-list`, {
      user1,
      user2,
    });
  },
};
