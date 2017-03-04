import { createStore } from 'redux';
import { fromJS } from 'immutable';
import rootReducer from './reducer';

export default function configureStore(initialState = {}) {
  const store = createStore(rootReducer, fromJS(initialState));

  return store;
}
