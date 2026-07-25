import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, ArrowRight, Shield, Zap, Star, Clock } from "lucide-react";
import { getTool, tools } from "@/lib/tools";
import { ToolProcessor } from "@/components/ToolProcessor";
import { useI18n } from "@/lib/i18n";
import { blogPosts } from "@/lib/blog";

export const Route = createFileRoute("/tools/$slug")({
  head: ({ params }) => {
    const tool = getTool(params.slug);
    if (!tool) return { meta: [{ title: "Tool Not Found — SmartPDFMasters" }] };
    return {
      meta: [
        { title: `${tool.title.en} — Free Online PDF Tool | SmartPDFMasters` },
        { name: "description", content: tool.seoDesc.en },
        { name: "keywords", content: `${tool.title.en.toLowerCase()}, free ${tool.title.en.toLowerCase()}, ${tool.title.en.toLowerCase()} online, ${tool.title.en.toLowerCase()} no signup, free PDF tools` },
        { property: "og:title", content: `${tool.title.en} — Free & Secure | SmartPDFMasters` },
        { property: "og:description", content: tool.seoDesc.en },
        { property: "og:url", content: `https://www.smartpdfmasters.com/tools/${tool.slug}` },
        { name: "robots", content: "index, follow" },
      ],
      links: [
        { rel: "canonical", href: `https://www.smartpdfmasters.com/tools/${tool.slug}` },
      ],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: `${tool.title.en} — SmartPDFMasters`,
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Web",
          url: `https://www.smartpdfmasters.com/tools/${tool.slug}`,
          description: tool.seoDesc.en,
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: {
            "@type": "Organization",
            name: "SmartPDFMasters",
            url: "https://www.smartpdfmasters.com",
          },
        }),
      }],
    };
  },
  component: ToolPage,
});

// Tool-specific rich content
const toolContent: Record<string, {
  howTo: { step: string; desc: string }[];
  benefits: string[];
  useCases: { title: string; desc: string }[];
  faq: { q: string; a: string }[];
  extLinks: { label: string; href: string }[];
}> = {
  "merge-pdf": {
    howTo: [
      { step: "Upload your PDF files", desc: "Click the upload area or drag and drop multiple PDF files. You can upload as many files as you need to combine." },
      { step: "Arrange the order", desc: "Your files appear in the list below. Remove any file you do not need by clicking the X button." },
      { step: "Click Merge & Download", desc: "Click the button to combine all your PDFs into one document. The merged file downloads automatically to your device." },
    ],
    benefits: [
      "Combine unlimited PDF files in one operation",
      "No file size limits — works with large PDFs",
      "Pages appear in exactly the order you upload",
      "Original quality preserved — no compression applied during merge",
      "Works on iPhone, Android, Windows and Mac",
      "No watermark added to merged PDF",
    ],
    useCases: [
      { title: "Job Applications", desc: "Combine your cover letter, resume, references, and certificates into a single professional PDF for submission." },
      { title: "Student Submissions", desc: "Merge lecture slides from multiple weeks into one revision document. Combine assignment sections with appendices." },
      { title: "Business Documents", desc: "Join multi-page invoices, contracts with attachments, and report sections into one organised file." },
      { title: "Scanned Documents", desc: "Combine multiple scanned pages — photographed with your phone or scanned on a flatbed — into one complete PDF." },
      { title: "Legal Packages", desc: "Assemble supporting documents, signed forms, and identification into one submission package." },
      { title: "Research & Reports", desc: "Merge chapters, bibliography, figures, and appendices into one complete research document." },
    ],
    faq: [
      { q: "How many PDF files can I merge at once?", a: "You can merge as many PDF files as you need in a single session. Upload all your files, arrange them in order, and download the combined result." },
      { q: "Does merging PDFs reduce quality?", a: "No. Merging combines the pages from each file exactly as they are without any quality reduction. Text, images, and formatting are preserved precisely." },
      { q: "Can I merge PDF files on iPhone?", a: "Yes. Our Merge PDF tool works on iPhone and iPad directly in Safari without downloading any app. The process is identical to the desktop version." },
      { q: "What is the maximum file size for merging?", a: "There is no fixed file size limit. Very large files may take slightly longer to process depending on your device." },
      { q: "Can I reorder pages before merging?", a: "Currently the tool merges files in the order you upload them. Upload your files in the sequence you want them to appear in the final document." },
    ],
    extLinks: [
      { label: "PDF specification — Adobe", href: "https://www.adobe.com/devnet/pdf/pdf_reference.html" },
      { label: "PDF format overview — Mozilla MDN", href: "https://developer.mozilla.org/en-US/docs/Glossary/PDF" },
    ],
  },
  "compress-pdf": {
    howTo: [
      { step: "Upload your large PDF", desc: "Click the upload area or drag and drop your PDF file. Works with any PDF regardless of how it was created." },
      { step: "Choose compression level", desc: "Select Recommended for the best balance of size and quality, or Maximum for the smallest possible file size." },
      { step: "Download compressed PDF", desc: "Click Compress & Download. Your compressed PDF downloads automatically, ready to email or upload." },
    ],
    benefits: [
      "Reduces PDF size by 50 to 80 percent for most documents",
      "Text remains perfectly sharp at all compression levels",
      "Three compression levels to suit different needs",
      "Works with scanned PDFs, presentations, and text documents",
      "No watermark added to compressed output",
      "Files processed in browser — never uploaded to server",
    ],
    useCases: [
      { title: "Email Attachments", desc: "Reduce a PDF below Gmail's 25MB or Outlook's 20MB attachment limit so it can be sent directly." },
      { title: "University Portals", desc: "Compress assignments and thesis chapters to meet the 1MB, 2MB, or 5MB upload limits imposed by academic submission systems." },
      { title: "WhatsApp Sharing", desc: "Reduce document size for faster sharing through messaging apps without visible quality reduction." },
      { title: "Cloud Storage", desc: "Compress large PDF archives to use less storage space in Google Drive, Dropbox, or OneDrive." },
      { title: "Website Upload", desc: "Reduce PDF size for faster loading when embedding documents in websites or content management systems." },
      { title: "Scanned Documents", desc: "Scanned PDFs are often very large because each page is stored as a high-resolution image. Compression dramatically reduces their size." },
    ],
    faq: [
      { q: "Will compressing a PDF reduce text quality?", a: "No. Text in PDF files is stored as mathematical vectors, not pixels. It remains perfectly sharp at all compression levels. Only images may show minor quality reduction at maximum compression." },
      { q: "How much can I reduce a PDF file size?", a: "For text-heavy documents, compression typically achieves 60 to 80 percent size reduction. For image-heavy PDFs such as presentations, reduction is typically 30 to 60 percent at recommended compression." },
      { q: "How do I compress a PDF to under 1MB?", a: "Use the maximum compression setting. For most text-heavy documents this achieves files well under 1MB. For image-heavy files, also consider removing non-essential pages before compressing." },
      { q: "Can I compress a PDF on my phone?", a: "Yes. Open our Compress PDF tool in Safari on iPhone or Chrome on Android. The tool works identically on all devices without any app download." },
      { q: "Does compression affect PDF security or passwords?", a: "Compression does not remove or affect any password protection applied to a PDF. You need to enter the password before compressing a password-protected file." },
    ],
    extLinks: [
      { label: "How PDF compression works — PDF Association", href: "https://www.pdfa.org/pdf-explained/" },
      { label: "File size limits for email services — Google Support", href: "https://support.google.com/mail/answer/6584" },
    ],
  },
  "rotate-pdf": {
    howTo: [
      { step: "Upload your PDF", desc: "Click the upload area or drag and drop the PDF with incorrectly oriented pages." },
      { step: "Choose rotation angle", desc: "Select 90° clockwise, 180° (upside down fix), or 270° counter-clockwise depending on how your pages are rotated." },
      { step: "Download corrected PDF", desc: "Click Rotate & Download. The rotation is permanently saved into the file — it will display correctly on every device." },
    ],
    benefits: [
      "Permanently fixes page orientation — not just a display change",
      "Three rotation options: 90°, 180°, and 270°",
      "All pages rotated simultaneously",
      "Original content, quality, and formatting preserved",
      "Works with scanned PDFs and digitally created PDFs",
      "No watermark on output file",
    ],
    useCases: [
      { title: "Scanned Documents", desc: "Fix pages that were placed in the scanner sideways or upside down — the most common cause of incorrectly oriented PDF pages." },
      { title: "Phone Camera Scans", desc: "Correct PDF pages created from photographs taken with your phone held in landscape rather than portrait orientation." },
      { title: "Received Documents", desc: "Fix rotated pages in PDFs sent by colleagues, clients, or institutions before printing or archiving." },
      { title: "Multi-Orientation PDFs", desc: "Some PDFs mix portrait and landscape pages. Rotate specific sections if you need consistent orientation throughout." },
    ],
    faq: [
      { q: "Does rotating a PDF permanently save the rotation?", a: "Yes. Our tool permanently embeds the new rotation into the PDF file structure. Anyone who opens the file on any device will see the correct orientation." },
      { q: "Why does my PDF go back to the wrong orientation after I rotate it in my viewer?", a: "PDF viewers like Adobe Reader sometimes apply a display rotation that is not saved to the file. Use our Rotate PDF tool to save the rotation permanently." },
      { q: "Can I rotate only specific pages in a PDF?", a: "Our tool currently rotates all pages in the PDF by the same angle. For rotating only specific pages, use Preview on Mac — select the specific page thumbnails and apply rotation before exporting." },
      { q: "Can I rotate a PDF on iPhone?", a: "Yes. Our Rotate PDF tool works in Safari on iPhone without any app download. Upload your PDF, choose the rotation angle, and download the corrected file." },
    ],
    extLinks: [
      { label: "PDF page rotation standard — PDF Association", href: "https://www.pdfa.org/pdf-explained/" },
    ],
  },
  "split-pdf": {
    howTo: [
      { step: "Upload your PDF", desc: "Click the upload area or drag and drop the PDF you want to split into separate files." },
      { step: "Enter page ranges", desc: "Type your page ranges in the field — for example, 1-5,6-10 to create two files. Leave the field empty to split every page into its own file." },
      { step: "Download split files", desc: "Click Split & Download. Each page range downloads as a separate PDF file immediately." },
    ],
    benefits: [
      "Split by custom page ranges — enter exactly the pages you need",
      "Or split every page into individual files automatically",
      "Original page quality preserved in every output file",
      "Multiple output files download separately",
      "Works with large multi-page PDFs",
      "No watermark on any output file",
    ],
    useCases: [
      { title: "Extract Specific Pages", desc: "Pull out just the pages you need from a long report, textbook, or manual without sending the entire document." },
      { title: "Meet Upload Size Limits", desc: "Split a large PDF into sections to stay under the file size limit of an email service or upload portal." },
      { title: "Separate Document Sections", desc: "Divide a combined document into its individual components — chapters, sections, or monthly reports." },
      { title: "Share Relevant Parts Only", desc: "Extract and share only the pages relevant to a specific recipient rather than sending the entire document." },
      { title: "Archive Individual Pages", desc: "Split scanned multi-page documents into individual pages for separate filing and retrieval." },
    ],
    faq: [
      { q: "How do I enter page ranges?", a: "Enter page numbers separated by commas. Use a hyphen for ranges. For example: 1-3,5,7-9 creates three files — pages 1 to 3, page 5 only, and pages 7 to 9." },
      { q: "How do I split every page into a separate file?", a: "Leave the page ranges field empty and click Split. The tool automatically creates one PDF file per page from the original document." },
      { q: "Does splitting reduce page quality?", a: "No. Splitting extracts pages exactly as they appear in the original PDF without any quality reduction." },
      { q: "Can I split a PDF on iPhone?", a: "Yes. Our Split PDF tool works in Safari on iPhone without any app download. Upload your PDF, enter your page ranges, and download the split files." },
      { q: "Can I split a password-protected PDF?", a: "You need to enter the password to open the PDF first. Once open and accessible in your browser, the splitting process works the same as for unprotected files." },
    ],
    extLinks: [
      { label: "PDF page structure — PDF Association", href: "https://www.pdfa.org/pdf-explained/" },
    ],
  },
  "pdf-to-word": {
    howTo: [
      { step: "Upload your PDF", desc: "Click the upload area or drag and drop your PDF file. Works with digitally created PDFs and scanned documents." },
      { step: "Convert automatically", desc: "The tool analyses your PDF and reconstructs its content as an editable Word document, preserving fonts, tables, and layout." },
      { step: "Download your DOCX", desc: "Click Convert & Download. Your editable Word document downloads immediately, ready to open in Microsoft Word or Google Docs." },
    ],
    benefits: [
      "Converts both digitally created PDFs and scanned documents with OCR",
      "Preserves fonts, tables, column layouts, and embedded images",
      "Output is a standard DOCX file compatible with all Word processors",
      "OCR technology converts scanned images of text to actual editable characters",
      "Works on iPhone, Android, Windows and Mac",
      "No watermark on converted document",
    ],
    useCases: [
      { title: "Edit Locked Documents", desc: "Convert a PDF you received into Word to make changes, update information, or reformat the content." },
      { title: "Update Old Documents", desc: "Retrieve a document from PDF format when the original Word file is no longer available." },
      { title: "Extract Text Content", desc: "Convert a PDF to Word to extract and reuse text content in other documents or presentations." },
      { title: "Scanned Document Editing", desc: "Convert scanned paper documents to editable Word files using built-in OCR — no separate OCR software needed." },
      { title: "Accessibility", desc: "Convert PDFs to Word for improved compatibility with screen readers and assistive technology." },
      { title: "Template Recovery", desc: "Convert a PDF template to Word so it can be edited and used as a customisable document template." },
    ],
    faq: [
      { q: "Will my tables be preserved when converting PDF to Word?", a: "Yes. Our converter reconstructs table structure from the PDF layout, preserving rows, columns, and cell content. Complex tables with merged cells may require minor manual adjustment." },
      { q: "Can I convert a scanned PDF to editable Word?", a: "Yes. Our tool includes OCR that recognises text in scanned page images and converts it to editable Word characters. Best results come from clear, well-lit scans at 300 DPI or higher." },
      { q: "Will my fonts be preserved after conversion?", a: "The converter attempts to match fonts in the original PDF. Standard system fonts convert with high accuracy. Unusual or embedded fonts may substitute to the closest available font." },
      { q: "How do I convert PDF to Word on iPhone?", a: "Open our PDF to Word tool in Safari on your iPhone, upload your PDF from the Files app, and download the converted DOCX. Open it in Microsoft Word for iPhone or Google Docs." },
      { q: "What is the difference between PDF to Word and editing a PDF directly?", a: "PDF to Word converts the entire document to a fully editable format where all text, tables, and formatting can be changed. Direct PDF editing adds text or annotations on top of the existing PDF without fully converting its structure." },
    ],
    extLinks: [
      { label: "DOCX format specification — Microsoft", href: "https://learn.microsoft.com/en-us/openspecs/office_standards/ms-docx/b839fe1f-e1ca-4fa6-8c26-5954d0abbccd" },
      { label: "OCR technology overview — Wikipedia", href: "https://en.wikipedia.org/wiki/Optical_character_recognition" },
    ],
  },
  "jpg-to-pdf": {
    howTo: [
      { step: "Upload your images", desc: "Click the upload area or drag and drop your JPG, JPEG, or PNG image files. You can upload multiple images to combine them into one PDF." },
      { step: "Arrange in order", desc: "Your images appear in the list. Remove any you do not need. Upload in the sequence you want them to appear in the PDF." },
      { step: "Download your PDF", desc: "Click Convert & Download. Your images are combined into a clean PDF that opens on any device without an image viewer." },
    ],
    benefits: [
      "Converts JPG, JPEG, PNG and other common image formats",
      "Multiple images combined into one PDF in upload order",
      "Images scaled to fit standard A4 page size",
      "Original image quality preserved in PDF output",
      "Works on iPhone, Android, Windows and Mac",
      "No watermark on converted PDF",
    ],
    useCases: [
      { title: "Phone Camera to PDF", desc: "Convert photographs of paper documents taken with your phone into a proper PDF for submission or sharing." },
      { title: "Receipt and Invoice Scanning", desc: "Photograph paper receipts and convert them to PDF for expense reports, accounting records, or tax documentation." },
      { title: "ID Document Submission", desc: "Convert photographs of identification documents into PDF format for applications and form submissions that require PDF uploads." },
      { title: "Handwritten Notes", desc: "Convert photographs of handwritten notes, completed worksheets, or paper forms into PDF for digital storage or submission." },
      { title: "Multi-Page Document from Photos", desc: "Combine photographs of multiple document pages into a single PDF in the correct reading order." },
      { title: "Image Portfolio", desc: "Combine multiple images into one PDF document for easy sharing as a portfolio, report, or presentation." },
    ],
    faq: [
      { q: "Can I convert multiple images to one PDF?", a: "Yes. Upload all your images and they are combined into a single PDF in the order you upload them. This is useful for multi-page documents photographed page by page." },
      { q: "Which image formats are supported?", a: "The tool supports JPG, JPEG, and PNG — the three most common image formats used by phone cameras and photo editing software." },
      { q: "Does the image quality change when converting to PDF?", a: "The original image data is preserved in the PDF. The tool scales images to fit A4 page dimensions, but does not reduce resolution below the original image quality." },
      { q: "Can I convert images to PDF on iPhone?", a: "Yes. Open our PNG to PDF tool in Safari on your iPhone, upload your images from the Photos app through the Files picker, and download the converted PDF." },
      { q: "How do I make scanned images searchable?", a: "After converting your images to PDF, use our PDF to Word tool to run OCR on the document. This converts the images of text to actual selectable and searchable characters." },
    ],
    extLinks: [
      { label: "JPEG image format — Wikipedia", href: "https://en.wikipedia.org/wiki/JPEG" },
      { label: "PNG format specification — W3C", href: "https://www.w3.org/TR/png/" },
    ],
  },
};

function ToolPage() {
  const { slug } = Route.useParams();
  const { lang } = useI18n();
  const tool = getTool(slug);

  if (!tool) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="font-display text-3xl font-bold">Tool not found</h1>
        <Link to="/tools" className="text-primary hover:underline flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" /> Back to all tools
        </Link>
      </div>
    );
  }

  const Icon = tool.icon;
  const content = toolContent[slug];
  const relatedPosts = blogPosts
    .filter(p => p.slug !== tool.relatedArticle?.slug)
    .filter(p =>
      p.content.includes(`/tools/${slug}`) ||
      p.slug.includes(slug.replace("-pdf", "").replace("pdf-", "").replace("jpg-to-", ""))
    )
    .slice(0, 3);

  const otherTools = tools.filter(t => t.slug !== slug).slice(0, 5);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">

      {/* Back */}
      <Link to="/tools" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group">
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        All tools
      </Link>

      {/* Header */}
      <div className="flex items-start gap-5 mb-10">
        <div className={`flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl ${tool.bg} ${tool.color} shadow-elegant`}>
          <Icon className="h-8 w-8" strokeWidth={2} />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
              {tool.title[lang]}
            </h1>
            {tool.badge && (
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-primary">
                {tool.badge}
              </span>
            )}
          </div>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
            {tool.seoDesc[lang]}
          </p>
        </div>
      </div>

      {/* Trust badges */}
      <div className="flex flex-wrap gap-3 mb-10">
        {[
          { icon: Shield, label: "100% Secure — files never leave your device" },
          { icon: Zap, label: "Instant processing in your browser" },
          { icon: Star, label: "Free — no signup, no watermarks" },
          { icon: Clock, label: "Files auto-deleted within 1 hour" },
        ].map(({ icon: BadgeIcon, label }) => (
          <span key={label} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs font-medium text-muted-foreground">
            <BadgeIcon className="h-3.5 w-3.5 text-primary" />
            {label}
          </span>
        ))}
      </div>

      {/* Tool */}
      <div className="rounded-3xl border border-border bg-card shadow-soft p-6 sm:p-10 mb-16">
        <ToolProcessor slug={slug} />
      </div>

      {/* How to Use */}
      {content && (
        <>
          <section className="mb-16">
            <h2 className="font-display text-2xl font-bold mb-8 flex items-center gap-2">
              <span className="inline-block w-1 h-7 rounded-full bg-gradient-primary flex-shrink-0" />
              How to use {tool.title.en}
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {content.howTo.map((step, i) => (
                <div key={i} className="rounded-2xl border border-border bg-card p-6 shadow-soft relative overflow-hidden">
                  <div className="absolute top-4 right-4 font-display text-5xl font-extrabold text-primary/8">
                    {i + 1}
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground font-bold text-lg shadow-elegant mb-4">
                    {i + 1}
                  </div>
                  <h3 className="font-display font-bold text-base mb-2">{step.step}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Benefits */}
          <section className="mb-16">
            <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="inline-block w-1 h-7 rounded-full bg-gradient-primary flex-shrink-0" />
              Why use our {tool.title.en} tool
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {content.benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-soft">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Star className="h-3 w-3" />
                  </span>
                  <span className="text-sm text-foreground/80">{b}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Use Cases */}
          <section className="mb-16">
            <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="inline-block w-1 h-7 rounded-full bg-gradient-primary flex-shrink-0" />
              Who uses {tool.title.en}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {content.useCases.map((uc, i) => (
                <div key={i} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <h3 className="font-display font-bold text-base text-primary mb-2">{uc.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{uc.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-16">
            <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="inline-block w-1 h-7 rounded-full bg-gradient-primary flex-shrink-0" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {content.faq.map((f, i) => (
                <div key={i} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                  <h3 className="font-semibold text-base mb-2">{f.q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* External Links */}
          {content.extLinks.length > 0 && (
            <section className="mb-16">
              <h2 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
                <span className="inline-block w-1 h-6 rounded-full bg-gradient-primary flex-shrink-0" />
                Further Reading
              </h2>
              <div className="flex flex-wrap gap-3">
                {content.extLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                  >
                    {link.label}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </section>
          )}
        </>
      )}

      {/* Related Article */}
      {tool.relatedArticle && (
        <div className="mb-16 rounded-2xl border border-primary/20 bg-primary/5 p-6">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-primary">Related Guide</span>
          </div>
          <Link
            to="/blog/$slug"
            params={{ slug: tool.relatedArticle.slug }}
            className="group"
          >
            <h3 className="font-display text-lg font-bold group-hover:text-primary transition-colors">
              {tool.relatedArticle.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Read our complete step-by-step guide for detailed instructions, tips and best practices.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm text-primary font-medium">
              Read guide <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        </div>
      )}

      {/* Related Blog Posts */}
      {relatedPosts.length > 0 && (
        <section className="mb-16">
          <h2 className="font-display text-xl font-bold mb-6">Related Articles</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {relatedPosts.map(post => (
              <Link
                key={post.slug}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="group rounded-2xl border border-border bg-card overflow-hidden hover:shadow-elegant hover:-translate-y-0.5 transition-all"
              >
                <img
                  src={post.cover}
                  alt={post.title}
                  className="w-full aspect-[16/9] object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  width="400"
                  height="225"
                />
                <div className="p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-primary mb-1">{post.category}</p>
                  <h3 className="text-sm font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Other Tools */}
      <section className="mb-16">
        <h2 className="font-display text-xl font-bold mb-6">Other Free PDF Tools</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {otherTools.map(t => {
            const OtherIcon = t.icon;
            return (
              <Link
                key={t.slug}
                to="/tools/$slug"
                params={{ slug: t.slug }}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-soft hover:shadow-elegant hover:border-primary/30 hover:-translate-y-0.5 transition-all group"
              >
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${t.bg} ${t.color} flex-shrink-0`}>
                  <OtherIcon className="h-5 w-5" strokeWidth={2.2} />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm group-hover:text-primary transition-colors">{t.title[lang]}</p>
                  <p className="text-xs text-muted-foreground truncate">{t.desc[lang]}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="rounded-3xl bg-gradient-primary p-10 text-center relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="relative">
          <h2 className="font-display text-2xl font-bold text-primary-foreground mb-3">
            Need more PDF tools?
          </h2>
          <p className="text-primary-foreground/85 mb-6 text-sm">
            SmartPDFMasters offers six free tools — merge, compress, rotate, split, convert and create PDFs — all in one place.
          </p>
          <Link to="/tools"
            className="inline-flex items-center gap-2 rounded-xl bg-white text-primary px-6 py-3 text-sm font-bold shadow-elegant hover:-translate-y-0.5 transition-all">
            <Zap className="h-4 w-4" />
            Browse All Free Tools
          </Link>
        </div>
      </div>

    </div>
  );
}
