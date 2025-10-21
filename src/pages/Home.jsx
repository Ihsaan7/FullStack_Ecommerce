import React, { useContext, useState } from "react";
import Carousel from "../component/home/Crousel";
import { Outlet, useLoaderData, Link } from "react-router-dom";
import ProductCard from "../component/home/ProductCard";
import Container from "../layout/Container";
import { ProductContext } from "../context/ProductContext";

const Home = () => {
  const products = useLoaderData();
  const { addToCart } = useContext(ProductContext);

  const handleAddToCart = async (productId) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      await addToCart(product);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white/5 to-gray-100/10 dark:from-black/10 dark:to-gray-900/20 transition-all duration-500">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <Carousel />
      </section>

      {/* New Arrivals Section */}
      <section className="py-20">
        <Container>
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-slate-800 text-white rounded-full text-sm font-medium mb-4 shadow-lg">
              NEW ARRIVALS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Latest Collection
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-slate-800 mx-auto"></div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 4).map((prod) => (
              <div key={prod.id} className="group">
                <ProductCard
                  id={prod.id}
                  price={prod.price}
                  title={prod.title}
                  url={prod.images[0]}
                  category={prod.category?.name || "Uncategorized"}
                  onAddToCart={handleAddToCart}
                  productId={prod.id}
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Collection */}
      <section className="py-20 bg-white/5 dark:bg-black/10 backdrop-blur-sm">
        <Container>
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-slate-700 to-blue-900 text-white rounded-full text-sm font-medium mb-4 shadow-lg">
              FEATURED
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Editor's Choice
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-slate-700 to-blue-900 mx-auto"></div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.slice(4, 12).map((prod) => (
              <div key={prod.id} className="group">
                <ProductCard
                  id={prod.id}
                  price={prod.price}
                  title={prod.title}
                  url={prod.images[0]}
                  category={prod.category?.name || "Uncategorized"}
                  onAddToCart={handleAddToCart}
                  productId={prod.id}
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white">
        <Container className="max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white dark:text-gray-900">
            Ready to Experience Luxury?
          </h2>
          <p className="text-xl text-gray-300 dark:text-gray-600 mb-12 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have chosen quality and
            elegance.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/store">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-slate-800 text-white font-semibold hover:from-blue-700 hover:to-slate-900 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                Explore Collection
              </button>
            </Link>
            <div className="text-white dark:text-gray-900">
              <p className="text-lg font-bold">Premium Quality Guaranteed</p>
              <p className="text-sm text-gray-300 dark:text-gray-600">
                Free shipping on orders over $50
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Home;
