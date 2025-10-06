import { useLoaderData } from 'react-router-dom'
import { getRecent } from '../api/product'

// Mock data as fallback
const mockProducts = [
  {
    id: 1,
    title: "Classic Cotton T-Shirt",
    price: 29.99,
    images: ["/images/tshirt1.jpg"],
    category: { name: "T-Shirts" }
  },
  {
    id: 2,
    title: "Premium Polo Shirt",
    price: 49.99,
    images: ["/images/tshirt2.htm"],
    category: { name: "Polo Shirts" }
  },
  {
    id: 3,
    title: "Designer Hoodie",
    price: 79.99,
    images: ["/images/tshirt3.webp"],
    category: { name: "Hoodies" }
  },
  {
    id: 4,
    title: "Sporty Tank Top",
    price: 24.99,
    images: ["/images/tshirt4.jpg"],
    category: { name: "Tank Tops" }
  }
];

export function recentLoader({request : {signal}})
{
    // Check if API URL is available
    if (!import.meta.env.VITE_API_URL) {
        console.warn('VITE_API_URL not set, using mock data');
        return Promise.resolve(mockProducts);
    }
    
    return getRecent({signal})
        .catch(error => {
            console.warn('API request failed, using mock data:', error);
            return mockProducts;
        });
}

