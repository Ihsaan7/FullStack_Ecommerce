import axios from "axios";

// Use /api in production (monorepo rewrites to backend); dev uses VITE_API_URL or localhost
const API_URL = import.meta.env.PROD
  ? "/api"
  : import.meta.env.VITE_API_URL || "http://localhost:8000";

export const baseApi = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for cookies
});
