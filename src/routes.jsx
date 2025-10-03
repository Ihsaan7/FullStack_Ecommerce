import { createBrowserRouter } from "react-router-dom";
import { homeRoute } from "./pages/Home";
import NavLayout from "./layout/NavLayout";

export const router = createBrowserRouter([
  {
    element: <NavLayout />,
    path: "/",
    children: [{ index: true, ...homeRoute }],
  },
]);
