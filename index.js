
var store = Redux.createStore(Redux.combineReducers({counter}))
var valueEl = document.getElementById('value')
var valueE2 = document.getElementById('currentPlayerId')
var valueE3 = document.getElementById('playButton1')
var valueE4 = document.getElementById('playButton2')
var valueE5 = document.getElementById('status')
function render() {
  valueEl.innerHTML = store.getState().counter.counter.toString()
  valueE2.innerHTML = store.getState().counter.currentPlayerId.toString()
  if (store.getState().counter.gameEnds.winner === null && store.getState().counter.players[store.getState().counter.currentPlayerId - 1].holdingCards.length > 0) {
    valueE3.innerHTML = cardNames[store.getState().counter.players[store.getState().counter.currentPlayerId - 1].holdingCards[0].toString() - 1]
  }

  if (store.getState().counter.gameEnds.winner === null && store.getState().counter.players[store.getState().counter.currentPlayerId - 1].holdingCards.length > 1) {
    valueE4.innerHTML = cardNames[store.getState().counter.players[store.getState().counter.currentPlayerId - 1].holdingCards[1].toString() - 1]
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
}
render()
store.subscribe(render)
document.getElementById('increment')
  .addEventListener('click', function () {
    store.dispatch({ type: 'INCREMENT' })
  })
document.getElementById('decrement')
  .addEventListener('click', function () {
    store.dispatch({ type: 'DECREMENT' })
  })
document.getElementById('incrementIfOdd')
  .addEventListener('click', function () {
    if (store.getState() % 2 !== 0) {
      store.dispatch({ type: 'INCREMENT' })
    }
  })
document.getElementById('incrementAsync')
  .addEventListener('click', function () {
    setTimeout(function () {
      store.dispatch({ type: 'INCREMENT' })
    }, 1000)
  })
document.getElementById('incrementby2')
  .addEventListener('click', function () {
    store.dispatch({ type: 'INCREMENT', number: 2 });
    // console.log(store.getState());
  })
document.getElementById('playButton1')
  .addEventListener('click', function () {
    store.dispatch({ type: 'PLAY_CARD', cardToPlay: {cardId: store.getState().counter.players[store.getState().counter.currentPlayerId - 1].holdingCards[0], playAgainst: 2, guardGuess: -1} });
    store.dispatch({ type: 'DRAW_CARD', player: store.getState().counter.currentPlayerId});
    // console.log(store.getState());
  })
document.getElementById('playButton2')
  .addEventListener('click', function () {
    store.dispatch({ type: 'PLAY_CARD', cardToPlay: {cardId: store.getState().counter.players[store.getState().counter.currentPlayerId - 1].holdingCards[1], playAgainst: 2, guardGuess: -1} });
    store.dispatch({ type: 'DRAW_CARD', player: store.getState().counter.currentPlayerId});
    // console.log(store.getState());
  })
$('#restart').click(function() {
  console.log('Restart');
  store.dispatch({ type: 'RESTART'});
});
