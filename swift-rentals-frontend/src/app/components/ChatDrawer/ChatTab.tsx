import { selectUser } from "@/app/auth/login/userSlice";
import CustomFormField from "@/app/ui/CustomFormField/CustomFormField";
import CustomMessageField from "@/app/ui/CustomMessageField/CustomMessageField";
import { RootState } from "@/redux/store";
import { log } from "console";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { IoSend } from "react-icons/io5";
import { useSelector } from "react-redux";
import { io as socketIo } from "socket.io-client";

interface Chat {
  chatId: string;
  reciever: string;
}

export function ChatTab({
  sender,
  chat,
}: {
  sender: string | null;
  chat: Chat;
}) {
  const userData = useSelector((state: RootState) => selectUser(state));

  const socket = useMemo(() => socketIo("http://localhost:3001"), []);
  const [socketId, setSocketId] = useState<string>();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      chatList_id: "65d12eb29bb74e85fcd7921f",
      sender_id: "65c6b22c03b67384c1d8b07b",
      receiver_id: "65c6637ee30004c691fd17cb",
      content: "message 1",
    },
    {
      chatList_id: "65d12eb29bb74e85fcd7921f",
      sender_id: "65c6b22c03b67384c1d8b07b",
      receiver_id: "65c6637ee30004c691fd17cb",
      content: "message 2",
    },
  ]);

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("connected ", socket.id);
      console.log(sender, socketId);
    });
    socket.on("receive-message", (data) => {
      console.log("recive message");

      console.log(data);
      setMessages((prev) => {
        return [...prev, data];
      });
    });
    return () => {
      socket.off("connect");
      socket.off("receive-message");
    };
  }, []);

  useEffect(() => {
    if (socketId) {
      socket.emit("activeUser", {
        sender,
        socketId,
      });
    }
  }, [socketId]);

  const sendMessage = () => {
    console.log("message sent");
    const messageToSent = {
      chatList_id: chat.chatId,
      sender_id: sender,
      receiver_id: chat.reciever,
      content: message,
    };
    setMessages((prev) => {
      return [...prev, messageToSent];
    });
    socket.emit("message", messageToSent);
  };
  return (
    <div>
      <div className="w-full h-80 overflow-scroll">
        {messages.map((message, index) => {
          if (message.sender_id === userData._id) {
            return (
              <div key={index} className="p-4 px-2 text-left">
                <span className="text-right bg-gray-200 m-3 p-3 rounded-lg ">
                  {message.content}
                </span>
              </div>
            );
          } else {
            return (
              <div key={index} className="p-4 px-2 text-right">
                <span className="bg-gray-200 m-3 p-3 rounded-lg ">
                  {message.content}
                </span>
              </div>
            );
          }
        })}
      </div>
      <CustomMessageField
        icon={IoSend}
        iconOnClick={sendMessage}
        placeholder=""
        name="messageInput"
        type="text"
        id="messageInput"
        value={message}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setMessage(e.target.value);
        }}
      />
    </div>
  );
}
