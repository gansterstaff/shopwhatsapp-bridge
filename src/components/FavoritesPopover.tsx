
import React, { useState } from 'react';
import { Heart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Product } from '@/lib/types';
import { Link } from 'react-router-dom';

// Productos favoritos de ejemplo
const mockFavorites: (Product & { addedAt: string })[] = [
  {
    id: 1,
    name: 'Premium Wireless Earbuds',
    description: 'Experience superior sound quality with our premium wireless earbuds.',
    price: 129.99,
    oldPrice: 159.99,
    discount: 19,
    image: 'https://images.unsplash.com/photo-1590658609974-521597af1fae?q=80&w=1000&auto=format&fit=crop',
    category: 'Audio',
    stock: 15,
    featured: true,
    addedAt: '2024-07-09T14:30:00Z',
  },
  {
    id: 2,
    name: 'Smart Watch Series 5',
    description: 'Stay connected and track your fitness with our latest smart watch.',
    price: 249.99,
    oldPrice: 299.99,
    discount: 17,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1000&auto=format&fit=crop',
    category: 'Wearables',
    stock: 10,
    featured: true,
    addedAt: '2024-07-10T10:15:00Z',
  }
];

const FavoritesPopover: React.FC = () => {
  const [favorites, setFavorites] = useState<(Product & { addedAt: string })[]>(mockFavorites);

  const removeFavorite = (id: number) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Heart className="h-5 w-5" />
          {favorites.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {favorites.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b">
          <h3 className="font-medium">Mis Favoritos</h3>
        </div>
        <ScrollArea className="h-80">
          {favorites.length > 0 ? (
            <div>
              {favorites.map((product) => (
                <div key={product.id} className="p-4 border-b last:border-b-0">
                  <div className="flex gap-3">
                    <Link to={`/product/${product.id}`} className="flex-shrink-0">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <Link to={`/product/${product.id}`} className="font-medium text-sm hover:underline">
                          {product.name}
                        </Link>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 text-muted-foreground"
                          onClick={() => removeFavorite(product.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm font-medium text-primary mt-1">
                        ${product.price.toFixed(2)}
                        {product.oldPrice && (
                          <span className="text-muted-foreground line-through ml-2">
                            ${product.oldPrice.toFixed(2)}
                          </span>
                        )}
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" variant="default" asChild className="h-8">
                          <Link to={`/product/${product.id}`}>
                            Ver detalles
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-40 p-4">
              <Heart className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-muted-foreground text-center">Tu lista de favoritos está vacía</p>
              <Button asChild variant="link" className="mt-2">
                <Link to="/products">Explorar productos</Link>
              </Button>
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default FavoritesPopover;
