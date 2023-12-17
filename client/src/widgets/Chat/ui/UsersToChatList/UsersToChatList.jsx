import { useUser } from "entities/auth";
import { UserToChatCard, useChatCreate, useUsersToChat } from "entities/chat";
import { useCallback } from "react";

export const UsersToChatList = () => {
  const { usersToChat } = useUsersToChat();

  const { chatCreate } = useChatCreate();

  const { user } = useUser();

  const handleClick = useCallback((recipientId) => {
    chatCreate(user._id, recipientId);
  }, []);

  return (
    <div className="flex gap-3">
      {usersToChat
        ? usersToChat.map(({ name, _id }) => (
            <UserToChatCard
              key={_id}
              onClick={handleClick}
              id={_id}
              name={name}
            />
          ))
        : null}
    </div>
  );
};
