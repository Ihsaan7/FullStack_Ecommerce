import {
  NavLink,
  Outlet,
  useLoaderData,
  useSearchParams,
} from "react-router-dom";
import ProductCard from "../component/home/ProductCard";
import { useState } from "react";

export function Store() {
  const [searchParams] = useSearchParams();
  const selectCategory = searchParams.get("category");
  const [cartProduct, setCartProducts] = useState([]);
  const products = useLoaderData();

  // Extract unique category names from products
  const uniqueCategories = [
    ...new Set(products.map((prod) => prod.category?.name).filter(Boolean)),
  ];

  // Filter products based on selected category
  const filteredProducts =
    selectCategory && selectCategory !== "All"
      ? products.filter((prod) => prod.category?.name === selectCategory)
      : products; // Show all products if no category or "All" is selected

  return (
    <div className="min-h-screen bg-gradient-to-br from-white/5 to-gray-100/10 dark:from-black/10 dark:to-gray-900/20 transition-all duration-500">
      <div className="main h-full flex w-full max-w-7xl mx-auto">
        {/* Sidebar */}
        <div className="hleft h-screen w-[30%] bg-white/80 dark:bg-gray-900/90 backdrop-blur-sm border-r border-gray-200/50 dark:border-gray-700/70 flex items-center justify-center">
          <div className="w-full px-6">
            <h1 className="text-xl font-bold mb-4 text-gray-900 dark:text-white tracking-tight">Categories</h1>

            <div className="bg-white/60 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 p-4 space-y-2 shadow-lg">
              {/* All Category - Shows all products */}
              <NavLink
                to="/store?category=All"
                className={({ isActive }) =>
                  `block px-3 py-2 transition-all duration-300 ${
                    !selectCategory || selectCategory === "All"
                      ? "bg-gradient-to-r from-blue-600 to-slate-800 text-white font-semibold shadow-lg"
                      : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800/50 hover:text-blue-600 dark:hover:text-blue-400"
                  }`
                }
              >
                All Products
              </NavLink>

              {/* Individual Categories */}
              {uniqueCategories.slice(0, 5).map((catName) => (
                <NavLink
                  key={catName}
                  to={`/store?category=${catName}`}
                  className={({ isActive }) =>
                    `block px-3 py-2 transition-all duration-300 ${
                      selectCategory === catName
                        ? "bg-gradient-to-r from-blue-600 to-slate-800 text-white font-semibold shadow-lg"
                        : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800/50 hover:text-blue-600 dark:hover:text-blue-400"
                    }`
                  }
                >
                  {catName}
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="hright w-full h-full pt-8 px-6 md:px-10">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              {selectCategory && selectCategory !== "All"
                ? `${selectCategory} Products`
                : "Everything At One Place"}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
              Showing {filteredProducts.length} product
              {filteredProducts.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  id={prod.id}
                  price={prod.price}
                  title={prod.title}
                  url={prod.images[0]}
                  category={prod.category?.name || "Uncategorized"}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  No products found in this category.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
