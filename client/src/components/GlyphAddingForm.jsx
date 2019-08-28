import React, { useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Form, FormGroup, FormText, Label, Input,
} from 'reactstrap';

const GlyphAddingForm = ({ onSubmit }) => {
  const codeInputRef = useRef(null);
  const [isExampleVisible, setIsExampleVisibility] = useState(false);
  const [hasError, setHasError] = useState(null);

  const toggleExampleVisibility = useCallback(
    () => setIsExampleVisibility((isVisible) => !isVisible),
    [],
  );
  const clearHasError = useCallback(
    () => setHasError(null),
    [],
  );
  const validateAndHideExample = useCallback((e) => {
    setIsExampleVisibility(false);

    try {
      // eslint-disable-next-line no-eval
      const glyphs = eval(codeInputRef.current.value);

      if (!glyphs.length) {
        setHasError(true);
        e.preventDefault();
        return;
      }
    } catch (nothing) {
      setHasError(true);
      e.preventDefault();
      return;
    }

    setHasError(false);
  }, []);

  return (
    <Form className="align-middle" onSubmit={onSubmit}>
      <FormGroup>
        <Label for="code">
          Glyphs to add as JavaScript code:
        </Label>
        <Input type="textarea" name="code" id="code" rows={10} valid={hasError === false} invalid={hasError === true} onChange={clearHasError} innerRef={codeInputRef} />

        {isExampleVisible && (
          <FormText color="muted">
            var aPath = new opentype.Path();
            <br />
            aPath.moveTo(100, 0);
            <br />
            aPath.lineTo(100, 700);
            <br />
            aPath.lineTo(500, 700);
            <br />
            aPath.lineTo(500, 400);
            <br />
            <br />
            var aGlyph = new opentype.Glyph(
            {"{ name: 'A', unicode: 65, advanceWidth: 650, path: aPath }"}
);
            <br />
            [aGlyph]
          </FormText>
        )}
        <Button color="link" size="sm" onClick={toggleExampleVisibility}>
          {isExampleVisible ? 'Hide' : 'Show'}
          {' '}
          example
        </Button>
      </FormGroup>

      <Button color="info" type="submit" onClick={validateAndHideExample}>
        Add to font
      </Button>
    </Form>
  );
};

GlyphAddingForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default GlyphAddingForm;
