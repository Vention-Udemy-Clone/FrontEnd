import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { BubbleContext } from "./BubbleContext";

type Props = {
  content?: string;
  editable?: boolean;
  placeholder?: string;
  className?: string;
  onChange: (htmlContent: string) => void;
};

const Tiptap = ({ content, editable, className, placeholder, onChange }: Props) => {
  const [cursorPosition, setCursorPosition] = useState<number>(0);

  const editor = useEditor({
    content,
    editable,
    onUpdate({ editor }) {
      setCursorPosition(editor.state.selection.anchor || 0);
      onChange(editor.getHTML());
    },
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          HTMLAttributes: {
            class: "list-disc pl-6",
          },
        },
      }),
      Underline,
      Placeholder.configure({ placeholder }),
    ],
    editorProps: {
      attributes: {
        class: cn(
          "min-h-40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border rounded p-2",
          className
        ),
      },
    },
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(content || "");
      editor.chain().focus().setTextSelection(cursorPosition).run();
    }
  }, [content, editor]);

  if (!editor) return null;

  return (
    <div>
      <EditorContent editor={editor} />
      <BubbleMenu editor={editor} children={<BubbleContext editor={editor} />} />
    </div>
  );
};

export default Tiptap;
