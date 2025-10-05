import React, { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { useLoaderData, useParams } from "react-router-dom";
import CartCard from "../component/cart/CartCard";

const Cart = () => {
  const { cartItem, removeFromCart, updateQuantity } =
    useContext(ProductContext);
  const products = useLoaderData();
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

  // If we have a route ID, show that specific product
  if (routeId) {
    const productId = parseInt(routeId);

    if (!products) return <p className="p-6 text-gray-600 dark:text-gray-400">Loading products...</p>;

    const filteredProducts = products.filter((prod) => prod.id === productId);

    if (filteredProducts.length === 0) {
      return <p className="p-6 text-gray-600 dark:text-gray-400">Product not found!</p>;
    }

    const product = filteredProducts[0];

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50/80 via-white to-gray-100/60 dark:from-black dark:to-gray-900 transition-all duration-500">
        <div className="h-screen flex items-center w-full">
          <div className="h-[70%] w-full flex">
            <div className="left bg-white/80 dark:bg-gray-900/90 backdrop-blur-sm border-r border-gray-200/50 dark:border-gray-700/70 w-1/2 flex">
              <div className="p-6">
                <CartCard
                  key={product.id}
                  product={product}
                  onRemove={() => removeFromCart(product.id)}
                  onIncrease={() => handleIncrease(product.id)}
                  onDecrease={() => handleDecrease(product.id)}
                />
              </div>
            </div>
            <div className="right bg-white/80 dark:bg-gray-900/90 backdrop-blur-sm border-l border-gray-200/50 dark:border-gray-700/70 w-1/2 p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Order Summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <p>Subtotal:</p>
                  <p>${product.price}</p>
                </div>
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <p>Discount:</p>
                  <p>$0.00</p>
                </div>
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <p>Shipping Fee:</p>
                  <p>$0.00</p>
                </div>
                <hr className="my-2 border-gray-200 dark:border-gray-700" />
                <div className="flex justify-between font-bold text-lg text-gray-900 dark:text-white">
                  <h3>Total Amount:</h3>
                  <p>${product.price}</p>
                </div>
              </div>
              <button className="w-full bg-gradient-to-r from-blue-600 to-slate-800 text-white py-3 font-semibold hover:from-blue-700 hover:to-slate-900 transition-all duration-300 shadow-lg mb-2">
                Proceed To Checkout
              </button>
              <p className="text-center text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">
                Continue Shopping
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If no route ID, show cart items
  if (!cartItem || cartItem.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50/80 via-white to-gray-100/60 dark:from-black dark:to-gray-900 transition-all duration-500 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">No items in cart</p>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-slate-800 text-white font-semibold hover:from-blue-700 hover:to-slate-900 transition-all duration-300 shadow-lg">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // Calculate total price
  const totalAmount = cartItem.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/80 via-white to-gray-100/60 dark:from-black dark:to-gray-900 transition-all duration-500">
      <div className="h-screen flex items-center w-full">
        <div className="h-[70%] w-full flex">
          <div className="left bg-white/80 dark:bg-gray-900/90 backdrop-blur-sm border-r border-gray-200/50 dark:border-gray-700/70 w-1/2 flex">
            <div className="p-6">
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
          <div className="right bg-white/80 dark:bg-gray-900/90 backdrop-blur-sm border-l border-gray-200/50 dark:border-gray-700/70 w-1/2 p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-gray-700 dark:text-gray-300">
                <p>Subtotal:</p>
                <p>${totalAmount.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-gray-700 dark:text-gray-300">
                <p>Discount:</p>
                <p>$0.00</p>
              </div>
              <div className="flex justify-between text-gray-700 dark:text-gray-300">
                <p>Shipping Fee:</p>
                <p>$0.00</p>
              </div>
              <hr className="my-2 border-gray-200 dark:border-gray-700" />
              <div className="flex justify-between font-bold text-lg text-gray-900 dark:text-white">
                <h3>Total Amount:</h3>
                <p>${totalAmount.toFixed(2)}</p>
              </div>
            </div>
            <button className="w-full bg-gradient-to-r from-blue-600 to-slate-800 text-white py-3 font-semibold hover:from-blue-700 hover:to-slate-900 transition-all duration-300 shadow-lg mb-2">
              Proceed To Checkout
            </button>
            <p className="text-center text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">
              Continue Shopping
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
