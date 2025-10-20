import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import startDB from "./db/db.js";
import authRoutes from "./routes/auth.js";
import cartRoutes from "./routes/cart.js";
import productsRoutes from "./routes/products.js";
import auth from "./middleware/auth.js";

// Load environment variables
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "../.env.development" });
}

const app = express();

// CORS configuration - allow multiple origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://your-app.vercel.app", // Will be updated after deployment
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.indexOf(origin) !== -1 ||
        process.env.NODE_ENV === "development"
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
// attach auth middleware to populate req.user when a valid token is present
app.use(auth);
app.use(morgan("dev"));

// Initialize database connection
startDB().catch((err) => {
  console.error("Fatal error during DB initialization:", err);
  // Don't exit - continue running without DB
});

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ message: "E-Commerce API is running!", status: "healthy" });
});

app.get("/api", (req, res) => {
  res.json({ message: "E-Commerce API is running!", status: "healthy" });
});

// API Routes
app.use("/auth", authRoutes);
app.use("/api/auth", authRoutes);
app.use("/cart", cartRoutes);
app.use("/api/cart", cartRoutes);
app.use("/products", productsRoutes);
app.use("/api/products", productsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Something went wrong!", error: err.message });
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  // Don't exit process
});

// For local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 8000;
  const server = app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });

  // Handle server errors
  server.on("error", (err) => {
    console.error("Server error:", err);
  });
}

// Export for Vercel serverless
export default app;
