import React from "react";

const CartCard = ({ product, onDecrease, onIncrease, onRemove }) => {
  const {
    id,
    title,
    price,
    images,
    image,
    category,
    quantity = 1,
    url: productUrl,
  } = product;
  const url = images?.[0] || image || productUrl; // Handle multiple image formats
  const discount = 0; // Default discount

  const discountedPrice = price - price * (discount / 100);
  const totalPrice = discountedPrice * quantity; // Calculate total based on quantity

  return (
    <div className="flex border rounded-lg p-4 mb-4 shadow-sm bg-white">
      {/* Left: Product Image */}
      <div className="w-24 h-24 overflow-hidden rounded-md">
        <img src={url} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Right: Product Info */}
      <div className="ml-4 flex flex-col justify-between flex-grow">
        <div>
          <p className="text-sm font-semibold text-gray-800 truncate">
            {title}
          </p>
          <p className="text-xs text-gray-500">
            Price per item: ${price?.toFixed(2) || "0.00"}
          </p>
          {quantity > 1 && (
            <p className="text-xs text-gray-500">
              Quantity: {quantity} × ${price?.toFixed(2)}
            </p>
          )}
          <p className="text-xs text-green-600">Discount: {discount}%</p>
          <p className="text-sm font-bold text-blue-600">
            Total: ${totalPrice?.toFixed(2) || "0.00"}
          </p>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center mt-2 space-x-2">
          <button
            onClick={() => onDecrease && onDecrease(id)}
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            −
          </button>
          <span className="text-sm font-medium">{quantity}</span>
          <button
            onClick={() => onIncrease && onIncrease(id)}
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            +
          </button>
          <button
            onClick={() => onRemove && onRemove(id)}
            className="ml-auto px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
