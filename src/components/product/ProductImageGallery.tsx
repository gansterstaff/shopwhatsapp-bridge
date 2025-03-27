
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
  additionalImages?: string[]; // Optional additional images for the carousel
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
  
  // Combine main image with additional images if any
  const allImages = [image, ...additionalImages].filter(Boolean);
  
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
      {/* Main image container */}
      <div className="relative overflow-hidden rounded-lg mb-4 bg-gray-50">
        <div 
          className={`aspect-square flex items-center justify-center overflow-hidden transition-all duration-300 cursor-zoom-in ${zoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
          onClick={toggleZoom}
        >
          <img 
            src={currentImage} 
            alt={name} 
            className={`object-contain p-4 transition-transform duration-300 ${zoomed ? 'scale-150' : 'scale-100'}`}
            loading="lazy"
          />
        </div>
        
        {/* Action buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8 rounded-full bg-white hover:bg-white/90"
            onClick={toggleLike}
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
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Discount badge */}
        {discount && (
          <Badge variant="destructive" className="absolute top-3 left-3 flex items-center gap-1">
            <Percent className="h-3 w-3" />
            {discount}% DESCUENTO
          </Badge>
        )}
      </div>
      
      {/* Thumbnails carousel */}
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
                <CarouselItem key={index} className="basis-1/5">
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
