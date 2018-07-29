import chai from 'chai';
import ReinforcementAI from '../src/AI/reinforcementAI';
import { initialState } from '../src/const';
import math from 'mathjs';

let expect = chai.expect;

describe('ReinforcementAI.public functions', () => {
  it('ReinforcementAI.initialize', () => {
    let reinforcementAI = new ReinforcementAI([2, 9, 8, 8], [8, 4, 7]);
    reinforcementAI.initialize();
    expect(reinforcementAI.QValueTable.length).to.equal(reinforcementAI.SASizeArr[0]);
    expect(reinforcementAI.QValueTable[0].length).to.equal(reinforcementAI.SASizeArr[1]);
    expect(reinforcementAI.QValueTable[0][0].length).to.equal(reinforcementAI.SASizeArr[2]);
  })

  it('ReinforcementAI.getBestAction', () => {
    let state = JSON.parse(JSON.stringify(initialState));
    state.players[1].playedCards.push({
      cardId: 3
    });
    state.players[1].dead = false;
    state.players[1].holdingCards.push(4);
    state.players[1].holdingCards.push(8);

    let reinforcementAI = new ReinforcementAI([2, 9, 8, 8], [8, 4, 7]);
    reinforcementAI.initialize();

    let card = reinforcementAI.getBestAction(state);
    expect(card.cardId).to.oneOf([4, 8]);
    expect(card.playAgainst).to.be.oneOf([1]);
    expect(card.guardGuess).to.be.oneOf([2, 3, 4, 5, 6, 7, 8]);
  })

  it('ReinforcementAI.learn', () => {
    let state = JSON.parse(JSON.stringify(initialState));
    state.players[1].playedCards.push({
      cardId: 3
    });
    state.players[1].dead = false;
    state.players[1].holdingCards.push(1);
    state.players[1].holdingCards.push(1);

    let reinforcementAI = new ReinforcementAI([2, 9, 8, 8], [8, 4, 7]);
    reinforcementAI.initialize();

    let card = reinforcementAI.getBestAction(state);
    expect(card.cardId).to.equal(1);
    expect(card.playAgainst).to.be.oneOf([2, 3, 4]);
    expect(card.guardGuess).to.be.oneOf([2, 3, 4, 5, 6, 7, 8]);

    reinforcementAI.learn(state);
  })
});


describe('ReinforcementAI.private functions', () => {
  it('SObjectToSVector', () => {
    let reinforcementAI = new ReinforcementAI([2, 9, 8, 8], [8, 4, 7]);
    let SVector = reinforcementAI.SObjectToSVector({
      player0dead: true,
      player0lastCardId: 7,
      player0holdingCard0: 6,
      player0holdingCard1: 1
    });

    expect(SVector).to.deep.equal([1, 6, 5, 0]);
  })

  it('generateActionVectors', () => {
    let reinforcementAI = new ReinforcementAI([2, 9, 8, 8], [8, 4, 7]);
    // let SVector = [1, 6, 5, 0];
    let player0holdingCard0 = 8;
    let playAgainst = [2, 3, 4];
    let guess = [2, 3, 4, 5, 6, 7, 8];
    let AVectors = reinforcementAI.generateActionVectors(player0holdingCard0, playAgainst, guess);
    expect(AVectors.length).to.equal(playAgainst.length * guess.length);
    expect(AVectors[0]).to.deep.equal([player0holdingCard0 - 1, playAgainst[0] - 1, guess[0] - 2]);
    expect(AVectors[1]).to.deep.equal([player0holdingCard0 - 1, playAgainst[0] - 1, guess[1] - 2]);
  })

  it('AVectorToActionObject', () => {
    let reinforcementAI = new ReinforcementAI([2, 9, 8, 8], [8, 4, 7]);
    // guardGuess [2, 3, 4, 5, 6, 7, 8]
    // action vec [0, 1, 2, 3, 4, 5, 6]
    let actionObject = reinforcementAI.AVectorToActionObject([0, 2, 6]);
    expect(actionObject.cardId).to.equal(1);
    expect(actionObject.playAgainst).to.equal(3);
    expect(actionObject.guardGuess).to.equal(8);
  });

  it('getMaxQValueSAVectorGivenSAVectors', () => {
    let reinforcementAI = new ReinforcementAI([2, 9, 8, 8], [8, 4, 7]);
    reinforcementAI.initialize();
    let SAVectors = [
      [0, 0, 0, 0, 0, 2, 5],
      [0, 0, 0, 0, 0, 2, 6],
    ]
    let SAVector = reinforcementAI.getMaxQValueSAVectorGivenSAVectors(SAVectors);
    expect(SAVector).to.deep.be.oneOf(SAVectors);
  });

  it('getQValue', () => {
    let reinforcementAI = new ReinforcementAI([2, 9, 8, 8], [8, 4, 7]);
    reinforcementAI.initialize();
    let qValue = reinforcementAI.getQValue([1, 8, 7, 7, 7, 3, 6]);
    expect(qValue).to.be.lessThan(1);
    expect(qValue).to.be.greaterThan(0);
  })

  it('combineSAVectors', () => {
    let SVector = [1, 6, 5, 1];
    let AVectors = [[2, 3, 4], [1, 2, 3]];
    let reinforcementAI = new ReinforcementAI([2, 9, 8, 8], [8, 4, 7]);
    expect(reinforcementAI.combineSAVectors(SVector, AVectors)).to.deep.equal([[1, 6, 5, 1, 2, 3, 4], [1, 6, 5, 1, 1, 2, 3]]);
  })

  it('SAVectorToActionObject', () => {
    let reinforcementAI = new ReinforcementAI([2, 9, 8, 8], [8, 4, 7]);
    expect(reinforcementAI.SAVectorToActionObject([0, 0, 0, 0, 0, 2, 5])).to.deep.equal({
      cardId: 1,
      playAgainst: 3,
      guardGuess: 7
    });
  })
});

describe('ReinforcementAI.utility functions', () => {
  it('mathjs.subset', () => {
    const b = [[0, 1], [2, 3]];
    expect(math.subset(b, math.index(1, 0))).to.deep.equal(2);
    let reinforcementAI = new ReinforcementAI([2, 9, 8, 8], [8, 4, 7]);
    reinforcementAI.initialize();
    let SAVectors = [
      [0, 0, 0, 0, 0, 2, 6],
      [0, 0, 0, 0, 0, 2, 7],
    ]
    // There's got to be a better way of doing this...
    expect(math.subset(reinforcementAI.QValueTable, reinforcementAI.convertSAVectorToMathIndex(SAVectors[0]))).to.lessThan(1);
    expect(math.subset(reinforcementAI.QValueTable, reinforcementAI.convertSAVectorToMathIndex(SAVectors[0]))).to.greaterThan(0);
  })
});
