import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ProductContext from "../context/ProductContext";

const ProductCard = ({ price, title, url, category, id }) => {
  const { setSelectProduct } = useContext(ProductContext);
  const handleAddtoCart = () => {
    setSelectProduct(id);
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
      <Link to={`/cart/${id}`}>
        <button className="border-2 text-black" onClick={handleAddtoCart}>
          {console.log(products)}
          Add to Cart
        </button>
      </Link>
    </div>
  );
};

export default ProductCard;
