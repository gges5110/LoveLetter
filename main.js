// Game loop
function player(number) {
  this.number = number;
  this.dead = false;
  this.protected = false;
  this.cards = [];
  this.draw = function() {
    console.log(`Draw a card for player ${this.number}`);
    this.cards.push(getRandomCard());
  }

  this.showHand = function() {
    $(`#playerTitle${this.number}`).append(` - ${this.cards[0]}`);
  }

  this.setPlayerDead = function() {
    this.dead = true;
    $(`#playerTitle${this.number}`).attr("class","playerDead");
    $(`#playerTitle${this.number}`).append(` - ${this.cards[0]}`);
  }

  this.play = function() {
    let cardIndex = Math.floor(Math.random() * 2);
    let card = this.cards[cardIndex];
    // TODO: Play against random non dead/non protected person.
    let against = this.number % 4 + 1;
    let getNonDeadNonProtectedPlayerList = getNonDeadNonProtectedPlayers(this);
    if (getNonDeadNonProtectedPlayerList.length == 0) {
      // The player is the winner.
    } else {
      // Randomly select one player to play the card against.
      let randomPlayerIndex = Math.floor(Math.random() * getNonDeadNonProtectedPlayerList.length);
      against = getNonDeadNonProtectedPlayerList[randomPlayerIndex];
    }
    $(`#playerPlayedList${this.number}`).append(`<li>${card} against ${against}</li>`);
    this.cards.splice(cardIndex, 1);
    return {'card': card, 'against': against};
  }

  this.humanPLay = function(cardIndex, against) {
    let card = this.cards[cardIndex];
    $(`#playerPlayedList${this.number}`).append(`<li>${card} against ${against}</li>`);
    this.cards.splice(cardIndex, 1);
    return {'card': card, 'against': against};
  }

  this.discard = function() {
    console.log(`Player ${this.number} discarded a card.`);
    if (this.cards[0] === 'Princess') {
      this.setPlayerDead();
    }
    // TODO: if played against itself, need to discard the right one.
    $(`#playerPlayedList${this.number}`).append(`<li class="discard">${this.cards[0]}</li>`);
    this.cards = [];
  }
}

var players, availableCards;
var currentPlayer, gameEnd;

function getNonDeadNonProtectedPlayers(caller) {
  let nonDeadNonProtectedPlayerList = [];
  players.forEach(player => {
    if (player.number != caller.number && !player.protected && !player.dead) {
      nonDeadNonProtectedPlayerList.push(player.number);
    }
  });
  return nonDeadNonProtectedPlayerList;
}

function startGame() {
  console.log('Start Game.');
  turn(currentPlayer);
}

$("#playButton1").click(function() {
  playedCard = players[0].humanPLay(0, 2);

  // Resolve card action.
  resolve(players[0], playedCard);

  setTimeout(() => {
    gameEnd = checkGameEnd();
    if (gameEnd.gameEnd === false) {
      currentPlayer = nextPlayer();
      turn(currentPlayer);
    } else {
      endGame();
      return;
    }
  }, 1000);
});

$("#playButton2").click(function() {
  playedCard = players[0].humanPLay(1, 2);

  // Resolve card action.
  resolve(players[0], playedCard);

  setTimeout(() => {
    gameEnd = checkGameEnd();
    if (gameEnd.gameEnd === false) {
      currentPlayer = nextPlayer();
      turn(currentPlayer);
    } else {
      endGame();
      return;
    }
  }, 1000);
});

function endGame() {
  $("#status").text(`Game ended, winner is ${gameEnd.winner.number}`);
  players.forEach(player => {
    if (!player.dead) {
      player.showHand();
    }

    if (player.number === gameEnd.winner.number) {
      $(`#playerTitle${player.number}`).attr("class","playerWin");
    }
  });
}

function turn(player) {
  $("#status").text(`Player ${player.number}'s turn`);
  player.protected = false;
  player.draw();

  // Let the user pick one to play.
  if (player.number === 1) {
    // Player 1 is defualt to human player.
    $("#playButton1").text(`${player.cards[0]}`);
    $("#playButton2").text(`${player.cards[1]}`);
  } else {
    let playedCard = player.play();
    console.log(`Player ${player.number} played ${playedCard.card} against ${playedCard.against}`);

    // Resolve card action.
    resolve(player, playedCard);

    setTimeout(() => {
      gameEnd = checkGameEnd();
      if (gameEnd.gameEnd === false) {
        currentPlayer = nextPlayer();
        turn(currentPlayer);
      } else {
        endGame();
        return;
      }
    }, 1000);
  }
}

function resolve(player, playedCard) {
  if (playedCard.card === 'Princess') {
    player.setPlayerDead();
  } else if (playedCard.card === 'Prince') {
    if (!players[playedCard.against - 1].protected &&  !players[playedCard.against - 1].dead) {
      players[playedCard.against - 1].discard();
      players[playedCard.against - 1].draw();
    }
  } else if (playedCard.card === 'Handmaid') {
    player.protected = true;
  } else if (playedCard.card === 'King') {
    if (!players[playedCard.against - 1].protected &&  !players[playedCard.against - 1].dead) {
      let temp = player.cards[0];
      player.cards[0] = players[playedCard.against - 1].cards[0];
      players[playedCard.against - 1].cards[0] = temp;
    }
  } else if (playedCard.card === 'Baron') {
    if (!players[playedCard.against - 1].protected &&  !players[playedCard.against - 1].dead) {
      if (compareCards(player.cards[0], players[playedCard.against - 1].cards[0]) > 0) {
        player.setPlayerDead();
      } else if (compareCards(player.cards[0], players[playedCard.against - 1].cards[0]) < 0) {
        players[playedCard.against - 1].setPlayerDead();
      }
    }
  }
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

function compareCards(card1, card2) {
  return cardRank[card2] - cardRank[card1];
}

function checkGameEnd() {
  if (getSize() <= 0) {
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

function getSize() {
  let totalCards = 0;
  for (var key in availableCards) {
    if (availableCards.hasOwnProperty(key)) {
      totalCards += availableCards[key];
    }
  }
  return totalCards;
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

function initailizeGame() {
  availableCards = {
    'Guard': 5,
    'Priest': 2,
    'Baron': 2,
    'Handmaid': 2,
    'Prince': 2,
    'King': 1,
    'Countess': 1,
    'Princess': 1,
  };
  players = [new player(1), new player(2), new player(3), new player(4)];
  getRandomCard(); // Remove a card from the top of the deck.
  players.forEach(element => {
    element.draw();
  });
  currentPlayer = players[0];
  gameEnd = false;
  startGame();
}