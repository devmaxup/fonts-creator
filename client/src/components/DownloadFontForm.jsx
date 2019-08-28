import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  FormGroup,
  Input,
} from 'reactstrap';
import { FONT_OUTPUT_FORMATS, DEFAULT_FONT_NAME, DEFAULT_STYLE_NAME } from '../constants';

const DownloadFontForm = ({ onSubmit }) => (
  <Form className="p-3" inline onSubmit={onSubmit}>
    <FormGroup className="mr-3">
      <Input type="text" name="fontName" id="fontName" placeholder="Font Name" title={`default is "${DEFAULT_FONT_NAME}"`} />
    </FormGroup>

    <FormGroup className="mr-3">
      <Input type="text" name="styleName" id="styleName" placeholder="Font style" title={`default is "${DEFAULT_STYLE_NAME}"`} />
    </FormGroup>

    <FormGroup className="mr-3">
      <Input type="select" name="outputFormat" id="outputFormat" defaultValue={FONT_OUTPUT_FORMATS.OTF}>
        {Object.values(FONT_OUTPUT_FORMATS).map((format) => (
          <option key={format} value={format}>{format}</option>
        ))}
      </Input>
    </FormGroup>

    <Button color="primary" type="submit">
      Download font
    </Button>
  </Form>
);

DownloadFontForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default DownloadFontForm;
