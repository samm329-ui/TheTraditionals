'use client';

import { MessageCircle, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { config } from '@/lib/utils';

export function CustomDesignSection() {
    return (
        <section id="custom-design" className="py-16 md:py-24 bg-gradient-to-br from-[#F6F2EB] via-[#EFE6D8] to-[#F6F2EB] relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-[#C8A165]/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#C8A165]/5 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Premium Card with Ornamental Borders */}
                    <div className="relative bg-white/90 backdrop-blur-md rounded-3xl border-2 border-[#C8A165]/40 shadow-[0_20px_50px_rgba(58,42,31,0.12)] overflow-hidden">
                        {/* Decorative Corner Flourishes */}
                        <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-[#C8A165]/20 rounded-tl-3xl"></div>
                        <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-[#C8A165]/20 rounded-tr-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-[#C8A165]/20 rounded-bl-3xl"></div>
                        <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-[#C8A165]/20 rounded-br-3xl"></div>

                        <div className="relative z-10 p-8 md:p-12 text-center">
                            {/* Section Title */}
                            <div className="space-y-2 mb-6">
                                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-[#3A2A1F] tracking-wide">
                                    Custom Designs
                                </h2>
                                {/* Ornamental Divider */}
                                <div className="flex items-center justify-center gap-3">
                                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#C8A165]"></div>
                                    <div className="w-2 h-2 bg-[#C8A165] rotate-45"></div>
                                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C8A165]"></div>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-[#3A2A1F]/70 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed font-body">
                                Bring your vision to life with our bespoke traditional clothing service.
                                Contact us with your specific requirements, measurements, and design preferences
                                for a truly unique piece crafted just for you.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <Button
                                    size="lg"
                                    className="bg-[#3A5A40] hover:bg-[#2e4732] text-white rounded-full px-8 py-6 text-base font-medium shadow-[0_4px_14px_rgba(58,90,64,0.25)] transition-all hover:scale-105"
                                    asChild
                                >
                                    <a
                                        href={`https://wa.me/91${config.contact.whatsapp}?text=${encodeURIComponent(
                                            'Hello! I am interested in ordering a custom design. Here are my details:\n\n'
                                        )}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <MessageCircle className="mr-2 h-5 w-5" />
                                        WhatsApp Us
                                    </a>
                                </Button>

                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-2 border-[#C8A165] text-[#3A2A1F] hover:bg-[#C8A165]/10 rounded-full px-8 py-6 text-base font-medium transition-all hover:scale-105"
                                    asChild
                                >
                                    <a
                                        href={`mailto:${config.contact.email}?subject=${encodeURIComponent(
                                            'Custom Design Inquiry'
                                        )}&body=${encodeURIComponent(
                                            'Hello,\n\nI am interested in ordering a custom traditional piece. Here are my requirements:\n\n'
                                        )}`}
                                    >
                                        <Mail className="mr-2 h-5 w-5" />
                                        Email Us
                                    </a>
                                </Button>
                            </div>

                            {/* Additional Info */}
                            <p className="mt-8 text-sm text-[#3A2A1F]/50 italic font-serif">
                                "Every thread tells a story of tradition and craftsmanship"
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
