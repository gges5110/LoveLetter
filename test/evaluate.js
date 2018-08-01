import Evaluation from '../src/AI/evaluate';
import chai from 'chai';

let expect = chai.expect;

describe('Evaluate', () => {
  it('should return the initial state', () => {
    let evaluate = new Evaluation();
    let result = evaluate.start(2);

    expect(result.winRate).to.be.an('array');
    expect(result.winRate.length).to.equal(4);
    expect(result.winRate[0] + result.winRate[1] + result.winRate[2] + result.winRate[3]).to.equal(100);
  });
});
