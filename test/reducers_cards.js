import { counter } from '../src/reducers';
import { initialState } from '../src/const';
import { getAvailableCardSize } from '../src/util';
import chai from 'chai';

let expect = chai.expect;

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

  it('[Priest] should add a players hand to seen cards if played Priest against them', () => {
    let state = JSON.parse(JSON.stringify(initialState));
    state.players[0].holdingCards.push(2);
    state.players[0].holdingCards.push(3);
    state.players[1].holdingCards.push(8);
    let nextState = counter(state, {type: 'PLAY_CARD', cardToPlay: {cardId: 2, playAgainst: 2, guardGuess: -1}});

    expect(nextState.players[0].seenCards).to.be.an('array')
    expect(nextState.players[0].seenCards.length).to.equal(1)
    expect(nextState.players[0].seenCards[0]).to.deep.equal({cardId: 8, playerId: 2})
  })

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
