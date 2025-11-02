import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Use /api in production (monorepo rewrites); dev uses env/localhost
  const API_URL = import.meta.env.PROD
    ? "/api"
    : import.meta.env.VITE_API_URL || "http://localhost:8000";

  // Check authentication status on app load
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      console.log(`🔐 Checking auth status at: ${API_URL}/auth/me`);
      
      const response = await fetch(`${API_URL}/auth/me`, {
        method: "GET",
        credentials: "include", // Include cookies
      });

      console.log(`🔐 Auth check response status: ${response.status}`);

      if (response.ok) {
        const data = await response.json();
        console.log('🔐 Auth status changed - isAuthenticated: true, user:', data.user);
        setUser(data.user);
        setIsAuthenticated(true);
      } else {
        // Not authenticated
        console.log('🔐 Auth status changed - isAuthenticated: false, user: null');
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("🔐 Auth check failed:", error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      console.log(`🔐 Attempting login for: ${email} at ${API_URL}/auth/login`);
      
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      console.log(`🔐 Login response status: ${response.status}`);

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        console.error('🔐 Login failed:', error);
        throw new Error(error.message || "Login failed");
      }

      const data = await response.json();
      console.log('🔐 Login successful:', data);
      setUser(data.user);
      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      console.error('🔐 Login error:', error);
      return { success: false, error: error.message };
    }
  };

  const signup = async (fullName, email, password) => {
    try {
      console.log(`🔐 Attempting signup for: ${email} at ${API_URL}/auth/signup`);
      
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
        credentials: "include",
      });

      console.log(`🔐 Signup response status: ${response.status}`);

      const data = await (async () => {
        const text = await response.text();
        try {
          return JSON.parse(text);
        } catch {
          return { rawText: text };
        }
      })();

      console.log('🔐 Signup response data:', data);

      if (!response.ok) {
        const msg =
          data?.message ||
          (data?.errors && data.errors[0]?.msg) ||
          "Signup failed";
        console.error('🔐 Signup failed:', msg);
        throw new Error(msg);
      }

      if (data.token) {
        console.log('🔐 Signup successful:', data);
        setUser(data.user);
        setIsAuthenticated(true);
      }

      return { success: true };
    } catch (error) {
      console.error('🔐 Signup error:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      // Optionally call a logout endpoint if you have one
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      }).catch(() => {}); // Ignore errors
    } catch (error) {
      console.error("Logout request failed:", error);
    }

    // Clear state
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    signup,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
