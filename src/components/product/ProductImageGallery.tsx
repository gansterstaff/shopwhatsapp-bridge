
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Percent } from "lucide-react";

interface ProductImageGalleryProps {
  image: string;
  name: string;
  discount?: number;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ 
  image, 
  name, 
  discount 
}) => {
  return (
    <div className="relative">
      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-contain p-4"
        />
      </div>
      {discount && (
        <Badge variant="destructive" className="absolute top-2 left-2 flex items-center gap-1">
          <Percent className="h-3 w-3" />
          {discount}% DESCUENTO
        </Badge>
      )}
    </div>
  );
};

export default ProductImageGallery;
