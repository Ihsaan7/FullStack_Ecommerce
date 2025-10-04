import React, { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";

const Cart = () => {
  const { selectProduct } = useContext(ProductContext);
  if (!selectProduct) return <p>No Product!</p>;
  const id = selectProduct;
  return (
    <div className="h-screen border flex items-center w-full">
      <div className="h-[70%] w-full flex">
        <div className="left border-2 w-1/2 flex">
          <div className="">
            <img className=" w-20 h-20" />
          </div>
          <div>
            <p>Title</p>
            <p>{id}</p>
            <p>- 01 +</p>
            <p>Price</p>
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
            <p>Contiue Shopping</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
