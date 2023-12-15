import { useUser } from "entities/auth";
import { ChatCard, useChatList } from "entities/chat";
import { UsersToChatList } from "./UsersToChatList/UsersToChatList";

export const ChatWidget = () => {
  const { user } = useUser();

  const { chats } = useChatList(user._id);

  return (
    <div>
      <UsersToChatList />

      <div className="max-w-[350px] flex flex-col gap-3">
        {chats &&
          chats.map(({ _id, members }) => (
            <ChatCard
              key={_id}
              members={members}
              lastMessage="How you doing ?"
              lastDate="2023-12-13"
            />
          ))}
      </div>
    </div>
  );
};
