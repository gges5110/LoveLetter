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