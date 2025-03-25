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
  PlusCircle,
  Star,
  Percent
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
        <div className="relative overflow-hidden rounded-lg bg-gray-50 flex items-center justify-center p-8">
          {product.discount && (
            <Badge variant="destructive" className="absolute top-4 left-4 flex items-center gap-1">
              <Percent className="h-3 w-3" />
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
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">{product.category}</Badge>
              {product.stock > 0 ? (
                <Badge variant="secondary" className="flex items-center">
                  <Check className="mr-1 h-3 w-3" />
                  En stock ({product.stock} unidades)
                </Badge>
              ) : (
                <Badge variant="destructive">Agotado</Badge>
              )}
            </div>
            
            <h1 className="text-3xl font-bold">{product.name}</h1>
            
            <div className="flex items-center mt-2 space-x-2">
              <div className="flex text-yellow-400">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4" />
              </div>
              <span className="text-sm text-muted-foreground">4.0 (24 reseñas)</span>
            </div>
            
            <div className="flex items-baseline mt-4">
              <span className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</span>
              {product.oldPrice && (
                <span className="ml-2 text-lg text-gray-500 line-through">
                  ${product.oldPrice.toFixed(2)}
                </span>
              )}
              {product.discount && (
                <span className="ml-2 text-sm bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                  Ahorras ${(product.oldPrice! - product.price).toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <p className="text-gray-700">{product.description}</p>

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
                disabled={quantity >= product.stock}
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
                  ¡Añadido al carrito!
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

          <a 
            href={`https://wa.me/1234567890?text=Hola,%20estoy%20interesado%20en%20${encodeURIComponent(product.name)}%20(${encodeURIComponent(`https://your-site.com/product/${product.id}`)})%20por%20$${product.price}%20x%20${quantity}%20unidades`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#25D366]/90 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"></path>
              <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Zm0 0a5 5 0 0 0 5 5"></path>
              <path d="M9.5 13.5h1"></path>
            </svg>
            Comprar ahora por WhatsApp
          </a>

          <div className="border-t border-gray-200 pt-6 space-y-4">
            <div className="flex items-center">
              <Truck className="h-5 w-5 text-gray-600 mr-2" />
              <div>
                <h3 className="font-medium">Envío rápido garantizado</h3>
                <p className="text-sm text-gray-500">Entrega en 24-48 horas para pedidos superiores a $50</p>
              </div>
            </div>
            <div className="flex items-center">
              <ShieldCheck className="h-5 w-5 text-gray-600 mr-2" />
              <div>
                <h3 className="font-medium">Garantía de calidad</h3>
                <p className="text-sm text-gray-500">100% satisfacción garantizada o te devolvemos tu dinero</p>
              </div>
            </div>
            <div className="flex items-center">
              <RefreshCw className="h-5 w-5 text-gray-600 mr-2" />
              <div>
                <h3 className="font-medium">Devoluciones sin complicaciones</h3>
                <p className="text-sm text-gray-500">Tienes 30 días para cambios o devoluciones gratuitas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
