import update from 'immutability-helper';
import {
  DISCARD_CARD, DRAW_CARD, PLAY_CARD, RESTART,
} from '../actions/index';
import { cardNames, initialState } from '../const';
import {
  addHoldingCards,
  addPlayedCard,
  addSeenCards,
  calculateWinner,
  checkNotDeadAndNotProtected,
  discardCard,
  drawCard,
  drawCardForPlayer,
  getAvailableCardSize,
  getLivingPlayerSize,
  getRandomCard,
  nextPlayer,
  resetProtection,
  setPlayerDead,
} from '../util';

function checkPlayable(state, playerId, cardId) {
  if (cardId !== 4 && cardId !== 8) {
    return checkNotDeadAndNotProtected(state, playerId);
  }
  return true;
}

function checkGameEnd(players, availableCards) {
  if (getAvailableCardSize(availableCards) <= 0 || getLivingPlayerSize(players) <= 1) {
    const winnerId = calculateWinner(players);
    return { gameEnd: true, winnerId };
  }
  return { gameEnd: false, winnerId: -1 };
}

function resolve(state, cardToPlay) {
  if (!checkPlayable(state, cardToPlay.target, cardToPlay.cardId)) {
    return state;
  }

  let nextState = Object.assign({}, state);

  switch (cardToPlay.cardId) {
    case 1:
      if (cardToPlay.guess === state.players[cardToPlay.target - 1].holdingCards[0]) {
        nextState.players = setPlayerDead(nextState.players, cardToPlay.target);
      }
      break;
    case 2:
      nextState.players = addSeenCards(nextState.players, nextState.currentPlayerId, {
        cardId: nextState.players[cardToPlay.target - 1].holdingCards[0],
        playerId: cardToPlay.target,
      });
      break;
    case 3: {
      const cardValue1 = state.players[state.currentPlayerId - 1].holdingCards[0];
      const cardValue2 = state.players[cardToPlay.target - 1].holdingCards[0];
      if (cardValue1 > cardValue2) {
        nextState.players = setPlayerDead(state.players, cardToPlay.target);
      } else if (cardValue1 < cardValue2) {
        nextState.players = setPlayerDead(state.players, state.currentPlayerId);
      }
      break;
    }
    case 4:
      return update(state, {
        players: {
          [state.currentPlayerId - 1]: {
            protected: {
              $set: true,
            },
          },
        },
      });
    case 5: {
      // Prince, Discard and draw
      const cardToDiscard = state.players[cardToPlay.target - 1].holdingCards[0];
      nextState.players = discardCard(state.players, cardToPlay.target, { cardId: cardToDiscard });
      nextState.players = addPlayedCard(nextState.players, cardToPlay.target, {
        cardId: cardToDiscard,
        target: null,
        guess: null,
        discarded: true,
      });

      if (cardToDiscard === 8) {
        nextState.players = setPlayerDead(nextState.players, cardToPlay.target);
      } else if (getAvailableCardSize(state.availableCards) === 0) {
        // Give the hidden card to player
        nextState.players = addHoldingCards(nextState.players, cardToPlay.target, nextState.firstCard);
      } else {
        nextState = drawCardForPlayer(nextState, cardToPlay.target);
      }
      break;
    }

    case 6:
      const cardToSwap = nextState.players[state.currentPlayerId - 1].holdingCards[0];
      nextState = update(nextState, {
        players: {
          [state.currentPlayerId - 1]: {
            holdingCards: {
              $set: [nextState.players[cardToPlay.target - 1].holdingCards[0]],
            },
          },
        },
      });

      nextState = update(nextState, {
        players: {
          [cardToPlay.target - 1]: {
            holdingCards: {
              $set: [cardToSwap],
            },
          },
        },
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


export default function (state, action) {
  if (typeof state === 'undefined') {
    // return JSON.parse(JSON.stringify(initialState));
    // Clean up store state.
    let newState = JSON.parse(JSON.stringify(initialState));
    // Setup and draw cards.
    // Discard a card at the start of the game.
    const randomCardId = getRandomCard(newState.availableCards);
    newState = Object.assign({}, newState, {
      firstCard: randomCardId,
    });
    newState.availableCards[cardNames[randomCardId - 1]]--;

    newState = drawCardForPlayer(newState, 1);
    newState = drawCardForPlayer(newState, 2);
    newState = drawCardForPlayer(newState, 3);
    newState = drawCardForPlayer(newState, 4);

    return newState;
  }

  switch (action.type) {
    case RESTART:
      // Clean up store state.
      let newState = JSON.parse(JSON.stringify(initialState));
      // Setup and draw cards.
      // Discard a card at the start of the game.
      const randomCardId = getRandomCard(newState.availableCards);
      newState = Object.assign({}, newState, {
        firstCard: randomCardId,
      });
      newState.availableCards[cardNames[randomCardId - 1]]--;

      newState = drawCardForPlayer(newState, 1);
      newState = drawCardForPlayer(newState, 2);
      newState = drawCardForPlayer(newState, 3);
      newState = drawCardForPlayer(newState, 4);

      return newState;
    case DRAW_CARD:
      return drawCard(state);
    case DISCARD_CARD: {
      const nextState = Object.assign({}, state);
      nextState.players = discardCard(nextState.players, nextState.currentPlayerId, action.card);
      return nextState;
    }
    case PLAY_CARD:
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
      const gameEnds = checkGameEnd(nextState.players, nextState.availableCards);
      if (gameEnds.gameEnd) {
        nextState.gameEnds.winner = nextState.players[gameEnds.winnerId - 1];
        nextState.buttonStates.chooseCard = false;
      }

      return nextState;
  }
  return state;
}
