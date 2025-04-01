
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Información de la Empresa */}
          <div className="space-y-4">
            <Link to="/" className="font-heading text-2xl font-semibold tracking-tight">
              ShopWhats
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Revolucionando el comercio electrónico con integración de WhatsApp para una experiencia de compra más personal.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Enlaces Rápidos */}
          <div>
            <h3 className="font-medium text-lg mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/products" 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Todos los Productos
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Contáctanos
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog" 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Nuestro Blog
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Soporte */}
          <div>
            <h3 className="font-medium text-lg mb-4">Soporte</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/faq" 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link 
                  to="/shipping" 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Política de Envíos
                </Link>
              </li>
              <li>
                <Link 
                  to="/returns" 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Devoluciones y Reembolsos
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy" 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Política de Privacidad
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Boletín */}
          <div>
            <h3 className="font-medium text-lg mb-4">Suscríbete a Nuestro Boletín</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Suscríbete para recibir ofertas especiales, sorteos y promociones exclusivas.
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Tu email" 
                className={cn(
                  "flex-1 px-4 py-2 text-sm rounded-l-md",
                  "bg-white dark:bg-gray-800 border border-border",
                  "focus:outline-none focus:ring-1 focus:ring-primary"
                )}
              />
              <button 
                type="submit" 
                className={cn(
                  "px-4 py-2 rounded-r-md",
                  "bg-primary text-primary-foreground",
                  "hover:bg-primary/90 transition-colors"
                )}
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
        
        {/* Sección inferior */}
        <div className="mt-12 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ShopWhats. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
