'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { createPortal } from 'react-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { LucideIcon } from 'lucide-react';
import {
  CodeIcon,
  GlobeIcon,
  LayersIcon,
  UserPlusIcon,
  Users,
  Star,
  FileText,
  Shield,
  RotateCcw,
  Handshake,
  Leaf,
  HelpCircle,
  BarChart,
  PlugIcon,
  ShoppingCart,
} from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

type LinkItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  description?: string;
};

// Props for Header to maintain compatibility with existing usage in page.tsx
type HeaderProps = {
  cart?: any[]; // Keep as optional/any if strictly needed or match CartItem[]
  onEmptyCart?: () => void;
  onAddToCart?: (item: any) => void;
  onRemoveFromCart?: (itemName: string) => void;
  isDropdownOpen?: boolean;
  onDropdownOpenChange?: (open: boolean) => void;
  onProductSelect?: (item: any) => void;
  isMobile?: boolean;
  isCartOpen?: boolean;
  onCartToggle?: (open: boolean) => void;
};

export default function Header({
  cart = [],
  onCartToggle,
}: HeaderProps) {
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(10);
  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn('fixed top-0 left-0 right-0 z-50 w-full border-b transition-all duration-300', {
        'bg-background/95 supports-[backdrop-filter]:bg-background/60 border-border/40 backdrop-blur-md shadow-sm':
          scrolled,
        'bg-black/20 supports-[backdrop-filter]:bg-black/10 backdrop-blur-sm border-white/10 py-4': !scrolled
      })}
    >
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="font-heading font-bold text-xl md:text-2xl text-[#C8A165] tracking-wide whitespace-nowrap">The Traditional Needle Work</span>
          </Link>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-2">
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={cn("group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50", scrolled ? "text-foreground" : "text-white hover:text-foreground")}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn("bg-transparent", scrolled ? "text-foreground" : "text-white hover:text-foreground")}>Collections</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-background p-4 md:w-[400px] lg:w-[500px]">
                  <ul className="grid w-full gap-y-3 gap-x-4 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {productLinks.map((item, i) => (
                      <li key={i}>
                        <Link href={item.href} legacyBehavior passHref>
                          <ListItem {...item} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/#featured" legacyBehavior passHref>
                  <NavigationMenuLink className={cn("group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50", scrolled ? "text-foreground" : "text-white hover:text-foreground")}>
                    Featured
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/#products" legacyBehavior passHref>
                  <NavigationMenuLink className={cn("group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50", scrolled ? "text-foreground" : "text-white hover:text-foreground")}>
                    All Products
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/#reviews" legacyBehavior passHref>
                  <NavigationMenuLink className={cn("group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50", scrolled ? "text-foreground" : "text-white hover:text-foreground")}>
                    Reviews
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/#contact" legacyBehavior passHref>
                  <NavigationMenuLink className={cn("group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50", scrolled ? "text-foreground" : "text-white hover:text-foreground")}>
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="hidden items-center gap-4 md:flex">
          {/* AI Stylist Button with Sparkles */}
          <Button
            variant="ghost"
            className={cn("gap-2 text-sm font-medium", scrolled ? "text-foreground hover:bg-accent" : "text-white hover:bg-white/10 hover:text-white")}
          // Trigger AI logic if needed, or link to AI section
          // For now just partial UI implementation
          >
            <Sparkles className="h-4 w-4 text-[#C8A165]" />
            <span>AI Stylist</span>
          </Button>

          <Button variant="ghost" size="icon" className={cn("relative hover:bg-primary/5 transition-colors duration-300", scrolled ? "text-foreground" : "text-white hover:text-white")} onClick={() => onCartToggle?.(true)}>
            <ShoppingCart className="h-5 w-5" />
            {totalCartItems > 0 && (
              <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full flex items-center justify-center p-0 bg-[#C8A165] text-white text-[10px] font-bold border-[1.5px] border-background">
                {totalCartItems}
              </Badge>
            )}
            <span className="sr-only">View Cart</span>
          </Button>
        </div>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setOpen(!open)}
          className={cn("md:hidden", scrolled ? "text-foreground" : "text-white")}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          <MenuToggleIcon open={open} className="size-6" duration={300} />
        </Button>
      </nav>
      <MobileMenu open={open} className="flex flex-col justify-between gap-4 overflow-y-auto pb-8">
        <NavigationMenu className="max-w-full items-start justify-start w-full">
          <div className="flex w-full flex-col gap-y-4 px-2">
            <Link href="/" onClick={() => setOpen(false)} className="text-lg font-medium py-2 border-b border-border/40 w-full">Home</Link>
            <div className="flex flex-col gap-y-2">
              <span className="text-sm font-serif text-muted-foreground uppercase tracking-wider">Collections</span>
              {productLinks.map((link) => (
                <Link key={link.title} href={link.href} onClick={() => setOpen(false)}>
                  <ListItem {...link} />
                </Link>
              ))}
            </div>
            <Link href="/#featured" onClick={() => setOpen(false)} className="text-lg font-medium py-2 border-b border-border/40 w-full">Featured</Link>
            <Link href="/#products" onClick={() => setOpen(false)} className="text-lg font-medium py-2 border-b border-border/40 w-full">All Products</Link>
            <Link href="/#reviews" onClick={() => setOpen(false)} className="text-lg font-medium py-2 border-b border-border/40 w-full">Reviews</Link>
            <Link href="/#contact" onClick={() => setOpen(false)} className="text-lg font-medium py-2 border-b border-border/40 w-full">Contact</Link>
          </div>
        </NavigationMenu>
        <div className="flex flex-col gap-4 px-4 mt-auto">
          <Button className="w-full gap-2 bg-gradient-to-r from-[#C8A165] to-[#B08D55] text-white font-serif" onClick={() => setOpen(false)}>
            <Sparkles className="h-4 w-4 text-white" /> AI Stylist
          </Button>
        </div>
      </MobileMenu>
    </header>
  );
}

type MobileMenuProps = React.ComponentProps<'div'> & {
  open: boolean;
};

function MobileMenu({ open, children, className, ...props }: MobileMenuProps) {
  if (!open || typeof window === 'undefined') return null;

  return createPortal(
    <div
      id="mobile-menu"
      className={cn(
        'bg-background/95 supports-[backdrop-filter]:bg-background/90 backdrop-blur-xl',
        'fixed top-16 right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden border-t md:hidden',
      )}
    >
      <div
        data-slot={open ? 'open' : 'closed'}
        className={cn(
          'data-[slot=open]:animate-in data-[slot=open]:zoom-in-95 ease-out duration-300',
          'size-full p-4',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & LinkItem
>(({ className, title, description, icon: Icon, ...props }, ref) => {
  return (
    <a ref={ref} className={cn('w-full flex flex-row gap-x-3 hover:bg-accent/50 rounded-lg p-3 transition-colors cursor-pointer group', className)} {...props}>
      <div className="bg-[#C8A165]/10 flex aspect-square size-10 items-center justify-center rounded-md border border-[#C8A165]/20 group-hover:border-[#C8A165]/50 transition-colors">
        <Icon className="text-[#C8A165] size-5" />
      </div>
      <div className="flex flex-col items-start justify-center">
        <span className="font-medium text-sm text-foreground/90 group-hover:text-[#C8A165] transition-colors">{title}</span>
        <span className="text-muted-foreground text-xs line-clamp-1">{description}</span>
      </div>
    </a>
  );
});
ListItem.displayName = "ListItem";


// Updated links mapping to actual sections or placeholders
const productLinks: LinkItem[] = [
  {
    title: 'Punjabis',
    href: '/#products', // ideally specific category link but #products for now
    description: 'Handcrafted embroidered panjabis',
    icon: LayersIcon,
  },
  {
    title: 'Designer Blouses',
    href: '/#products',
    description: 'Custom stitched designer blouses',
    icon: Star,
  },
  {
    title: 'Sarees',
    href: '/#products',
    description: 'Traditional authentic sarees',
    icon: GlobeIcon,
  },
  {
    title: 'Custom Design',
    href: '/#contact',
    description: 'Get your outfit custom designed',
    icon: CodeIcon,
  },
];

const companyLinks: LinkItem[] = [
  {
    title: 'About Us',
    href: '/about',
    description: 'Our heritage and story',
    icon: Users,
  },
  {
    title: 'Customer Stories',
    href: '/#reviews',
    description: 'Love from our patrons',
    icon: Star,
  },
];

const companyLinks2: LinkItem[] = [
  {
    title: 'Terms of Service',
    href: '/terms',
    icon: FileText,
  },
  {
    title: 'Privacy Policy',
    href: '/privacy-policy',
    icon: Shield,
  },
];


function useScroll(threshold: number) {
  const [scrolled, setScrolled] = React.useState(false);

  const onScroll = React.useCallback(() => {
    setScrolled(window.scrollY > threshold);
  }, [threshold]);

  React.useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  // also check on first load
  React.useEffect(() => {
    onScroll();
  }, [onScroll]);

  return scrolled;
}

// Sparkle Icon for AI
function Sparkles(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M9 5H3" />
    </svg>
  )
}
