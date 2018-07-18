// var availableCards, currentPlayer, gameEnd;
// var playAgainst, cardsNotPlayedYet;
import { initialState, cardRank, cardNames } from './const';
import { getRandomCard, getLivingPlayerSize, calculateWinner } from './util';

function initGame(state) {
  // Draw cards
  return state;
}

function resolve(state, cardToPlay) {
  if (cardToPlay.cardId === 8) {
    return Object.assign({}, state, {
      players: Object.assign([], state.players, { [state.currentPlayerId - 1]: Object.assign({}, state.players[state.currentPlayerId - 1], {
        dead: true
      })})
    });
  } else if (cardToPlay.cardId === 4) {
    return Object.assign({}, state, {
      players: Object.assign([], state.players, { [state.currentPlayerId - 1]: Object.assign({}, state.players[state.currentPlayerId - 1], {
        protected: true
      })})
    });
  }
  return Object.assign({}, state, playAgainst(state, cardToPlay, state.currentPlayerId));
}

function playAgainst(state, cardToPlay, currentPlayerId) {
  if (cardToPlay.cardId === 5 && !state.players[cardToPlay.playAgainst - 1].dead && !state.players[cardToPlay.playAgainst - 1].protected) {
    // Discard and draw
    let nextState = Object.assign({}, state);
    let cardToDiscard = state.players[cardToPlay.playAgainst - 1].holdingCards[0];
    nextState.players = discardCard(state.players, cardToPlay.playAgainst, cardToDiscard);
    nextState.players = addPlayedCard(nextState.players, cardToPlay.playAgainst - 1, {
      cardId: cardToDiscard
    });
    nextState = drawCardForPlayer(nextState, cardToPlay.playAgainst);
    return nextState;
  }
  return state;
}

function nextPlayer(players, currentPlayerId) {
  // Next non dead player
  let totalPlayers = players.length;
  let nextPlayerIndex = currentPlayerId % totalPlayers;
  // console.log(players);

  // while (players[nextPlayerIndex].dead == true && nextPlayerIndex != currentPlayerId - 1) {
  while (nextPlayerIndex === currentPlayerId - 1) {
    nextPlayerIndex = (nextPlayerIndex + 1) % totalPlayers;
  }
  console.log(`Next Player ID: ${nextPlayerIndex}`);

  return players[nextPlayerIndex].id;
}

function getAvailableCardSize(availableCards) {
  let totalCards = 0;
  for (var key in availableCards) {
    if (availableCards.hasOwnProperty(key)) {
      totalCards += availableCards[key];
    }
  }
  return totalCards;
}

// discardCard(nextState, currentPlayerId, action.cardToPlay.cardId);
function discardCard(players, currentPlayerId, discardCard) {
  return players.map(function CB(player, index) {
    if (player.id === currentPlayerId) {
      let arr = Object.assign([], player.holdingCards);
      // Remove card.
      arr.splice(arr.indexOf(discardCard.cardId), 1);

      return Object.assign({}, player, {
        holdingCards: arr
      });
    } else {
      return player;
    }
  });
}

function drawCard(previousState) {
  return drawCardForPlayer(previousState, previousState.currentPlayerId);
}

function drawCardForPlayer(previousState, playerId) {
  let randomCardId = getRandomCard(previousState.availableCards);
  // Remove the cardDrew from availableCards
  let arr = Object.assign([], previousState.availableCards);
  arr[cardNames[randomCardId - 1]]--;

  return Object.assign({}, previousState, {
    players: addHoldingCards(previousState.players, playerId, randomCardId),
    availableCards: arr
  });
}

function addPlayedCard(players, playerId, card) {
  return players.map(function CB(player, index) {
    if (player.id !== playerId) {
      return player;
    } else {
      let arr = Object.assign([], player.playedCards);
      arr.push(card);
      return Object.assign({}, player, {
        playedCards: arr
      })
    }
  });
}

function addHoldingCards(players, playerId, card) {
  let arr = Object.assign([], players[playerId - 1].holdingCards);
  arr.push(card);
  return Object.assign([], players, {
    [playerId - 1]: Object.assign({}, players[playerId - 1], {
      holdingCards: arr
    })
  });
}

function counter(state, action) {
  if (typeof state === 'undefined' && action.type !== 'RESTART') {
    // return JSON.parse(JSON.stringify(initialState));
    // Clean up store state.
    let newState = JSON.parse(JSON.stringify(initialState));
    // Setup and draw cards.
    // Discard a card at the start of the game.
    let randomCardId = getRandomCard(newState.availableCards);
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
      if (action.cardId === 4 || action.cardId === 8) {
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
      // Check if game ends
      let gameEnds = checkGameEnd(nextState.players, nextState.availableCards);
      if (gameEnds.gameEnd) {
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
    console.log(players)
    let winnerId = calculateWinner(players);
    return {'gameEnd': true, 'winnerId': winnerId};
  } else {
    return {'gameEnd': false, 'winnerId': -1};
  }
}

export {
  counter
}