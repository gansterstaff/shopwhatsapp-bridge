
import React from 'react';
import { Tag } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import ImageUpload from '@/components/admin/ImageUpload';
import { DialogFooter } from '@/components/ui/dialog';

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

interface ProductFormProps {
  formData: ProductFormData;
  categories: string[];
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleCheckboxChange: (name: string, checked: boolean) => void;
  handleImageSelected: (imageData: { url: string, path?: string, bucket?: string }) => void;
  handleSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  formData,
  categories,
  handleInputChange,
  handleSelectChange,
  handleCheckboxChange,
  handleImageSelected,
  handleSubmit,
  onCancel
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Categoría</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleSelectChange('category', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="sku" className="flex items-center gap-1">
            <Tag className="h-4 w-4" />
            SKU (Código de Producto)
          </Label>
          <Input
            id="sku"
            name="sku"
            value={formData.sku}
            onChange={handleInputChange}
            placeholder="Dejar en blanco para generar automáticamente"
          />
          <p className="text-xs text-muted-foreground">
            Un código único para identificar este producto. Si se deja en blanco, se generará automáticamente.
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Descripción</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            required
          />
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">Precio</Label>
            <Input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="old_price">Precio Original</Label>
            <Input
              id="old_price"
              name="old_price"
              type="number"
              min="0"
              step="0.01"
              value={formData.old_price || ''}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="discount">Descuento (%)</Label>
            <Input
              id="discount"
              name="discount"
              type="number"
              min="0"
              max="100"
              value={formData.discount || ''}
              onChange={handleInputChange}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              name="stock"
              type="number"
              min="0"
              value={formData.stock}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox
              id="featured"
              checked={formData.featured}
              onCheckedChange={(checked) => 
                handleCheckboxChange('featured', checked as boolean)
              }
            />
            <Label htmlFor="featured">Producto destacado</Label>
          </div>
        </div>
        
        <ImageUpload
          initialImageUrl={formData.image_url}
          onImageSelected={handleImageSelected}
          label="Imagen del producto"
          bucketName="products"
          folderPath="product-images"
        />
      </div>
      
      <DialogFooter>
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
        >
          Cancelar
        </Button>
        <Button type="submit">Guardar</Button>
      </DialogFooter>
    </form>
  );
};

export default ProductForm;
