import { Canvas, SKRSContext2D } from "@napi-rs/canvas";

export type CanvasAndContext = {
  canvas: Canvas | null;
  context: SKRSContext2D | null;
};

export function createCanvas(width: number, height: number): CanvasAndContext {
  if (!(width > 0 && height > 0)) {
    throw new Error("Canvas width and height must be greater than zero");
  }
  const canvas = new Canvas(width, height);

  return {
    canvas,
    context: canvas.getContext("2d"),
  };
}

export function resetCanvas(
  canvasAndContext: CanvasAndContext,
  width: number,
  height: number
): CanvasAndContext {
  if (!canvasAndContext.canvas) {
    throw new Error("Canvas object is required");
  }
  if (!(width > 0 && height > 0)) {
    throw new Error("Canvas width and height must be greater than zero");
  }

  const newCanvas = new Canvas(width, height);

  return {
    canvas: newCanvas,
    context: newCanvas.getContext("2d"),
  };
}

export function destroyCanvas(
  canvasAndContext: CanvasAndContext
): CanvasAndContext {
  if (!canvasAndContext.canvas) {
    throw new Error("Canvas object is required");
  }

  return {
    canvas: null,
    context: null,
  };
}
