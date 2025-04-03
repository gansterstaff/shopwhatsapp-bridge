
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";

const FestiveBanner: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the banner has been closed before
    const bannerClosed = localStorage.getItem('festiveBannerClosed');
    
    if (!bannerClosed) {
      // Only show the banner if it hasn't been closed before
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Store in localStorage that the banner has been closed
    localStorage.setItem('festiveBannerClosed', 'true');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden border-2 border-primary/20 bg-gradient-to-b from-background to-secondary/30">
        <div className="relative">
          <div className="absolute top-2 right-2 z-10">
            <DialogClose asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full hover:bg-primary/10"
                onClick={handleClose}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Cerrar</span>
              </Button>
            </DialogClose>
          </div>
          
          <div className="p-6 sm:p-8">
            <div className="text-center mb-4">
              <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-2">
                ¡Comunicado Especial!
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold">
                ¡Celebra con Nosotros el Día de las Madres!
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground">
                  Este 10 de mayo, queremos honrar a todas las madres con productos especiales 
                  que harán de su día algo inolvidable.
                </p>
                <p className="text-lg text-muted-foreground">
                  ShopWhats se une a esta celebración ofreciendo envío gratuito en todas 
                  tus compras hasta el 10 de mayo.
                </p>
                <div className="mt-6">
                  <Button 
                    className="w-full sm:w-auto"
                    onClick={handleClose}
                  >
                    Descubrir Productos
                  </Button>
                </div>
              </div>
              <div className="relative aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1520810627419-35e362c5dc07?q=80&w=1470&auto=format&fit=crop"
                  alt="Día de las madres"
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
                <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                  10 de Mayo
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FestiveBanner;
