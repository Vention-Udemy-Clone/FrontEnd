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
  },
  lesson: {
    root: "/lessons",
    getOneLesson: (lessonId: string) => `/lessons/${lessonId}`,
    generateTexts: "/lessons/generate-texts",
  },
  module: {
    root: "/modules",
  },
} as const;
