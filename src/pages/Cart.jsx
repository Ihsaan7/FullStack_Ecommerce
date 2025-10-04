import React, { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { useLoaderData, useParams } from "react-router-dom";
import CartCard from "../component/cart/CartCard";

const Cart = () => {
  const { cartItem, removeFromCart } = useContext(ProductContext);
  const products = useLoaderData();
  const { id: routeId } = useParams();

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
                onRemove={() => console.log("remove")}
                onIncrease={() => console.log("increase")}
                onDecrease={() => console.log("decrease")}
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
                onIncrease={() => console.log("increase")}
                onDecrease={() => console.log("decrease")}
              />
            ))}
          </div>
        </div>
        <div className="right  border-2 w-1/2">
          <h2>Order Summary</h2>
          <p>Total</p>
          <p>Discount</p>
          <p>Shipping Fee</p>
          <div className="flex">
            <h3>Total Amount</h3>
            <p>1000</p>
            <button>Proceed To checkout</button>
            <p>Continue Shopping</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
