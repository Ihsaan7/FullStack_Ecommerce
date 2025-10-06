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
      <div className="main min-h-screen flex w-full max-w-7xl mx-auto">
        {/* Sidebar */}
        <div className="hleft min-h-screen w-[30%] bg-white/5 dark:bg-black/10 backdrop-blur-sm border-r border-white/20 dark:border-gray-800/30 flex items-start justify-start">
          <div className="w-full px-6 pt-6">
            <h1 className="text-xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent tracking-tight">Categories</h1>

            <div className="bg-white/5 dark:bg-black/10 backdrop-blur-sm border border-white/20 dark:border-gray-800/30 p-4 space-y-2 shadow-lg rounded-md">
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
        <div className="hright w-full min-h-screen pt-8 px-6 md:px-10 bg-white/5 dark:bg-black/10 backdrop-blur-sm">
          <div className="mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6 tracking-tight">
              {selectCategory && selectCategory !== "All"
                ? `${selectCategory} Products`
                : "Everything At One Place"}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Showing {filteredProducts.length} product
              {filteredProducts.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  id={prod.id}
                  price={prod.price}
                  title={prod.title}
                  url={prod.images[0]}
                  category={prod.category?.name || "Uncategorized"}
                  size="lg"
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
