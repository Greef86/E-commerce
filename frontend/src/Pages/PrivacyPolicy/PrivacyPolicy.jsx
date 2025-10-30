//PrivacyPolicy
import React, { useEffect } from 'react'
import "./PrivacyPolicy.css"
import {VscDebugBreakpointLog} from "react-icons/vsc"

const PrivacyPolicy = () => {

  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: "smooth"})
  }, [])

  return (
    <div className='terms-conditions'>
      <h2>Privacy Policy</h2>
      <h3>Last Updated: Wednesday, 05 March 2025</h3>
      <p>GreefTechnologies is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this policy carefully to understand our views and practices regarding your personal data.</p>
      <h4>1. Information We Collect</h4>
      <p>We collect several types of information to improve our services and provide you with the best experience. This includes:</p>
      <h4>1.1 Personal Information</h4>
      <p>When you interact with our website, you may provide us with personal information, such as:</p>
      <p><VscDebugBreakpointLog/> Name</p>
      <p><VscDebugBreakpointLog/> Email address</p>
      <p><VscDebugBreakpointLog/> Phone number</p>
      <p><VscDebugBreakpointLog/> Mailing address</p>
      <p><VscDebugBreakpointLog/> Account credentials (username and password)</p>
      <h4>1.2 Non-Personal Information</h4>
      <p>We may collect non-personal information about your interactions with our website, including:</p>
      <p><VscDebugBreakpointLog/> IP address</p>
      <p><VscDebugBreakpointLog/> Browser type and version</p>
      <p><VscDebugBreakpointLog/> Device information</p>
      <p><VscDebugBreakpointLog/> Operating system</p>
      <p><VscDebugBreakpointLog/> Pages visited and time spent on the website</p>
      <p><VscDebugBreakpointLog/> Clickstream data</p>
      <h4>1.3 Cookies and Tracking Technologies</h4>
      <p>We use cookies, web beacons, and other tracking technologies to:</p>
      <p><VscDebugBreakpointLog/> Analyze website traffic and trends</p>
      <p><VscDebugBreakpointLog/> Remember user preferences</p>
      <p><VscDebugBreakpointLog/> Improve site functionality</p>
      <p><VscDebugBreakpointLog/> Deliver relevant advertisements</p>
      <p>You can manage cookie preferences through your browser settings.</p>
      <h4>2. How We Use Your Information</h4>
      <p>We use the information we collect for various purposes, including:</p>
      <p><VscDebugBreakpointLog/> To provide and manage our services</p>
      <p><VscDebugBreakpointLog/> To personalize user experiences</p>
      <p><VscDebugBreakpointLog/> To communicate with you, including responding to inquiries</p>
      <p><VscDebugBreakpointLog/> To send promotional content and updates (with your consent)</p>
      <p><VscDebugBreakpointLog/> To improve website functionality and security</p>
      <p><VscDebugBreakpointLog/> To comply with legal obligations</p>
      <h4>3. How We Share Your Information</h4>
      <p>We do not sell, trade, or rent your personal data. However, we may share your information with:</p>
      <h4>3.1 Service Providers</h4>
      <p>We work with third-party vendors to help operate our website and provide services, such as hosting providers, and analytics platforms.</p>
      <h4>3.2 Legal Compliance</h4>
      <p>We may disclose your information if required by law, government request, or to protect our rights.</p>
      <h4>3.3 Business Transfers</h4>
      <p>If our company is involved in a merger, acquisition, or asset sale, your information may be transferred to new ownership.</p>
      <h4>4. Data Security</h4>
      <p>We implement appropriate security measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
      <h4>5. Your Rights and Choices</h4>
      <p>Depending on your location, you may have the following rights regarding your data:</p>
      <p><VscDebugBreakpointLog/> Access – Request access to your personal data.</p>
      <p><VscDebugBreakpointLog/> Correction – Request corrections to inaccurate or incomplete data.</p>
      <p><VscDebugBreakpointLog/> Deletion – Request deletion of your personal information.</p>
      <p><VscDebugBreakpointLog/> Objection – Object to data processing for marketing purposes.</p>
      <p><VscDebugBreakpointLog/> Data Portability – Request a copy of your data in a structured format.</p>
      <p>To exercise these rights, contact us at greeftechnologies1@gmail.com.</p>
      <h4>6. Third-Party Links and Services</h4>
      <p>Our website may contain links to third-party websites or services. We are not responsible for their privacy practices. We encourage you to read their privacy policies before providing any personal information.</p>
      <h4>7. Children's Privacy</h4>
      <p>Our website is not intended for children under 12 years old. We do not knowingly collect personal information from minors. If you believe we have collected data from a child, please contact us immediately.</p>
      <h4>8. International Data Transfers</h4>
      <p>If you are accessing our website from outside South Africa, your data may be transferred to and stored in other countries with different privacy laws. By using our services, you consent to such transfers.</p>
      <h4>9. Updates to This Privacy Policy</h4>
      <p>We may update this Privacy Policy from time to time. Changes will be posted on this page, and the updated policy will take effect immediately.</p>
      <h4>10. Contact Us</h4>
      <p>If you have any questions about this Privacy Policy, please contact us at:</p>
      <address><strong>Phone: </strong>+27719296756</address>
      <address><strong>Email: </strong>greeftechnologies1@gmail.com</address>
      <br />
    </div>
  )
}

export default PrivacyPolicy