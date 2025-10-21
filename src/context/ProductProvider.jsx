import { useEffect, useState } from "react";
import { ProductContext } from "./ProductContext";
import { useAuth } from "../contexts/AuthContext";
import Toast from "../components/Toast";
import { baseApi } from "../api/base";

const apiBaseUrl = (baseApi.defaults.baseURL || "/api").replace(/\/$/, "");
const apiPath = (path) => `${apiBaseUrl}/${path.replace(/^\//, "")}`;

export const ProductProvider = ({ children }) => {
  const [cartItem, setCartItems] = useState([]);
  const [toast, setToast] = useState(null);
  const { isAuthenticated, user } = useAuth();

  const fetchCartFromDB = async () => {
    try {
      console.log("🔍 Fetching cart from database...");
      const response = await fetch(apiPath("cart"), {
        method: "GET",
        credentials: "include",
      });

      console.log("📦 Cart fetch response status:", response.status);

      if (response.ok) {
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          console.error("❌ Cart response is not JSON:", contentType);
          return;
        }

        const data = await response.json();
        console.log("📦 Cart data received:", data);

        if (data.success && data.cart) {
          console.log("✅ Setting cart items:", data.cart);
          setCartItems(data.cart);
        } else {
          console.log("⚠️ Cart data missing or unsuccessful:", data);
        }
      } else {
        console.log("❌ Cart fetch failed with status:", response.status);
      }
    } catch (error) {
      console.error("❌ Error fetching cart:", error);
    }
  };

  // Fetch cart from database when user logs in
  useEffect(() => {
    console.log(
      "🔐 Auth status changed - isAuthenticated:",
      isAuthenticated,
      "user:",
      user
    );
    if (isAuthenticated && user) {
      fetchCartFromDB();
    } else {
      setCartItems([]);
    }
  }, [isAuthenticated, user]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const addToCart = async (product) => {
    try {
      const response = await fetch(apiPath("cart/add"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.status === 409) {
        // Product already in cart
        showToast("Product is already in your cart!", "warning");
        return { success: false, message: data.message };
      }

      if (response.ok && data.success) {
        // Add to local state
        setCartItems((prev) => [
          ...prev,
          {
            productId: product.id,
            quantity: 1,
            addedAt: new Date(),
            // Store full product details for display
            ...product,
          },
        ]);
        showToast("Added to cart successfully! ✓", "success");
        return { success: true };
      } else {
        showToast(data.message || "Failed to add to cart", "error");
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      showToast("Error adding to cart", "error");
      return { success: false, message: error.message };
    }
  };

  const removeFromCart = async (id) => {
    try {
      const response = await fetch(apiPath(`cart/remove/${id}`), {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        setCartItems((prev) =>
          prev.filter((item) => item.productId !== id && item.id !== id)
        );
        showToast("Removed from cart", "success");
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
      showToast("Error removing from cart", "error");
    }
  };

  const updateQuantity = async (id, newQuantity) => {
    try {
      if (newQuantity <= 0) {
        await removeFromCart(id);
        return;
      }

      const response = await fetch(apiPath("cart/update"), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: id, quantity: newQuantity }),
        credentials: "include",
      });

      if (response.ok) {
        setCartItems((prev) =>
          prev.map((item) =>
            item.productId === id || item.id === id
              ? { ...item, quantity: newQuantity }
              : item
          )
        );
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      showToast("Error updating quantity", "error");
    }
  };

  const clearCart = async () => {
    try {
      const response = await fetch(apiPath("cart/clear"), {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        setCartItems([]);
        showToast("Cart cleared", "success");
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      showToast("Error clearing cart", "error");
    }
  };

  return (
    <ProductContext.Provider
      value={{
        cartItem,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        fetchCartFromDB,
      }}
    >
      {children}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </ProductContext.Provider>
  );
};
