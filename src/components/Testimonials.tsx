
import React from 'react';
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';

const testimonials = [
  {
    id: 1,
    name: 'Ana García',
    designation: 'Cliente Habitual',
    quote: 'Los productos son de excelente calidad. El servicio de atención al cliente es rápido y eficiente. ¡Totalmente recomendado!',
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=250&auto=format&fit=crop',
    rating: 5,
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    designation: 'Profesional Tech',
    quote: 'He comprado varios artículos electrónicos y todos han superado mis expectativas. La entrega es puntual y el embalaje es seguro.',
    src: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=250&auto=format&fit=crop',
    rating: 5,
  },
  {
    id: 3,
    name: 'María Fernández',
    designation: 'Estudiante Universitaria',
    quote: 'Los auriculares que compré tienen una calidad de sonido increíble. La comunicación por WhatsApp fue muy directa y resolvieron todas mis dudas.',
    src: 'https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?q=80&w=250&auto=format&fit=crop',
    rating: 4,
  },
  {
    id: 4,
    name: 'Javier López',
    designation: 'Ingeniero de Software',
    quote: 'La relación calidad-precio es inmejorable. Además, siempre están disponibles para ayudar por WhatsApp ante cualquier duda.',
    src: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=250&auto=format&fit=crop',
    rating: 5,
  },
  {
    id: 5,
    name: 'Laura Martínez',
    designation: 'Diseñadora Gráfica',
    quote: 'Compré una laptop y ha superado todas mis expectativas. La atención personalizada por WhatsApp hizo que la experiencia de compra fuera muy sencilla.',
    src: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=250&auto=format&fit=crop',
    rating: 5,
  },
];

const formattedTestimonials = testimonials.map(testimonial => ({
  quote: testimonial.quote,
  name: testimonial.name,
  designation: testimonial.designation,
  src: testimonial.src
}));

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
        
        {/* Testimonials animated component */}
        <AnimatedTestimonials testimonials={formattedTestimonials} autoplay={true} />
      </div>
    </section>
  );
};

export default Testimonials;
