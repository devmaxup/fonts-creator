import axios from 'axios';
import { API_URLS } from './constants';

export const saveGlyph = (glyph) => axios.post(API_URLS.GYPHS, {
  name: glyph.name,
  unicode: glyph.unicode,
  advanceWidth: glyph.advanceWidth,
  pathData: glyph.path.toPathData(),
});

export const fetchGlyphs = (page = 1) => axios.get(API_URLS.GYPHS, {
  params: {
    page,
  },
});
