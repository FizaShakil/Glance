import React from 'react'
import Heading from '../Reusable-components/Heading'

const PrivacyPolicy = () => {
  return (
    <div>
      <Heading h={"Privacy Policy"}/>
      <div className="flex headFont1 flex-col w-[70%] ml-28 items-center justify-between gap-20 pb-[180px] text-left">
      <div className="leading-none space-y-6">
    <h2 className="text-2xl font-bold text-[#22283D] font-archivo">Introduction</h2>
    <p className="text-base font-archivo text-[#22283D]">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Glance is committed to protecting your data and ensuring transparency in how it is processed and used.
    </p>

    <h2 className="text-2xl font-bold text-[#22283D] font-archivo">Personal or Company Data We Process</h2>
    <p className="text-base font-archivo text-[#22283D]">
      Glance may collect personal data because you use our services or provide it directly. We process the following information:
    </p>
    <ul className="list-disc pl-6 text-base font-archivo text-[#22283D] space-y-1">
      <li>Full name</li>
      <li>Company name</li>
      <li>Email address</li>
      <li>Bank details</li>
      <li>Service-specific inquiry data</li>
    </ul>

    <h2 className="text-2xl font-bold text-[#22283D] font-archivo">Does Glance Process Special Personal Data?</h2>
    <p className="text-base font-archivo text-[#22283D]">
      No. Glance does not collect sensitive personal data such as health information, criminal records, or ethnic background.
    </p>

    <h2 className="text-2xl font-bold text-[#22283D] font-archivo">Why We Need Data</h2>
    <p className="text-base font-archivo text-[#22283D]">
      We use your data to:
    </p>
    <ul className="list-disc pl-6 text-base font-archivo text-[#22283D] space-y-1">
      <li>Contact you for service-related matters</li>
      <li>Inform you of changes to our offerings</li>
      <li>Deliver our services effectively</li>
      <li>Comply with legal obligations</li>
    </ul>

    <h2 className="text-2xl font-bold text-[#22283D] font-archivo">Which Rules Apply to Personal Data Processing?</h2>
    <p className="text-base font-archivo text-[#22283D]">
      Glance adheres to applicable data protection laws and may update this policy as necessary to remain compliant.
    </p>

    <h2 className="text-2xl font-bold text-[#22283D] font-archivo">Data Retention</h2>
    <p className="text-base font-archivo text-[#22283D]">
      Glance retains data only as long as necessary for the purposes for which it was collected.
    </p>

    <h2 className="text-2xl font-bold text-[#22283D] font-archivo">Data Sharing</h2>
    <p className="text-base font-archivo text-[#22283D]">
      Glance does not sell data. We only share data when necessary for our service or legal compliance, and ensure proper agreements are in place.
    </p>

    <h2 className="text-2xl font-bold text-[#22283D] font-archivo">Cookies and Website Visits</h2>
    <p className="text-base font-archivo text-[#22283D]">
      Our site uses cookies for technical and functional purposes. You can disable cookies through your browser settings.
    </p>

    <h2 className="text-2xl font-bold text-[#22283D] font-archivo">View, Change, or Delete Your Data</h2>
    <p className="text-base font-archivo text-[#22283D]">
      You may request access, correction, or deletion of your data by contacting us at:{" "}
      <a href="mailto:info@glance-tropical.com" className="underline">info@glance-tropical.com</a>
    </p>

    <h2 className="text-2xl font-bold text-[#22283D] font-archivo">Security</h2>
    <p className="text-base font-archivo text-[#22283D]">
      We implement appropriate security measures to protect your data. Employees and partners are bound by confidentiality obligations.
    </p>

    <h2 className="text-2xl font-bold text-[#22283D] font-archivo">Your Privacy Rights</h2>
    <p className="text-base font-archivo text-[#22283D]">
      For privacy-related requests, contact us at:{" "}
      <a href="mailto:info@glance-tropical.com" className="underline">info@glance-tropical.com</a>. We respond within five business days.
    </p>

    <h2 className="text-2xl font-bold text-[#22283D] font-archivo">Questions</h2>
    <p className="text-base font-archivo text-[#22283D]">
      For any inquiries regarding this privacy policy, please reach out to{" "}
      <a href="mailto:admin@glance-tropical.com" className="underline">admin@glance-tropical.com</a>.
    </p>

    <p className="text-base font-archivo text-[#22283D]">
      This privacy statement was last updated on 19 May 2023.
    </p>
    <p className="text-base font-archivo text-[#22283D]">
      Inspiration taken from: https://codesandbox.io/p/sandbox/privacy-policy-example-cknw4q
    </p>
  </div>
</div>

    </div>
  )
}

export default PrivacyPolicy