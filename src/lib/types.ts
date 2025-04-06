
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  image: string; // For backwards compatibility
  imageUrl?: string;
  imagePath?: string;
  imageBucket?: string;
  category: string;
  stock: number;
  featured: boolean;
  sku?: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'customer' | 'admin';
}

export interface CartItem {
  productId: number;
  quantity: number;
  product: Product;
}

export interface Order {
  id: string;
  userId: string;
  status: 'pending' | 'completed' | 'cancelled';
  total: number;
  items: OrderItem[];
  createdAt: string;
}

export interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
}
