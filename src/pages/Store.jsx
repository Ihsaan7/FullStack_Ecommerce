import {
  NavLink,
  Outlet,
  useLoaderData,
  useSearchParams,
} from "react-router-dom";
import ProductCard from "../component/home/ProductCard";
import { useState, useContext } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Container from "../layout/Container";
import { ProductContext } from "../context/ProductContext";

export function Store() {
  const [searchParams] = useSearchParams();
  const selectCategory = searchParams.get("category");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const products = useLoaderData();
  const { addToCart } = useContext(ProductContext);

  const handleAddToCart = async (productId) => {
    // Find the full product details
    const product = products.find((p) => p.id === productId);
    if (product) {
      await addToCart(product);
    }
  };

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
      <Container className="py-6 pt-12">
        {/* Mobile Header */}
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Store
          </h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-gray-300 dark:border-gray-800/30 text-gray-800 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-black/30 transition-all duration-300"
          >
            {isSidebarOpen ? (
              <FaTimes className="w-5 h-5" />
            ) : (
              <FaBars className="w-5 h-5" />
            )}
          </button>
        </div>

        <div className="flex gap-6">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block lg:w-80 flex-shrink-0">
            <div className="bg-white/80 dark:bg-black/10 backdrop-blur-sm border border-gray-200 dark:border-gray-800/30 p-6 sticky top-6">
              <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent tracking-tight">
                Categories
              </h2>

              <div className="space-y-2">
                {/* All Category */}
                <NavLink
                  to="/store?category=All"
                  className={({ isActive }) =>
                    `block px-4 py-3 transition-all duration-300 ${
                      !selectCategory || selectCategory === "All"
                        ? "bg-gradient-to-r from-blue-600 to-slate-800 text-white font-semibold shadow-lg"
                        : "text-gray-800 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800/50 hover:text-blue-600 dark:hover:text-blue-400 border border-gray-200 dark:border-transparent"
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
                      `block px-4 py-3 transition-all duration-300 ${
                        selectCategory === catName
                          ? "bg-gradient-to-r from-blue-600 to-slate-800 text-white font-semibold shadow-lg"
                          : "text-gray-800 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800/50 hover:text-blue-600 dark:hover:text-blue-400 border border-gray-200 dark:border-transparent"
                      }`
                    }
                  >
                    {catName}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Sidebar Overlay */}
          {isSidebarOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="fixed inset-0 bg-black/50"
                onClick={() => setIsSidebarOpen(false)}
              ></div>
              <div className="fixed left-0 top-0 h-full w-80 bg-white/95 dark:bg-black/20 backdrop-blur-sm border-r border-gray-300 dark:border-gray-800/30 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    Categories
                  </h2>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-2 text-gray-800 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-black/30 transition-all duration-300"
                  >
                    <FaTimes className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-2">
                  {/* All Category */}
                  <NavLink
                    to="/store?category=All"
                    onClick={() => setIsSidebarOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 transition-all duration-300 ${
                        !selectCategory || selectCategory === "All"
                          ? "bg-gradient-to-r from-blue-600 to-slate-800 text-white font-semibold shadow-lg"
                          : "text-gray-800 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800/50 hover:text-blue-600 dark:hover:text-blue-400 border border-gray-200 dark:border-transparent"
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
                      onClick={() => setIsSidebarOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-3 transition-all duration-300 ${
                          selectCategory === catName
                            ? "bg-gradient-to-r from-blue-600 to-slate-800 text-white font-semibold shadow-lg"
                            : "text-gray-800 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800/50 hover:text-blue-600 dark:hover:text-blue-400 border border-gray-200 dark:border-transparent"
                        }`
                      }
                    >
                      {catName}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4 tracking-tight">
                {selectCategory && selectCategory !== "All"
                  ? `${selectCategory} Products`
                  : "Everything At One Place"}
              </h1>
              <p className="text-gray-700 dark:text-gray-400">
                Showing {filteredProducts.length} product
                {filteredProducts.length !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                    onAddToCart={handleAddToCart}
                    productId={prod.id}
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
      </Container>
    </div>
  );
}
