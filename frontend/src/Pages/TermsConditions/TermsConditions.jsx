// TermsConditions
import React, { useEffect } from 'react'
import "./TermsConditions.css"
import {VscDebugBreakpointLog} from "react-icons/vsc"

const TermsConditions = () => {

  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: "smooth"})
  }, [])

  return (
    <div className='terms-conditions'>
      <h2>Terms and Conditions</h2>
      <h3>Last Updated: Wednesday, 05 March 2025</h3>
      <p>Welcome to our Website. These Terms and Conditions govern your access and use of the Website. By using our Website, you agree to abide by these Terms. If you do not agree with any part of these Terms, you must stop using the Website immediately.</p>
      <h4>1. Acceptance of Terms</h4>
      <p>By accessing or using our Website, you confirm that you have read, understood, and agree to be bound by these Terms, as well as our Privacy Policy. If you do not agree, please discontinue use immediately.</p>
      <h4>2. Changes to Terms</h4>
      <p>We reserve the right to update, modify, or replace these Terms at any time without prior notice. It is your responsibility to review these Terms periodically for changes. Continued use of the Website after modifications constitutes acceptance of the revised Terms.</p>
      <h4>3. Use of the Website</h4>
      <h4>3.1 Eligibility</h4>
      <p>There is no age restriction set for using this Website, any body of any age is allowed to use this Website.</p>
      <h4>3.2 Permitted Use</h4>
      <p>You may use the Website only for lawful purposes and in accordance with these Terms. You agree not to:</p>
      <p><VscDebugBreakpointLog/> Violate any applicable laws or regulations.</p>
      <p><VscDebugBreakpointLog/> Engage in fraudulent, misleading, or deceptive behavior.</p>
      <p><VscDebugBreakpointLog/> Attempt to interfere with the Website’s functionality or security.</p>
      <p><VscDebugBreakpointLog/> Use the Website to transmit spam, viruses, or harmful code.</p>
      <p><VscDebugBreakpointLog/> Impersonate another person or entity.</p>
      <h4>4. Content Ownership and Usage</h4>
      <h4>4.1 Intellectual Property</h4>
      <p>All content on this Website, including text, graphics, logos, images, and software, is the property of GreefTechnologies or its licensors and is protected by copyright, trademark, and other intellectual property laws.</p>
      <h4>4.2 License to Use Content</h4>
      <p>We grant you a limited, non-exclusive, non-transferable license to use the Website for personal, non-commercial purposes. You may not:</p>
      <p><VscDebugBreakpointLog/> Copy, modify, or distribute Website content without permission.</p>
      <p><VscDebugBreakpointLog/> Use Website content for commercial purposes without authorization.</p>
      <h4>4.3 User-Generated Content</h4>
      <p>If you submit or post content (e.g., comments, reviews, or forum posts), you grant us a non-exclusive, worldwide, royalty-free license to use, display, modify, and distribute your content.</p>
      <h4>5. Third-Party Links and Services</h4>
      <p>The Website may contain links to third-party websites or services. We do not control or endorse these third-party services and are not responsible for their content or practices. Use them at your own risk.</p>
      <h4>6. Disclaimers and Limitation of Liability</h4>
      <h4>6.1 No Warranty</h4>
      <p>The Website is provided “as is” and “as available” without warranties of any kind. We do not guarantee:</p>
      <p><VscDebugBreakpointLog/> That the Website will be error-free, uninterrupted, or secure.</p>
      <p><VscDebugBreakpointLog/> That content will always be accurate, complete, or up to date.</p>
      <p><VscDebugBreakpointLog/> That any defects will be corrected.</p>
      <h4>6.2 Limitation of Liability</h4>
      <p>To the fullest extent permitted by law, GreefTechnologies shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from:</p>
      <p><VscDebugBreakpointLog/> Your use or inability to use the Website.</p>
      <p><VscDebugBreakpointLog/> Unauthorized access to or use of our servers.</p>
      <p><VscDebugBreakpointLog/> Any bugs, viruses, or harmful code transmitted via the Website.</p>
      <h4>7. Indemnification</h4>
      <p>You agree to indemnify, defend, and hold harmless Greeftechnologies, its affiliates, officers, directors, employees, and agents from any claims, damages, liabilities, costs, or expenses arising from:</p>
      <p><VscDebugBreakpointLog/> Your use of the Website.</p>
      <p><VscDebugBreakpointLog/> Your violation of these Terms.</p>
      <p><VscDebugBreakpointLog/> Your infringement of any third-party rights.</p>
      <h4>8. Termination of Access</h4>
      <p>We reserve the right to suspend or terminate your access to the Website at any time, with or without cause, and without prior notice.</p>
      <h4>9. Governing Law and Dispute Resolution</h4>
      <h4>9.1 Governing Law</h4>
      <p>These Terms are governed by and interpreted in accordance with the laws of Your Country/State, without regard to conflict of law principles.</p>
      <h4>9.2 Dispute Resolution</h4>
      <p>Any disputes arising from these Terms shall first be attempted to be resolved amicably. If a resolution is not reached, disputes shall be settled through arbitration or in a court of competent jurisdiction in Your Jurisdiction.</p>
      <h4>10. Miscellaneous Provisions</h4>
      <h4>10.1 Severability</h4>
      <p>If any provision of these Terms is found to be unlawful, void, or unenforceable, the remaining provisions shall continue in full force and effect.</p>
      <h4>10.2 No Waiver</h4>
      <p>Failure to enforce any right or provision under these Terms does not constitute a waiver of such rights.</p>
      <h4>11. Contact Information</h4>
      <p>If you have any questions about these Terms, please contact us at:</p>
      <address><strong>Phone: </strong>+27719296756</address>
      <address><strong>Email: </strong>greeftechnologies1@gmail.com</address>
      <br />
    </div>
  )
}

export default TermsConditions