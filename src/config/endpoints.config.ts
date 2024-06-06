export const ENDPOINTS = {
  auth: {
    signIn: "/auth",
  },
  user: {
    user: (userId: string | null) => `user/${userId}`,
  },
  course: {
    root: "/courses",
    listCourses: "/courses",
    getOneCourse: (courseId: string) => `/courses/${courseId}`,
    myCourses: (authorId: string) => `/courses/my-courses/${authorId}`,
    generateDescription: "/courses/generate-description",
    generateContent: "/courses/generate-content",
  },
  lesson: {
    root: "/lessons",
    getOneLesson: (lessonId: string) => `/lessons/${lessonId}`,
    generateTexts: "/lessons/generate-texts",
    getQuiz: (lessonId: string) => `/quiz/${lessonId}`,
    chat: (lessonId: string) => `lessons/${lessonId}/chat`,
  },
  note: {
    root: "/notes",
    listNotes: (lessonId: string) => `/notes/${lessonId}`,
    oneNote: (noteId: string) => `/notes/${noteId}`,
  },
  summary: {
    root: "summary",
    oneSummary: (summaryId: string) => `/summary/${summaryId}`,
    generateSummary: (lessonId: string) => `/summary/generate/${lessonId}`,
  },
  module: {
    root: "/modules",
  },
  learningPath: "/learning-path",
} as const;
