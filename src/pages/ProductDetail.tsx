
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductById } from '@/hooks/useProducts';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  ArrowLeft, 
  ShoppingCart, 
  Heart, 
  Share, 
  Truck, 
  ShieldCheck, 
  RefreshCw,
  Check,
  MinusCircle,
  PlusCircle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const productId = id ? parseInt(id) : 0;
  const { data: product, isLoading, error } = useProductById(productId);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      setIsAddedToCart(true);
      setTimeout(() => setIsAddedToCart(false), 2000);
    }
  };

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-24">
        <Skeleton className="h-8 w-48 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="h-96 w-full rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-10 w-1/2" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800">Error al cargar el producto</h2>
          <p className="text-gray-600 mt-2">
            Lo sentimos, el producto solicitado no existe o no pudo ser cargado.
          </p>
          <Button 
            onClick={() => navigate('/products')} 
            className="mt-4"
          >
            Ver todos los productos
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-24">
      {/* Breadcrumbs */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/products">Productos</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/products/category/${product.category}`}>
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>{product.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Button 
        variant="ghost" 
        className="mb-6 flex items-center" 
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Regresar
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative overflow-hidden rounded-lg bg-gray-50 flex items-center justify-center">
          {product.discount && (
            <Badge variant="destructive" className="absolute top-4 left-4">
              {product.discount}% DESCUENTO
            </Badge>
          )}
          <img 
            src={product.image} 
            alt={product.name}
            className="object-contain h-96 w-full"
          />
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
                {product.oldPrice && (
                  <span className="ml-2 text-lg text-gray-500 line-through">
                    ${product.oldPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          </div>

          <p className="text-gray-700">{product.description}</p>

          <div className="flex items-center space-x-2">
            <Badge variant="outline">{product.category}</Badge>
            {product.stock > 0 ? (
              <Badge variant="secondary" className="flex items-center">
                <Check className="mr-1 h-3 w-3" />
                En stock
              </Badge>
            ) : (
              <Badge variant="destructive">Agotado</Badge>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                <MinusCircle className="h-4 w-4" />
              </Button>
              <span className="mx-3 font-medium w-8 text-center">{quantity}</span>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => handleQuantityChange(1)}
              >
                <PlusCircle className="h-4 w-4" />
              </Button>
            </div>
            <Button 
              className="flex-1" 
              onClick={handleAddToCart}
              disabled={isAddedToCart || product.stock === 0}
            >
              {isAddedToCart ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Añadido
                </>
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Añadir al carrito
                </>
              )}
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Share className="h-4 w-4" />
            </Button>
          </div>

          <div className="border-t border-gray-200 pt-6 space-y-4">
            <div className="flex items-center">
              <Truck className="h-5 w-5 text-gray-600 mr-2" />
              <div>
                <h3 className="font-medium">Envío gratuito</h3>
                <p className="text-sm text-gray-500">Para pedidos superiores a $50</p>
              </div>
            </div>
            <div className="flex items-center">
              <ShieldCheck className="h-5 w-5 text-gray-600 mr-2" />
              <div>
                <h3 className="font-medium">Garantía de calidad</h3>
                <p className="text-sm text-gray-500">100% garantía de satisfacción</p>
              </div>
            </div>
            <div className="flex items-center">
              <RefreshCw className="h-5 w-5 text-gray-600 mr-2" />
              <div>
                <h3 className="font-medium">Devoluciones fáciles</h3>
                <p className="text-sm text-gray-500">30 días para devoluciones</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
