
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { MapPin, Phone, Mail } from 'lucide-react';
import ComingSoonDialog from '@/components/coming-soon-dialog';
import { WhatsappIcon } from '../icons';

import { config } from '@/lib/utils';

const contactDetails = [
    {
        icon: MapPin,
        title: 'Location',
        href: config.contact.location,
        isExternal: true,
    },
    {
        icon: Phone,
        title: 'Phone',
        href: `tel:${config.contact.phone}`,
        isExternal: true,
    },
    {
        icon: WhatsappIcon,
        title: 'WhatsApp',
        href: `https://wa.me/91${config.contact.whatsapp}`,
        isExternal: true,
    },
    {
        icon: Mail,
        title: 'Email',
        href: `mailto:${config.contact.email}`,
        isExternal: true,
    }
];

const ContactSection = () => {
    return (
        <section id="contact" className="py-20 md:py-32 bg-secondary/30 scroll-mt-20 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12 flex flex-col items-center">
                    <span className="text-primary font-heading font-bold tracking-[0.2em] uppercase text-xs mb-4 block opacity-80">Connect With Us</span>
                    <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#3A2A1F] leading-tight">Get In Touch</h2>
                    <div className="h-0.5 w-12 bg-primary/30 mt-6 rounded-full" />
                </div>

                <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {contactDetails.map((detail) => {
                        const ContentWrapper = ({ children }: { children: React.ReactNode }) => (
                            <div className="flex flex-col items-center justify-center p-8 bg-card rounded-2xl border border-border/50 shadow-sm hover:shadow-premium hover:border-primary/20 transition-all duration-300 h-full group">
                                <div className="h-14 w-14 rounded-full bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors duration-300">
                                    <detail.icon className="h-7 w-7 text-primary" />
                                </div>
                                <h3 className="font-heading font-bold text-lg text-foreground mb-1">{detail.title}</h3>
                                <div className="mt-2 text-center text-sm font-medium text-foreground/70 group-hover:text-primary transition-colors">
                                    {detail.isExternal ? 'Visit Link' : 'Coming Soon'}
                                </div>
                                {children}
                            </div>
                        );

                        if (!detail.isExternal) {
                            return (
                                <ComingSoonDialog key={detail.title}>
                                    <button className="w-full h-full text-left focus:outline-none" suppressHydrationWarning>
                                        <ContentWrapper>
                                            <span className="sr-only">{detail.title}</span>
                                        </ContentWrapper>
                                    </button>
                                </ComingSoonDialog>
                            );
                        }

                        return (
                            <a
                                key={detail.title}
                                href={detail.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full h-full focus:outline-none"
                                aria-label={detail.title}
                            >
                                <ContentWrapper>
                                    <span className="sr-only">{detail.title}</span>
                                </ContentWrapper>
                            </a>
                        );
                    })}
                </div>

                {/* Mobile Grid Redesign */}
                <div className="grid grid-cols-2 gap-4 md:hidden">
                    {contactDetails.map((detail) => {
                        const isWhatsapp = detail.title === 'WhatsApp';
                        const CardContent = () => (
                            <div className="flex flex-col items-center justify-center aspect-square p-4 bg-card rounded-3xl border border-[#C8A165]/20 shadow-sm transition-all active:scale-[0.98] text-[#3A2A1F]">
                                <div className="h-12 w-12 rounded-2xl flex items-center justify-center mb-3 bg-[#F8F5F0]">
                                    <detail.icon className="h-6 w-6 text-[#C8A165]" />
                                </div>
                                <h3 className="font-heading font-bold text-sm tracking-wide text-center">{detail.title}</h3>
                                <p className="text-[9px] mt-1 font-medium tracking-[0.1em] opacity-60 uppercase text-primary">
                                    {detail.isExternal ? 'Contact Now' : 'Soon'}
                                </p>
                            </div>
                        );

                        if (!detail.isExternal) {
                            return (
                                <ComingSoonDialog key={detail.title}>
                                    <button className="w-full text-left focus:outline-none" suppressHydrationWarning>
                                        <CardContent />
                                    </button>
                                </ComingSoonDialog>
                            );
                        }

                        return (
                            <a
                                key={detail.title}
                                href={detail.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full focus:outline-none"
                            >
                                <CardContent />
                            </a>
                        )
                    })}
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
