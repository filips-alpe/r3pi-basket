import { createStore, applyMiddleware } from 'redux';
import { fromJS } from 'immutable';
import rootReducer from './reducer';

export default function configureStore(initialState = {}, middleware = []) {
  const store = createStore(rootReducer, fromJS(initialState), applyMiddleware(...middleware));

  return store;
}
