export type Lesson = {
  id: string;
  title: string;
  overview: string;
  content: string;
  moduleId: string;
  createdAt: string;
  updatedAt: string;
};

export type LessonResponse = {
  data: Lesson;
  count: number;
};
