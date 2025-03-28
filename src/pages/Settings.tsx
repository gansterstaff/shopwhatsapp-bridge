
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { WhatsappIcon } from 'lucide-react';

const Settings = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redireccionar si no hay usuario autenticado
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  // Simulación de guardado de configuración
  const handleSaveSettings = () => {
    toast({
      title: "Configuración guardada",
      description: "Tus preferencias han sido actualizadas correctamente.",
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto py-32 flex justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return null; // No renderizar nada si no hay usuario (redirección se maneja en useEffect)
  }

  return (
    <div className="container mx-auto py-16 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-8">Configuración</h1>
      
      <div className="grid gap-8">
        {/* Configuración de cuenta */}
        <Card>
          <CardHeader>
            <CardTitle>Configuración de cuenta</CardTitle>
            <CardDescription>
              Administra tus preferencias de cuenta y comunicación
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Notificaciones por WhatsApp */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Comunicación por WhatsApp</h3>
              
              <div className="flex items-center justify-between border-b pb-4">
                <div className="space-y-0.5">
                  <Label htmlFor="wspp-orders">Actualizaciones de pedidos</Label>
                  <p className="text-sm text-muted-foreground">
                    Recibe notificaciones de estado de tus pedidos por WhatsApp
                  </p>
                </div>
                <Switch id="wspp-orders" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between border-b pb-4">
                <div className="space-y-0.5">
                  <Label htmlFor="wspp-promos">Promociones y descuentos</Label>
                  <p className="text-sm text-muted-foreground">
                    Recibe información sobre ofertas y descuentos exclusivos
                  </p>
                </div>
                <Switch id="wspp-promos" />
              </div>
              
              <div className="flex items-center justify-between pb-2">
                <div className="space-y-0.5">
                  <Label htmlFor="wspp-support">Servicio al cliente</Label>
                  <p className="text-sm text-muted-foreground">
                    Conéctate con soporte a través de WhatsApp
                  </p>
                </div>
                <Switch id="wspp-support" defaultChecked />
              </div>
            </div>
            
            {/* Preferencias de contacto */}
            <div className="pt-4">
              <h3 className="text-lg font-medium mb-4">Método de contacto preferido</h3>
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <Label htmlFor="contact-method" className="md:w-1/3">Contáctame por:</Label>
                <Select defaultValue="wssp">
                  <SelectTrigger id="contact-method" className="md:w-2/3">
                    <SelectValue placeholder="Seleccionar método" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wssp">
                      <div className="flex items-center">
                        <WhatsappIcon className="mr-2 h-4 w-4" />
                        WhatsApp
                      </div>
                    </SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Llamada telefónica</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Preferencias de compra */}
        <Card>
          <CardHeader>
            <CardTitle>Preferencias de compra</CardTitle>
            <CardDescription>
              Personaliza tu experiencia de compra
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="space-y-0.5">
                <Label>Moneda preferida</Label>
                <p className="text-sm text-muted-foreground">
                  Selecciona tu moneda para ver precios
                </p>
              </div>
              <Select defaultValue="usd">
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD ($)</SelectItem>
                  <SelectItem value="eur">EUR (€)</SelectItem>
                  <SelectItem value="gbp">GBP (£)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between border-b pb-4">
              <div className="space-y-0.5">
                <Label htmlFor="save-payment">Guardar método de pago</Label>
                <p className="text-sm text-muted-foreground">
                  Guardar información de pago para compras más rápidas
                </p>
              </div>
              <Switch id="save-payment" />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="quick-checkout">Proceso de compra rápido</Label>
                <p className="text-sm text-muted-foreground">
                  Usar datos guardados para finalizar compras más rápido
                </p>
              </div>
              <Switch id="quick-checkout" defaultChecked />
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end mt-4">
          <Button onClick={handleSaveSettings}>Guardar configuración</Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
