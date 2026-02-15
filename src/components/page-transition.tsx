"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import LoadingScreen from "./loading-screen";

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isTransitioning, setIsTransitioning] = useState(false);
    const isFirstRender = React.useRef(true);

    // Trigger loading state on route changes
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        setIsTransitioning(true);
        const timer = setTimeout(() => {
            setIsTransitioning(false);
        }, 600); // Premium brief transition delay

        return () => clearTimeout(timer);
    }, [pathname, searchParams]);

    return (
        <React.Fragment>
            <AnimatePresence mode="wait">
                <motion.div
                    key={pathname}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1], // High-refresh-rate ease
                    }}
                    className="will-change-transform" /* Performance boost */
                >
                    {children}
                </motion.div>
            </AnimatePresence>
            <LoadingScreen isLoading={isTransitioning} />
        </React.Fragment>
    );
}
