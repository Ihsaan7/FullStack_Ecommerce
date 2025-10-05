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
    <div className="main h-full flex w-full">
      {/* Sidebar */}
      <div className="hleft h-screen w-[30%] border-2 flex items-center justify-center">
        <div>
          <h1 className="text-xl font-bold mb-4">Categories</h1>

          <div className="border-2 p-3 space-y-2">
            {/* All Category - Shows all products */}
            <NavLink
              to="/store?category=All"
              className={({ isActive }) =>
                `block px-3 py-2 rounded transition-colors ${
                  !selectCategory || selectCategory === "All"
                    ? "bg-blue-500 text-white font-semibold"
                    : "text-blue-600 hover:bg-blue-50"
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
                  `block px-3 py-2 rounded transition-colors ${
                    selectCategory === catName
                      ? "bg-blue-500 text-white font-semibold"
                      : "text-blue-600 hover:bg-blue-50"
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
      <div className="hright w-full h-full border-2 pt-5 px-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            {selectCategory && selectCategory !== "All"
              ? `${selectCategory} Products`
              : "Everything At One Place"}
          </h1>
          <p className="text-gray-600 mt-2">
            Showing {filteredProducts.length} product
            {filteredProducts.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
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
              <p className="text-gray-500 text-lg">
                No products found in this category.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
