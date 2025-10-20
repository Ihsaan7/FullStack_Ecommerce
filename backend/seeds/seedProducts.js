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
        title: "Classic Blue T-Shirt",
        price: 19.99,
        images: ["https://placehold.co/600x400?text=Blue+T-Shirt"],
        category: "T-Shirts",
      },
      {
        title: "Premium Red Hoodie",
        price: 39.99,
        images: ["https://placehold.co/600x400?text=Red+Hoodie"],
        category: "Hoodies",
      },
      {
        title: "Air Max Sneakers",
        price: 59.99,
        images: ["https://placehold.co/600x400?text=Sneakers"],
        category: "Shoes",
      },
      {
        title: "Cotton Baseball Cap",
        price: 14.99,
        images: ["https://placehold.co/600x400?text=Cap"],
        category: "Accessories",
      },
      {
        title: "Vintage Denim Jacket",
        price: 79.99,
        images: ["https://placehold.co/600x400?text=Denim+Jacket"],
        category: "Jackets",
      },
      {
        title: "White Polo Shirt",
        price: 34.99,
        images: ["https://placehold.co/600x400?text=Polo+Shirt"],
        category: "Polo Shirts",
      },
      {
        title: "Black Tank Top",
        price: 16.99,
        images: ["https://placehold.co/600x400?text=Tank+Top"],
        category: "Tank Tops",
      },
      {
        title: "Gray Crew Neck Sweatshirt",
        price: 44.99,
        images: ["https://placehold.co/600x400?text=Sweatshirt"],
        category: "Sweatshirts",
      },
      {
        title: "Khaki Chinos",
        price: 54.99,
        images: ["https://placehold.co/600x400?text=Chinos"],
        category: "Pants",
      },
      {
        title: "Leather Belt",
        price: 29.99,
        images: ["https://placehold.co/600x400?text=Belt"],
        category: "Accessories",
      },
      {
        title: "Wool Beanie",
        price: 21.99,
        images: ["https://placehold.co/600x400?text=Beanie"],
        category: "Hats",
      },
      {
        title: "Casual Oxford Shoes",
        price: 69.99,
        images: ["https://placehold.co/600x400?text=Oxford+Shoes"],
        category: "Shoes",
      },
      {
        title: "Striped Button-Up Shirt",
        price: 39.99,
        images: ["https://placehold.co/600x400?text=Button+Up"],
        category: "Shirts",
      },
      {
        title: "Summer Shorts",
        price: 24.99,
        images: ["https://placehold.co/600x400?text=Shorts"],
        category: "Shorts",
      },
      {
        title: "Thermal Long Sleeve",
        price: 32.99,
        images: ["https://placehold.co/600x400?text=Thermal"],
        category: "Long Sleeves",
      },
      {
        title: "Athletic Track Pants",
        price: 44.99,
        images: ["https://placehold.co/600x400?text=Track+Pants"],
        category: "Pants",
      },
      {
        title: "Cotton Socks Pack",
        price: 12.99,
        images: ["https://placehold.co/600x400?text=Socks"],
        category: "Accessories",
      },
      {
        title: "Wool Cardigan",
        price: 64.99,
        images: ["https://placehold.co/600x400?text=Cardigan"],
        category: "Sweaters",
      },
      {
        title: "Denim Shorts",
        price: 34.99,
        images: ["https://placehold.co/600x400?text=Denim+Shorts"],
        category: "Shorts",
      },
      {
        title: "Rain Jacket",
        price: 89.99,
        images: ["https://placehold.co/600x400?text=Rain+Jacket"],
        category: "Jackets",
      },
      {
        title: "Winter Scarf",
        price: 22.99,
        images: ["https://placehold.co/600x400?text=Scarf"],
        category: "Accessories",
      },
      {
        title: "Casual Loafers",
        price: 59.99,
        images: ["https://placehold.co/600x400?text=Loafers"],
        category: "Shoes",
      },
      {
        title: "Fleece Pullover",
        price: 49.99,
        images: ["https://placehold.co/600x400?text=Fleece"],
        category: "Sweatshirts",
      },
      {
        title: "Graphic Print T-Shirt",
        price: 24.99,
        images: ["https://placehold.co/600x400?text=Graphic+Tee"],
        category: "T-Shirts",
      },
      {
        title: "Formal Blazer",
        price: 129.99,
        images: ["https://placehold.co/600x400?text=Blazer"],
        category: "Jackets",
      },
      {
        title: "Slim Fit Jeans",
        price: 59.99,
        images: ["https://placehold.co/600x400?text=Slim+Jeans"],
        category: "Pants",
      },
      {
        title: "V-Neck Sweater",
        price: 44.99,
        images: ["https://placehold.co/600x400?text=V+Neck"],
        category: "Sweaters",
      },
      {
        title: "Crew Socks Bundle",
        price: 15.99,
        images: ["https://placehold.co/600x400?text=Crew+Socks"],
        category: "Accessories",
      },
      {
        title: "Windbreaker Jacket",
        price: 74.99,
        images: ["https://placehold.co/600x400?text=Windbreaker"],
        category: "Jackets",
      },
      {
        title: "Henley Shirt",
        price: 27.99,
        images: ["https://placehold.co/600x400?text=Henley"],
        category: "Shirts",
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
