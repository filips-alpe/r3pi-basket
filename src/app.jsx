import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import App from './containers/App';
import { addMessage } from './ducks/messages';

const store = configureStore();
store.dispatch(addMessage('Congratulations! You are our first customer! Buy 2 papayas and get the 3rd for free!'));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
