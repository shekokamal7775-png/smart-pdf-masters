import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';

export function ToolProcessor({ slug }: { slug: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const processFile = async () => {
    if (!file) return;

    setProcessing(true);
    setResult(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      let resultBuffer: ArrayBuffer | null = null;

      if (slug === 'merge-pdf') {
        // دمج PDF
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const newPdf = await PDFDocument.create();
        const pages = await newPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
        pages.forEach(page => newPdf.addPage(page));
        resultBuffer = await newPdf.save();
      } else if (slug === 'compress-pdf') {
        // ضغط PDF
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        resultBuffer = await pdfDoc.save({ useObjectStreams: true });
      } else if (slug === 'jpg-to-pdf') {
        // تحويل صورة إلى PDF
        const pdfDoc = await PDFDocument.create();
        const image = await pdfDoc.embedJpg(arrayBuffer);
        const page = pdfDoc.addPage([image.width, image.height]);
        page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
        resultBuffer = await pdfDoc.save();
      } else if (slug === 'pdf-to-word') {
        alert('PDF to Word feature is coming soon!');
        setProcessing(false);
        return;
      }

      if (resultBuffer) {
        const blob = new Blob([resultBuffer], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setResult(url);
        saveAs(blob, `output_${slug}.pdf`);
      }
    } catch (error) {
      console.error('Error processing file:', error);
      alert('حدث خطأ أثناء المعالجة. حاول مرة أخرى.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="p-4 border rounded-xl">
      <input type="file" onChange={handleFileUpload} className="mb-4" />
      <button
        onClick={processFile}
        disabled={!file || processing}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {processing ? 'جاري المعالجة...' : 'ابدأ المعالجة'}
      </button>
      {result && (
        <div className="mt-4">
          <a href={result} download="output.pdf" className="text-green-600 hover:underline">
            تحميل الملف الناتج
          </a>
        </div>
      )}
    </div>
  );
}
