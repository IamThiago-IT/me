"use client";

import { MetadataSetter } from "@/components/MetadataSetter";
import Link from "next/link";
import { Mail } from "lucide-react";

export default function PrivacyPolicy() {
  const lastUpdated = "April 20, 2026";
  const email = "thiagodossantos315@gmail.com";

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto px-4">
      <MetadataSetter title="Privacy Policy" />
      
      {/* Header */}
      <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: {lastUpdated}</p>

      {/* Summary Box */}
      <div className="border-l-4 border-primary bg-primary/5 p-4 rounded-md mb-8">
        <p className="text-sm text-muted-foreground">
          <strong>Summary:</strong> We collect only the minimum necessary to operate the platform. 
          We respect your privacy and do not sell your data to third parties. You can request account 
          deletion at any time.
        </p>
      </div>

      {/* Content */}
      <div className="space-y-8 text-sm">
        {/* Section 1 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">1. Who We Are</h2>
          <p className="text-muted-foreground leading-relaxed">
            This privacy policy describes how we collect, use, and protect your personal information 
            when using this platform. We are committed to protecting your privacy and ensuring transparency 
            in our data practices.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">2. Data We Collect</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Account data:</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Email and name (provided during registration)</li>
                <li>Subscribed plan and billing data (processed securely)</li>
                <li>Account creation date</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Usage data:</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Access logs (IP, date/time) for security purposes</li>
                <li>Platform usage statistics</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Data we do NOT collect:</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>We do not use third-party tracking cookies</li>
                <li>We do not store unnecessary personal information</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">3. How We Use Your Data</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">We use your data exclusively to:</p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Manage your account and authentication</li>
            <li>Process payments and manage subscriptions</li>
            <li>Prevent abuse and ensure platform security</li>
            <li>Communicate relevant service updates</li>
            <li>Improve our services based on usage patterns</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">4. Data Sharing</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We do not sell, rent, or share your personal data with third parties, except:
          </p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Legal obligation: when required by law, court order, or competent authority</li>
            <li>Rights protection: to protect the security, rights, or property of this platform and its users</li>
            <li>Service providers: trusted partners who help us operate the platform under strict confidentiality agreements</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">We implement industry-standard security measures:</p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>HTTPS connections with TLS for all communications</li>
            <li>Passwords stored with secure hashing (never in plain text)</li>
            <li>Authentication tokens in secure, HttpOnly cookies</li>
            <li>Rate limiting for brute-force attack prevention</li>
            <li>Regular security audits and updates</li>
          </ul>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">6. Data Retention</h2>
          <p className="text-muted-foreground leading-relaxed">
            Your account data is kept as long as your account is active. Upon account deletion request, 
            all personal data will be removed within 30 days. Access logs are kept for 90 days for 
            security purposes.
          </p>
        </section>

        {/* Section 7 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">7. Your Rights</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">You have the right to:</p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Access the personal data we hold about you</li>
            <li>Correct incomplete or inaccurate data</li>
            <li>Request deletion of your personal data</li>
            <li>Revoke consent for data processing</li>
            <li>Request data portability</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-4">
            To exercise any of these rights, please contact us at the email below.
          </p>
        </section>

        {/* Section 8 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">8. Third-Party Services</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            This platform may use third-party services for hosting, payments, and analytics. 
            Each service has its own privacy policy. We recommend reviewing their policies for complete information.
          </p>
        </section>

        {/* Section 9 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">9. User Responsibility</h2>
          <p className="text-muted-foreground leading-relaxed">
            Users are solely responsible for complying with applicable legislation and respecting 
            third-party rights when using this platform. We are not liable for misuse of information 
            obtained through our services.
          </p>
        </section>

        {/* Section 10 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">10. Changes to This Policy</h2>
          <p className="text-muted-foreground leading-relaxed">
            We may update this policy periodically. Significant changes will be communicated via email 
            or platform notification. The last update date is indicated at the top of this page.
          </p>
        </section>

        {/* Section 11 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">11. Contact</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            For questions, requests, or concerns about privacy:
          </p>
          <Link
            href={`mailto:${email}`}
            className="inline-flex items-center gap-2 px-4 py-2 border border-primary/30 rounded-lg hover:bg-primary/5 transition-colors text-primary hover:border-primary/60"
          >
            <Mail className="w-4 h-4" />
            {email}
          </Link>
        </section>

        {/* Footer */}
        <section className="border-t pt-8 mt-8">
          <p className="text-xs text-muted-foreground">
            © 2026. All rights reserved.
          </p>
        </section>
      </div>
    </div>
  );
}
