import React from 'react';
import {
  Col,
  Container,
  Row,
} from 'reactstrap';

import DownloadFontForm from './DownloadFontForm';
import GlyphAddingForm from './GlyphAddingForm';

export default () => (
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


        <GlyphAddingForm/>

      </Col>
      <Col xs={6}>
        <h4>
          Saved glyphs:
        </h4>

      </Col>
    </Row>
  </Container>
);
