import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';

const featuredItems = [
    {
        name: "Bridal Saree Collection",
        description: "Handwoven Banarasi and Katan silk sarees with intricate zari work, crafted specifically for the modern bride who values tradition.",
        imageUrl: "https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Saree/S1/Whisk_8250104315_2.png",
        cta: "View Bridal Collection"
    },
    {
        name: "Festive Panjabi Series",
        description: "A curate selection of premium cotton and silk punjabis featuring detailed embroidery, perfect for Durga Puja and festive celebrations.",
        imageUrl: "https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/clothes/Punjabi/pun%209/Whisk_1bec8aeee84f774be4c40c33fbd9c111dr.png",
        cta: "Shop Festive Wear"
    },
];

const FeaturedCollectionSection = () => {
    return (
        <section id="featured" className="bg-background">
            {/* Promo Banner Strip */}
            <div className="relative py-16 bg-primary overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-10 mix-blend-overlay"></div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2 tracking-wide">
                        Premium Handcrafted Embroidery
                    </h3>
                    <p className="text-white/90 font-medium mb-6">Traditional Needle Work Excellence</p>
                    <Button
                        size="lg"
                        variant="secondary"
                        className="bg-white text-primary hover:bg-white/90 font-semibold rounded-full px-8 shadow-lg"
                        asChild
                    >
                        <Link href="#products">Explore Now</Link>
                    </Button>
                </div>
            </div>

            {/* Featured Collections */}
            <div className="py-20 md:py-32 container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-sm font-bold text-primary tracking-widest uppercase mb-2 block">Curated For You</span>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground">Featured Collections</h2>
                </div>

                <div className="space-y-24">
                    {featuredItems.map((item, index) => {
                        const isReversed = index % 2 !== 0;
                        return (
                            <div key={item.name} className={`flex flex-col md:flex-row gap-8 md:gap-16 items-center ${isReversed ? 'md:flex-row-reverse' : ''}`}>
                                <div className="w-full md:w-1/2 relative">
                                    <div className="absolute inset-4 border-2 border-primary/20 rounded-xl transform rotate-2 transition-transform duration-500 group-hover:rotate-0"></div>
                                    <div className="relative aspect-[3/4] overflow-hidden rounded-xl shadow-2xl bg-white">
                                        {/* Placeholder logic for Saree image if not working, but using provided link */}
                                        <Image
                                            src={item.imageUrl}
                                            alt={`Featured item: ${item.name}`}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            className="object-cover hover:scale-105 transition-transform duration-700"
                                            loading="lazy"
                                            quality={90}
                                        />
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
                                    <div className="inline-block px-4 py-1.5 bg-secondary/50 rounded-full text-primary font-medium text-sm mb-4">
                                        Limited Edition
                                    </div>
                                    <h3 className="text-3xl md:text-5xl font-heading font-bold text-foreground leading-tight">
                                        {item.name}
                                    </h3>
                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        {item.description}
                                    </p>
                                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-10 h-14 text-lg shadow-xl shadow-primary/20" asChild>
                                        <Link href="#products">
                                            {item.cta}
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
};

export default FeaturedCollectionSection;


