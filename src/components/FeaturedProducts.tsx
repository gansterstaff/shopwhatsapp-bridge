
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { cn } from '@/lib/utils';
import { useFeaturedProducts } from '@/hooks/useProducts';
import { Skeleton } from '@/components/ui/skeleton';

const FeaturedProducts: React.FC = () => {
  const { data: featuredProducts, isLoading, error } = useFeaturedProducts();
  
  // Fallback to local data if there's an error or we're still loading
  const showFallbackData = isLoading || error || !featuredProducts?.length;
  
  // If error, log it but don't show to user
  if (error) {
    console.error('Error loading featured products:', error);
  }
  
  return (
    <section className="py-16 bg-secondary/50">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="mb-10 text-center space-y-2">
          <div className="inline-flex items-center px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full">
            Featured Collection
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">Our Best Sellers</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular products, loved by customers worldwide for their quality and design.
          </p>
        </div>
        
        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            // Loading state
            Array.from({ length: 4 }).map((_, index) => (
              <div key={`skeleton-${index}`} className="animate-pulse">
                <div className="rounded-xl overflow-hidden">
                  <Skeleton className="aspect-square w-full" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <div className="pt-2">
                      <Skeleton className="h-8 w-full" />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : showFallbackData ? (
            // Fallback to local data if there's an error or no data from Supabase
            Array.from({ length: 4 }).map((_, index) => (
              <div key={`fallback-${index}`} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <Skeleton className="aspect-square rounded-xl" />
              </div>
            ))
          ) : (
            // Render actual products from Supabase
            featuredProducts.map((product) => (
              <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${(product.id % 4) * 0.1}s` }}>
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>
        
        {/* View all link */}
        <div className="mt-12 text-center">
          <Link 
            to="/products" 
            className={cn(
              "inline-flex items-center gap-2 font-medium",
              "text-primary hover:text-primary/80 transition-colors"
            )}
          >
            View All Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
