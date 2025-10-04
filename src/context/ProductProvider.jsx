import { useEffect, useState } from "react";
import { ProductContext } from "./ProductContext";

export const ProductProvider = ({ children }) => {
  const [cartItem, setCartItems] = useState(() => {
    const storage = localStorage.getItem("cart");
    return storage ? JSON.parse(storage) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItem));
  }, [cartItem]);

  const addToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <ProductContext.Provider value={{ cartItem, addToCart, removeFromCart }}>
      {children}
    </ProductContext.Provider>
  );
};
