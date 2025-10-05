import React, { useState } from "react";
import { FaSearch, FaStore, FaShoppingCart } from "react-icons/fa";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useTheme } from "../context/ThemeContext.jsx";
import {
  Link,
  Outlet,
  useNavigate,
  useLoaderData,
  useMatches,
  useLocation,
} from "react-router-dom";

export function NavLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

const Navbar = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const matches = useMatches();
  const location = useLocation();
  const [query, setQuery] = useState("");

  // Try to find a loader result that contains products (assumes recentLoader returns an array of products)
  const allProducts =
    matches.map((m) => m.loaderData).find((data) => Array.isArray(data)) || [];

  const onSubmit = (e) => {
    e.preventDefault();
    const q = query.trim().toLowerCase();
    if (!q) return;
    const found = allProducts.find((p) => p.title?.toLowerCase().includes(q));
    if (found) {
      navigate(`/store/${found.id}`);
      setQuery("");
    }
  };

  return (
    <nav className="w-full h-16 bg-white shadow-md flex items-center justify-between px-6">
      {/* Logo */}
      <Link to="/">
        {" "}
        <div className="text-xl font-bold text-blue-600"> MyShop</div>
      </Link>

      {/* Search Bar */}
      <form
        onSubmit={onSubmit}
        className="flex items-center w-1/2 max-w-md bg-gray-100 rounded-full px-4 py-2"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="flex-grow bg-transparent outline-none text-gray-700"
        />
        <button
          type="submit"
          className="text-gray-500 hover:text-gray-700"
          aria-label="Search"
        >
          <FaSearch />
        </button>
      </form>

      {/* Store / Cart Icons */}
      <div className="flex items-center space-x-6 text-gray-700 text-xl">
        <Link to="/store">
          {" "}
          <FaStore className="cursor-pointer hover:text-blue-600" />
        </Link>
        <Link to="/cart">
          <FaShoppingCart className="cursor-pointer hover:text-blue-600" />
        </Link>
        <button
          type="button"
          onClick={toggleTheme}
          className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <SunIcon className="w-5 h-5" />
          ) : (
            <MoonIcon className="w-5 h-5" />
          )}
        </button>
      </div>
    </nav>
  );
};
