import axios from "axios";

// Auto-detect API URL based on environment
const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD ? "/api" : "http://localhost:8000");

export const baseApi = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for cookies
});
