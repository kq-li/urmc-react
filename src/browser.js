// @flow
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App.react';

require('./sass/global.scss');

const app = <App />;
const root = document.getElementById('root');

if (root == null) throw new Error('Root element not found');

ReactDOM.render(app, root);
