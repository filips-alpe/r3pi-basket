import { assert } from 'chai';
import render from './render';
import { println } from '../utils/cli';

jest.mock('../utils/cli', () => ({
  println: jest.fn(),
}));

describe('render', () => {
  it('prints a visual representation of the state', () => {
    render({ foo: 'bar' });
    assert.equal(println.mock.calls.length, 1, 'expected render to print once');
    assert.isString(println.mock.calls[0][0], 'expected render to print text');
  });
});
