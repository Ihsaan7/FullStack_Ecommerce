import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";

const ProductCard = ({ price, title, url, category, id }) => {
  const { addToCart } = useContext(ProductContext);
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault(); // Prevent navigation
    addToCart({ price, title, url, category, id, quantity: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000); // Reset after 2 seconds
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    navigate(`/store/${id}`);
  };

  return (
    <div 
      className="group relative bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-gray-800/30 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-64 w-full overflow-hidden">
        <Link to={`/store/${id}`}>
          <img 
            src={url} 
            alt={title} 
            className={`w-full h-full object-cover transition-transform duration-700 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`} 
          />
        </Link>
        
        {/* Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
          <div className="absolute bottom-4 left-4 right-4">
            <button 
              onClick={handleQuickView}
              className="w-full px-3 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-medium hover:bg-white/30 transition-all duration-300"
            >
              Quick View
            </button>
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 dark:bg-black/90 backdrop-blur-sm text-gray-700 dark:text-gray-200 text-xs font-medium">
            {category}
          </span>
        </div>

        {/* Price Badge */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-slate-800 text-white text-sm font-bold shadow-lg">
            ${price}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{category}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            className={`flex-1 px-4 py-3 font-semibold transition-all duration-300 transform ${
              added
                ? "bg-green-500 text-white shadow-lg scale-105"
                : "bg-gradient-to-r from-blue-600 to-slate-800 text-white hover:from-blue-700 hover:to-slate-900 shadow-md hover:shadow-lg"
            }`}
            onClick={handleAdd}
          >
            {added ? "✓ Added to Cart" : "Add to Cart"}
          </button>
          <Link to="/cart" className="flex-1">
            <button className="w-full px-4 py-3 bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-gray-700/50 text-gray-900 dark:text-white font-semibold hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-300 shadow-md hover:shadow-lg">
              View Cart
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;