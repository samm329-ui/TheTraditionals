'use client';

import Link from 'next/link';
import { Home, Info, ShoppingCart, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { GoogleMapsIcon } from './icons';

import { config } from '@/lib/utils';

type MobileBottomNavProps = {
  cartCount: number;
  onCartClick: () => void;
  onMenuClick: () => void;
  onAIClick: () => void;
};

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/about', icon: Info, label: 'About Us' },
  { href: '/cart', icon: ShoppingCart, label: 'Cart' },
  { href: 'ai', icon: Sparkles, label: 'AI' },
  { href: config.contact.location, icon: GoogleMapsIcon, label: 'Location' },
];

export function MobileBottomNav({ cartCount, onCartClick, onMenuClick, onAIClick }: MobileBottomNavProps) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-[#fcf7f3] border-t border-[#E5D3B3]/40 shadow-[0_-4px_10px_rgba(0,0,0,0.03)] z-50 rounded-t-2xl">
      <div className="grid h-full grid-cols-5 items-center px-1">
        {navItems.map((item) => {
          const isExternal = item.href.startsWith('http');
          const buttonBaseClass = "relative flex flex-col items-center justify-center text-center text-[#1C1917]/50 hover:text-primary transition-all duration-300 group w-full h-full pt-2 pb-4";

          const content = (
            <>
              <div className="relative p-1 rounded-full group-hover:bg-primary/5 transition-colors duration-300 mb-1">
                <item.icon className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                {item.href === 'ai' && (
                  <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-primary rounded-full animate-pulse" />
                )}
              </div>
              <span className="text-[10px] font-medium tracking-wide uppercase">{item.label}</span>
            </>
          );



          if (item.label === 'Cart') {
            return (
              <button
                key={item.label}
                onClick={onCartClick}
                className={buttonBaseClass}
              >
                <div className="relative p-1 rounded-full group-hover:bg-primary/5 transition-colors duration-300 mb-1">
                  <item.icon className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center rounded-full p-0 text-[10px] bg-primary text-white border border-[#fcf7f3]">
                      {cartCount}
                    </Badge>
                  )}
                </div>
                <span className="text-[10px] font-medium tracking-wide uppercase">{item.label}</span>
              </button>
            );
          }

          // Removed special button handler for 'menu' as it now links to /about directly

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
              <div className="relative p-1 rounded-full group-hover:bg-primary/5 transition-colors duration-300 mb-1">
                <item.icon className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
              </div>
              <span className="text-[10px] font-medium tracking-wide uppercase">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
