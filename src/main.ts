import fs from "fs";
import path from "path";

async function convertPdfToPng(
  inputPath: string,
  outputDir: string = "./output",
  fileName: string = "page",
  dpi: number = 300
) {
  const mupdf = await import("mupdf");
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(`Loading PDF from: ${inputPath}`);

  // Read the PDF file as ArrayBuffer
  // const pdfData = new Uint8Array(fs.readFileSync(inputPath));

  const doc = mupdf.PDFDocument.openDocument(
    fs.readFileSync(inputPath),
    "application/pdf"
  );

  const pageCount = doc.countPages();
  console.log(`PDF has ${pageCount} pages`);

  const page = doc.loadPage(0);
  const pixMap = page.toPixmap(
    mupdf.Matrix.identity,
    mupdf.ColorSpace.DeviceBGR
  );
  const pngDataUrl = pixMap.asPNG();
  fs.writeFileSync(path.join(outputDir, `${fileName}_1.png`), pngDataUrl);
}

convertPdfToPng("./multi_pdf_50-1_6.pdf");
