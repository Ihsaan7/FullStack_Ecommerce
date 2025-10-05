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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <>
      {/* Main Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 dark:bg-black/20 backdrop-blur-2xl border-b border-white/20 dark:border-gray-800/30 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo Section */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-orange-500/25 dark:group-hover:shadow-purple-500/25 transition-all duration-300 transform group-hover:scale-105">
                  <span className="text-white font-bold text-sm">L</span>
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-gradient-to-r from-orange-400 to-purple-500 animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <div className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent tracking-tight">
                  LUXURY
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wider uppercase">
                  COLLECTION
                </div>
              </div>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-6 hidden md:block">
              <form onSubmit={onSubmit} className="relative">
                <div className="relative">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search luxury products..."
                    className="w-full px-4 py-2 bg-white/20 dark:bg-gray-900/30 border border-white/30 dark:border-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 dark:focus:ring-purple-500/50 focus:border-orange-500/50 dark:focus:border-purple-500/50 transition-all duration-300 backdrop-blur-sm shadow-lg"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-purple-400 transition-colors duration-300"
                    aria-label="Search"
                  >
                    <FaSearch className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>

            {/* Navigation Items */}
            <div className="flex items-center">
              
              {/* Store Link */}
              <Link 
                to="/store" 
                className="hidden sm:flex items-center space-x-1.5 px-3 py-2 hover:bg-white/10 dark:hover:bg-gray-800/20 transition-all duration-300 group"
              >
                <FaStore className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-orange-500 dark:group-hover:text-purple-400 transition-colors duration-300" />
                <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white font-medium text-sm">Store</span>
              </Link>

              {/* Cart Link */}
              <Link 
                to="/cart" 
                className="relative flex items-center space-x-1.5 px-3 py-2 hover:bg-white/10 dark:hover:bg-gray-800/20 transition-all duration-300 group mr-2"
              >
                <FaShoppingCart className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-orange-500 dark:group-hover:text-purple-400 transition-colors duration-300" />
                <span className="hidden sm:block text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white font-medium text-sm">Cart</span>
                {/* Cart Badge */}
                <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gradient-to-r from-orange-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <span className="text-xs text-white font-bold">0</span>
                </div>
              </Link>

              {/* Theme Toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                className="w-10 h-10 flex items-center justify-center border border-white/20 dark:border-gray-700/50 bg-white/10 dark:bg-gray-900/30 backdrop-blur-sm text-gray-600 dark:text-gray-400 hover:bg-white/20 dark:hover:bg-gray-800/40 hover:text-orange-500 dark:hover:text-purple-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 dark:focus:ring-purple-500/50 transition-all duration-300 shadow-lg"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <SunIcon className="w-5 h-5" />
                ) : (
                  <MoonIcon className="w-5 h-5" />
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden w-10 h-10 flex items-center justify-center border border-white/20 dark:border-gray-700/50 bg-white/10 dark:bg-gray-900/30 backdrop-blur-sm text-gray-600 dark:text-gray-400 hover:bg-white/20 dark:hover:bg-gray-800/40 hover:text-orange-500 dark:hover:text-purple-400 transition-all duration-300 shadow-lg"
                aria-label="Toggle menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-white/10 dark:bg-black/20 backdrop-blur-2xl border-b border-white/20 dark:border-gray-800/30 shadow-xl md:hidden">
          <div className="px-4 py-4 space-y-3">
            {/* Mobile Search */}
            <form onSubmit={onSubmit} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search luxury products..."
                  className="w-full px-3 py-2 bg-white/20 dark:bg-gray-900/30 border border-white/30 dark:border-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 dark:focus:ring-purple-500/50 focus:border-orange-500/50 dark:focus:border-purple-500/50 transition-all duration-300 backdrop-blur-sm shadow-lg"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-purple-400 transition-colors duration-300"
                >
                  <FaSearch className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Mobile Navigation Links */}
            <div className="space-y-1">
              <Link 
                to="/store" 
                className="flex items-center space-x-2 px-3 py-2 hover:bg-white/10 dark:hover:bg-gray-800/20 transition-all duration-300 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaStore className="w-4 h-4" />
                <span className="text-sm">Store</span>
              </Link>
              <Link 
                to="/cart" 
                className="flex  items-center space-x-2 px-3 py-2 hover:bg-white/10 dark:hover:bg-gray-800/20 transition-all duration-300 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaShoppingCart className="w-4 h-4" />
                <span className="text-sm">Cart</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};