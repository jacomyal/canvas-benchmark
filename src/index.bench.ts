import { bench, describe } from "vitest";

import { fillBasedThickLine, strokeBasedThickLine } from "./index";

const SIZE = 1000;

describe("Canvas methods to draw a thick line", () => {
  // Initialize canvas to draw on:
  const canvas = document.createElement("canvas");
  canvas.style.width = SIZE + "px";
  canvas.style.height = SIZE + "px";
  canvas.width = SIZE;
  canvas.height = SIZE;
  document.body.append(canvas);

  // Retrieve context:
  const ctx = canvas.getContext("2d");

  [
    { label: "Using a filled rectangle", methodToBench: fillBasedThickLine },
    { label: "Using a wide stroke", methodToBench: strokeBasedThickLine },
  ].forEach(({ label, methodToBench }) => {
    bench(
      label,
      () => {
        const angle = 2 * Math.PI * Math.random();
        methodToBench(
          ctx,
          {
            x: SIZE / 2 - (SIZE / 2) * Math.cos(angle),
            y: SIZE / 2 - (SIZE / 2) * Math.sin(angle),
          },
          {
            x: SIZE / 2 + (SIZE / 2) * Math.cos(angle),
            y: SIZE / 2 + (SIZE / 2) * Math.sin(angle),
          },
          50,
          `#${Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, "0")}`,
        );
      },
      { iterations: 1000 },
    );
  });
});
