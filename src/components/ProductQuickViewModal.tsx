
import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Product } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import { useProducts } from '@/hooks/useProducts';

// Import our new component files
import ProductImageGallery from './product/ProductImageGallery';
import ProductInfo from './product/ProductInfo';
import QuantitySelector from './product/QuantitySelector';
import WarrantyOptions from './product/WarrantyOptions';
import ReturnPolicy from './product/ReturnPolicy';
import SimilarProductsCarousel from './product/SimilarProductsCarousel';
import WhatsAppButton from './product/WhatsAppButton';

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
  const [selectedWarranty, setSelectedWarranty] = useState<string>("none");
  const { data: allProducts, isLoading } = useProducts();
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (allProducts && product) {
      // Filter for similar products (same category, excluding current product)
      const filtered = allProducts.filter(p => 
        p.category === product.category && p.id !== product.id
      ).slice(0, 6); // Limit to 6 similar products
      setSimilarProducts(filtered);
    }
  }, [allProducts, product]);

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, Math.min(product.stock, prev + amount)));
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Detalles del Producto</DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-4 my-4">
          {/* Product image */}
          <ProductImageGallery 
            image={product.image} 
            name={product.name} 
            discount={product.discount} 
          />
          
          {/* Product info */}
          <div className="flex flex-col">
            <ProductInfo product={product} />
            
            <QuantitySelector 
              quantity={quantity} 
              stock={product.stock} 
              onQuantityChange={handleQuantityChange} 
            />
            
            <div className="mt-2">
              <span className="font-medium">Subtotal:</span>
              <span className="font-bold text-lg ml-2">${(product.price * quantity).toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <Separator />
        
        <WarrantyOptions 
          selectedWarranty={selectedWarranty} 
          onChange={setSelectedWarranty} 
        />
        
        <ReturnPolicy />
        
        {/* Similar Products Sections */}
        {similarProducts.length > 0 && (
          <>
            <SimilarProductsCarousel
              title="Varias personas después miran"
              products={similarProducts}
              onProductSelect={() => onOpenChange(false)}
            />
            
            <SimilarProductsCarousel
              title="Más opciones similares"
              products={similarProducts}
              onProductSelect={() => onOpenChange(false)}
            />
          </>
        )}
        
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
          
          <WhatsAppButton product={product} quantity={quantity} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductQuickViewModal;
