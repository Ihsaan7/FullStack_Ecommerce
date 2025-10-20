import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  images: { type: [String], default: [] },
  category: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// Add a virtual property to match frontend expectations (category.name)
productSchema.virtual('_category').get(function() {
  return { name: this.category };
});

// Convert to JSON with proper formatting
productSchema.set('toJSON', { virtuals: true });

export default mongoose.model("Product", productSchema);
