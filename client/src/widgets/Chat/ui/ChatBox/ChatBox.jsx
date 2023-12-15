import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Skeleton,
} from "@nextui-org/react";
import { useUser } from "entities/auth";
import { MessageCard, useChatCurrent } from "entities/chat";
import { useFindRecipient } from "entities/chat";
import { memo, useCallback, useEffect, useState } from "react";
import InputEmoji from "react-input-emoji";

export const ChatBox = memo(({ selectedChatInfo }) => {
  const {
    currentChat,
    messages,
    currentChatMessagesFetch,
    messageSend,
    isLoading,
  } = useChatCurrent();

  const { user } = useUser();

  useEffect(() => {
    if (selectedChatInfo && selectedChatInfo._id !== currentChat?._id) {
      currentChatMessagesFetch(selectedChatInfo);
    }
  }, [selectedChatInfo]);

  const recipient = useFindRecipient(currentChat?.members);

  const handleSendMessage = useCallback(
    (text) => {
      messageSend({
        chatId: currentChat._id,
        text,
        senderId: user._id,
      });
    },
    [currentChat, user]
  );

  if (isLoading) {
    return (
      <Card className="flex-1">
        <CardBody className="gap-3">
          <h2 className="font-medium text-center">{recipient?.name}</h2>
          {/* <Skeleton className="rounded-lg w-36">
            <div className="h-7 rounded-lg bg-default-300"></div>
          </Skeleton> */}
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
    <div className="flex flex-col w-3/5 gap-3">
      <Card>
        <CardHeader>
          <h2 className="font-medium text-center">{recipient?.name}</h2>
        </CardHeader>
        <Divider />
        <CardBody className="gap-3">
          {messages
            ? messages.map(({ text, _id, senderId }) => (
                <MessageCard
                  isMe={senderId == user?._id}
                  key={_id}
                  text={text}
                />
              ))
            : null}
        </CardBody>

        <CardFooter></CardFooter>
      </Card>

      <InputEmoji
        cleanOnEnter
        onEnter={handleSendMessage}
        placeholder="Type a message"
      />
    </div>
  );
});
