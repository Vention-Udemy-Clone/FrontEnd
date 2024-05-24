import { z } from "zod";

export const lessonSchema = z.object({
  title: z.string().min(3, "Must be at least 3 characters"),
  overview: z.string().min(3, "Must be at least 3 characters"),
  content: z.string().min(3, "Must be at least 3 characters"),
});

export type LessonRequest = z.infer<typeof lessonSchema>;

export type Lesson = {
  id: string;
  moduleId: string;
  title: string;
  overview: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type LessonResponse = {
  success: boolean;
  data: Lesson;
};
