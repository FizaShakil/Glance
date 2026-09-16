import React from 'react'
import Heading from '../Reusable-components/Heading'

const PrivacyPolicy = () => {
  return (
    <div>
      <div className="bg-ink py-16 text-center">
        <Heading h={'Privacy Policy'} />
      </div>
      <div className="flex flex-col headFont1 w-full max-w-[90%] md:max-w-[70%] mx-auto px-4 justify-between gap-20 pb-24 text-left">
        <div className="leading-relaxed space-y-6 text-stone text-sm sm:text-base">
          <h2 className="text-xl sm:text-2xl font-semibold font-display tracking-tight text-ink">Introduction</h2>
          <p>
            Glance is committed to protecting your data and ensuring transparency in how it is processed and used.
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold font-display tracking-tight text-ink">Personal or Company Data We Process</h2>
          <p>
            Glance may collect personal data because you use our services or provide it directly. We process the following information:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Full name</li>
            <li>Company name</li>
            <li>Email address</li>
            <li>Bank details</li>
            <li>Service-specific inquiry data</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-semibold font-display tracking-tight text-ink">Does Glance Process Special Personal Data?</h2>
          <p>
            No. Glance does not collect sensitive personal data such as health information, criminal records, or ethnic background.
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold font-display tracking-tight text-ink">Why We Need Data</h2>
          <p>We use your data to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Contact you for service-related matters</li>
            <li>Inform you of changes to our offerings</li>
            <li>Deliver our services effectively</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-semibold font-display tracking-tight text-ink">Which Rules Apply to Personal Data Processing?</h2>
          <p>
            Glance adheres to applicable data protection laws and may update this policy as necessary to remain compliant.
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold font-display tracking-tight text-ink">Data Retention</h2>
          <p>
            Glance retains data only as long as necessary for the purposes for which it was collected.
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold font-display tracking-tight text-ink">Data Sharing</h2>
          <p>
            Glance does not sell data. We only share data when necessary for our service or legal compliance, and ensure proper agreements are in place.
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold font-display tracking-tight text-ink">Cookies and Website Visits</h2>
          <p>
            Our site uses cookies for technical and functional purposes. You can disable cookies through your browser settings.
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold font-display tracking-tight text-ink">View, Change, or Delete Your Data</h2>
          <p>
            You may request access, correction, or deletion of your data by contacting us at:{" "}
            <a href="mailto:info@glance-tropical.com" className="underline text-iris hover:text-iris-deep transition-colors">info@glance-tropical.com</a>
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold font-display tracking-tight text-ink">Security</h2>
          <p>
            We implement appropriate security measures to protect your data. Employees and partners are bound by confidentiality obligations.
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold font-display tracking-tight text-ink">Your Privacy Rights</h2>
          <p>
            For privacy-related requests, contact us at:{" "}
            <a href="mailto:info@glance-tropical.com" className="underline text-iris hover:text-iris-deep transition-colors">info@glance-tropical.com</a>. We respond within five business days.
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold font-display tracking-tight text-ink">Questions</h2>
          <p>
            For any inquiries regarding this privacy policy, please reach out to{" "}
            <a href="mailto:admin@glance-tropical.com" className="underline text-iris hover:text-iris-deep transition-colors">admin@glance-tropical.com</a>.
          </p>

          <p className="text-sm">This privacy statement was last updated on 19 May 2025</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;