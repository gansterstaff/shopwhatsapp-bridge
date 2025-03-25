
import { Product } from './types';

export const products: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Earbuds",
    description: "Experience superior sound quality with our premium wireless earbuds. Perfect for music enthusiasts and professionals alike.",
    price: 129.99,
    oldPrice: 159.99,
    discount: 19,
    image: "https://images.unsplash.com/photo-1590658609974-521597af1fae?q=80&w=1000&auto=format&fit=crop",
    category: "Audio",
    stock: 15,
    featured: true
  },
  {
    id: 2,
    name: "Smart Watch Series 5",
    description: "Stay connected and track your fitness with our latest smart watch. Features include heart rate monitoring, GPS, and more.",
    price: 249.99,
    oldPrice: 299.99,
    discount: 17,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1000&auto=format&fit=crop",
    category: "Wearables",
    stock: 10,
    featured: true
  },
  {
    id: 3,
    name: "Ultra Slim Laptop",
    description: "Powerful performance in a sleek design. Perfect for work and entertainment on the go.",
    price: 999.99,
    oldPrice: 1199.99,
    discount: 17,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1000&auto=format&fit=crop",
    category: "Computers",
    stock: 5,
    featured: true
  },
  {
    id: 4,
    name: "Professional Camera Kit",
    description: "Capture stunning photos and videos with our professional camera kit. Includes lens, tripod, and carrying case.",
    price: 799.99,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop",
    category: "Photography",
    stock: 3,
    featured: false
  },
  {
    id: 5,
    name: "Noise-Cancelling Headphones",
    description: "Immerse yourself in your music with our premium noise-cancelling headphones. Perfect for travel and daily commutes.",
    price: 199.99,
    oldPrice: 249.99,
    discount: 20,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000&auto=format&fit=crop",
    category: "Audio",
    stock: 8,
    featured: true
  },
  {
    id: 6,
    name: "Home Security Camera",
    description: "Keep your home safe with our advanced security camera. Features include motion detection, night vision, and mobile alerts.",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?q=80&w=1000&auto=format&fit=crop",
    category: "Security",
    stock: 12,
    featured: false
  }
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};
