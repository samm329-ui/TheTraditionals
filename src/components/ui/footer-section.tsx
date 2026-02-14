'use client';
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { FacebookIcon, FrameIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from 'lucide-react';
import Link from 'next/link';

interface FooterLink {
    title: string;
    href: string;
    icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
    label: string;
    links: FooterLink[];
}

const footerLinks: FooterSection[] = [
    {
        label: 'Collections',
        links: [
            { title: 'Punjabis', href: '/#collections?cat=Punjabi' },
            { title: 'Blouses', href: '/#collections?cat=Blouse' },
            { title: 'Featured', href: '/#featured' },
            { title: 'New Arrivals', href: '/#collections?sort=new' },
        ],
    },
    {
        label: 'Company',
        links: [
            { title: 'About Us', href: '/about' },
            { title: 'Contact', href: '/#contact' },
            { title: 'Terms of Service', href: '/terms' },
            { title: 'Privacy Policy', href: '/privacy' },
        ],
    },
    {
        label: 'Support',
        links: [
            { title: 'Size Guide', href: '/size-guide' },
            { title: 'FAQs', href: '/faqs' },
            { title: 'Shipping & Returns', href: '/shipping' },
            { title: 'Custom Stitching', href: '/custom-stitching' },
        ],
    },
    {
        label: 'Social Links',
        links: [
            { title: 'Facebook', href: 'https://facebook.com', icon: FacebookIcon },
            { title: 'Instagram', href: 'https://instagram.com/thetraditionalneedlework', icon: InstagramIcon },
            {
                title: 'WhatsApp', href: 'https://wa.me/916296187370', icon: (props) => (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        {...props}
                    >
                        <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                        <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0 .25-.25l1.5-1.5a1 1 0 0 0-.95-1.488A2.5 2.5 0 0 0 9 7v3z" />
                    </svg>
                )
            }, // Using standard svg as placeholder if specific icon missing
        ],
    },
];

export function Footer() {
    return (
        <footer className="relative w-full border-t border-[#E5D3B3]/30 bg-[#1C1612] text-[#F6F2EB] px-6 py-12 lg:py-16 md:rounded-t-[3rem] rounded-t-[2rem] overflow-hidden mt-20">
            {/* Background Texture Overlay */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />

            <div className="bg-[#D4A574]/20 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur-sm" />

            <div className="container mx-auto grid w-full gap-10 xl:grid-cols-3 xl:gap-12 relative z-10">
                <AnimatedContainer className="space-y-6 flex flex-col items-center md:items-start text-center md:text-left">
                    <div className="font-heading font-bold text-2xl md:text-3xl text-primary tracking-wide leading-none">
                        The <br /> Traditional
                    </div>
                    <p className="text-[#F6F2EB]/60 text-sm max-w-xs font-light leading-relaxed">
                        Premium traditional clothing blending heritage craftsmanship with modern elegance. Experience the art of Bengali embroidery.
                    </p>
                    <div className="text-xs text-[#F6F2EB]/40 pt-4 border-t border-[#F6F2EB]/10 w-full md:w-auto">
                        © {new Date().getFullYear()} The Traditional Needle Work.<br />All rights reserved.
                    </div>
                </AnimatedContainer>

                <div className="grid grid-cols-2 gap-8 md:grid-cols-3 xl:col-span-2">
                    {footerLinks.map((section, index) => (
                        <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
                            <div className="flex flex-col items-center md:items-start text-center md:text-left">
                                <h3 className="text-sm font-heading font-semibold text-primary mb-4 uppercase tracking-widest">{section.label}</h3>
                                <ul className="space-y-3 text-sm">
                                    {section.links.map((link) => (
                                        <li key={link.title}>
                                            {link.href.startsWith('http') ? (
                                                <a
                                                    href={link.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-[#F6F2EB]/60 hover:text-primary transition-all duration-300 flex items-center justify-center md:justify-start gap-2 group"
                                                >
                                                    {link.icon && <link.icon className="size-4 opacity-70 group-hover:opacity-100 transition-opacity" />}
                                                    <span>{link.title}</span>
                                                </a>
                                            ) : (
                                                <Link
                                                    href={link.href}
                                                    className="text-[#F6F2EB]/60 hover:text-primary transition-all duration-300 block"
                                                >
                                                    {link.title}
                                                </Link>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </AnimatedContainer>
                    ))}
                </div>
            </div>
        </footer>
    );
};

type ViewAnimationProps = {
    delay?: number;
    className?: ComponentProps<typeof motion.div>['className'];
    children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            initial={{ filter: 'blur(4px)', translateY: 8, opacity: 0 }}
            whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay, duration: 0.8, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
