import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { MainLayout } from "@/layouts/MainLayout";
import { Main } from "@/pages";
import { CoursePage } from "@/pages/course/CoursePage";
import { LearningPath } from "@/pages/learning-path";
import { MentorCourses } from "@/pages/MentorCourses";
import { MentorCoursePage } from "@/pages/MentorCourses/MentorCoursePage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [{ index: true, element: <Main /> }],
  },
  {
    path: "/course/:id",
    element: <MainLayout />,
    children: [{ index: true, element: <CoursePage /> }],
  },
  {
    path: "/course/:id/module/:moduleId/lesson/:lessonId",
    element: <MainLayout />,
    children: [{ index: true, element: <CoursePage /> }],
  },
  {
    path: "/learning-path",
    element: <MainLayout />,
    children: [{ index: true, element: <LearningPath /> }],
  },
  {
    path: "/my-courses",
    element: <MainLayout />,
    children: [
      { index: true, element: <MentorCourses /> },
      { path: ":id", element: <MentorCoursePage /> },
      { path: "create", element: <MentorCoursePage /> },
    ],
  },
]);

export function AppRoutes() {
  return <RouterProvider router={routes} />;
}
