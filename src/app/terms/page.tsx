
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
          <h1 className="text-4xl font-bold text-foreground mb-6">Terms of Service</h1>
          <div className="prose prose-lg text-muted-foreground space-y-4">
            <p>
              Please read these Terms of Service carefully before using our website. Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
            </p>

            <h2 className="text-2xl font-semibold text-foreground pt-4">Content</h2>
            <p>
              Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, or other material. You are responsible for the content that you post on or through the Service, including its legality, reliability, and appropriateness.
            </p>

            <h2 className="text-2xl font-semibold text-foreground pt-4">Intellectual Property</h2>
            <p>
              The Service and its original content (excluding Content provided by users), features, and functionality are and will remain the exclusive property of the restaurant and its licensors.
            </p>

            <h2 className="text-2xl font-semibold text-foreground pt-4">Links To Other Web Sites</h2>
            <p>
              Our Service may contain links to third-party web sites or services that are not owned or controlled by us. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party web sites or services.
            </p>

            <h2 className="text-2xl font-semibold text-foreground pt-4">Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of the jurisdiction, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
            </p>

            <h2 className="text-2xl font-semibold text-foreground pt-4">Changes</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
