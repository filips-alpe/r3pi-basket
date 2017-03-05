import { assert } from 'chai';
import configureStore from './store';

describe('configureStore', () => {
  it('creates a redux store', () => {
    const store = configureStore();
    assert.isObject(store, "expected 'configureStore' to return a store");

    ['dispatch', 'subscribe', 'getState'].forEach((key) => {
      assert.isFunction(store[key], `expected store to have a '${key}' method`);
    });
  });

  it('accepts middleware and applies it to the store', () => {
    const middlewareSpy = jest.fn();
    const middleware = () => () => middlewareSpy;
    const store = configureStore(undefined, [middleware]);
    store.dispatch({ type: 'foo' });
    assert.equal(middlewareSpy.mock.calls.length, 1, 'expected middleware to be successfully called');
  });
});
