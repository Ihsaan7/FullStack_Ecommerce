import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import startDB from "./db/db.js";

dotenv.config({
  path: "../.env.development",
});
const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

startDB();

app.get("/", (req, res) => {
  res.send("WORKING");
});

app.listen(process.env.PORT, () =>
  console.log(`Server is running at ${process.env.PORT}`)
);
