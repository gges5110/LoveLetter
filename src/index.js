import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {combineReducers, createStore} from "redux";

import App from "./components/app";
import reducers from "./reducers";
import GameReducer from "./reducers/reducer_game";

let store = createStore(combineReducers({GameReducer}));
export {
  store
}
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#app")
);

//
//
//
// import { counter } from './reducers';
// import { cardNames } from './const';
// import { createStore, combineReducers } from 'redux';
// import {
//   disablePlayButton,
//   disablePlayAgainstButton,
//   disableGuardGuessButton,
//   enablePlayButton,
//   enablePlayAgainstButton,
//   enableGuardGuessButton,
//   playButtonOnclick,
//   playAgainstButtonOnclick,
//   guardGuessButtonOnclick, } from './setButtonState';
// import { getAvailableCardSize } from './util';
// import ReinforcementAI from './AI/reinforcementAI';
// import Evaluation from './AI/evaluate';
// import Game from "./game";
// import HumanPlayer from "./AI/human";
//
// import React from 'react';
// import ReactDOM from 'react-dom';
// import SimpleTabs from './components/SimpleTabs';
// import { Provider } from 'react-redux'
//
// let store = createStore(combineReducers({counter}),
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
//
// export {
//   store
// }
//
// function App() {
//   return (
//     <Provider store={store}>
//       <SimpleTabs />
//     </Provider>
//   );
// }
//
// ReactDOM.render(<App />, document.querySelector('#app'));
//
// // Replace this block with Components after adopting React.
// function render() {
//   $('#currentPlayerId').text(store.getState().counter.currentPlayerId.toString());
//   let humanPlayerId = 0; // store.getState().counter.currentPlayerId - 1
//   if (store.getState().counter.gameEnds.winner === null && store.getState().counter.players[humanPlayerId].holdingCards.length > 0) {
//     $('#playButton1').text(cardNames[store.getState().counter.players[humanPlayerId].holdingCards[0].toString() - 1]);
//   }
//
//   if (store.getState().counter.gameEnds.winner === null && store.getState().counter.players[humanPlayerId].holdingCards.length > 1) {
//     $('#playButton2').text(cardNames[store.getState().counter.players[humanPlayerId].holdingCards[1].toString() - 1]);
//   } else {
//     $('#playButton2').text('');
//   }
//
//   if (store.getState().counter.gameEnds.winner === null) {
//     $(`#playerPlayedList1`).empty();
//     $(`#playerPlayedList2`).empty();
//     $(`#playerPlayedList3`).empty();
//     $(`#playerPlayedList4`).empty();
//     for (var i = 0; i < store.getState().counter.players[0].playedCards.length; ++i) {
//       renderPlayedCards(0, i);
//     }
//     for (var i = 0; i < store.getState().counter.players[1].playedCards.length; ++i) {
//       renderPlayedCards(1, i);
//     }
//     for (var i = 0; i < store.getState().counter.players[2].playedCards.length; ++i) {
//       renderPlayedCards(2, i);
//     }
//     for (var i = 0; i < store.getState().counter.players[3].playedCards.length; ++i) {
//       renderPlayedCards(3, i);
//     }
//   }
//
//   $('#priestList').empty();
//   for (let i = 0; i < store.getState().counter.players[0].seenCards.length; ++i) {
//     $('#priestList').append(`<li class="item">Player ${store.getState().counter.players[0].seenCards[i].playerId} has ${cardNames[store.getState().counter.players[0].seenCards[i].cardId - 1]}</li>`);
//   }
//
//   for (let i = 0; i < 4; ++i) {
//     $(`#playerTitle${i + 1}`).removeClass("playerProtected");
//     $(`#playerTitle${i + 1}`).removeClass("playerDead");
//     $(`#playerTitle${i + 1}`).removeClass("playerWin");
//   }
//
//   for (let i = 0; i < 4; ++i) {
//     if (store.getState().counter.players[i].dead) {
//       $(`#playerTitle${i + 1}`).attr("class","playerDead");
//       if (store.getState().counter.players[i].holdingCards.length !== 0) {
//         $(`#playerTitle${i + 1}`).text(`Player ${i + 1} - ${cardNames[store.getState().counter.players[i].holdingCards[0] - 1]}`);
//       } else {
//         $(`#playerTitle${i + 1}`).text(`Player ${i + 1} - ${cardNames[store.getState().counter.players[i].playedCards[store.getState().counter.players[i].playedCards.length - 1].cardId - 1]}`);
//       }
//     } else {
//       $(`#playerTitle${i + 1}`).text(`Player ${i + 1}`);
//     }
//   }
//
//   for (let i = 0; i < 4; ++i) {
//     if (store.getState().counter.players[i].protected) {
//       $(`#playerTitle${i + 1}`).attr("class","playerProtected");
//     }
//   }
//
//   if (store.getState().counter.gameEnds.winner !== null) {
//     $('#status').text(`Winner is ${store.getState().counter.gameEnds.winner.id}`);
//     $(`#playerTitle${store.getState().counter.gameEnds.winner.id}`).attr("class","playerWin");
//     for (var i = 0; i < 4; ++i) {
//       if (!store.getState().counter.players[i].dead && store.getState().counter.players[i].holdingCards[0] !== undefined) {
//         $(`#playerTitle${i + 1}`).text(`Player ${i + 1} - ${cardNames[store.getState().counter.players[i].holdingCards[0] - 1]}`);
//       }
//     }
//   } else {
//     $('#status').text(`Player ${store.getState().counter.currentPlayerId}'s turn. ${getAvailableCardSize(store.getState().counter.availableCards)} cards left`);
//   }
//
//   if (store.getState().counter.buttonStates.chooseCard) {
//     enablePlayButton();
//   } else {
//     disablePlayButton();
//   }
//
//   if (store.getState().counter.buttonStates.playAgainst) {
//     enablePlayAgainstButton(store.getState().counter.players);
//   } else {
//     disablePlayAgainstButton();
//   }
//
//   if (store.getState().counter.buttonStates.guardGuess) {
//     enableGuardGuessButton();
//   } else {
//     disableGuardGuessButton();
//   }
// }
//
// function renderPlayedCards(playerId, cardIdx) {
//   let string = cardNames[store.getState().counter.players[playerId].playedCards[cardIdx].cardId - 1];
//   if (store.getState().counter.players[playerId].playedCards[cardIdx].discarded !== undefined) {
//     $(`#playerPlayedList${playerId + 1}`).append(`<li class="item discard">${string}</li>`);
//   } else {
//     if (store.getState().counter.players[playerId].playedCards[cardIdx].playAgainst !== -1) {
//       string += ' play against ' + store.getState().counter.players[playerId].playedCards[cardIdx].playAgainst;
//     }
//     if (store.getState().counter.players[playerId].playedCards[cardIdx].guardGuess !== -1) {
//       string += ', guessing ' + cardNames[store.getState().counter.players[playerId].playedCards[cardIdx].guardGuess - 1];
//     }
//     $(`#playerPlayedList${playerId + 1}`).append(`<li class="item">${string}</li>`);
//   }
// }
// // render();
// // store.subscribe(render);
//
// /*
// env.getNumStates() returns an integer of total number of states
// env.getMaxNumActions() returns an integer with max number of actions in any state
// env.allowedActions(s) takes an integer s and returns a list of available actions, which should be integers from zero to maxNumActions
// */
// let game;
//
// $(document).ready(function() {
//   game = new Game(4, store);
//
//   playButtonOnclick(store, 0, game.nextTurn);
//   playButtonOnclick(store, 1, game.nextTurn);
//   playAgainstButtonOnclick(store, 1, game.nextTurn);
//   playAgainstButtonOnclick(store, 2, game.nextTurn);
//   playAgainstButtonOnclick(store, 3, game.nextTurn);
//   playAgainstButtonOnclick(store, 4, game.nextTurn);
//   guardGuessButtonOnclick(store, 2, game.nextTurn);
//   guardGuessButtonOnclick(store, 3, game.nextTurn);
//   guardGuessButtonOnclick(store, 4, game.nextTurn);
//   guardGuessButtonOnclick(store, 5, game.nextTurn);
//   guardGuessButtonOnclick(store, 6, game.nextTurn);
//   guardGuessButtonOnclick(store, 7, game.nextTurn);
//   guardGuessButtonOnclick(store, 8, game.nextTurn);
//
//   let reinforcementAI = new ReinforcementAI([2, 9, 8, 8], [8, 4, 7]);
//   reinforcementAI.initialize();
//   game.setPlayer(2, reinforcementAI);
//   game.setPlayer(1, new HumanPlayer());
//   game.start();
// })
//
// $('#evaluation').click(function() {
//   $('#evaluation').addClass("disabled");
//   let evaluation = new Evaluation();
//   // Play one game.
//   evaluation.start().then(function(result) {
//     $('#evaluation').removeClass("disabled");
//     $('#win-rate-1').text(result.winRate[0]);
//     $('#win-rate-2').text(result.winRate[1]);
//     $('#win-rate-3').text(result.winRate[2]);
//     $('#win-rate-4').text(result.winRate[3]);
//   });
// });
//
// $('#restart').click(function() {
//   game.start();
//   // reinforcementAI.lastSAVector = -1; // Should forget about the last move from previous game
// });
