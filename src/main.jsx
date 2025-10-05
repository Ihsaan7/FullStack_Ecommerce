import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { ProductProvider } from "./context/ProductProvider.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <ProductProvider>
        <RouterProvider router={router} />
      </ProductProvider>
    </ThemeProvider>
  </StrictMode>
);
