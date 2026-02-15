'use server';


import Fuse from 'fuse.js';
import nlp from 'compromise';
import { productData, Product, Category } from '@/lib/products';
import placeholderImagesData from '@/lib/placeholder-images.json';

// Type for placeholder images
type PlaceholderImage = {
    id: string;
    imageUrl: string;
    description?: string;
    imageHint?: string;
};

// Create a map for fast lookup by dish name (id)
const imageMap = new Map<string, string>(
    (placeholderImagesData.placeholderImages as PlaceholderImage[]).map(img => [img.id.toLowerCase(), img.imageUrl])
);

// Brand Info
const brandInfo = {
    name: "The Traditional Needle Work",
    tagline: "Elegance in Every Stitch - Premium Traditional Wear",
    address: "National Highway 14, Near Gurukulpara, Tilai, Kutigram, Hattala, Rampurhat - 731224, West Bengal",
    phone: "6296187370",
    whatsapp: "6296187370",
    hours: {
        bn: "১০:০০ AM থেকে ৯:০০ PM পর্যন্ত অনলাইন সাপোর্ট খোলা থাকে।",
        en: "Online support available from 10 AM to 9 PM.",
    },
    upiId: "6296187370@ybl"
};

// Keyword patterns for intent detection (Bengali + English + Banglish) - EXPANDED
const intentPatterns = {
    price: [
        'দাম', 'কত', 'price', 'koto', 'dam', 'টাকা', 'taka', '₹', 'rate', 'cost',
        'charge', 'খরচ', 'khoroch', 'মূল্য', 'mulyo'
    ],
    category: {
        punjabi: ['punjabi', 'panjabi', 'পাঞ্জাবী', 'পাঞ্জাবি', 'mens wear', 'ছেলেদের', 'man', 'kurta', 'set'],
        blouse: ['blouse', 'ব্লাউজ', 'designer blouse', 'চোলি', 'choli'],
        saree: ['saree', 'sari', 'শাড়ি', 'silk', 'সিল্ক', 'tant', 'তাত', 'জামদানি', 'jamdani'],
        custom: ['custom', 'stitching', 'tailor', 'কাস্টম', 'মাপ', 'stitch', 'সেলাই'],
        occasion: ['wedding', 'bridal', 'festival', 'occasion', 'বিয়ে', 'পুজো', 'puja', 'party', 'পার্টি']
    },
    popular: [
        'popular', 'জনপ্রিয়', 'best', 'সেরা', 'ভালো', 'bhalo', 'recommend', 'সাজেস্ট',
        'suggest', 'top', 'famous', 'বিখ্যাত', 'trending', 'hit', 'special', 'স্পেশাল'
    ],
    cheap: [
        'cheap', 'সস্তা', 'sosta', 'budget', 'কম', 'kom', 'under', 'নিচে', 'affordable',
        'pocket', 'econom', 'কম দামে', 'kam dame'
    ],
    expensive: [
        'premium', 'expensive', 'দামী', 'dami', 'high', 'luxury', 'লাক্সারি', 'best quality'
    ],
    quick: [
        'quick', 'fast', 'তাড়াতাড়ি', 'taratari', 'jaldi', 'জলদি', 'instant', 'ready', 'minutes'
    ],
    combo: [
        'combo', 'কম্বো', 'set', 'সেট', 'pack', 'প্যাক', 'collection', 'কালেকশন'
    ],
    location: [
        'location', 'address', 'কোথায়', 'kothay', 'ঠিকানা', 'thikana', 'where', 'direction',
        'map', 'রাস্তা', 'route', 'কিভাবে', 'kivabe', 'যাবো', 'jabo'
    ],
    hours: [
        'time', 'সময়', 'somoy', 'open', 'খোলা', 'khola', 'close', 'বন্ধ', 'bondho',
        'কখন', 'kokhon', 'when', 'hours', 'timing', 'এখন', 'ekhon'
    ],
    contact: [
        'contact', 'phone', 'call', 'ফোন', 'নম্বর', 'number', 'whatsapp', 'যোগাযোগ',
        'jogajog', 'reach', 'ডাকবো', 'dakbo'
    ],
    greeting: [
        'hi', 'hello', 'হ্যালো', 'নমস্কার', 'hey', 'হাই', 'namaskar', 'সুপ্রভাত', 'good morning'
    ],
    whatToWear: [
        'কি পরব', 'ki porbo', 'ki porbe', 'dress', 'ড্রেস', 'looking for', 'clothes', 'পোশাক',
        'suggest koro', 'bolo ki porbo', 'recommend koro', 'কি আছে', 'ki ache'
    ],
    todaySpecial: [
        'new', 'নতুন', 'notun', 'collection', 'কালেকশন', 'special', 'নতুন কি'
    ]
};

// Initialize Fuse instance
const allItems = productData.flatMap(cat => cat.products);
const fuse = new Fuse(allItems, {
    keys: ['name', 'description'],
    threshold: 0.4, // 0.0 = perfect match, 1.0 = match anything
    distance: 100,
    includeScore: true
});

// Fuzzy match item name - POWERED BY FUSE.JS
function findProduct(query: string): Product | null {
    const q = query.trim();

    // 1. Try Fuse.js search
    const results = fuse.search(q);

    if (results.length > 0) {
        // Return best match if score is good (lower is better)
        const bestMatch = results[0];
        if (bestMatch.score && bestMatch.score < 0.4) {
            return bestMatch.item;
        }
    }

    // 2. Fallback: Check if query contains product name
    const found = allItems.find(item => q.toLowerCase().includes(item.name.toLowerCase()));
    if (found) return found;

    return null;
}

// Find category
function findCategory(query: string): Category | null {
    const q = query.toLowerCase();

    for (const [catKey, keywords] of Object.entries(intentPatterns.category)) {
        if (keywords.some(kw => q.includes(kw))) {
            const catNameMap: Record<string, string> = {
                punjabi: 'Embroidered Punjabis',
                blouse: 'Designer Blouses',
                saree: 'Occasion Sarees',
                custom: 'Custom Stitching'
            };
            return productData.find(cat => cat.name === catNameMap[catKey]) || null;
        }
    }
    return null;
}

// Check if message contains any keyword from list
function hasKeyword(message: string, keywords: string[]): boolean {
    const m = message.toLowerCase();
    return keywords.some(kw => m.includes(kw.toLowerCase()));
}

// Get top items by ratings
function getTopItems(count: number = 12): Product[] {
    return productData.flatMap(cat => cat.products)
        .sort((a, b) => (b.ratingsCount || 0) - (a.ratingsCount || 0))
        .slice(0, count);
}

// Get budget items
function getBudgetItems(maxPrice: number = 800): Product[] {
    return productData.flatMap(cat => cat.products)
        .filter(item => item.price <= maxPrice)
        .sort((a, b) => a.price - b.price)
        .slice(0, 15);
}

// NEW: Get premium items
function getPremiumItems(minPrice: number = 1500): Product[] {
    return productData.flatMap(cat => cat.products)
        .filter(item => item.price >= minPrice)
        .sort((a, b) => b.price - a.price)
        .slice(0, 12);
}

// NEW: Get products by category
function getProductsByCategory(cats: string[]): Product[] {
    return productData
        .filter(cat => cats.includes(cat.name))
        .flatMap(cat => cat.products)
        .slice(0, 12);
}

// NEW: Get random suggestions for variety
function getRandomItems(count: number = 8): Product[] {
    const allItems = productData.flatMap(cat => cat.products);
    const shuffled = [...allItems].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

// Format price
function formatPrice(item: Product): string {
    if (item.originalPrice && item.originalPrice > item.price) {
        const discount = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);
        return `₹${item.price} (মূল্য ছিল ₹${item.originalPrice}, ${discount}% ছাড়! 🔥)`;
    }
    return `₹${item.price}`;
}

// Get image URL from placeholder-images.json
function getImageUrl(productName: string): string | undefined {
    return imageMap.get(productName.toLowerCase());
}

export type LocalAIResponse = {
    handled: boolean;
    response?: string;
    suggestedProduct?: string;
    suggestedItems?: string[];
    recommendedProducts?: {
        name: string;
        price: number;
        description?: string;
        rating?: number;
        ratingsCount?: number;
        image?: string;
    }[];
    actionType?: string;
    cartItems?: {
        name: string;
        price: number;
        quantity: number;
    }[];
};

// Helper: Extract quantity from string (handles English "2", Bangla "২", text "two")
function extractQuantity(text: string): number {
    const t = text.toLowerCase();

    // 1. Check for specific number words
    const numberMap: Record<string, number> = {
        'ek': 1, 'ekta': 1, 'acta': 1, 'akta': 1, 'one': 1, 'single': 1,
        'du': 2, 'dui': 2, 'duita': 2, 'duto': 2, 'two': 2, 'double': 2,
        'tin': 3, 'tinte': 3, 'three': 3,
        'char': 4, 'charte': 4, 'four': 4,
        'pach': 5, 'five': 5,
        'choy': 6, 'six': 6,
        'sat': 7, 'seven': 7,
        'at': 8, 'eight': 8,
        'noy': 9, 'nine': 9,
        'dosh': 10, 'ten': 10
    };

    for (const [word, num] of Object.entries(numberMap)) {
        if (t.includes(` ${word} `) || t.startsWith(`${word} `) || t.endsWith(` ${word}`)) return num;
    }

    // 2. Check for digits (English & Bangla)
    const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    let normalized = t;
    banglaDigits.forEach((digit, i) => {
        normalized = normalized.replace(new RegExp(digit, 'g'), i.toString());
    });

    const match = normalized.match(/(\d+)/);
    if (match) {
        const num = parseInt(match[1]);
        return num > 0 && num < 50 ? num : 1; // Reasonable limit
    }

    return 1; // Default to 1
}

// Main function: Try to handle locally - SIGNIFICANTLY EXPANDED
export async function tryLocalResponse(message: string): Promise<LocalAIResponse> {
    const m = message.toLowerCase().trim();

    // ORDERING KEYWORDS - Check FIRST!
    // Now we TRY to handle simple orders locally before falling back to Gemini
    const orderingKeywords = [
        'দাও', 'dao', 'নেব', 'nibo', 'neb', 'নেবো', 'order', 'add', 'লাগবে', 'lagbe',
        'চাই', 'chai', 'দিন', 'din', 'দে', 'de', 'নিব', 'nib', 'khao', 'khabo', 'eats',
        'niye ay', 'niye aso', 'send', 'pathao', 'niye eso'
    ];

    /* 
    // Commenting out local ordering to let Gemini handle it with better context
    if (hasKeyword(m, orderingKeywords)) {
        // ... local order logic ...
        return { handled: false };
    }
    */

    // 1. Greeting
    if (hasKeyword(m, intentPatterns.greeting) && m.length < 25) {
        return {
            handled: true,
            response: "নমস্কার! 🙏 আমি NeedleWork Stylist। আজ কি ধরনের পোশাক খুঁজছেন? ✨\n\nনিচের অপশন থেকে বেছে নিন!",
            suggestedItems: ['✨ নতুন কালেকশন', '👘 পাঞ্জাবী', '👗 ডিজাইনার ব্লাউজ'],
            actionType: 'general'
        };
    }

    // 2. "What to wear?"
    /* Disable local suggestions */
    if (hasKeyword(m, intentPatterns.whatToWear)) {
        return { handled: false };
    }

    /* Disable local special products */
    if (hasKeyword(m, intentPatterns.todaySpecial)) {
        return { handled: false };
    }

    // 4. Location query
    if (hasKeyword(m, intentPatterns.location)) {
        return {
            handled: true,
            response: `📍 **আমাদের ঠিকানা:**\n${brandInfo.address}\n\n🗺️ Google Maps এ **"The Traditional Needle Work"** সার্চ করুন!\n\n✨ আমরা সারা ভারতে ডেলিভারি করি।`,
            actionType: 'location'
        };
    }

    // 5. Hours query
    if (hasKeyword(m, intentPatterns.hours)) {
        return {
            handled: true,
            response: `🕐 **অনলাইন সাপোর্ট সময়:**\n${brandInfo.hours.bn}\n\n🛍️ ওয়েবসাইট থেকে ২৪/৭ অর্ডার করা যাবে!`,
            actionType: 'hours'
        };
    }

    // 6. Contact query
    if (hasKeyword(m, intentPatterns.contact)) {
        return {
            handled: true,
            response: `📞 **যোগাযোগ করুন:**\n\n📱 ফোন: ${brandInfo.phone}\n💬 WhatsApp: wa.me/${brandInfo.whatsapp}\n\n✨ অর্ডার বা কাস্টম ডিজাইনিং এর জন্য কল করুন!`,
            actionType: 'contact'
        };
    }

    /* Fallback to Gemini for everything else product-related */
    return { handled: false };

    // Not handled locally → fallback to Gemini
    return { handled: false };
}
