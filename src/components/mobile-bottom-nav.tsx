'use client';

import Link from 'next/link';
import { Home, Info, ShoppingCart, Sparkles, Compass } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { createPortal } from 'react-dom';
import { useState, useEffect } from 'react';

import { config } from '@/lib/utils';

type MobileBottomNavProps = {
  cartCount: number;
  onCartClick: () => void;
  onMenuClick: () => void;
  onAIClick: () => void;
};

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/about', icon: Info, label: 'About' },
  { href: '/cart', icon: ShoppingCart, label: 'Cart' },
  { href: 'ai', icon: Sparkles, label: 'Stylist' },
  { href: config.contact.location, icon: Compass, label: 'Visit' },
];

export function MobileBottomNav({ cartCount, onCartClick, onMenuClick, onAIClick }: MobileBottomNavProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#fcf7f3]/95 backdrop-blur-md border-t border-[#E5D3B3]/40 shadow-[0_-4px_20px_rgba(0,0,0,0.04)] z-[100] pb-safe">
      <div className="grid h-full grid-cols-5 items-center px-1">
        {navItems.map((item) => {
          const isExternal = item.href.startsWith('http');
          const buttonBaseClass = "relative flex flex-col items-center justify-center text-center text-[#1C1917]/60 hover:text-primary transition-all duration-300 group w-full h-full";

          const content = (
            <>
              <div className="relative p-1 transition-colors duration-300">
                <item.icon className="h-5 w-5 group-hover:scale-105 transition-transform duration-300" strokeWidth={1.2} />
                {item.href === 'ai' && (
                  <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                )}
              </div>
              <span className="text-[9px] font-medium tracking-widest uppercase mt-0.5 opacity-80 group-hover:opacity-100">{item.label}</span>
            </>
          );

          if (item.label === 'Cart') {
            return (
              <button
                key={item.label}
                onClick={onCartClick}
                className={buttonBaseClass}
              >
                <div className="relative p-1 transition-colors duration-300">
                  <item.icon className="h-5 w-5 group-hover:scale-105 transition-transform duration-300" strokeWidth={1.2} />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-1 -right-2 h-3.5 min-w-[14px] flex items-center justify-center rounded-full p-0 text-[8px] bg-primary text-white border border-[#fcf7f3] shadow-sm">
                      {cartCount}
                    </Badge>
                  )}
                </div>
                <span className="text-[9px] font-medium tracking-widest uppercase mt-0.5 opacity-80 group-hover:opacity-100">{item.label}</span>
              </button>
            );
          }

          if (item.href === 'ai') {
            return (
              <button
                key={item.label}
                onClick={onAIClick}
                className={buttonBaseClass}
                suppressHydrationWarning={true}
              >
                {content}
              </button>
            );
          }

          if (isExternal) {
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonBaseClass}
              >
                {content}
              </a>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={buttonBaseClass}
            >
              <div className="relative p-1 transition-colors duration-300">
                <item.icon className="h-5 w-5 group-hover:scale-105 transition-transform duration-300" strokeWidth={1.2} />
              </div>
              <span className="text-[9px] font-medium tracking-widest uppercase mt-0.5 opacity-80 group-hover:opacity-100">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>,
    document.body
  );
}
