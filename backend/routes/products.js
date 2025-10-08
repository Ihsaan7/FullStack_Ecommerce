import express from "express";
import Product from "../models/product.js";

const router = express.Router();

// GET /products - list recent products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).limit(100);
    res.json(products);
  } catch (err) {
    console.error("Products list error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /products/:id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });
    res.json(product);
  } catch (err) {
    console.error("Product fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
