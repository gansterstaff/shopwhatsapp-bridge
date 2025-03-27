
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, X } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: products, isLoading } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  
  // Filter products when search term changes
  useEffect(() => {
    if (!products) return;
    
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredProducts(filtered.slice(0, 5)); // Limit to 5 results
  }, [searchTerm, products]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                className="pl-10 pr-10 py-6"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={handleInputChange}
                autoFocus
              />
              {searchTerm && (
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setSearchTerm('')}
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="min-h-[200px]">
            {isLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-16 w-16 rounded-md" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            ) : searchTerm && filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[200px] text-center">
                <p className="text-gray-500 mb-2">No se encontraron productos que coincidan con "{searchTerm}"</p>
                <Button asChild variant="outline" size="sm">
                  <Link to="/products" onClick={onClose}>Ver todos los productos</Link>
                </Button>
              </div>
            ) : searchTerm ? (
              <div className="divide-y">
                {filteredProducts.map(product => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="flex items-center gap-4 py-3 hover:bg-gray-50 transition-colors"
                    onClick={onClose}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-16 w-16 object-contain rounded-md"
                    />
                    <div>
                      <h4 className="font-medium text-sm truncate">{product.name}</h4>
                      <p className="text-primary font-medium">${product.price.toFixed(2)}</p>
                    </div>
                  </Link>
                ))}
                {filteredProducts.length > 0 && (
                  <div className="py-3 text-center">
                    <Button asChild variant="link" onClick={onClose}>
                      <Link to={`/products?search=${searchTerm}`}>
                        Ver todos los resultados ({filteredProducts.length})
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[200px] text-center">
                <p className="text-gray-500 mb-2">Busca por nombre, descripción o categoría</p>
                <p className="text-sm text-gray-400">Ejemplo: "auriculares", "smartphone", "smartwatch"</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
