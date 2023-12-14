import { useUser } from "entities/auth";
import { ChatCard, useChat } from "entities/chat";

export const ChatWidget = () => {
  const { user } = useUser();

  const { chats, error, isLoading } = useChat(user._id);

  return (
    <div className="max-w-[350px]">
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
  );
};
