import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  productId: { type: String, required: true }, // from external API
  quantity: { type: Number, default: 1 },
  addedAt: { type: Date, default: Date.now },
});

const addressSchema = new mongoose.Schema({
  city: { type: String, required: true },
  country: { type: String, required: true },
  isDefault: { type: Boolean, default: false },
});

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    fullName: { type: String, required: true, trim: true },
    addresses: [addressSchema],
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isActive: { type: Boolean, default: true },
    cart: [cartItemSchema],

    // Optional: legacy or wishlist product IDs
    favourite: [String],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
