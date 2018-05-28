var players, availableCards, currentPlayer, gameEnd;
let cardToPlay;

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

$("#playAgainstButton1").click(function() {
  disablePlayAgainstButton();
  playedCard = players[0].humanPLay(cardToPlay, 1);

  // Resolve card action.
  resolve(players[0], playedCard);

  setNextTurn();
});

$("#playAgainstButton2").click(function() {
  disablePlayAgainstButton();
  playedCard = players[0].humanPLay(cardToPlay, 2);

  // Resolve card action.
  resolve(players[0], playedCard);

  setNextTurn();
});

$("#playAgainstButton3").click(function() {
  disablePlayAgainstButton();
  playedCard = players[0].humanPLay(cardToPlay, 3);

  // Resolve card action.
  resolve(players[0], playedCard);

  setNextTurn();
});

$("#playAgainstButton4").click(function() {
  disablePlayAgainstButton();
  playedCard = players[0].humanPLay(cardToPlay, 4);

  // Resolve card action.
  resolve(players[0], playedCard);

  setNextTurn();
});

function setNextTurn() {
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

$("#playButton1").click(function() {
  disablePlayButton();
  cardToPlay = 0;
  if (players[0].cards[cardToPlay] === 'Handmaid') {
    playedCard = players[0].humanPLay(cardToPlay, 1);

    // Resolve card action.
    resolve(players[0], playedCard);

    setNextTurn();
  } else {
    enablePlayAgainstButton();
  }
});

$("#playButton2").click(function() {
  disablePlayButton();
  cardToPlay = 1;
  if (players[0].cards[cardToPlay] === 'Handmaid') {
    playedCard = players[0].humanPLay(cardToPlay, 1);

    // Resolve card action.
    resolve(players[0], playedCard);

    setNextTurn();
  } else {
    enablePlayAgainstButton();
  }
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
  $("#status").text(`Player ${player.number}'s turn, ${getSize()} cards left.`);
  player.protected = false;
  player.draw();

  // Let the user pick one to play.
  if (player.number === 1) {
    // Player 1 is defualt to human player.
    enablePlayButton();
    $("#playButton1").text(`${player.cards[0]}`);
    $("#playButton2").text(`${player.cards[1]}`);
  } else {
    let playedCard = player.play();
    console.log(`Player ${player.number} played ${playedCard.card} against ${playedCard.against}`);

    // Resolve card action.
    resolve(player, playedCard);

    setNextTurn();
  }
}

function resolve(player, playedCard) {
  if (playedCard.card === 'Guard') {
    if (!players[playedCard.against - 1].protected &&  !players[playedCard.against - 1].dead) {
      if (players[playedCard.against - 1].cards[0] === playedCard.guess) {
        player.setPlayerDead();
      }
    }
  } else if (playedCard.card === 'Priest') {
    // TODO: create new player field to deal with card info for other players.
  } else if (playedCard.card === 'Baron') {
    if (!players[playedCard.against - 1].protected &&  !players[playedCard.against - 1].dead) {
      if (compareCards(player.cards[0], players[playedCard.against - 1].cards[0]) > 0) {
        player.setPlayerDead();
      } else if (compareCards(player.cards[0], players[playedCard.against - 1].cards[0]) < 0) {
        players[playedCard.against - 1].setPlayerDead();
      }
    }
  } else if (playedCard.card === 'Handmaid') {
    player.protected = true;
  } else if (playedCard.card === 'Princess') {
    player.setPlayerDead();
  } else if (playedCard.card === 'King') {
    if (!players[playedCard.against - 1].protected &&  !players[playedCard.against - 1].dead) {
      let temp = player.cards[0];
      player.cards[0] = players[playedCard.against - 1].cards[0];
      players[playedCard.against - 1].cards[0] = temp;
    }
  } else if (playedCard.card === 'Countess') {
    // TODO: enforce the rule for playing countess?
  } else if (playedCard.card === 'Prince') {
    if (!players[playedCard.against - 1].protected &&  !players[playedCard.against - 1].dead) {
      players[playedCard.against - 1].discard();
      players[playedCard.against - 1].draw();
    }
  }
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
  disablePlayAgainstButton();
  disableGuardGuessButton();

  players.forEach(element => {
    element.draw();
  });
  currentPlayer = players[0];
  gameEnd = false;
  startGame();
}