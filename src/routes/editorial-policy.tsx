import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/editorial-policy")({
  component: EditorialPolicyPage,
});

function EditorialPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 prose prose-lg dark:prose-invert">
      <h1>Editorial Policy</h1>
      <p><strong>Last updated:</strong> June 28, 2026</p>
      
      <h2>Our Mission</h2>
      <p>SmartPDFTools provides accurate, helpful, and unbiased information about PDF tools and document management.</p>
      
      <h2>Content Standards</h2>
      <ul>
        <li><strong>Accuracy:</strong> We verify information before publishing.</li>
        <li><strong>Independence:</strong> Our content is not influenced by advertisers.</li>
        <li><strong>Transparency:</strong> We disclose any affiliate relationships.</li>
        <li><strong>Updates:</strong> We regularly review and update content.</li>
      </ul>
      
      <h2>Product Reviews</h2>
      <p>Our reviews are based on hands-on testing and real user feedback. We aim to be fair and objective.</p>
      
      <h2>Corrections</h2>
      <p>If you find an error in our content, please contact us so we can correct it.</p>
      
      <h2>Contact</h2>
      <p>Questions? Contact us at shekokamal7775@gmail.com</p>
    </div>
  );
}
