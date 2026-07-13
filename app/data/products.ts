export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  inStock: boolean;
  rating: number;
  image: string;
}

export const products: Product[] = [
  // Electronics
  {
    id: 1,
    name: "iPhone 15 Pro",
    category: "Electronics",
    price: 999,
    description: "Apple A17 Pro, 256GB",
    inStock: true,
    rating: 4.8,
    image: "https://placehold.co/400x400?text=iPhone+15+Pro",
  },
  {
    id: 2,
    name: "Samsung Galaxy S24",
    category: "Electronics",
    price: 899,
    description: "Snapdragon 8 Gen 3",
    inStock: true,
    rating: 4.7,
    image: "https://placehold.co/400x400?text=Galaxy+S24",
  },
  {
    id: 3,
    name: "MacBook Air M2",
    category: "Electronics",
    price: 1099,
    description: "Apple M2 Chip",
    inStock: true,
    rating: 4.9,
    image: "https://placehold.co/400x400?text=MacBook+Air",
  },
  {
    id: 4,
    name: "Sony WH-1000XM5",
    category: "Electronics",
    price: 349,
    description: "Noise Cancelling Headphones",
    inStock: true,
    rating: 4.8,
    image: "https://placehold.co/400x400?text=Sony+XM5",
  },

  // Clothing
  {
    id: 5,
    name: "Levi's Jeans",
    category: "Clothing",
    price: 69,
    description: "Slim Fit Denim",
    inStock: true,
    rating: 4.4,
    image: "https://placehold.co/400x400?text=Levis+Jeans",
  },
  {
    id: 6,
    name: "Adidas Hoodie",
    category: "Clothing",
    price: 75,
    description: "Premium Cotton Hoodie",
    inStock: true,
    rating: 4.5,
    image: "https://placehold.co/400x400?text=Adidas+Hoodie",
  },
  {
    id: 7,
    name: "Nike Sports T-Shirt",
    category: "Clothing",
    price: 40,
    description: "Dry-Fit Running Tee",
    inStock: true,
    rating: 4.3,
    image: "https://placehold.co/400x400?text=Nike+Tshirt",
  },

  // Shoes
  {
    id: 8,
    name: "Nike Air Max",
    category: "Shoes",
    price: 150,
    description: "Running Shoes",
    inStock: true,
    rating: 4.6,
    image: "https://placehold.co/400x400?text=Nike+Air+Max",
  },
  {
    id: 9,
    name: "Adidas Ultraboost",
    category: "Shoes",
    price: 180,
    description: "Comfort Running Shoes",
    inStock: true,
    rating: 4.7,
    image: "https://placehold.co/400x400?text=Ultraboost",
  },

  // Watches
  {
    id: 10,
    name: "Apple Watch Series 9",
    category: "Watches",
    price: 399,
    description: "GPS Smart Watch",
    inStock: true,
    rating: 4.8,
    image: "https://placehold.co/400x400?text=Apple+Watch",
  },
  {
    id: 11,
    name: "Samsung Galaxy Watch 6",
    category: "Watches",
    price: 299,
    description: "WearOS Smartwatch",
    inStock: true,
    rating: 4.6,
    image: "https://placehold.co/400x400?text=Galaxy+Watch",
  },

  // Gaming
  {
    id: 12,
    name: "PlayStation 5",
    category: "Gaming",
    price: 499,
    description: "Sony Console",
    inStock: true,
    rating: 4.9,
    image: "https://placehold.co/400x400?text=PlayStation+5",
  },
  {
    id: 13,
    name: "Xbox Series X",
    category: "Gaming",
    price: 499,
    description: "Microsoft Console",
    inStock: true,
    rating: 4.8,
    image: "https://placehold.co/400x400?text=Xbox+Series+X",
  },

  // Home
  {
    id: 14,
    name: "Coffee Maker",
    category: "Home",
    price: 89,
    description: "12 Cup Coffee Machine",
    inStock: true,
    rating: 4.2,
    image: "https://placehold.co/400x400?text=Coffee+Maker",
  },
  {
    id: 15,
    name: "Air Fryer",
    category: "Home",
    price: 129,
    description: "5L Digital Air Fryer",
    inStock: true,
    rating: 4.6,
    image: "https://placehold.co/400x400?text=Air+Fryer",
  },

  // Books
  {
    id: 16,
    name: "Atomic Habits",
    category: "Books",
    price: 19,
    description: "James Clear",
    inStock: true,
    rating: 4.9,
    image: "https://placehold.co/400x400?text=Atomic+Habits",
  },

  // Beauty
  {
    id: 17,
    name: "Nivea Face Wash",
    category: "Beauty",
    price: 12,
    description: "Daily Face Cleanser",
    inStock: true,
    rating: 4.5,
    image: "https://placehold.co/400x400?text=Nivea+Face+Wash",
  },

  // Sports
  {
    id: 18,
    name: "Football",
    category: "Sports",
    price: 29,
    description: "FIFA Size 5 Ball",
    inStock: true,
    rating: 4.4,
    image: "https://placehold.co/400x400?text=Football",
  },

  // Furniture
  {
    id: 19,
    name: "Gaming Chair",
    category: "Furniture",
    price: 220,
    description: "Ergonomic RGB Chair",
    inStock: true,
    rating: 4.7,
    image: "https://placehold.co/400x400?text=Gaming+Chair",
  },

  // Accessories
  {
    id: 20,
    name: "Wireless Mouse",
    category: "Accessories",
    price: 35,
    description: "Bluetooth Mouse",
    inStock: true,
    rating: 4.4,
    image: "https://placehold.co/400x400?text=Wireless+Mouse",
  },
];