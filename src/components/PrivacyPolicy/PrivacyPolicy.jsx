import React from 'react'
import Heading from '../Reusable-components/Heading'

const PrivacyPolicy = () => {
  return (
    <div>
      <Heading h={"Privacy Policy"} />
      <div className="flex flex-col headFont1 w-full max-w-[90%] md:max-w-[70%] mx-auto px-4 justify-between gap-20 pb-[180px] text-left break-words overflow-wrap break-word">
        <div className="leading-relaxed space-y-6 text-[#22283D] text-sm sm:text-base font-archivo">
          <h2 className="text-xl sm:text-2xl font-bold">Introduction</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Glance is committed to protecting your data and ensuring transparency in how it is processed and used.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold">Personal or Company Data We Process</h2>
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

          <h2 className="text-xl sm:text-2xl font-bold">Does Glance Process Special Personal Data?</h2>
          <p>
            No. Glance does not collect sensitive personal data such as health information, criminal records, or ethnic background.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold">Why We Need Data</h2>
          <p>We use your data to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Contact you for service-related matters</li>
            <li>Inform you of changes to our offerings</li>
            <li>Deliver our services effectively</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-bold">Which Rules Apply to Personal Data Processing?</h2>
          <p>
            Glance adheres to applicable data protection laws and may update this policy as necessary to remain compliant.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold">Data Retention</h2>
          <p>
            Glance retains data only as long as necessary for the purposes for which it was collected.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold">Data Sharing</h2>
          <p>
            Glance does not sell data. We only share data when necessary for our service or legal compliance, and ensure proper agreements are in place.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold">Cookies and Website Visits</h2>
          <p>
            Our site uses cookies for technical and functional purposes. You can disable cookies through your browser settings.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold">View, Change, or Delete Your Data</h2>
          <p>
            You may request access, correction, or deletion of your data by contacting us at:{" "}
            <a href="mailto:info@glance-tropical.com" className="underline">info@glance-tropical.com</a>
          </p>

          <h2 className="text-xl sm:text-2xl font-bold">Security</h2>
          <p>
            We implement appropriate security measures to protect your data. Employees and partners are bound by confidentiality obligations.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold">Your Privacy Rights</h2>
          <p>
            For privacy-related requests, contact us at:{" "}
            <a href="mailto:info@glance-tropical.com" className="underline">info@glance-tropical.com</a>. We respond within five business days.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold">Questions</h2>
          <p>
            For any inquiries regarding this privacy policy, please reach out to{" "}
            <a href="mailto:admin@glance-tropical.com" className="underline">admin@glance-tropical.com</a>.
          </p>

          <p>This privacy statement was last updated on 19 May 2025</p>
          <p>Inspiration taken from: https://codesandbox.io/p/sandbox/privacy-policy-example-cknw4q</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
