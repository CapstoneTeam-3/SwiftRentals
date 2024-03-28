import { getMessage } from "@reduxjs/toolkit/dist/actionCreatorInvariantMiddleware";
import axios from "axios";
const BASEURL = "http://localhost:3001/api";
const token = "";

export const chatAPI = {
  getChatList: (userId: string | null) => {
    return axios.get(`${BASEURL}/chat/get-chat-list?user_id=${userId}`);
  },
  getMessagesByChatId: (chatId: string | null) => {
    return axios.get(`${BASEURL}/chat/get-messages?chatList_id=${chatId}`);
  },
  createChatList: (user1: string, user2: string) => {
    return axios.post(`${BASEURL}/chat/create-chat-list`, {
      user1,
      user2,
    });
  },
};
