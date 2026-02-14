
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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
          <h1 className="text-4xl font-bold text-foreground mb-6">Privacy Policy</h1>
          <div className="prose prose-lg text-muted-foreground space-y-4">
            <p>
              This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data. This is a generic policy and does not reflect actual data handling practices.
            </p>

            <h2 className="text-2xl font-semibold text-foreground pt-4">Information Collection and Use</h2>
            <p>
              We may collect several different types of information for various purposes to provide and improve our Service to you. This may include, but is not limited to, usage data and personal information you voluntarily provide.
            </p>

            <h2 className="text-2xl font-semibold text-foreground pt-4">Use of Data</h2>
            <p>
              The Service uses the collected data for various purposes, including to provide and maintain the Service, to notify you about changes to our Service, and to provide customer care and support.
            </p>

            <h2 className="text-2xl font-semibold text-foreground pt-4">Security of Data</h2>
            <p>
              The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
            </p>

            <h2 className="text-2xl font-semibold text-foreground pt-4">Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
            </p>
            
            <h2 className="text-2xl font-semibold text-foreground pt-4">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us through the information provided on our website.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
