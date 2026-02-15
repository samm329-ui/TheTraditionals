
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { config } from '@/lib/utils';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background min-h-screen">
      <header className="py-4 px-6 border-b">
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </header>
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-heading font-bold text-[#3A2A1F] mb-8">Privacy Policy</h1>
          <div className="prose prose-lg text-[#3A2A1F]/70 space-y-6 font-body">
            <p>
              At <strong>The Traditional Needle Work</strong>, we are committed to protecting your privacy. This policy outlines how we handle your personal information when you visit our website or place an order through our WhatsApp services.
            </p>

            <h2 className="text-2xl font-heading font-bold text-[#3A2A1F] pt-4">1. Information We Collect</h2>
            <p>
              When you browse our catalog or place an order, we may collect:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Contact details (Name, Phone number, Email)</li>
              <li>Delivery information (Address, Pincode, Landmark)</li>
              <li>Order history and size preferences</li>
              <li>Measurement details for custom stitching</li>
            </ul>

            <h2 className="text-2xl font-heading font-bold text-[#3A2A1F] pt-4">2. How We Use Your Data</h2>
            <p>
              Your information is used strictly to provide our services:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Processing and delivering your orders via WhatsApp</li>
              <li>Tailoring garments to your specific measurements</li>
              <li>Updating you on order status and shipping</li>
              <li>Internal record keeping to improve our heritage collections</li>
            </ul>

            <h2 className="text-2xl font-heading font-bold text-[#3A2A1F] pt-4">3. Security & Payments</h2>
            <p>
              We prioritize the security of your data. For payments, we use secure UPI methods and typically verify transactions through UTR numbers. We do not store sensitive bank or credit card details on our local servers.
            </p>

            <h2 className="text-2xl font-heading font-bold text-[#3A2A1F] pt-4">4. Sharing Your Information</h2>
            <p>
              We never sell your data to third parties. Information is only shared with our trusted delivery partners (courier services) to ensure your traditional wear reaches you safely.
            </p>

            <h2 className="text-2xl font-heading font-bold text-[#3A2A1F] pt-4">5. Contact Us</h2>
            <p>
              For any privacy-related queries, please reach out to our support team at <strong>{config.contact.email}</strong> or via WhatsApp.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
