import React from "react"
import Carousel from "../component/home/Crousel"
import { Outlet, useLoaderData } from "react-router-dom"
import ProductCard from "../component/home/ProductCard"

const Home = () => {
  const products = useLoaderData()

  return (
    <>
      <Carousel />
      <h1 className="text-2xl font-bold mb-4">Recent Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.slice(0, 4).map((prod) => (
          <ProductCard
            key={prod.id}
            id={prod.id}
            price={prod.price}
            title={prod.title}
            url={prod.images[0]}
            category={prod.category?.name || "Uncategorized"}
          />
        ))}
      </div>
      <h1 className="text-2xl font-bold mb-4">Featured Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.slice(4, 12).map((prod) => (
          <ProductCard
            key={prod.id}
            id={prod.id}
            price={prod.price}
            title={prod.title}
            url={prod.images[0]}
            category={prod.category?.name || "Uncategorized"}
          />
        ))}
      </div>
    </>
  )
}

export default Home
