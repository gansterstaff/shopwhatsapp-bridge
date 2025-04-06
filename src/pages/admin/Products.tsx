
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase'; 
import { Helmet } from 'react-helmet';
import { Plus, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProductManagement } from '@/hooks/useProductManagement';
import ProductsTable from '@/components/admin/products/ProductsTable';
import ProductModal from '@/components/admin/products/ProductModal';
import DeleteConfirmationDialog from '@/components/admin/products/DeleteConfirmationDialog';

const ProductsManagement = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const {
    filteredProducts,
    isLoading,
    formData,
    isModalOpen,
    isDeleteDialogOpen,
    searchTerm,
    categories,
    setSearchTerm,
    setIsModalOpen,
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
  } = useProductManagement();

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        navigate('/login');
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        if (data?.role !== 'admin') {
          navigate('/');
          return;
        }

        await fetchProducts();
      } catch (error) {
        console.error('Error verificando permisos de administrador:', error);
        navigate('/');
      }
    };

    checkAdminStatus();
  }, [user, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Gestión de Productos - Panel de Administración</title>
        <meta name="description" content="Administración de productos de la tienda" />
      </Helmet>

      <div className="container mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Gestión de Productos</h1>
          <Button onClick={openAddModal}>
            <Plus className="h-4 w-4 mr-2" /> Añadir Producto
          </Button>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar productos por nombre, categoría o SKU..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <ProductsTable 
          products={filteredProducts} 
          openEditModal={openEditModal} 
          openDeleteDialog={openDeleteDialog} 
        />

        <ProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          formData={formData}
          categories={categories}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleCheckboxChange={handleCheckboxChange}
          handleImageSelected={handleImageSelected}
          handleSubmit={handleSubmit}
        />

        <DeleteConfirmationDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={handleDelete}
        />
      </div>
    </>
  );
};

export default ProductsManagement;
