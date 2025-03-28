
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PromotionalBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-primary py-2 px-4 text-primary-foreground relative z-40">
      <div className="container mx-auto flex items-center justify-center">
        <p className="text-center text-sm md:text-base flex-1">
          <span className="font-bold">¡Oferta especial!</span>{' '}
          Usa el código <span className="font-bold">WELCOME20</span> para obtener un 20% de descuento en tu primera compra
        </p>
        <Button 
          variant="ghost" 
          size="icon"
          className="text-primary-foreground hover:bg-primary/90"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Cerrar</span>
        </Button>
      </div>
    </div>
  );
};

export default PromotionalBanner;
