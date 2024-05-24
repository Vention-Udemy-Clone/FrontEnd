import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

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
import { Textarea } from "@/components/ui/textarea";
import { useCreateLesson } from "@/services/lessons/useCreateLesson";
import { useDeleteLesson } from "@/services/lessons/useDeleteLesson";
import { useUpdateLesson } from "@/services/lessons/useUpdateLesson";
import { Lesson, LessonRequest, lessonSchema } from "@/types/lesson.types";

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
              <FormLabel>Lesson Overview</FormLabel>
              <FormControl>
                <Textarea rows={4} {...field} />
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
              <FormLabel>Lesson Content</FormLabel>
              <FormControl>
                <Textarea rows={8} {...field} />
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
