import { counter } from '../src/reducers';
import { initialState } from '../src/const';
import { getAvailableCardSize } from '../src/util';
import chai from 'chai';

let expect = chai.expect;

describe('todos reducer', () => {
  it('should return the initial state', () => {
    expect(counter(undefined, {})).to.deep.equal(initialState);
  });

  it('should draw a card from the availableCards and append to the current player\'s holding card', () => {
    let state = JSON.parse(JSON.stringify(initialState));
    let nextState = counter(state, {type: 'DRAW_CARD'});
    expect(getAvailableCardSize(nextState.availableCards.length)).to.equal(getAvailableCardSize(state.availableCards.length - 1));

    let nextStateHoldingCardLength = nextState.players[state.currentPlayerId - 1].holdingCards.length;
    let previousStateHoldingCardLength = state.players[state.currentPlayerId - 1].holdingCards.length;
    expect(nextStateHoldingCardLength).to.equal(previousStateHoldingCardLength + 1);
  });
});
