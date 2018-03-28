import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { configureStore } from './config';

import { Provider } from 'react-redux';

import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

const run = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>, document.getElementById('root'));
  }
  
  
  store.subscribe(run);
  run();
  
  registerServiceWorker();
