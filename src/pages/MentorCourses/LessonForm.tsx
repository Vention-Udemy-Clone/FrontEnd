import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Tiptap from "@/components/Tiptap";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useGenerateLessonTexts from "@/mutations/useGenerateLessonTexts";
import { useCreateLesson } from "@/services/lessons/useCreateLesson";
import { useDeleteLesson } from "@/services/lessons/useDeleteLesson";
import { useUpdateLesson } from "@/services/lessons/useUpdateLesson";
import {
  GenerateLessonTextsResponse,
  Lesson,
  LessonContext,
  LessonRequest,
  lessonSchema,
} from "@/types/lesson.types";
import { toast } from "sonner";
import { InputForm } from "./InputForm";

type Props = {
  moduleId: string;
  lessonId?: string;
  lessonData?: Lesson;
  lessonCreation: boolean;
  setLessonId: (value: string) => void;
  setLessonCreation: (value: boolean) => void;
  // setLessonEdit?: (value: string) => void;
};

export const LessonForm = ({
  moduleId,
  lessonId,
  lessonData,
  setLessonId,
  lessonCreation,
  setLessonCreation,
}: Props) => {
  const [isOverviewLoading, setIsOverviewLoading] = useState(false);
  const [isContentLoading, setIsContentLoading] = useState(false);
  const [isAiOverviewGenerationOpen, setIsAiOverviewGenerationOpen] = useState(false);
  const [isAiContentGenerationOpen, setIsAiContentGenerationOpen] = useState(false);

  const { mutate: overviewMutate } = useGenerateLessonTexts();
  const { mutate: contentMutate } = useGenerateLessonTexts();

  const { createLesson } = useCreateLesson(moduleId);
  const { updateLesson } = useUpdateLesson();
  const { deleteLesson } = useDeleteLesson();
  const [lesson, setLesson] = useState<Lesson | undefined>(undefined);

  const form = useForm<LessonRequest>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      title: lesson?.title || "",
      content: lesson?.content || "",
      overview: lesson?.overview || "",
    },
    values: lesson,
  });

  const handleCancel = () => {
    setLessonCreation(false);
    form.reset();
  };

  const handleDeleteLesson = () => {
    deleteLesson(lessonId as string);
    setLesson(undefined);
    setLessonId("");
  };

  const onSubmit = (data: LessonRequest) => {
    if (lessonId) {
      updateLesson({ ...data, id: lessonId });
    } else {
      createLesson(data, {
        onSuccess(res) {
          setLesson(res.data.data);
          setLessonCreation(false);
        },
      });
    }
  };

  useEffect(() => {
    if (!lessonCreation && lessonData) {
      setLesson(lessonData);
    } else {
      setLesson(undefined);
      form.reset({
        title: "",
        content: "",
        overview: "",
      });
    }
  }, [lessonData, lessonCreation]);

  const handleAiGeneration = (contextEnum: LessonContext, data: { words: string }) => {
    const context = contextEnum === LessonContext.OVERVIEW ? "overview" : "content";
    const setLoadingState = context === "overview" ? setIsOverviewLoading : setIsContentLoading;
    const mutateFn = context === "overview" ? overviewMutate : contentMutate;

    if (!form.getValues("title")) {
      form.setError("title", {
        message: "Please provide title first",
        type: "validate",
      });
      form.setFocus("title");
      return;
    }

    setLoadingState(true);
    form.setValue(context, "Loading...");
    form.clearErrors("title");

    const mutateOptions = {
      onSuccess: (data: GenerateLessonTextsResponse) => {
        setLoadingState(false);
        form.setValue(context, data.data.text);
      },
      onError: () => {
        toast.error("Failed to generate description");
        form.setValue(context, "");
        setLoadingState(false);
      },
    };

    mutateFn(
      {
        title: form.getValues("title"),
        context: contextEnum,
        words: +data.words || 50,
      },
      mutateOptions
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col space-y-3">
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lesson Title</FormLabel>
              <FormControl>
                <Input autoFocus {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="overview"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Lesson Overview</FormLabel>

                <InputForm
                  loading={isOverviewLoading}
                  open={isAiOverviewGenerationOpen}
                  setIsAiGenerationOpen={setIsAiOverviewGenerationOpen}
                  onSubmit={handleAiGeneration.bind(null, LessonContext.OVERVIEW)}
                  onCancel={() => {
                    setIsAiOverviewGenerationOpen(false);
                  }}
                  onClear={() => {
                    form.setValue("overview", "");
                  }}
                />
              </div>
              <FormControl>
                <Tiptap
                  content={field.value}
                  onChange={field.onChange}
                  editable={!isOverviewLoading}
                  placeholder="Write a brief overview of the lesson"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="content"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Lesson Content</FormLabel>

                <InputForm
                  loading={isContentLoading}
                  open={isAiContentGenerationOpen}
                  setIsAiGenerationOpen={setIsAiContentGenerationOpen}
                  onSubmit={handleAiGeneration.bind(null, LessonContext.CONTENT)}
                  onCancel={() => {
                    setIsAiContentGenerationOpen(false);
                  }}
                  onClear={() => {
                    form.setValue("content", "");
                  }}
                />
              </div>
              <FormControl>
                <Tiptap
                  content={field.value}
                  onChange={field.onChange}
                  editable={!isContentLoading}
                  placeholder="Write the content of the lesson"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between gap-1">
          <div className="space-x-2">
            <Button type="submit">{lessonId ? "Update" : "Create"}</Button>
            {!lessonId && (
              <Button type="button" variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
            )}
          </div>
          <div>
            {lessonId && (
              <Button type="button" variant="destructive" onClick={handleDeleteLesson}>
                Delete
              </Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
};
