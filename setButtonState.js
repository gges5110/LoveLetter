function enableGuardGuessButton() {
  $("#guardGuessButton2").prop('disabled', false);
  $("#guardGuessButton3").prop('disabled', false);
  $("#guardGuessButton4").prop('disabled', false);
  $("#guardGuessButton5").prop('disabled', false);
  $("#guardGuessButton6").prop('disabled', false);
  $("#guardGuessButton7").prop('disabled', false);
  $("#guardGuessButton8").prop('disabled', false);
}

function disableGuardGuessButton() {
  $("#guardGuessButton2").prop('disabled', true);
  $("#guardGuessButton3").prop('disabled', true);
  $("#guardGuessButton4").prop('disabled', true);
  $("#guardGuessButton5").prop('disabled', true);
  $("#guardGuessButton6").prop('disabled', true);
  $("#guardGuessButton7").prop('disabled', true);
  $("#guardGuessButton8").prop('disabled', true);
}

function enablePlayAgainstButton() {
  $("#playAgainstButton1").prop('disabled', false);
  $("#playAgainstButton2").prop('disabled', false);
  $("#playAgainstButton3").prop('disabled', false);
  $("#playAgainstButton4").prop('disabled', false);
}

function disablePlayAgainstButton() {
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
