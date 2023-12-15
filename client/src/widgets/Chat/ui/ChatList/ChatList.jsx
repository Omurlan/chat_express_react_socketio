import { useUser } from "entities/auth";
import { ChatCard, useChatList } from "entities/chat";

export const ChatList = (props) => {
  const { onClick } = props;

  const { user } = useUser();
  const { chats } = useChatList(user._id);

  return (
    <div className="flex flex-col gap-3">
      {chats &&
        chats.map(({ _id, members }) => (
          <ChatCard
            onClick={onClick}
            key={_id}
            chatId={_id}
            members={members}
            lastMessage="How you doing ?"
            lastDate="2023-12-13"
          />
        ))}
    </div>
  );
};
