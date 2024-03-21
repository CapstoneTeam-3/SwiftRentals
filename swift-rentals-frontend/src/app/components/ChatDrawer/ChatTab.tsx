import { chatAPI } from "@/api/chat";
import CustomMessageField from "@/app/ui/CustomMessageField/CustomMessageField";
import { selectUser } from "@/redux/features/user/userSlice";
import { RootState } from "@/redux/store";
import {
  ChangeEvent,
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
  const bottomDiv = useRef();
  const userData = useSelector((state: RootState) => selectUser(state));

  const socket = useMemo(() => socketIo("http://localhost:3001"), []);
  const [socketId, setSocketId] = useState<string>();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    (async function loadMessages() {
      const messagesData = await chatAPI.getMessagesByChatId(chat.chatId);
      console.log(messagesData.data.chats);

      setMessages(messagesData.data.chats);
    })();

    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("connected ", socket.id);
      console.log(sender, socketId);
      bottomDiv.current.scrollIntoView();
    });
    socket.on("receive-message", (data) => {
      console.log("recive message");
      console.log(data);
      bottomDiv.current.scrollIntoView();
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
    const messageToSent = {
      chatList_id: chat.chatId,
      sender_id: sender,
      receiver_id: chat.reciever,
      content: message,
    };
    setMessages((prev) => {
      return [
        ...prev,
        {
          chatListId: chat.chatId,
          sender_user: sender,
          receiver_user: chat.reciever,
          content: message,
        },
      ];
    });
    setMessage("");
    socket.emit("message", messageToSent);
    bottomDiv.current.scrollIntoView();
  };
  return (
    <div>
      <div className="w-72 flex flex-col h-80 text-wrap overflow-scroll">
        {messages.map((message, index) => {
          if (message.sender_user === userData._id) {
            return (
              <div className="flex max-w-72" key={index}>
                <div className="p-4 bg-gray-200 mb-1 px-2 rounded-lg">
                  <span className="text-wrap">{message.content}</span>
                </div>
              </div>
            );
          } else {
            return (
              <div className="flex ms-auto max-w-72 text-right" key={index}>
                <div className="ms-auto p-4 bg-gray-200 justify-items-end mb-1 px-2 rounded-lg">
                  <span className="text-wrap ">{message.content}</span>
                </div>
              </div>
            );
          }
        })}
        <div ref={bottomDiv} />
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
