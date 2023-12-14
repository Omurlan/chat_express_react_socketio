import { Avatar, Badge, Card, CardBody, CardHeader } from "@nextui-org/react";
import { memo } from "react";
import { useFindRecipient } from "../hooks/useFindRecipient";

export const ChatCard = memo((props) => {
  const { lastMessage, lastDate, members, unread } = props;

  const recipient = useFindRecipient(members);

  return (
    <Card>
      <CardHeader className="justify-between">
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
              {recipient && recipient.name}
            </h4>
          </div>
        </div>

        <p className="text-xs text-slate-500 font-medium">{lastDate}</p>
      </CardHeader>

      <CardBody className="pt-0">
        <p className="text-slate-700">{lastMessage}</p>
      </CardBody>
    </Card>
  );
});
