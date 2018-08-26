import { initialState, cardNames } from './const';
import {
  getRandomCard,
  getLivingPlayerSize,
  calculateWinner,
  nextPlayer,
  drawCard,
  resetProtection,
  discardCard,
  drawCardForPlayer,
  addPlayedCard,
  addSeenCards,
  getAvailableCardSize,
  setPlayerDead,
  checkNotDeadAndNotProtected,
  addHoldingCards } from './util';
import update from 'immutability-helper';

function checkPlayable(state, playerId, cardId) {
  if (cardId !== 4 && cardId !== 8) {
    return checkNotDeadAndNotProtected(state, playerId);
  } else {
    return true;
  }
}

function resolve(state, cardToPlay) {
  if (!checkPlayable(state, cardToPlay.playAgainst, cardToPlay.cardId)) {
    return state;
  }

  let nextState = Object.assign({}, state);

  switch (cardToPlay.cardId) {
    case 1:
      if (cardToPlay.guardGuess === state.players[cardToPlay.playAgainst - 1].holdingCards[0]) {
        nextState.players = setPlayerDead(nextState.players, cardToPlay.playAgainst);
      }
      break;
    case 2:
      nextState.players = addSeenCards(nextState.players, nextState.currentPlayerId, {
        cardId: nextState.players[cardToPlay.playAgainst - 1].holdingCards[0],
        playerId: cardToPlay.playAgainst
      });
      break;
    case 3:
      let cardValue1 = state.players[state.currentPlayerId - 1].holdingCards[0];
      let cardValue2 = state.players[cardToPlay.playAgainst - 1].holdingCards[0];
      if (cardValue1 > cardValue2) {
        nextState.players = setPlayerDead(state.players, cardToPlay.playAgainst);
      } else if (cardValue1 < cardValue2) {
        nextState.players = setPlayerDead(state.players, state.currentPlayerId);
      }
      break;
    case 4:
      return update(state, {
        players: {
          [state.currentPlayerId - 1]: {
            protected: {
              $set: true
            }
          }
        }
      });
    case 5:
      // Prince, Discard and draw
      let cardToDiscard = state.players[cardToPlay.playAgainst - 1].holdingCards[0];
      nextState.players = discardCard(state.players, cardToPlay.playAgainst, {cardId: cardToDiscard});
      nextState.players = addPlayedCard(nextState.players, cardToPlay.playAgainst, {
        cardId: cardToDiscard,
        playAgainst: -1,
        discarded: true
      });

      if (cardToDiscard === 8) {
        nextState.players = setPlayerDead(nextState.players, cardToPlay.playAgainst);
      } else {
        if (getAvailableCardSize(state.availableCards) === 0) {
          // Give the hidden card to player
          nextState.players = addHoldingCards(nextState.players, cardToPlay.playAgainst, nextState.firstCard);
        } else {
          nextState = drawCardForPlayer(nextState, cardToPlay.playAgainst);
        }
      }
      break;
    case 6:
      let cardToSwap = nextState.players[state.currentPlayerId - 1].holdingCards[0];
      nextState = update(nextState, {
        players: {
          [state.currentPlayerId - 1]: {
            holdingCards: {
              $set: [nextState.players[cardToPlay.playAgainst - 1].holdingCards[0]]
            }
          }
        }
      });

      nextState = update(nextState, {
        players: {
          [cardToPlay.playAgainst - 1]: {
            holdingCards: {
              $set: [cardToSwap]
            }
          }
        }
      });
      break;
    case 8:
      nextState.players = setPlayerDead(state.players, state.currentPlayerId);
      break;
    default:
      break;
  }

  return nextState;
}

function counter(state, action) {
  if (typeof state === 'undefined') {
    // return JSON.parse(JSON.stringify(initialState));
    // Clean up store state.
    let newState = JSON.parse(JSON.stringify(initialState));
    // Setup and draw cards.
    // Discard a card at the start of the game.
    let randomCardId = getRandomCard(newState.availableCards);
    newState = Object.assign({}, newState, {
      firstCard: randomCardId
    });
    newState.availableCards[cardNames[randomCardId - 1]]--;

    newState = drawCardForPlayer(newState, 1);
    newState = drawCardForPlayer(newState, 2);
    newState = drawCardForPlayer(newState, 3);
    newState = drawCardForPlayer(newState, 4);

    return newState;
  }

  switch (action.type) {
    case 'CHOOSE_CARD': {
      // TODO: based on selected card, decide if play against action is needed
      // If not then set readyForNextTurn to true
      let readyForNextTurn = false;
      let chooseCard = false;
      let guardGuess = true;
      if (action.cardId === 4 || action.cardId === 7 || action.cardId === 8) {
        readyForNextTurn = true;
        chooseCard = true;
        guardGuess = false;
      }
      return Object.assign({}, state, {
        buttonStates: Object.assign({}, state.buttonStates, {
          chooseCard: chooseCard,
          playAgainst: guardGuess,
        }),
        readyForNextTurn: readyForNextTurn,
        cardToPlay: Object.assign({}, state.cardToPlay, {
          cardId: action.cardId,
        })
      });
    }
    case 'PLAY_AGAINST': {
      let readyForNextTurn = false;
      let chooseCard = false;
      let guardGuess = true;
      if (state.cardToPlay.cardId !== 1) {
        readyForNextTurn = true;
        chooseCard = true;
        guardGuess = false;
      }
      return Object.assign({}, state, {
        buttonStates: Object.assign({}, state.buttonStates, {
          chooseCard: chooseCard,
          playAgainst: false,
          guardGuess: guardGuess,
        }),
        readyForNextTurn: readyForNextTurn,
        cardToPlay: Object.assign({}, state.cardToPlay, {
          playAgainst: action.playAgainst,
        })
      });
    }
    case 'GUARD_GUESS': {
      return Object.assign({}, state, {
        buttonStates: Object.assign({}, state.buttonStates, {
          chooseCard: true,
          guardGuess: false,
        }),
        readyForNextTurn: true,
        cardToPlay: Object.assign({}, state.cardToPlay, {
          guardGuess: action.guardGuess,
        })
      });
    }
    case 'DISCARD_CARD': {
      let nextState = Object.assign({}, state);
      nextState.players = discardCard(nextState.players, nextState.currentPlayerId, action.card);
      return nextState;
    }
    case 'PLAY_CARD':
      // Make a deep copy of the state object
      // let nextState = JSON.parse(JSON.stringify(state));
      let nextState = Object.assign({}, state);

      // TODO: Move all these into other reducer functions.
      // Remove holding cards
      nextState.players = discardCard(nextState.players, nextState.currentPlayerId, action.cardToPlay);
      // Add played Card
      nextState.players = addPlayedCard(nextState.players, nextState.currentPlayerId, action.cardToPlay);
      // Resolve
      nextState = resolve(nextState, action.cardToPlay);
      // Next Player
      nextState.currentPlayerId = nextPlayer(nextState.players, nextState.currentPlayerId);
      // Reset protected
      nextState.players = resetProtection(nextState.players, nextState.currentPlayerId);
      // Check if game ends
      let gameEnds = checkGameEnd(nextState.players, nextState.availableCards);
      if (gameEnds.gameEnd) {
        console.log('Game ended');
        nextState.gameEnds.winner = nextState.players[gameEnds.winnerId - 1];
        nextState.buttonStates.chooseCard = false;
      }

      return nextState;
    case 'DRAW_CARD':
      return drawCard(state);
    case 'RESTART':
      // Clean up store state.
      let newState = JSON.parse(JSON.stringify(initialState));
      // Setup and draw cards.
      // Discard a card at the start of the game.
      let randomCardId = getRandomCard(newState.availableCards);
      newState = Object.assign({}, newState, {
        firstCard: randomCardId
      });
      newState.availableCards[cardNames[randomCardId - 1]]--;

      newState = drawCardForPlayer(newState, 1);
      newState = drawCardForPlayer(newState, 2);
      newState = drawCardForPlayer(newState, 3);
      newState = drawCardForPlayer(newState, 4);

      return newState;
    default:
      return state
  }
}

function checkGameEnd(players, availableCards) {
  if (getAvailableCardSize(availableCards) <= 0 || getLivingPlayerSize(players) <= 1) {
    let winnerId = calculateWinner(players);
    return {'gameEnd': true, 'winnerId': winnerId};
  } else {
    return {'gameEnd': false, 'winnerId': -1};
  }
}

export {
  counter
}