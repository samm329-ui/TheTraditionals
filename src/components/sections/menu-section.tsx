

"use client";

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const collections = [
    { id: 'punjabi-collection', name: 'Embroidered Punjabis', image: 'Black Detailed Needlework Punjabi' },
    { id: 'blouse-collection', name: 'Designer Blouses', image: 'Royal Pink Reversed Design Blouse' },
    { id: 'saree-collection', name: 'Occasion Sarees', image: 'Gold Zari Work Saree' },
    { id: 'custom-stitching', name: 'Custom Stitching', image: 'White Reversed Design Blouse' },
];

const MenuSection = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
    const scrollIntervalRef = React.useRef<NodeJS.Timeout | null>(null);

    const scrollPrev = React.useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = React.useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    // ... scroll logic remains same ...

    return (
        <section id="collections" className="py-20 md:py-32 bg-secondary/30 relative overflow-hidden">
            {/* Decorative Divider */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            <div className="container mx-auto px-4 text-center mb-16 relative z-10">
                <div className="inline-flex items-center gap-4 mb-4 opacity-80">
                    <div className="h-px w-12 bg-primary"></div>
                    <span className="text-primary uppercase tracking-widest text-sm font-semibold">Our Heritage</span>
                    <div className="h-px w-12 bg-primary"></div>
                </div>
                <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                    Our Collections
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-body leading-relaxed">
                    Explore our curated selection of handcrafted traditional attire, infused with authentic Bengali artistry and modern elegance.
                </p>
            </div>

            <div className="w-full relative group/carousel max-w-[95vw] mx-auto">
                <div className="hidden md:block overflow-hidden px-4 md:px-12" ref={emblaRef}>
                    <div className="flex -ml-6 py-8">
                        {collections.map((collection, index) => {
                            // Fallback to placeholder logic if needed, or mapping strictly to known IDs
                            const imageData = PlaceHolderImages.find(img => img.id === collection.image) || PlaceHolderImages[0];

                            return (
                                <div
                                    key={`${collection.id}-${index}`}
                                    className="flex-[0_0_85%] sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%] min-w-0 pl-6"
                                >
                                    <Link
                                        href="#products"
                                        className="block group cursor-pointer relative"
                                    >
                                        <div className={cn(
                                            "relative w-full aspect-[3/4] rounded-2xl overflow-hidden",
                                            "shadow-md transition-all duration-500 ease-out",
                                            "group-hover:shadow-xl group-hover:shadow-primary/10",
                                            "border border-transparent group-hover:border-primary/30"
                                        )}>
                                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500 z-10" />
                                            {imageData && (
                                                <Image
                                                    src={imageData.imageUrl}
                                                    alt={collection.name}
                                                    fill
                                                    sizes="(max-width: 640px) 80vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                                                />
                                            )}

                                            {/* Card Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 transition-opacity duration-300 z-20" />

                                            <div className="absolute bottom-0 left-0 w-full p-6 z-30 transform transition-transform duration-300 group-hover:-translate-y-2">
                                                <h3 className="text-2xl font-heading font-bold text-white mb-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                                    {collection.name}
                                                </h3>
                                                <div className="w-0 group-hover:w-full h-0.5 bg-primary transition-all duration-500 delay-100" />
                                                <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                                                    <span className="text-white/90 text-sm font-medium tracking-wide">View Collection</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Mobile Collage View */}
                <div className="md:hidden px-4">
                    <div className="grid grid-cols-2 gap-3">
                        {collections.map((collection, index) => {
                            const imageData = PlaceHolderImages.find(img => img.id === collection.image) || PlaceHolderImages[0];
                            // Featured item (first one) spans full width for collage effect
                            const isFeatured = index === 0;

                            return (
                                <Link
                                    key={`mobile-${collection.id}`}
                                    href="#products"
                                    className={cn(
                                        "relative rounded-xl overflow-hidden shadow-sm block group",
                                        isFeatured ? "col-span-2 aspect-[16/9]" : "aspect-[3/4]"
                                    )}
                                >
                                    {imageData && (
                                        <Image
                                            src={imageData.imageUrl}
                                            alt={collection.name}
                                            fill
                                            className="object-cover transition-transform duration-500 group-active:scale-105"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
                                    <div className="absolute bottom-0 left-0 w-full p-3">
                                        <h3 className={cn(
                                            "font-heading font-bold text-white leading-tight",
                                            isFeatured ? "text-xl" : "text-sm"
                                        )}>
                                            {collection.name}
                                        </h3>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
                {/* Navigation Buttons ... (Use existing logic but styled) */}
                <div className="hidden md:flex absolute inset-y-0 left-0 items-center justify-center pl-4">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={scrollPrev}
                        className="h-14 w-14 rounded-full border-primary/20 bg-background/80 text-primary hover:bg-primary hover:text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 shadow-lg"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </Button>
                </div>
                <div className="hidden md:flex absolute inset-y-0 right-0 items-center justify-center pr-4">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={scrollNext}
                        className="h-14 w-14 rounded-full border-primary/20 bg-background/80 text-primary hover:bg-primary hover:text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 shadow-lg"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default MenuSection;
