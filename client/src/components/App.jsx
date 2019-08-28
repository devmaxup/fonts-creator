import React, { useState, useCallback } from 'react';
import {
  Col,
  Container,
  Row,
  Card,
  CardBody,
} from 'reactstrap';
import * as opentype from "opentype.js";
import { Font as FontEditorFont } from "fonteditor-core";
import axios from "axios";

import { DEFAULT_FONT_NAME, DEFAULT_STYLE_NAME, API_URLS } from '../constants';
import DownloadFontForm from './DownloadFontForm';
import GlyphAddingForm from './GlyphAddingForm';
import Glyph from './Glyph';

const notdefPath = new opentype.Path();
notdefPath.moveTo(100, 0);
notdefPath.lineTo(100, 700);
notdefPath.lineTo(600, 700);
notdefPath.lineTo(600, 0);
notdefPath.moveTo(200, 100);
notdefPath.lineTo(500, 100);
notdefPath.lineTo(500, 600);
notdefPath.lineTo(200, 600);
const notdefGlyph = new opentype.Glyph({
  name: '.notdef',
  unicode: 0,
  advanceWidth: 650,
  path: notdefPath
});

const aPath = new opentype.Path();
aPath.moveTo(100, 0);
aPath.lineTo(100, 700);
aPath.lineTo(600, 700);
aPath.lineTo(600, 0);
aPath.lineTo(500, 0);
aPath.lineTo(500, 300);
aPath.lineTo(200, 300);
aPath.lineTo(200, 0);
aPath.moveTo(200, 400);
aPath.lineTo(500, 400);
aPath.lineTo(500, 600);
aPath.lineTo(200, 600);
const aGlyph = new opentype.Glyph({
  name: 'A',
  unicode: 65,
  advanceWidth: 650,
  path: aPath
});
const bPath = new opentype.Path();
bPath.moveTo(100, 0);
bPath.lineTo(100, 700);
bPath.lineTo(500, 700);
bPath.lineTo(500, 400);
bPath.lineTo(600, 400);
bPath.lineTo(600, 0);
bPath.moveTo(200, 400);
bPath.lineTo(400, 400);
bPath.lineTo(400, 600);
bPath.lineTo(200, 600);
bPath.moveTo(200, 100);
bPath.lineTo(500, 100);
bPath.lineTo(500, 300);
bPath.lineTo(200, 300);
const bGlyph = new opentype.Glyph({
  name: 'B',
  unicode: 66,
  advanceWidth: 650,
  path: bPath
});

const mergeGlyphs = (glyphs, glyphsToAdd) => {
  const resultGlyphs = [...glyphs];

  glyphsToAdd.forEach((glyphToAdd) => {
    const existedGlyphIndex = glyphs.findIndex(
      glyphToAdd.unicode
        ? ({ unicode }) => unicode === glyphToAdd.unicode
        : ({ name }) => name === glyphToAdd.name
    );

    if (existedGlyphIndex === -1) {
      resultGlyphs.push(glyphToAdd);
      return;
    }
    resultGlyphs[existedGlyphIndex] = glyphToAdd;
  });

  return resultGlyphs;
};

const saveGlyph = (glyph) =>
  axios.post(API_URLS.GYPHS, {
    name: glyph.name,
    unicode: glyph.unicode,
    pathData: glyph.path.toPathData(),
  });

const createFont = (glyphs, familyName, styleName) => {
  return new opentype.Font({
    familyName,
    styleName,
    unitsPerEm: 1000,
    ascender: 800,
    descender: -200,
    glyphs
  });
};

const convertAndDownloadFont = (openTypeFont, type, filename) => {
  const font = FontEditorFont.create(openTypeFont.toArrayBuffer(), {
    type: 'otf',
    hinting: true, // save font hinting
    compound2simple: true, // transform ttf compound glyph to simple
    inflate: null, // inflate function for woff
    combinePath: false // for svg path
  });

  const resultArrayBuffer = font.write({
    type, // support ttf, woff, eot, svg
    hinting: true, // save font hinting
    deflate: null // deflate function for woff
  });

  const blob = new Blob([resultArrayBuffer]);
  const a = document.createElement("a");
  document.body.appendChild(a);

  const url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = filename + "." + type;
  a.click();
  window.URL.revokeObjectURL(url);
};


export default () => {
  const [glyphs, setGlyphs] = useState([notdefGlyph, aGlyph, bGlyph]);

  const addAndSaveGlyphs = useCallback((e) => {
    e.preventDefault();
    const glyphsToAdd = eval(e.target.code.value);
    if (!glyphsToAdd.length) {
      return;
    }

    glyphsToAdd.forEach(saveGlyph);
    setGlyphs((glyphs) => mergeGlyphs(glyphs, glyphsToAdd));
  }, []);

  const downloadFont = useCallback((e) => {
    e.preventDefault();
    const fontName = e.target.fontName.value || DEFAULT_FONT_NAME;
    const styleName = e.target.styleName.value || DEFAULT_STYLE_NAME;
    const outputFormat = e.target.outputFormat.options[e.target.outputFormat.selectedIndex].value;

    const font = createFont(glyphs, fontName, styleName);
    if (outputFormat === 'otf') {
      font.download();
      return;
    }

    const filename = font.names.fullName.en || Object.values(font.names.fullName)[0];
    convertAndDownloadFont(font, outputFormat, filename)
  }, [glyphs]);


  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs="auto">
          <h1 className="text-center">
            Create your font
          </h1>

          <DownloadFontForm onSubmit={downloadFont} />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs={6}>
          <h4>
            Added glyphs:
          </h4>

          <Card className="mb-5">
            <CardBody>
              {glyphs.map((glyph) => (
                <Glyph key={glyph.unicode || glyph.name} glyph={console.log(glyph) || glyph} />
              ))}
            </CardBody>
          </Card>

          <GlyphAddingForm onSubmit={addAndSaveGlyphs}/>

        </Col>
        <Col xs={6}>
          <h4>
            Saved glyphs:
          </h4>

        </Col>
      </Row>
    </Container>
  );
};
