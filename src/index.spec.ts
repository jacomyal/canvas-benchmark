import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { DrawingFn, fillBasedRectangle, strokeBasedRectangle } from "./index";

const SIZE = 1000;

interface TestContext {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
}

beforeEach<TestContext>((context) => {
  // Initialize canvas to draw on:
  const canvas = document.createElement("canvas");
  canvas.style.width = SIZE + "px";
  canvas.style.height = SIZE + "px";
  canvas.width = SIZE;
  canvas.height = SIZE;
  document.body.append(canvas);

  // Retrieve context:
  const ctx = canvas.getContext("2d");

  context.canvas = canvas;
  context.ctx = ctx;
});

afterEach<TestContext>(({ canvas }) => {
  canvas.remove();
});

function testFunction(fn: DrawingFn) {
  test<TestContext>("it should colorize pixels", ({ canvas, ctx }) => {
    // Resize the canvas to a 1px square:
    canvas.width = 1;
    canvas.height = 1;

    // Draw a thick line that contains the only pixel
    fn(ctx, { x: -1, y: -1 }, { x: 1, y: 1 }, 2, "#ff0000");

    // Retrieve the pixel color:
    const {
      data: [r, g, b, a],
    } = ctx.getImageData(0, 0, 1, 1);

    expect([r, g, b, a]).toStrictEqual([255, 0, 0, 255]);
  });
}

describe("fillBasedRectangle", () => {
  testFunction(fillBasedRectangle);
});
describe("strokeBasedRectangle", () => {
  testFunction(strokeBasedRectangle);
});
