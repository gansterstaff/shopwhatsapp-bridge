
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Mail } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "¡Suscripción exitosa!",
        description: "Gracias por suscribirte a nuestro boletín de noticias",
      });
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Mantente Informado</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Suscríbete a nuestro boletín para recibir las últimas ofertas, lanzamientos de productos y consejos tecnológicos
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <Input
              type="email"
              placeholder="Tu correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-grow"
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Suscribirse'}
            </Button>
          </form>
          
          <p className="text-center text-xs text-muted-foreground mt-4">
            Al suscribirte, aceptas recibir correos electrónicos de marketing. Puedes darte de baja en cualquier momento.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
