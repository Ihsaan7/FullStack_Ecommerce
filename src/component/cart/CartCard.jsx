import React from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";

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
  const url = images?.[0] || image || productUrl;

  const totalPrice = price * quantity;

  return (
    <div className="bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-blue-500/30 p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
      <div className="flex gap-4 sm:gap-6">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 overflow-hidden bg-white/5 dark:bg-black/10 border border-white/10 dark:border-blue-400/20">
            <img 
              src={url} 
              alt={title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                {title}
              </h3>
              <p className="text-sm text-gray-800 dark:text-gray-400 mb-2">
                {category || "Uncategorized"}
              </p>
            </div>
            
            {/* Remove Button */}
            <button
              onClick={() => onRemove && onRemove(id)}
              className="flex-shrink-0 w-8 h-8 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-500/30 flex items-center justify-center transition-colors duration-300"
            >
              <FaTrash className="w-3 h-3" />
            </button>
          </div>

          {/* Price Info */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-800 dark:text-gray-400">Price:</span>
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                ${price.toFixed(2)}
              </span>
            </div>
            
            {quantity > 1 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-800 dark:text-gray-400">Total:</span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            )}
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => onDecrease && onDecrease(id)}
                className="w-8 h-8 bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-blue-400/40 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-300"
              >
                <FaMinus className="w-3 h-3" />
              </button>
              
              <span className="w-12 text-center font-semibold text-gray-900 dark:text-white">
                {quantity}
              </span>
              
              <button
                onClick={() => onIncrease && onIncrease(id)}
                className="w-8 h-8 bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-blue-400/40 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-300"
              >
                <FaPlus className="w-3 h-3" />
              </button>
            </div>

            {/* Total Price */}
            <div className="text-right min-w-0 flex-shrink-0">
              <div className="text-sm text-gray-800 dark:text-gray-400">Total</div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                ${totalPrice.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
