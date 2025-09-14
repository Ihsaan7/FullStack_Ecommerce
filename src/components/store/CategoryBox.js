import React from 'react';

const CategoryBox = ({ category }) => {
  const label =
    typeof category === 'string'
      ? category.charAt(0).toUpperCase() + category.slice(1)
      : 'Unknown';
  return (
    <div className="m-2">
      <button className="w-full px-4 py-3 bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg text-left transition-all duration-200 shadow-sm hover:shadow-md">
  {label}
</button>
    </div>
  );
};

export default CategoryBox;