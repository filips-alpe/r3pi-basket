import { assert } from 'chai';
import { Map } from 'immutable';
import rootReducer from './reducer';

describe('rootReducer', () => {
  it('returns the initial state when called without a state', () => {
    const state = rootReducer(undefined, {});
    assert.isTrue(state instanceof Map, 'expected the root reducer to return an immutable Map');
  });

  it('reduces the passed state into the next state', () => {
    const initialState = Map({ foo: 'bar' });
    const newState = rootReducer(initialState, {});
    assert.strictEqual(initialState, newState, 'expected the root reducer to accept the passed state');
  });
});
