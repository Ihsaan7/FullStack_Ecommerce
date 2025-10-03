import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/home/Hero";
import Products from "./components/home/Products";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Store from "./pages/Store";
import Cart from "./pages/Cart";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col justify-normal">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Products />
              </>
            }
          />
          <Route path="/store" element={<Store />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
