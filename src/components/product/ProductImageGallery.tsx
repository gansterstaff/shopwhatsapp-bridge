
import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { HeartIcon, Percent, ZoomIn } from "lucide-react";

interface ProductImageGalleryProps {
  image: string;
  name: string;
  discount?: number;
  additionalImages?: string[]; // Imágenes adicionales para el carrusel
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ 
  image, 
  name, 
  discount,
  additionalImages = []
}) => {
  const [currentImage, setCurrentImage] = useState<string>(image);
  const [liked, setLiked] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  
  // Si no hay imágenes adicionales, generamos algunas variantes de la imagen principal
  const generateVariantImages = (mainImage: string): string[] => {
    // Simulamos variantes añadiendo parámetros de consulta a la URL original
    if (!additionalImages || additionalImages.length === 0) {
      return [
        `${mainImage}?variant=1`,
        `${mainImage}?variant=2`,
        `${mainImage}?variant=3`,
      ];
    }
    return [];
  };
  
  // Combinamos la imagen principal con imágenes adicionales o generadas
  const allImages = [
    image, 
    ...additionalImages,
    ...generateVariantImages(image)
  ].filter((img, index, self) => 
    self.indexOf(img) === index && Boolean(img)
  ).slice(0, 4); // Limitamos a 4 imágenes (principal + 3 adicionales)
  
  const handleThumbnailClick = (img: string) => {
    setCurrentImage(img);
  };
  
  const toggleLike = () => {
    setLiked(!liked);
  };
  
  const toggleZoom = () => {
    setZoomed(!zoomed);
  };
  
  return (
    <div className="w-full">
      {/* Contenedor de imagen principal */}
      <div className="relative overflow-hidden rounded-lg mb-4 bg-gray-50">
        <div 
          className={`aspect-square flex items-center justify-center overflow-hidden transition-all duration-300 ${zoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
          onClick={toggleZoom}
        >
          <img 
            src={currentImage} 
            alt={`${name} - Imagen principal`} 
            className={`object-contain p-4 transition-transform duration-300 ${zoomed ? 'scale-150' : 'scale-100'}`}
            loading="lazy"
          />
        </div>
        
        {/* Botones de acción */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8 rounded-full bg-white hover:bg-white/90"
            onClick={toggleLike}
            aria-label={liked ? "Quitar de favoritos" : "Añadir a favoritos"}
          >
            <HeartIcon 
              className={`h-4 w-4 ${liked ? 'fill-red-500 text-red-500' : ''}`} 
            />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8 rounded-full bg-white hover:bg-white/90"
            onClick={toggleZoom}
            aria-label={zoomed ? "Alejar imagen" : "Ampliar imagen"}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Insignia de descuento */}
        {discount && (
          <Badge variant="destructive" className="absolute top-3 left-3 flex items-center gap-1">
            <Percent className="h-3 w-3" />
            {discount}% DESCUENTO
          </Badge>
        )}
      </div>
      
      {/* Carrusel de miniaturas */}
      {allImages.length > 1 && (
        <div className="w-full px-4">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {allImages.map((img, index) => (
                <CarouselItem key={index} className="basis-1/4 md:basis-1/5">
                  <div 
                    className={`aspect-square bg-gray-50 rounded-lg overflow-hidden cursor-pointer border-2 ${currentImage === img ? 'border-primary' : 'border-transparent'}`}
                    onClick={() => handleThumbnailClick(img)}
                  >
                    <img 
                      src={img} 
                      alt={`${name} - Vista ${index + 1}`}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="h-8 w-8 -left-4" />
            <CarouselNext className="h-8 w-8 -right-4" />
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
