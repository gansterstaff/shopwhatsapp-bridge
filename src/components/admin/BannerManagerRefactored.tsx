import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Trash2, Plus, RefreshCw } from 'lucide-react';
import ImageUpload from './ImageUpload';

// Types for banner structure
interface Banner {
  id: number;
  title: string;
  content: string;
  code?: string;
  discount?: number;
  active: boolean;
  background_color: string;
  text_color: string;
  image?: string;
  image_url?: string;
  image_path?: string;
  image_bucket?: string;
}

const BannerManagerRefactored = () => {
  const { toast } = useToast();
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedBannerId, setSelectedBannerId] = useState<number | null>(null);

  // Form state
  const [formData, setFormData] = useState<Banner>({
    id: 0,
    title: '',
    content: '',
    code: '',
    discount: 0,
    active: true,
    background_color: '#000000',
    text_color: '#FFFFFF',
    image: '',
    image_url: '',
    image_path: '',
    image_bucket: 'banners'
  });

  // Fetch banners on component mount
  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('promotional_banners')
        .select('*')
        .order('id', { ascending: true });

      if (error) throw error;

      setBanners(data || []);
    } catch (error: any) {
      console.error('Error fetching banners:', error);
      toast({
        title: 'Error',
        description: 'No se pudieron cargar los banners promocionales',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      id: 0,
      title: '',
      content: '',
      code: '',
      discount: 0,
      active: true,
      background_color: '#000000',
      text_color: '#FFFFFF',
      image: '',
      image_url: '',
      image_path: '',
      image_bucket: 'banners'
    });
  };

  const openEditModal = (banner: Banner) => {
    setFormData({
      id: banner.id,
      title: banner.title,
      content: banner.content,
      code: banner.code || '',
      discount: banner.discount || 0,
      active: banner.active,
      background_color: banner.background_color,
      text_color: banner.text_color,
      image: banner.image || '',
      image_url: banner.image || '',
      image_path: banner.image_path || '',
      image_bucket: banner.image_bucket || 'banners'
    });
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openDeleteDialog = (id: number) => {
    setSelectedBannerId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'discount' ? Number(value) : value
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      active: checked
    }));
  };

  const handleImageSelected = (imageData: { url: string, path?: string, bucket?: string }) => {
    setFormData(prev => ({
      ...prev,
      image: imageData.url,
      image_url: imageData.url,
      image_path: imageData.path || '',
      image_bucket: imageData.bucket || 'banners'
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const bannerData = {
        title: formData.title,
        content: formData.content,
        code: formData.code || null,
        discount: formData.discount || null,
        active: formData.active,
        background_color: formData.background_color,
        text_color: formData.text_color,
        image_url: formData.image_url || formData.image || null,
        image_path: formData.image_path || null,
        image_bucket: formData.image_bucket || 'banners'
      };
      
      let error;
      
      if (formData.id) {
        // Update existing banner
        const { error: updateError } = await supabase
          .from('promotional_banners')
          .update(bannerData)
          .eq('id', formData.id);
          
        error = updateError;
        
        if (!updateError) {
          toast({
            title: "Banner actualizado",
            description: "El banner se ha actualizado correctamente",
          });
        }
      } else {
        // Create new banner
        const { error: insertError } = await supabase
          .from('promotional_banners')
          .insert([bannerData]);
          
        error = insertError;
        
        if (!insertError) {
          toast({
            title: "Banner añadido",
            description: "El banner se ha añadido correctamente",
          });
        }
      }
      
      if (error) throw error;
      
      setIsModalOpen(false);
      resetForm();
      fetchBanners();
      
    } catch (error: any) {
      console.error('Error guardando banner:', error);
      toast({
        title: "Error",
        description: error.message || "No se pudo guardar el banner",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    if (!selectedBannerId) return;
    
    try {
      const { error } = await supabase
        .from('promotional_banners')
        .delete()
        .eq('id', selectedBannerId);
        
      if (error) throw error;
      
      setIsDeleteDialogOpen(false);
      setSelectedBannerId(null);
      toast({
        title: "Banner eliminado",
        description: "El banner se ha eliminado correctamente",
      });
      
      fetchBanners();
    } catch (error: any) {
      console.error('Error eliminando banner:', error);
      toast({
        title: "Error",
        description: error.message || "No se pudo eliminar el banner",
        variant: "destructive",
      });
    }
  };

  // Preview banner with current settings
  const BannerPreview = () => {
    return (
      <div className="mt-4 p-4 rounded-md" style={{
        backgroundColor: formData.background_color,
        color: formData.text_color
      }}>
        <div className="flex items-center space-x-4">
          {formData.image && (
            <img 
              src={formData.image} 
              alt="Banner preview" 
              className="h-16 w-16 object-cover rounded-md"
            />
          )}
          <div>
            <h3 className="font-bold">{formData.title || 'Título del banner'}</h3>
            <p>{formData.content || 'Contenido del banner'}</p>
            {formData.code && (
              <div className="mt-1">
                Código: <span className="font-mono bg-opacity-20 bg-white px-1 rounded">{formData.code}</span>
                {formData.discount ? ` (${formData.discount}% descuento)` : ''}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Administración de Banners</CardTitle>
          <CardDescription>Cargando...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center p-6">
          <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Administración de Banners</CardTitle>
        <CardDescription>
          Gestiona los banners promocionales que se muestran en la tienda
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex justify-end mb-4">
          <Button onClick={openAddModal}>
            <Plus className="h-4 w-4 mr-2" /> Añadir Banner
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Preview</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Código</TableHead>
                <TableHead>Descuento</TableHead>
                <TableHead>Activo</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {banners.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6">
                    No hay banners configurados
                  </TableCell>
                </TableRow>
              ) : (
                banners.map(banner => (
                  <TableRow key={banner.id}>
                    <TableCell>{banner.id}</TableCell>
                    <TableCell>
                      <div className="h-10 w-32 rounded flex items-center justify-center px-2 text-xs" style={{
                        backgroundColor: banner.background_color,
                        color: banner.text_color
                      }}>
                        {banner.image ? (
                          <img 
                            src={banner.image} 
                            alt="Banner" 
                            className="h-8 w-8 object-cover rounded mr-1"
                          />
                        ) : null}
                        <span className="truncate">{banner.title}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{banner.title}</TableCell>
                    <TableCell>{banner.code || '-'}</TableCell>
                    <TableCell>{banner.discount ? `${banner.discount}%` : '-'}</TableCell>
                    <TableCell>
                      <span className={`inline-block h-3 w-3 rounded-full ${banner.active ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => openEditModal(banner)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => openDeleteDialog(banner.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Modal para añadir/editar banners */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {formData.id ? 'Editar Banner' : 'Añadir Nuevo Banner'}
            </DialogTitle>
            <DialogDescription>
              Configure los detalles del banner promocional
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="code">Código promocional</Label>
                  <Input
                    id="code"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    placeholder="Opcional"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Contenido</Label>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  rows={2}
                  required
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
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
                    placeholder="Opcional"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="background_color">Color de fondo</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="background_color"
                      name="background_color"
                      type="color"
                      value={formData.background_color}
                      onChange={handleInputChange}
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      name="background_color"
                      value={formData.background_color}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="text_color">Color de texto</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="text_color"
                      name="text_color"
                      type="color"
                      value={formData.text_color}
                      onChange={handleInputChange}
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      name="text_color"
                      value={formData.text_color}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="active"
                  checked={formData.active}
                  onCheckedChange={handleCheckboxChange}
                />
                <Label htmlFor="active">Banner activo</Label>
              </div>
              
              <ImageUpload
                initialImageUrl={formData.image}
                onImageSelected={handleImageSelected}
                label="Imagen del banner"
                bucketName="banners"
                folderPath="promotional"
              />
              
              <BannerPreview />
            </div>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsModalOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">Guardar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog de confirmación para eliminar */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogDescription>
              ¿Está seguro de que desea eliminar este banner? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDelete}
            >
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default BannerManagerRefactored;
