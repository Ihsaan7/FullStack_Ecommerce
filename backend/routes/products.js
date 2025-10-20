import express from "express";
import Product from "../models/product.js";

const router = express.Router();

// GET /products - list recent products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).limit(100).lean();
    
    console.log(`[DEBUG] Found ${products.length} products`);
    if (products.length > 0) {
      console.log(`[DEBUG] First product:`, JSON.stringify(products[0], null, 2));
    }
    
    // Transform products to include category as object for frontend
    const transformedProducts = products.map((prod) => ({
      _id: prod._id,
      id: prod._id.toString(),
      title: prod.title,
      price: prod.price,
      images: prod.images && prod.images.length > 0 ? prod.images : ["https://placehold.co/600x400?text=No+Image"],
      category: { name: prod.category || "Uncategorized" },
      description: prod.description,
      createdAt: prod.createdAt,
    }));
    
    console.log(`[DEBUG] Transformed first product:`, JSON.stringify(transformedProducts[0], null, 2));
    res.json(transformedProducts);
  } catch (err) {
    console.error("Products list error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET /products/:id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    if (!product) return res.status(404).json({ message: "Not found" });
    
    // Transform to include category as object
    const transformed = {
      _id: product._id,
      id: product._id.toString(),
      title: product.title,
      price: product.price,
      images: product.images && product.images.length > 0 ? product.images : ["https://placehold.co/600x400?text=No+Image"],
      category: { name: product.category || "Uncategorized" },
      description: product.description,
      createdAt: product.createdAt,
    };
    
    res.json(transformed);
  } catch (err) {
    console.error("Product fetch error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
