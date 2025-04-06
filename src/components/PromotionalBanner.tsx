
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFeaturedProducts } from '@/hooks/useProducts';
import BannerProductDialog from './BannerProductDialog';
import { supabase } from '@/lib/supabase';

interface Banner {
  id: number;
  title: string;
  content: string;
  code?: string;
  discount?: number;
  active: boolean;
  background_color: string;
  text_color: string;
  image_url?: string;
}

const PromotionalBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [banner, setBanner] = useState<Banner | null>(null);
  const { data: featuredProducts, isLoading: productsLoading } = useFeaturedProducts();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadBanner = async () => {
      setIsLoading(true);
      
      // Verificar en localStorage si el banner ya fue cerrado
      const bannerClosed = localStorage.getItem('promotionalBannerClosed');
      if (bannerClosed) {
        setIsLoading(false);
        return;
      }
      
      try {
        // Obtener un banner activo
        const { data, error } = await supabase
          .from('promotional_banners')
          .select('*')
          .eq('active', true)
          .order('id', { ascending: false })
          .limit(1)
          .single();
        
        if (error && error.code !== 'PGRST116') { // PGRST116 es "no se encontraron resultados"
          console.error('Error al cargar banner:', error);
        }
        
        if (data) {
          setBanner(data);
          setIsVisible(true);
        }
      } catch (e) {
        console.error('Error cargando banner:', e);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadBanner();
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

  if (isLoading || !isVisible || productsLoading || !featuredProducts || featuredProducts.length === 0 || !banner) {
    return null;
  }

  return (
    <>
      <div 
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-auto max-w-md z-50 animate-fade-in cursor-pointer"
        onClick={handleBannerClick}
      >
        <div 
          className="rounded-lg shadow-lg px-4 py-2 flex items-center justify-between"
          style={{
            backgroundColor: banner.background_color,
            color: banner.text_color
          }}
        >
          {banner.image_url && (
            <div className="mr-2 h-10 w-10">
              <img 
                src={banner.image_url} 
                alt={banner.title} 
                className="h-full w-full object-cover rounded"
              />
            </div>
          )}
          <p className="text-xs sm:text-sm">
            <span className="font-bold">{banner.title}</span>{' '}
            {banner.content}
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
