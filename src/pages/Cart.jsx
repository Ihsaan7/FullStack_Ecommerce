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

    if (!products) return <p>Loading products...</p>;

    const filteredProducts = products.filter((prod) => prod.id === productId);

    if (filteredProducts.length === 0) {
      return <p>Product not found!</p>;
    }

    const product = filteredProducts[0];

    return (
      <div className="h-screen border flex items-center w-full">
        <div className="h-[70%] w-full flex">
          <div className="left border-2 w-1/2 flex">
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
          <div className="right  border-2 w-1/2">
            <h2>Order Summary</h2>
            <p>Total</p>
            <p>Discount</p>
            <p>Shipping Fee</p>
            <div className="flex">
              <h3>Total Amount</h3>
              <p>${product.price}</p>
              <button>Proceed To checkout</button>
              <p>Continue Shopping</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If no route ID, show cart items
  if (!cartItem || cartItem.length === 0) {
    return <p>No items in cart</p>;
  }

  // Calculate total price
  const totalAmount = cartItem.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div className="h-screen border flex items-center w-full">
      <div className="h-[70%] w-full flex">
        <div className="left border-2 w-1/2 flex">
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
        <div className="right  border-2 w-1/2">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <p>Subtotal:</p>
              <p>${totalAmount.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p>Discount:</p>
              <p>$0.00</p>
            </div>
            <div className="flex justify-between">
              <p>Shipping Fee:</p>
              <p>$0.00</p>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-bold text-lg">
              <h3>Total Amount:</h3>
              <p>${totalAmount.toFixed(2)}</p>
            </div>
          </div>
          <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mb-2">
            Proceed To Checkout
          </button>
          <p className="text-center text-blue-500 cursor-pointer hover:underline">
            Continue Shopping
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
