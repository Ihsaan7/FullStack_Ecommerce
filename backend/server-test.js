#!/usr/bin/env node
// Simple standalone test server to verify Express and routing work
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const app = express();
const PORT = 8000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// Health endpoints
app.get("/", (req, res) => {
  res.json({ message: "E-Commerce API is running!", status: "healthy" });
});

app.get("/api", (req, res) => {
  res.json({ message: "E-Commerce API is running!", status: "healthy" });
});

// Test auth endpoint (no DB)
app.get("/auth/me", (req, res) => {
  res.json({
    user: null,
    authenticated: false,
    message: "No user authenticated",
  });
});

app.post("/auth/login", (req, res) => {
  res.json({
    success: false,
    message: "Login endpoint not implemented (no DB)",
  });
});

app.listen(PORT, () => {
  console.log(`✅ Test server running on http://localhost:${PORT}`);
});
