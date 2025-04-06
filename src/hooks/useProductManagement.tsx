
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/lib/types';

export interface ProductFormData {
  id: number | null;
  name: string;
  description: string;
  price: number;
  old_price: number | null;
  discount: number | null;
  image_url: string;
  image_path: string;
  image_bucket: string;
  category: string;
  stock: number;
  featured: boolean;
  sku: string;
}

const initialFormData: ProductFormData = {
  id: null,
  name: '',
  description: '',
  price: 0,
  old_price: null,
  discount: null,
  image_url: '',
  image_path: '',
  image_bucket: 'products',
  category: '',
  stock: 0,
  featured: false,
  sku: ''
};

export const useProductManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const categories = [
    'electronics', 'clothing', 'home', 'beauty', 'sports', 
    'books', 'toys', 'food', 'health', 'automotive'
  ];

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: true });

      if (error) throw error;

      setProducts(data || []);
      return data;
    } catch (error) {
      console.error('Error obteniendo productos:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los productos",
        variant: "destructive",
      });
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'old_price' || name === 'stock' 
        ? Number(value) 
        : value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleImageSelected = (imageData: { url: string, path?: string, bucket?: string }) => {
    setFormData(prev => ({
      ...prev,
      image_url: imageData.url,
      image_path: imageData.path || '',
      image_bucket: imageData.bucket || 'products'
    }));
  };

  const generateSKU = () => {
    const prefix = formData.category.substring(0, 3).toUpperCase();
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    return `${prefix}-${randomNum}`;
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const openEditModal = (product: Product) => {
    setFormData({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      old_price: product.oldPrice || null,
      discount: product.discount || null,
      image_url: product.imageUrl || product.image,
      image_path: product.imagePath || '',
      image_bucket: product.imageBucket || 'products',
      category: product.category,
      stock: product.stock,
      featured: product.featured,
      sku: product.sku || ''
    });
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openDeleteDialog = (id: number) => {
    setSelectedProductId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const sku = formData.sku || generateSKU();
      
      const productData = {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        old_price: formData.old_price,
        discount: formData.discount,
        image_url: formData.image_url,
        image_path: formData.image_path,
        image_bucket: formData.image_bucket,
        category: formData.category,
        stock: formData.stock,
        featured: formData.featured,
        sku: sku
      };
      
      let error;
      
      if (formData.id) {
        const { error: updateError } = await supabase
          .from('products')
          .update(productData)
          .eq('id', formData.id);
          
        error = updateError;
        
        if (!updateError) {
          toast({
            title: "Producto actualizado",
            description: "El producto se ha actualizado correctamente",
          });
        }
      } else {
        const { error: insertError } = await supabase
          .from('products')
          .insert([productData]);
          
        error = insertError;
        
        if (!insertError) {
          toast({
            title: "Producto añadido",
            description: "El producto se ha añadido correctamente",
          });
        }
      }
      
      if (error) throw error;
      
      setIsModalOpen(false);
      resetForm();
      fetchProducts();
      
    } catch (error: any) {
      console.error('Error guardando producto:', error);
      toast({
        title: "Error",
        description: error.message || "No se pudo guardar el producto",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    if (!selectedProductId) return;
    
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', selectedProductId);
        
      if (error) throw error;
      
      setIsDeleteDialogOpen(false);
      setSelectedProductId(null);
      toast({
        title: "Producto eliminado",
        description: "El producto se ha eliminado correctamente",
      });
      
      fetchProducts();
    } catch (error: any) {
      console.error('Error eliminando producto:', error);
      toast({
        title: "Error",
        description: error.message || "No se pudo eliminar el producto",
        variant: "destructive",
      });
    }
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.sku && product.sku.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return {
    products,
    filteredProducts,
    isLoading,
    formData,
    isModalOpen,
    isDeleteDialogOpen,
    selectedProductId,
    searchTerm,
    categories,
    setSearchTerm,
    setIsModalOpen,
    setIsDeleteDialogOpen,
    fetchProducts,
    handleInputChange,
    handleSelectChange,
    handleCheckboxChange,
    handleImageSelected,
    openEditModal,
    openAddModal,
    openDeleteDialog,
    handleSubmit,
    handleDelete
  };
};
