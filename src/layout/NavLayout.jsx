import React, { useState, useContext, useEffect, useRef } from "react";
import {
  FaSearch,
  FaStore,
  FaShoppingCart,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useTheme } from "../context/ThemeContext.jsx";
import { ProductContext } from "../context/ProductContext";
import { useAuth } from "../contexts/AuthContext";
import Loader from "../components/Loader";
import {
  Link,
  Outlet,
  useNavigate,
  useLoaderData,
  useMatches,
  useLocation,
  useNavigation,
} from "react-router-dom";

export function NavLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <>
      <Navbar />
      {isLoading && <Loader fullScreen message="Loading..." />}
      <Outlet />
    </>
  );
}

const Navbar = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { cartItem } = useContext(ProductContext);
  const { user, logout } = useAuth();
  const matches = useMatches();
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchError, setSearchError] = useState("");
  const profileMenuRef = useRef(null);

  // Calculate total cart items
  const cartItemCount = cartItem
    ? cartItem.reduce((total, item) => total + (item.quantity || 1), 0)
    : 0;

  // Try to find a loader result that contains products (assumes recentLoader returns an array of products)
  const allProducts =
    matches.map((m) => m.loaderData).find((data) => Array.isArray(data)) || [];

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }
    };

    if (showProfileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileMenu]);

  const onSubmit = (e) => {
    e.preventDefault();
    const q = query.trim().toLowerCase();
    if (!q) return;
    const found = allProducts.find((p) => p.title?.toLowerCase().includes(q));
    if (found) {
      navigate(`/store/${found.id}`);
      setQuery("");
      setSearchError("");
    } else {
      // Show styled toast instead of alert
      setSearchError(`No products found matching "${q}"`);
      setTimeout(() => setSearchError(""), 3000);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <>
      {/* Main Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 dark:bg-black/20 backdrop-blur-2xl border-b border-white/20 dark:border-gray-800/30 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <Link to="/home" className="flex items-center space-x-2 group">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-slate-800 flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25 dark:group-hover:shadow-slate-500/25 transition-all duration-300 transform group-hover:scale-105">
                  <span className="text-white font-bold text-sm">L</span>
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-gradient-to-r from-blue-400 to-slate-600 animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <div className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent tracking-tight">
                  LUXURY
                </div>
                <div className="text-xs text-gray-800 dark:text-gray-400 font-medium tracking-wider uppercase">
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
                    className="w-full px-4 py-2 bg-white/30 dark:bg-gray-900/30 border border-gray-300 dark:border-gray-700/50 text-gray-900 dark:text-white placeholder-gray-600 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-slate-500/50 focus:border-blue-500 dark:focus:border-slate-500/50 transition-all duration-300 backdrop-blur-sm shadow-lg"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-700 dark:text-gray-400 hover:text-blue-600 dark:hover:text-slate-400 transition-colors duration-300"
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
                className="hidden sm:flex items-center space-x-1.5 px-3 py-2 hover:bg-white/20 dark:hover:bg-gray-800/20 transition-all duration-300 group"
              >
                <FaStore className="w-4 h-4 text-gray-800 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-slate-400 transition-colors duration-300" />
                <span className="text-gray-800 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-white font-medium text-sm">
                  Store
                </span>
              </Link>

              {/* Cart Link */}
              <Link
                to="/cart"
                className="relative flex items-center space-x-1.5 px-3 py-2 hover:bg-white/20 dark:hover:bg-gray-800/20 transition-all duration-300 group mr-2"
              >
                <FaShoppingCart className="w-4 h-4 text-gray-800 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-slate-400 transition-colors duration-300" />
                <span className="hidden sm:block text-gray-800 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-white font-medium text-sm">
                  Cart
                </span>
                {/* Cart Badge */}
                <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gradient-to-r from-blue-500 to-slate-700 flex items-center justify-center shadow-lg">
                  <span className="text-xs text-white font-bold">
                    {cartItemCount}
                  </span>
                </div>
              </Link>

              {/* Theme Toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                className="w-10 h-10 flex items-center justify-center border border-gray-300 dark:border-gray-700/50 bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm text-gray-800 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-800/40 hover:text-blue-600 dark:hover:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-slate-500/50 transition-all duration-300 shadow-lg"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <SunIcon className="w-5 h-5" />
                ) : (
                  <MoonIcon className="w-5 h-5" />
                )}
              </button>

              {/* User Profile Dropdown */}
              <div className="relative ml-2" ref={profileMenuRef}>
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="w-10 h-10 flex items-center justify-center border border-white/20 dark:border-gray-700/50 bg-gradient-to-r from-blue-600 to-slate-800 backdrop-blur-sm text-white hover:from-blue-700 hover:to-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-slate-500/50 transition-all duration-300 shadow-lg"
                  aria-label="User menu"
                >
                  <FaUser className="w-4 h-4" />
                </button>

                {/* Dropdown Menu */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-2xl z-50">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Signed in as
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white truncate">
                        {user?.fullName || "User"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {user?.email || ""}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-3 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                    >
                      <FaSignOutAlt className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden w-10 h-10 flex items-center justify-center border border-gray-300 dark:border-gray-700/50 bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm text-gray-800 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-800/40 hover:text-blue-600 dark:hover:text-slate-400 transition-all duration-300 shadow-lg"
                aria-label="Toggle menu"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-white/95 dark:bg-black/20 backdrop-blur-2xl border-b border-gray-300 dark:border-gray-800/30 shadow-xl md:hidden">
          <div className="px-4 py-4 space-y-3">
            {/* Mobile Search */}
            <form onSubmit={onSubmit} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search luxury products..."
                  className="w-full px-3 py-2 bg-white/50 dark:bg-gray-900/30 border border-gray-300 dark:border-gray-700/50 text-gray-900 dark:text-white placeholder-gray-600 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-slate-500/50 focus:border-blue-500 dark:focus:border-slate-500/50 transition-all duration-300 backdrop-blur-sm shadow-lg"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-700 dark:text-gray-400 hover:text-blue-600 dark:hover:text-slate-400 transition-colors duration-300"
                >
                  <FaSearch className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Mobile Navigation Links */}
            <div className="space-y-1">
              <Link
                to="/store"
                className="flex items-center space-x-2 px-3 py-2 hover:bg-white/50 dark:hover:bg-gray-800/20 transition-all duration-300 text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white border border-gray-200 dark:border-transparent"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaStore className="w-4 h-4" />
                <span className="text-sm">Store</span>
              </Link>
              <Link
                to="/cart"
                className="flex items-center space-x-2 px-3 py-2 hover:bg-white/50 dark:hover:bg-gray-800/20 transition-all duration-300 text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white border border-gray-200 dark:border-transparent"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaShoppingCart className="w-4 h-4" />
                <span className="text-sm">Cart</span>
                {cartItemCount > 0 && (
                  <span className="ml-auto px-2 py-0.5 bg-blue-500 text-white text-xs font-bold">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>

      {/* Search Error Toast */}
      {searchError && (
        <div className="fixed bottom-6 right-6 z-50 px-6 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg shadow-2xl backdrop-blur-sm border border-white/20 animate-slide-up">
          <div className="flex items-center gap-3">
            <svg
              className="w-5 h-5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">{searchError}</span>
          </div>
        </div>
      )}
    </>
  );
};
