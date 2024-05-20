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

export type Course = {
  id: string;
  title: string;
  description: string;
  authorId: string;
  status: Status;
  level: Level;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    fullName: string;
    email: string;
  };
};

export type CoursesResponse = {
  data: Course[];
  count: number;
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
  level: string;
  status: string;
  title: string;
  updatedAt: string;
};

export type CourseResponse = {
  success: boolean;
  data: CourseData;
};
