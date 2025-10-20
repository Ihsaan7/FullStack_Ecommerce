import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  images: { type: [String], default: [] },
  category: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Product", productSchema);
