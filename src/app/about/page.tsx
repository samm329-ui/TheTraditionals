
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
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary font-heading font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Our Legacy</span>
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-[#3A2A1F] leading-tight">Heritage in Every Thread</h1>
            <div className="h-1 w-20 bg-primary/30 mt-8 mx-auto rounded-full" />
          </div>

          <div className="prose prose-lg max-w-none text-[#3A2A1F]/80 space-y-12 font-body leading-relaxed">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-2xl font-serif italic text-primary leading-snug">
                  "Weaving stories of royalty and grace into every handcrafted stitch."
                </p>
                <p>
                  Welcome to <strong className="text-[#3A2A1F]">The Traditional Needle Work</strong>. Our journey began with a singular vision: to preserve the dying art of authentic Bengali needlework while bringing it to the modern connoisseur of fine clothing.
                </p>
              </div>
              <div className="bg-[#F8F5F0] p-8 rounded-3xl border border-[#C8A165]/20 shadow-inner">
                <h3 className="font-heading font-bold text-xl mb-4 text-[#3A2A1F]">The Artisan's Touch</h3>
                <p className="text-sm">
                  Every Punjabi, every designer blouse, and every custom-stitched garment is born in the hands of master artisans in Birbhum. These are not just products; they are labor of love, requiring days of meticulous embroidery to achieve perfection.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-4xl font-heading font-bold text-[#3A2A1F] border-l-4 border-primary pl-6">Our Craftsmanship</h2>
              <p>
                We believe that true luxury lies in the details. At <strong>The Traditional Needle Work</strong>, we source only the finest fabrics—from breathable cottons to rich tussar silks. Our signature needlework is inspired by centuries-old traditional patterns, reimagined for the contemporary silhouette.
              </p>
              <p>
                Whether it's a bespoke bridal blouse or a designer Punjabi for a grand celebration, our commitment remains the same: 100% authentic, handcrafted, and tailored to your unique elegance.
              </p>
            </div>

            <div className="bg-[#3A2A1F] text-[#F6F2EB] p-12 rounded-[40px] text-center space-y-6">
              <h2 className="text-3xl font-heading font-bold">Our Promise</h2>
              <p className="max-w-2xl mx-auto opacity-90">
                To keep the tradition alive, to empower local artisans, and to ensure that every time you wear our creations, you feel the weight of heritage and the lightness of modern grace.
              </p>
              <div className="pt-4 text-primary font-heading font-bold tracking-widest uppercase text-xs">Since 2024 • Birbhum, West Bengal</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
