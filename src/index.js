import { counter } from './reducers';
import { cardNames } from './const';
import actions from './actions';
import { disablePlayButton, disablePlayAgainstButton, disableGuardGuessButton, enablePlayButton, enablePlayAgainstButton, enableGuardGuessButton } from './setButtonState';
import { getAvailableCardSize } from './util';

var store = Redux.createStore(Redux.combineReducers({counter}),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

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
      renderPlayedCards(0, i);
    }
    for (var i = 0; i < store.getState().counter.players[1].playedCards.length; ++i) {
      renderPlayedCards(1, i);
    }
    for (var i = 0; i < store.getState().counter.players[2].playedCards.length; ++i) {
      renderPlayedCards(2, i);
    }
    for (var i = 0; i < store.getState().counter.players[3].playedCards.length; ++i) {
      renderPlayedCards(3, i);
    }
  }

  $('#priestList').empty();
  for (let i = 0; i < store.getState().counter.players[0].seenCards.length; ++i) {
    $('#priestList').append(`<li class="item">Player ${store.getState().counter.players[0].seenCards[i].playerId} has ${cardNames[store.getState().counter.players[0].seenCards[i].cardId - 1]}</li>`);
  }

  for (let i = 0; i < 4; ++i) {
    $(`#playerTitle${i + 1}`).removeClass("playerProtected");
    $(`#playerTitle${i + 1}`).removeClass("playerDead");
    $(`#playerTitle${i + 1}`).removeClass("playerWin");
  }

  for (let i = 0; i < 4; ++i) {
    if (store.getState().counter.players[i].dead) {
      $(`#playerTitle${i + 1}`).attr("class","playerDead");
      $(`#playerTitle${i + 1}`).text(`Player ${i + 1} - ${cardNames[store.getState().counter.players[i].holdingCards[0] - 1]}`);
    } else {
      $(`#playerTitle${i + 1}`).text(`Player ${i + 1}`);
    }
  }

  for (let i = 0; i < 4; ++i) {
    if (store.getState().counter.players[i].protected) {
      $(`#playerTitle${i + 1}`).attr("class","playerProtected");
    }
  }

  if (store.getState().counter.gameEnds.winner !== null) {
    $('#status').text(`Winner is ${store.getState().counter.gameEnds.winner.id}`);
    $(`#playerTitle${store.getState().counter.gameEnds.winner.id}`).attr("class","playerWin");
    for (var i = 0; i < 4; ++i) {
      if (!store.getState().counter.players[i].dead) {
        $(`#playerTitle${i + 1}`).text(`Player ${i + 1} - ${cardNames[store.getState().counter.players[i].holdingCards[0] - 1]}`);
      }
    }
  } else {
    $('#status').text(`Player ${store.getState().counter.currentPlayerId}'s turn. ${getAvailableCardSize(store.getState().counter.availableCards)} cards left`);
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

function renderPlayedCards(playerId, cardIdx) {
  let string = cardNames[store.getState().counter.players[playerId].playedCards[cardIdx].cardId - 1];
  if (store.getState().counter.players[playerId].playedCards[cardIdx].discarded !== undefined) {
    $(`#playerPlayedList${playerId + 1}`).append(`<li class="item discard">${string}</li>`);
  } else {
    if (store.getState().counter.players[playerId].playedCards[cardIdx].playAgainst !== -1) {
      string += ' play against ' + store.getState().counter.players[playerId].playedCards[cardIdx].playAgainst;
    }
    if (store.getState().counter.players[playerId].playedCards[cardIdx].guardGuess !== -1) {
      string += ', guessing ' + cardNames[store.getState().counter.players[playerId].playedCards[cardIdx].guardGuess - 1];
    }
    $(`#playerPlayedList${playerId + 1}`).append(`<li class="item">${string}</li>`);
  }
}
render()
store.subscribe(render)

$('#playButton1').on('click', function () {
  store.dispatch({type: 'CHOOSE_CARD', cardId: store.getState().counter.players[store.getState().counter.currentPlayerId - 1].holdingCards[0]});
  if (store.getState().counter.readyForNextTurn) {
    store.dispatch(actions.playCard(store.getState().counter.cardToPlay));
    nextTurn();
  }
});

$('#playButton2').on('click', function () {
  store.dispatch({type: 'CHOOSE_CARD', cardId: store.getState().counter.players[store.getState().counter.currentPlayerId - 1].holdingCards[1]});
  if (store.getState().counter.readyForNextTurn) {
    store.dispatch(actions.playCard(store.getState().counter.cardToPlay));
    nextTurn();
  }
});

$('#playAgainstButton1').on('click', function() {
  store.dispatch({type: 'PLAY_AGAINST', playAgainst: 1});
  if (store.getState().counter.readyForNextTurn) {
    store.dispatch(actions.playCard(store.getState().counter.cardToPlay));
    nextTurn();
  }
});

$('#playAgainstButton2').on('click', function() {
  store.dispatch({type: 'PLAY_AGAINST', playAgainst: 2});
  if (store.getState().counter.readyForNextTurn) {
    store.dispatch(actions.playCard(store.getState().counter.cardToPlay));
    nextTurn();
  }
});

$('#playAgainstButton3').on('click', function() {
  store.dispatch({type: 'PLAY_AGAINST', playAgainst: 3});
  if (store.getState().counter.readyForNextTurn) {
    store.dispatch(actions.playCard(store.getState().counter.cardToPlay));
    nextTurn();
  }
});

$('#playAgainstButton4').on('click', function() {
  store.dispatch({type: 'PLAY_AGAINST', playAgainst: 4});
  if (store.getState().counter.readyForNextTurn) {
    store.dispatch(actions.playCard(store.getState().counter.cardToPlay));
    nextTurn();
  }
});

$('#guardGuessButton2').on('click', function() {
  store.dispatch({type: 'GUARD_GUESS', guardGuess: 2});
  if (store.getState().counter.readyForNextTurn) {
    store.dispatch(actions.playCard(store.getState().counter.cardToPlay));
    nextTurn();
  }
});

$('#guardGuessButton3').on('click', function() {
  store.dispatch({type: 'GUARD_GUESS', guardGuess: 3});
  if (store.getState().counter.readyForNextTurn) {
    store.dispatch(actions.playCard(store.getState().counter.cardToPlay));
    nextTurn();
  }
});

$('#guardGuessButton4').on('click', function() {
  store.dispatch({type: 'GUARD_GUESS', guardGuess: 4});
  if (store.getState().counter.readyForNextTurn) {
    store.dispatch(actions.playCard(store.getState().counter.cardToPlay));
    nextTurn();
  }
});

$('#guardGuessButton5').on('click', function() {
  store.dispatch({type: 'GUARD_GUESS', guardGuess: 5});
  if (store.getState().counter.readyForNextTurn) {
    store.dispatch(actions.playCard(store.getState().counter.cardToPlay));
    nextTurn();
  }
});

$('#guardGuessButton6').on('click', function() {
  store.dispatch({type: 'GUARD_GUESS', guardGuess: 6});
  if (store.getState().counter.readyForNextTurn) {
    store.dispatch(actions.playCard(store.getState().counter.cardToPlay));
    nextTurn();
  }
});

$('#guardGuessButton7').on('click', function() {
  store.dispatch({type: 'GUARD_GUESS', guardGuess: 7});
  if (store.getState().counter.readyForNextTurn) {
    store.dispatch(actions.playCard(store.getState().counter.cardToPlay));
    nextTurn();
  }
});

$('#guardGuessButton8').on('click', function() {
  store.dispatch({type: 'GUARD_GUESS', guardGuess: 8});
  if (store.getState().counter.readyForNextTurn) {
    store.dispatch(actions.playCard(store.getState().counter.cardToPlay));
    nextTurn();
  }
});

function nextTurn() {
  if (store.getState().counter.gameEnds.winner !== null) {
    // Game end
    return;
  } else if (store.getState().counter.currentPlayerId !== 1 || store.getState().counter.players[0].dead) {
    // AI move
    // Disable buttons
    setTimeout(function() {
      // store.dispatch({type: 'AI_MOVE'});
      // TODO: randomly choose a card
      store.dispatch({ type: 'DRAW_CARD', player: store.getState().counter.currentPlayerId});
      let randomAICard = randomAI(store.getState().counter.players, store.getState().counter.currentPlayerId);
      store.dispatch(actions.playCard(randomAICard));
      nextTurn();
    }, 1000);
  } else {
    store.dispatch({ type: 'DRAW_CARD', player: store.getState().counter.currentPlayerId});
    // Update Value Table
    store.dispatch({type: 'UPDATE_VALUE_TALBE', previousState: {playerDead}})
    // Wait for human input
    let randomAICard = reinforcementAI(store.getState().counter.players, store.getState().counter.currentPlayerId);
    store.dispatch(actions.playCard(randomAICard));
    nextTurn();
  }
}

function value(cardId, playerId, guess) {
  // look up a table and return the value of action
  return store.getState().counter.valueTable.cardId[cardId - 1].playAgainst[playerId - 1].guess[guess - 1];
}

function reinforcementAI(players, playerId) {
  let card1Id = players[playerId - 1].holdingCards[0];
  let card2Id = players[playerId - 1].holdingCards[1];

  let card1MaxValue = -1000, card2MaxValue = -1000;
  let playAgainst1 = -1, playAgainst2 = -1;
  let guess1 = -1, guess2 = -1;

  for (var playAgainst = 1; playAgainst < 4; ++playAgainst) {
    if (card1Id === 1) {
      for (var guess = 2; guess < 9; ++guess) {
        if (card1MaxValue < value(card1Id, playAgainst, guess)) {
          card1MaxValue = value(card1Id, playAgainst, guess);
          playAgainst1 = playAgainst;
          guess1 = guess;
        }
      }
    } else {
      if (card1MaxValue < value(card1Id, playAgainst, -1)) {
        card1MaxValue = value(card1Id, playAgainst, -1);
        playAgainst1 = playAgainst;
      }
    }
  }

  for (var playAgainst = 1; playAgainst < 4; ++playAgainst) {
    if (card1Id === 1) {
      for (var guess = 2; guess < 9; ++guess) {
        if (card2MaxValue < value(card2Id, playAgainst, guess)) {
          card2MaxValue = value(card2Id, playAgainst, guess);
          playAgainst2 = playAgainst;
          guess2 = guess;
        }
      }
    } else {
      if (card2MaxValue < value(card2Id, playAgainst, -1)) {
        card2MaxValue = value(card2Id, playAgainst, -1);
        playAgainst2 = playAgainst;
      }
    }
  }

  return card1MaxValue > card2MaxValue ?
    {cardId: card1Id, playAgainst: playAgainst1, guardGuess: guess1} :
    {cardId: card2Id, playAgainst: playAgainst2, guardGuess: guess2};
}

function randomAI(players, playerId) {
  let cardId;
  if (players[playerId - 1].holdingCards.indexOf(4) !== -1) {
    // Prioritize on playing handmaid.
    cardId = 4;
  } else {
    if (players[playerId - 1].holdingCards[0] < players[playerId - 1].holdingCards[1]) {
      cardId = players[playerId - 1].holdingCards[0];
    } else {
      cardId = players[playerId - 1].holdingCards[1];
    }
  }

  let guardGuess;
  if (cardId === 1) {
    // Randomly choose from the highest not yet appeared card.
    // cardToGuess = getHighestNotYetAppearedCard(this.cards, cardsNotPlayedYet);
    guardGuess = 8; // Make this smarter.
  }

  let playAgainst = playerId % 4 + 1;
  let getNonDeadNonProtectedPlayerList = getNonDeadNonProtectedPlayers(playerId, players);
  if (getNonDeadNonProtectedPlayerList.length == 0) {
    // The player is the winner.
  } else {
    // Randomly select one player to play the card against.
    let randomPlayerIndex = Math.floor(Math.random() * getNonDeadNonProtectedPlayerList.length);
    playAgainst = getNonDeadNonProtectedPlayerList[randomPlayerIndex];
  }
  return {cardId, playAgainst, guardGuess};
}

function getNonDeadNonProtectedPlayers(playerId, players) {
  let nonDeadNonProtectedPlayerList = [];
  players.forEach(player => {
    if (player.id != playerId && !player.protected && !player.dead) {
      nonDeadNonProtectedPlayerList.push(player.id);
    }
  });
  return nonDeadNonProtectedPlayerList;
}

$(document).ready(function() {
  store.dispatch({type: 'POPULATE_TABLE'});
  nextTurn();
})

$('#restart').click(function() {
  console.log('Restart');
  store.dispatch({ type: 'RESTART'});
  nextTurn();
});
