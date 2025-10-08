import express from "express";
import userModel from "../models/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/add", auth, async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    if (!productId) {
      return res
        .status(400)
        .json({ success: false, message: "Product ID is required" });
    }
    console.log(user._id);
    // if no user on the request, return 401
    if (!user)
      return res.status(401).json({ success: false, message: "Please login!" });

    const userDB = await userModel.findById(user._id);
    if (!userDB) {
      return res.status(401).json({ success: false, message: "Please login!" });
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

export default router;
