import { z } from "zod";

export enum Level {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
}

export enum Status {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

export const courseSchema = z.object({
  title: z.string().min(3, "Must be at least 3 characters"),
  description: z.string().min(10, "Must be at least 10 characters"),
  level: z.nativeEnum(Level).default(Level.BEGINNER),
  status: z.nativeEnum(Status).default(Status.DRAFT),
  authorId: z.string(),
});

export type CourseRequest = z.infer<typeof courseSchema>;

export const generateCourseSchema = z.object({
  title: z.string().min(3, "Must be at least 3 characters"),
  authorId: z.string(),
});

export type GenerateCourseRequest = z.infer<typeof generateCourseSchema>;

export type Course = {
  id: string;
  title: string;
  description: string;
  authorId: string;
  status: Status;
  level: Level;
  createdAt: string;
  updatedAt: string;
  bgImageUrl: string;
  author: {
    id: string;
    fullName: string;
    avatarUrl: string;
    email: string;
  };
  Module: {
    id: string;
    title: string;
    Lesson: {
      id: string;
      title: string;
    }[];
  }[];
};

export type CoursesResponse = {
  count: number;
  data: Course[];
};

export type CreateCourseResponse = {
  success: boolean;
  data: {
    id: string;
  };
};

export type Lesson = {
  id: string;
  title: string;
};

export type Author = {
  id: string;
  email: string;
  role: string;
  fullName: string;
  avatarUrl: string | null;
};

export type Module = {
  id: string;
  title: string;
  Lesson: Lesson[];
};

export type CourseData = {
  Module: Module[];
  author: Author;
  authorId: string;
  createdAt: string;
  description: string;
  id: string;
  level: Level;
  status: Status;
  title: string;
  updatedAt: string;
  bgImageUrl: string;
};

export type CourseResponse = {
  success: boolean;
  data: CourseData;
};

export type GenerateCourseDescriptionRequest = {
  title: string;
  level: Level;
  words: number;
};

export type GenerateCourseDescriptionResponse = {
  success: boolean;
  data: {
    description: string;
  };
};
