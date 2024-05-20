import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { MainLayout } from "@/layouts/MainLayout";
import { Main } from "@/pages";
import { CoursePage } from "@/pages/course/CoursePage";

const routes = createBrowserRouter([
  //public routes
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
]);

export function AppRoutes() {
  return <RouterProvider router={routes} />;
}
