import { counter } from '../src/reducers';
import { initialState } from '../src/const';
import { getAvailableCardSize } from '../src/util';
import chai from 'chai';

let expect = chai.expect;

describe('General Reducer', () => {
  it('should return the initial state'
    // , () => {
    //   expect(counter(undefined, {})).to.deep.equal(initialState);
    // }
  );

  it('shouldn\'t mutate the original state', () => {
    let state = {
      counter: 0
    };
    let nextState = Object.assign({}, state);
    nextState.counter = 1;
    expect(state.counter).to.equal(0);
  })

  it('should draw a card from the availableCards and append to the current player\'s holding card', () => {
    let state = JSON.parse(JSON.stringify(initialState));
    let nextState = counter(state, {type: 'DRAW_CARD'});
    expect(getAvailableCardSize(nextState.availableCards.length)).to.equal(getAvailableCardSize(state.availableCards.length - 1));

    let nextStateHoldingCardLength = nextState.players[state.currentPlayerId - 1].holdingCards.length;
    let previousStateHoldingCardLength = state.players[state.currentPlayerId - 1].holdingCards.length;
    expect(nextStateHoldingCardLength).to.equal(previousStateHoldingCardLength + 1);
  });

  it('should setup the game when RESTART action is dispatched', () => {
    let state = counter(undefined, {type: 'RESTART'});
    expect(getAvailableCardSize(state.availableCards)).to.equal(16 - 5);

    expect(state.players[0].holdingCards.length).to.equal(1);
    expect(state.players[1].holdingCards.length).to.equal(1);
    expect(state.players[2].holdingCards.length).to.equal(1);
    expect(state.players[3].holdingCards.length).to.equal(1);
  });

  it('should go to the next player once a card is played', () => {
    let state = counter(undefined, {type: 'RESTART'});
    let nextState = counter(state, {type: 'PLAY_CARD', cardToPlay: {cardId: state.players[state.currentPlayerId - 1].holdingCards[1], playAgainst: 2, guardGuess: -1}});

    // Should not mutate the previous state, check playedCards
    expect(state.players[state.currentPlayerId - 1].playedCards.length).to.equal(0);
    expect(nextState.currentPlayerId).to.equal(state.currentPlayerId + 1);
    expect(nextState.players[state.currentPlayerId - 1].playedCards.length).to.equal(state.players[state.currentPlayerId - 1].playedCards.length + 1);
    expect(nextState.players[state.currentPlayerId - 1].playedCards[0].cardId).to.equal(state.players[state.currentPlayerId - 1].holdingCards[1]);
    expect(nextState.players[state.currentPlayerId - 1].playedCards[0].playAgainst).to.equal(2);
  });

  it('should discard the played card');
  it('should skip players turn if they are dead', () => {
    let state = JSON.parse(JSON.stringify(initialState));
    state.currentPlayerId = 4;
    state.players[0].dead = true;
    state.players[3].holdingCards.push(4);
    let nextState = counter(state, {type: 'PLAY_CARD', cardToPlay: {cardId: state.players[3].holdingCards[0], playAgainst: -1, guardGuess: -1}});
    expect(nextState.currentPlayerId).to.equal(2);
  })
  it('should end the game when there are no cards left');

  it('should decide the right winner when the game ends', () => {
    let state = JSON.parse(JSON.stringify(initialState));
    state.players[0].holdingCards.push(1);
    state.players[1].holdingCards.push(2);
    state.players[2].holdingCards.push(3);
    state.players[3].holdingCards.push(4);
    state.players[3].holdingCards.push(7);
    state.availableCards = {
      'Guard': 0,
      'Priest': 0,
      'Baron': 0,
      'Handmaid': 0,
      'Prince': 0,
      'King': 0,
      'Countess': 0,
      'Princess': 0,
    }
    state.currentPlayerId = 4;
    let nextState = counter(state, {type: 'PLAY_CARD', cardToPlay: {cardId: state.players[3].holdingCards[0], playAgainst: -1, guardGuess: -1}});
    expect(nextState.gameEnds.winner).to.not.equal(null);
    expect(nextState.gameEnds.winner.id).to.equal(4);
  });
});

describe('Card Resolution', () => {
  it('[General] should not be able to play a card against a dead player');
  it('[General] should not be able to play a card against a protected player');

  it('[Guard] should die when a player guessed the right card', () => {
    let state = JSON.parse(JSON.stringify(initialState));
    state.players[0].holdingCards.push(1);
    state.players[0].holdingCards.push(3);
    state.players[1].holdingCards.push(8);
    let nextState = counter(state, {type: 'PLAY_CARD', cardToPlay: {cardId: 1, playAgainst: 2, guardGuess: 8}});

    expect(nextState.players[0].dead).to.equal(false);
    expect(nextState.players[1].dead).to.equal(true);
  });
  // TODO: test priest card play.
  it('[Baron] should compare cards and set the lower rank loser dead', () => {
    let state = JSON.parse(JSON.stringify(initialState));
    state.players[0].holdingCards.push(1);
    state.players[0].holdingCards.push(3);
    state.players[1].holdingCards.push(8);
    let nextState = counter(state, {type: 'PLAY_CARD', cardToPlay: {cardId: 3, playAgainst: 2, guardGuess: -1}});

    expect(nextState.players[0].dead).to.equal(true);
    expect(nextState.players[1].dead).to.equal(false);
  });
  it('[Handmaid] should set current player as protected');
  it('[Prince] should make a player discard a card', () => {
    let state = JSON.parse(JSON.stringify(initialState));
    state.players[0].holdingCards.push(5);
    state.players[1].holdingCards.push(2);
    let nextState = counter(state, {type: 'PLAY_CARD', cardToPlay: {cardId: 5, playAgainst: 2, guardGuess: -1}});

    expect(nextState.players[1].playedCards).to.be.a('array');
    expect(nextState.players[1].playedCards.length).to.equal(1);
    expect(nextState.players[1].playedCards[0]).to.deep.equal({cardId: 2, discarded: true, guardGuess: -1, playAgainst: -1})
  });
  it('[Prince] should draw the first card of the game if there are no cards left in the deck');
  it('[King] should swap hands with another player', () => {
    let state = JSON.parse(JSON.stringify(initialState));
    state.players[0].holdingCards.push(3);
    state.players[0].holdingCards.push(6);
    state.players[1].holdingCards.push(8);
    let nextState = counter(state, {type: 'PLAY_CARD', cardToPlay: {cardId: 6, playAgainst: 2, guardGuess: -1}});

    expect(nextState.players[0].holdingCards).to.be.a('array');
    expect(nextState.players[0].holdingCards.length).to.equal(1);
    expect(nextState.players[0].holdingCards[0]).to.deep.equal(8);

    expect(nextState.players[1].holdingCards).to.be.a('array');
    expect(nextState.players[1].holdingCards.length).to.equal(1);
    expect(nextState.players[1].holdingCards[0]).to.deep.equal(3);
  });
  it('[Countess] should check if the other card isn\'t Prince or King');
  it('[Princess] should die when a player plays Princess', () => {
    let state = JSON.parse(JSON.stringify(initialState));
    state.players[0].holdingCards.push(8);
    let nextState = counter(state, {type: 'PLAY_CARD', cardToPlay: {cardId: 8, playAgainst: -1, guardGuess: -1}});

    expect(nextState.players[0].dead).to.equal(true);
  });

  it('[Princess] player should die when being forced to discard princess with prince', () => {
    let state = JSON.parse(JSON.stringify(initialState));
    state.players[0].holdingCards.push(5);
    state.players[1].holdingCards.push(8);
    let nextState = counter(state, {type: 'PLAY_CARD', cardToPlay: {cardId: 5, playAgainst: 2, guardGuess: -1}});

    expect(nextState.players[1].playedCards).to.be.a('array');
    expect(nextState.players[1].playedCards.length).to.equal(1);
    expect(nextState.players[1].playedCards[0]).to.deep.equal({cardId: 8, discarded: true, guardGuess: -1, playAgainst: -1})
    expect(nextState.players[1].dead).to.equal(true);
  })
})
