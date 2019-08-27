import React from 'react';
import {
  Button,
  Form,
  FormGroup,
  Input,
} from 'reactstrap';

export default () => (
  <Form className="p-3" inline>
    <FormGroup className="mr-3">
      <Input type="text" name="select" id="fontName" placeholder="Font Name"/>
    </FormGroup>

    <FormGroup className="mr-3">
      <Input type="select" name="outputFormat" id="outputFormat" defaultValue="ttf">
        <option value="ttf">ttf</option>
        <option value="woff">woff</option>
        <option value="svg">svg</option>
        <option value="eot">eot</option>
      </Input>
    </FormGroup>

    <Button color="primary" type="submit">
      Download font
    </Button>
  </Form>
);
