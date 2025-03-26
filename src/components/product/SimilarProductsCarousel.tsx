
import React from 'react';
import { Product } from '@/lib/types';
import SimilarProductCard from './SimilarProductCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface SimilarProductsCarouselProps {
  title: string;
  products: Product[];
  onProductSelect: () => void;
}

const SimilarProductsCarousel: React.FC<SimilarProductsCarouselProps> = ({ 
  title, 
  products,
  onProductSelect
}) => {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-medium">{title}</h3>
      </div>
      <div className="relative">
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {products.map((item) => (
              <CarouselItem key={`${title}-${item.id}`} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3">
                <SimilarProductCard product={item} onNavigate={onProductSelect} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute -left-4 top-1/3 transform -translate-y-1/2" />
          <CarouselNext className="absolute -right-4 top-1/3 transform -translate-y-1/2" />
        </Carousel>
      </div>
    </div>
  );
};

export default SimilarProductsCarousel;
