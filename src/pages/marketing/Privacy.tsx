import React from 'react';
import { SEOHead } from '../../components/ui/SEOHead';
import { Calendar, Shield, Eye, Lock } from 'lucide-react';

export function Privacy() {
  return (
    <>
      <SEOHead 
        title="Privacy Policy"
        description="Lovable Privacy Policy - How we collect, use, and protect your data"
        canonical="https://lovable.dev/legal/privacy"
      />
      
      <div className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <div className="flex items-center justify-center text-gray-600">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Last updated: January 15, 2024</span>
            </div>
          </div>

          {/* Privacy Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
              <Shield className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Data Protection</h3>
              <p className="text-sm text-gray-600">We use industry-standard encryption to protect your data</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <Eye className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Transparency</h3>
              <p className="text-sm text-gray-600">Clear information about what data we collect and why</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
              <Lock className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Your Control</h3>
              <p className="text-sm text-gray-600">You control your data and can delete it anytime</p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <p className="text-blue-800 mb-0">
                <strong>Your privacy matters to us.</strong> This policy explains how Lovable collects, 
                uses, and protects your personal information when you use our AI-powered development platform.
              </p>
            </div>

            <h2>1. Information We Collect</h2>
            
            <h3>Account Information</h3>
            <p>When you create an account, we collect:</p>
            <ul>
              <li>Name and email address</li>
              <li>Username and password (encrypted)</li>
              <li>Profile information you choose to provide</li>
              <li>Billing information for paid subscriptions</li>
            </ul>

            <h3>Usage Data</h3>
            <p>To improve our service, we collect:</p>
            <ul>
              <li>How you interact with our platform</li>
              <li>Features you use and frequency of use</li>
              <li>Error logs and performance data</li>
              <li>Device and browser information</li>
            </ul>

            <h3>Content Data</h3>
            <p>We process your content to provide our AI services:</p>
            <ul>
              <li>Code you write or generate</li>
              <li>Prompts and conversations with our AI</li>
              <li>Project files and configurations</li>
              <li>Comments and collaboration data</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            
            <h3>Service Provision</h3>
            <ul>
              <li>Provide and maintain our AI development platform</li>
              <li>Process your requests and generate code</li>
              <li>Enable collaboration features</li>
              <li>Provide customer support</li>
            </ul>

            <h3>Service Improvement</h3>
            <ul>
              <li>Analyze usage patterns to improve our AI models</li>
              <li>Develop new features and capabilities</li>
              <li>Fix bugs and optimize performance</li>
              <li>Conduct research and development</li>
            </ul>

            <h3>Communication</h3>
            <ul>
              <li>Send important service updates</li>
              <li>Respond to your inquiries</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Notify you of security issues</li>
            </ul>

            <h2>3. AI and Machine Learning</h2>
            <p>
              Our AI systems learn from aggregated, anonymized data to improve code generation and suggestions. 
              We do not use your private code to train models that serve other users without your explicit consent.
            </p>
            <p>Key principles:</p>
            <ul>
              <li>Your private projects remain private</li>
              <li>We use differential privacy techniques</li>
              <li>You can opt out of data usage for AI training</li>
              <li>We regularly audit our AI systems for bias and fairness</li>
            </ul>

            <h2>4. Data Sharing and Disclosure</h2>
            <p>We do not sell your personal information. We may share data in these limited circumstances:</p>
            
            <h3>Service Providers</h3>
            <p>We work with trusted third parties who help us operate our service:</p>
            <ul>
              <li>Cloud hosting providers (AWS, Google Cloud)</li>
              <li>Payment processors (Stripe)</li>
              <li>Analytics services (with anonymized data)</li>
              <li>Customer support tools</li>
            </ul>

            <h3>Legal Requirements</h3>
            <p>We may disclose information when required by law or to:</p>
            <ul>
              <li>Comply with legal processes</li>
              <li>Protect our rights and property</li>
              <li>Ensure user safety</li>
              <li>Investigate fraud or security issues</li>
            </ul>

            <h2>5. Data Security</h2>
            <p>We implement comprehensive security measures:</p>
            <ul>
              <li>End-to-end encryption for sensitive data</li>
              <li>Regular security audits and penetration testing</li>
              <li>Access controls and employee training</li>
              <li>Incident response procedures</li>
              <li>SOC 2 Type II compliance</li>
            </ul>

            <h2>6. Data Retention</h2>
            <p>We retain your data only as long as necessary:</p>
            <ul>
              <li>Account data: Until you delete your account</li>
              <li>Project data: Until you delete projects</li>
              <li>Usage logs: 2 years for analytics</li>
              <li>Billing records: 7 years for legal compliance</li>
            </ul>

            <h2>7. Your Rights and Choices</h2>
            <p>You have control over your data:</p>
            
            <h3>Access and Portability</h3>
            <ul>
              <li>View all data we have about you</li>
              <li>Export your projects and data</li>
              <li>Request a copy of your information</li>
            </ul>

            <h3>Correction and Deletion</h3>
            <ul>
              <li>Update your account information</li>
              <li>Delete specific projects or data</li>
              <li>Request complete account deletion</li>
            </ul>

            <h3>Consent Management</h3>
            <ul>
              <li>Opt out of marketing communications</li>
              <li>Control data usage for AI training</li>
              <li>Manage cookie preferences</li>
            </ul>

            <h2>8. International Data Transfers</h2>
            <p>
              We operate globally and may transfer data across borders. We ensure adequate protection through:
            </p>
            <ul>
              <li>Standard Contractual Clauses</li>
              <li>Adequacy decisions</li>
              <li>Certification schemes</li>
              <li>Data localization where required</li>
            </ul>

            <h2>9. Children's Privacy</h2>
            <p>
              Our service is not intended for children under 13. We do not knowingly collect personal 
              information from children. If we become aware of such collection, we will delete the information immediately.
            </p>

            <h2>10. Changes to This Policy</h2>
            <p>
              We may update this privacy policy to reflect changes in our practices or legal requirements. 
              We will notify you of material changes via email or through our service.
            </p>

            <h2>11. Contact Us</h2>
            <p>
              For privacy-related questions or requests, contact our Data Protection Officer:
            </p>
            <ul>
              <li>Email: privacy@lovable.dev</li>
              <li>Address: [Company Address]</li>
              <li>Phone: [Phone Number]</li>
            </ul>
          </div>

          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Questions?</h3>
            <p className="text-gray-600 mb-4">
              Our privacy team is here to help with any questions about how we handle your data.
            </p>
            <a
              href="mailto:privacy@lovable.dev"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Contact Privacy Team
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
