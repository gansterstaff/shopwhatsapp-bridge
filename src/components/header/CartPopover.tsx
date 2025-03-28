
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useCart } from '@/contexts/CartContext';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";

const CartPopover: React.FC = () => {
  const { items, total, removeItem } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="p-2 hover:bg-secondary rounded-full transition-colors relative">
          <ShoppingCart className="h-5 w-5" />
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {items.length}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Tu Carrito ({items.length})</SheetTitle>
        </SheetHeader>
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-60">
            <ShoppingCart className="h-12 w-12 text-gray-300 mb-4" />
            <p className="text-gray-500">Tu carrito está vacío</p>
            <SheetClose asChild>
              <Button asChild className="mt-4">
                <Link to="/products">Ver productos</Link>
              </Button>
            </SheetClose>
          </div>
        ) : (
          <div className="flex flex-col h-full max-h-full">
            <div className="flex-1 overflow-auto py-4">
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item.product.id} className="flex items-center space-x-3 py-2">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="h-16 w-16 object-cover rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium truncate">{item.product.name}</h4>
                      <p className="text-sm text-gray-500">
                        {item.quantity} x ${item.product.price.toFixed(2)}
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-gray-500 hover:text-red-500"
                      onClick={() => removeItem(item.product.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between py-2">
                <span className="font-medium">Total:</span>
                <span className="font-bold">${total.toFixed(2)}</span>
              </div>
              <div className="flex flex-col space-y-2 mt-4">
                <SheetClose asChild>
                  <Button asChild>
                    <Link to="/cart">Ver carrito</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button variant="outline" asChild>
                    <Link to="/products">Seguir comprando</Link>
                  </Button>
                </SheetClose>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartPopover;
