import { type Point, fillBasedRectangle, strokeBasedRectangle } from "../src";

/**
 * This example will listen to "click" events on the canvas, and join the clicked points with thick lines of random
 * colors, drawn using either fillBasedRectangle or strokeBasedRectangle, according to what the user has selected in the
 * UI.
 */
function init() {
  const canvas = document.getElementById("stage") as HTMLCanvasElement;
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  const ctx = canvas.getContext("2d");

  const state: { lastClickedPosition?: Point } = {};
  canvas.addEventListener("click", (e) => {
    const position = {
      x: e.clientX,
      y: e.clientY,
    };

    if (state.lastClickedPosition) {
      const from = state.lastClickedPosition;
      const to = position;
      const thickness = 50;
      const color = `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")}`;

      // Retrieve which method the user wants to use:
      const method =
        document.querySelector('input[type="radio"]:checked').id === "fill"
          ? fillBasedRectangle
          : strokeBasedRectangle;

      // Draw a thick line from the last clicked point to the new clicked point:
      method(ctx, from, to, thickness, color);
    }

    // Store clicked position:
    state.lastClickedPosition = position;
  });
}

init();
