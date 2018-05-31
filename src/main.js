import Game from "./game";

var game;

$( document ).ready(function() {
  game = new Game();
  game.initailizeGame();
});

$('#restart').click(function() {
  game.restart();
})



