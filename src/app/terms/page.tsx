
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function TermsPage() {
  return (
    <div className="bg-background min-h-screen">
      <header className="py-4 px-6 border-b">
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </header>
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-heading font-bold text-[#3A2A1F] mb-8">Terms of Service</h1>
          <div className="prose prose-lg text-[#3A2A1F]/70 space-y-6 font-body">
            <p>
              Welcome to <strong>The Traditional Needle Work</strong>. By accessing our website and using our services, you agree to comply with the following terms and conditions.
            </p>

            <h2 className="text-2xl font-heading font-bold text-[#3A2A1F] pt-4">1. Custom Orders & Sizing</h2>
            <p>
              Many of our products are handcrafted or custom-stitched to your specific measurements. Please ensure that the measurements provided are accurate. We are not responsible for fitting issues resulting from incorrect measurements provided by the customer.
            </p>

            <h2 className="text-2xl font-heading font-bold text-[#3A2A1F] pt-4">2. Intellectual Property</h2>
            <p>
              All content on this website, including designs, images, and embroidery patterns, is the exclusive property of <strong>The Traditional Needle Work</strong>. Unauthorized reproduction or use of our traditional designs is strictly prohibited.
            </p>

            <h2 className="text-2xl font-heading font-bold text-[#3A2A1F] pt-4">3. Shipping & Delivery</h2>
            <p>
              We ship products across India. While we strive for timely delivery, shipping times may vary depending on your location and the complexity of custom handicraft work. We are not liable for delays caused by third-party logistics partners.
            </p>

            <h2 className="text-2xl font-heading font-bold text-[#3A2A1F] pt-4">4. Returns & Exchanges</h2>
            <p>
              Due to the nature of handcrafted and custom-made traditional wear, we generally do not accept returns. Exchanges or alterations are handled on a case-by-case basis through our support team if a manufacturing defect is present.
            </p>

            <h2 className="text-2xl font-heading font-bold text-[#3A2A1F] pt-4">5. Governing Law</h2>
            <p>
              These terms are governed by the laws of West Bengal, India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Birbhum.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
