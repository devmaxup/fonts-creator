import React from 'react';
import ReactDOM from 'react-dom';
import * as opentype from 'opentype.js';

import App from './components/App';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

window.opentype = opentype;

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
