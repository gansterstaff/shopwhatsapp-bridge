
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Product } from '@/lib/types';
import { products as mockProducts } from '@/lib/products';

// Helper function to normalize product data from the database
const normalizeProduct = (product: any): Product => {
  return {
    ...product,
    oldPrice: product.old_price,
    // Maintain backward compatibility for image field
    image: product.image_url,
    imageUrl: product.image_url,
    imagePath: product.image_path,
    imageBucket: product.image_bucket
  };
};

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async (): Promise<Product[]> => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*');
        
        if (error) {
          console.error('Error fetching products:', error);
          console.log('Falling back to mock data');
          return mockProducts;
        }
        
        if (data && data.length > 0) {
          return data.map(normalizeProduct) as Product[];
        } else {
          console.log('No products found in database, using mock data');
          return mockProducts;
        }
      } catch (e) {
        console.error('Error in useProducts:', e);
        console.log('Falling back to mock data');
        return mockProducts;
      }
    },
  });
};

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ['featured-products'],
    queryFn: async (): Promise<Product[]> => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('featured', true);
        
        if (error) {
          console.error('Error fetching featured products:', error);
          console.log('Falling back to mock featured data');
          return mockProducts.filter(product => product.featured);
        }
        
        if (data && data.length > 0) {
          return data.map(normalizeProduct) as Product[];
        } else {
          console.log('No featured products found in database, using mock data');
          return mockProducts.filter(product => product.featured);
        }
      } catch (e) {
        console.error('Error in useFeaturedProducts:', e);
        console.log('Falling back to mock data');
        return mockProducts.filter(product => product.featured);
      }
    },
  });
};

export const useProductById = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async (): Promise<Product | null> => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .maybeSingle();
        
        if (error) {
          console.error(`Error fetching product ${id}:`, error);
          console.log('Falling back to mock product data');
          return mockProducts.find(p => p.id === id) || null;
        }
        
        if (data) {
          return normalizeProduct(data);
        } else {
          console.log(`No product found with id ${id}, using mock data`);
          return mockProducts.find(p => p.id === id) || null;
        }
      } catch (e) {
        console.error(`Error in useProductById (${id}):`, e);
        console.log('Falling back to mock data');
        return mockProducts.find(p => p.id === id) || null;
      }
    },
    enabled: !!id,
  });
};
