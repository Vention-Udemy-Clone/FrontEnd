import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { MainLayout } from "@/layouts/MainLayout";
import { Main } from "@/pages";

const routes = createBrowserRouter([
  //public routes
  {
    path: "/",
    element: <MainLayout />,
    children: [{ index: true, element: <Main /> }],
  },
]);

export function AppRoutes() {
  return <RouterProvider router={routes} />;
}
