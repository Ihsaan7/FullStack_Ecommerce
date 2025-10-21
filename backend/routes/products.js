import express from "express";

const router = express.Router();

const FAKE_STORE_API = "https://fakestoreapi.com/products";

// GET /products - fetch from Fake Store API
router.get("/", async (req, res) => {
  try {
    console.log("[DEBUG] Fetching products from Fake Store API...");

    const response = await fetch(FAKE_STORE_API);
    if (!response.ok) {
      throw new Error(`API responded with ${response.status}`);
    }

    const products = await response.json();
    console.log(`[DEBUG] Found ${products.length} products from API`);

    // Transform products to match frontend expectations
    const transformedProducts = products.map((prod) => ({
      id: prod.id.toString(),
      _id: prod.id.toString(),
      title: prod.title,
      price: prod.price,
      images: [prod.image], // Fake Store API has single image property
      category: { name: prod.category || "Uncategorized" },
      description: prod.description,
    }));

    if (transformedProducts.length > 0) {
      console.log(
        `[DEBUG] First product:`,
        JSON.stringify(transformedProducts[0], null, 2)
      );
    }

    res.json(transformedProducts);
  } catch (err) {
    console.error("Products list error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET /products/:id - fetch single product from Fake Store API
router.get("/:id", async (req, res) => {
  try {
    console.log(
      `[DEBUG] Fetching product ${req.params.id} from Fake Store API...`
    );

    const response = await fetch(`${FAKE_STORE_API}/${req.params.id}`);
    if (!response.ok) {
      if (response.status === 404) {
        return res.status(404).json({ message: "Product not found" });
      }
      throw new Error(`API responded with ${response.status}`);
    }

    const product = await response.json();

    // Transform to match frontend expectations
    const transformed = {
      id: product.id.toString(),
      _id: product.id.toString(),
      title: product.title,
      price: product.price,
      images: [product.image],
      category: { name: product.category || "Uncategorized" },
      description: product.description,
    };

    console.log(
      `[DEBUG] Product ${req.params.id}:`,
      JSON.stringify(transformed, null, 2)
    );
    res.json(transformed);
  } catch (err) {
    console.error("Product fetch error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
