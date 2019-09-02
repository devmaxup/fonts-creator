import * as opentype from '../../node_modules/opentype.js/src/opentype';

export const toGlyphData = (glyph) => ({
  name: glyph.name,
  unicode: glyph.unicode,
  advanceWidth: glyph.advanceWidth,
  pathData: glyph.path.toPathData(),
});

export const createGlyphFromGlyphData = (glyphData) => {
  const path = new opentype.Path();
  const pathDataList = glyphData.pathData
    .replace(/([A-Z])/g, ';$1')
    .replace(/^;/, '')
    .split(';');

  pathDataList.forEach((pathData) => {
    const command = pathData[0];
    const args = pathData.slice(1).split(' ').map(parseFloat);

    switch (command) {
      case 'M':
        path.moveTo(...args);
        return;
      case 'L':
        path.lineTo(...args);
        break;
      case 'Q':
        path.quadTo(...args);
        break;
      case 'C':
        path.curveTo(...args);
        break;
      case 'Z':
        path.close(...args);
        break;
      default:
        throw new Error(`Unexpected path command ${pathData}`);
    }
  });


  const glyph = new opentype.Glyph({
    name: glyphData.name,
    unicode: glyphData.unicode,
    advanceWidth: glyphData.advanceWidth || 650,
    path,
  });
  glyph._id = glyphData.id;

  return glyph;
};

export const mergeGlyphs = (glyphs, glyphsToAdd) => {
  const resultGlyphs = [...glyphs];

  glyphsToAdd.forEach((glyphToAdd) => {
    const existedGlyphIndex = glyphs.findIndex(
      glyphToAdd.unicode
        ? ({ unicode }) => unicode === glyphToAdd.unicode
        : ({ name }) => name === glyphToAdd.name,
    );

    if (existedGlyphIndex === -1) {
      resultGlyphs.push(glyphToAdd);
      return;
    }
    resultGlyphs[existedGlyphIndex] = glyphToAdd;
  });

  return resultGlyphs.sort((a, b) => (a.unicode || 0) - (b.unicode || 0));
};

export const extendGlyph = (glyph, options) => createGlyphFromGlyphData({
  ...toGlyphData(glyph),
  ...options,
  id: glyph._id,
});
