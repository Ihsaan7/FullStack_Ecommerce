import React, { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { useLoaderData, useParams, Link } from "react-router-dom";
import CartCard from "../component/cart/CartCard";
import { useTheme } from "../context/ThemeContext";
import { FaShoppingCart, FaArrowLeft, FaTrash, FaCreditCard, FaTruck } from "react-icons/fa";

const Cart = () => {
  const { cartItem, removeFromCart, updateQuantity, clearCart } =
    useContext(ProductContext);
  const products = useLoaderData();
  const { theme } = useTheme();
  const { id: routeId } = useParams();

  // Define handlers at component level so they're available everywhere
  const handleIncrease = (id) => {
    const item = cartItem.find((item) => item.id === id);
    if (item) {
      updateQuantity(id, item.quantity + 1);
    }
  };

  const handleDecrease = (id) => {
    const item = cartItem.find((item) => item.id === id);
    if (item && item.quantity > 1) {
      updateQuantity(id, item.quantity - 1);
    } else if (item) {
      removeFromCart(id);
    }
  };

  // Calculate totals
  const subtotal = cartItem.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 9.99; // Free shipping over $50
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  // Empty cart state
  if (!cartItem || cartItem.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white/5 to-gray-100/10 dark:from-black/10 dark:to-gray-900/20 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
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
              Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
            </p>
            <Link 
              to="/store"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-slate-800 text-white font-semibold hover:from-blue-700 hover:to-slate-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white/5 to-gray-100/10 dark:from-black/10 dark:to-gray-900/20 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
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
              {cartItem.length} {cartItem.length === 1 ? 'item' : 'items'}
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
              {cartItem.map((item) => (
                <CartCard
                  key={item.id}
                  product={item}
                  onRemove={() => removeFromCart(item.id)}
                  onIncrease={() => handleIncrease(item.id)}
                  onDecrease={() => handleDecrease(item.id)}
                />
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 mt-6 lg:mt-0">
            <div className="bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-blue-500/30 p-4 sm:p-6 shadow-xl sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Order Summary
              </h2>

              {/* Summary Details */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Subtotal ({cartItem.length} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span className="flex items-center gap-2">
                    <FaTruck className="w-4 h-4" />
                    Shipping
                  </span>
                  <span className={shipping === 0 ? "text-green-600 dark:text-green-400" : ""}>
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <div className="border-t border-white/20 dark:border-gray-700/50 pt-4">
                  <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-slate-800 text-white font-semibold hover:from-blue-700 hover:to-slate-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2 mb-4">
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
                    <strong>Free shipping</strong> on orders over $50. Add ${(50 - subtotal).toFixed(2)} more to qualify!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
