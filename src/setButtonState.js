function enableGuardGuessButton() {
  $("#guardGuessButton2").prop('disabled', false);
  $("#guardGuessButton3").prop('disabled', false);
  $("#guardGuessButton4").prop('disabled', false);
  $("#guardGuessButton5").prop('disabled', false);
  $("#guardGuessButton6").prop('disabled', false);
  $("#guardGuessButton7").prop('disabled', false);
  $("#guardGuessButton8").prop('disabled', false);
}

let disableGuardGuessButton = function() {
  $("#guardGuessButton2").prop('disabled', true);
  $("#guardGuessButton3").prop('disabled', true);
  $("#guardGuessButton4").prop('disabled', true);
  $("#guardGuessButton5").prop('disabled', true);
  $("#guardGuessButton6").prop('disabled', true);
  $("#guardGuessButton7").prop('disabled', true);
  $("#guardGuessButton8").prop('disabled', true);
}

function enablePlayAgainstButton(players) {
  for (let index = 1; index < 5; index++) {
    if (!players[index - 1].dead && !players[index - 1].protected) {
      $(`#playAgainstButton${index}`).prop('disabled', false);
    }
  }
}

var disablePlayAgainstButton = function() {
  $("#playAgainstButton1").prop('disabled', true);
  $("#playAgainstButton2").prop('disabled', true);
  $("#playAgainstButton3").prop('disabled', true);
  $("#playAgainstButton4").prop('disabled', true);
}

function enablePlayButton() {
  $("#playButton1").prop('disabled', false);
  $("#playButton2").prop('disabled', false);
}

function disablePlayButton() {
  $("#playButton1").prop('disabled', true);
  $("#playButton2").prop('disabled', true);
}

export {
  disablePlayAgainstButton,
  disableGuardGuessButton,
  disablePlayButton,
  enablePlayButton,
  enablePlayAgainstButton,
  enableGuardGuessButton,
};
