import { List } from 'immutable';

const ADD_MESSAGE = 'r3pi/messages/ADD';
const CLEAR_MESSAGES = 'r3pi/messages/CLEAR';

const initialState = List();

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_MESSAGE:
      return state.push(action.message);
    case CLEAR_MESSAGES:
      return initialState;
    default:
      return state;
  }
}

export function addMessage(message) {
  return { type: ADD_MESSAGE, message };
}

export function clearMessages() {
  return { type: CLEAR_MESSAGES };
}
