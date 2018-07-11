// var availableCards, currentPlayer, gameEnd;
// var playAgainst, cardsNotPlayedYet;
import { initialState, cardRank, cardNames } from './const';
import { getRandomCard, getLivingPlayerSize, calculateWinner } from './util';

function initGame(state) {
  // Draw cards
  return state;
}

function resolve(state, action) {
  return Object.assign({}, state, {
      players: playAgainst(state.players, action, state.currentPlayerId),
      currentPlayerId: nextPlayer(state.players, state.currentPlayerId),
    }
  );
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

function playAgainst(players, action, currentPlayerId) {
  return players.map(function CB(player, index) {
    // if (player.id !== action.cardToPlay.playAgainst && player.id !== currentPlayerId) {
    //   return player;
    // } else {
    //   return Object.assign({}, player, {
    //     dead: !player.dead
    //   });
    // }
    return player;
  });
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
  let player = players[currentPlayerId - 1];
  // Remove card.
  let arr = player.holdingCards;
  let idx = arr.indexOf(discardCard.cardId);
  arr.splice(idx, 1);
  player.playedCards.push(discardCard);
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

function addHoldingCards(players, playerId, card) {
  return players.map(function CB(player, index) {
  if (player.id !== playerId) {
      return player;
    } else {
      let arr = Object.assign([], player.holdingCards);
      arr.push(card);
      return Object.assign({}, player, {
        holdingCards: arr
      })
    }
  });
}

function counter(state, action) {
  if (typeof state === 'undefined' && action.type !== 'RESTART') {
    return JSON.parse(JSON.stringify(initialState));
  }

  switch (action.type) {
    case 'PLAY_CARD':
      // Make a deep copy of the state object
      let nextState = JSON.parse(JSON.stringify(state));
      // Remove holding cards
      discardCard(nextState.players, nextState.currentPlayerId, action.cardToPlay);

      // Resolve
      nextState = resolve(nextState, action);
      // Check if game ends
      let gameEnds = checkGameEnd(nextState.players, nextState.availableCards);
      if (gameEnds.gameEnd) {
        nextState.gameEnds.winner = nextState.players[gameEnds.winnerId - 1];
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
      // Draw a card for the starting player
      newState = drawCard(newState);

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