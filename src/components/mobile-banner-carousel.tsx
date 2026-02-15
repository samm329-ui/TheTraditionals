"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const banners = [
    "https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/Banner/banner%203.webp",
    "https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/Banner/banner%204.webp",
    "https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/Banner/banner%205.webp"
];

export default function MobileBannerCarousel() {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % banners.length);
        }, 3000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full aspect-[3/1] overflow-hidden bg-secondary/10">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }} // Flash/fade duration
                    className="absolute inset-0 w-full h-full"
                >
                    <Image
                        src={banners[currentIndex]}
                        alt={`Special Offer Banner ${currentIndex + 1}`}
                        fill
                        className="object-cover"
                        sizes="100vw"
                        priority={currentIndex === 0}
                        quality={75}
                    />
                </motion.div>
            </AnimatePresence>

            {/* Optional: Indicators */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {banners.map((_, i) => (
                    <div
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full transition-colors ${i === currentIndex ? 'bg-white' : 'bg-white/40'}`}
                    />
                ))}
            </div>
        </div>
    );
}
