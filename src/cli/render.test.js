import { assert } from 'chai';
import { Map } from 'immutable';
import render from './render';
import { println, clearScreen } from '../utils/cli';

jest.mock('../utils/cli', () => ({
  println: jest.fn(),
  clearScreen: jest.fn(),
}));

describe('render', () => {
  it('prints a visual representation of the state', () => {
    render(Map({ foo: 'bar' }));
    assert.equal(println.mock.calls.length, 1, 'expected render to print once');
    assert.isString(println.mock.calls[0][0], 'expected render to print text');
    assert.equal(clearScreen.mock.calls.length, 1, 'expected the screen to be cleared before rendering');
  });
});
