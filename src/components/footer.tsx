
"use client";

import React, { useState, useEffect } from "react";
import { config } from "@/lib/utils";
import Link from "next/link";
import { InstagramIcon, GoogleMapsIcon, CallIcon, WhatsappIcon, FacebookIcon } from "@/components/icons";
import ComingSoonDialog from "@/components/coming-soon-dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const socialLinks = [
  { name: 'Instagram', href: 'https://www.instagram.com/the_traditional_needle_work', icon: InstagramIcon, isExternal: true },
  { name: 'Facebook', href: 'https://www.facebook.com/TheTraditionalNeedleWork', icon: FacebookIcon, isExternal: true },
  { name: 'WhatsApp', href: `https://wa.me/91${config.contact.whatsapp}`, icon: WhatsappIcon, isExternal: true },
  { name: 'Google Maps', href: config.contact.location, icon: GoogleMapsIcon, isExternal: true },
  { name: 'Call', href: `tel:${config.contact.phone}`, icon: CallIcon, isExternal: true },
];

const Footer = () => {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);


  return (
    <footer className="bg-[#1C1917] text-[#F6F2EB] py-16 md:py-24 relative overflow-hidden font-body">
      {/* Decorative gradient blob for mobile */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 text-left">

          {/* Brand & Description */}
          <div className="md:col-span-4 flex flex-col items-start space-y-6">
            <div className="mb-2">
              <h3 className="text-3xl font-heading font-bold text-primary tracking-wide">The Traditional Needle Work</h3>
              <p className="text-xs text-primary/60 uppercase tracking-[0.2em] mt-1">Timeless Elegance</p>
            </div>
            <p className="text-[#F6F2EB]/70 leading-relaxed max-w-sm font-light">
              Weaving stories of heritage and grace into every thread. Experience the finest collection of traditional attire, crafted for the modern soul.
            </p>
          </div>

          <div className="md:col-span-8 flex flex-col md:flex-row gap-12 md:justify-end w-full">

            {/* Mobile Accordion View */}
            <div className="md:hidden w-full space-y-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="quick-links" className="border-primary/10">
                  <AccordionTrigger className="text-lg font-heading font-bold text-[#F6F2EB]/90 hover:text-primary hover:no-underline font-serif">Quick Links</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-3 pt-2 text-left pl-2 border-l border-primary/10 ml-2">
                      <li><Link href="/about" className="text-[#F6F2EB]/60 hover:text-primary transition-all duration-300 block py-1">About Us</Link></li>
                      <li><Link href="#contact" className="text-[#F6F2EB]/60 hover:text-primary transition-all duration-300 block py-1">Contact</Link></li>
                      <li><Link href="/privacy-policy" className="text-[#F6F2EB]/60 hover:text-primary transition-all duration-300 block py-1">Privacy Policy</Link></li>
                      <li><Link href="/terms" className="text-[#F6F2EB]/60 hover:text-primary transition-all duration-300 block py-1">Terms of Service</Link></li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="contact-us" className="border-primary/10">
                  <AccordionTrigger className="text-lg font-heading font-bold text-[#F6F2EB]/90 hover:text-primary hover:no-underline font-serif">Contact Us</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-4 pt-2 text-left pl-2 border-l border-primary/10 ml-2">
                      <li className="flex items-start text-[#F6F2EB]/60 group">
                        <GoogleMapsIcon className="w-5 h-5 mr-3 mt-1 text-primary shrink-0 group-hover:scale-110 transition-transform duration-300" />
                        <span className="group-hover:text-[#F6F2EB] transition-colors">{config.brandName}, West Bengal</span>
                      </li>
                      <li className="flex items-center text-[#F6F2EB]/60 group">
                        <CallIcon className="w-5 h-5 mr-3 text-primary shrink-0 group-hover:rotate-12 transition-transform duration-300" />
                        <a href={`tel:${config.contact.phone}`} className="hover:text-primary transition-colors group-hover:text-[#F6F2EB]">+91 {config.contact.phone}</a>
                      </li>
                      <li className="flex items-center text-[#F6F2EB]/60 group">
                        <WhatsappIcon className="w-5 h-5 mr-3 text-primary shrink-0 group-hover:scale-110 transition-transform duration-300" />
                        <a href={`https://wa.me/91${config.contact.whatsapp}`} target="_blank" className="hover:text-primary transition-colors group-hover:text-[#F6F2EB]">Chat on WhatsApp</a>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Always Visible Social Icons on Mobile */}
              <div className="pt-8 pb-4 flex flex-col items-center justify-center">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-px w-12 bg-primary/20"></div>
                  <p className="text-primary/60 text-xs font-medium uppercase tracking-[0.2em]">Follow Us</p>
                  <div className="h-px w-12 bg-primary/20"></div>
                </div>
                <ul className="flex items-center justify-center gap-5">
                  {socialLinks.map((social) => {
                    const buttonClasses = "w-11 h-11 rounded-full bg-[#F6F2EB]/5 flex items-center justify-center text-[#F6F2EB]/70 hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300 border border-[#F6F2EB]/10";

                    const linkContent = (
                      <a
                        href={social.href}
                        target={social.isExternal ? "_blank" : undefined}
                        rel={social.isExternal ? "noopener noreferrer" : undefined}
                        aria-label={social.name}
                        className={buttonClasses}
                      >
                        <social.icon className="h-5 w-5" />
                      </a>
                    );

                    if (!social.isExternal) {
                      return (
                        <li key={social.name}>
                          <ComingSoonDialog>
                            <button className={buttonClasses} suppressHydrationWarning>
                              <social.icon className="h-5 w-5" />
                              <span className="sr-only">{social.name}</span>
                            </button>
                          </ComingSoonDialog>
                        </li>
                      );
                    }

                    return (
                      <li key={social.name}>
                        {linkContent}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>

            {/* Desktop View */}
            <div className="hidden md:block">
              <h4 className="font-heading font-bold text-lg mb-6 text-[#F6F2EB] relative inline-block font-serif tracking-wide">
                Quick Links
                <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-primary"></span>
              </h4>
              <ul className="space-y-3 font-light">
                <li><Link href="/about" className="text-[#F6F2EB]/60 hover:text-primary hover:translate-x-1 transition-all duration-300 inline-block">About Us</Link></li>
                <li><Link href="#contact" className="text-[#F6F2EB]/60 hover:text-primary hover:translate-x-1 transition-all duration-300 inline-block">Contact</Link></li>
                <li><Link href="/privacy-policy" className="text-[#F6F2EB]/60 hover:text-primary hover:translate-x-1 transition-all duration-300 inline-block">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-[#F6F2EB]/60 hover:text-primary hover:translate-x-1 transition-all duration-300 inline-block">Terms of Service</Link></li>
              </ul>
            </div>

            <div className="hidden md:block">
              <h4 className="font-heading font-bold text-lg mb-6 text-[#F6F2EB] relative inline-block font-serif tracking-wide">
                Connect With Us
                <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-primary"></span>
              </h4>
              <div className="flex flex-col items-start space-y-4">
                <ul className="flex items-center justify-start gap-4">
                  {socialLinks.map((social) => {
                    const buttonClasses = "w-12 h-12 rounded-full bg-[#F6F2EB]/5 flex items-center justify-center text-[#F6F2EB]/70 hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300 border border-[#F6F2EB]/5";
                    const linkContent = (
                      <a
                        href={social.href}
                        target={social.isExternal ? "_blank" : undefined}
                        rel={social.isExternal ? "noopener noreferrer" : undefined}
                        aria-label={social.name}
                        className={buttonClasses}
                      >
                        <social.icon className="h-5 w-5" />
                      </a>
                    );
                    if (!social.isExternal) {
                      return (
                        <li key={social.name}>
                          <ComingSoonDialog>
                            <button className={buttonClasses} suppressHydrationWarning>
                              <social.icon className="h-5 w-5" />
                              <span className="sr-only">{social.name}</span>
                            </button>
                          </ComingSoonDialog>
                        </li>
                      );
                    }
                    return (
                      <li key={social.name}>
                        {linkContent}
                      </li>
                    )
                  })}
                </ul>
                <div className="text-sm text-[#F6F2EB]/40 font-light mt-4 max-w-xs">
                  Follow our journey on social media for latest updates and collections.
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Copyright */}
        <div className="mt-20 border-t border-[#F6F2EB]/10 pt-8 text-center flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#F6F2EB]/40 text-sm font-light">
            &copy; {currentYear ?? '...'} <span className="text-primary font-medium tracking-wide">The Traditional Needle Work</span>. All Rights Reserved.
          </p>
          <p className="text-[#F6F2EB]/20 text-xs uppercase tracking-widest hover:text-primary/50 transition-colors cursor-default">
            Crafted with Care
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
