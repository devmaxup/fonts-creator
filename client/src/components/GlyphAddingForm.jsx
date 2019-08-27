import React, { useState } from 'react';
import { Button, Form, FormGroup, FormText, Label, Input } from 'reactstrap';

export default () => {
  const [isExampleVisible, setIsExampleVisibility] = useState(false);
  const toggleExampleVisibility = () => setIsExampleVisibility((isExampleVisible) => !isExampleVisible);

  return (
    <Form className="align-middle">
      <FormGroup>
        <Label for="exampleText">
          JavaScript Glyphs code:
        </Label>
        <Input type="textarea" name="text" id="exampleText" />

        {isExampleVisible && (
          <FormText color="muted">
            var aPath = new opentype.Path();<br />
            aPath.moveTo(100, 0);<br />
            aPath.lineTo(100, 700);<br />
            <br />
            var aGlyph = new opentype.Glyph({"{ name: 'A', unicode: 65, advanceWidth: 650, path: aPath }"});<br />
            [aGlyph]
          </FormText>
        )}
        <Button color="link" size="sm" onClick={toggleExampleVisibility}>
          {isExampleVisible ? 'Hide' : 'Show'} example
        </Button>
      </FormGroup>

      <Button color="info">
        Add to font
      </Button>
    </Form>
  )
};
