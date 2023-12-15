import { UsersToChatList } from "./UsersToChatList/UsersToChatList";
import { ChatList } from "./ChatList/ChatList";
import { ChatBox } from "./ChatBox/ChatBox";
import { useState } from "react";
import InputEmoji from "react-input-emoji";
import styles from "./ChatWidget.module.css";

export const ChatWidget = () => {
  const [selectedChatInfo, setSelectedChatInfo] = useState(null);

  return (
    <div className={styles.container}>
      <UsersToChatList />

      <div className={`${styles.content} gap-4 pb-7`}>
        <ChatList onClick={setSelectedChatInfo} />

        <ChatBox selectedChatInfo={selectedChatInfo} />
      </div>
    </div>
  );
};
