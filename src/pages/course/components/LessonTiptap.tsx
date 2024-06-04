import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import useCreateNoteMutation from "@/mutations/useCreateNoteMutation";
import useDeleteNoteMutation from "@/mutations/useDeleteNoteMutation";
import useUpdateNoteMutation from "@/mutations/useUpdateNoteMutation";
import useGetNotesQuery from "@/queries/note/useGetNotesQuery";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Mark } from "@tiptap/core";
import TextStyle from "@tiptap/extension-text-style";
import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ChevronLeft, Eraser, Highlighter, NotebookPen, PencilLine, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const HighlightMark = Mark.create({
  name: "highlight",
  keepOnSplit: false,
  priority: 1001,

  addAttributes() {
    return {
      class: {
        default: null,
        parseHTML: (element) => element.getAttribute("class"),
        renderHTML: (attributes) => {
          if (!attributes.class) {
            return {};
          }
          return { class: attributes.class };
        },
      },
      noteText: {
        default: null,
        parseHTML: (element) => element.getAttribute("class"),
        renderHTML: (attributes) => {
          if (!attributes.noteText) {
            return {};
          }
          return { "data-note-text": attributes.noteText || "" };
        },
      },
      id: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-id"),
        renderHTML: (attributes) => {
          if (!attributes.id) {
            return {};
          }
          return { "data-id": attributes.id || "" };
        },
      },
      from: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-from"),
        renderHTML: (attributes) => {
          if (!attributes.from) {
            return {};
          }
          return { "data-from": attributes.from || "" };
        },
      },
      to: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-to"),
        renderHTML: (attributes) => {
          if (!attributes.to) {
            return {};
          }
          return { "data-to": attributes.to || "" };
        },
      },
    };
  },
  parseHTML() {
    return [{ tag: "div[class]" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["div", HTMLAttributes, 0];
  },
});

const extensions = [
  TextStyle.configure({}),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),

  HighlightMark,
];

const MAX_CHARACTERS = 256;

export const FinalTiptap = ({ lesson, userId }: { lesson: string; userId?: string }) => {
  const [showNotes, setShowNotes] = useState(true);
  const [clickedPosition, setClickedPosition] = useState<{ x: number; y: number } | null>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const [noteText, setNoteText] = useState<string | null>(null);
  const [noteCreationText, setNoteCreationText] = useState("");
  const [clickedNoteId, setClickedNoteId] = useState<string>("");
  const [showBubbleMenu, setShowBubbleMenu] = useState(false);
  const [isNoteEditing, setIsNoteEditing] = useState(false);

  const remainingCharacters = MAX_CHARACTERS - noteCreationText.length;
  const { lessonId } = useParams();

  const { data, isLoading } = useGetNotesQuery(lessonId as string, userId);

  const editor = useEditor({
    extensions,
    content: lesson,
    editable: false,
  });

  useEffect(() => {
    if (!editor) {
      return;
    }
    if (data?.length === 0 || !data) {
      return;
    }

    if (!showNotes) {
      for (let i = 0; i < data.length; i++) {
        const note = data[i];
        editor.commands.setTextSelection({ from: +note.from, to: +note.to });
        editor.chain().focus().unsetMark("highlight").run();
      }
      editor.commands.setTextSelection(0);

      return;
    }

    for (let i = 0; i < data.length; i++) {
      const note = data[i];
      editor.commands.setTextSelection({ from: +note.from, to: +note.to });
      editor
        .chain()
        .focus()
        .setMark("highlight", {
          noteText: note.note,
          id: note.id,
          class: `${note.note ? "underline hover:bg-[#5553ff3d] hover:dark:bg-[#782168ab] " : "bg-[#fef9c3] dark:bg-[#32ff0952] "}   cursor-pointer  inline hover:no-underline relative transition-all highlight decoration-[#5553ff7a] dark:decoration-[#782168] underline-offset-4 decoration-[1.5px] }`,
          from: note.from,
          to: note.to,
        })
        .run();
    }

    editor.commands.setTextSelection(0);
  }, [editor, data, showNotes]);

  const handleMouseEnter = (e: Event) => {
    e.preventDefault();
    const target = e.target as HTMLElement;

    const id = target.getAttribute("data-id");

    if (target.classList.contains("highlight") && target.getAttribute("data-note-text")) {
      const elems = document.querySelectorAll(`.highlight[data-id = ${id}]`);

      if (elems) {
        elems.forEach((el) => {
          el.classList.add("bg-[#5553ff3d]", "no-underline", "dark:bg-[#782168ab]");
        });
      }
    }
  };

  const handleMouseLeave = (e: Event) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("highlight") && target.getAttribute("data-note-text")) {
      const elems = document.querySelectorAll(
        `.highlight[data-id = ${target.getAttribute("data-id")}]`
      );

      if (elems) {
        elems.forEach((el) => {
          el.classList.remove("bg-[#5553ff3d]", "no-underline", "dark:bg-[#782168ab]");
        });
      }
    }
  };

  const handleMouseClick = (e: Event) => {
    const target = e.target as HTMLElement;
    setClickedNoteId(target.getAttribute("data-id") || "");
    setIsNoteEditing(false);
    setNoteCreationText("");
    if (target.classList.contains("highlight")) {
      const parentRect = parentRef.current?.getBoundingClientRect();
      if (parentRect && event) {
        const clickedX = (event as MouseEvent).clientX - parentRect.left;
        const maxX = parentRect.width - (window.innerWidth < 500 ? 250 : 450);
        const x = Math.max(0, Math.min(maxX, clickedX));
        setClickedPosition({
          x,
          y: (event as MouseEvent).clientY - parentRect.top,
        });

        if (!target.getAttribute("data-note-text")) {
          setNoteText("");
          const maxX = parentRect.width - 50;
          const x = Math.max(0, Math.min(maxX, clickedX));
          setClickedPosition({
            x,
            y: (event as MouseEvent).clientY - parentRect.top,
          });
          return;
        }
        setNoteText(target.getAttribute("data-note-text") || null);
      }
    }
  };

  useEffect(() => {
    const elem = document.querySelectorAll(".highlight");

    elem?.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
      el.addEventListener("click", handleMouseClick);
    });
  }, [editor, data, showNotes]);

  const { mutate } = useCreateNoteMutation();
  const { mutate: updateNote } = useUpdateNoteMutation();
  const { mutate: deleteNote } = useDeleteNoteMutation();

  if (!editor) {
    return null;
  }

  const createNote = (createNote: boolean) => {
    const { view, state } = editor;
    const { from, to } = view.state.selection;

    const text = state.doc.textBetween(from, to, " ");

    if (!lessonId) return;
    mutate(
      {
        note: createNote ? noteCreationText || "" : "",
        originalText: text,
        from: from.toString(),
        to: to.toString(),
        lessonId: lessonId,
      },
      {
        onSuccess: () => {
          setNoteCreationText("");
          toast.success("Note added successfully");
        },
      }
    );
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setClickedPosition(null);
        setNoteCreationText("");
        setShowBubbleMenu(false);
      }}
    >
      <div
        className=" underline-offset-3 font-mon2 relative mb-5 whitespace-pre-wrap rounded-xl  text-sm text-gray-900 decoration-[#0fd9ffba4]  dark:text-gray-200"
        ref={parentRef}
      >
        {userId && (
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-bold text-primary">Content:</h3>

            <div
              className="cursor-pointer px-3"
              onClick={() => {
                setShowNotes((prev) => !prev);
              }}
            >
              {showNotes ? (
                <Eraser className="text-gray-500" size={20} strokeWidth={2} />
              ) : (
                <Highlighter className="text-gray-500" size={20} />
              )}
            </div>
          </div>
        )}
        <EditorContent
          className="whitespace-pre-wrap"
          editor={editor}
          onClick={(e) => {
            const target = e.target as Element;
            if (!target.classList.contains("highlight")) {
              setClickedPosition(null);
              setNoteCreationText("");
              setShowBubbleMenu(false);
            }
          }}
        />

        <BubbleMenu
          children={
            userId ? (
              <div className="flex items-center gap-1 rounded ">
                {!showBubbleMenu && (
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    onClick={() => {
                      createNote(false);
                    }}
                  >
                    <Highlighter strokeWidth={1.5} />
                  </Button>
                )}

                <Popover>
                  <PopoverTrigger>
                    {!showBubbleMenu && (
                      <Button
                        variant={"ghost"}
                        size={"icon"}
                        className="p-0"
                        onClick={() => {
                          setShowBubbleMenu(true);
                        }}
                      >
                        <NotebookPen strokeWidth={1.5} size={24} />
                      </Button>
                    )}
                    {null}
                  </PopoverTrigger>
                  <PopoverContent className="p-2">
                    <div className="max-w-[466px] rounded-xl border bg-background p-2">
                      <Textarea
                        rows={noteCreationText.length / 35}
                        className="mb-2 w-[450px] max-[520px]:w-[250px]"
                        placeholder="Add note here..."
                        value={noteCreationText || ""}
                        onChange={(e) => {
                          setNoteCreationText(e.target.value);
                        }}
                        autoFocus
                        maxLength={MAX_CHARACTERS}
                      ></Textarea>

                      <div className="flex items-center justify-between gap-4 text-sm text-foreground">
                        {remainingCharacters >= 0
                          ? `${remainingCharacters} characters left`
                          : "Maximum characters exceeded"}

                        <Button
                          className="h-7"
                          onClick={() => {
                            createNote(true);
                          }}
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            ) : null
          }
          className={`${showNotes ? "" : "hidden "}max-w-[466px] rounded border bg-background p-0.5 shadow-lg`}
          shouldShow={({ state }) => {
            const hasSelection = !state.selection.empty;

            let show: boolean = true;
            const selection = state.selection;
            state.doc.nodesBetween(selection.from, selection.to, (node) => {
              if (
                node.type.name === "text" &&
                node.marks.some((mark) => mark.type.name === "highlight")
              ) {
                show = false;
              }
            });

            return hasSelection && show;
          }}
          editor={editor}
        />

        {clickedPosition && (
          <div
            className="absolute z-50 max-w-[466px] rounded-lg border bg-background shadow-lg"
            style={{
              left: clickedPosition.x + "px",
              top: clickedPosition.y + 20 + "px",
            }}
          >
            {noteText !== "" ? (
              <>
                <div className="mb-1 flex h-7 items-center justify-between gap-10 px-2 pt-2">
                  <Button
                    variant={"ghost"}
                    className=" h-7 p-0 text-primary hover:bg-background"
                    onClick={() => {
                      setClickedPosition(null);
                    }}
                  >
                    <ChevronLeft />
                  </Button>
                  {!isNoteEditing && (
                    <div className="flex h-7 gap-1">
                      <Button
                        variant={"ghost"}
                        className=" h-7 w-7 rounded-full p-0 hover:bg-background "
                        onClick={() => {
                          setNoteCreationText(noteText || "");
                          setIsNoteEditing(true);
                        }}
                      >
                        <PencilLine className="m-auto" size={20} />
                      </Button>
                      <Button
                        variant={"ghost"}
                        className="h-7 w-7 rounded-full  p-0 hover:bg-background"
                        onClick={() => {
                          if (!lessonId) return;
                          deleteNote(
                            {
                              id: clickedNoteId,
                            },
                            {
                              onSuccess: (data) => {
                                editor.commands.setTextSelection({
                                  from: +data.data.from,
                                  to: +data.data.to,
                                });

                                editor.chain().focus().unsetMark("highlight").run();

                                setClickedPosition(null);
                                setClickedNoteId("");
                                toast.success("Note deleted successfully");
                              },
                            }
                          );
                        }}
                      >
                        <Trash2 className="m-auto" size={20} />
                      </Button>
                    </div>
                  )}
                </div>
                <Separator className="mb-2" />
              </>
            ) : (
              <div className="p-0.5">
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="h-7 w-10 p-0 hover:bg-background "
                  onClick={() => {
                    if (!lessonId) return;
                    deleteNote(
                      {
                        id: clickedNoteId,
                      },
                      {
                        onSuccess: (data) => {
                          editor.commands.setTextSelection({
                            from: +data.data.from,
                            to: +data.data.to,
                          });

                          editor.chain().focus().unsetMark("highlight").run();

                          setClickedPosition(null);
                          setClickedNoteId("");
                          toast.success("Note deleted successfully");
                        },
                      }
                    );
                  }}
                >
                  <Eraser className="m-auto" />
                </Button>
              </div>
            )}

            {isNoteEditing ? (
              <div className=" max-w-[466px] px-2 pb-2">
                <Textarea
                  rows={noteCreationText.length / 35}
                  className="mb-2 w-[450px] max-[520px]:w-[250px]"
                  placeholder="Add note here..."
                  value={noteCreationText || ""}
                  onChange={(e) => {
                    setNoteCreationText(e.target.value);
                  }}
                  autoFocus
                  maxLength={MAX_CHARACTERS}
                ></Textarea>

                <div className="flex justify-between text-sm text-foreground">
                  {remainingCharacters >= 0
                    ? `${remainingCharacters} characters left`
                    : "Maximum characters exceeded"}

                  <Button
                    className="h-7"
                    onClick={() => {
                      if (!lessonId) return;
                      updateNote(
                        {
                          note: noteCreationText || "",
                          id: clickedNoteId,
                        },
                        {
                          onSuccess: () => {
                            setNoteCreationText("");
                            setClickedPosition(null);
                            setClickedNoteId("");
                            toast.success("Note updated successfully");
                          },
                        }
                      );
                    }}
                  >
                    Update
                  </Button>
                </div>
              </div>
            ) : (
              <div className="px-3 pb-3 pt-1">
                {noteText && <div className="text-sm text-foreground">{noteText}</div>}
              </div>
            )}
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
};
