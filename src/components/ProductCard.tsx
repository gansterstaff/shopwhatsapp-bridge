
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ExternalLink, Star, Percent } from 'lucide-react';
import type { Product } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import ProductQuickViewModal from './ProductQuickViewModal';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const { id, name, price, oldPrice, discount, image, category } = product;
  const { addItem } = useCart();
  const { toast } = useToast();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  // WhatsApp message generator
  const generateWhatsAppLink = (product: Product) => {
    const message = `Hola, estoy interesado en comprar el producto: *${product.name}* por $${product.price}. ¿Podría darme más información?`;
    return `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
  };
  
  return (
    <>
      <div 
        className={cn(
          "product-card group relative rounded-xl overflow-hidden bg-white dark:bg-gray-900",
          "border border-border h-full",
          "transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
          className
        )}
      >
        {/* Discount badge */}
        {discount && (
          <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
            <Percent className="h-3 w-3" />
            {discount}% DESCUENTO
          </div>
        )}
        
        {/* Category tag */}
        <div className="absolute top-3 right-3 z-10 bg-secondary text-secondary-foreground text-xs font-medium px-2 py-1 rounded-full">
          {category}
        </div>
        
        {/* Product image */}
        <div className="relative aspect-square overflow-hidden bg-muted/50">
          <img 
            src={image} 
            alt={name} 
            className="product-image w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Overlay with only the "View Product" action */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity duration-300">
            <Link 
              to={`/product/${id}`}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "p-3 rounded-full bg-white text-primary shadow-sm",
                "transition-all duration-300 hover:scale-105"
              )}
              aria-label="Ver producto"
            >
              <ExternalLink className="h-5 w-5" />
            </Link>
          </div>
        </div>
        
        {/* Product info */}
        <div className="p-4">
          <div className="flex items-center mb-1">
            <div className="flex text-yellow-400">
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4" />
            </div>
            <span className="text-xs text-muted-foreground ml-1">4.0 (24 reseñas)</span>
          </div>
          
          <h3 className="font-medium text-base mb-1 line-clamp-1">
            <Link 
              to={`/product/${id}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-primary transition-colors"
            >
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
                "text-sm font-medium px-4 py-2 rounded-full",
                "bg-primary text-primary-foreground",
                "transition-all duration-300 hover:bg-primary/90"
              )}
              onClick={handleAddToCart}
            >
              Añadir al Carrito
            </button>
            
            <a 
              href={generateWhatsAppLink(product)}
              target="_blank" 
              rel="noopener noreferrer"
              className={cn(
                "text-sm font-medium px-4 py-2 rounded-full",
                "bg-[#25D366] text-white",
                "transition-all duration-300 hover:bg-[#25D366]/90"
              )}
            >
              Comprar Ahora
            </a>
          </div>
        </div>
      </div>

      {/* Product Quick View Modal */}
      <ProductQuickViewModal 
        product={product}
        isOpen={isQuickViewOpen}
        onOpenChange={setIsQuickViewOpen}
      />
    </>
  );
};

export default ProductCard;
