
import React from 'react';
import { Product } from '@/lib/types';
import { trackWhatsAppClick } from '@/lib/analytics';

interface WhatsAppButtonProps {
  product: Product;
  quantity: number;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ product, quantity }) => {
  // Generate WhatsApp message
  const generateWhatsAppLink = (product: Product, quantity: number) => {
    const message = `Hola, estoy interesado en comprar ${quantity} unidad(es) del producto: *${product.name}* (SKU: ${product.sku || 'N/A'}) por $${(product.price * quantity).toFixed(2)}. ¿Podría darme más información?`;
    return `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
  };

  const handleClick = () => {
    // Registrar el clic para analíticas
    trackWhatsAppClick(product.id, product.name, product.category);
  };

  return (
    <a 
      href={generateWhatsAppLink(product, quantity)}
      target="_blank" 
      rel="noopener noreferrer"
      className="bg-[#25D366] hover:bg-[#25D366]/90 text-white px-4 py-2 rounded-md text-sm font-medium flex-1 sm:flex-none text-center"
      onClick={handleClick}
    >
      Comprar por WhatsApp
    </a>
  );
};

export default WhatsAppButton;
