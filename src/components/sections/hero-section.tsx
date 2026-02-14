"use client";

import Image from "next/image";
import Link from "next/link";
import { config } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";
import { InstagramIcon, GoogleMapsIcon, CallIcon, WhatsappIcon, FacebookIcon } from "@/components/icons";
import ComingSoonDialog from "@/components/coming-soon-dialog";
import { cn } from "@/lib/utils";

const socialLinks = [
  { name: 'Instagram', icon: InstagramIcon, href: 'https://www.instagram.com/the_traditional_needle_work', isExternal: true },
  { name: 'Facebook', icon: FacebookIcon, href: 'https://www.facebook.com/TheTraditionalNeedleWork', isExternal: true },
  { name: 'WhatsApp', icon: WhatsappIcon, href: `https://wa.me/91${config.contact.whatsapp}`, isExternal: true },
  { name: 'Location', icon: GoogleMapsIcon, href: config.contact.location, isExternal: true },
  { name: 'Call', href: `tel:${config.contact.phone}`, icon: CallIcon, isExternal: true },
];

const HeroSection = () => {
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Background Image - Desktop Only */}
      <div className="absolute inset-0 z-[-1]">
        <div className="hidden md:block h-full w-full relative">
          <Image
            src="https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/hero%20video/Core_objective_create_1080p_202602150228-ezgif.com-video-to-webp-converter.webp"
            alt="The Traditional Needle Work Collection"
            fill
            className="h-full w-full object-cover"
            priority
            unoptimized={true}
          />
          {/* Subtle dark gradient at bottom for better button contrast */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent z-10" />
        </div>
        {/* Mobile alternative background or static image could go here */}
        <div className="md:hidden h-full w-full bg-background"></div>
      </div>

      <div className="container mx-auto px-4 h-full relative">
        {/* CTAs and Socials moved to Bottom */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-8 w-full max-w-4xl z-20">

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="font-body shadow-premium hover:shadow-hover transition-all duration-300 px-8 py-6 text-lg"
              asChild
            >
              <Link href={`https://wa.me/91${config.contact.whatsapp}`}>
                <MessageCircle className="mr-2 h-6 w-6" /> Order on WhatsApp
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="font-body border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 px-8 py-6 text-lg bg-background/20 backdrop-blur-sm"
              asChild
            >
              <Link href={`tel:${config.contact.phone}`}>
                <Phone className="mr-2 h-6 w-6" /> Call to Order
              </Link>
            </Button>
          </div>

          {/* Bottom Socials */}
          <div className="flex space-x-8">
            {socialLinks.map((social) => {
              if (!social.isExternal) {
                return (
                  <ComingSoonDialog key={social.name}>
                    <button className="text-foreground hover:text-primary transition-colors bg-white/20 p-3 rounded-full backdrop-blur-md shadow-lg" suppressHydrationWarning>
                      <social.icon className="h-7 w-7" />
                      <span className="sr-only">{social.name}</span>
                    </button>
                  </ComingSoonDialog>
                );
              }

              return (
                <Link
                  key={social.name}
                  href={social.href}
                  target={social.isExternal ? "_blank" : undefined}
                  rel={social.isExternal ? "noopener noreferrer" : undefined}
                  aria-label={social.name}
                  className="text-foreground hover:text-primary transition-colors bg-white/20 p-3 rounded-full backdrop-blur-md shadow-lg"
                  suppressHydrationWarning
                >
                  <social.icon className="h-7 w-7" />
                  <span className="sr-only">{social.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
