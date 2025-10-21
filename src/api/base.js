import axios from "axios";

// In production, use environment variable for backend URL
// In development, use localhost
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const baseApi = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for cookies
});
