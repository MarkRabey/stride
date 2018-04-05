import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './lib/store';
import Application from './components/Application';

import './assets/css/style.css';
import './assets/css/stride-icons.css';

// Create main element
const mainElement = document.createElement('div');
mainElement.setAttribute('id', 'app');
document.body.appendChild(mainElement);

// Render components
ReactDOM.render(
  <Provider store={store}>
    <Application />
  </Provider>,
  mainElement
);
