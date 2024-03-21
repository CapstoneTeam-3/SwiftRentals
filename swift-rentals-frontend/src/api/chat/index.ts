import { getMessage } from "@reduxjs/toolkit/dist/actionCreatorInvariantMiddleware";
import axios from "axios";
const BASEURL = "http://localhost:3001/api";
const token = '';

export const chatAPI = {
  getChatList: (userId: string | null) => {
    return axios.get(`${BASEURL}/chat/get-chat-list?user_id=${userId}`);
  },
  getMessagesByChatId: (chatId: string | null) => {
    return axios.get(`${BASEURL}/chat/get-messages?chatList_id=${chatId}`);
  },
  deleteCar: (id: string) => {
    return axios.delete(`${BASEURL}/car/delete-car/${id}`,{
      headers:{
        "Authorization": token
      }
    });
  },
};
