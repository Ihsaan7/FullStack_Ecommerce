import React from 'react'

const ProductBox = ({ name, price, image, category }) => {
  return (
    <div className="border rounded-lg p-4 m-2 bg-white shadow-md hover:shadow-lg transition-shadow">
      <img src={image} alt={name} className="w-full h-[150px] object-contain rounded mb-4" />
      <h3 className="text-lg font-semibold  overflow-hidden text-ellipsis">{name}</h3>
      <p className="text-gray-600 font-bold text-xl">${price}</p>
      <p className="text-sm text-gray-500 mt-1">{category}</p>
    </div>
  )
}

export default ProductBox