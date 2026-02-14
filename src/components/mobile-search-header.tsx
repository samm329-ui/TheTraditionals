
"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { type Product, type Category } from "@/lib/products";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlaceHolderImages } from "@/lib/placeholder-images";

type MobileSearchHeaderProps = {
    onSearch: (query: string) => void;
    searchQuery: string;
    allMenuItems: Category[];
    onProductSelect: (item: Product) => void;
};

const MobileSearchHeader = ({ onSearch, searchQuery, allMenuItems, onProductSelect }: MobileSearchHeaderProps) => {
    const flatMenuItems = React.useMemo(() => allMenuItems.flatMap(c => c.products), [allMenuItems]);

    const searchResults = React.useMemo(() => {
        if (!searchQuery) return [];
        const lowerCaseQuery = searchQuery.toLowerCase();

        let categoryResults: Product[] = [];
        if (lowerCaseQuery.includes('men')) {
            const menCategory = allMenuItems.find(cat => cat.name.toLowerCase().includes('men'));
            if (menCategory) categoryResults.push(...menCategory.products);
        } else {
            const matchedCategory = allMenuItems.find(cat => cat.name.toLowerCase().includes(lowerCaseQuery));
            if (matchedCategory) {
                categoryResults = matchedCategory.products;
            }
        }

        const itemResults = flatMenuItems.filter(item =>
            item.name.toLowerCase().includes(lowerCaseQuery) ||
            item.description.toLowerCase().includes(lowerCaseQuery)
        );

        const combined = [...categoryResults, ...itemResults];
        const uniqueResults = Array.from(new Map(combined.map(item => [item.name, item])).values());

        return uniqueResults;
    }, [searchQuery, allMenuItems, flatMenuItems]);

    const handleResultClick = (item: Product) => {
        onProductSelect(item);
        onSearch('');
    }

    return (
        <>
            <header className="sticky top-0 z-40 bg-[#fcf7f3] pt-3 pb-4 border-b border-[#E5D3B3]/30 shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex-shrink-0">
                            <Link href="/">
                                <div className="font-heading font-bold text-lg text-primary tracking-wide leading-none">
                                    The <br /> Traditional
                                </div>
                            </Link>
                        </div>

                        <div className="group flex-grow relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1C1917]/40 group-focus-within:text-primary transition-colors duration-300" />
                            <input
                                type="text"
                                placeholder="Search our collection..."
                                className="w-full bg-white/50 border border-[#E5D3B3] rounded-full py-2 pl-10 pr-8 text-sm text-[#1C1917] placeholder:text-[#1C1917]/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-300 font-light"
                                value={searchQuery}
                                onChange={(e) => onSearch(e.target.value)}
                                suppressHydrationWarning
                            />
                            {searchQuery && (
                                <button onClick={() => onSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#1C1917]/40 hover:text-primary transition-colors">
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {searchQuery && (
                <div className="fixed inset-0 bg-[#fcf7f3] z-30 md:hidden pt-[70px]">
                    <ScrollArea className="h-full">
                        <div className="container mx-auto px-4 pb-20">
                            {searchResults.length > 0 ? (
                                <>
                                    <p className="text-xs font-medium text-[#1C1917]/50 uppercase tracking-widest mb-3">Showing results for "{searchQuery}"</p>
                                    <div className="space-y-3">
                                        {searchResults.map(item => {
                                            const imageData = PlaceHolderImages.find(img => img.id === item.name);
                                            return (
                                                <button key={item.name} onClick={() => handleResultClick(item)} className="w-full text-left flex items-start gap-4 p-3 rounded-xl bg-white border border-[#E5D3B3]/20 hover:border-primary/30 transition-all duration-300">
                                                    <div className="relative w-16 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-[#f0ebe5]">
                                                        {imageData ? (
                                                            <Image src={imageData.imageUrl} alt={item.name} fill sizes="64px" className="object-cover" loading="lazy" quality={75} />
                                                        ) : (
                                                            <div className="w-full h-full bg-[#E5D3B3]/20 flex items-center justify-center text-[#1C1917]/20">
                                                                <span className="text-[10px]">No Image</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="py-1">
                                                        <p className="font-heading font-bold text-[#1C1917] text-base leading-tight mb-1">{item.name}</p>
                                                        <p className="text-sm text-primary font-medium">Rs. {item.price}</p>
                                                        <p className="text-xs text-[#1C1917]/50 line-clamp-2 mt-1 font-light">{item.description}</p>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-[#E5D3B3]/20 rounded-full flex items-center justify-center mx-auto mb-4 text-[#1C1917]/40">
                                        <Search className="h-8 w-8" />
                                    </div>
                                    <p className="font-medium text-[#1C1917] mb-1">No results found</p>
                                    <p className="text-sm text-[#1C1917]/50">Try searching for something else.</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </div>
            )}
        </>
    );
};

export default MobileSearchHeader;
