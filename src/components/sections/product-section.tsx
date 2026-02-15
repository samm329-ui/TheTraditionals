
"use client";

import * as React from 'react';
import Image from 'next/image';
import { type Product, type Category } from "@/lib/products";
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from '@/lib/utils';
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Phone, Star, Filter, ShoppingCart, Plus, Minus, ChevronLeft, ChevronRight, Menu, X, Sparkles, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { type CartItem } from '@/app/page';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { chat } from "@/ai/flows/chat";


const PremiumProductCard = ({ item, cart, onAddToCart, onRemoveFromCart, onCardClick }: {
    item: Product;
    cart: CartItem[];
    onAddToCart: (product: Product, size?: string) => void;
    onRemoveFromCart: (itemName: string, size?: string) => void;
    onCardClick: (product: Product) => void;
}) => {
    const [selectedSize, setSelectedSize] = React.useState<string | undefined>(item.sizes?.[0]);
    const cartItem = React.useMemo(() => {
        return cart.find(ci => ci.name === item.name && ci.selectedSize === selectedSize);
    }, [cart, item.name, selectedSize]);

    const mainImage = item.images && item.images.length > 0 ? item.images[0] : null;

    return (
        <div className="flex flex-col w-full h-full overflow-hidden bg-[#F6F2EB] rounded-2xl shadow-premium border border-[#C8A165]/40 p-4" onClick={() => onCardClick(item)}>
            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-xl bg-white mb-4">
                {mainImage ? (
                    <Image
                        src={mainImage}
                        alt={item.description}
                        fill
                        sizes="(max-width: 768px) 50vw, 200px"
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                        quality={80}
                    />
                ) : (
                    <div className="bg-secondary/30 w-full h-full rounded-xl flex items-center justify-center">
                        <span className="text-sm text-muted-foreground">Premium Selection</span>
                    </div>
                )}
                {item.originalPrice && (
                    <Badge className="absolute top-2 right-2 bg-[#C8A165] text-white border-0 shadow-sm">PREMIUM</Badge>
                )}
            </div>

            <div className="flex flex-col flex-1">
                <h3 className="font-heading font-bold text-base text-[#3A2A1F] line-clamp-2 leading-snug mb-2">{item.name}</h3>

                <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-0.5">
                        <Star className="h-3 w-3 text-[#C8A165] fill-[#C8A165]" />
                        <span className="text-xs font-bold text-[#3A2A1F]">{item.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-[11px] text-[#3A2A1F]/60">({item.ratingsCount}+ reviews)</span>
                </div>

                <div className="mt-auto pt-3 border-t border-[#C8A165]/20">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-[#3A2A1F]/50 uppercase tracking-wider font-medium">Starting from</span>
                            <span className="font-heading font-bold text-lg text-[#3A2A1F]">₹{item.price.toLocaleString('en-IN')}</span>
                        </div>
                        {item.originalPrice && <del className="text-xs text-[#3A2A1F]/40 italic">₹{item.originalPrice.toLocaleString('en-IN')}</del>}
                    </div>

                    <Button
                        className="w-full rounded-full bg-[#3A2A1F] text-[#F6F2EB] hover:bg-[#2a1e16] shadow-md transition-all h-10 font-serif text-sm border border-[#C8A165]/30 group"
                        onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(item, selectedSize);
                        }}
                    >
                        {cartItem ? `In Cart (${cartItem.quantity})` : "View Details"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

const CategoryProductDialog = ({
    isOpen,
    onOpenChange,
    category,
    cart,
    onAddToCart,
    onRemoveFromCart,
    onCardClick,
    onCartClick,
}: {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    category: Category | null;
    cart: CartItem[];
    onAddToCart: (product: Product, size?: string) => void;
    onRemoveFromCart: (itemName: string, size?: string) => void;
    onCardClick: (product: Product) => void;
    onCartClick: () => void;
}) => {
    if (!category) return null;
    const totalCartItems = cart.reduce((total, pi) => total + pi.quantity, 0);
    const isPremiumSarees = category.name === "Premium Sarees";

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="p-0 w-full h-full max-w-full rounded-none border-0 flex flex-col top-0 left-0 translate-x-0 translate-y-0 data-[state=open]:animate-in data-[state=open]:zoom-in-90 data-[state=closed]:zoom-out-90 data-[state=closed]:animate-out overflow-hidden">
                <DialogHeader className="p-4 border-b flex-row items-center justify-between sticky top-0 bg-[#F6F2EB] backdrop-blur-sm z-10">
                    <DialogTitle className="text-xl text-[#3A2A1F] font-heading font-bold">{category.name}</DialogTitle>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="relative text-[#3A2A1F]" onClick={onCartClick}>
                            <ShoppingCart className="h-5 w-5" />
                            {totalCartItems > 0 && (
                                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center p-1 text-xs bg-[#C8A165] text-white border-0">
                                    {totalCartItems}
                                </Badge>
                            )}
                            <span className="sr-only">View Cart</span>
                        </Button>
                        <DialogClose asChild>
                            <Button variant="ghost" size="icon" className="text-[#3A2A1F]/60">
                                <X className="h-5 w-5" />
                            </Button>
                        </DialogClose>
                    </div>
                </DialogHeader>
                <ScrollArea className="flex-grow bg-[#F6F2EB]">
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4 p-4">
                        {category.products.map(item => (
                            <MobileProductCard
                                key={item.name}
                                item={item}
                                cart={cart}
                                onAddToCart={onAddToCart}
                                onRemoveFromCart={onRemoveFromCart}
                                onCardClick={onCardClick}
                            />
                        ))}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};


const useSyncCarousel = (apis: (CarouselApi | undefined)[], enabled: boolean) => {
    React.useEffect(() => {
        if (!enabled || apis.some(api => !api)) {
            return;
        }
        const [api1, api2] = apis as CarouselApi[];

        let isScrolling1 = false;
        let isScrolling2 = false;

        const onSelect1 = () => {
            if (!isScrolling2) {
                isScrolling1 = true;
                if (api1 && api2 && api2.selectedScrollSnap() !== api1.selectedScrollSnap()) {
                    api2.scrollTo(api1.selectedScrollSnap(), true);
                }
                isScrolling1 = false;
            }
        };
        const onSelect2 = () => {
            if (!isScrolling1) {
                isScrolling2 = true;
                if (api1 && api2 && api1.selectedScrollSnap() !== api2.selectedScrollSnap()) {
                    api1.scrollTo(api2.selectedScrollSnap(), true);
                }
                isScrolling2 = false;
            }
        };

        api1?.on("select", onSelect1);
        api2?.on("select", onSelect2);

        const timeout = setTimeout(() => {
            if (api1 && api2 && api1.selectedScrollSnap() !== api2.selectedScrollSnap()) {
                api2.scrollTo(api1.selectedScrollSnap(), true);
            }
        }, 100);


        return () => {
            api1?.off("select", onSelect1);
            api2?.off("select", onSelect2);
            clearTimeout(timeout);
        };
    }, [apis, enabled]);
};

const FilteredProductDialog = ({
    isOpen,
    onOpenChange,
    products,
    title,
    description,
    cart,
    onAddToCart,
    onRemoveFromCart
}: {
    isOpen: boolean,
    onOpenChange: (open: boolean) => void,
    products: Product[],
    title: string,
    description: string,
    cart: CartItem[],
    onAddToCart: (product: Product, size?: string) => void,
    onRemoveFromCart: (itemName: string, size?: string) => void
}) => {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg bg-background p-0 border shadow-2xl rounded-2xl">
                <DialogHeader className="p-6 pb-4 border-b">
                    <DialogTitle className='text-xl font-heading font-bold'>{title}</DialogTitle>
                    <DialogDescription className="font-body text-muted-foreground">
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="max-h-[60vh]">
                    <div className="p-6 pt-4 space-y-3">
                        {products.length > 0 ? products.map(item => {
                            const cartItem = cart.find(ci => ci.name === item.name);
                            return (
                                <MobileProductCard
                                    key={item.name}
                                    item={item}
                                    cart={cart}
                                    onAddToCart={onAddToCart}
                                    onRemoveFromCart={onRemoveFromCart}
                                    onCardClick={() => onOpenChange(false)}
                                />
                            )
                        }) : <p className="text-muted-foreground text-center py-8">No items match your filter.</p>}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}

const DesktopProductCard = ({ item, cart, onCardClick, onAddToCart, onRemoveFromCart }: {
    item: Product;
    cart: CartItem[];
    onCardClick: (item: Product) => void;
    onAddToCart: (item: Product, size?: string) => void;
    onRemoveFromCart: (itemName: string, size?: string) => void;
}) => {
    const [selectedSize, setSelectedSize] = React.useState<string | undefined>(item.sizes?.[0]);
    const cartItem = React.useMemo(() => {
        return cart.find(ci => ci.name === item.name && ci.selectedSize === selectedSize);
    }, [cart, item.name, selectedSize]);
    const discount = item.originalPrice ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100) : 0;
    const mainImage = item.images && item.images.length > 0 ? item.images[0] : null;

    return (
        <div className="p-1 transition-all duration-500 ease-out hover:-translate-y-2 h-full cursor-pointer"
            onClick={() => onCardClick(item)}
        >
            <div className="w-full h-full bg-card rounded-2xl border border-primary/10 flex flex-col group shadow-lg hover:shadow-[0_20px_50px_rgba(200,161,101,0.15)] transition-all duration-500 overflow-hidden relative">
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-white">
                    {mainImage ? (
                        <Image
                            src={mainImage}
                            alt={item.description}
                            fill
                            sizes="(max-width: 640px) 80vw, 33vw"
                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                            loading="lazy"
                            quality={85}
                        />
                    ) : (
                        <div className="w-full h-full bg-secondary/30 flex items-center justify-center">
                            <span className="text-muted-foreground text-sm">No Image</span>
                        </div>
                    )}

                    {/* Overlays */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />

                    {/* Gold Shine Overlay */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#C8A165]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {discount > 0 && (
                        <Badge className="absolute top-3 right-3 bg-red-600 text-white border-0 shadow-sm">{discount}% OFF</Badge>
                    )}

                    {item.images && item.images.length > 1 && (
                        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-bold shadow-sm text-foreground">
                            +{item.images.length - 1} Photos
                        </div>
                    )}
                </div>

                <div className="p-5 flex flex-col flex-grow bg-card relative">
                    {/* Decorative gold border on content */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#C8A165]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className='min-w-0 flex-grow space-y-3'>
                        <div>
                            <h3 className="font-heading text-lg font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors duration-300">
                                {item.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                                <div className="flex items-center">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star key={i} className={cn(
                                            "h-3 w-3",
                                            i < item.rating ? "text-[#C8A165] fill-[#C8A165]" : "text-muted-foreground/30"
                                        )} />
                                    ))}
                                </div>
                                <span className="text-[10px] text-muted-foreground font-medium">({item.ratingsCount})</span>
                            </div>
                        </div>

                        <p className="font-body text-muted-foreground text-xs line-clamp-2 leading-relaxed h-[2.5em]">
                            {item.description}
                        </p>

                        <div className="flex items-baseline gap-2 pt-1">
                            <span className="font-heading font-bold text-xl text-primary">₹{item.price}</span>
                            {item.originalPrice && <del className="text-sm text-muted-foreground/60 italic font-body">₹{item.originalPrice}</del>}
                        </div>

                        {item.sizes && item.sizes.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                                {item.sizes.map(size => (
                                    <button
                                        key={size}
                                        onClick={(e) => { e.stopPropagation(); setSelectedSize(size); }}
                                        className={cn(
                                            "text-[10px] px-2 py-1 rounded border transition-all duration-300",
                                            selectedSize === size
                                                ? "bg-[#3A2A1F] text-[#F6F2EB] border-[#3A2A1F] shadow-sm"
                                                : "bg-[#F8F5F0] border-[#C8A165]/20 text-[#3A2A1F]/80 hover:border-[#C8A165]/60"
                                        )}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="mt-5 pt-4 border-t border-border/50">
                        {cartItem ? (
                            <div className="w-full flex items-center justify-between gap-3 bg-[#F8F5F0] p-1 rounded-full border border-[#C8A165]/20">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 rounded-full p-0 hover:bg-white text-primary"
                                    onClick={(e) => { e.stopPropagation(); onRemoveFromCart(item.name, cartItem.selectedSize); }}
                                >
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <span className="font-heading font-bold text-base text-foreground">{cartItem.quantity}</span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 rounded-full p-0 hover:bg-white text-primary"
                                    onClick={(e) => { e.stopPropagation(); onAddToCart(item, cartItem.selectedSize); }}
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        ) : (
                            <Button
                                size="sm"
                                className="w-full bg-[#3A2A1F] hover:bg-[#2a1e16] text-[#F6F2EB] shadow-md hover:shadow-lg transition-all duration-300 rounded-full font-medium tracking-wide h-10 group/btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onAddToCart(item, selectedSize);
                                }}
                            >
                                <Plus className="mr-2 h-4 w-4 transition-transform group-hover/btn:rotate-90" /> Add to Cart
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProductRow = React.memo(({
    items,
    setApi,
    carouselId,
    cart,
    onAddToCart,
    onRemoveFromCart,
    isSyncEnabled,
    onCardClick,
}: {
    items: Product[],
    setApi: (api: CarouselApi) => void,
    carouselId: string,
    cart: CartItem[],
    onAddToCart: (item: Product, size?: string) => void,
    onRemoveFromCart: (itemName: string, size?: string) => void,
    isSyncEnabled: boolean
    onCardClick: (item: Product) => void,
}) => {
    const [api, setLocalApi] = React.useState<CarouselApi>();
    const scrollIntervalRef = React.useRef<NodeJS.Timeout | null>(null);

    React.useEffect(() => {
        if (api) {
            setApi(api);
        }
    }, [api, setApi]);

    const scrollPrev = React.useCallback(() => api && api.scrollPrev(), [api]);
    const scrollNext = React.useCallback(() => api && api.scrollNext(), [api]);

    const startScrolling = React.useCallback((direction: 'prev' | 'next') => {
        if (!isSyncEnabled) return;
        if (scrollIntervalRef.current) return;
        scrollIntervalRef.current = setInterval(() => {
            if (api) {
                if (direction === 'next') scrollNext();
                else scrollPrev();
            }
        }, 300);
    }, [api, isSyncEnabled, scrollNext, scrollPrev]);

    const stopScrolling = React.useCallback(() => {
        if (scrollIntervalRef.current) {
            clearInterval(scrollIntervalRef.current);
            scrollIntervalRef.current = null;
        }
    }, []);

    React.useEffect(() => {
        return () => stopScrolling();
    }, [stopScrolling]);

    return (
        <div className="w-full relative group/carousel">
            <Carousel
                setApi={setLocalApi}
                opts={{ align: "start", loop: false, dragFree: true }}
                className="w-full"
            >
                <CarouselContent className="-ml-4 py-8">
                    {items.map((item, index) => {

                        const discount = item.originalPrice ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100) : 0;
                        const mainImage = item.images && item.images.length > 0 ? item.images[0] : null;

                        return (
                            <CarouselItem
                                key={`${carouselId}-${item.name}-${index}`}
                                className="pl-6 basis-[80%] sm:basis-[33%] md:basis-[25%]"
                            >
                                <div className="block md:hidden">
                                    <MobileProductCard
                                        item={item}
                                        cart={cart}
                                        onCardClick={onCardClick}
                                        onAddToCart={onAddToCart}
                                        onRemoveFromCart={onRemoveFromCart}
                                    />
                                </div>
                                <div className="hidden md:block h-full">
                                    <DesktopProductCard
                                        item={item}
                                        cart={cart}
                                        onCardClick={onCardClick}
                                        onAddToCart={onAddToCart}
                                        onRemoveFromCart={onRemoveFromCart}
                                    />
                                </div>
                            </CarouselItem>
                        )
                    })}
                </CarouselContent>
            </Carousel>

            <div className="absolute inset-y-0 left-0 hidden md:flex items-center">
                <Button variant="ghost" size="icon" onClick={scrollPrev} className="h-10 w-10 border border-border rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-primary hover:text-white opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 z-30 ml-2">
                    <ChevronLeft className="h-5 w-5" />
                </Button>
            </div>
            <div className="absolute inset-y-0 right-0 hidden md:flex items-center">
                <Button variant="ghost" size="icon" onClick={scrollNext} className="h-10 w-10 border border-border rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-primary hover:text-white opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 z-30 mr-2">
                    <ChevronRight className="h-5 w-5" />
                </Button>
            </div>
        </div>
    );
});
ProductRow.displayName = 'ProductRow';


const MobileProductCard = ({ item, cart, onAddToCart, onRemoveFromCart, onCardClick }: {
    item: Product;
    cart: CartItem[];
    onAddToCart: (product: Product, size?: string) => void;
    onRemoveFromCart: (itemName: string, size?: string) => void;
    onCardClick: (product: Product) => void;
}) => {
    const [selectedSize, setSelectedSize] = React.useState<string | undefined>(item.sizes?.[0]);
    const cartItem = React.useMemo(() => {
        return cart.find(ci => ci.name === item.name && ci.selectedSize === selectedSize);
    }, [cart, item.name, selectedSize]);

    const mainImage = item.images && item.images.length > 0 ? item.images[0] : null;

    const AddButton = ({ isSmall }: { isSmall?: boolean }) => (
        <div className="flex gap-2 w-full">
            <Button
                variant="outline"
                className={cn(
                    "flex-1 rounded-full border-primary text-primary hover:bg-primary hover:text-white shadow-sm transition-all",
                    isSmall ? "h-8 text-[10px] px-2" : "h-9 text-xs px-3"
                )}
                onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(item, selectedSize);
                }}
            >
                Add to Cart
            </Button>
            <Button
                className={cn(
                    "flex-1 rounded-full bg-[#3A2A1F] text-[#F6F2EB] hover:bg-[#2a1e16] shadow-sm transition-all",
                    isSmall ? "h-8 text-[10px] px-2" : "h-9 text-xs px-3"
                )}
                onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(item, selectedSize);
                    // Open cart - assuming parent handles this if we pass a callback or just standard add
                    // Since 'Buy Now' usually implies immediate checkout, asking user to proceed to cart
                    const cartButton = document.querySelector('a[href="/cart"] button') as HTMLButtonElement;
                    if (cartButton) cartButton.click();
                    else window.location.href = '/cart';
                }}
            >
                Buy Now
            </Button>
        </div>
    );

    const QuantityCounter = ({ isSmall }: { isSmall?: boolean }) => (
        <div className={cn(
            "flex items-center justify-between gap-1 bg-secondary rounded-full border border-primary/10",
            isSmall ? "h-8 px-1" : "h-9 px-2"
        )}>
            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full text-primary hover:bg-white" onClick={(e) => { e.stopPropagation(); onRemoveFromCart(item.name, cartItem?.selectedSize); }}>
                <Minus className="h-4 w-4" />
            </Button>
            <span className={cn("font-bold text-center text-foreground font-heading", isSmall ? "w-5 text-sm" : "w-6 text-base")}>{cartItem?.quantity}</span>
            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full text-primary hover:bg-white" onClick={(e) => { e.stopPropagation(); onAddToCart(item, cartItem?.selectedSize); }}>
                <Plus className="h-4 w-4" />
            </Button>
        </div>
    );

    // Fluid Vertical Mobile Card Layout
    return (
        <div className="flex flex-col w-full h-full overflow-hidden bg-white rounded-xl shadow-lg border border-[#C8A165]/30 p-3" onClick={() => onCardClick(item)}>
            {/* Image Container - Improved Aspect Ratio */}
            <div className="relative w-full aspect-[3/4] flex-shrink-0">
                {mainImage ? (
                    <Image
                        src={mainImage}
                        alt={item.description}
                        fill
                        sizes="(max-width: 768px) 50vw, 160px"
                        className="object-cover rounded-xl"
                        loading="lazy"
                        quality={75}
                    />
                ) : (
                    <div className="bg-secondary/30 w-full h-full rounded-xl flex items-center justify-center">
                        <span className="text-[10px] text-muted-foreground">No Img</span>
                    </div>
                )}
                {item.images && item.images.length > 1 && (
                    <div className="absolute bottom-1 right-1 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded text-[8px] font-bold text-white">
                        +{item.images.length - 1}
                    </div>
                )}
            </div>

            {/* Content Container */}
            <div className="flex flex-col flex-1 min-w-0 mt-3 justify-between">
                <div>
                    <h3 className="font-heading font-bold text-sm text-[#3A2A1F] line-clamp-2 leading-tight min-h-[2.4em]">{item.name}</h3>
                    <div className="flex items-center gap-1.5 my-1.5 flex-wrap">
                        <div className="flex items-center gap-0.5">
                            <Star className="h-2.5 w-2.5 text-[#C8A165] fill-[#C8A165]" />
                            <span className="text-[10px] font-bold text-[#3A2A1F]">{item.rating.toFixed(1)}</span>
                        </div>
                        <span className="text-[9px] text-[#3A2A1F]/70">({item.ratingsCount})</span>
                    </div>

                </div>


                <div className="flex flex-col gap-2 mt-auto">
                    <div className="flex items-baseline gap-1">
                        <span className="font-heading font-bold text-base text-[#3A2A1F]">₹{item.price}</span>
                        {item.originalPrice && <del className="text-[9px] text-muted-foreground/70">₹{item.originalPrice}</del>}
                    </div>
                    <div className="w-full">
                        {cartItem ? <QuantityCounter isSmall /> : <AddButton isSmall />}
                    </div>
                </div>
            </div>
        </div>
    );
};


const ProductCategory = ({
    category,
    cart,
    onAddToCart,
    onRemoveFromCart,
    onCardClick,
}: {
    category: Category,
    cart: CartItem[],
    onAddToCart: (item: Product, size?: string) => void,
    onRemoveFromCart: (itemName: string, size?: string) => void,
    onCardClick: (item: Product) => void,
}) => {
    const [api1, setApi1] = React.useState<CarouselApi>();
    const [api2, setApi2] = React.useState<CarouselApi>();
    const [sortedProducts, setSortedProducts] = React.useState<Product[]>([...category.products]);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [dialogProducts, setDialogProducts] = React.useState<Product[]>([]);
    const [isSyncEnabled, setIsSyncEnabled] = React.useState(false);
    const [selectedSort, setSelectedSort] = React.useState('default');


    React.useEffect(() => {
        // Disable sync for touch devices to prevent weird scrolling behavior
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) {
            setIsSyncEnabled(false);
        }
    }, []);

    const apis = React.useMemo(() => [api1, api2], [api1, api2]);
    useSyncCarousel(apis, isSyncEnabled);

    React.useEffect(() => {
        api1?.reInit();
        api2?.reInit();
    }, [sortedProducts, api1, api2]);


    React.useEffect(() => {
        setSortedProducts([...category.products]);
    }, [category.products]);

    const handleSortChange = (value: string) => {
        setSelectedSort(value);
        if (value === 'default') {
            setSortedProducts([...category.products]);
            setTimeout(() => {
                api1?.reInit();
                api2?.reInit();
            }, 100);
            return;
        };

        let newSortedProducts = [...category.products];
        if (value === 'low-to-high') {
            newSortedProducts.sort((a, b) => a.price - b.price);
        } else if (value === 'rating') {
            newSortedProducts.sort((a, b) => b.rating - a.rating);
        } else if (value === 'offers') {
            newSortedProducts = newSortedProducts.filter(item => item.originalPrice);
        }

        setDialogProducts(newSortedProducts);
        setDialogOpen(true);
    };

    const midPoint = Math.ceil(sortedProducts.length / 2);
    const row1Items = sortedProducts.slice(0, midPoint);
    const row2Items = sortedProducts.slice(midPoint);

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-end md:items-center mb-6">
                <div className='flex items-center gap-4'>
                    <Select onValueChange={handleSortChange} value={selectedSort}>
                        <SelectTrigger className="w-[180px]">
                            <Filter className="h-4 w-4 mr-2" />
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="default">Default</SelectItem>
                            <SelectItem value="low-to-high">Price: Low to High</SelectItem>
                            <SelectItem value="rating">Rating: High to Low</SelectItem>
                            <SelectItem value="offers">Only Offers</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div>
                <ProductRow items={row1Items} setApi={setApi1} carouselId={`${category.name}-1`} cart={cart} onAddToCart={onAddToCart} onRemoveFromCart={onRemoveFromCart} isSyncEnabled={isSyncEnabled} onCardClick={onCardClick} />
                {row2Items.length > 0 && <ProductRow items={row2Items} setApi={setApi2} carouselId={`${category.name}-2`} cart={cart} onAddToCart={onAddToCart} onRemoveFromCart={onRemoveFromCart} isSyncEnabled={isSyncEnabled} onCardClick={onCardClick} />}
            </div>

            <FilteredProductDialog
                isOpen={dialogOpen}
                onOpenChange={(open) => {
                    setDialogOpen(open);
                    if (!open) {
                        setSelectedSort('default');
                    }
                }}
                products={dialogProducts}
                title={`Filtered Results: ${category.name}`}
                description="Here are the products matching your criteria."
                cart={cart}
                onAddToCart={onAddToCart}
                onRemoveFromCart={onRemoveFromCart}
            />
        </div>
    )
}


const MobileProductFilters = React.memo(({ allCategories, handleOpenCategoryDialog }: {
    allCategories: Category[];
    handleOpenCategoryDialog: (category: Category) => void;
}) => {
    return (
        <div className="mx-4">
            <div className="bg-white rounded-xl shadow-filters p-2">
                <div className="grid grid-cols-2 gap-2">
                    <Select onValueChange={(value) => {
                        if (value === 'all') {
                            return;
                        }
                        if (value === 'ai-suggestion') {
                            // Open AI Sheet by clicking the AI button in bottom nav
                            const aiButton = document.querySelector('button:has(.lucide-sparkles)') as HTMLButtonElement;
                            if (aiButton) aiButton.click();
                            return;
                        }
                        const category = allCategories.find(c => c.name.toLowerCase().replace(/\s+/g, '-') === value);
                        if (category) {
                            handleOpenCategoryDialog(category);
                        }
                    }}
                    >
                        <SelectTrigger className="h-12 bg-white text-foreground border-border rounded-xl text-[15px] font-medium px-[18px]">
                            <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="ai-suggestion" className="text-amber-600 font-medium">
                                ✨ AI Suggestion
                            </SelectItem>
                            {allCategories.map(category => (
                                <SelectItem
                                    key={category.name}
                                    value={category.name.toLowerCase().replace(/\s+/g, '-')}
                                >
                                    {category.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select defaultValue="popular">
                        <SelectTrigger className="h-12 bg-white text-foreground border-border rounded-xl text-[15px] font-medium px-[18px]">
                            <SelectValue placeholder="Sort by: Popular" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="popular">Sort by: Popular</SelectItem>
                            <SelectItem value="rating">Sort by: Rating</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
});
MobileProductFilters.displayName = 'MobileProductFilters';


const ProductSection = ({ allMenuItems, cart, onAddToCart, onRemoveFromCart, onCardClick, onRate, searchQuery, onCartClick }: {
    allMenuItems: Category[];
    cart: CartItem[];
    onAddToCart: (item: Product, size?: string) => void;
    onRemoveFromCart: (itemName: string, size?: string) => void;
    onCardClick: (item: Product) => void;
    onRate: (itemName: string, rating: number) => void;
    searchQuery?: string;
    onCartClick: () => void;
}) => {
    const [selectedCategory, setSelectedCategory] = React.useState<Category | null>(null);
    const [isCategoryDialogOpen, setIsCategoryDialogOpen] = React.useState(false);

    const handleOpenCategoryDialog = React.useCallback((category: Category) => {
        setSelectedCategory(category);
        setIsCategoryDialogOpen(true);
    }, []);

    const banners = [
        "https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/Banner/banner%202.png",
        "https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/Banner/banner%201.png"
    ];

    return (
        <section id="products" className="pb-6 md:py-32 bg-background overflow-hidden relative">
            <div className="hidden md:block">
                <div className="container mx-auto px-4">
                    {/* Brand Banners */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
                        {banners.map((banner, i) => (
                            <div key={i} className="relative aspect-[21/9] w-full overflow-hidden rounded-3xl shadow-premium">
                                <Image
                                    src={banner}
                                    alt={`Promotion Banner ${i + 1}`}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="text-center mb-16">
                        <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
                            Curated Collections
                        </h2>
                        <p className="font-body mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                            Discover the art of traditional Bengali craftsmanship. Hand-stitched with love,
                            designed for elegance.
                        </p>
                    </div>
                    <Tabs defaultValue={allMenuItems[0]?.name} className="w-full">
                        <div className="flex justify-center mb-8">
                            <TabsList className="h-auto flex-wrap justify-center">
                                {allMenuItems.map((category) => (
                                    <TabsTrigger key={category.name} value={category.name} data-category={category.name}>
                                        {category.name}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </div>
                        {allMenuItems.map((category) => (
                            <TabsContent key={category.name} value={category.name}>
                                <ProductCategory
                                    category={category}
                                    cart={cart}
                                    onAddToCart={onAddToCart}
                                    onRemoveFromCart={onRemoveFromCart}
                                    onCardClick={onCardClick}
                                />
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>
            </div>

            <div className='block md:hidden'>
                <MobileProductFilters allCategories={allMenuItems} handleOpenCategoryDialog={handleOpenCategoryDialog} />
                <div className='mx-4'>
                    <h2 className="text-xl font-semibold text-foreground mt-4 mx-4">Categories</h2>
                    <div className="mt-4 border-b border-border"></div>
                </div>
                <div className="grid grid-cols-2 gap-3 px-4 pt-4">

                    {allMenuItems.map((category) => {
                        const firstItem = category.products[0];
                        const imageUrl = firstItem?.images?.[0] || (firstItem ? PlaceHolderImages.find(img => img.id === firstItem.name)?.imageUrl : null);
                        const itemCount = category.products.length;

                        return (
                            <button key={category.name} onClick={() => handleOpenCategoryDialog(category)} className="border-0 bg-card rounded-2xl shadow-lg overflow-hidden text-left w-full focus:outline-none focus:ring-2 focus:ring-primary ring-offset-2 aspect-square group active:scale-[0.98] transition-transform" suppressHydrationWarning={true}>
                                <div className="relative w-full h-full">
                                    <div className="absolute inset-0">
                                        {imageUrl ? (
                                            <Image
                                                src={imageUrl}
                                                alt={`Preview of ${category.name}`}
                                                fill
                                                sizes="(max-width: 768px) 50vw, 25vw"
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                loading="lazy"
                                                quality={75}
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-secondary flex items-center justify-center">
                                                <Menu className="w-8 h-8 text-muted-foreground/50" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                    <div className="relative h-full flex flex-col justify-end p-3">
                                        <h3 className="font-bold text-lg text-white drop-shadow-lg">{category.name}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs text-white/90 bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full">{itemCount} items</span>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        )
                    })}
                </div>

                {/* Content above footer */}
                <CategoryProductDialog
                    isOpen={isCategoryDialogOpen}
                    onOpenChange={setIsCategoryDialogOpen}
                    category={selectedCategory}
                    cart={cart}
                    onAddToCart={onAddToCart}
                    onRemoveFromCart={onRemoveFromCart}
                    onCardClick={onCardClick}
                    onCartClick={onCartClick}
                />
            </div>
        </section>
    );
};

export default ProductSection;
