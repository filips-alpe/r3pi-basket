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
});
