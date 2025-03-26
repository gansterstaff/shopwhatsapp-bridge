
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Check, 
  MinusCircle, 
  PlusCircle, 
  Percent, 
  Star,
  RefreshCw
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Product } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ProductQuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({ 
  product, 
  isOpen, 
  onOpenChange 
}) => {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [showReturnInfo, setShowReturnInfo] = useState(false);

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, Math.min(product.stock, prev + amount)));
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  // Generate WhatsApp link
  const generateWhatsAppLink = (product: Product) => {
    const message = `Hola, estoy interesado en comprar ${quantity} unidad(es) del producto: *${product.name}* por $${(product.price * quantity).toFixed(2)}. ¿Podría darme más información?`;
    return `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Detalles del Producto</DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-4 my-4">
          {/* Product image */}
          <div className="relative">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-contain p-4"
              />
            </div>
            {product.discount && (
              <Badge variant="destructive" className="absolute top-2 left-2 flex items-center gap-1">
                <Percent className="h-3 w-3" />
                {product.discount}% DESCUENTO
              </Badge>
            )}
          </div>
          
          {/* Product info */}
          <div className="flex flex-col">
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
            
            <div className="flex items-center my-2">
              <span className="text-sm mr-3">Cantidad:</span>
              <div className="flex items-center border rounded-md">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-none"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <MinusCircle className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{quantity}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-none"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stock}
                >
                  <PlusCircle className="h-4 w-4" />
                </Button>
              </div>
              <span className="text-xs text-gray-500 ml-3">Máximo {product.stock} unidades</span>
            </div>
            
            <div className="mt-2">
              <span className="font-medium">Subtotal:</span>
              <span className="font-bold text-lg ml-2">${(product.price * quantity).toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div className="my-4">
          <h4 className="font-medium mb-2">Extiende La Garantía Del Producto</h4>
          <div className="space-y-2">
            <div className="flex items-center border rounded-md p-2">
              <input 
                type="radio" 
                id="warranty-1" 
                name="warranty" 
                className="mr-2"
              />
              <label htmlFor="warranty-1" className="flex-1 text-sm">Garantía de 1 año: Reemplazo</label>
              <span className="text-sm font-medium">S/ 84</span>
            </div>
            
            <div className="flex items-center border rounded-md p-2 bg-amber-50">
              <input 
                type="radio" 
                id="warranty-2" 
                name="warranty" 
                className="mr-2"
              />
              <label htmlFor="warranty-2" className="flex-1 text-sm">Garantía de 2 años: Reemplazo</label>
              <span className="text-sm font-medium">S/ 192</span>
              <Badge variant="secondary" className="ml-2">Recomendado</Badge>
            </div>
            
            <div className="flex items-center border rounded-md p-2">
              <input 
                type="radio" 
                id="warranty-none" 
                name="warranty" 
                className="mr-2"
                defaultChecked
              />
              <label htmlFor="warranty-none" className="flex-1 text-sm">Sin garantía extendida</label>
            </div>
          </div>
        </div>
        
        {/* Return Policy */}
        <div className="my-4 border rounded-lg p-3">
          <button
            onClick={() => setShowReturnInfo(!showReturnInfo)}
            className="flex items-center text-sm font-medium text-primary hover:underline w-full"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Devolver es fácil y gratis - Conoce nuestra Satisfacción garantizada
          </button>
          
          {showReturnInfo && (
            <div className="mt-3 text-sm">
              <p className="mb-2">La mayoría de las autopartes tienen 30 días desde que las recibes para hacer una devolución.</p>
              <p className="mb-2 text-xs text-gray-600">Sin embargo, algunas categorías cuentan con plazos diferentes:</p>
              <ul className="text-xs text-gray-600 space-y-1 list-disc pl-4 mb-2">
                <li>7 días: electrónica automotriz, radios y sistemas GPS.</li>
                <li>15 días: partes mecánicas en empaque original.</li>
                <li>Sin devolución: baterías usadas, fluidos abiertos, partes instaladas.</li>
              </ul>
              <p className="text-xs text-gray-500 italic">Consulta nuestra política completa para más detalles.</p>
            </div>
          )}
        </div>
        
        <DialogFooter className="gap-2 sm:gap-0 mt-4">
          <Button 
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Seguir comprando
          </Button>
          
          <Button 
            onClick={handleAddToCart}
            disabled={isAddedToCart}
          >
            {isAddedToCart ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                ¡Añadido al carrito!
              </>
            ) : (
              "Ir al Carrito"
            )}
          </Button>
          
          <a 
            href={generateWhatsAppLink(product)}
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#25D366]/90 text-white px-4 py-2 rounded-md text-sm font-medium flex-1 sm:flex-none text-center"
          >
            Comprar por WhatsApp
          </a>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductQuickViewModal;
