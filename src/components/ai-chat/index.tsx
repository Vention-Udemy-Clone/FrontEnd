import useLessonChatMutation from "@/mutations/useLessonChatMutation";
import { ChatMessage } from "@/types/lessons.types";
import { Bot, Maximize2, Minimize2, Paperclip, SendHorizonal, Smile, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Loading } from "../Loading";
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTrigger } from "../ui/drawer";
import { Message } from "./Message";
import { NoMessages } from "./NoMessages";

export const AiChat = () => {
  const messageRef = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState(false);
  const [isFullScreen, setFullScreen] = useState(false);
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  const { lessonId } = useParams();
  const { mutate, isPending, data } = useLessonChatMutation(lessonId as string);

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!question || isPending) return;

    mutate(question);

    setQuestion("");
  };

  useEffect(() => {
    setChatHistory([]);
  }, [lessonId]);

  useEffect(() => {
    !isPending && setChatHistory(data?.history || []);
  }, [data, isPending]);

  //scrolling to last message
  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const toggleFullScreen = () => setFullScreen((prev) => !prev);
  return (
    <Drawer open={isOpen} onOpenChange={setOpen} direction="right">
      <DrawerTrigger
        className="fixed bottom-10 right-10 flex items-center justify-center gap-2 rounded border bg-muted px-4 py-3 shadow hover:bg-background"
        onClick={openModal}
      >
        <Bot />
      </DrawerTrigger>

      <DrawerContent
        className={`${isFullScreen ? "w-full rounded-none" : "rounded-none rounded-l-lg md:w-[50%]"} left-auto h-screen`}
      >
        <DrawerHeader className="flex justify-between border-b">
          {isFullScreen ? (
            <Minimize2
              onClick={toggleFullScreen}
              className="rotate-90 cursor-pointer text-gray-400"
            />
          ) : (
            <Maximize2
              onClick={toggleFullScreen}
              className="rotate-90 cursor-pointer text-gray-400"
            />
          )}

          <X onClick={closeModal} className=" cursor-pointer text-gray-400" />
        </DrawerHeader>

        <div className="relative h-[calc(100vh-113px)]">
          <div className="scrollbar-hide flex h-full flex-col gap-6 overflow-scroll p-4">
            {isPending && <Loading />}

            {!isPending && chatHistory.length === 0 && <NoMessages />}

            {chatHistory.map((message, index) => (
              <Message
                key={index}
                role={message.role}
                text={message.text}
                messageRef={messageRef}
              />
            ))}
          </div>
        </div>

        <DrawerFooter className="border-t">
          <div className="flex items-center gap-4 sm:gap-6">
            <Paperclip className="shrink-0 cursor-pointer text-xl text-gray-400 transition-colors sm:text-2xl" />

            <form id="chat-form" onSubmit={sendMessage} className="grow text-sm sm:text-base">
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                type="text"
                placeholder="Type your message here..."
                required
                className="w-full bg-background outline-none"
              />
            </form>

            <div className="flex shrink-0 items-center gap-4 text-xl sm:gap-6 sm:text-2xl">
              <Smile className="cursor-pointer text-gray-400 transition-colors" />
              <button disabled={isPending} form="chat-form" type="submit">
                <SendHorizonal className="cursor-pointer text-gray-400 transition-colors hover:text-primary" />
              </button>
            </div>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
