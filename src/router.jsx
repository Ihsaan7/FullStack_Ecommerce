import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import { NavLayout } from "./layout/NavLayout";
import { recentLoader } from "./loader/recentLoader";
import { Store } from "./pages/Store";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Detail from "./pages/Detail";
import ErrorBoundary from "./components/ErrorBoundary";

export const router = createBrowserRouter([
  {
    element: <NavLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: recentLoader,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "store",
        element: <Store />,
        loader: recentLoader,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "store/:id",
        element: <Detail />,
        loader: recentLoader,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "cart",
        loader: recentLoader,
        errorElement: <ErrorBoundary />,
        children: [
          { index: true, element: <Cart /> },
          { path: ":id", element: <Cart />, loader: recentLoader },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);
