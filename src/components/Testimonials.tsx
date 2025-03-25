
import React from 'react';
import { Star } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const testimonials = [
  {
    id: 1,
    name: 'Ana García',
    role: 'Cliente Habitual',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=250&auto=format&fit=crop',
    content: 'Los productos son de excelente calidad. El servicio de atención al cliente es rápido y eficiente. ¡Totalmente recomendado!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    role: 'Profesional Tech',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=250&auto=format&fit=crop',
    content: 'He comprado varios artículos electrónicos y todos han superado mis expectativas. La entrega es puntual y el embalaje es seguro.',
    rating: 5,
  },
  {
    id: 3,
    name: 'María Fernández',
    role: 'Estudiante Universitaria',
    image: 'https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?q=80&w=250&auto=format&fit=crop',
    content: 'Los auriculares que compré tienen una calidad de sonido increíble. La comunicación por WhatsApp fue muy directa y resolvieron todas mis dudas.',
    rating: 4,
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="mb-10 text-center space-y-2">
          <div className="inline-flex items-center px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full">
            Testimonios
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">Lo que dicen nuestros clientes</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Descubre por qué nuestros clientes confían en nosotros para sus necesidades tecnológicas
          </p>
        </div>
        
        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-border shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 mr-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-14 h-14 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-base">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  <div className="flex text-yellow-400 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < testimonial.rating ? 'fill-current' : ''}`} 
                      />
                    ))}
                  </div>
                </div>
              </div>
              <Separator className="mb-4" />
              <p className="text-muted-foreground italic">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
