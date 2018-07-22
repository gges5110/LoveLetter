import Game from "./game";

var game;

$( document ).ready(function() {
  game = new Game();
  setupButtonEventListeners();
  game.restart();
});

$('#restart').click(function() {
  game.restart();
})

function setupButtonEventListeners() {
  for (let index = 0; index < 2; index++) {
    setPlayCardOnClick(index + 1);
  }

  for (let index = 0; index < 4; index++) {
    setPlayAgainstOnClick(index + 1);
  }

  for (let index = 1; index < 8; index++) {
    setGuardGuessOnClick(index + 1);
  }
}

function setPlayCardOnClick(index) {
  $(`#playButton${index}`).click(function() {
    game.playCardOnClick(index);
  });
}

function setPlayAgainstOnClick(index) {
  $(`#playAgainstButton${index}`).click(function() {
    game.playAgainstOnClick(index);
  });
}

function setGuardGuessOnClick(index) {
  $(`#guardGuessButton${index}`).click(function() {
    game.guardGuessOnClick(index);
  });
}


