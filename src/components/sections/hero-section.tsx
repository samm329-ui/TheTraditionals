"use client";

import Image from "next/image";
import Link from "next/link";
import { config } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
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
          {/* Enhanced Overlay for text readability */}
          <div className="absolute inset-x-0 inset-y-0 bg-black/30 z-10" />
          {/* Gradient at bottom for social icons */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent z-10" />
        </div>
        {/* Mobile alternative background */}
        <div className="md:hidden h-full w-full relative">
          <Image
            src="https://hfnxpkqoejlvqjakrbtb.supabase.co/storage/v1/object/public/assets/hero%20video/Core_objective_create_1080p_202602150228-ezgif.com-video-to-webp-converter.webp"
            alt="The Traditional Needle Work Collection"
            fill
            className="h-full w-full object-cover"
            priority
            unoptimized={true}
          />
          <div className="absolute inset-0 bg-black/30 z-10" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent z-10" />
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 h-full relative z-20 flex flex-col justify-center">

        {/* Main Text Content - Left Aligned */}
        <div className="space-y-6 max-w-2xl animate-in fade-in slide-in-from-left duration-1000">
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white tracking-wide shadow-sm drop-shadow-md text-left">
            Handcrafted Heritage
          </h1>
          <p className="font-sans text-base md:text-lg text-white/90 tracking-wide leading-relaxed drop-shadow-sm text-left">
            Experience the elegance of tradition woven into every thread. Authentic craftsmanship for the modern connoisseur.
          </p>

          <div className="pt-6">
            <Button
              size="lg"
              className="bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-[#3A2A1F] transition-all duration-300 rounded-none px-8 py-6 text-base uppercase tracking-widest group"
              asChild
            >
              <Link href="#featured">
                Explore Collection <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>


        {/* Bottom Socials - Smaller Icons */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-4 md:gap-6 px-4">
          {socialLinks.map((social, index) => {
            const buttonContent = (
              <div className={cn(
                "group relative p-2 md:p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white transition-all duration-300 hover:scale-110 hover:bg-[#C8A165] hover:border-[#C8A165] shadow-lg animate-bounce-slow",
                `delay-${index * 100}`
              )}>
                <social.icon className="h-4 w-4 md:h-5 md:w-5" />
                <span className="sr-only">{social.name}</span>
              </div>
            );

            if (!social.isExternal) {
              return (
                <ComingSoonDialog key={social.name}>
                  <button suppressHydrationWarning>{buttonContent}</button>
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
                suppressHydrationWarning
              >
                {buttonContent}
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
