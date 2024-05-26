import { Bot } from "lucide-react";

export const NoMessages = () => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-sm text-gray-500">
      <Bot size={"50px"} className="text-primary" />
      <p>Any questions about the lesson?</p>
      <p>Ask AI about it!</p>
    </div>
  );
};
