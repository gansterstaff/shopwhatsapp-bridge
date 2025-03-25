
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ShoppingCart, Menu, X, Search, User } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
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
              Products
            </Link>
            <Link to="/about" className="nav-link font-medium text-sm">
              About
            </Link>
            <Link to="/contact" className="nav-link font-medium text-sm">
              Contact
            </Link>
          </nav>
          
          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-secondary rounded-full transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <Link to="/cart" className="p-2 hover:bg-secondary rounded-full transition-colors relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
            <Link to="/account" className="p-2 hover:bg-secondary rounded-full transition-colors">
              <User className="h-5 w-5" />
            </Link>
            
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
            Products
          </Link>
          <Link 
            to="/about" 
            className="text-lg font-medium p-2 hover:bg-secondary rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className="text-lg font-medium p-2 hover:bg-secondary rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
