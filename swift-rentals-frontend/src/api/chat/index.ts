import axios from "axios";
const BASEURL = "http://localhost:3001/api";

export const chatAPI = {
  getChatList: (userId: string | null) => {
    // return axios.get(`${BASEURL}/chat/get-chat-list?user-id=${userId}`);
    return axios.get(`${BASEURL}/chat/get-chat-list`);
  },
  addCar: (formData: any) => {
    return axios.post(`${BASEURL}/car/add-car/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  deleteCar: (id: string) => {
    return axios.delete(`${BASEURL}/car/delete-car/${id}`);
  },
};
