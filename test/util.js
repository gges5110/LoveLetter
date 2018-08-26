import { discardCard } from '../src/util';
import chai from 'chai';

let expect = chai.expect;

describe('Evaluate', () => {
  it('should discard existing holding card', () => {
    const currentPlayerId = 1;
    let players = [
      {
        id: 1,
        holdingCards: [3]
      }, {
        id: 2,
        holdingCards: [4]
      }, {
        id: 3,
        holdingCards: [5]
      }, {
        id: 4,
        holdingCards: [6]
      }
    ];

    players = discardCard(players, currentPlayerId, {cardId: 3});
    expect(players[currentPlayerId - 1].holdingCards.length).to.equal(0);
  });
});
