import React, { useState, useCallback } from 'react';
import { Button, Form, FormGroup, FormText, Label, Input } from 'reactstrap';

export default ({ onSubmit }) => {
  const [isExampleVisible, setIsExampleVisibility] = useState(false);
  const toggleExampleVisibility = useCallback(
    () => setIsExampleVisibility((isExampleVisible) => !isExampleVisible),
    []
  );
  const hideExample = useCallback(() => setIsExampleVisibility(false), []);

  return (
    <Form className="align-middle" onSubmit={onSubmit}>
      <FormGroup>
        <Label for="code">
          Glyphs to add as JavaScript code:
        </Label>
        <Input type="textarea" name="code" id="code" rows={10} />

        {isExampleVisible && (
          <FormText color="muted">
            var aPath = new opentype.Path();<br />
            aPath.moveTo(100, 0);<br />
            aPath.lineTo(100, 700);<br />
            aPath.lineTo(500, 700);<br />
            aPath.lineTo(500, 400);<br />
            <br />
            var aGlyph = new opentype.Glyph({"{ name: 'A', unicode: 65, advanceWidth: 650, path: aPath }"});<br />
            [aGlyph]
          </FormText>
        )}
        <Button color="link" size="sm" onClick={toggleExampleVisibility}>
          {isExampleVisible ? 'Hide' : 'Show'} example
        </Button>
      </FormGroup>

      <Button color="info" type="submit" onClick={hideExample}>
        Add to font
      </Button>
    </Form>
  )
};
