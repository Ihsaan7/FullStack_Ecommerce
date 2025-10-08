import { useEffect, useState } from "react";
import { ProductContext } from "./ProductContext";

export const ProductProvider = ({ children }) => {
  // keep cart in memory only (no localStorage)
  const [cartItem, setCartItems] = useState([]);

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

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <ProductContext.Provider
      value={{ cartItem, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </ProductContext.Provider>
  );
};
