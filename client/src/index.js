import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { thunk as reduxThunk } from 'redux-thunk';

import App from './components/App';
import rootReducer from './reducers';

import axios from 'axios';
window.axios = axios;

const store = createStore(rootReducer, applyMiddleware(reduxThunk));

// const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

const root = document.querySelector('#root');
ReactDOM.createRoot(root).render(
  <Provider store={store}>
    <App />
  </Provider>
);
