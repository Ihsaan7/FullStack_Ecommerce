import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/product.js";

dotenv.config({ path: "../.env.development" });

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to Mongo for seeding");

    const data = [
      {
        title: "Blue T-Shirt",
        price: 19.99,
        images: ["https://placehold.co/600x400?text=Blue+T-Shirt"],
        category: "Clothing",
      },
      {
        title: "Red Hoodie",
        price: 39.99,
        images: ["https://placehold.co/600x400?text=Red+Hoodie"],
        category: "Clothing",
      },
      {
        title: "Sneakers",
        price: 59.99,
        images: ["https://placehold.co/600x400?text=Sneakers"],
        category: "Shoes",
      },
      {
        title: "Baseball Cap",
        price: 14.99,
        images: ["https://placehold.co/600x400?text=Cap"],
        category: "Accessories",
      },
      {
        title: "Denim Jacket",
        price: 79.99,
        images: ["https://placehold.co/600x400?text=Denim+Jacket"],
        category: "Clothing",
      },
    ];

    await Product.deleteMany({});
    await Product.insertMany(data);
    console.log("Seeded products.");
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
}

seed();
