import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as opentype from 'opentype.js';

const Glyph = ({
  glyph, size = 54, fontSize = 48, withPoints, withMetrix, ...rest
}) => {
  const canvasRef = useRef(null);
  const x = Math.floor((size - fontSize) / 2);
  const y = Math.floor(fontSize + (size - fontSize) / 2);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');

    glyph.draw(ctx, x, y, fontSize);
    if (withPoints) glyph.drawPoints(ctx, x, y, fontSize);
    if (withMetrix) glyph.drawMetrics(ctx, x, y, fontSize);
  }, [glyph, x, y, fontSize, withPoints, withMetrix]);

  return (
    <canvas ref={canvasRef} width={size} height={size} title={`${glyph.unicode} "${glyph.name}"`} {...rest} />
  );
};

Glyph.defaultProps = {
  size: 54,
  fontSize: 48,
  withPoints: false,
  withMetrix: false,
};

Glyph.propTypes = {
  glyph: PropTypes.instanceOf(opentype.Glyph).isRequired,
  size: PropTypes.number,
  fontSize: PropTypes.number,
  withPoints: PropTypes.bool,
  withMetrix: PropTypes.bool,
};

export default Glyph;
