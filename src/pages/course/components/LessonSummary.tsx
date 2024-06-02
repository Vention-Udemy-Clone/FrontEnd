import Tiptap from "@/components/Tiptap";
import { Button } from "@/components/ui/button";
import useCreateSummaryMutation from "@/mutations/useCreateSummary";
import useDeleteSummaryMutation from "@/mutations/useDeleteSummary";
import useGenerateLessonSummary from "@/mutations/useGenerateLessonSummary";
import useUpdateSummaryMutation from "@/mutations/useUpdateSummary";
import { FileX2, SquarePen } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export const LessonSummary = ({
  summary,
}: {
  summary?: {
    id: string;
    lessonId: string;
    userId: string;
    summary: string;
  };
}) => {
  const [summaryText, setSummaryText] = useState("");
  const [isSummaryEditing, setIsSummaryEditing] = useState(false);
  const [isSummaryGenerating, setIsSummaryGenerating] = useState(false);

  const { lessonId } = useParams();

  const { mutate: createSummary } = useCreateSummaryMutation();
  const { mutate: updateSummary } = useUpdateSummaryMutation();
  const { mutate: deleteSummary } = useDeleteSummaryMutation();
  const { mutate: generateSummary } = useGenerateLessonSummary(lessonId as string);

  const handleSave = () => {
    createSummary({
      lessonId: lessonId as string,
      summary: summaryText,
    });
    setIsSummaryEditing(false);
  };

  const handleEdit = () => {
    if (!summary?.id) {
      handleSave();
      return;
    }

    updateSummary({
      summary: summaryText,
      lessonId: summary?.id,
    });

    setIsSummaryEditing(false);
  };

  const handleDelete = () => {
    deleteSummary({
      id: summary?.id as string,
    });
  };

  const handleGenerateSummary = () => {
    setIsSummaryEditing(true);
    setIsSummaryGenerating(true);

    generateSummary(
      {},
      {
        onSuccess: (data) => {
          setIsSummaryGenerating(false);
          setSummaryText(data);
        },
        onError: () => {
          setIsSummaryGenerating(false);
          setSummaryText("");
        },
      }
    );
  };

  return (
    <div className="mb-5">
      <div className="mb-2 flex items-center justify-between">
        <h3 className=" mr-5 text-sm font-bold text-primary">Summary:</h3>
        {summary && !isSummaryEditing ? (
          <div className="flex items-center justify-between gap-2 pr-3">
            <div
              className="cursor-pointer "
              onClick={() => {
                setIsSummaryEditing((prev) => !prev);
              }}
            >
              <SquarePen />
            </div>

            <div className="cursor-pointer " onClick={handleDelete}>
              <FileX2 />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-3">
            {isSummaryEditing && (
              <Button
                size={"sm"}
                variant={"destructive"}
                onClick={() => {
                  setIsSummaryEditing(false);
                }}
              >
                Cancel
              </Button>
            )}
            <Button
              size={"sm"}
              variant={"outline"}
              onClick={() => {
                handleGenerateSummary();
              }}
              disabled={isSummaryGenerating}
            >
              Generate by AI
            </Button>

            <Button disabled={isSummaryGenerating} size={"sm"} onClick={handleEdit}>
              {summary?.id ? "Update" : "Save"}
            </Button>
          </div>
        )}
      </div>

      {summary && !isSummaryEditing ? (
        <div
          className="mb-3 rounded-md text-sm"
          dangerouslySetInnerHTML={{ __html: summary.summary }}
        ></div>
      ) : (
        <div className="mb-3 rounded-md text-sm">
          <Tiptap
            content={
              isSummaryEditing
                ? isSummaryGenerating
                  ? "Loading..."
                  : summaryText || summary?.summary
                : ""
            }
            onChange={(data) => {
              setSummaryText(data);
            }}
            editable={true}
            placeholder={`${isSummaryGenerating ? "Loading..." : "Write a summary of the lesson"}`}
          />
        </div>
      )}
    </div>
  );
};
