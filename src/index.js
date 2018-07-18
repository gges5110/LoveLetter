import { counter } from './reducers';
import { cardNames } from './const';
import { disablePlayButton, disablePlayAgainstButton, disableGuardGuessButton, enablePlayButton, enablePlayAgainstButton, enableGuardGuessButton } from './setButtonState';

var store = Redux.createStore(Redux.combineReducers({counter}));

function render() {
  $('#currentPlayerId').text(store.getState().counter.currentPlayerId.toString());
  let humanPlayerId = 0; // store.getState().counter.currentPlayerId - 1
  if (store.getState().counter.gameEnds.winner === null && store.getState().counter.players[humanPlayerId].holdingCards.length > 0) {
    $('#playButton1').text(cardNames[store.getState().counter.players[humanPlayerId].holdingCards[0].toString() - 1]);
  }

  if (store.getState().counter.gameEnds.winner === null && store.getState().counter.players[humanPlayerId].holdingCards.length > 1) {
    $('#playButton2').text(cardNames[store.getState().counter.players[humanPlayerId].holdingCards[1].toString() - 1]);
  } else {
    $('#playButton2').text('');
  }

  if (store.getState().counter.gameEnds.winner === null) {
    $(`#playerPlayedList1`).empty();
    $(`#playerPlayedList2`).empty();
    $(`#playerPlayedList3`).empty();
    $(`#playerPlayedList4`).empty();
    for (var i = 0; i < store.getState().counter.players[0].playedCards.length; ++i) {
      $(`#playerPlayedList1`).append(`<li class="item">${cardNames[store.getState().counter.players[0].playedCards[i].cardId - 1]}</li>`);
    }
    for (var i = 0; i < store.getState().counter.players[1].playedCards.length; ++i) {
      $(`#playerPlayedList2`).append(`<li class="item">${cardNames[store.getState().counter.players[1].playedCards[i].cardId - 1]}</li>`);
    }
    for (var i = 0; i < store.getState().counter.players[2].playedCards.length; ++i) {
      $(`#playerPlayedList3`).append(`<li class="item">${cardNames[store.getState().counter.players[2].playedCards[i].cardId - 1]}</li>`);
    }
    for (var i = 0; i < store.getState().counter.players[3].playedCards.length; ++i) {
      $(`#playerPlayedList4`).append(`<li class="item">${cardNames[store.getState().counter.players[3].playedCards[i].cardId - 1]}</li>`);
    }
  }

  if (store.getState().counter.gameEnds.winner !== null) {
    $('#status').text(`Winner is ${store.getState().counter.gameEnds.winner.id}`);
  } else {
    $('#status').text(`Player ${store.getState().counter.currentPlayerId}'s turn.`);
  }

  if (store.getState().counter.buttonStates.chooseCard) {
    enablePlayButton();
  } else {
    disablePlayButton();
  }

  if (store.getState().counter.buttonStates.playAgainst) {
    enablePlayAgainstButton(store.getState().counter.players);
  } else {
    disablePlayAgainstButton();
  }

  if (store.getState().counter.buttonStates.guardGuess) {
    enableGuardGuessButton();
  } else {
    disableGuardGuessButton();
  }
}
render()
store.subscribe(render)

$('#playButton1').on('click', function () {
  store.dispatch({type: 'CHOOSE_CARD', cardId: store.getState().counter.players[store.getState().counter.currentPlayerId - 1].holdingCards[0]});
  if (store.getState().counter.readyForNextTurn) {
    store.dispatch(
      {
        type: 'PLAY_CARD',
        cardToPlay: store.getState().counter.cardToPlay
      }
    );
    nextTurn();
  }
});

$('#playButton2').on('click', function () {
  store.dispatch({type: 'CHOOSE_CARD', cardId: store.getState().counter.players[store.getState().counter.currentPlayerId - 1].holdingCards[1]});
  if (store.getState().counter.readyForNextTurn) {
    store.dispatch(
      {
        type: 'PLAY_CARD',
        cardToPlay: store.getState().counter.cardToPlay
      }
    );
    nextTurn();
  }
});

$('#playAgainstButton1').on('click', function() {
  store.dispatch({type: 'PLAY_AGAINST', playAgainst: 1});
  if (store.getState().counter.readyForNextTurn) {
    store.dispatch(
      {
        type: 'PLAY_CARD',
        cardToPlay: store.getState().counter.cardToPlay
      }
    );
    nextTurn();
  }
});

$('#playAgainstButton2').on('click', function() {
  store.dispatch({type: 'PLAY_AGAINST', playAgainst: 2});
  if (store.getState().counter.readyForNextTurn) {
    store.dispatch(
      {
        type: 'PLAY_CARD',
        cardToPlay: store.getState().counter.cardToPlay
      }
    );
    nextTurn();
  }
});

$('#playAgainstButton3').on('click', function() {
  store.dispatch({type: 'PLAY_AGAINST', playAgainst: 3});
  if (store.getState().counter.readyForNextTurn) {
    store.dispatch(
      {
        type: 'PLAY_CARD',
        cardToPlay: store.getState().counter.cardToPlay
      }
    );
    nextTurn();
  }
});

$('#playAgainstButton4').on('click', function() {
  store.dispatch({type: 'PLAY_AGAINST', playAgainst: 4});
  if (store.getState().counter.readyForNextTurn) {
    console.log(store.getState().counter.cardToPlay);
    store.dispatch(
      {
        type: 'PLAY_CARD',
        cardToPlay: store.getState().counter.cardToPlay
      }
    );
    nextTurn();
  }
});

$('#guardGuessButton2').on('click', function() {
  store.dispatch({type: 'GUARD_GUESS', guardGuess: 2});
  if (store.getState().counter.readyForNextTurn) {
    store.dispatch(
      {
        type: 'PLAY_CARD',
        cardToPlay: store.getState().counter.cardToPlay
      }
    );
    nextTurn();
  }
});

$('#guardGuessButton3').on('click', function() {
  store.dispatch({type: 'GUARD_GUESS', guardGuess: 3});
  if (store.getState().counter.readyForNextTurn) {
    store.dispatch(
      {
        type: 'PLAY_CARD',
        cardToPlay: store.getState().counter.cardToPlay
      }
    );
    nextTurn();
  }
});

$('#guardGuessButton4').on('click', function() {
  store.dispatch({type: 'GUARD_GUESS', guardGuess: 4});
  if (store.getState().counter.readyForNextTurn) {
    store.dispatch(
      {
        type: 'PLAY_CARD',
        cardToPlay: store.getState().counter.cardToPlay
      }
    );
    nextTurn();
  }
});

$('#guardGuessButton5').on('click', function() {
  store.dispatch({type: 'GUARD_GUESS', guardGuess: 5});
  if (store.getState().counter.readyForNextTurn) {
    store.dispatch(
      {
        type: 'PLAY_CARD',
        cardToPlay: store.getState().counter.cardToPlay
      }
    );
    nextTurn();
  }
});

$('#guardGuessButton6').on('click', function() {
  store.dispatch({type: 'GUARD_GUESS', guardGuess: 6});
  if (store.getState().counter.readyForNextTurn) {
    store.dispatch(
      {
        type: 'PLAY_CARD',
        cardToPlay: store.getState().counter.cardToPlay
      }
    );
    nextTurn();
  }
});

$('#guardGuessButton7').on('click', function() {
  store.dispatch({type: 'GUARD_GUESS', guardGuess: 7});
  if (store.getState().counter.readyForNextTurn) {
    store.dispatch(
      {
        type: 'PLAY_CARD',
        cardToPlay: store.getState().counter.cardToPlay
      }
    );
    nextTurn();
  }
});

$('#guardGuessButton8').on('click', function() {
  store.dispatch({type: 'GUARD_GUESS', guardGuess: 8});
  if (store.getState().counter.readyForNextTurn) {
    store.dispatch(
      {
        type: 'PLAY_CARD',
        cardToPlay: store.getState().counter.cardToPlay
      }
    );
    nextTurn();
  }
});

function nextTurn() {
  if (store.getState().counter.gameEnds.winner !== null) {
    return;
  } else if (store.getState().counter.currentPlayerId !== 1) {
    // AI move
    // Disable buttons

    setTimeout(function() {
      // store.dispatch({type: 'AI_MOVE'});
      // TODO: randomly choose a card
      store.dispatch({ type: 'DRAW_CARD', player: store.getState().counter.currentPlayerId});
      store.dispatch({ type: 'PLAY_CARD', cardToPlay: {cardId: store.getState().counter.players[store.getState().counter.currentPlayerId - 1].holdingCards[1], playAgainst: 2, guardGuess: -1} });
      nextTurn();
    }, 1000);
  } else {
    store.dispatch({ type: 'DRAW_CARD', player: store.getState().counter.currentPlayerId});
    // Wait for human input
  }
}

$(document).ready(function() {
  nextTurn();
})

$('#restart').click(function() {
  console.log('Restart');
  store.dispatch({ type: 'RESTART'});
  nextTurn();
});
