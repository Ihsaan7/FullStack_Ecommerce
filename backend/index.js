import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import startDB from "./db/db.js";
import authRoutes from "./routes/auth.js";
import cartRoutes from "./routes/cart.js";
import auth from "./middleware/auth.js";

dotenv.config({
  path: "../.env.development",
});
const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser()); // Parse cookies before auth middleware
// attach auth middleware to populate req.user when a valid token is present
app.use(auth);
app.use(morgan("dev"));

startDB();

app.use("/", authRoutes);
app.use("/auth", authRoutes);
app.use("/cart", cartRoutes);

app.listen(process.env.PORT || 8000, () =>
  console.log(`Server running on ${process.env.PORT || 8000}`)
);
