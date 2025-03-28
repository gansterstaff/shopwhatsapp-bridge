
import React, { useState } from 'react';
import { 
  AlertDialog, 
  AlertDialogContent, 
  AlertDialogHeader, 
  AlertDialogTitle,
  AlertDialogFooter
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Product } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';

interface BannerProductDialogProps {
  product: Product;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const BannerProductDialog: React.FC<BannerProductDialogProps> = ({ 
  product, 
  isOpen, 
  onOpenChange 
}) => {
  const { addItem } = useCart();
  const [quantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addItem(product, quantity);
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  const handleViewDetails = () => {
    onOpenChange(false);
    navigate(`/product/${product.id}`);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-[500px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl">Oferta Especial</AlertDialogTitle>
        </AlertDialogHeader>
        
        <div className="grid md:grid-cols-2 gap-4 my-4">
          {/* Product image */}
          <div className="relative">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-auto rounded-md object-cover aspect-square"
            />
            {product.discount && (
              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {product.discount}% OFF
              </span>
            )}
          </div>
          
          {/* Product info */}
          <div className="flex flex-col">
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <div className="flex items-center mt-1 space-x-2">
              <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
              {product.oldPrice && (
                <span className="text-gray-400 line-through text-sm">${product.oldPrice.toFixed(2)}</span>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-2 line-clamp-3">{product.description}</p>
            
            <div className="mt-auto">
              <span className="font-medium text-sm">Código promocional:</span>
              <span className="font-bold text-sm bg-gray-100 px-2 py-1 rounded ml-2">WELCOME20</span>
            </div>
          </div>
        </div>
        
        <Separator />
        
        <p className="text-sm text-center my-2">
          Aprovecha esta oferta exclusiva con 20% de descuento en tu primera compra
        </p>
        
        <AlertDialogFooter className="gap-2 sm:gap-0">
          <Button 
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cerrar
          </Button>
          
          <Button 
            variant="outline"
            onClick={handleViewDetails}
          >
            Ver detalles
          </Button>
          
          <Button 
            onClick={handleAddToCart}
            disabled={isAddedToCart}
          >
            {isAddedToCart ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                ¡Añadido!
              </>
            ) : (
              "Añadir al carrito"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BannerProductDialog;
