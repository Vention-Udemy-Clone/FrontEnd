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
