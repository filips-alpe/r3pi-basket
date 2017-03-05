import { assert } from 'chai';
import { createStore, applyMiddleware } from 'redux';
import cliRenderMiddleware from './cliRenderMiddleware';
import render from '../render';

jest.mock('../render', () => jest.fn());

describe('cliRenderMiddleware', () => {
  it('triggers render after every state update', () => {
    let state = 0;
    const store = createStore(() => state, 0, applyMiddleware(cliRenderMiddleware));

    state = 1;
    store.dispatch({ type: 'foo' });
    assert.equal(render.mock.calls.length, 1, 'expected a single state update to trigger one render');

    state = 2;
    store.dispatch({ type: 'bar' });
    assert.equal(render.mock.calls.length, 2, 'expected the second state update to trigger the second render');

    store.dispatch({ type: 'foo' });
    assert.equal(render.mock.calls.length, 2, 'expected no render calls without state changes');
  });
});
