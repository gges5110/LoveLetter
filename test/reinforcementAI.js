import { ind2sub } from 'ind2sub';
import chai from 'chai';

let expect = chai.expect;

// np.unravel_index([22, 41, 37], (7,6))
// (array([3, 6, 6]), array([4, 5, 1]))

describe('General Reducer', () => {
  it('should return the initial state'
    , () => {
      expect(ind2sub([2, 2], 2)).to.deep.equal([0, 1]);
      expect(ind2sub([7, 4, 8], 124)).to.equal([5, 1, 4]);
    }
  );

  it('should return the initial state1'
    , () => {
      expect(ind2sub([22, 41, 37], 7)).to.equal([3, 6, 6]);
    }
  );
});
