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

export enum LessonContext {
  "OVERVIEW" = "OVERVIEW",
  "CONTENT" = "CONTENT",
  "QUIZ" = "QUIZ",
}

export type GenerateLessonTextsRequest = {
  title: string;
  words: number;
  context: LessonContext;
};

export type GenerateLessonTextsResponse = {
  success: boolean;
  data: {
    text: string;
  };
};

export type NoteCreateRequest = {
  note: string;
  originalText: string;
  from: string;
  to: string;
  lessonId: string;
};

export type NoteDeleteRequest = {
  id: string;
};

export type NoteUpdateRequest = {
  id: string;
  note: string;
};

export type Note = {
  id: string;
  note: string;
  originalText: string;
  from: string;
  to: string;
  lessonId: string;
};

export type NoteCreateResponse = {
  success: boolean;
  data: Note;
};

export type GetNotesResponse = {
  success: boolean;
  data: Note[];
};
