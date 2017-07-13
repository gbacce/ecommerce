import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from './containers/Home'

// Fetch the createStore method from the redux module
import { createStore } from 'redux';

// Import the Provider from react-redux (so react and redux can talk)
import {Provider } from 'react-redux';

// Import the rootReducer (so it can access the Store)
import reducers from './reducers/index'

// Create the store.
const theStore = createStore(reducers);

ReactDOM.render(
  <Provider store={theStore} >
    <App />
  </Provider >,
  document.getElementById('root')
);