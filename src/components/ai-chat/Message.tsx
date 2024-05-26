import { ChatMessage } from "@/types/lessons.types";

type MessageProps = {
  messageRef?: React.RefObject<HTMLDivElement>;
} & ChatMessage;

export const Message = ({ role, text, messageRef }: MessageProps) => {
  const owner = role === "user";
  return (
    <div
      ref={messageRef}
      className={`flex items-end gap-3 ${owner ? "flex-row-reverse" : "flex-row"}`}
    >
      <div
        className={`${
          owner
            ? "w-[85%] max-w-[650px] rounded-l-lg rounded-t-lg bg-primary text-white"
            : "w-full  max-w-[900px] rounded-r-lg rounded-t-lg bg-muted"
        }  overflow-hidden break-words px-4 py-2`}
      >
        <p>{text}</p>
      </div>
    </div>
  );
};
