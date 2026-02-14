'use server';
/**
 * @fileOverview A product recommendation AI agent based on a questionnaire.
 *
 * - recommendProduct - A function that recommends a product based on user's answers.
 * - RecommendProductInput - The input type for the recommendProduct function.
 * - RecommendProductOutput - The return type for the recommendProduct function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { productData } from '@/lib/products';

const RecommendProductInputSchema = z.object({
    occasion: z.string().describe("The user's style occasion (e.g., 'A traditional wedding')"),
    mood: z.string().describe("The user's current style preference (e.g., 'Elegant and sophisticated')"),
    preference: z.string().describe("The user's material or look preference (e.g., 'Silk and rich embroidery')"),
});
export type RecommendProductInput = z.infer<typeof RecommendProductInputSchema>;

const RecommendProductOutputSchema = z.object({
    productName: z.string().describe('The name of the recommended product.'),
    reason: z.string().describe('A brief reason why this product is recommended.'),
});
export type RecommendProductOutput = z.infer<typeof RecommendProductOutputSchema>;

export async function recommendProduct(input: RecommendProductInput): Promise<RecommendProductOutput> {
    return recommendProductFlow(input);
}

// Flatten the products for the prompt
const allProducts = productData.flatMap(category =>
    category.products.map(item => ({ name: item.name, price: item.price, description: item.description }))
);

const premiumProducts = allProducts.filter(d => d.price >= 5000).map(d => d.name);
const midRangeProducts = allProducts.filter(d => d.price > 1000 && d.price < 5000).map(d => d.name);
const budgetProducts = allProducts.filter(d => d.price <= 1000).map(d => d.name);

const prompt = ai.definePrompt({
    name: 'recommendProductPrompt',
    input: { schema: RecommendProductInputSchema },
    output: { schema: RecommendProductOutputSchema },
    prompt: `You are a premium fashion stylist for "The Traditional Needle Work", a brand specializing in high-quality traditional Bengali attire like Punjabis, Sarees, and Blouses. Your goal is to recommend a single product to a customer based on their answers to a style questionnaire.

  Your goal is to provide a personalized, high-end shopping experience. Guide them towards a more premium, intricate, and memorable piece if their answers suggest they are in the mood for something special.

  Here are the user's answers:
  - Occasion: {{{occasion}}}
  - Mood: {{{mood}}}
  - Style Preference: {{{preference}}}

  Here are the lists of products you can recommend from:
  - Premium Collection (Intricate work): ${premiumProducts.join(', ')}
  - Mid-Range Selection: ${midRangeProducts.join(', ')}
  - Essential/Budget Collection: ${budgetProducts.join(', ')}

  Your recommendation logic:
  1. If the occasion is "Wedding" or "Gala" OR the mood is "Sophisticated," "Royal," or "Luxury," you MUST prioritize the Premium Collection.
  2. If they mentioned "Silk" or "Zari," look for Banarasi or Silk Sarees.
  3. If they mentioned "Hand-stitched" or "Needlework," lean towards our Designer Punjabis or Blouses.
  4. If the preferred price point or mood is casual, recommend from the Budget or Mid-Range collections.
  
  Based on this, recommend one single product. Provide the product name and a compelling, short reason why it's the perfect choice for them.
  
  Example output:
  {
    "productName": "Banarasi Silk Saree - Red",
    "reason": "For a royal wedding look, nothing matches the timeless elegance of this hand-woven Banarasi silk. Its rich red tone and gold zari work will make you the center of attention."
  }
  `,
});

const recommendProductFlow = ai.defineFlow(
    {
        name: 'recommendProductFlow',
        inputSchema: RecommendProductInputSchema,
        outputSchema: RecommendProductOutputSchema,
    },
    async input => {
        const { output } = await prompt(input);
        return output!;
    }
);
