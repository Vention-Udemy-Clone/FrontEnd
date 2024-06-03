import { QueryClient } from "@tanstack/react-query";

const STALE_TIME = 60 * 1000 * 5;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export const QUERY_KEYS = {
  query: {
    user: "user",
    course: "course",
    lesson: "lesson",
    listCourses: "listCourses",
    quiz: "quiz",
    courses: {
      mycourse: "mycourse",
      myCourses: "my-courses",
    },
    lessons: {
      lesson: "mylesson",
    },
    learningPath: "learning-path",
  },
} as const;
