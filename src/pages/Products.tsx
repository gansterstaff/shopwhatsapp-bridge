
import React, { useState, useEffect } from 'react';
import { useProducts } from '@/hooks/useProducts';
import ProductCard from '@/components/ProductCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Filter, Tag } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Helmet } from 'react-helmet';

const Products = () => {
  const { data: products, isLoading, error } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  // Extraer categorías únicas de los productos
  const categories = products 
    ? ['all', ...new Set(products.map(product => product.category))]
    : ['all'];

  // Traducir categorías al español
  const translateCategory = (category: string): string => {
    if (category === 'all') return 'Todas';
    
    const categoryMap: Record<string, string> = {
      'electronics': 'Electrónica',
      'wearables': 'Wearables',
      'computers': 'Computadoras',
      'phones': 'Teléfonos',
      'accessories': 'Accesorios',
      'gadgets': 'Gadgets'
    };
    
    return categoryMap[category] || category.charAt(0).toUpperCase() + category.slice(1);
  };

  // Filtrar productos en base al término de búsqueda y categoría
  const filteredProducts = products 
    ? products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             (product.sku && product.sku.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
    : [];

  // Obtener productos actuales para paginación
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Resetear a primera página cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  // Generar números de paginación
  const paginationNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationNumbers.push(i);
  }

  // Preparar meta keywords para SEO
  const getMetaKeywords = () => {
    const categoryKeywords = categories
      .filter(cat => cat !== 'all')
      .map(cat => translateCategory(cat))
      .join(', ');
      
    return `tienda online, comprar productos, ${categoryKeywords}, mejores precios, ofertas, descuentos, envío gratis`;
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800">Error al cargar productos</h2>
          <p className="text-gray-600 mt-2">
            Lo sentimos, hubo un problema al cargar los productos. Por favor, intenta de nuevo más tarde.
          </p>
          <Button 
            onClick={() => window.location.reload()} 
            className="mt-4"
          >
            Intentar de nuevo
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Productos | Tienda Online | Los Mejores Precios Garantizados</title>
        <meta name="description" content="Explora nuestra amplia selección de productos de alta calidad. ✓ Envío rápido ✓ Mejores precios ✓ Garantía de devolución de 30 días." />
        <meta name="keywords" content={getMetaKeywords()} />
        <meta property="og:title" content="Catálogo de Productos | Compra Online" />
        <meta property="og:description" content="Descubre todos nuestros productos con los mejores precios y envío rápido garantizado." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      <div className="container mx-auto px-4 py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">Nuestros Productos</h1>
          <p className="text-lg text-gray-600 mt-2">
            Descubre nuestra selección de productos de alta calidad
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Buscar por nombre, descripción o SKU..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-64">
            <Select 
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger>
                <div className="flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Categoría" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {translateCategory(category)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="border rounded-lg p-4">
                <Skeleton className="h-48 w-full rounded-md" />
                <Skeleton className="h-4 w-2/3 mt-4" />
                <Skeleton className="h-4 w-full mt-2" />
                <Skeleton className="h-4 w-1/2 mt-2" />
                <div className="flex justify-between mt-4">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-10 w-10 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {currentProducts.length === 0 ? (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-800">No se encontraron productos</h2>
                <p className="text-gray-600 mt-2">
                  Intenta con otra búsqueda o categoría.
                </p>
                <Button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }} 
                  className="mt-4"
                >
                  Ver todos los productos
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <Pagination className="mt-12">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        >
                          Anterior
                        </PaginationPrevious>
                      </PaginationItem>
                      
                      {paginationNumbers.map(number => (
                        <PaginationItem key={number}>
                          <PaginationLink
                            onClick={() => setCurrentPage(number)}
                            isActive={currentPage === number}
                            className="cursor-pointer"
                          >
                            {number}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        >
                          Siguiente
                        </PaginationNext>
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Products;
