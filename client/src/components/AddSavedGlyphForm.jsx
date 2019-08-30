import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import * as opentype from 'opentype.js';


const AddSavedGlyphForm = ({ glyph, onSubmit, onCancelClick }) => (
  <Form className="align-middle" onSubmit={onSubmit}>
    <ModalHeader toggle={onCancelClick}>
      Saved glyph adding
    </ModalHeader>
    <ModalBody>
      <FormGroup>
        <Label for="name">
          Name:
        </Label>
        <Input type="text" name="name" id="name" defaultValue={glyph.name} required />
      </FormGroup>

      <FormGroup>
        <Label for="unicode">
          Unicode number:
        </Label>
        <Input type="number" name="unicode" id="unicode" defaultValue={glyph.unicode} />
      </FormGroup>

      <FormGroup>
        <Label for="advanceWidth">
          Advance width:
        </Label>
        <Input type="number" name="advanceWidth" id="advanceWidth" defaultValue={glyph.advanceWidth} />
      </FormGroup>

    </ModalBody>
    <ModalFooter>
      <Button color="info" type="submit">
        Add to font
      </Button>
      {' '}
      <Button color="secondary" onClick={onCancelClick}>Cancel</Button>
    </ModalFooter>
  </Form>
);

AddSavedGlyphForm.propTypes = {
  glyph: PropTypes.instanceOf(opentype.Glyph).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
};

export default AddSavedGlyphForm;
