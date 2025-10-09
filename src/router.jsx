import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import { NavLayout } from "./layout/NavLayout";
import { recentLoader } from "./loader/recentLoader";
import { Store } from "./pages/Store";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RequireAuth from "./components/RequireAuth";
import Cart from "./pages/Cart";
import Detail from "./pages/Detail";
import ErrorBoundary from "./components/ErrorBoundary";

export const router = createBrowserRouter([
  // Public auth routes (no NavLayout)
  // Auth pages
  { path: "/", element: <Login /> },
  { path: "/login", element: <Login /> },
  {
    path: "/signup",
    element: <Signup />,
  },
  // App routes (wrapped with NavLayout)
  {
    element: (
      <RequireAuth>
        <NavLayout />
      </RequireAuth>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/home",
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
        element: <Cart />,
        loader: recentLoader,
        errorElement: <ErrorBoundary />,
      },
    ],
  },
]);
