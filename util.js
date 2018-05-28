function getSize() {
  let totalCards = 0;
  for (var key in availableCards) {
    if (availableCards.hasOwnProperty(key)) {
      totalCards += availableCards[key];
    }
  }
  return totalCards;
}

function compareCards(card1, card2) {
  return cardRank[card2] - cardRank[card1];
}

function getLivingPlayerSize() {
  let result = 0;
  players.forEach(player => {
    if (!player.dead) {
      result++;
    }
  });
  return result;
}

function calculateWinner() {
  let winner = new player(-1);
  players.forEach(player => {
    if (!player.dead) {
      if (winner.number == -1) {
        winner = player;
      } else {
        if (compareCards(winner.cards[0], player.cards[0]) > 0) {
          winner = player;
        }
      }
    }
  });

  return winner;
}

function getNonDeadNonProtectedPlayers(caller) {
  let nonDeadNonProtectedPlayerList = [];
  players.forEach(player => {
    if (player.number != caller.number && !player.protected && !player.dead) {
      nonDeadNonProtectedPlayerList.push(player.number);
    }
  });
  return nonDeadNonProtectedPlayerList;
}

function checkGameEnd() {
  if (getSize() <= 0 || getLivingPlayerSize() <= 1) {
    let winner = calculateWinner();
    return {'gameEnd': true, 'winner': winner};
  } else {
    return {'gameEnd': false, 'winner': -1};
  }
}

function nextPlayer() {
  // Next non dead player
  let totalPlayers = players.length;
  let nextPlayerIndex = currentPlayer.number % totalPlayers;
  while (players[nextPlayerIndex].dead == true) {
    nextPlayerIndex = (nextPlayerIndex + 1) % totalPlayers;
  }
  return players[nextPlayerIndex];
}

function getHighestNotYetAppearedCard(holdingCards) {
  // hodingCards[0, 1]
  for (let index = 7; index > 0; index--) {
    const cardName = cardNames[index];
    if (cardsNotPlayedYet[cardName] !== 0 && holdingCards.indexOf(cardName) === -1) {
      return cardName;
    }
  }

  return 'Priest';
}

function getRandomCard() {
  // Get the number of total cards
  let totalCards = getSize();

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
  return drawedCard;
}