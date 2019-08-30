import axios from 'axios';
import { API_URLS } from './constants';
import { toGlyphData } from './helpers/glyphs';

export const saveGlyph = (glyph) => axios.post(API_URLS.GYPHS, toGlyphData(glyph));

export const fetchGlyphs = (page = 1) => axios.get(API_URLS.GYPHS, {
  params: {
    page,
  },
});
