
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen">
      <header className="py-4 px-6 border-b">
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </header>
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-8">Heritage in Every Thread</h1>
          <div className="prose prose-lg text-muted-foreground space-y-6 font-body leading-relaxed">
            <p className="text-xl text-[#3A2A1F]/80 italic font-serif">
              "Weaving stories of heritage and grace into every thread."
            </p>
            <p>
              Welcome to <strong>The Traditional Needle Work</strong>. Our journey began with a deep-seated passion for the timeless elegance of Bengali craftsmanship and a dream to preserve the rich legacy of traditional Indian weaving and embroidery.
            </p>
            <p>
              We believe that clothing is more than just fabric; it is an expression of identity, culture, and artistry. Every piece in our collection—from our intricately embroidered Punjabis to our bespoke designer blouses—is a testament to the skill and dedication of local artisans who have perfected their craft over generations.
            </p>

            <h2 className="text-3xl font-heading font-semibold text-foreground pt-6">Our Craftsmanship</h2>
            <p>
              Our mission is to bring you the finest traditional attire crafted with the highest quality fabrics and authentic needlework. We specialize in handcrafted embroidery, focusing on detailing that makes every garment a unique masterpiece.
            </p>
            <p>
              Whether you are celebrating a festival, attending a wedding, or looking for a custom-designed piece for a special occasion, our collection is curated to provide you with a sophisticated and memorable experience.
            </p>

            <h2 className="text-3xl font-heading font-semibold text-foreground pt-6">Our Commitment</h2>
            <p>
              We are committed to preserving traditional techniques while embracing modern style. We source only the finest textiles and work closely with our artisans to ensure that every stitch reflects our standard of excellence and heritage.
            </p>
            <p>
              At <strong>The Traditional Needle Work</strong>, we look forward to being a part of your celebrations and helping you grace every occasion with timeless style.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
