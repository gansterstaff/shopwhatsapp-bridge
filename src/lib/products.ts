
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
    featured: true,
    sku: "AUD-12345"
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
    featured: true,
    sku: "WEA-23456"
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
    featured: true,
    sku: "COM-34567"
  },
  {
    id: 4,
    name: "Professional Camera Kit",
    description: "Capture stunning photos and videos with our professional camera kit. Includes lens, tripod, and carrying case.",
    price: 799.99,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop",
    category: "Photography",
    stock: 3,
    featured: false,
    sku: "PHO-45678"
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
    featured: true,
    sku: "AUD-56789"
  },
  {
    id: 6,
    name: "Home Security Camera",
    description: "Keep your home safe with our advanced security camera. Features include motion detection, night vision, and mobile alerts.",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?q=80&w=1000&auto=format&fit=crop",
    category: "Security",
    stock: 12,
    featured: false,
    sku: "SEC-67890"
  },
  // Auto parts mock data
  {
    id: 7,
    name: "High Performance Brake Pads",
    description: "Premium ceramic brake pads for superior stopping power and reduced brake dust. Compatible with most modern vehicles.",
    price: 89.99,
    oldPrice: 119.99,
    discount: 25,
    image: "https://images.unsplash.com/photo-1582038279036-3d95a6f89ec9?q=80&w=1000&auto=format&fit=crop",
    category: "Brakes",
    stock: 20,
    featured: true,
    sku: "BRK-78901"
  },
  {
    id: 8,
    name: "LED Headlight Conversion Kit",
    description: "Upgrade your vehicle with our LED headlight conversion kit for brighter illumination and better nighttime visibility.",
    price: 129.99,
    oldPrice: 159.99,
    discount: 19,
    image: "https://images.unsplash.com/photo-1600661653561-629509216228?q=80&w=1000&auto=format&fit=crop",
    category: "Lighting",
    stock: 15,
    featured: true,
    sku: "LIG-89012"
  },
  {
    id: 9,
    name: "Premium Oil Filter",
    description: "High-quality oil filter designed to remove contaminants and extend engine life. Compatible with most vehicles.",
    price: 12.99,
    oldPrice: 16.99,
    discount: 24,
    image: "https://images.unsplash.com/photo-1636901942318-972ea62b4d5d?q=80&w=1000&auto=format&fit=crop",
    category: "Engine",
    stock: 50,
    featured: false,
    sku: "ENG-90123"
  },
  {
    id: 10,
    name: "Performance Air Intake System",
    description: "Increase horsepower and torque with our performance air intake system. Designed for easy installation.",
    price: 199.99,
    oldPrice: 249.99,
    discount: 20,
    image: "https://images.unsplash.com/photo-1659175323873-f8ad605cbf84?q=80&w=1000&auto=format&fit=crop",
    category: "Engine",
    stock: 8,
    featured: true,
    sku: "ENG-01234"
  },
  {
    id: 11,
    name: "Car Audio System",
    description: "Complete car audio system with subwoofer, amplifier, and speakers for an immersive sound experience.",
    price: 349.99,
    oldPrice: 449.99,
    discount: 22,
    image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=1000&auto=format&fit=crop",
    category: "Audio",
    stock: 6,
    featured: true,
    sku: "AUD-12346"
  },
  {
    id: 12,
    name: "All-Weather Floor Mats",
    description: "Protect your vehicle's interior with our durable all-weather floor mats. Custom fit for your specific make and model.",
    price: 79.99,
    oldPrice: 99.99,
    discount: 20,
    image: "https://images.unsplash.com/photo-1537019575197-56dc5197fe87?q=80&w=1000&auto=format&fit=crop",
    category: "Interior",
    stock: 30,
    featured: false,
    sku: "INT-23457"
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
