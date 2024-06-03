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
    generateCourse: "/courses/generate-course",
  },
  lesson: {
    root: "/lessons",
    getOneLesson: (lessonId: string) => `/lessons/${lessonId}`,
    generateTexts: "/lessons/generate-texts",
    getQuiz: (lessonId: string) => `/quiz/${lessonId}`,
    chat: (lessonId: string) => `lessons/${lessonId}/chat`,
  },
  module: {
    root: "/modules",
  },
  learningPath: "/learning-path",
} as const;
