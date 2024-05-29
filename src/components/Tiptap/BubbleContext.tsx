import {
  FontBoldIcon,
  FontItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "@radix-ui/react-icons";
import { Editor } from "@tiptap/react";

type props = {
  editor: Editor;
};

export const BubbleContext = ({ editor }: props) => {
  return (
    <div className="z-10 flex gap-0.5 rounded border bg-background p-0.5">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`${editor.isActive("bold") ? "bg-accent" : ""} rounded p-1 hover:bg-accent`}
      >
        <FontBoldIcon className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`${editor.isActive("italic") ? "bg-accent" : ""} rounded p-1 hover:bg-accent`}
      >
        <FontItalicIcon className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={`${editor.isActive("underline") ? "bg-accent" : ""} rounded p-1 hover:bg-accent`}
      >
        <UnderlineIcon className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`${editor.isActive("strike") ? "bg-accent" : ""} rounded p-1 hover:bg-accent`}
      >
        <StrikethroughIcon className="h-5 w-5" />
      </button>
    </div>
  );
};
