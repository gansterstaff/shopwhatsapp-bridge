
import React from 'react';
import { Star } from "lucide-react";
import { Product } from '@/lib/types';

interface ProductInfoProps {
  product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  return (
    <>
      <h3 className="font-medium text-lg">{product.name}</h3>
      
      <div className="flex items-center mt-1 mb-2">
        <div className="flex text-yellow-400">
          <Star className="h-4 w-4 fill-current" />
          <Star className="h-4 w-4 fill-current" />
          <Star className="h-4 w-4 fill-current" />
          <Star className="h-4 w-4 fill-current" />
          <Star className="h-4 w-4" />
        </div>
        <span className="text-xs text-muted-foreground ml-1">4.0 (24 reseñas)</span>
      </div>
      
      <div className="flex items-center gap-2 my-2">
        <span className="font-semibold text-lg">${product.price.toFixed(2)}</span>
        {product.oldPrice && (
          <span className="text-muted-foreground text-sm line-through">
            ${product.oldPrice.toFixed(2)}
          </span>
        )}
      </div>
      
      <p className="text-sm text-gray-600 my-2 line-clamp-3">{product.description}</p>
      
      {/* Product Specifications */}
      <div className="border border-gray-100 rounded bg-gray-50 p-3 my-2">
        <h4 className="text-sm font-medium mb-1">Especificaciones:</h4>
        <ul className="text-xs space-y-1 text-gray-600">
          <li>• Marca: {product.name.split(' ')[0]}</li>
          <li>• Garantía: 12 meses</li>
          <li>• Condición: Nuevo</li>
          <li>• Stock: {product.stock} unidades</li>
        </ul>
      </div>
    </>
  );
};

export default ProductInfo;
