import { counter } from './reducers';
import { cardNames } from './const';

var store = Redux.createStore(Redux.combineReducers({counter}))

function render() {
  $('#currentPlayerId').text(store.getState().counter.currentPlayerId.toString());
  if (store.getState().counter.gameEnds.winner === null && store.getState().counter.players[store.getState().counter.currentPlayerId - 1].holdingCards.length > 0) {
    $('#playButton1').text(cardNames[store.getState().counter.players[store.getState().counter.currentPlayerId - 1].holdingCards[0].toString() - 1]);
  }

  if (store.getState().counter.gameEnds.winner === null && store.getState().counter.players[store.getState().counter.currentPlayerId - 1].holdingCards.length > 1) {
    $('#playButton2').text(cardNames[store.getState().counter.players[store.getState().counter.currentPlayerId - 1].holdingCards[1].toString() - 1]);
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

$('#playButton1').on('click', function () {
    store.dispatch({ type: 'PLAY_CARD', cardToPlay: {cardId: store.getState().counter.players[store.getState().counter.currentPlayerId - 1].holdingCards[0], playAgainst: 2, guardGuess: -1} });
    store.dispatch({ type: 'DRAW_CARD', player: store.getState().counter.currentPlayerId});
    // console.log(store.getState());
  })
$('#playButton2').on('click', function () {
    store.dispatch({ type: 'PLAY_CARD', cardToPlay: {cardId: store.getState().counter.players[store.getState().counter.currentPlayerId - 1].holdingCards[1], playAgainst: 2, guardGuess: -1} });
    store.dispatch({ type: 'DRAW_CARD', player: store.getState().counter.currentPlayerId});
    // console.log(store.getState());
  })
$('#restart').click(function() {
  console.log('Restart');
  store.dispatch({ type: 'RESTART'});
});
