import { counter } from '../src/reducers';
import { initialState } from '../src/const';
import chai from 'chai';

let expect = chai.expect;

describe('todos reducer', () => {
  it('should return the initial state', () => {
    expect(counter(undefined, {})).to.deep.equal(initialState);
  });

  it('');
});
