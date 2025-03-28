
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFeaturedProducts } from '@/hooks/useProducts';
import BannerProductDialog from './BannerProductDialog';

const PromotionalBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: featuredProducts, isLoading } = useFeaturedProducts();
  
  // Verificar en localStorage si el banner ya fue cerrado
  useEffect(() => {
    const bannerClosed = localStorage.getItem('promotionalBannerClosed');
    if (!bannerClosed) {
      setIsVisible(true);
    }
  }, []);

  const closeBanner = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
    // Guardar en localStorage que el banner fue cerrado
    localStorage.setItem('promotionalBannerClosed', 'true');
  };

  const handleBannerClick = () => {
    if (featuredProducts && featuredProducts.length > 0) {
      setIsDialogOpen(true);
    }
  };

  if (!isVisible || isLoading || !featuredProducts || featuredProducts.length === 0) return null;

  return (
    <>
      <div 
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-auto max-w-md z-50 animate-fade-in cursor-pointer"
        onClick={handleBannerClick}
      >
        <div className="bg-black text-white rounded-lg shadow-lg px-4 py-2 flex items-center justify-between">
          <p className="text-xs sm:text-sm">
            <span className="font-bold">¡Oferta especial!</span>{' '}
            Usa el código <span className="font-bold">WELCOME20</span> para obtener un 20% de descuento
          </p>
          <Button 
            variant="ghost" 
            size="icon"
            className="text-white hover:bg-white/10 h-6 w-6 ml-2"
            onClick={closeBanner}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Cerrar</span>
          </Button>
        </div>
      </div>

      {/* Product Dialog */}
      <BannerProductDialog
        product={featuredProducts[0]}
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </>
  );
};

export default PromotionalBanner;
