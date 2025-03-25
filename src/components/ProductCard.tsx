
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ShoppingCart, ExternalLink } from 'lucide-react';
import type { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const { id, name, price, oldPrice, discount, image, category } = product;
  
  return (
    <div 
      className={cn(
        "product-card group relative rounded-xl overflow-hidden bg-white dark:bg-gray-900",
        "border border-border h-full",
        "transition-all duration-300 hover:shadow-lg",
        className
      )}
    >
      {/* Discount badge */}
      {discount && (
        <div className="absolute top-3 left-3 z-10 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
          {discount}% OFF
        </div>
      )}
      
      {/* Category tag */}
      <div className="absolute top-3 right-3 z-10 bg-secondary text-secondary-foreground text-xs font-medium px-2 py-1 rounded-full">
        {category}
      </div>
      
      {/* Product image */}
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="product-image w-full h-full object-cover"
        />
        
        {/* Overlay with quick actions */}
        <div className="product-overlay absolute inset-0 bg-black/20 flex items-center justify-center gap-2">
          <button 
            className={cn(
              "p-3 rounded-full bg-white text-primary shadow-sm",
              "transition-all duration-300 hover:scale-105"
            )}
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
          
          <Link 
            to={`/products/${id}`}
            className={cn(
              "p-3 rounded-full bg-white text-primary shadow-sm",
              "transition-all duration-300 hover:scale-105"
            )}
            aria-label="View product"
          >
            <ExternalLink className="h-5 w-5" />
          </Link>
        </div>
      </div>
      
      {/* Product info */}
      <div className="p-4">
        <h3 className="font-medium text-base mb-1 line-clamp-1">
          <Link to={`/products/${id}`} className="hover:text-primary transition-colors">
            {name}
          </Link>
        </h3>
        
        <div className="flex items-center gap-2">
          <span className="font-semibold">${price.toFixed(2)}</span>
          {oldPrice && (
            <span className="text-muted-foreground text-sm line-through">
              ${oldPrice.toFixed(2)}
            </span>
          )}
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <button 
            className={cn(
              "text-xs font-medium px-3 py-1.5 rounded-full",
              "bg-primary text-primary-foreground",
              "transition-all duration-300 hover:bg-primary/90"
            )}
          >
            Add to Cart
          </button>
          
          <a 
            href={`https://wa.me/1234567890?text=I'm%20interested%20in%20${encodeURIComponent(name)}%20for%20$${price}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className={cn(
              "text-xs font-medium px-3 py-1.5 rounded-full",
              "bg-[#25D366] text-white",
              "transition-all duration-300 hover:bg-[#25D366]/90"
            )}
          >
            Buy on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
