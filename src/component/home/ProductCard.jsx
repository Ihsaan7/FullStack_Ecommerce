import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";

const ProductCard = ({ price, title, url, category, id }) => {
  const { addToCart } = useContext(ProductContext);
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault(); // Prevent navigation
    addToCart({ price, title, url, category, id, quantity: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="border rounded-lg shadow-md w-full max-w-xs bg-white overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <div className="h-48 w-full overflow-hidden">
        <img src={url} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Details */}
      <div className="p-4 space-y-2">
        <p className="text-lg font-semibold text-gray-800 truncate">{title}</p>
        <p className="text-sm text-gray-500">{category}</p>
        <p className="text-blue-600 font-bold">${price}</p>
        <p className="text-blue-600 font-bold">THE ID is {id}</p>
      </div>
      <div className="p-4 flex gap-2">
        <button
          className={`flex-1 border-2 px-4 py-2 rounded transition-colors ${
            added
              ? "bg-green-500 text-white border-green-500"
              : "bg-white text-black border-gray-300 hover:bg-gray-100"
          }`}
          onClick={handleAdd}
        >
          {added ? "✓ Added" : "Add to Cart"}
        </button>
        <Link to="/cart" className="flex-1">
          <button className="w-full border-2 px-4 py-2 rounded bg-blue-500 text-white border-blue-500 hover:bg-blue-600">
            View Cart
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
