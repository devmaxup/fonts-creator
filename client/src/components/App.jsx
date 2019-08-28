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
import SavedGlyphs from './SavedGlyphs';
import Glyph from './Glyph';

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

  return resultGlyphs.sort((a, b) => (a.unicode || 0) - (b.unicode || 0));
};

const saveGlyph = (glyph) =>
  axios.post(API_URLS.GYPHS, {
    name: glyph.name,
    unicode: glyph.unicode,
    advanceWidth: glyph.advanceWidth,
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
  const [savedGlyphsVersion, setSavedGlyphsVersion] = useState(0);
  const [glyphs, setGlyphs] = useState([]);

  const addAndSaveGlyphsFromCode = useCallback((e) => {
    e.preventDefault();

    // eslint-disable-next-line no-eval
    const glyphsToAdd = eval(e.target.code.value);
    if (!glyphsToAdd.length) {
      return;
    }

    Promise.all(glyphsToAdd.map(saveGlyph)).then(() =>
      setSavedGlyphsVersion(version => version + 1)
    );
    setGlyphs((glyphs) => mergeGlyphs(glyphs, glyphsToAdd));
  }, []);

  const addGlyph = useCallback((glyph) => {
    setGlyphs((glyphs) => mergeGlyphs(glyphs, [glyph]));
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
    <Container className="mt-5 mb-5">
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
                <Glyph key={(glyph.unicode || glyph.name) + glyph.path.toPathData()} glyph={glyph} />
              ))}
            </CardBody>
          </Card>

          <GlyphAddingForm onSubmit={addAndSaveGlyphsFromCode}/>

        </Col>
        <Col xs={6}>
          <h4>
            Saved glyphs:
          </h4>

          <SavedGlyphs key={savedGlyphsVersion} onGlyphClick={addGlyph} />
        </Col>
      </Row>
    </Container>
  );
};
