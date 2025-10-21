import { useLoaderData } from "react-router-dom";
import { getRecent } from "../api/product";

// Mock data as fallback
const mockProducts = [
  {
    id: 1,
    title: "Classic Blue T-Shirt",
    price: 19.99,
    images: ["https://placehold.co/600x400?text=Blue+T-Shirt"],
    category: { name: "T-Shirts" },
  },
  {
    id: 2,
    title: "Premium Red Hoodie",
    price: 39.99,
    images: ["https://placehold.co/600x400?text=Red+Hoodie"],
    category: { name: "Hoodies" },
  },
  {
    id: 3,
    title: "Air Max Sneakers",
    price: 59.99,
    images: ["https://placehold.co/600x400?text=Sneakers"],
    category: { name: "Shoes" },
  },
  {
    id: 4,
    title: "Cotton Baseball Cap",
    price: 14.99,
    images: ["https://placehold.co/600x400?text=Cap"],
    category: { name: "Accessories" },
  },
  {
    id: 5,
    title: "Vintage Denim Jacket",
    price: 79.99,
    images: ["https://placehold.co/600x400?text=Denim+Jacket"],
    category: { name: "Jackets" },
  },
  {
    id: 6,
    title: "White Polo Shirt",
    price: 34.99,
    images: ["https://placehold.co/600x400?text=Polo+Shirt"],
    category: { name: "Polo Shirts" },
  },
  {
    id: 7,
    title: "Black Tank Top",
    price: 16.99,
    images: ["https://placehold.co/600x400?text=Tank+Top"],
    category: { name: "Tank Tops" },
  },
  {
    id: 8,
    title: "Gray Crew Neck Sweatshirt",
    price: 44.99,
    images: ["https://placehold.co/600x400?text=Sweatshirt"],
    category: { name: "Sweatshirts" },
  },
  {
    id: 9,
    title: "Khaki Chinos",
    price: 54.99,
    images: ["https://placehold.co/600x400?text=Chinos"],
    category: { name: "Pants" },
  },
  {
    id: 10,
    title: "Leather Belt",
    price: 29.99,
    images: ["https://placehold.co/600x400?text=Belt"],
    category: { name: "Accessories" },
  },
  {
    id: 11,
    title: "Wool Beanie",
    price: 21.99,
    images: ["https://placehold.co/600x400?text=Beanie"],
    category: { name: "Hats" },
  },
  {
    id: 12,
    title: "Casual Oxford Shoes",
    price: 69.99,
    images: ["https://placehold.co/600x400?text=Oxford+Shoes"],
    category: { name: "Shoes" },
  },
  {
    id: 13,
    title: "Striped Button-Up Shirt",
    price: 39.99,
    images: ["https://placehold.co/600x400?text=Button+Up"],
    category: { name: "Shirts" },
  },
  {
    id: 14,
    title: "Summer Shorts",
    price: 24.99,
    images: ["https://placehold.co/600x400?text=Shorts"],
    category: { name: "Shorts" },
  },
  {
    id: 15,
    title: "Thermal Long Sleeve",
    price: 32.99,
    images: ["https://placehold.co/600x400?text=Thermal"],
    category: { name: "Long Sleeves" },
  },
  {
    id: 16,
    title: "Athletic Track Pants",
    price: 44.99,
    images: ["https://placehold.co/600x400?text=Track+Pants"],
    category: { name: "Pants" },
  },
  {
    id: 17,
    title: "Cotton Socks Pack",
    price: 12.99,
    images: ["https://placehold.co/600x400?text=Socks"],
    category: { name: "Accessories" },
  },
  {
    id: 18,
    title: "Wool Cardigan",
    price: 64.99,
    images: ["https://placehold.co/600x400?text=Cardigan"],
    category: { name: "Sweaters" },
  },
  {
    id: 19,
    title: "Denim Shorts",
    price: 34.99,
    images: ["https://placehold.co/600x400?text=Denim+Shorts"],
    category: { name: "Shorts" },
  },
  {
    id: 20,
    title: "Rain Jacket",
    price: 89.99,
    images: ["https://placehold.co/600x400?text=Rain+Jacket"],
    category: { name: "Jackets" },
  },
];

export function recentLoader({ request: { signal } }) {
  // Check if API URL is available
  if (!import.meta.env.VITE_API_URL) {
    console.warn("VITE_API_URL not set, using mock data");
    return Promise.resolve(mockProducts);
  }

  return getRecent({ signal }).catch((error) => {
    console.warn("API request failed, using mock data:", error);
    return mockProducts;
  });
}
