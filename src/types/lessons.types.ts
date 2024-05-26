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
  data: QuizData[];
};

export type ChatMessage = {
  role: "user" | "model";
  text: string;
};

export type ChatResponse = {
  success: boolean;
  history: ChatMessage[];
};
