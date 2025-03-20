import { PDFDocumentProxy } from "pdfjs-dist";
import fs from "fs/promises";
import { createCanvas, destroyCanvas } from "./node.canvas.factory";
import { readFileSync } from "fs";

export const PDF_TO_PNG_OPTIONS_DEFAULTS = {
  viewportScale: 1,
  disableFontFace: true,
  useSystemFonts: false,
  enableXfa: true,
  outputFileMask: "buffer",
  strictPagesToProcess: false,
  pdfFilePassword: undefined,
};

async function processPdfPage(url: string) {
  const file = readFileSync(url).buffer;
  const { getDocument } = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const pdf = await getDocument({
    data: new Uint8Array(file),
  }).promise;
  const page = await pdf.getPage(1);
  const viewport = page.getViewport({ scale: 2.0 });
  const { canvas, context } = createCanvas(viewport.width, viewport.height);

  if (canvas === null || context === null) {
    throw new Error("Failed to create canvas and context");
  }

  await page.render({ canvasContext: context as any, viewport }).promise;
  const pngBuffer = canvas.toBuffer("image/png");
  page.cleanup();
  destroyCanvas({ canvas, context });
  await fs.writeFile("output.png", pngBuffer);
}

processPdfPage("./multi_pdf_50-1_6.pdf");
