'use server';
/**
 * @fileOverview A hybrid AI fashion stylist for The Traditional Needle Work.
 * Tries local keyword-based handler first (FREE), falls back to Gemini for complex queries.
 * Has complete knowledge of the product catalog, sizes, and styling pairings.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { productData } from '@/lib/products';
import { tryLocalResponse } from '@/ai/local-ai';

const ChatInputSchema = z.object({
    message: z.string().describe("The user's message in any language"),
    userLocale: z.string().optional().describe("The user's browser locale (e.g., 'bn-IN', 'en-US')"),
    history: z.array(z.object({
        role: z.enum(['user', 'model']),
        content: z.string()
    })).optional().describe("Conversation history")
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
    response: z.string().describe('The AI response in the same language as the user'),
    suggestedProduct: z.string().optional().describe('single product suggestion'),
    suggestedItems: z.array(z.string()).optional().describe('Array of suggested product names for follow-up'),
    // New: Rich product cards for lists
    recommendedProducts: z.array(z.object({
        name: z.string(),
        price: z.number(),
        description: z.string().optional(),
        rating: z.number().optional(),
        ratingsCount: z.number().optional(),
        image: z.string().optional(), // Dynamic product photo URL
    })).optional().describe('Array of full product details for rich UI cards'),
    actionType: z.enum(['general', 'product_recommendation', 'location', 'hours', 'contact', 'order', 'item_added', 'show_total', 'add_to_cart']).describe('The type of action implied'),
    cartItems: z.array(z.object({
        name: z.string(),
        price: z.number(),
        quantity: z.number().default(1)
    })).optional().describe('Items to add to cart'),
    totalPrice: z.number().optional().describe('Total price of items in cartItems')
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

// Main chat function - uses hybrid approach
export async function chat(input: ChatInput): Promise<ChatOutput> {
    // Step 1: Try local handler first (FREE - no API cost)
    const localResult = await tryLocalResponse(input.message);

    if (localResult.handled) {
        return {
            response: localResult.response!,
            suggestedProduct: localResult.suggestedProduct,
            suggestedItems: localResult.suggestedItems,
            recommendedProducts: localResult.recommendedProducts,
            actionType: (localResult.actionType || 'general') as ChatOutput['actionType'],
            cartItems: localResult.cartItems // Pass cart items if present
        };
    }

    // Step 2: Fall back to Gemini for complex queries
    return needleWorkChatFlow(input);
}

// Create detailed products with categories, prices, and descriptions
const detailedProducts = productData.map(category => ({
    categoryName: category.name,
    productCount: category.products.length,
    products: category.products.map(item => ({
        name: item.name,
        price: item.price,
        originalPrice: item.originalPrice,
        description: item.description,
        rating: item.rating,
        ratingsCount: item.ratingsCount,
        hasOffer: item.originalPrice ? true : false,
        discount: item.originalPrice ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100) : 0
    }))
}));

// Best sellers and popular items by ratings
const bestSellers = productData.flatMap(cat => cat.products)
    .filter(item => item.ratingsCount && item.ratingsCount > 50)
    .sort((a, b) => (b.ratingsCount || 0) - (a.ratingsCount || 0))
    .slice(0, 10)
    .map(item => `${item.name} (₹${item.price}) - ${item.ratingsCount}+ happy customers, ${item.rating}★`);

// Items with offers
const itemsWithOffers = productData.flatMap(cat => cat.products)
    .filter(item => item.originalPrice)
    .map(item => `${item.name}: ₹${item.price} (was ₹${item.originalPrice})`);

// Premium items
const premiumItems = productData.flatMap(cat => cat.products)
    .filter(item => item.price >= 1500)
    .map(item => `${item.name} (₹${item.price})`);

// Budget-friendly items
const budgetItems = productData.flatMap(cat => cat.products)
    .filter(item => item.price <= 800)
    .map(item => `${item.name} (₹${item.price})`);

const brandInfo = {
    name: "The Traditional Needle Work",
    tagline: "Elegance in Every Stitch - Premium Traditional Wear",
    address: "National Highway 14, Near Gurukulpara, Tilai, Kutigram, Hattala, Rampurhat - 731224, West Bengal (Shipping All Over India)",
    district: "Birbhum",
    phone: "6296187370",
    hours: "10:00 AM - 9:00 PM (Online Support)",
    specialties: "Designer Blouses, Premium Punjabis, Traditional Silk Wear",
    googleMapsUrl: "https://www.google.com/maps/@23.8019756,87.3739737,16z"
};

// Fashion styling pairings
const stylingPairings = `
STYLING GUIDE (What goes well together):

👘 PRODUCTS + ACCESSORIES:
- Designer Blouses → Traditional Silk Sarees or Designer Georgettes
- Premium Punjabis → White Pajamas, Dhotis, or Premium Aligarhis
- Silk Products → Gold-plated jewelry or Temple jewelry
- Wedding Collection → Contrast Dupattas

👗 OCCASION GUIDE:
- Weddings → Heavily Embroidered Blouses & Tussar Punjabis
- Festivals (Durga Puja) → Traditional Red-White Sarees & Silk Punjabis
- Casual Parties → Boat neck blouses & Cotton Punjabis
- Formal Events → High neck designer blouses

💰 TOP PICKS:
- Best Seller Blouses → Fits almost all saree types
- Designer Punjabis → Perfect for groom or wedding guests
`;

// Create full product catalog text for prompt
const fullCatalogText = detailedProducts.map(cat =>
    `\n## ${cat.categoryName} (${cat.productCount} products):\n${cat.products.map(item =>
        `- ${item.name}: ₹${item.price}${item.hasOffer ? ` (was ₹${item.originalPrice}, ${item.discount}% OFF)` : ''} | ${item.rating}★ (${item.ratingsCount} reviews) | ${item.description}`
    ).join('\n')}`
).join('\n');

const prompt = ai.definePrompt({
    name: 'needleWorkChatPrompt',
    input: { schema: ChatInputSchema },
    output: { schema: ChatOutputSchema },
    prompt: `You are NeedleWork Stylist, the elegant and professional virtual fashion expert for 'The Traditional Needle Work'.
    
    CRITICAL: Always respond in the SAME language the user is speaking (Bengali/English). Use premium and classy emojis! ✨👔👗🧵💎

    === BRAND INFO ===
    Name: ${brandInfo.name}
    Tagline: ${brandInfo.tagline}
    Address: ${brandInfo.address}
    Phone: ${brandInfo.phone}
    Support Hours: ${brandInfo.hours}
    Specialties: ${brandInfo.specialties}

    === COMPLETE CATALOG ===
    ${fullCatalogText}

    === BEST SELLERS ===
    ${bestSellers.join('\\n')}

    === OFFERS ===
    ${itemsWithOffers.join('\\n')}

    === STYLING PAIRINGS ===
    ${stylingPairings}

    === HISTORY ===
    {{#each history}}
    {{role}}: {{content}}
    {{/each}}

    === USER MESSAGE ===
    User's browser locale: {{{userLocale}}}
    User's Message: {{{message}}}

    1. Use premium emojis! ✨👔👗🧵💎🛍️🌟
    2. Format prices clearly: ₹XXX
    3. Keep responses elegant, concise and professional
    4. Always end with a helpful styling question or call-to-action
    5. Show running total when items are added

    === QUANTITY PARSING ===
    - "2ta" / "2টা" / "2 plate" = quantity: 2
    - "ekta" / "একটা" / "1" = quantity: 1
    - "tin" / "তিন" / "3" = quantity: 3
    - When quantity mentioned, multiply price accordingly

    === GUIDELINES ===
    1. Answer questions about menu, prices, and pairings.
    2. **VARIETY IS KEY**: Never suggest the same thing twice. Check HISTORY. Vary between categories.
    3. **PROACTIVE ADD-ONS**: ALWAYS ask "আর কিছু লাগবে?" after adding an item.
    4. **SHOW RUNNING TOTAL**: After each item added, show: "🛒 এখন পর্যন্ত: ₹XXX"
    
    5. **MULTI-STEP SHOPPING FLOW** (VERY IMPORTANT):
       a) When user FIRST adds an item:
          - Add item to cartItems with correct quantity and ask for size if not specified.
          - Set actionType to 'item_added'
          - Show: "✅ [Item] (Rs. XX) আপনার ব্যাগে যোগ করলাম! ✨ 🛍️ Total: Rs. XXX। আর কোন ড্রেস বা ব্লাউজ কি দেখবেন?"
          - Provide 3-4 RELEVANT style suggestions in suggestedItems (e.g., if Punjabi added, suggest Pajamas or contrast Dhotis)
       
       b) When user adds MORE items:
          - ACCUMULATE in cartItems (don't replace!)
          - Update running total
          - Show: "✅ [Item] add! 🛒 Total এখন: ₹XXX। আর?"
       
       c) When user says "Checkout" / "ব্যাগ দেখাও" / "আর লাগবে না":
          - Set actionType to 'show_total'
          - Show formatted summary:
            "🧾 **আপনার শপিং ব্যাগ:**
            • 1x Designer Blouse - Rs. 850
            • 1x Premium Punjabi - Rs. 1250
            ─────────────
            💰 **মোট মূল্য: Rs. 2100**
            
            ✅ শপিং ব্যাগে ফাইনাল অ্যাড করবো?"
       
       d) When user CONFIRMS ("হ্যাঁ" / "ok" / "yes" / "করো"):
          - Set actionType to 'add_to_cart'
          - Say: "🎉 দারুণ! Cart এ add হয়ে গেছে! ধন্যবাদ!"
    
    6. **CRITICAL**: Use EXACT names from CATALOG in cartItems. Calculate totalPrice correctly.
    
    === EXAMPLE FLOW ===
    User: "Premium Punjabi দাও"
    AI: "✅ Premium Punjabi (₹1200) add করলাম! ✨
    
    🛒 Total: ₹1200
    
    👖 সাথে কি ধুতি বা পায়জামা দেখবেন?"
    actionType: "item_added"
    cartItems: [{name: "Premium Punjabi", price: 1200, quantity: 1}]
    suggestedItems: ["White Pajama", "Designer Dhoti"]
    totalPrice: 1200
    
    User: "একখানা ধুতি দাও"
    AI: "✅ 1টা Designer Dhoti (₹450) add! 🛒
    
    🛒 Total এখন: ₹1650
    
    আর কিছু লাগবে? কোনো ব্লাউজ কালেকশন কি দেখবেন?"
    actionType: "item_added"
    cartItems: [{name: "Premium Punjabi", price: 1200, quantity: 1}, {name: "Designer Dhoti", price: 450, quantity: 1}]
    suggestedItems: ["Designer Blouse", "Silk Saree"]
    totalPrice: 1650
    
    User: "বাস এটুকুই"
    AI: "🧾 **আপনার ব্যাগ:**
    • 1x Premium Punjabi - ₹1200
    • 1x Designer Dhoti - ₹450
    ─────────────
    💰 **Total: ₹1650**
    
    ✅ Cart এ Add করবো?"
    actionType: "show_total"
    cartItems: [{...}]
    totalPrice: 1650
    
    User: "হ্যাঁ"
    AI: "🎉 দারুণ! ব্যাগে add হয়ে গেছে! ধন্যবাদ! 😊"
    actionType: "add_to_cart"
    `,
});

const needleWorkChatFlow = ai.defineFlow(
    {
        name: 'needleWorkChatFlow',
        inputSchema: ChatInputSchema,
        outputSchema: ChatOutputSchema,
    },
    async input => {
        try {
            const { output } = await prompt(input);
            return output!;
        } catch (error: any) {

            // Return a more informative error response
            return {
                response: `দুঃখিত, AI এ সমস্যা হচ্ছে: ${error?.message || 'Unknown error'}. অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।`,
                actionType: 'general' as const
            };
        }
    }
);
