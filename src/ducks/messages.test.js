import { assert } from 'chai';
import { List } from 'immutable';
import reducer, { addMessage, clearMessages } from './messages';

describe('messages duck', () => {
  it('initializes the state with a list of messages', () => {
    const state = reducer(undefined, {});
    assert.equal(state, List(), 'expected state to be a list');
  });

  it('allows adding displayable messages to the state', () => {
    const state = reducer(undefined, addMessage('Hello'));
    assert.deepEqual(state.toJS(), ['Hello'], 'expected message to be stored in state');
  });

  it('allows clearing messages from state', () => {
    const state = reducer(undefined, addMessage('Welcome'));
    const nextState = reducer(state, clearMessages());
    assert.deepEqual(nextState.toJS(), [], 'expected messages to be cleared');
  });

  it('respects the order of messages', () => {
    const state = reducer(undefined, addMessage('Hello'));
    const nextState = reducer(state, addMessage('world'));
    assert.deepEqual(nextState.toJS(), ['Hello', 'world'], 'expected messages to be ordered');
  });
});
