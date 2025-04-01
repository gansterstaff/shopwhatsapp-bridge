
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Save, Plus, Trash2 } from 'lucide-react';

interface Banner {
  id: number;
  title: string;
  content: string;
  active: boolean;
  code?: string;
  discount?: number;
  background_color: string;
  text_color: string;
}

const defaultBanner: Banner = {
  id: 0,
  title: 'Nuevo Banner',
  content: 'Añade contenido a tu banner promocional',
  active: true,
  code: 'WELCOME20',
  discount: 20,
  background_color: '#000000',
  text_color: '#FFFFFF'
};

const BannerManager = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentBanner, setCurrentBanner] = useState<Banner>(defaultBanner);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadBanners();
  }, []);

  const loadBanners = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('promotional_banners')
        .select('*')
        .order('id', { ascending: true });

      if (error) throw error;

      setBanners(data || []);
      if (data && data.length > 0) {
        setCurrentBanner(data[0]);
      }
    } catch (error: any) {
      console.error('Error cargando banners:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los banners promocionales",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentBanner(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setCurrentBanner(prev => ({
      ...prev,
      active: checked
    }));
  };

  const handleSave = async () => {
    try {
      let response;
      
      if (currentBanner.id === 0) {
        // Crear nuevo banner
        const { id, ...newBanner } = currentBanner;
        response = await supabase
          .from('promotional_banners')
          .insert([newBanner])
          .select();
          
        if (response.error) throw response.error;
        
        toast({
          title: "Banner creado",
          description: "El banner promocional se ha creado correctamente",
        });
      } else {
        // Actualizar banner existente
        response = await supabase
          .from('promotional_banners')
          .update(currentBanner)
          .eq('id', currentBanner.id)
          .select();
          
        if (response.error) throw response.error;
        
        toast({
          title: "Banner actualizado",
          description: "El banner promocional se ha actualizado correctamente",
        });
      }
      
      loadBanners();
    } catch (error: any) {
      console.error('Error guardando banner:', error);
      toast({
        title: "Error",
        description: error.message || "No se pudo guardar el banner",
        variant: "destructive",
      });
    }
  };

  const handleNew = () => {
    setCurrentBanner(defaultBanner);
  };

  const handleDelete = async () => {
    if (currentBanner.id === 0) return;
    
    try {
      const { error } = await supabase
        .from('promotional_banners')
        .delete()
        .eq('id', currentBanner.id);
        
      if (error) throw error;
      
      toast({
        title: "Banner eliminado",
        description: "El banner promocional se ha eliminado correctamente",
      });
      
      loadBanners();
      setCurrentBanner(defaultBanner);
    } catch (error: any) {
      console.error('Error eliminando banner:', error);
      toast({
        title: "Error",
        description: error.message || "No se pudo eliminar el banner",
        variant: "destructive",
      });
    }
  };

  const selectBanner = (banner: Banner) => {
    setCurrentBanner(banner);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Gestión de Banners Promocionales</span>
          <Button onClick={handleNew} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" /> Nuevo Banner
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="edit" className="space-y-4">
          <TabsList>
            <TabsTrigger value="edit">Editar</TabsTrigger>
            <TabsTrigger value="preview">Vista Previa</TabsTrigger>
          </TabsList>
          
          <TabsContent value="edit" className="space-y-4">
            <div className="grid grid-cols-4 gap-4">
              {/* Lista de banners */}
              <div className="col-span-1 border rounded-md p-4 h-96 overflow-auto">
                <h3 className="font-medium mb-2">Banners</h3>
                <div className="space-y-2">
                  {banners.map(banner => (
                    <div 
                      key={banner.id}
                      className={`p-2 rounded cursor-pointer hover:bg-gray-100 ${currentBanner.id === banner.id ? 'bg-gray-100 border border-gray-300' : ''}`}
                      onClick={() => selectBanner(banner)}
                    >
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${banner.active ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className="truncate">{banner.title}</span>
                      </div>
                    </div>
                  ))}
                  {banners.length === 0 && (
                    <div className="text-center text-gray-500 py-6">
                      No hay banners disponibles
                    </div>
                  )}
                </div>
              </div>
              
              {/* Formulario de edición */}
              <div className="col-span-3 border rounded-md p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">
                      {currentBanner.id === 0 ? 'Nuevo Banner' : `Editar Banner: ${currentBanner.title}`}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">Activo</span>
                      <Switch
                        checked={currentBanner.active}
                        onCheckedChange={handleSwitchChange}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Título</Label>
                      <Input
                        id="title"
                        name="title"
                        value={currentBanner.title}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="code">Código promocional</Label>
                      <Input
                        id="code"
                        name="code"
                        value={currentBanner.code || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="content">Contenido</Label>
                    <Textarea
                      id="content"
                      name="content"
                      rows={3}
                      value={currentBanner.content}
                      onChange={handleInputChange}
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
                        value={currentBanner.discount || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="background_color">Color de fondo</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="background_color"
                          name="background_color"
                          type="color"
                          className="w-12 h-9 p-1"
                          value={currentBanner.background_color}
                          onChange={handleInputChange}
                        />
                        <Input
                          value={currentBanner.background_color}
                          name="background_color"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="text_color">Color de texto</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="text_color"
                          name="text_color"
                          type="color"
                          className="w-12 h-9 p-1"
                          value={currentBanner.text_color}
                          onChange={handleInputChange}
                        />
                        <Input
                          value={currentBanner.text_color}
                          name="text_color"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2 pt-4">
                    {currentBanner.id !== 0 && (
                      <Button
                        variant="destructive"
                        onClick={handleDelete}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Eliminar
                      </Button>
                    )}
                    <Button
                      onClick={handleSave}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Guardar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="preview">
            <div className="border rounded-md p-6 flex flex-col items-center">
              <h3 className="font-medium mb-4">Vista previa del banner</h3>
              
              <div 
                className="w-full max-w-md rounded-lg shadow-lg p-4 my-4"
                style={{ 
                  backgroundColor: currentBanner.background_color,
                  color: currentBanner.text_color
                }}
              >
                <h4 className="font-bold">{currentBanner.title}</h4>
                <p>{currentBanner.content}</p>
                {currentBanner.code && (
                  <div className="mt-2">
                    <span className="font-bold">Código: </span>
                    <span className="bg-white bg-opacity-20 px-2 py-1 rounded">{currentBanner.code}</span>
                  </div>
                )}
                {currentBanner.discount && (
                  <div className="text-right font-bold mt-2">
                    {currentBanner.discount}% OFF
                  </div>
                )}
              </div>
              
              <div className="text-center text-sm text-gray-500 mt-4">
                {currentBanner.active ? 
                  'Este banner se mostrará a los usuarios' : 
                  'Este banner está desactivado y no se mostrará'}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BannerManager;
