import { selectUser } from "@/redux/features/user/userSlice";
import { RootState } from "@/redux/store";
import { Chat } from "@/types";
import { useSelector } from "react-redux";
import { ChatItem } from "./ChatItem";

export function ChatList({
  chats,
  onClick,
}: {
  chats: Chat[];
  onClick: (chat: Chat) => void;
}) {
  const userData = useSelector((state: RootState) => selectUser(state));

  return chats.map((chat: Chat) => (
    <ChatItem
      key={chat._id}
      name={chat.user.name}
      email={chat.user.email}
      href="/images/profile.png"
      onClick={() => onClick(chat)}
    />
  ));
}
