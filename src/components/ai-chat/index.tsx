import { useState } from "react";
import { Smile, Paperclip, SendHorizonal, X, Maximize2, Minimize2, Bot } from "lucide-react";
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTrigger } from "../ui/drawer";
import { Message } from "./Message";

export const AiChat = () => {
  const [isOpen, setOpen] = useState(false);
  const [isFullScreen, setFullScreen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const toggleFullScreen = () => setFullScreen((prev) => !prev);
  return (
    <Drawer open={isOpen} onOpenChange={setOpen} direction="right">
      <DrawerTrigger
        className="fixed bottom-10 right-10 flex items-center justify-center gap-2  rounded border bg-muted px-4 py-3 shadow"
        onClick={openModal}
      >
        <p>Ask AI</p>
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

        <div className="scrollbar-hide flex grow flex-col gap-6 overflow-scroll p-4">
          <Message owner={true} />
          <Message owner={false} />
          <Message owner={true} />
          <Message owner={false} />
        </div>

        <DrawerFooter className="border-t">
          <div className="flex items-center gap-4 sm:gap-6">
            <Paperclip className="shrink-0 cursor-pointer text-xl text-gray-400 transition-colors sm:text-2xl" />

            <form className="grow text-sm sm:text-base">
              <input
                type="text"
                placeholder="Type your message here..."
                required
                className="w-full bg-background outline-none"
              />
            </form>

            <div className="flex shrink-0 items-center gap-4 text-xl sm:gap-6 sm:text-2xl">
              <Smile className="cursor-pointer text-gray-400 transition-colors" />
              <SendHorizonal className="cursor-pointer text-primary transition-colors" />
            </div>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
