"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { config } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingCart } from "lucide-react";

import { type CartItem } from "@/app/page";
import { type Product } from "@/lib/products";
import ProductMenuDropdown from "./product-menu-dropdown";
import { Badge } from "@/components/ui/badge";

type HeaderProps = {
  cart: CartItem[];
  onEmptyCart: () => void;
  onAddToCart: (item: Product) => void;
  onRemoveFromCart: (itemName: string) => void;
  isDropdownOpen: boolean;
  onDropdownOpenChange: (open: boolean) => void;
  onProductSelect: (item: Product) => void;
  isMobile: boolean;
  isCartOpen: boolean;
  onCartToggle: (open: boolean) => void;
};

const Header = ({
  cart,
  onEmptyCart,
  onAddToCart,
  onRemoveFromCart,
  isDropdownOpen,
  onDropdownOpenChange,
  onProductSelect,
  isMobile,
  isCartOpen,
  onCartToggle,
}: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const desktopNavLinks = config.navbarLinks.filter(link => link.name !== 'Products');
  const mobileNavLinks = config.navbarLinks;

  const navLinks = isMobile ? mobileNavLinks : desktopNavLinks;

  let navTextColor: string;
  if (isMobile) {
    navTextColor = "text-[#1C1917]";
  } else {
    navTextColor = isScrolled ? "text-[#1C1917]" : "text-[#1C1917] hover:text-primary";
  }

  const mobileMenuBg = isMobileMenuOpen ? "bg-background/95" : "bg-transparent";

  const headerClasses = cn(
    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
    isMobile
      ? "bg-[#fcf7f3]/90 shadow-sm backdrop-blur-md border-[#E5D3B3]/20"
      : "translate-y-0",
    !isMobile && (isScrolled ? "bg-[#fcf7f3]/90 shadow-sm backdrop-blur-md border-[#E5D3B3]/20 py-2" : "bg-transparent py-4")
  );

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <header
        className={headerClasses}
      >
        <div className="container mx-auto px-6">
          <div className="flex h-24 items-center justify-between">
            {/* Left side: Hamburger for mobile */}
            <div className="md:hidden flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn("text-primary hover:text-primary/80 hover:bg-primary/5")}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </div>

            {/* Desktop Logo */}
            <div className="hidden md:flex items-center">
              <Link href="/" className="font-heading font-bold text-2xl text-primary tracking-wide">
                The Traditional Needle Work
              </Link>
            </div>


            {/* Center: Navigation Links */}
            <nav className={cn("hidden md:flex flex-1 justify-center items-center", isMobile && "flex")}>
              <ul className="flex items-center space-x-6">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Button variant="ghost" asChild className={cn(navTextColor, "text-base font-medium tracking-wide hover:text-primary hover:bg-transparent transition-colors duration-300")}>
                      <Link href={link.href}>{link.name}</Link>
                    </Button>
                  </li>
                ))}
                {!isMobile && (
                  <li>
                    <ProductMenuDropdown
                      onAddToCart={onAddToCart}
                      onProductSelect={onProductSelect}
                      onOpenChange={onDropdownOpenChange}
                      className={cn(navTextColor, "text-base font-medium tracking-wide hover:text-primary hover:bg-transparent transition-colors duration-300")}
                    />
                  </li>
                )}
              </ul>
            </nav>

            {/* Right side: Cart */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild className={cn("relative hover:bg-primary/5 transition-colors duration-300", navTextColor)}>
                <Link href="/cart">
                  <ShoppingCart className="h-6 w-6" />
                  {totalCartItems > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center p-0 bg-primary text-white text-xs font-bold border-2 border-background">
                      {totalCartItems}
                    </Badge>
                  )}
                  <span className="sr-only">View Cart</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={cn("fixed inset-0 top-20 z-40 backdrop-blur-sm md:hidden animate-in fade-in-20", mobileMenuBg)}>
          <nav className="container mx-auto px-4 pt-4">
            <ul className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Button variant="ghost" asChild className="w-full justify-start text-lg" onClick={() => setIsMobileMenuOpen(false)}>
                    <Link href={link.href}>{link.name}</Link>
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
