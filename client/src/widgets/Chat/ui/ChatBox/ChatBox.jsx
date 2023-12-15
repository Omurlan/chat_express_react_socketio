import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Skeleton,
} from "@nextui-org/react";
import { useChatCurrent } from "entities/chat";
import { useFindRecipient } from "entities/chat";
import { memo, useEffect } from "react";

export const ChatBox = memo(({ selectedChatInfo }) => {
  const { currentChat, currentChatMessagesFetch, error, isLoading } =
    useChatCurrent();

  console.log("CUR", currentChat);

  useEffect(() => {
    if (selectedChatInfo) {
      currentChatMessagesFetch(selectedChatInfo);
    }
  }, [selectedChatInfo]);

  const recipient = useFindRecipient(currentChat?.members);

  if (isLoading) {
    return (
      <Card className="flex-1 h-full">
        <CardBody className="gap-3">
          <Skeleton className="rounded-lg w-36">
            <div className="h-7 rounded-lg bg-default-300"></div>
          </Skeleton>
          <div className="space-y-3">
            <Skeleton className="rounded-lg w-4/5">
              <div className="h-4 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="rounded-lg w-3/5">
              <div className="h-4 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="rounded-lg w-4/6 ">
              <div className="h-4 rounded-lg bg-default-300"></div>
            </Skeleton>
            <Skeleton className="rounded-lg w-4/5">
              <div className="h-4 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="rounded-lg w-3/5">
              <div className="h-4 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="rounded-lg w-4/6 ">
              <div className="h-4 rounded-lg bg-default-300"></div>
            </Skeleton>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="flex-1 h-full">
      <CardHeader>
        <h2 className="font-medium text-center">{recipient?.name}</h2>
      </CardHeader>
      <Divider />
      <CardBody>
        {currentChat?.messages
          ? currentChat.messages.map(() => <p>MESSAGE</p>)
          : null}
      </CardBody>
    </Card>
  );
});
