import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Redirect to the page they were trying to visit, or /store
  const from = location.state?.from?.pathname || "/store";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        // Navigate to the page they were trying to visit, or /store
        nav(from, { replace: true });
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-blue-50 via-slate-50 to-gray-100 dark:from-gray-900 dark:via-slate-900 dark:to-black">
      <div className="max-w-md w-full">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-slate-800 flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25 dark:group-hover:shadow-slate-500/25 transition-all duration-300">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-blue-400 to-slate-600 animate-pulse"></div>
            </div>
            <div className="flex flex-col items-start">
              <div className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent tracking-tight">
                LUXURY
              </div>
              <div className="text-xs text-gray-800 dark:text-gray-400 font-medium tracking-wider uppercase">
                COLLECTION
              </div>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white/10 dark:bg-black/20 backdrop-blur-2xl border border-white/20 dark:border-gray-800/30 shadow-xl p-8">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-700 dark:text-gray-400">
              Sign in to your account to continue
            </p>
          </div>

          {error && (
            <div className="mb-6 px-4 py-3 bg-red-500/10 border border-red-500/30 backdrop-blur-sm">
              <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900 dark:text-gray-300 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                type="email"
                required
                className="w-full px-4 py-3 bg-white/20 dark:bg-gray-900/30 border border-white/30 dark:border-gray-700/50 text-gray-900 dark:text-white placeholder-gray-600 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-slate-500/50 focus:border-blue-500/50 dark:focus:border-slate-500/50 transition-all duration-300 backdrop-blur-sm shadow-lg"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900 dark:text-gray-300 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                type="password"
                required
                className="w-full px-4 py-3 bg-white/20 dark:bg-gray-900/30 border border-white/30 dark:border-gray-700/50 text-gray-900 dark:text-white placeholder-gray-600 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-slate-500/50 focus:border-blue-500/50 dark:focus:border-slate-500/50 transition-all duration-300 backdrop-blur-sm shadow-lg"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-slate-800 text-white font-semibold hover:from-blue-700 hover:to-slate-900 disabled:from-gray-400 disabled:to-gray-600 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-700 dark:text-gray-400 text-sm">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-600 dark:text-gray-500">
            © 2025 Luxury Collection. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
