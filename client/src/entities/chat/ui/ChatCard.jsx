import { Avatar, Badge, Card, CardBody, CardHeader } from "@nextui-org/react";
import { memo } from "react";
import { useFindRecipient } from "../hooks/useFindRecipient";
import { useChatList } from "../hooks/useChatList";

export const ChatCard = memo((props) => {
  const { chatId, lastMessage, lastDate, members, unread, onClick } = props;

  const { onlineUsers } = useChatList();

  const recipient = useFindRecipient(members);
  const isOnline = onlineUsers.some((u) => u.userId === recipient?._id);

  const handleClick = () => {
    onClick({ _id: chatId, members });
  };

  return (
    <Card>
      <CardHeader onClick={handleClick} className="justify-between">
        <div className="flex gap-5">
          <Badge showOutline={false} size="sm" content={unread} color="danger">
            <Avatar
              isBordered
              radius="full"
              size="md"
              src="/avatars/avatar-1.png"
            />
          </Badge>

          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {recipient && recipient.name} {isOnline && "online"}
            </h4>
          </div>
        </div>

        <p className="text-xs text-slate-500 font-medium">{lastDate}</p>
      </CardHeader>

      <CardBody onClick={handleClick} className="pt-0">
        <p className="text-slate-700">{lastMessage}</p>
      </CardBody>
    </Card>
  );
});
