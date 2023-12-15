import { UsersToChatList } from "./UsersToChatList/UsersToChatList";
import { ChatList } from "./ChatList/ChatList";
import { ChatBox } from "./ChatBox/ChatBox";
import { useState } from "react";

export const ChatWidget = () => {
  const [selectedChatInfo, setSelectedChatInfo] = useState(null);

  return (
    <div>
      <UsersToChatList />

      <div className="flex gap-10">
        <ChatList onClick={setSelectedChatInfo} />

        <ChatBox selectedChatInfo={selectedChatInfo} />
      </div>
    </div>
  );
};
