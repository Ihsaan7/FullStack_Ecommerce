import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import { NavLayout } from "./layout/NavLayout";
import { recentLoader } from "./loader/recentLoader";
import { Store } from "./pages/Store";
import Cart from "./pages/Cart";
import Detail from "./pages/Detail";

export const router = createBrowserRouter([
  {
    element: <NavLayout />,
    children: [
      { index: true, element: <Home />, loader: recentLoader },
      { path: "store", element: <Store />, loader: recentLoader },
      { path: "store/:id", element: <Detail />, loader: recentLoader },
      {
        path: "cart",
        loader: recentLoader,
        children: [
          { index: true, element: <Cart /> },
          { path: ":id", element: <Cart />, loader: recentLoader },
        ],
      },
    ],
  },
]);
