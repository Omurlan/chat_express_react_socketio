import { memo } from "react";

import calendar from "dayjs/plugin/calendar";
import dayjs from "dayjs";

dayjs.extend(calendar);

export const MessageCard = memo((props) => {
  const { text, date, isMe } = props;

  console.log(isMe);

  const bg = isMe ? "bg-lime-100" : "bg-default-200";
  const align = isMe ? "ml-auto" : "auto";

  return (
    <div className={`w-fit ${bg} rounded-lg px-3 py-1 ${align}`}>
      <p>{text}</p>
      <time className="text-xs font-medium text-slate-600">
        {dayjs(date).calendar()}
      </time>
    </div>
  );
});
