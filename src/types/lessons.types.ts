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

export type QuizData = {
  question: string;
  answer: string;
};

export type QuizResponse = {
  success: boolean;
  data: QuizDataResponse;
};

export type QuizDataResponse = {
  content: QuizData[];
  id: string;
  lessonId: string;
};

export type QuizCreateRequest = {
  questions: Question[];
};

export type Question = {
  question: string;
  answer: string;
};

export type ChatMessage = {
  role: "user" | "model";
  text: string;
};

export type ChatResponse = {
  success: boolean;
  history: ChatMessage[];
};
