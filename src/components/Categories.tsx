
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

const categoryData = [
  {
    id: 1,
    name: 'Tecnología',
    description: 'Gadgets y accesorios de última generación',
    image: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?q=80&w=1000&auto=format&fit=crop',
    slug: 'tecnologia',
  },
  {
    id: 2,
    name: 'Audio',
    description: 'La mejor experiencia de sonido',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000&auto=format&fit=crop',
    slug: 'audio',
  },
  {
    id: 3,
    name: 'Wearables',
    description: 'Dispositivos que van contigo a todas partes',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1000&auto=format&fit=crop',
    slug: 'wearables',
  },
  {
    id: 4,
    name: 'Computadoras',
    description: 'Equipos potentes para trabajo y entretenimiento',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1000&auto=format&fit=crop',
    slug: 'computadoras',
  },
];

const Categories: React.FC = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="mb-10 text-center space-y-2">
          <div className="inline-flex items-center px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full">
            Explora por Categorías
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">Encuentra lo que buscas</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Navega a través de nuestras categorías principales y descubre productos de calidad para cada necesidad
          </p>
        </div>
        
        {/* Categories grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryData.map((category, index) => (
            <Link 
              key={category.id}
              to={`/products?category=${category.slug}`}
              className={cn(
                "group relative rounded-xl overflow-hidden aspect-square",
                "transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img 
                src={category.image} 
                alt={category.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                <h3 className="font-bold text-xl mb-1">{category.name}</h3>
                <p className="text-sm text-white/80 mb-3">{category.description}</p>
                <div className="flex items-center text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Ver productos</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
