export const ENDPOINTS = {
  auth: {
    signIn: "/auth",
  },
  user: {
    user: (userId: string | null) => `user/${userId}`,
  },
  course: {
    listCourses: "/courses",
    getOneCourse: (courseId: string) => `/courses/${courseId}`,
  },
  lesson: {
    getOneLesson: (lessonId: string) => `/lessons/${lessonId}`,
  },
} as const;
