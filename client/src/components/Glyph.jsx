import React, { useRef, useEffect } from 'react';

export default ({ glyph, className, size = 54, fontSize = 48, withPoints, withMetrix}) => {
  const canvasRef = useRef(null);
  const x = Math.floor((size - fontSize) / 2);
  const y = Math.floor(fontSize + (size - fontSize) / 2);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');

    glyph.draw(ctx, x, y, fontSize);
    if (withPoints) glyph.drawPoints(ctx, x, y, fontSize);
    if (withMetrix) glyph.drawMetrics(ctx, x, y, fontSize);
  });

  return (
    <canvas ref={canvasRef} className={className} width={size} height={size} />
  );
};
