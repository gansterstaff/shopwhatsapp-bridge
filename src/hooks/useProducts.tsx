
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Product } from '@/lib/types';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async (): Promise<Product[]> => {
      const { data, error } = await supabase
        .from('products')
        .select('*');
      
      if (error) {
        console.error('Error fetching products:', error);
        throw new Error(error.message);
      }
      
      return data as Product[];
    },
  });
};

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ['featured-products'],
    queryFn: async (): Promise<Product[]> => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('featured', true);
      
      if (error) {
        console.error('Error fetching featured products:', error);
        throw new Error(error.message);
      }
      
      return data as Product[];
    },
  });
};

export const useProductById = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async (): Promise<Product | null> => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error(`Error fetching product ${id}:`, error);
        throw new Error(error.message);
      }
      
      return data as Product;
    },
    enabled: !!id,
  });
};
