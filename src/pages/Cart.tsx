
import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { 
  MinusCircle, 
  PlusCircle, 
  ShoppingCart, 
  Trash2, 
  ArrowRight, 
  ShoppingBag 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { items, removeItem, updateQuantity, clearCart, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24">
        <Card className="mx-auto max-w-lg">
          <CardHeader className="text-center">
            <ShoppingCart className="mx-auto h-12 w-12 text-gray-400 mb-2" />
            <CardTitle className="text-xl">Tu carrito está vacío</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-gray-500">
            <p>Parece que no has añadido ningún producto a tu carrito.</p>
          </CardContent>
          <CardFooter className="flex justify-center pb-6">
            <Button asChild>
              <Link to="/products">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Explorar productos
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold mb-8">Tu Carrito</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Productos</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                  onClick={clearCart}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Vaciar carrito
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Producto</TableHead>
                    <TableHead className="text-right">Precio</TableHead>
                    <TableHead className="text-center">Cantidad</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => {
                    const itemTotal = item.product.price * item.quantity;
                    
                    return (
                      <TableRow key={item.product.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <img 
                              src={item.product.image} 
                              alt={item.product.name} 
                              className="h-16 w-16 object-cover rounded-md"
                            />
                            <div>
                              <Link 
                                to={`/product/${item.product.id}`}
                                className="font-medium hover:text-primary"
                              >
                                {item.product.name}
                              </Link>
                              <p className="text-sm text-gray-500">{item.product.category}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          ${item.product.price.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            >
                              <MinusCircle className="h-4 w-4" />
                            </Button>
                            <Input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value) || 1)}
                              className="h-8 w-14 text-center mx-1"
                            />
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            >
                              <PlusCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          ${itemTotal.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => removeItem(item.product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Resumen del pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Envío</span>
                <span>Calculado en el siguiente paso</span>
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between font-medium">
                <span>Total</span>
                <span className="text-xl">${total.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter className="flex-col space-y-2">
              <Button className="w-full">
                Finalizar compra
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link to="/products">
                  Continuar comprando
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;
