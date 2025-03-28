
import React from 'react';
import { Star } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

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
  {
    id: 4,
    name: 'Javier López',
    role: 'Ingeniero de Software',
    image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=250&auto=format&fit=crop',
    content: 'La relación calidad-precio es inmejorable. Además, siempre están disponibles para ayudar por WhatsApp ante cualquier duda.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Laura Martínez',
    role: 'Diseñadora Gráfica',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=250&auto=format&fit=crop',
    content: 'Compré una laptop y ha superado todas mis expectativas. La atención personalizada por WhatsApp hizo que la experiencia de compra fuera muy sencilla.',
    rating: 5,
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
        
        {/* Testimonials carousel */}
        <div className="mx-auto max-w-5xl">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <div 
                    className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-border shadow-sm h-full flex flex-col"
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
                    <p className="text-muted-foreground italic flex-1">"{testimonial.content}"</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-6 gap-2">
              <CarouselPrevious className="static" />
              <CarouselNext className="static" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
