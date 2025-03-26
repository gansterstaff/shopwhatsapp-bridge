
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
    <div className="relative overflow-hidden rounded-lg">
      <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-contain p-4"
          loading="lazy"
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
