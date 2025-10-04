import { useEffect, useState } from "react";
import { ProductContext } from "./ProductContext";

export const ProductProvider = ({ children }) => {
  const [cartItem, setCartItems] = useState(() => {
    try {
      const storage = localStorage.getItem("cart");
      return storage ? JSON.parse(storage) : [];
    } catch (error) {
      console.error("Error reading cart from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cartItem));
      console.log("Cart saved to localStorage:", cartItem);
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cartItem]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      // Check if product already exists in cart
      const existingIndex = prev.findIndex((item) => item.id === product.id);

      if (existingIndex !== -1) {
        // Product exists, increment quantity
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: (updated[existingIndex].quantity || 1) + 1,
        };
        return updated;
      }

      // Product doesn't exist, add it
      return [...prev, { ...product, quantity: product.quantity || 1 }];
    });
  };
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <ProductContext.Provider
      value={{ cartItem, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </ProductContext.Provider>
  );
};
