import axios from "axios";

// Use /api prefix for all requests - Vercel will proxy to backend
const API_URL = "/api";

export const baseApi = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for cookies
});
