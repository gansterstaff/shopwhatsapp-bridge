
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Image } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  initialImageUrl?: string;
  onImageSelected: (imageData: {
    url: string, 
    path?: string, 
    bucket?: string
  }) => void;
  label?: string;
  bucketName?: string;
  folderPath?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  initialImageUrl = '',
  onImageSelected,
  label = 'Imagen',
  bucketName = 'products',
  folderPath = ''
}) => {
  const [imageUrl, setImageUrl] = useState<string>(initialImageUrl);
  const [urlInput, setUrlInput] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadType, setUploadType] = useState<'url' | 'file'>('url');
  const { toast } = useToast();

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      
      // Create filename with timestamp to avoid duplicates
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = folderPath ? `${folderPath}/${fileName}` : fileName;

      // Check if storage bucket exists, if not this will fail gracefully
      // and we'll use a placeholder URL
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file);

      if (error) {
        throw error;
      }

      // Get public URL for the uploaded file
      const { data: { publicUrl } } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);

      setImageUrl(publicUrl);
      
      // Pass complete image data to parent component
      onImageSelected({
        url: publicUrl,
        path: filePath,
        bucket: bucketName
      });
      
      toast({
        title: "Imagen subida",
        description: "La imagen se ha subido correctamente",
      });
    } catch (error: any) {
      console.error('Error uploading image:', error);
      
      // Fallback to a placeholder if there's an issue with storage
      const placeholderUrl = 'https://placehold.co/400x400?text=Producto';
      setImageUrl(placeholderUrl);
      
      // Still pass image data even with a placeholder
      onImageSelected({
        url: placeholderUrl
      });
      
      toast({
        title: "Error al subir imagen",
        description: error.message || "Se utilizará una imagen de marcador de posición",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim()) {
      setImageUrl(urlInput);
      
      // With URL, we only have the URL and not the path/bucket
      onImageSelected({
        url: urlInput
      });
      
      toast({
        title: "URL de imagen actualizada",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Label>{label}</Label>
        <div className="flex space-x-2">
          <Button 
            type="button"
            variant={uploadType === 'url' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setUploadType('url')}
          >
            URL
          </Button>
          <Button 
            type="button"
            variant={uploadType === 'file' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setUploadType('file')}
          >
            Subir archivo
          </Button>
        </div>
      </div>

      {uploadType === 'url' ? (
        <form onSubmit={handleUrlSubmit} className="flex gap-2">
          <Input
            type="url"
            placeholder="https://ejemplo.com/imagen.jpg"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={!urlInput.trim()}>
            Usar URL
          </Button>
        </form>
      ) : (
        <div className="flex items-center gap-2">
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={isUploading}
            className="flex-1"
          />
          {isUploading && <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>}
        </div>
      )}

      {imageUrl && (
        <div className="mt-2 relative border rounded-md overflow-hidden aspect-square w-40 h-40">
          <img
            src={imageUrl}
            alt="Vista previa"
            className="object-cover w-full h-full"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://placehold.co/400x400?text=Error';
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
