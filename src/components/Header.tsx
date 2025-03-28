import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ShoppingCart, Menu, X, Search, User, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet";
import SearchModal from './SearchModal';
import NotificationsPopover from './NotificationsPopover';
import FavoritesPopover from './FavoritesPopover';
import PromotionalBanner from './PromotionalBanner';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { items, total, removeItem } = useCart();
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const openSearch = () => {
    setIsSearchOpen(true);
  };
  
  return (
    <>
      <PromotionalBanner />
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
          isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
        )}
        style={{ top: isScrolled ? '0' : 'auto' }}
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link 
              to="/" 
              className="font-heading text-2xl font-semibold tracking-tight"
            >
              ShopWhats
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="nav-link font-medium text-sm">
                Home
              </Link>
              <Link to="/products" className="nav-link font-medium text-sm">
                Productos
              </Link>
              <Link to="/about" className="nav-link font-medium text-sm">
                Nosotros
              </Link>
              <Link to="/contact" className="nav-link font-medium text-sm">
                Contacto
              </Link>
            </nav>
            
            {/* Right side icons */}
            <div className="flex items-center space-x-2">
              <button 
                className="p-2 hover:bg-secondary rounded-full transition-colors"
                onClick={openSearch}
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Notifications */}
              <NotificationsPopover />

              {/* Favorites */}
              <FavoritesPopover />

              {/* Mini Cart */}
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

              {/* User Menu */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-1 hover:bg-secondary rounded-full transition-colors">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.user_metadata?.avatar_url || ''} />
                        <AvatarFallback>
                          {user.user_metadata?.name 
                            ? getInitials(user.user_metadata.name) 
                            : user.email?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile">Perfil</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/orders">Mis pedidos</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/settings">Configuración</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="text-red-500">
                      <LogOut className="mr-2 h-4 w-4" />
                      Cerrar sesión
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link to="/login" className="p-2 hover:bg-secondary rounded-full transition-colors">
                  <User className="h-5 w-5" />
                </Link>
              )}
              
              {/* Mobile menu button */}
              <button 
                className="md:hidden p-2 hover:bg-secondary rounded-full transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div 
          className={cn(
            "fixed inset-0 bg-background z-40 transition-transform duration-300 ease-in-out transform md:hidden",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
          style={{ top: '72px' }}
        >
          <nav className="flex flex-col p-6 space-y-6">
            <Link 
              to="/" 
              className="text-lg font-medium p-2 hover:bg-secondary rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="text-lg font-medium p-2 hover:bg-secondary rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Productos
            </Link>
            <Link 
              to="/about" 
              className="text-lg font-medium p-2 hover:bg-secondary rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Nosotros
            </Link>
            <Link 
              to="/contact" 
              className="text-lg font-medium p-2 hover:bg-secondary rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contacto
            </Link>
            
            {user ? (
              <>
                <Link 
                  to="/profile" 
                  className="text-lg font-medium p-2 hover:bg-secondary rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Mi Perfil
                </Link>
                <Link 
                  to="/orders" 
                  className="text-lg font-medium p-2 hover:bg-secondary rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Mis Pedidos
                </Link>
                <button 
                  onClick={() => {
                    handleSignOut();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-lg font-medium p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors text-left"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="text-lg font-medium p-2 hover:bg-secondary rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Iniciar sesión
              </Link>
            )}
          </nav>
        </div>

        {/* Search Modal */}
        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      </header>
    </>
  );
};

export default Header;
