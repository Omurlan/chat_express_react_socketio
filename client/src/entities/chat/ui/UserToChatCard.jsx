import { Avatar, Chip } from "@nextui-org/react";
import { memo, useCallback } from "react";

export const UserToChatCard = memo((props) => {
  const { name, id, onClick } = props;

  const handleClick = () => {
    onClick(id);
  };

  return (
    <Chip
      onClick={handleClick}
      as="button"
      className="cursor-pointer"
      variant="flat"
      color="primary"
      avatar={
        <Avatar
          name="JW"
          src="https://i.pravatar.cc/300?u=a042581f4e29026709d"
        />
      }
      size="lg"
    >
      {name}
    </Chip>
  );
});
