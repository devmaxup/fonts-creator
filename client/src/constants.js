export const DEFAULT_FONT_NAME = 'My Font';
export const DEFAULT_STYLE_NAME = 'Medium';
export const FONT_OUTPUT_FORMATS = {
  OTF: 'otf',
  TTF: 'ttf',
  WOFF: 'woff',
  SVG: 'svg',
  EOT: 'eot',
};

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
export const API_URLS = {
  GYPHS: `${API_URL}/glyphs/`,
};
