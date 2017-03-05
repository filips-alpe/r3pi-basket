import { combineReducers } from 'redux-immutable';
import basket from './ducks/basket';
import messages from './ducks/messages';

export default combineReducers({
  basket,
  messages,
});
