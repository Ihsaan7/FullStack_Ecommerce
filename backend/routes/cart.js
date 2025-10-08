import express from "express";

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const { productId } = req.body;

    console.log("Received productId:", productId);

    // Validate productId
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    // TODO: Add your cart logic here
    // For now, just simulate adding to cart
    console.log(`Adding product ${productId} to cart`);

    // Send success response
    res.status(200).json({
      success: true,
      message: "Product added to cart successfully",
      productId: productId,
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

export default router;
