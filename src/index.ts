export type Point = {
  x: number;
  y: number;
};

export type ThickLineFunction = (
  ctx: CanvasRenderingContext2D,
  from: Point,
  to: Point,
  thickness: number,
  color: string,
) => void;

/**
 * This function draws a thick line on a CanvasRenderingContext2D using a filled rectangle.
 */
export const fillBasedThickLine: ThickLineFunction = (
  ctx,
  from,
  to,
  thickness,
  color,
) => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const d = Math.sqrt(dx ** 2 + dy ** 2);
  const angle = Math.atan2(dy, dx);

  ctx.save();
  ctx.fillStyle = color;
  ctx.translate(from.x, from.y);
  ctx.rotate(angle);
  ctx.fillRect(0, 0 - thickness / 2, d, thickness);
  ctx.restore();
};

/**
 * This function draws a rectangle on a CanvasRenderingContext2D using a stroke with a wide thickness.
 */
export const strokeBasedThickLine: ThickLineFunction = (
  ctx,
  from,
  to,
  thickness,
  color,
) => {
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);

  ctx.lineWidth = thickness;
  ctx.strokeStyle = color;
  ctx.stroke();
};
