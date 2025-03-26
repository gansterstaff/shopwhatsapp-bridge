
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Product } from '@/lib/types';

interface SimilarProductCardProps {
  product: Product;
  onNavigate: () => void;
}

const SimilarProductCard: React.FC<SimilarProductCardProps> = ({ product, onNavigate }) => {
  // Format price with currency
  const formatPrice = (price: number) => {
    return `S/ ${price.toFixed(2)}`;
  };

  // Calculate discount percentage
  const calculateDiscountPercentage = (oldPrice: number, currentPrice: number) => {
    if (!oldPrice || oldPrice <= currentPrice) return null;
    return Math.round(((oldPrice - currentPrice) / oldPrice) * 100);
  };

  return (
    <Link 
      to={`/product/${product.id}`}
      onClick={onNavigate}
      className="block border rounded-lg p-3 h-full hover:shadow-md transition-shadow"
    >
      <div className="aspect-square mb-2 relative overflow-hidden bg-gray-50 rounded flex items-center justify-center p-2">
        <img 
          src={product.image} 
          alt={product.name} 
          className="object-contain h-full w-full"
        />
        {product.discount && (
          <Badge variant="destructive" className="absolute top-1 right-1 text-xs">
            -{product.discount}%
          </Badge>
        )}
      </div>
      <div className="text-center">
        <p className="text-xs text-gray-500 uppercase mb-1 truncate">{product.name.split(' ')[0]}</p>
        <h4 className="text-sm font-medium mb-1 line-clamp-2 h-10">{product.name}</h4>
        <div className="flex items-center justify-center text-yellow-400 mb-1">
          <Star className="h-3 w-3 fill-current" />
          <Star className="h-3 w-3 fill-current" />
          <Star className="h-3 w-3 fill-current" />
          <Star className="h-3 w-3 fill-current" />
          <Star className="h-3 w-3 fill-current" />
          <span className="text-xs text-gray-500 ml-1">(5)</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-sm">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="text-gray-500 text-xs line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SimilarProductCard;
