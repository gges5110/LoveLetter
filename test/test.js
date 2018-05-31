import { compareCards } from '../util.js';

var assert = chai.assert;

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });

    it('should return 0 when the two cards are the same', function() {
      assert.equal(compareCards('Baron', 'Baron'), 0);
    });

    it('every player should have a card after game start', function() {
      initailizeGame();
      assert.equal(players[0].cards.length, 2);
      assert.equal(players[1].cards.length, 1);
      assert.equal(players[2].cards.length, 1);
      assert.equal(players[3].cards.length, 1);
    });

    it('check available card size', function() {
      // assert.equal(getAvailableCardSize(), 16 - 6);
    });

    it('should be able to check the affect of each card?');
  });
});