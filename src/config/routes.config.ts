export const ROUTES = {
  root: "/",
  course: {
    course: (id: string) => `/course/${id}`,
  },
} as const;
