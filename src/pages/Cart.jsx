import React, { useContext, useState, useEffect } from "react";
import { ProductContext } from "../context/ProductContext";
import { useLoaderData, useParams, Link } from "react-router-dom";
import CartCard from "../component/cart/CartCard";
import { useTheme } from "../context/ThemeContext";
import {
  FaShoppingCart,
  FaArrowLeft,
  FaTrash,
  FaCreditCard,
  FaTruck,
} from "react-icons/fa";
import Container from "../layout/Container";
import axios from "axios";

const Cart = () => {
  const {
    cartItem,
    removeFromCart,
    updateQuantity,
    clearCart,
    fetchCartFromDB,
  } = useContext(ProductContext);
  const allProducts = useLoaderData();
  const { theme } = useTheme();
  const { id: routeId } = useParams();
  const [cartWithDetails, setCartWithDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCheckoutPopup, setShowCheckoutPopup] = useState(false);

  // Fetch cart from DB on mount
  useEffect(() => {
    const loadCart = async () => {
      console.log("🛒 Cart page mounted, fetching cart...");
      setIsLoading(true);
      await fetchCartFromDB();
      setIsLoading(false);
    };
    loadCart();
  }, []);

  // Merge cart items with product details
  useEffect(() => {
    if (
      cartItem &&
      cartItem.length > 0 &&
      allProducts &&
      allProducts.length > 0
    ) {
      const invalidProductIds = [];

      const enrichedCart = cartItem
        .map((cartEntry) => {
          const productId = cartEntry.productId || cartEntry.id;
          const productDetails = allProducts.find(
            (p) => String(p.id) === String(productId)
          );

          if (!productDetails) {
            invalidProductIds.push(productId);
            return null;
          }

          return {
            ...productDetails,
            ...cartEntry,
            id: productId,
            quantity: cartEntry.quantity || 1,
          };
        })
        .filter(Boolean);

      setCartWithDetails(enrichedCart);

      if (invalidProductIds.length > 0) {
        invalidProductIds.forEach((productId) => {
          removeFromCart(productId);
        });
      }
    } else {
      setCartWithDetails([]);
    }
  }, [cartItem, allProducts]);

  // Calculate totals
  const subtotal = cartWithDetails.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 50 ? 0 : 9.99; // Free shipping over $50
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white/5 to-gray-100/10 dark:from-black/10 dark:to-gray-900/20 transition-all duration-500 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading your cart...
          </p>
        </div>
      </div>
    );
  }

  // Empty cart state
  if (!cartWithDetails || cartWithDetails.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white/5 to-gray-100/10 dark:from-black/10 dark:to-gray-900/20 transition-all duration-500">
        <Container className="py-6">
          {/* Navigation */}
          <Link
            to="/store"
            className="inline-flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 mb-8 px-3 py-1.5 border border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 sm:border-0 sm:px-0 sm:py-0 sm:text-base sm:gap-2"
          >
            <FaArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>

          {/* Empty Cart */}
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="w-32 h-32 bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-blue-500/30 flex items-center justify-center mb-8">
              <FaShoppingCart className="w-16 h-16 text-gray-400 dark:text-gray-600" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg max-w-md">
              Looks like you haven't added any items to your cart yet. Start
              shopping to fill it up!
            </p>
            <Link
              to="/store"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-slate-800 text-white font-semibold hover:from-blue-700 hover:to-slate-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Start Shopping
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white/5 to-gray-100/10 dark:from-black/10 dark:to-gray-900/20 transition-all duration-500">
      <Container className="py-6">
        {/* Navigation */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <Link
            to="/store"
            className="inline-flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 px-3 py-1.5 border border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 sm:border-0 sm:px-0 sm:py-0 sm:text-base sm:gap-2"
          >
            <FaArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>

          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Shopping Cart
            </h1>
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 text-sm font-medium">
              {cartWithDetails.length}{" "}
              {cartWithDetails.length === 1 ? "item" : "items"}
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Cart Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Cart Items
              </h2>
              <button
                onClick={clearCart}
                className="flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-300"
              >
                <FaTrash className="w-4 h-4" />
                Clear Cart
              </button>
            </div>

            {/* Cart Items List */}
            <div className="space-y-4">
              {cartWithDetails.map((item) => (
                <CartCard
                  key={item.id}
                  product={item}
                  onRemove={() => removeFromCart(item.id)}
                  onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                  onDecrease={() => {
                    if (item.quantity > 1) {
                      updateQuantity(item.id, item.quantity - 1);
                    } else {
                      removeFromCart(item.id);
                    }
                  }}
                />
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 mt-6 lg:mt-0">
            <div className="bg-white/80 dark:bg-black/20 backdrop-blur-sm border border-gray-200 dark:border-blue-500/30 p-4 sm:p-6 shadow-xl sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Order Summary
              </h2>

              {/* Summary Details */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-800 dark:text-gray-300">
                  <span>Subtotal ({cartWithDetails.length} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-800 dark:text-gray-300">
                  <span className="flex items-center gap-2">
                    <FaTruck className="w-4 h-4" />
                    Shipping
                  </span>
                  <span
                    className={
                      shipping === 0 ? "text-green-600 dark:text-green-400" : ""
                    }
                  >
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between text-gray-800 dark:text-gray-300">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <div className="border-t border-gray-300 dark:border-gray-700/50 pt-4">
                  <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => setShowCheckoutPopup(true)}
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-slate-800 text-white font-semibold hover:from-blue-700 hover:to-slate-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2 mb-4"
              >
                <FaCreditCard className="w-5 h-5" />
                Proceed to Checkout
              </button>

              {/* Security Notice */}
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  🔒 Secure checkout with SSL encryption
                </p>
              </div>

              {/* Shipping Info */}
              {subtotal < 50 && (
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-400/40">
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    <strong>Free shipping</strong> on orders over $50. Add $
                    {(50 - subtotal).toFixed(2)} more to qualify!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>

      {/* Checkout Coming Soon Popup */}
      {showCheckoutPopup && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowCheckoutPopup(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 border border-blue-500/50 p-8 max-w-md w-full shadow-2xl transform animate-bounce-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="text-6xl mb-4">🚧</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Feature Coming Soon!
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                This is a{" "}
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  portfolio showcase project
                </span>
                . Checkout functionality will be added in the production
                version.
              </p>
              <button
                onClick={() => setShowCheckoutPopup(false)}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-slate-800 text-white font-semibold hover:from-blue-700 hover:to-slate-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
