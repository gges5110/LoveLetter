import { player } from './player.js';

var players, availableCards, currentPlayer, gameEnd;
let cardToPlay, playAgainst, cardsNotPlayedYet;

function startGame() {
  console.log('Start Game.');
  turn(currentPlayer);
}

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

function turn(player) {
  $("#status").text(`Player ${player.number}'s turn, ${getAvailableCardSize()} cards left.`);
  player.protected = false;
  player.draw();

  // Let the user pick one to play.
  if (player.number === 1) {
    // Player 1 is defualt to human player.
    enablePlayButton();
    $("#playButton1").text(`${player.cards[0]}`);
    $("#playButton2").text(`${player.cards[1]}`);
  } else {
    let playedCard = player.randomAI();
    console.log(`Player ${player.number} played ${playedCard.card} against ${playedCard.against}`);

    // Resolve card action.
    resolve(player, playedCard);
  }
}

function updatePlayedCard(player, playedCard) {
  if (playedCard.card === 'Handmaid' || playedCard.card === 'Countess') {
    $(`#playerPlayedList${player.number}`).append(`<li class="item">${playedCard.card}</li>`);
  } else if (playedCard.card === 'Guard') {
    $(`#playerPlayedList${player.number}`).append(`<li class="item">${playedCard.card} against ${playedCard.against}, guessing ${playedCard.guess}</li>`);
  } else {
    $(`#playerPlayedList${player.number}`).append(`<li class="item">${playedCard.card} against ${playedCard.against}</li>`);
  }
}

function resolve(player, playedCard) {
  updatePlayedCard(player, playedCard);

  if (playedCard.card === 'Guard') {
    if (!players[playedCard.against - 1].protected &&  !players[playedCard.against - 1].dead) {
      if (players[playedCard.against - 1].cards[0] === playedCard.guess) {
        players[playedCard.against - 1].setPlayerDead();
      }
    }
  } else if (playedCard.card === 'Priest') {
    // TODO: create new player field to deal with card info for other players.
    if (player.number === 1) {
      $("#priestList").append(`<li class="item">Player ${players[playedCard.against - 1].number} has ${players[playedCard.against - 1].cards[0]}</li>`);;
    }
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
      let discardedCard = players[playedCard.against - 1].discard();
      players[playedCard.against - 1].draw();
      if (discardedCard === 'Princess') {
        players[playedCard.against - 1].setPlayerDead();
      }
    }
  }

  setNextTurn();
}

function initailizeCards() {
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
  cardsNotPlayedYet = {
    'Guard': 5,
    'Priest': 2,
    'Baron': 2,
    'Handmaid': 2,
    'Prince': 2,
    'King': 1,
    'Countess': 1,
    'Princess': 1,
  }
}

/*
* playButton
*/
function setPlayCardOnClick(index) {
  $(`#playButton${index}`).click(function() {
    disablePlayButton();
    cardToPlay = index - 1;
    if (players[0].cards[cardToPlay] === 'Handmaid' || players[0].cards[cardToPlay] === 'Countess') {
      playedCard = players[0].play(cardToPlay, index, -1);

      // Resolve card action.
      resolve(players[0], playedCard);
    } else {
      enablePlayAgainstButton();
    }
  });
}

/*
* playAgainstButton
*/
function setPlayAgainstOnClick(index) {
  $(`#playAgainstButton${index}`).click(function() {
    disablePlayAgainstButton();
    playAgainst = index;
    if (players[0].cards[cardToPlay] !== 'Guard') {
      playedCard = players[0].play(cardToPlay, playAgainst, -1);

      // Resolve card action.
      resolve(players[0], playedCard);
    } else {
      enableGuardGuessButton();
    }
  });
}

/*
* guardGuessButton
*/
function setGuardGuessOnClick(index) {
  $(`#guardGuessButton${index}`).click(function() {
    disableGuardGuessButton();
    playedCard = players[0].play(cardToPlay, playAgainst, cardNames[index - 1]);

    // Resolve card action.
    resolve(players[0], playedCard);
  });
}

$('#restart').click(function() {
  restart();
})

function restart() {
  initailizeCards();
  getRandomCard(); // Remove a card from the top of the deck.
  disablePlayAgainstButton();
  disableGuardGuessButton();

  $("#priestList").empty();
  for (let index = 0; index < players.length; index++) {
    $(`#playerPlayedList${index + 1}`).empty();
    $(`#playerTitle${index + 1}`).removeClass();
    $(`#playerTitle${index + 1}`).text(`Player ${index + 1}`);
  }

  players.forEach(player => {
    player.reset();
    player.draw();
  });
  currentPlayer = players[0];
  gameEnd = false;
  startGame();
}

function initailizeGame() {
  players = [new player(1), new player(2), new player(3), new player(4)];

  for (let index = 0; index < players.length; index++) {
    setPlayAgainstOnClick(index + 1);
  }

  for (let index = 0; index < 2; index++) {
    setPlayCardOnClick(index + 1);
  }

  for (let index = 1; index < 8; index++) {
    setGuardGuessOnClick(index + 1);
  }

  restart();
}