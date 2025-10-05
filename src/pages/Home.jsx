import React from "react";
import Carousel from "../component/home/Crousel";
import { Outlet, useLoaderData } from "react-router-dom";
import ProductCard from "../component/home/ProductCard";

const Home = () => {
  const products = useLoaderData();

  return (
    <div className="relative flex flex-col gap-16 pb-24">
      <div className="absolute inset-0 -z-10 bg-lux-light dark:bg-lux-gradient transition-colors" />
      <Carousel />

      {/* Recent Products */}
      <section className="px-4 md:px-8">
        <header className="flex items-center justify-between mb-6">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-800 via-slate-600 to-slate-400 dark:from-slate-100 dark:via-slate-300 dark:to-slate-500">
            New Arrivals
          </h2>
          <div className="h-px flex-1 ml-6 bg-gradient-to-r from-slate-300/60 to-transparent dark:from-slate-600" />
        </header>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
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
      </section>

      {/* Featured */}
      <section className="px-4 md:px-8">
        <header className="flex items-center justify-between mb-6">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
            Featured Picks
          </h2>
          <div className="h-px flex-1 ml-6 bg-gradient-to-r from-slate-300/60 to-transparent dark:from-slate-600" />
        </header>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
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
      </section>
    </div>
  );
};

export default Home;
