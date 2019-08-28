import * as opentype from 'opentype.js';
import { Font as FontEditorFont } from 'fonteditor-core';

export const createFont = (glyphs, familyName, styleName) => new opentype.Font({
  familyName,
  styleName,
  unitsPerEm: 1000,
  ascender: 800,
  descender: -200,
  glyphs,
});

export const convertAndDownloadFont = (openTypeFont, type, filename) => {
  const font = FontEditorFont.create(openTypeFont.toArrayBuffer(), {
    type: 'otf',
    hinting: true, // save font hinting
    compound2simple: true, // transform ttf compound glyph to simple
    inflate: null, // inflate function for woff
    combinePath: false, // for svg path
  });

  const resultArrayBuffer = font.write({
    type, // support ttf, woff, eot, svg
    hinting: true, // save font hinting
    deflate: null, // deflate function for woff
  });

  const blob = new Blob([resultArrayBuffer]);
  const a = document.createElement('a');
  document.body.appendChild(a);

  const url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = `${filename}.${type}`;
  a.click();
  window.URL.revokeObjectURL(url);
};
