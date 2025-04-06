
import React from 'react';
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogHeader, DialogTitle 
} from "@/components/ui/dialog";
import ProductForm from './ProductForm';

interface ProductFormData {
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

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: ProductFormData;
  categories: string[];
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleCheckboxChange: (name: string, checked: boolean) => void;
  handleImageSelected: (imageData: { url: string, path?: string, bucket?: string }) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  formData,
  categories,
  handleInputChange,
  handleSelectChange,
  handleCheckboxChange,
  handleImageSelected,
  handleSubmit
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {formData.id ? 'Editar Producto' : 'Añadir Nuevo Producto'}
          </DialogTitle>
          <DialogDescription>
            Complete la información del producto y haga clic en guardar.
          </DialogDescription>
        </DialogHeader>
        
        <ProductForm
          formData={formData}
          categories={categories}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleCheckboxChange={handleCheckboxChange}
          handleImageSelected={handleImageSelected}
          handleSubmit={handleSubmit}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
