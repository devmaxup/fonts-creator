import React, { useCallback, useState } from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';

import DownloadFontForm from './DownloadFontForm';
import GlyphAddingForm from './GlyphAddingForm';
import SavedGlyphs from './SavedGlyphs';
import Glyph from './Glyph';

import { DEFAULT_FONT_NAME, DEFAULT_STYLE_NAME } from '../constants';
import { saveGlyph } from '../api';
import { mergeGlyphs } from '../helpers/glyphs';
import { convertAndDownloadFont, createFont } from '../helpers/fonts';


const App = () => {
  const [savedGlyphsVersion, setSavedGlyphsVersion] = useState(0);
  const [glyphs, setGlyphs] = useState([]);

  const addAndSaveGlyphsFromCode = useCallback((e) => {
    e.preventDefault();

    // eslint-disable-next-line no-eval
    const glyphsToAdd = eval(e.target.code.value);
    if (!glyphsToAdd.length) {
      return;
    }

    Promise.all(
      glyphsToAdd.map(saveGlyph),
    )
      .then(() => setSavedGlyphsVersion((version) => version + 1));

    setGlyphs((currentGlyphs) => mergeGlyphs(currentGlyphs, glyphsToAdd));
  }, []);

  const addGlyph = useCallback((glyph) => {
    setGlyphs((currentGlyphs) => mergeGlyphs(currentGlyphs, [glyph]));
  }, []);

  const downloadFont = useCallback((e) => {
    e.preventDefault();
    const fontName = e.target.fontName.value || DEFAULT_FONT_NAME;
    const styleName = e.target.styleName.value || DEFAULT_STYLE_NAME;
    const outputFormat = e.target.outputFormat.options[
      e.target.outputFormat.selectedIndex
    ].value;

    const font = createFont(glyphs, fontName, styleName);
    if (outputFormat === 'otf') {
      font.download();
      return;
    }

    const filename = font.names.fullName.en || Object.values(font.names.fullName)[0];
    convertAndDownloadFont(font, outputFormat, filename);
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
                <Glyph
                  key={(glyph.unicode || glyph.name) + glyph.path.toPathData()}
                  glyph={glyph}
                />
              ))}
            </CardBody>
          </Card>

          <GlyphAddingForm onSubmit={addAndSaveGlyphsFromCode} />

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

export default App;
