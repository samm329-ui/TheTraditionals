'use client';

import * as React from 'react';
import { Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Marquee } from '../ui/marquee';
import { cn } from '@/lib/utils';

// Extended reviews array with more testimonials for traditional clothing
const expandedReviews = [
    {
        name: 'Priya Chatterjee',
        title: 'Fashion Enthusiast · Verified Buyer',
        review:
            'The embroidery work on my Punjabi is absolutely exquisite! The attention to detail and quality of fabric exceeded my expectations. It is clear that every piece is crafted with love and traditional expertise. Perfect for special occasions.',
        avatarId: 'review-avatar-1',
    },
    {
        name: 'Ananya Das',
        title: 'Bridal Customer',
        review:
            'I ordered a custom blouse for my wedding and the craftsmanship was outstanding. The team understood exactly what I wanted and delivered a masterpiece. The fit was perfect and the embroidery was stunning. Highly recommended for bridal wear!',
        avatarId: 'review-avatar-2',
    },
    {
        name: 'Rajesh Kumar',
        title: 'Regular Customer',
        review:
            'I have purchased multiple Punjabis from The Traditional Needle Work and each one has been exceptional. The traditional designs combined with modern comfort make them perfect for both festivals and formal occasions. Great quality at reasonable prices.',
        avatarId: 'review-avatar-3',
    },
    {
        name: 'Shreya Banerjee',
        title: 'Designer · Fashion Blogger',
        review:
            'As someone who appreciates fine craftsmanship, I am thoroughly impressed by their work. The designer blouses are unique, the embroidery is intricate, and the overall finish is premium. They have mastered the art of blending tradition with contemporary style.',
        avatarId: 'review-avatar-4',
    },
    {
        name: 'Meera Singh',
        title: 'Verified Buyer',
        review:
            'Ordered a traditional blouse for Durga Puja and received so many compliments! The fabric quality is excellent and the needlework is simply beautiful. The customer service was also very helpful in choosing the right design. Will definitely order again.',
        avatarId: 'review-avatar-5',
    },
    {
        name: 'Rohit Dutta',
        title: 'Groom',
        review:
            'Purchased a designer punjabi for my wedding reception. The rich colors and detailed embroidery made me stand out. Everyone asked where I got it from. The tailoring was perfect and it was comfortable to wear all evening.',
        avatarId: 'review-avatar-6',
    },
    {
        name: 'Aditi Mukherjee',
        title: 'Festive Wear Enthusiast',
        review:
            'The sarees here are absolutely stunning! I bought the royal pink saree and it has become my go-to for special occasions. The handcrafted work is evident in every detail. Worth every rupee!',
        avatarId: 'review-avatar-7',
    },
    {
        name: 'Sanjay Bose',
        title: 'Corporate Professional',
        review:
            'Their white minimalist punjabi is perfect for formal events. Clean design, excellent fabric, and the fit is impeccable. Great for both traditional and semi-formal occasions.',
        avatarId: 'review-avatar-8',
    },
    {
        name: 'Kavita Sharma',
        title: 'Mother of the Bride',
        review:
            'Ordered multiple blouses for my daughter wedding. Each one was more beautiful than the last! The team was patient with my custom requirements and delivered everything on time. Exceptional service!',
        avatarId: 'review-avatar-9',
    },
    {
        name: 'Arjun Sen',
        title: 'Cultural Event Organizer',
        review:
            'We order punjabis in bulk for our cultural programs. The quality is consistent, prices are fair, and delivery is always on time. The traditional needle work truly lives up to its name!',
        avatarId: 'review-avatar-10',
    },
];

const ReviewCard = ({ review }: { review: (typeof expandedReviews)[0] }) => {
    const initials = review.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    return (
        <div className="relative w-[350px] cursor-pointer overflow-hidden rounded-2xl border border-[#C8A165]/20 p-6 shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl bg-white/80 backdrop-blur-sm">
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#C8A165]/10 to-transparent rounded-bl-full"></div>

            {/* Quote mark watermark */}
            <div className="absolute top-3 left-3 text-[#C8A165]/10 font-serif text-6xl leading-none select-none">"</div>

            {/* Star Rating */}
            <div className="flex gap-1 mb-4 relative z-10">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#C8A165] fill-[#C8A165]" />
                ))}
            </div>

            {/* Review Text */}
            <p className="text-[#3A2A1F]/80 text-sm leading-relaxed mb-6 relative z-10 font-body italic">
                {review.review}
            </p>

            {/* Reviewer Info */}
            <div className="flex items-center gap-3 pt-4 border-t border-[#C8A165]/10">
                <Avatar className="h-12 w-12 border-2 border-[#C8A165]/30">
                    <AvatarImage
                        src={`https://ui-avatars.com/api/?name=${review.name}&background=F6F2EB&color=C8A165`}
                        alt={review.name}
                    />
                    <AvatarFallback className="bg-[#C8A165]/10 text-[#3A2A1F] font-heading font-bold">
                        {initials}
                    </AvatarFallback>
                </Avatar>
                <div className="text-left">
                    <h3 className="font-heading font-bold text-sm text-[#3A2A1F]">{review.name}</h3>
                    <p className="font-body text-xs text-[#3A2A1F]/60 uppercase tracking-wide">
                        {review.title || 'Valued Customer'}
                    </p>
                </div>
            </div>
        </div>
    );
};

const ReviewsSection = () => {
    // Split reviews into two rows for visual variety
    const firstRow = expandedReviews.slice(0, Math.ceil(expandedReviews.length / 2));
    const secondRow = expandedReviews.slice(Math.ceil(expandedReviews.length / 2));

    return (
        <section id="reviews" className="py-20 md:py-32 bg-gradient-to-br from-[#F6F2EB] via-[#EFE6D8] to-[#F6F2EB] relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C8A165]/30 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C8A165]/30 to-transparent" />

            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16 px-4">
                    <span className="text-[#C8A165] font-heading font-bold tracking-wider uppercase text-sm mb-3 block">
                        Testimonials
                    </span>
                    <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#3A2A1F]">
                        What Our Patrons Say
                    </h2>
                    {/* Ornamental Divider */}
                    <div className="flex items-center justify-center gap-3 mt-4">
                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#C8A165]"></div>
                        <div className="w-2 h-2 bg-[#C8A165] rotate-45"></div>
                        <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C8A165]"></div>
                    </div>
                    <p className="font-body mt-6 text-base text-[#3A2A1F]/70 max-w-2xl mx-auto leading-relaxed">
                        Stories of elegance and tradition from those who have experienced our craftsmanship.
                    </p>
                </div>

                {/* 3D Marquee Reviews */}
                <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg">
                    <Marquee pauseOnHover className="[--duration:60s]">
                        {firstRow.map((review, idx) => (
                            <ReviewCard key={`first-${idx}`} review={review} />
                        ))}
                    </Marquee>
                    <Marquee reverse pauseOnHover className="[--duration:60s]">
                        {secondRow.map((review, idx) => (
                            <ReviewCard key={`second-${idx}`} review={review} />
                        ))}
                    </Marquee>

                    {/* Gradient masks for fade effect */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-1/12 bg-gradient-to-r from-[#F6F2EB]"></div>
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-1/12 bg-gradient-to-l from-[#F6F2EB]"></div>
                </div>
            </div>
        </section>
    );
};

export default ReviewsSection;
