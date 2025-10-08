const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: [],
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  addedAt: { type: Date, default: Date.now },
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    sessionId: { type: String },
    items: [cartItemSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", cartSchema);
