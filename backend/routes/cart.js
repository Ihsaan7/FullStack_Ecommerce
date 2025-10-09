import express from "express";
import userModel from "../models/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// GET /cart - Fetch user's cart
router.get("/", auth, async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ success: false, message: "Please login!" });
    }

    const userDB = await userModel.findById(user._id);
    if (!userDB) {
      return res
        .status(401)
        .json({ success: false, message: "User not found!" });
    }

    const cartArray = Array.isArray(userDB.cart) ? userDB.cart : [];

    return res.status(200).json({
      success: true,
      cart: cartArray,
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

router.post("/add", auth, async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    if (!productId) {
      return res
        .status(400)
        .json({ success: false, message: "Product ID is required" });
    }

    // if no user on the request, return 401
    if (!user || !user._id) {
      console.log("No user or user._id found:", user);
      return res.status(401).json({ success: false, message: "Please login!" });
    }

    console.log("User authenticated with ID:", user._id);

    const userDB = await userModel.findById(user._id);
    if (!userDB) {
      return res
        .status(401)
        .json({ success: false, message: "User not found!" });
    }

    // 🔍 Check if product already exists in cart
    const cartArray = Array.isArray(userDB.cart) ? userDB.cart : [];
    const alreadyInCart = cartArray.some(
      (item) => String(item.productId) === String(productId)
    );

    if (alreadyInCart) {
      return res.status(409).json({
        success: false,
        message: "Product already exists in cart",
      });
    }

    // ✅ Add product to cart
    await userModel.updateOne(
      { _id: user._id },
      {
        $push: {
          cart: {
            productId,
            quantity: 1,
            addedAt: new Date(),
          },
        },
      }
    );

    return res.status(200).json({
      success: true,
      message: "Product added to cart successfully",
      productId,
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

// DELETE /cart/remove/:productId - Remove item from cart
router.delete("/remove/:productId", auth, async (req, res) => {
  try {
    const { productId } = req.params;
    const user = req.user;

    if (!user) {
      return res.status(401).json({ success: false, message: "Please login!" });
    }

    await userModel.updateOne(
      { _id: user._id },
      { $pull: { cart: { productId: productId } } }
    );

    return res.status(200).json({
      success: true,
      message: "Product removed from cart",
    });
  } catch (error) {
    console.error("Error removing from cart:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

// PUT /cart/update - Update item quantity
router.put("/update", auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const user = req.user;

    if (!user) {
      return res.status(401).json({ success: false, message: "Please login!" });
    }

    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      await userModel.updateOne(
        { _id: user._id },
        { $pull: { cart: { productId: productId } } }
      );
    } else {
      // Update quantity
      await userModel.updateOne(
        { _id: user._id, "cart.productId": productId },
        { $set: { "cart.$.quantity": quantity } }
      );
    }

    return res.status(200).json({
      success: true,
      message: "Cart updated successfully",
    });
  } catch (error) {
    console.error("Error updating cart:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

// DELETE /cart/clear - Clear entire cart
router.delete("/clear", auth, async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ success: false, message: "Please login!" });
    }

    await userModel.updateOne({ _id: user._id }, { $set: { cart: [] } });

    return res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
    });
  } catch (error) {
    console.error("Error clearing cart:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

export default router;
