import React, { useState, useCallback } from 'react';
import {
  Col,
  Container,
  Row,
  Card,
  CardBody,
} from 'reactstrap';
import * as opentype from "opentype.js";

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
    const existedGlyphIndex = glyphs.findIndex(({ name }) => name === glyphToAdd.name);

    if (existedGlyphIndex === -1) {
      resultGlyphs.push(glyphToAdd);
      return;
    }
    resultGlyphs[existedGlyphIndex] = glyphToAdd;
  });

  return resultGlyphs;
};

// const font = new opentype.Font({
//   familyName: 'TempFont',
//   styleName: "Medium",
//   unitsPerEm: 1000,
//   ascender: 800,
//   descender: -200,
//   glyphs: [notdefGlyph, aGlyph, bGlyph]
// });

export default () => {
  const [glyphs, setGlyphs] = useState([notdefGlyph, aGlyph, bGlyph]);

  const addGlyph = useCallback((e) => {
    e.preventDefault();
    const glyphsToAdd = eval(e.target.code.value);
    if (!glyphsToAdd.length) {
      return;
    }

    setGlyphs((glyphs) => mergeGlyphs(glyphs, glyphsToAdd));
  }, []);

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs="auto">
          <h1 className="text-center">
            Create your font
          </h1>

          <DownloadFontForm />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs={6}>
          <h4>
            Added glyphs:
          </h4>

          <Card className="mb-5">
            <CardBody>
              {glyphs.map((glyph) => <Glyph key={glyph.path.toPathData()} glyph={glyph} />)}
            </CardBody>
          </Card>

          <GlyphAddingForm onSubmit={addGlyph}/>

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
