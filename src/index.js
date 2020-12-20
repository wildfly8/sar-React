import React from 'react';
import ReactDOM from 'react-dom';
import './polyfills';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

/* global document */
/* eslint-disable react/jsx-filename-extension */
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
