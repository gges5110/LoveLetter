// var availableCards, currentPlayer, gameEnd;
// var playAgainst, cardsNotPlayedYet;
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

function getRandomCard(availableCards) {
  // Get the number of total cards
  let totalCards = getAvailableCardSize(availableCards);

  console.log(`Total Cards: ${totalCards}`);
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

  console.log(`Card drawed: ${drawedCard}`);
  availableCards[drawedCard]--;
  return cardRank[drawedCard];
}

const cardRank = {
  'Guard': 1,
  'Priest': 2,
  'Baron': 3,
  'Handmaid': 4,
  'Prince': 5,
  'King': 6,
  'Countess': 7,
  'Princess': 8,
}

const cardNames = [
  'Guard',
  'Priest',
  'Baron',
  'Handmaid',
  'Prince',
  'King',
  'Countess',
  'Princess',
];

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
  let cardDrew = getRandomCard(previousState.availableCards);

  return Object.assign({}, previousState, {
    players: addHoldingCards(previousState.players, playerId, cardDrew)
  });
}

function addHoldingCards(players, playerId, card) {
  return players.map(function CB(player, index) {
  if (player.id !== playerId) {
      return player;
    } else {
      let arr = player.holdingCards;
      arr.push(card);
      return Object.assign({}, player, {
        holdingCards: arr
      })
    }
  });
}

function counter(state, action) {
  if (typeof state === 'undefined') {
    return {
      counter: 0,
      currentPlayerId: 1,
      players: [
        {
          id: 1,
          dead: false,
          holdingCards: [],
          playedCards: []
        },
        {
          id: 2,
          dead: false,
          holdingCards: [],
          playedCards: []
        },
        {
          id: 3,
          dead: false,
          holdingCards: [],
          playedCards: []
        },
        {
          id: 4,
          dead: false,
          holdingCards: [],
          playedCards: []
        }
      ],
      availableCards: {
        'Guard': 5,
        'Priest': 2,
        'Baron': 2,
        'Handmaid': 2,
        'Prince': 2,
        'King': 1,
        'Countess': 1,
        'Princess': 1,
      },
      gameEnds: {
        winner: null
      }
    };
  }

  switch (action.type) {
    case 'INCREMENT':
      if (action.number === undefined) {
        action.number = 1;
      }
      return Object.assign({}, state, {
        counter: state.counter + action.number
      });
    case 'DECREMENT':
      return Object.assign({}, state, {
        counter: state.counter - 1
      });
    case 'PLAY_CARD':
      let nextState = Object.assign({}, state);
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
      let newState = {
        counter: 0,
        currentPlayerId: 1,
        players: [
          {
            id: 1,
            dead: false,
            holdingCards: [],
            playedCards: []
          },
          {
            id: 2,
            dead: false,
            holdingCards: [],
            playedCards: []
          },
          {
            id: 3,
            dead: false,
            holdingCards: [],
            playedCards: []
          },
          {
            id: 4,
            dead: false,
            holdingCards: [],
            playedCards: []
          }
        ],
        availableCards: {
          'Guard': 5,
          'Priest': 2,
          'Baron': 2,
          'Handmaid': 2,
          'Prince': 2,
          'King': 1,
          'Countess': 1,
          'Princess': 1,
        },
        gameEnds: {
          winner: null
        }
      };
      // Setup and draw cards.
      // Discard a card at the start of the game.
      getRandomCard(newState.availableCards);

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

function getAvailableCardSize(availableCards) {
  let totalCards = 0;
  for (var key in availableCards) {
    if (availableCards.hasOwnProperty(key)) {
      totalCards += availableCards[key];
    }
  }
  return totalCards;
}

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
        if (compareCards(players[winnerId - 1].holdingCards[0], player.holdingCards[0]) > 0) {
          winnerId = player.id;
        }
      }
    }
  });

  return winnerId;
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