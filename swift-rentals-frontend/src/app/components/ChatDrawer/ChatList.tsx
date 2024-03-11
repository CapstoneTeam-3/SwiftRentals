import { selectUser } from "@/app/auth/login/userSlice";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { ChatItem } from "./ChatItem";

export function ChatList({ chats, onClick }) {
  const userData = useSelector((state: RootState) => selectUser(state));

  return chats.map((chat) => (
    <ChatItem
      key={chat._id}
      name={userData._id === chat.user1._id ? chat.user2.name : chat.user1.name}
      email={
        userData._id === chat.user1._id ? chat.user2.email : chat.user1.email
      }
      href="/images/profile.png"
      onClick={() => onClick(chat)}
    />
  ));
}
