
"use client";

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Phone, Star, ShoppingCart, Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn, config } from '@/lib/utils';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { type Product, productData } from "@/lib/products";
import { type CartItem } from '@/app/page';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';
import { Separator } from './ui/separator';
import { WhatsappIcon } from './icons';
import { OrderFormDialog } from './order-form-dialog';

export const ProductDetailDialog = ({
    isOpen,
    onOpenChange,
    item,
    cartItem,
    cart,
    onAddToCart,
    onRemoveFromCart,
    onRate,
    onCartClick,
    onSelectItem,
}: {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    item: Product;
    cartItem?: CartItem;
    cart: CartItem[];
    onAddToCart: (item: Product, size?: string) => void;
    onRemoveFromCart: (itemName: string, size?: string) => void;
    onRate: (itemName: string, rating: number) => void;
    onCartClick: () => void;
    onSelectItem: (item: Product) => void;
}) => {
    const [hoveredRating, setHoveredRating] = React.useState(0);
    const [currentRating, setCurrentRating] = React.useState(item.rating);
    const [ratingsCount, setRatingsCount] = React.useState(item.ratingsCount);
    const [isOrderFormOpen, setIsOrderFormOpen] = React.useState(false);
    const [selectedSize, setSelectedSize] = React.useState<string | undefined>(
        item.sizes && item.sizes.length > 0 ? item.sizes[0] : undefined
    );
    const { toast } = useToast();

    const imageData = PlaceHolderImages.find(img => img.id === item.name);
    const discount = item.originalPrice ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100) : 0;

    const suggestedItems = React.useMemo(() => {
        if (!item) return [];
        const currentCategory = productData.find(category =>
            category.products.some(p => p.name === item.name)
        );
        if (!currentCategory) return [];
        return currentCategory.products.filter(p => p.name !== item.name).slice(0, 4);
    }, [item]);

    const handleRatingSubmit = (rating: number) => {
        const newTotalRatingPoints = (currentRating * ratingsCount) + rating;
        const newRatingsCount = ratingsCount + 1;
        const newAverageRating = newTotalRatingPoints / newRatingsCount;

        setCurrentRating(newAverageRating);
        setRatingsCount(newRatingsCount);
        onRate(item.name, rating);

        toast({
            title: "Rating Submitted",
            description: `You rated ${item.name} ${rating} stars.`,
        });
    };

    React.useEffect(() => {
        setCurrentRating(item.rating);
        setRatingsCount(item.ratingsCount);
        if (item.sizes && item.sizes.length > 0) {
            setSelectedSize(item.sizes[0]);
        } else {
            setSelectedSize(undefined);
        }
    }, [item]);

    // Create a temporary cart for the form that includes the current item
    const effectiveCart = React.useMemo(() => {
        const itemInCart = cart.some(ci => ci.name === item.name);
        if (!itemInCart) {
            return [...cart, { ...item, quantity: 1 }];
        }
        return cart;
    }, [cart, item]);


    return (
        <React.Fragment>
            <Dialog open={isOpen} onOpenChange={onOpenChange}>
                <DialogContent className="p-0 w-full h-full max-w-full md:max-w-4xl md:h-auto md:max-h-[600px] flex flex-col md:flex-row rounded-none md:rounded-lg border-0 top-0 left-0 translate-x-0 translate-y-0 md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 data-[state=open]:animate-in data-[state=open]:zoom-in-90 data-[state=closed]:zoom-out-90 data-[state=closed]:animate-out">
                    {/* Image Section - Multi-Image Carousel */}
                    <div className="w-full md:w-1/2 relative h-[50%] md:h-auto flex-shrink-0 bg-secondary/20">
                        {item.images && item.images.length > 0 ? (
                            <Carousel className="w-full h-full group">
                                <CarouselContent className="h-full ml-0">
                                    {item.images.map((img, index) => (
                                        <CarouselItem key={index} className="pl-0 h-full relative">
                                            <div className="relative aspect-[3/4] md:h-full w-full">
                                                <Image
                                                    src={img}
                                                    alt={`${item.name} - image ${index + 1}`}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, 50vw"
                                                    className="object-cover md:rounded-l-lg"
                                                    quality={85}
                                                    priority={index === 0}
                                                />
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                {item.images.length > 1 && (
                                    <>
                                        <CarouselPrevious className="left-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/50 border-none" />
                                        <CarouselNext className="right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/50 border-none" />
                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 px-3 py-1.5 rounded-full bg-black/20 backdrop-blur-md z-10">
                                            {item.images.map((_, i) => (
                                                <div key={i} className="w-1.5 h-1.5 rounded-full bg-white opacity-50" />
                                            ))}
                                        </div>
                                    </>
                                )}
                                {discount > 0 && <Badge variant="destructive" className="absolute top-4 right-4 text-base px-3 py-1 z-10">{discount}% OFF</Badge>}
                            </Carousel>
                        ) : (
                            <div className="w-full h-full bg-secondary flex items-center justify-center md:rounded-l-lg">
                                <span className="text-muted-foreground">No Image</span>
                            </div>
                        )}
                    </div>

                    {/* Details Section */}
                    <div className="w-full md:w-1/2 bg-background md:rounded-r-lg flex flex-col flex-grow min-h-0">
                        <ScrollArea className="h-full">
                            <div className="p-6 md:p-8">
                                <DialogHeader className="text-left mb-6">
                                    <DialogTitle className="text-3xl md:text-4xl font-heading font-bold tracking-tight text-foreground">{item.name}</DialogTitle>
                                    <DialogDescription className="text-base font-body text-muted-foreground pt-3 leading-relaxed">{item.description}</DialogDescription>
                                </DialogHeader>

                                <div className="flex items-baseline gap-3 mb-8">
                                    <span className="font-bold text-4xl text-primary">Rs. {item.price}</span>
                                    {item.originalPrice && <del className="text-xl text-muted-foreground decoration-primary/30">Rs. {item.originalPrice}</del>}
                                </div>

                                {item.sizes && item.sizes.length > 0 && (
                                    <div className="mb-8 space-y-3">
                                        <div className="flex justify-between items-center">
                                            <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Available Sizes</h4>
                                            <span className="text-xs text-primary font-medium">Size Guide</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {item.sizes.map(size => (
                                                <Button
                                                    key={size}
                                                    variant={selectedSize === size ? "default" : "outline"}
                                                    size="sm"
                                                    className={cn(
                                                        "min-w-[3rem] h-10 rounded-lg transition-all",
                                                        selectedSize === size ? "bg-primary text-white shadow-premium scale-105" : "hover:border-primary hover:text-primary bg-background"
                                                    )}
                                                    onClick={() => setSelectedSize(size)}
                                                >
                                                    {size}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <Separator />

                                <div className="my-6 space-y-6">
                                    <div className="space-y-2">
                                        <h4 className="font-semibold text-lg">Ratings</h4>
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <Star key={i} className={cn("h-5 w-5", i < Math.round(currentRating) ? "text-accent fill-accent" : "text-muted-foreground/50")} />
                                                ))}
                                            </div>
                                            <span className="text-sm text-muted-foreground">
                                                {currentRating.toFixed(1)} ({ratingsCount} ratings)
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <h4 className="font-semibold text-lg">Rate this product</h4>
                                        <div className="flex items-center gap-1" onMouseLeave={() => setHoveredRating(0)}>
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={cn(
                                                        "h-8 w-8 cursor-pointer transition-all",
                                                        (hoveredRating > 0 ? i < hoveredRating : i < Math.round(currentRating))
                                                            ? "text-accent fill-accent scale-110"
                                                            : "text-muted-foreground/50 hover:text-accent/50"
                                                    )}
                                                    onMouseEnter={() => setHoveredRating(i + 1)}
                                                    onClick={() => handleRatingSubmit(i + 1)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 pt-6 border-t mt-8">
                                    {(() => {
                                        const currentSizeCartItem = cart.find(ci => ci.name === item.name && ci.selectedSize === selectedSize);
                                        return currentSizeCartItem ? (
                                            <div className="w-full flex items-center justify-between gap-2 p-1 border-2 border-primary/20 bg-primary/5 rounded-xl">
                                                <Button variant="ghost" size="icon" className="h-11 w-11 rounded-lg text-primary hover:bg-primary/10" onClick={() => onRemoveFromCart(item.name, selectedSize)}>
                                                    <Minus className="h-5 w-5" />
                                                </Button>
                                                <div className="flex flex-col items-center">
                                                    <span className="font-bold text-lg text-primary leading-tight">{currentSizeCartItem.quantity}</span>
                                                    {currentSizeCartItem.selectedSize && <span className="text-[10px] text-primary/70 uppercase">Size: {currentSizeCartItem.selectedSize}</span>}
                                                </div>
                                                <Button variant="ghost" size="icon" className="h-11 w-11 rounded-lg text-primary hover:bg-primary/10" onClick={() => onAddToCart(item, selectedSize)}>
                                                    <Plus className="h-5 w-5" />
                                                </Button>
                                            </div>
                                        ) : (
                                            <Button size="lg" className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-xl shadow-premium font-semibold" onClick={() => onAddToCart(item, selectedSize)}>
                                                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart {selectedSize && `(${selectedSize})`}
                                            </Button>
                                        );
                                    })()}
                                    <Button size="lg" variant="secondary" className="w-full" onClick={onCartClick}>
                                        View Cart
                                    </Button>
                                    <Button size="lg" variant="outline" className="w-full border-green-500 text-green-600 hover:bg-green-500 hover:text-white" onClick={() => setIsOrderFormOpen(true)}>
                                        <WhatsappIcon className="mr-2 h-5 w-5" /> Order on WhatsApp
                                    </Button>
                                    <Button size="lg" variant="outline" className="w-full" asChild>
                                        <Link href={`tel:${config.contact.phone}`} onClick={(e) => e.stopPropagation()}>
                                            <Phone className="mr-2 h-5 w-5" /> Call to Order
                                        </Link>
                                    </Button>
                                </div>

                                {suggestedItems.length > 0 && (
                                    <div className="space-y-4 pt-8 mt-8 border-t">
                                        <h4 className="font-semibold text-lg">You might also like</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            {suggestedItems.map(suggestedItem => {
                                                const suggestedImageData = PlaceHolderImages.find(img => img.id === suggestedItem.name);
                                                return (
                                                    <button key={suggestedItem.name} onClick={() => onSelectItem(suggestedItem)} className="text-left w-full rounded-lg border bg-card text-card-foreground shadow-sm hover:bg-secondary transition-colors overflow-hidden">
                                                        <div className="relative aspect-square w-full">
                                                            {suggestedImageData ? (
                                                                <Image src={suggestedImageData.imageUrl} alt={suggestedItem.name} fill sizes="150px" className="object-cover" loading="lazy" quality={75} />
                                                            ) : (
                                                                <div className="w-full h-full bg-muted rounded-t-lg" />
                                                            )}
                                                        </div>
                                                        <div className="p-3">
                                                            <p className="font-semibold text-sm truncate">{suggestedItem.name}</p>
                                                            <p className="text-xs text-muted-foreground">Rs. {suggestedItem.price}</p>
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </div>
                </DialogContent>
            </Dialog>
            <OrderFormDialog
                isOpen={isOrderFormOpen}
                onOpenChange={setIsOrderFormOpen}
                cart={effectiveCart}
            />
        </React.Fragment>
    );
};
