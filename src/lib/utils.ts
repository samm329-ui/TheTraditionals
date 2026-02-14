import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { ComponentType } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type NavbarLink = {
  name: string;
  href: string;
};

export type SocialLink = {
  name: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
};

export type Review = {
  name: string;
  title: string;
  review: string;
  avatarId: string;
};

type Config = {
  brandName: string;
  fullName: string;
  industry: string;
  description: string;
  navbarLinks: NavbarLink[];
  mobileNavbarLinks: NavbarLink[];
  reviews: Review[];
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    upi: string;
    location: string;
  };
};

export const config: Config = {
  brandName: 'THE TRADITIONAL NEEDLE WORK',
  fullName: 'The Traditional Needle Work',
  industry: 'Premium Traditional Clothing',
  description:
    'Handcrafted traditional clothing featuring premium embroidered Punjabis, designer blouses, and custom stitching services. Authentic Bengali craftsmanship with modern elegance. Specializing in traditional wear, bridal collections, and bespoke tailoring.',
  navbarLinks: [
    { name: 'Home', href: '#home' },
    { name: 'Collections', href: '#collections' },
    { name: 'Featured', href: '#featured' },
    { name: 'All Products', href: '#products' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
    { name: 'AI Stylist', href: '#recommendation' },
  ],
  mobileNavbarLinks: [
    { name: 'Home', href: '/' },
    { name: 'Collections', href: '/collections' },
    { name: 'Products', href: '#products' },
    { name: 'Contact', href: '#contact' },
    { name: 'AI Stylist', href: '#recommendation' },
  ],
  contact: {
    phone: '6296187370',
    whatsapp: '6296187370',
    email: 'needleworkstraditional@gmail.com',
    upi: '6296187370@ybl',
    location: 'https://www.google.com/maps/@23.8019756,87.3739737,16z?entry=ttu&g_ep=EgoyMDI2MDIxMC4wIKXMDSoASAFQAw%3D%3D',
  },

  reviews: [
    {
      name: 'Priya Chatterjee',
      title: 'Fashion Enthusiast · Verified Buyer',
      review: "The embroidery work on my Punjabi is absolutely exquisite! The attention to detail and quality of fabric exceeded my expectations. It's clear that every piece is crafted with love and traditional expertise. Perfect for special occasions.",
      avatarId: "review-avatar-1"
    },
    {
      name: 'Ananya Das',
      title: 'Bridal Customer',
      review: "I ordered a custom blouse for my wedding and the craftsmanship was outstanding. The team understood exactly what I wanted and delivered a masterpiece. The fit was perfect and the embroidery was stunning. Highly recommended for bridal wear!",
      avatarId: "review-avatar-2"
    },
    {
      name: 'Rajesh Kumar',
      title: 'Regular Customer',
      review: "I've purchased multiple Punjabis from The Traditional Needle Work and each one has been exceptional. The traditional designs combined with modern comfort make them perfect for both festivals and formal occasions. Great quality at reasonable prices.",
      avatarId: "review-avatar-3"
    },
    {
      name: 'Shreya Banerjee',
      title: 'Designer · Fashion Blogger',
      review: "As someone who appreciates fine craftsmanship, I'm thoroughly impressed by their work. The designer blouses are unique, the embroidery is intricate, and the overall finish is premium. They've mastered the art of blending tradition with contemporary style.",
      avatarId: "review-avatar-4"
    },
    {
      name: 'Meera Singh',
      title: 'Verified Buyer',
      review: "Ordered a traditional blouse for Durga Puja and received so many compliments! The fabric quality is excellent and the needlework is simply beautiful. The customer service was also very helpful in choosing the right design. Will definitely order again.",
      avatarId: "review-avatar-5"
    }
  ]
};

