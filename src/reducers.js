// var availableCards, currentPlayer, gameEnd;
// var playAgainst, cardsNotPlayedYet;
import { initialState, cardRank, cardNames } from './const';
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

function resolve(state, cardToPlay) {
  if (cardToPlay.cardId === 1 && checkNotDeadAndNotProtected(state, cardToPlay.playAgainst)) {
    if (cardToPlay.guardGuess === state.players[cardToPlay.playAgainst - 1].holdingCards[0]) {
      let nextState = Object.assign({}, state);
      nextState.players = setPlayerDead(nextState.players, cardToPlay.playAgainst);
      return nextState;
    } else {
      return state;
    }
  } else if (cardToPlay.cardId === 2 && checkNotDeadAndNotProtected(state, cardToPlay.playAgainst)) {
    let nextState = Object.assign({}, state);
    nextState.players = addSeenCards(nextState.players, nextState.currentPlayerId, {
      cardId: nextState.players[cardToPlay.playAgainst - 1].holdingCards[0],
      playerId: cardToPlay.playAgainst
    });
    return nextState;
  } else if (cardToPlay.cardId === 3 && checkNotDeadAndNotProtected(state, cardToPlay.playAgainst)) {
    let cardValue1 = state.players[state.currentPlayerId - 1].holdingCards[0];
    let cardValue2 = state.players[cardToPlay.playAgainst - 1].holdingCards[0];
    if (cardValue1 > cardValue2) {
      let nextState = Object.assign({}, state);
      nextState.players = setPlayerDead(state.players, cardToPlay.playAgainst);
      return nextState;
    } else if (cardValue1 < cardValue2) {
      let nextState = Object.assign({}, state);
      nextState.players = setPlayerDead(state.players, state.currentPlayerId);
      return nextState;
    } else {
      return state;
    }
  } else if (cardToPlay.cardId === 4) {
    return Object.assign({}, state, {
      players: Object.assign([], state.players, { [state.currentPlayerId - 1]: Object.assign({}, state.players[state.currentPlayerId - 1], {
        protected: true
      })})
    });
  } else if (cardToPlay.cardId === 5 && checkNotDeadAndNotProtected(state, cardToPlay.playAgainst)) {
    // Prince, Discard and draw
    let nextState = Object.assign({}, state);
    let cardToDiscard = state.players[cardToPlay.playAgainst - 1].holdingCards[0];
    nextState.players = discardCard(state.players, cardToPlay.playAgainst, cardToDiscard);
    nextState.players = addPlayedCard(nextState.players, cardToPlay.playAgainst, {
      cardId: cardToDiscard,
      playAgainst: -1,
      discarded: true
    });

    if (cardToDiscard === 8) {
      nextState.players = setPlayerDead(nextState.players, cardToPlay.playAgainst);
      return nextState;
    }

    if (getAvailableCardSize(state.availableCards) === 0) {
      // Give the hidden card to player
      nextState.players = addHoldingCards(nextState.players, cardToPlay.playAgainst, nextState.firstCard);
    } else {
      nextState = drawCardForPlayer(nextState, cardToPlay.playAgainst);
    }

    return nextState;
  } else if (cardToPlay.cardId === 6 && checkNotDeadAndNotProtected(state, cardToPlay.playAgainst)) {
    let nextState = Object.assign({}, state);
    let cardToSwap = nextState.players[state.currentPlayerId - 1].holdingCards[0];
    nextState.players = Object.assign([], nextState.players, {[state.currentPlayerId - 1]: Object.assign({}, state.players[state.currentPlayerId - 1], {
      holdingCards: [nextState.players[cardToPlay.playAgainst - 1].holdingCards[0]]
    })})
    nextState.players = Object.assign([], nextState.players, {[cardToPlay.playAgainst - 1]: Object.assign({}, state.players[cardToPlay.playAgainst - 1], {
      holdingCards: [cardToSwap]
    })})
    return nextState;
  } else if (cardToPlay.cardId === 8) {
    let nextState = Object.assign({}, state);
    nextState.players = setPlayerDead(state.players, state.currentPlayerId);
    return nextState;
  } else {
    return state;
  }
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