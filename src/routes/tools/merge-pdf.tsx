import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tools/merge-pdf")({
  component: MergePdfPage,
});

function MergePdfPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Merge PDF Files</h1>
      <p className="text-muted-foreground mb-6">
        Combine multiple PDF files into one document effortlessly.
      </p>

      <div className="p-6 border rounded-xl bg-card">
        <p>أداة دمج PDF (ضع الكود هنا)</p>
      </div>

      <div className="mt-12 p-6 bg-muted rounded-2xl">
        <h3 className="text-xl font-bold mb-4">📚 Learn More About PDF Tools</h3>
        <ul className="space-y-2">
          <li>
            <a href="/blog/best-pdf-tools-online-2026" className="text-blue-600 hover:underline">
              The 10 Best PDF Tools Online in 2026
            </a>
          </li>
          <li>
            <a href="/blog/how-to-compress-pdf-files" className="text-blue-600 hover:underline">
              How to Compress PDF Files Without Losing Quality
            </a>
          </li>
          <li>
            <a href="/blog/how-to-convert-pdf-to-word" className="text-blue-600 hover:underline">
              How to Convert PDF to Word (Without Losing Formatting)
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
