import { cardRank, cardNames } from './const';

var compareCards = function(card1, card2) {
  return cardRank[card2] - cardRank[card1];
}

function getLivingPlayerSize(players) {
  let result = 0;
  players.forEach(player => {
    if (!player.dead) {
      result++;
    }
  });
  return result;
}

function calculateWinner(players) {
  let winnerId = -1;
  players.forEach(player => {
    if (!player.dead) {
      if (winnerId == -1) {
        winnerId = player.id;
      } else {
        // console.log(`Comparing ${players[winnerId - 1].holdingCards[0]} with ${player.holdingCards[0]}`);
        if (players[winnerId - 1].holdingCards[0] < player.holdingCards[0]) {
          winnerId = player.id;
        }
      }
    }
  });

  return winnerId;
}

function getNonDeadNonProtectedPlayers(playerId, players) {
  let nonDeadNonProtectedPlayerList = [];
  players.forEach(player => {
    if (player.id != playerId && !player.protected && !player.dead) {
      nonDeadNonProtectedPlayerList.push(player.id);
    }
  });
  return nonDeadNonProtectedPlayerList;
}

function checkGameEnd(players, availableCards) {
  if (getAvailableCardSize(availableCards) <= 0 || getLivingPlayerSize(players) <= 1) {
    let winner = calculateWinner(players);
    return {'gameEnd': true, 'winner': winner};
  } else {
    return {'gameEnd': false, 'winner': -1};
  }
}

function getHighestNotYetAppearedCard(holdingCards, cardsNotPlayedYet) {
  // hodingCards[0, 1]
  for (let index = 7; index > 0; index--) {
    const cardName = cardNames[index];
    if (cardsNotPlayedYet[cardName] !== 0 && holdingCards.indexOf(cardName) === -1) {
      return cardName;
    }
  }

  return 'Priest';
}

// This function will return a random card index based on the availableCards passed in.
function getRandomCard(availableCards) {
  // Get the number of total cards
  let totalCards = getAvailableCardSize(availableCards);

  if (totalCards == 0) {
    return;
  }

  let randomCardNumber = Math.floor(Math.random() * totalCards);

  let temp = 0, drawedCard;
  for (var key in availableCards) {
    if (availableCards.hasOwnProperty(key)) {
      temp += availableCards[key];
      if (temp > randomCardNumber) {
        drawedCard = key;
        break;
      }
    }
  }

  return cardRank[drawedCard];
}

function nextPlayer(players, currentPlayerId) {
  // Next non dead player
  let totalPlayers = players.length;
  let nextPlayerIndex = currentPlayerId % totalPlayers;

  while (players[nextPlayerIndex].dead === true) {
    nextPlayerIndex = (nextPlayerIndex + 1) % totalPlayers;
  }

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

function resetProtection(players, currentPlayerId) {
  return Object.assign([], players, { [currentPlayerId - 1]: Object.assign({}, players[currentPlayerId - 1], {
    protected: false,
  })})
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
  let arr = Object.assign({}, previousState.availableCards);
  arr[cardNames[randomCardId - 1]]--;

  return Object.assign({}, previousState, {
    players: addHoldingCards(previousState.players, playerId, randomCardId),
    availableCards: arr
  });
}

function addPlayedCard(players, playerId, card) {
  let arr = Object.assign([], players[playerId - 1].playedCards);
  if (card.cardId === 4 || card.cardId === 7 || card.cardId === 8) {
    arr.push({
      cardId: card.cardId,
      playAgainst: -1,
      guardGuess: -1,
      discarded: card.discarded,
    });
  } else if (card.cardId !== 1) {
    arr.push({
      cardId: card.cardId,
      playAgainst: card.playAgainst,
      guardGuess: -1,
      discarded: card.discarded,
    });
  } else {
    arr.push(card);
  }

  return Object.assign([], players, {
    [playerId - 1]: Object.assign({}, players[playerId - 1], {
      playedCards: arr
    })
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

function checkNotDeadAndNotProtected(state, playerId) {
  return playerId > 0 && playerId < 5 && !state.players[playerId - 1].dead && !state.players[playerId - 1].protected;
}

function setPlayerDead(state, playerId) {
  return Object.assign({}, state, {
    players: Object.assign([], state.players, {
      [playerId - 1]: Object.assign({}, state.players[playerId - 1], {
        dead: true
      })
    })
  })
}

function addSeenCards(players, playerId, seenCard) {
  let arr = Object.assign([], players[playerId - 1].seenCards);
  arr.push(seenCard);
  return Object.assign([], players, {
    [playerId - 1]: Object.assign({}, players[playerId - 1], {
      seenCards: arr
    })
  });
}

export {
  compareCards,
  checkGameEnd,
  getRandomCard,
  getAvailableCardSize,
  getHighestNotYetAppearedCard,
  getNonDeadNonProtectedPlayers,
  getLivingPlayerSize,
  calculateWinner,
  nextPlayer,
  drawCard,
  resetProtection,
  discardCard,
  drawCardForPlayer,
  addPlayedCard,
  addHoldingCards,
  addSeenCards,
  setPlayerDead,
  checkNotDeadAndNotProtected,
};