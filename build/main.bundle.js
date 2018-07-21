/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/actions.js":
/*!************************!*\
  !*** ./src/actions.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var playCard = exports.playCard = function playCard(cardToPlay) {
  return {
    type: 'PLAY_CARD',
    cardToPlay: cardToPlay
  };
};

var discardCard = exports.discardCard = function discardCard(card) {
  return {
    type: 'DISCARD_CARD',
    card: card
  };
};

/***/ }),

/***/ "./src/const.js":
/*!**********************!*\
  !*** ./src/const.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var cardRank = {
  'Guard': 1,
  'Priest': 2,
  'Baron': 3,
  'Handmaid': 4,
  'Prince': 5,
  'King': 6,
  'Countess': 7,
  'Princess': 8
};

var cardNames = ['Guard', 'Priest', 'Baron', 'Handmaid', 'Prince', 'King', 'Countess', 'Princess'];

var startingCards = {
  'Guard': 5,
  'Priest': 2,
  'Baron': 2,
  'Handmaid': 2,
  'Prince': 2,
  'King': 1,
  'Countess': 1,
  'Princess': 1
};

var nonAttackingCards = ['Handmaid', 'Countess', 'King'];

var initialState = {
  counter: 0,
  currentPlayerId: 1,
  players: [{
    id: 1,
    dead: false,
    protected: false,
    holdingCards: [],
    playedCards: [],
    seenCards: []
  }, {
    id: 2,
    dead: false,
    protected: false,
    holdingCards: [],
    playedCards: [],
    seenCards: []
  }, {
    id: 3,
    dead: false,
    protected: false,
    holdingCards: [],
    playedCards: [],
    seenCards: []
  }, {
    id: 4,
    dead: false,
    protected: false,
    holdingCards: [],
    playedCards: [],
    seenCards: []
  }],
  firstCard: {},
  availableCards: {
    'Guard': 5,
    'Priest': 2,
    'Baron': 2,
    'Handmaid': 2,
    'Prince': 2,
    'King': 1,
    'Countess': 1,
    'Princess': 1
  },
  gameEnds: {
    winner: null
  },
  buttonStates: {
    chooseCard: true,
    playAgainst: false,
    GuardGuess: false
  },
  readyForNextTurn: false,
  cardToPlay: {
    cardId: null,
    playAgainst: -1,
    guardGuess: -1
  },
  valueTable: {
    cardId: [{
      playAgainst: [{
        guess: []
      }, {
        guess: []
      }, {
        guess: []
      }]
    }, {
      playAgainst: [{
        guess: []
      }, {
        guess: []
      }, {
        guess: []
      }]
    }, {
      playAgainst: [{
        guess: []
      }, {
        guess: []
      }, {
        guess: []
      }]
    }, {
      playAgainst: [{
        guess: []
      }, {
        guess: []
      }, {
        guess: []
      }]
    }, {
      playAgainst: [{
        guess: []
      }, {
        guess: []
      }, {
        guess: []
      }]
    }, {
      playAgainst: [{
        guess: []
      }, {
        guess: []
      }, {
        guess: []
      }]
    }, {
      playAgainst: [{
        guess: []
      }, {
        guess: []
      }, {
        guess: []
      }]
    }, {
      playAgainst: [{
        guess: []
      }, {
        guess: []
      }, {
        guess: []
      }]
    }]
  }
};

exports.cardRank = cardRank;
exports.cardNames = cardNames;
exports.initialState = initialState;
exports.nonAttackingCards = nonAttackingCards;
exports.startingCards = startingCards;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _reducers = __webpack_require__(/*! ./reducers */ "./src/reducers.js");

var _const = __webpack_require__(/*! ./const */ "./src/const.js");

var _actions = __webpack_require__(/*! ./actions */ "./src/actions.js");

var _actions2 = _interopRequireDefault(_actions);

var _setButtonState = __webpack_require__(/*! ./setButtonState */ "./src/setButtonState.js");

var _util = __webpack_require__(/*! ./util */ "./src/util.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = Redux.createStore(Redux.combineReducers({ counter: _reducers.counter }), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

function render() {
  $('#currentPlayerId').text(store.getState().counter.currentPlayerId.toString());
  var humanPlayerId = 0; // store.getState().counter.currentPlayerId - 1
  if (store.getState().counter.gameEnds.winner === null && store.getState().counter.players[humanPlayerId].holdingCards.length > 0) {
    $('#playButton1').text(_const.cardNames[store.getState().counter.players[humanPlayerId].holdingCards[0].toString() - 1]);
  }

  if (store.getState().counter.gameEnds.winner === null && store.getState().counter.players[humanPlayerId].holdingCards.length > 1) {
    $('#playButton2').text(_const.cardNames[store.getState().counter.players[humanPlayerId].holdingCards[1].toString() - 1]);
  } else {
    $('#playButton2').text('');
  }

  if (store.getState().counter.gameEnds.winner === null) {
    $('#playerPlayedList1').empty();
    $('#playerPlayedList2').empty();
    $('#playerPlayedList3').empty();
    $('#playerPlayedList4').empty();
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
  for (var _i = 0; _i < store.getState().counter.players[0].seenCards.length; ++_i) {
    $('#priestList').append('<li class="item">Player ' + store.getState().counter.players[0].seenCards[_i].playerId + ' has ' + _const.cardNames[store.getState().counter.players[0].seenCards[_i].cardId - 1] + '</li>');
  }

  for (var _i2 = 0; _i2 < 4; ++_i2) {
    $('#playerTitle' + (_i2 + 1)).removeClass("playerProtected");
    $('#playerTitle' + (_i2 + 1)).removeClass("playerDead");
    $('#playerTitle' + (_i2 + 1)).removeClass("playerWin");
  }

  for (var _i3 = 0; _i3 < 4; ++_i3) {
    if (store.getState().counter.players[_i3].dead) {
      $('#playerTitle' + (_i3 + 1)).attr("class", "playerDead");
      $('#playerTitle' + (_i3 + 1)).text('Player ' + (_i3 + 1) + ' - ' + _const.cardNames[store.getState().counter.players[_i3].holdingCards[0] - 1]);
    } else {
      $('#playerTitle' + (_i3 + 1)).text('Player ' + (_i3 + 1));
    }
  }

  for (var _i4 = 0; _i4 < 4; ++_i4) {
    if (store.getState().counter.players[_i4].protected) {
      $('#playerTitle' + (_i4 + 1)).attr("class", "playerProtected");
    }
  }

  if (store.getState().counter.gameEnds.winner !== null) {
    $('#status').text('Winner is ' + store.getState().counter.gameEnds.winner.id);
    $('#playerTitle' + store.getState().counter.gameEnds.winner.id).attr("class", "playerWin");
    for (var i = 0; i < 4; ++i) {
      if (!store.getState().counter.players[i].dead) {
        $('#playerTitle' + (i + 1)).text('Player ' + (i + 1) + ' - ' + _const.cardNames[store.getState().counter.players[i].holdingCards[0] - 1]);
      }
    }
  } else {
    $('#status').text('Player ' + store.getState().counter.currentPlayerId + '\'s turn. ' + (0, _util.getAvailableCardSize)(store.getState().counter.availableCards) + ' cards left');
  }

  if (store.getState().counter.buttonStates.chooseCard) {
    (0, _setButtonState.enablePlayButton)();
  } else {
    (0, _setButtonState.disablePlayButton)();
  }

  if (store.getState().counter.buttonStates.playAgainst) {
    (0, _setButtonState.enablePlayAgainstButton)(store.getState().counter.players);
  } else {
    (0, _setButtonState.disablePlayAgainstButton)();
  }

  if (store.getState().counter.buttonStates.guardGuess) {
    (0, _setButtonState.enableGuardGuessButton)();
  } else {
    (0, _setButtonState.disableGuardGuessButton)();
  }
}

function renderPlayedCards(playerId, cardIdx) {
  var string = _const.cardNames[store.getState().counter.players[playerId].playedCards[cardIdx].cardId - 1];
  if (store.getState().counter.players[playerId].playedCards[cardIdx].discarded !== undefined) {
    $('#playerPlayedList' + (playerId + 1)).append('<li class="item discard">' + string + '</li>');
  } else {
    if (store.getState().counter.players[playerId].playedCards[cardIdx].playAgainst !== -1) {
      string += ' play against ' + store.getState().counter.players[playerId].playedCards[cardIdx].playAgainst;
    }
    if (store.getState().counter.players[playerId].playedCards[cardIdx].guardGuess !== -1) {
      string += ', guessing ' + _const.cardNames[store.getState().counter.players[playerId].playedCards[cardIdx].guardGuess - 1];
    }
    $('#playerPlayedList' + (playerId + 1)).append('<li class="item">' + string + '</li>');
  }
}
render();
store.subscribe(render);

$('#playButton1').on('click', function () {
  store.dispatch({ type: 'CHOOSE_CARD', cardId: store.getState().counter.players[store.getState().counter.currentPlayerId - 1].holdingCards[0] });
  if (store.getState().counter.readyForNextTurn) {
    store.dispatch(_actions2.default.playCard(store.getState().counter.cardToPlay));
    nextTurn();
  }
});

$('#playButton2').on('click', function () {
  store.dispatch({ type: 'CHOOSE_CARD', cardId: store.getState().counter.players[store.getState().counter.currentPlayerId - 1].holdingCards[1] });
  if (store.getState().counter.readyForNextTurn) {
    store.dispatch(_actions2.default.playCard(store.getState().counter.cardToPlay));
    nextTurn();
  }
});

$('#playAgainstButton1').on('click', function () {
  store.dispatch({ type: 'PLAY_AGAINST', playAgainst: 1 });
  if (store.getState().counter.readyForNextTurn) {
    store.dispatch(_actions2.default.playCard(store.getState().counter.cardToPlay));
    nextTurn();
  }
});

$('#playAgainstButton2').on('click', function () {
  store.dispatch({ type: 'PLAY_AGAINST', playAgainst: 2 });
  if (store.getState().counter.readyForNextTurn) {
    store.dispatch(_actions2.default.playCard(store.getState().counter.cardToPlay));
    nextTurn();
  }
});

$('#playAgainstButton3').on('click', function () {
  store.dispatch({ type: 'PLAY_AGAINST', playAgainst: 3 });
  if (store.getState().counter.readyForNextTurn) {
    store.dispatch(_actions2.default.playCard(store.getState().counter.cardToPlay));
    nextTurn();
  }
});

$('#playAgainstButton4').on('click', function () {
  store.dispatch({ type: 'PLAY_AGAINST', playAgainst: 4 });
  if (store.getState().counter.readyForNextTurn) {
    store.dispatch(_actions2.default.playCard(store.getState().counter.cardToPlay));
    nextTurn();
  }
});

$('#guardGuessButton2').on('click', function () {
  store.dispatch({ type: 'GUARD_GUESS', guardGuess: 2 });
  if (store.getState().counter.readyForNextTurn) {
    store.dispatch(_actions2.default.playCard(store.getState().counter.cardToPlay));
    nextTurn();
  }
});

$('#guardGuessButton3').on('click', function () {
  store.dispatch({ type: 'GUARD_GUESS', guardGuess: 3 });
  if (store.getState().counter.readyForNextTurn) {
    store.dispatch(_actions2.default.playCard(store.getState().counter.cardToPlay));
    nextTurn();
  }
});

$('#guardGuessButton4').on('click', function () {
  store.dispatch({ type: 'GUARD_GUESS', guardGuess: 4 });
  if (store.getState().counter.readyForNextTurn) {
    store.dispatch(_actions2.default.playCard(store.getState().counter.cardToPlay));
    nextTurn();
  }
});

$('#guardGuessButton5').on('click', function () {
  store.dispatch({ type: 'GUARD_GUESS', guardGuess: 5 });
  if (store.getState().counter.readyForNextTurn) {
    store.dispatch(_actions2.default.playCard(store.getState().counter.cardToPlay));
    nextTurn();
  }
});

$('#guardGuessButton6').on('click', function () {
  store.dispatch({ type: 'GUARD_GUESS', guardGuess: 6 });
  if (store.getState().counter.readyForNextTurn) {
    store.dispatch(_actions2.default.playCard(store.getState().counter.cardToPlay));
    nextTurn();
  }
});

$('#guardGuessButton7').on('click', function () {
  store.dispatch({ type: 'GUARD_GUESS', guardGuess: 7 });
  if (store.getState().counter.readyForNextTurn) {
    store.dispatch(_actions2.default.playCard(store.getState().counter.cardToPlay));
    nextTurn();
  }
});

$('#guardGuessButton8').on('click', function () {
  store.dispatch({ type: 'GUARD_GUESS', guardGuess: 8 });
  if (store.getState().counter.readyForNextTurn) {
    store.dispatch(_actions2.default.playCard(store.getState().counter.cardToPlay));
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
    setTimeout(function () {
      // store.dispatch({type: 'AI_MOVE'});
      // TODO: randomly choose a card
      store.dispatch({ type: 'DRAW_CARD', player: store.getState().counter.currentPlayerId });
      var randomAICard = randomAI(store.getState().counter.players, store.getState().counter.currentPlayerId);
      store.dispatch(_actions2.default.playCard(randomAICard));
      nextTurn();
    }, 1000);
  } else {
    store.dispatch({ type: 'DRAW_CARD', player: store.getState().counter.currentPlayerId });
    // Update Value Table
    store.dispatch({ type: 'UPDATE_VALUE_TALBE', previousState: { playerDead: playerDead } });
    // Wait for human input
    var randomAICard = reinforcementAI(store.getState().counter.players, store.getState().counter.currentPlayerId);
    store.dispatch(_actions2.default.playCard(randomAICard));
    nextTurn();
  }
}

function value(cardId, playerId, guess) {
  // look up a table and return the value of action
  return store.getState().counter.valueTable.cardId[cardId - 1].playAgainst[playerId - 1].guess[guess - 1];
}

function reinforcementAI(players, playerId) {
  var card1Id = players[playerId - 1].holdingCards[0];
  var card2Id = players[playerId - 1].holdingCards[1];

  var card1MaxValue = -1000,
      card2MaxValue = -1000;
  var playAgainst1 = -1,
      playAgainst2 = -1;
  var guess1 = -1,
      guess2 = -1;

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

  return card1MaxValue > card2MaxValue ? { cardId: card1Id, playAgainst: playAgainst1, guardGuess: guess1 } : { cardId: card2Id, playAgainst: playAgainst2, guardGuess: guess2 };
}

function randomAI(players, playerId) {
  var cardId = void 0;
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

  var guardGuess = void 0;
  if (cardId === 1) {
    // Randomly choose from the highest not yet appeared card.
    // cardToGuess = getHighestNotYetAppearedCard(this.cards, cardsNotPlayedYet);
    guardGuess = 8; // Make this smarter.
  }

  var playAgainst = playerId % 4 + 1;
  var getNonDeadNonProtectedPlayerList = getNonDeadNonProtectedPlayers(playerId, players);
  if (getNonDeadNonProtectedPlayerList.length == 0) {
    // The player is the winner.
  } else {
    // Randomly select one player to play the card against.
    var randomPlayerIndex = Math.floor(Math.random() * getNonDeadNonProtectedPlayerList.length);
    playAgainst = getNonDeadNonProtectedPlayerList[randomPlayerIndex];
  }
  return { cardId: cardId, playAgainst: playAgainst, guardGuess: guardGuess };
}

function getNonDeadNonProtectedPlayers(playerId, players) {
  var nonDeadNonProtectedPlayerList = [];
  players.forEach(function (player) {
    if (player.id != playerId && !player.protected && !player.dead) {
      nonDeadNonProtectedPlayerList.push(player.id);
    }
  });
  return nonDeadNonProtectedPlayerList;
}

$(document).ready(function () {
  store.dispatch({ type: 'POPULATE_TABLE' });
  nextTurn();
});

$('#restart').click(function () {
  console.log('Restart');
  store.dispatch({ type: 'RESTART' });
  nextTurn();
});

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(/*! ./util */ "./src/util.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Player definition
var Player = function () {
  function Player(number) {
    _classCallCheck(this, Player);

    this.number = number;
    this.dead = false;
    this.protected = false;
    this.cards = [];
  }

  _createClass(Player, [{
    key: "draw",
    value: function draw(availableCards) {
      console.log("Draw a card for player " + this.number);
      this.cards.push((0, _util.getRandomCard)(availableCards));
    }
  }, {
    key: "reset",
    value: function reset() {
      this.dead = false;
      this.protected = false;
      this.cards = [];
    }
  }, {
    key: "showHand",
    value: function showHand() {
      $("#playerTitle" + this.number).append(" - " + this.cards[0]);
    }
  }, {
    key: "setPlayerDead",
    value: function setPlayerDead(cardsNotPlayedYet) {
      this.dead = true;
      $("#playerTitle" + this.number).attr("class", "playerDead");
      $("#playerTitle" + this.number).append(" - " + this.cards[0]);
      cardsNotPlayedYet[this.cards[0]]--;
    }
  }, {
    key: "randomAI",
    value: function randomAI(players, cardsNotPlayedYet) {
      var cardIndex = void 0;
      if (this.cards.indexOf('Handmaid') !== -1) {
        // Prioritize on playing handmaid.
        cardIndex = this.cards.indexOf('Handmaid');
      } else {
        if ((0, _util.compareCards)(this.cards[0], this.cards[1]) > 0) {
          cardIndex = 0;
        } else {
          cardIndex = 1;
        }
      }

      // let cardIndex = Math.floor(Math.random() * 2);
      var card = this.cards[cardIndex];
      console.log(card);
      var cardToGuess = void 0;
      if (card === 'Guard') {
        // Randomly choose from the highest not yet appeared card.
        cardToGuess = (0, _util.getHighestNotYetAppearedCard)(this.cards, cardsNotPlayedYet);
      }
      // TODO: Play against random non dead/non protected person.
      var against = this.number % 4 + 1;
      var getNonDeadNonProtectedPlayerList = (0, _util.getNonDeadNonProtectedPlayers)(this, players);
      if (getNonDeadNonProtectedPlayerList.length == 0) {
        // The player is the winner.
      } else {
        // Randomly select one player to play the card against.
        var randomPlayerIndex = Math.floor(Math.random() * getNonDeadNonProtectedPlayerList.length);
        against = getNonDeadNonProtectedPlayerList[randomPlayerIndex];
      }
      var playedCard = this.play(cardIndex, against, cardToGuess);
      return playedCard;
    }
  }, {
    key: "play",
    value: function play(cardIndex, against, cardToGuess) {
      var card = this.cards[cardIndex];
      this.cards.splice(cardIndex, 1);
      return { 'card': card, 'against': against, 'guess': cardToGuess };
    }
  }, {
    key: "discard",
    value: function discard() {
      console.log("Player " + this.number + " discarded a card.");
      var discardedCard = this.cards[0];
      // TODO: if played against itself, need to discard the right one.
      $("#playerPlayedList" + this.number).append("<li class=\"discard item\">" + discardedCard + "</li>");
      this.cards = [];
      return discardedCard;
    }
  }]);

  return Player;
}();

exports.default = Player;

/***/ }),

/***/ "./src/reducers.js":
/*!*************************!*\
  !*** ./src/reducers.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.counter = undefined;

var _const = __webpack_require__(/*! ./const */ "./src/const.js");

var _util = __webpack_require__(/*! ./util */ "./src/util.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } // var availableCards, currentPlayer, gameEnd;
// var playAgainst, cardsNotPlayedYet;


function resolve(state, cardToPlay) {
  if (cardToPlay.cardId === 1 && (0, _util.checkNotDeadAndNotProtected)(state, cardToPlay.playAgainst)) {
    if (cardToPlay.guardGuess === state.players[cardToPlay.playAgainst - 1].holdingCards[0]) {
      return (0, _util.setPlayerDead)(state, cardToPlay.playAgainst);
    } else {
      return state;
    }
  } else if (cardToPlay.cardId === 2 && (0, _util.checkNotDeadAndNotProtected)(state, cardToPlay.playAgainst)) {
    var nextState = Object.assign({}, state);
    nextState.players = (0, _util.addSeenCards)(nextState.players, nextState.currentPlayerId, {
      cardId: nextState.players[cardToPlay.playAgainst - 1].holdingCards[0],
      playerId: cardToPlay.playAgainst
    });
    return nextState;
  } else if (cardToPlay.cardId === 3 && (0, _util.checkNotDeadAndNotProtected)(state, cardToPlay.playAgainst)) {
    var cardValue1 = state.players[state.currentPlayerId - 1].holdingCards[0];
    var cardValue2 = state.players[cardToPlay.playAgainst - 1].holdingCards[0];
    if (cardValue1 > cardValue2) {
      return (0, _util.setPlayerDead)(state, cardToPlay.playAgainst);
    } else if (cardValue1 < cardValue2) {
      return (0, _util.setPlayerDead)(state, state.currentPlayerId);
    } else {
      return state;
    }
  } else if (cardToPlay.cardId === 4) {
    return Object.assign({}, state, {
      players: Object.assign([], state.players, _defineProperty({}, state.currentPlayerId - 1, Object.assign({}, state.players[state.currentPlayerId - 1], {
        protected: true
      })))
    });
  } else if (cardToPlay.cardId === 5 && (0, _util.checkNotDeadAndNotProtected)(state, cardToPlay.playAgainst)) {
    // Prince, Discard and draw
    var _nextState = Object.assign({}, state);
    var cardToDiscard = state.players[cardToPlay.playAgainst - 1].holdingCards[0];
    _nextState.players = (0, _util.discardCard)(state.players, cardToPlay.playAgainst, cardToDiscard);
    _nextState.players = (0, _util.addPlayedCard)(_nextState.players, cardToPlay.playAgainst, {
      cardId: cardToDiscard,
      playAgainst: -1,
      discarded: true
    });

    if ((0, _util.getAvailableCardSize)(state.availableCards) === 0) {
      // Give the hidden card to player
    } else {
      _nextState = (0, _util.drawCardForPlayer)(_nextState, cardToPlay.playAgainst);
    }

    if (cardToDiscard === 8) {
      _nextState.players = Object.assign(_nextState.players, _defineProperty({}, cardToPlay.playAgainst - 1, Object.assign({}, _nextState.players[cardToPlay.playAgainst - 1], {
        dead: true
      })));
    }
    return _nextState;
  } else if (cardToPlay.cardId === 6 && (0, _util.checkNotDeadAndNotProtected)(state, cardToPlay.playAgainst)) {
    var _nextState2 = Object.assign({}, state);
    var cardToSwap = _nextState2.players[state.currentPlayerId - 1].holdingCards[0];
    _nextState2.players = Object.assign([], _nextState2.players, _defineProperty({}, state.currentPlayerId - 1, Object.assign({}, state.players[state.currentPlayerId - 1], {
      holdingCards: [_nextState2.players[cardToPlay.playAgainst - 1].holdingCards[0]]
    })));
    _nextState2.players = Object.assign([], _nextState2.players, _defineProperty({}, cardToPlay.playAgainst - 1, Object.assign({}, state.players[cardToPlay.playAgainst - 1], {
      holdingCards: [cardToSwap]
    })));
    return _nextState2;
  } else if (cardToPlay.cardId === 8) {
    return Object.assign({}, state, {
      players: Object.assign([], state.players, _defineProperty({}, state.currentPlayerId - 1, Object.assign({}, state.players[state.currentPlayerId - 1], {
        dead: true
      })))
    });
  } else {
    return state;
  }
}

function counter(state, action) {
  if (typeof state === 'undefined') {
    // return JSON.parse(JSON.stringify(initialState));
    // Clean up store state.
    var newState = JSON.parse(JSON.stringify(_const.initialState));
    // Setup and draw cards.
    // Discard a card at the start of the game.
    var randomCardId = (0, _util.getRandomCard)(newState.availableCards);
    newState.availableCards[_const.cardNames[randomCardId - 1]]--;

    newState = (0, _util.drawCardForPlayer)(newState, 1);
    newState = (0, _util.drawCardForPlayer)(newState, 2);
    newState = (0, _util.drawCardForPlayer)(newState, 3);
    newState = (0, _util.drawCardForPlayer)(newState, 4);

    return newState;
  }

  switch (action.type) {
    case 'CHOOSE_CARD':
      {
        // TODO: based on selected card, decide if play against action is needed
        // If not then set readyForNextTurn to true
        var readyForNextTurn = false;
        var chooseCard = false;
        var guardGuess = true;
        if (action.cardId === 4 || action.cardId === 7 || action.cardId === 8) {
          readyForNextTurn = true;
          chooseCard = true;
          guardGuess = false;
        }
        return Object.assign({}, state, {
          buttonStates: Object.assign({}, state.buttonStates, {
            chooseCard: chooseCard,
            playAgainst: guardGuess
          }),
          readyForNextTurn: readyForNextTurn,
          cardToPlay: Object.assign({}, state.cardToPlay, {
            cardId: action.cardId
          })
        });
      }
    case 'PLAY_AGAINST':
      {
        var _readyForNextTurn = false;
        var _chooseCard = false;
        var _guardGuess = true;
        if (state.cardToPlay.cardId !== 1) {
          _readyForNextTurn = true;
          _chooseCard = true;
          _guardGuess = false;
        }
        return Object.assign({}, state, {
          buttonStates: Object.assign({}, state.buttonStates, {
            chooseCard: _chooseCard,
            playAgainst: false,
            guardGuess: _guardGuess
          }),
          readyForNextTurn: _readyForNextTurn,
          cardToPlay: Object.assign({}, state.cardToPlay, {
            playAgainst: action.playAgainst
          })
        });
      }
    case 'GUARD_GUESS':
      {
        return Object.assign({}, state, {
          buttonStates: Object.assign({}, state.buttonStates, {
            chooseCard: true,
            guardGuess: false
          }),
          readyForNextTurn: true,
          cardToPlay: Object.assign({}, state.cardToPlay, {
            guardGuess: action.guardGuess
          })
        });
      }
    case 'DISCARD_CARD':
      {
        var _nextState3 = Object.assign({}, state);
        _nextState3.players = (0, _util.discardCard)(_nextState3.players, _nextState3.currentPlayerId, action.card);
        return _nextState3;
      }
    case 'PLAY_CARD':
      // Make a deep copy of the state object
      // let nextState = JSON.parse(JSON.stringify(state));
      var nextState = Object.assign({}, state);

      // TODO: Move all these into other reducer functions.
      // Remove holding cards
      nextState.players = (0, _util.discardCard)(nextState.players, nextState.currentPlayerId, action.cardToPlay);
      // Add played Card
      nextState.players = (0, _util.addPlayedCard)(nextState.players, nextState.currentPlayerId, action.cardToPlay);
      // Resolve
      nextState = resolve(nextState, action.cardToPlay);
      // Next Player
      nextState.currentPlayerId = (0, _util.nextPlayer)(nextState.players, nextState.currentPlayerId);
      // Reset protected
      nextState.players = (0, _util.resetProtection)(nextState.players, nextState.currentPlayerId);
      // Check if game ends
      var gameEnds = checkGameEnd(nextState.players, nextState.availableCards);
      if (gameEnds.gameEnd) {
        nextState.gameEnds.winner = nextState.players[gameEnds.winnerId - 1];
        nextState.buttonStates.chooseCard = false;
      }

      return nextState;
    case 'DRAW_CARD':
      return (0, _util.drawCard)(state);
    case 'POPULATE_TABLE':
      return (0, _util.populateValueTable)(state);
    case 'UPDATE_TABLE':
      return updateValueTable(state, action.previousState);
    case 'RESTART':
      // Clean up store state.
      var _newState = JSON.parse(JSON.stringify(_const.initialState));
      // Setup and draw cards.
      // Discard a card at the start of the game.
      var _randomCardId = (0, _util.getRandomCard)(_newState.availableCards);
      _newState.availableCards[_const.cardNames[_randomCardId - 1]]--;

      _newState = (0, _util.drawCardForPlayer)(_newState, 1);
      _newState = (0, _util.drawCardForPlayer)(_newState, 2);
      _newState = (0, _util.drawCardForPlayer)(_newState, 3);
      _newState = (0, _util.drawCardForPlayer)(_newState, 4);

      return _newState;
    default:
      return state;
  }
}

function checkGameEnd(players, availableCards) {
  if ((0, _util.getAvailableCardSize)(availableCards) <= 0 || (0, _util.getLivingPlayerSize)(players) <= 1) {
    var winnerId = (0, _util.calculateWinner)(players);
    return { 'gameEnd': true, 'winnerId': winnerId };
  } else {
    return { 'gameEnd': false, 'winnerId': -1 };
  }
}

exports.counter = counter;

/***/ }),

/***/ "./src/setButtonState.js":
/*!*******************************!*\
  !*** ./src/setButtonState.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function enableGuardGuessButton() {
  $("#guardGuessButton2").prop('disabled', false);
  $("#guardGuessButton3").prop('disabled', false);
  $("#guardGuessButton4").prop('disabled', false);
  $("#guardGuessButton5").prop('disabled', false);
  $("#guardGuessButton6").prop('disabled', false);
  $("#guardGuessButton7").prop('disabled', false);
  $("#guardGuessButton8").prop('disabled', false);
}

var disableGuardGuessButton = function disableGuardGuessButton() {
  $("#guardGuessButton2").prop('disabled', true);
  $("#guardGuessButton3").prop('disabled', true);
  $("#guardGuessButton4").prop('disabled', true);
  $("#guardGuessButton5").prop('disabled', true);
  $("#guardGuessButton6").prop('disabled', true);
  $("#guardGuessButton7").prop('disabled', true);
  $("#guardGuessButton8").prop('disabled', true);
};

function enablePlayAgainstButton(players) {
  for (var index = 1; index < 5; index++) {
    if (!players[index - 1].dead && !players[index - 1].protected) {
      $("#playAgainstButton" + index).prop('disabled', false);
    }
  }
}

var disablePlayAgainstButton = function disablePlayAgainstButton() {
  $("#playAgainstButton1").prop('disabled', true);
  $("#playAgainstButton2").prop('disabled', true);
  $("#playAgainstButton3").prop('disabled', true);
  $("#playAgainstButton4").prop('disabled', true);
};

function enablePlayButton() {
  $("#playButton1").prop('disabled', false);
  $("#playButton2").prop('disabled', false);
}

function disablePlayButton() {
  $("#playButton1").prop('disabled', true);
  $("#playButton2").prop('disabled', true);
}

exports.disablePlayAgainstButton = disablePlayAgainstButton;
exports.disableGuardGuessButton = disableGuardGuessButton;
exports.disablePlayButton = disablePlayButton;
exports.enablePlayButton = enablePlayButton;
exports.enablePlayAgainstButton = enablePlayAgainstButton;
exports.enableGuardGuessButton = enableGuardGuessButton;

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.populateValueTable = exports.checkNotDeadAndNotProtected = exports.setPlayerDead = exports.addSeenCards = exports.addHoldingCards = exports.addPlayedCard = exports.drawCardForPlayer = exports.discardCard = exports.resetProtection = exports.drawCard = exports.nextPlayer = exports.calculateWinner = exports.getLivingPlayerSize = exports.getNonDeadNonProtectedPlayers = exports.getHighestNotYetAppearedCard = exports.getAvailableCardSize = exports.getRandomCard = exports.checkGameEnd = exports.compareCards = undefined;

var _player = __webpack_require__(/*! ./player */ "./src/player.js");

var _player2 = _interopRequireDefault(_player);

var _const = __webpack_require__(/*! ./const */ "./src/const.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var compareCards = function compareCards(card1, card2) {
  return _const.cardRank[card2] - _const.cardRank[card1];
};

function getLivingPlayerSize(players) {
  var result = 0;
  players.forEach(function (player) {
    if (!player.dead) {
      result++;
    }
  });
  return result;
}

function calculateWinner(players) {
  var winnerId = -1;
  players.forEach(function (player) {
    if (!player.dead) {
      if (winnerId == -1) {
        winnerId = player.id;
      } else {
        console.log('Comparing ' + players[winnerId - 1].holdingCards[0] + ' with ' + player.holdingCards[0]);
        if (players[winnerId - 1].holdingCards[0] < player.holdingCards[0]) {
          winnerId = player.id;
        }
      }
    }
  });

  return winnerId;
}

function getNonDeadNonProtectedPlayers(caller, players) {
  var nonDeadNonProtectedPlayerList = [];
  players.forEach(function (player) {
    if (player.number != caller.number && !player.protected && !player.dead) {
      nonDeadNonProtectedPlayerList.push(player.number);
    }
  });
  return nonDeadNonProtectedPlayerList;
}

function checkGameEnd(players, availableCards) {
  if (getAvailableCardSize(availableCards) <= 0 || getLivingPlayerSize(players) <= 1) {
    var winner = calculateWinner(players);
    return { 'gameEnd': true, 'winner': winner };
  } else {
    return { 'gameEnd': false, 'winner': -1 };
  }
}

function getHighestNotYetAppearedCard(holdingCards, cardsNotPlayedYet) {
  // hodingCards[0, 1]
  for (var index = 7; index > 0; index--) {
    var cardName = _const.cardNames[index];
    if (cardsNotPlayedYet[cardName] !== 0 && holdingCards.indexOf(cardName) === -1) {
      return cardName;
    }
  }

  return 'Priest';
}

// This function will return a random card index based on the availableCards passed in.
function getRandomCard(availableCards) {
  // Get the number of total cards
  var totalCards = getAvailableCardSize(availableCards);

  if (totalCards == 0) {
    return;
  }

  var randomCardNumber = Math.floor(Math.random() * totalCards);

  var temp = 0,
      drawedCard = void 0;
  for (var key in availableCards) {
    if (availableCards.hasOwnProperty(key)) {
      temp += availableCards[key];
      if (temp > randomCardNumber) {
        drawedCard = key;
        break;
      }
    }
  }

  return _const.cardRank[drawedCard];
}

function nextPlayer(players, currentPlayerId) {
  // Next non dead player
  var totalPlayers = players.length;
  var nextPlayerIndex = currentPlayerId % totalPlayers;

  while (players[nextPlayerIndex].dead === true) {
    nextPlayerIndex = (nextPlayerIndex + 1) % totalPlayers;
  }

  return players[nextPlayerIndex].id;
}

function getAvailableCardSize(availableCards) {
  var totalCards = 0;
  for (var key in availableCards) {
    if (availableCards.hasOwnProperty(key)) {
      totalCards += availableCards[key];
    }
  }
  return totalCards;
}

function resetProtection(players, currentPlayerId) {
  return Object.assign([], players, _defineProperty({}, currentPlayerId - 1, Object.assign({}, players[currentPlayerId - 1], {
    protected: false
  })));
}

// discardCard(nextState, currentPlayerId, action.cardToPlay.cardId);
function discardCard(players, currentPlayerId, discardCard) {
  return players.map(function CB(player, index) {
    if (player.id === currentPlayerId) {
      var arr = Object.assign([], player.holdingCards);
      // Remove card.
      arr.splice(arr.indexOf(discardCard.cardId), 1);

      return Object.assign({}, player, {
        holdingCards: arr
      });
    } else {
      return player;
    }
  });
}

function drawCard(previousState) {
  return drawCardForPlayer(previousState, previousState.currentPlayerId);
}

function drawCardForPlayer(previousState, playerId) {
  var randomCardId = getRandomCard(previousState.availableCards);
  // Remove the cardDrew from availableCards
  var arr = Object.assign([], previousState.availableCards);
  arr[_const.cardNames[randomCardId - 1]]--;

  return Object.assign({}, previousState, {
    players: addHoldingCards(previousState.players, playerId, randomCardId),
    availableCards: arr
  });
}

function addPlayedCard(players, playerId, card) {
  var arr = Object.assign([], players[playerId - 1].playedCards);
  if (card.cardId === 4 || card.cardId === 7 || card.cardId === 8) {
    arr.push({
      cardId: card.cardId,
      playAgainst: -1,
      guardGuess: -1,
      discarded: card.discarded
    });
  } else if (card.cardId !== 1) {
    arr.push({
      cardId: card.cardId,
      playAgainst: card.playAgainst,
      guardGuess: -1,
      discarded: card.discarded
    });
  } else {
    arr.push(card);
  }

  return Object.assign([], players, _defineProperty({}, playerId - 1, Object.assign({}, players[playerId - 1], {
    playedCards: arr
  })));
}

function addHoldingCards(players, playerId, card) {
  var arr = Object.assign([], players[playerId - 1].holdingCards);
  arr.push(card);
  return Object.assign([], players, _defineProperty({}, playerId - 1, Object.assign({}, players[playerId - 1], {
    holdingCards: arr
  })));
}

function checkNotDeadAndNotProtected(state, playerId) {
  return playerId > 0 && playerId < 5 && !state.players[playerId - 1].dead && !state.players[playerId - 1].protected;
}

function setPlayerDead(state, playerId) {
  return Object.assign({}, state, {
    players: Object.assign([], state.players, _defineProperty({}, playerId - 1, Object.assign({}, state.players[playerId - 1], {
      dead: true
    })))
  });
}

function addSeenCards(players, playerId, seenCard) {
  var arr = Object.assign([], players[playerId - 1].seenCards);
  arr.push(seenCard);
  return Object.assign([], players, _defineProperty({}, playerId - 1, Object.assign({}, players[playerId - 1], {
    seenCards: arr
  })));
}

function populateValueTable(state) {
  var nextState = Object.assign({}, state);
  for (var cardId = 1; cardId < 9; cardId++) {
    for (var playAgainst = 1; playAgainst < 4; ++playAgainst) {
      for (var guess = 2; guess < 9; guess++) {
        nextState.valueTable.cardId[cardId - 1].playAgainst[playAgainst - 1].guess[guess - 1] = Math.random() / 100;
      }
    }
  }
  return nextState;
}

exports.compareCards = compareCards;
exports.checkGameEnd = checkGameEnd;
exports.getRandomCard = getRandomCard;
exports.getAvailableCardSize = getAvailableCardSize;
exports.getHighestNotYetAppearedCard = getHighestNotYetAppearedCard;
exports.getNonDeadNonProtectedPlayers = getNonDeadNonProtectedPlayers;
exports.getLivingPlayerSize = getLivingPlayerSize;
exports.calculateWinner = calculateWinner;
exports.nextPlayer = nextPlayer;
exports.drawCard = drawCard;
exports.resetProtection = resetProtection;
exports.discardCard = discardCard;
exports.drawCardForPlayer = drawCardForPlayer;
exports.addPlayedCard = addPlayedCard;
exports.addHoldingCards = addHoldingCards;
exports.addSeenCards = addSeenCards;
exports.setPlayerDead = setPlayerDead;
exports.checkNotDeadAndNotProtected = checkNotDeadAndNotProtected;
exports.populateValueTable = populateValueTable;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FjdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnN0LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovLy8uL3NyYy9yZWR1Y2Vycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2V0QnV0dG9uU3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwuanMiXSwibmFtZXMiOlsicGxheUNhcmQiLCJleHBvcnRzIiwiY2FyZFRvUGxheSIsInR5cGUiLCJkaXNjYXJkQ2FyZCIsImNhcmQiLCJjYXJkUmFuayIsImNhcmROYW1lcyIsInN0YXJ0aW5nQ2FyZHMiLCJub25BdHRhY2tpbmdDYXJkcyIsImluaXRpYWxTdGF0ZSIsImNvdW50ZXIiLCJjdXJyZW50UGxheWVySWQiLCJwbGF5ZXJzIiwiaWQiLCJkZWFkIiwicHJvdGVjdGVkIiwiaG9sZGluZ0NhcmRzIiwicGxheWVkQ2FyZHMiLCJzZWVuQ2FyZHMiLCJmaXJzdENhcmQiLCJhdmFpbGFibGVDYXJkcyIsImdhbWVFbmRzIiwid2lubmVyIiwiYnV0dG9uU3RhdGVzIiwiY2hvb3NlQ2FyZCIsInBsYXlBZ2FpbnN0IiwiR3VhcmRHdWVzcyIsInJlYWR5Rm9yTmV4dFR1cm4iLCJjYXJkSWQiLCJndWFyZEd1ZXNzIiwidmFsdWVUYWJsZSIsImd1ZXNzIiwic3RvcmUiLCJSZWR1eCIsImNyZWF0ZVN0b3JlIiwiY29tYmluZVJlZHVjZXJzIiwid2luZG93IiwiX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fXyIsInJlbmRlciIsIiQiLCJ0ZXh0IiwiZ2V0U3RhdGUiLCJ0b1N0cmluZyIsImh1bWFuUGxheWVySWQiLCJsZW5ndGgiLCJlbXB0eSIsImkiLCJyZW5kZXJQbGF5ZWRDYXJkcyIsImFwcGVuZCIsInBsYXllcklkIiwicmVtb3ZlQ2xhc3MiLCJhdHRyIiwiY2FyZElkeCIsInN0cmluZyIsImRpc2NhcmRlZCIsInVuZGVmaW5lZCIsInN1YnNjcmliZSIsIm9uIiwiZGlzcGF0Y2giLCJhY3Rpb25zIiwibmV4dFR1cm4iLCJzZXRUaW1lb3V0IiwicGxheWVyIiwicmFuZG9tQUlDYXJkIiwicmFuZG9tQUkiLCJwcmV2aW91c1N0YXRlIiwicGxheWVyRGVhZCIsInJlaW5mb3JjZW1lbnRBSSIsInZhbHVlIiwiY2FyZDFJZCIsImNhcmQySWQiLCJjYXJkMU1heFZhbHVlIiwiY2FyZDJNYXhWYWx1ZSIsInBsYXlBZ2FpbnN0MSIsInBsYXlBZ2FpbnN0MiIsImd1ZXNzMSIsImd1ZXNzMiIsImluZGV4T2YiLCJnZXROb25EZWFkTm9uUHJvdGVjdGVkUGxheWVyTGlzdCIsImdldE5vbkRlYWROb25Qcm90ZWN0ZWRQbGF5ZXJzIiwicmFuZG9tUGxheWVySW5kZXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJub25EZWFkTm9uUHJvdGVjdGVkUGxheWVyTGlzdCIsImZvckVhY2giLCJwdXNoIiwiZG9jdW1lbnQiLCJyZWFkeSIsImNsaWNrIiwiY29uc29sZSIsImxvZyIsIlBsYXllciIsIm51bWJlciIsImNhcmRzIiwiY2FyZHNOb3RQbGF5ZWRZZXQiLCJjYXJkSW5kZXgiLCJjYXJkVG9HdWVzcyIsImFnYWluc3QiLCJwbGF5ZWRDYXJkIiwicGxheSIsInNwbGljZSIsImRpc2NhcmRlZENhcmQiLCJyZXNvbHZlIiwic3RhdGUiLCJuZXh0U3RhdGUiLCJPYmplY3QiLCJhc3NpZ24iLCJjYXJkVmFsdWUxIiwiY2FyZFZhbHVlMiIsImNhcmRUb0Rpc2NhcmQiLCJjYXJkVG9Td2FwIiwiYWN0aW9uIiwibmV3U3RhdGUiLCJKU09OIiwicGFyc2UiLCJzdHJpbmdpZnkiLCJyYW5kb21DYXJkSWQiLCJjaGVja0dhbWVFbmQiLCJnYW1lRW5kIiwid2lubmVySWQiLCJ1cGRhdGVWYWx1ZVRhYmxlIiwiZW5hYmxlR3VhcmRHdWVzc0J1dHRvbiIsInByb3AiLCJkaXNhYmxlR3VhcmRHdWVzc0J1dHRvbiIsImVuYWJsZVBsYXlBZ2FpbnN0QnV0dG9uIiwiaW5kZXgiLCJkaXNhYmxlUGxheUFnYWluc3RCdXR0b24iLCJlbmFibGVQbGF5QnV0dG9uIiwiZGlzYWJsZVBsYXlCdXR0b24iLCJjb21wYXJlQ2FyZHMiLCJjYXJkMSIsImNhcmQyIiwiZ2V0TGl2aW5nUGxheWVyU2l6ZSIsInJlc3VsdCIsImNhbGN1bGF0ZVdpbm5lciIsImNhbGxlciIsImdldEF2YWlsYWJsZUNhcmRTaXplIiwiZ2V0SGlnaGVzdE5vdFlldEFwcGVhcmVkQ2FyZCIsImNhcmROYW1lIiwiZ2V0UmFuZG9tQ2FyZCIsInRvdGFsQ2FyZHMiLCJyYW5kb21DYXJkTnVtYmVyIiwidGVtcCIsImRyYXdlZENhcmQiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsIm5leHRQbGF5ZXIiLCJ0b3RhbFBsYXllcnMiLCJuZXh0UGxheWVySW5kZXgiLCJyZXNldFByb3RlY3Rpb24iLCJtYXAiLCJDQiIsImFyciIsImRyYXdDYXJkIiwiZHJhd0NhcmRGb3JQbGF5ZXIiLCJhZGRIb2xkaW5nQ2FyZHMiLCJhZGRQbGF5ZWRDYXJkIiwiY2hlY2tOb3REZWFkQW5kTm90UHJvdGVjdGVkIiwic2V0UGxheWVyRGVhZCIsImFkZFNlZW5DYXJkcyIsInNlZW5DYXJkIiwicG9wdWxhdGVWYWx1ZVRhYmxlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUFBQSxvQjtRQUNBQyw0QixHQUFBQSw0QjtRQUNBM0QsNkIsR0FBQUEsNkI7UUFDQXNELG1CLEdBQUFBLG1CO1FBQ0FFLGUsR0FBQUEsZTtRQUNBWSxVLEdBQUFBLFU7UUFDQU8sUSxHQUFBQSxRO1FBQ0FKLGUsR0FBQUEsZTtRQUNBbkosVyxHQUFBQSxXO1FBQ0F3SixpQixHQUFBQSxpQjtRQUNBRSxhLEdBQUFBLGE7UUFDQUQsZSxHQUFBQSxlO1FBQ0FJLFksR0FBQUEsWTtRQUNBRCxhLEdBQUFBLGE7UUFDQUQsMkIsR0FBQUEsMkI7UUFDQUksa0IsR0FBQUEsa0IiLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsInZhciBwbGF5Q2FyZCA9IGV4cG9ydHMucGxheUNhcmQgPSBmdW5jdGlvbiBwbGF5Q2FyZChjYXJkVG9QbGF5KSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ1BMQVlfQ0FSRCcsXG4gICAgY2FyZFRvUGxheTogY2FyZFRvUGxheVxuICB9O1xufTtcblxudmFyIGRpc2NhcmRDYXJkID0gZXhwb3J0cy5kaXNjYXJkQ2FyZCA9IGZ1bmN0aW9uIGRpc2NhcmRDYXJkKGNhcmQpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnRElTQ0FSRF9DQVJEJyxcbiAgICBjYXJkOiBjYXJkXG4gIH07XG59IiwiY29uc3QgY2FyZFJhbmsgPSB7XG4gICdHdWFyZCc6IDEsXG4gICdQcmllc3QnOiAyLFxuICAnQmFyb24nOiAzLFxuICAnSGFuZG1haWQnOiA0LFxuICAnUHJpbmNlJzogNSxcbiAgJ0tpbmcnOiA2LFxuICAnQ291bnRlc3MnOiA3LFxuICAnUHJpbmNlc3MnOiA4LFxufVxuXG5jb25zdCBjYXJkTmFtZXMgPSBbXG4gICdHdWFyZCcsXG4gICdQcmllc3QnLFxuICAnQmFyb24nLFxuICAnSGFuZG1haWQnLFxuICAnUHJpbmNlJyxcbiAgJ0tpbmcnLFxuICAnQ291bnRlc3MnLFxuICAnUHJpbmNlc3MnLFxuXTtcblxuY29uc3Qgc3RhcnRpbmdDYXJkcyA9IHtcbiAgJ0d1YXJkJzogNSxcbiAgJ1ByaWVzdCc6IDIsXG4gICdCYXJvbic6IDIsXG4gICdIYW5kbWFpZCc6IDIsXG4gICdQcmluY2UnOiAyLFxuICAnS2luZyc6IDEsXG4gICdDb3VudGVzcyc6IDEsXG4gICdQcmluY2Vzcyc6IDEsXG59O1xuXG5jb25zdCBub25BdHRhY2tpbmdDYXJkcyA9IFtcbiAgJ0hhbmRtYWlkJyxcbiAgJ0NvdW50ZXNzJyxcbiAgJ0tpbmcnLFxuXTtcblxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICBjb3VudGVyOiAwLFxuICBjdXJyZW50UGxheWVySWQ6IDEsXG4gIHBsYXllcnM6IFtcbiAgICB7XG4gICAgICBpZDogMSxcbiAgICAgIGRlYWQ6IGZhbHNlLFxuICAgICAgcHJvdGVjdGVkOiBmYWxzZSxcbiAgICAgIGhvbGRpbmdDYXJkczogW10sXG4gICAgICBwbGF5ZWRDYXJkczogW10sXG4gICAgICBzZWVuQ2FyZHM6IFtdLFxuICAgIH0sXG4gICAge1xuICAgICAgaWQ6IDIsXG4gICAgICBkZWFkOiBmYWxzZSxcbiAgICAgIHByb3RlY3RlZDogZmFsc2UsXG4gICAgICBob2xkaW5nQ2FyZHM6IFtdLFxuICAgICAgcGxheWVkQ2FyZHM6IFtdLFxuICAgICAgc2VlbkNhcmRzOiBbXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGlkOiAzLFxuICAgICAgZGVhZDogZmFsc2UsXG4gICAgICBwcm90ZWN0ZWQ6IGZhbHNlLFxuICAgICAgaG9sZGluZ0NhcmRzOiBbXSxcbiAgICAgIHBsYXllZENhcmRzOiBbXSxcbiAgICAgIHNlZW5DYXJkczogW10sXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogNCxcbiAgICAgIGRlYWQ6IGZhbHNlLFxuICAgICAgcHJvdGVjdGVkOiBmYWxzZSxcbiAgICAgIGhvbGRpbmdDYXJkczogW10sXG4gICAgICBwbGF5ZWRDYXJkczogW10sXG4gICAgICBzZWVuQ2FyZHM6IFtdLFxuICAgIH1cbiAgXSxcbiAgZmlyc3RDYXJkOiB7XG5cbiAgfSxcbiAgYXZhaWxhYmxlQ2FyZHM6IHtcbiAgICAnR3VhcmQnOiA1LFxuICAgICdQcmllc3QnOiAyLFxuICAgICdCYXJvbic6IDIsXG4gICAgJ0hhbmRtYWlkJzogMixcbiAgICAnUHJpbmNlJzogMixcbiAgICAnS2luZyc6IDEsXG4gICAgJ0NvdW50ZXNzJzogMSxcbiAgICAnUHJpbmNlc3MnOiAxLFxuICB9LFxuICBnYW1lRW5kczoge1xuICAgIHdpbm5lcjogbnVsbFxuICB9LFxuICBidXR0b25TdGF0ZXM6IHtcbiAgICBjaG9vc2VDYXJkOiB0cnVlLFxuICAgIHBsYXlBZ2FpbnN0OiBmYWxzZSxcbiAgICBHdWFyZEd1ZXNzOiBmYWxzZSxcbiAgfSxcbiAgcmVhZHlGb3JOZXh0VHVybjogZmFsc2UsXG4gIGNhcmRUb1BsYXk6IHtcbiAgICBjYXJkSWQ6IG51bGwsXG4gICAgcGxheUFnYWluc3Q6IC0xLFxuICAgIGd1YXJkR3Vlc3M6IC0xXG4gIH0sXG4gIHZhbHVlVGFibGU6IHtcbiAgICBjYXJkSWQ6IFtcbiAgICAgIHtcbiAgICAgICAgcGxheUFnYWluc3Q6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBndWVzczogW11cbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGd1ZXNzOiBbXVxuICAgICAgICAgIH0se1xuICAgICAgICAgICAgZ3Vlc3M6IFtdXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwbGF5QWdhaW5zdDogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGd1ZXNzOiBbXVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgZ3Vlc3M6IFtdXG4gICAgICAgICAgfSx7XG4gICAgICAgICAgICBndWVzczogW11cbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHBsYXlBZ2FpbnN0OiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgZ3Vlc3M6IFtdXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBndWVzczogW11cbiAgICAgICAgICB9LHtcbiAgICAgICAgICAgIGd1ZXNzOiBbXVxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcGxheUFnYWluc3Q6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBndWVzczogW11cbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGd1ZXNzOiBbXVxuICAgICAgICAgIH0se1xuICAgICAgICAgICAgZ3Vlc3M6IFtdXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwbGF5QWdhaW5zdDogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGd1ZXNzOiBbXVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgZ3Vlc3M6IFtdXG4gICAgICAgICAgfSx7XG4gICAgICAgICAgICBndWVzczogW11cbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHBsYXlBZ2FpbnN0OiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgZ3Vlc3M6IFtdXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBndWVzczogW11cbiAgICAgICAgICB9LHtcbiAgICAgICAgICAgIGd1ZXNzOiBbXVxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcGxheUFnYWluc3Q6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBndWVzczogW11cbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGd1ZXNzOiBbXVxuICAgICAgICAgIH0se1xuICAgICAgICAgICAgZ3Vlc3M6IFtdXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwbGF5QWdhaW5zdDogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGd1ZXNzOiBbXVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgZ3Vlc3M6IFtdXG4gICAgICAgICAgfSx7XG4gICAgICAgICAgICBndWVzczogW11cbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgXVxuICB9XG59O1xuXG5leHBvcnQge1xuICBjYXJkUmFuayxcbiAgY2FyZE5hbWVzLFxuICBpbml0aWFsU3RhdGUsXG4gIG5vbkF0dGFja2luZ0NhcmRzLFxuICBzdGFydGluZ0NhcmRzLFxufSIsImltcG9ydCB7IGNvdW50ZXIgfSBmcm9tICcuL3JlZHVjZXJzJztcbmltcG9ydCB7IGNhcmROYW1lcyB9IGZyb20gJy4vY29uc3QnO1xuaW1wb3J0IGFjdGlvbnMgZnJvbSAnLi9hY3Rpb25zJztcbmltcG9ydCB7IGRpc2FibGVQbGF5QnV0dG9uLCBkaXNhYmxlUGxheUFnYWluc3RCdXR0b24sIGRpc2FibGVHdWFyZEd1ZXNzQnV0dG9uLCBlbmFibGVQbGF5QnV0dG9uLCBlbmFibGVQbGF5QWdhaW5zdEJ1dHRvbiwgZW5hYmxlR3VhcmRHdWVzc0J1dHRvbiB9IGZyb20gJy4vc2V0QnV0dG9uU3RhdGUnO1xuaW1wb3J0IHsgZ2V0QXZhaWxhYmxlQ2FyZFNpemUgfSBmcm9tICcuL3V0aWwnO1xuXG52YXIgc3RvcmUgPSBSZWR1eC5jcmVhdGVTdG9yZShSZWR1eC5jb21iaW5lUmVkdWNlcnMoe2NvdW50ZXJ9KSxcbiAgd2luZG93Ll9fUkVEVVhfREVWVE9PTFNfRVhURU5TSU9OX18gJiYgd2luZG93Ll9fUkVEVVhfREVWVE9PTFNfRVhURU5TSU9OX18oKSk7XG5cbmZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgJCgnI2N1cnJlbnRQbGF5ZXJJZCcpLnRleHQoc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLmN1cnJlbnRQbGF5ZXJJZC50b1N0cmluZygpKTtcbiAgbGV0IGh1bWFuUGxheWVySWQgPSAwOyAvLyBzdG9yZS5nZXRTdGF0ZSgpLmNvdW50ZXIuY3VycmVudFBsYXllcklkIC0gMVxuICBpZiAoc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLmdhbWVFbmRzLndpbm5lciA9PT0gbnVsbCAmJiBzdG9yZS5nZXRTdGF0ZSgpLmNvdW50ZXIucGxheWVyc1todW1hblBsYXllcklkXS5ob2xkaW5nQ2FyZHMubGVuZ3RoID4gMCkge1xuICAgICQoJyNwbGF5QnV0dG9uMScpLnRleHQoY2FyZE5hbWVzW3N0b3JlLmdldFN0YXRlKCkuY291bnRlci5wbGF5ZXJzW2h1bWFuUGxheWVySWRdLmhvbGRpbmdDYXJkc1swXS50b1N0cmluZygpIC0gMV0pO1xuICB9XG5cbiAgaWYgKHN0b3JlLmdldFN0YXRlKCkuY291bnRlci5nYW1lRW5kcy53aW5uZXIgPT09IG51bGwgJiYgc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLnBsYXllcnNbaHVtYW5QbGF5ZXJJZF0uaG9sZGluZ0NhcmRzLmxlbmd0aCA+IDEpIHtcbiAgICAkKCcjcGxheUJ1dHRvbjInKS50ZXh0KGNhcmROYW1lc1tzdG9yZS5nZXRTdGF0ZSgpLmNvdW50ZXIucGxheWVyc1todW1hblBsYXllcklkXS5ob2xkaW5nQ2FyZHNbMV0udG9TdHJpbmcoKSAtIDFdKTtcbiAgfSBlbHNlIHtcbiAgICAkKCcjcGxheUJ1dHRvbjInKS50ZXh0KCcnKTtcbiAgfVxuXG4gIGlmIChzdG9yZS5nZXRTdGF0ZSgpLmNvdW50ZXIuZ2FtZUVuZHMud2lubmVyID09PSBudWxsKSB7XG4gICAgJChgI3BsYXllclBsYXllZExpc3QxYCkuZW1wdHkoKTtcbiAgICAkKGAjcGxheWVyUGxheWVkTGlzdDJgKS5lbXB0eSgpO1xuICAgICQoYCNwbGF5ZXJQbGF5ZWRMaXN0M2ApLmVtcHR5KCk7XG4gICAgJChgI3BsYXllclBsYXllZExpc3Q0YCkuZW1wdHkoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0b3JlLmdldFN0YXRlKCkuY291bnRlci5wbGF5ZXJzWzBdLnBsYXllZENhcmRzLmxlbmd0aDsgKytpKSB7XG4gICAgICByZW5kZXJQbGF5ZWRDYXJkcygwLCBpKTtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdG9yZS5nZXRTdGF0ZSgpLmNvdW50ZXIucGxheWVyc1sxXS5wbGF5ZWRDYXJkcy5sZW5ndGg7ICsraSkge1xuICAgICAgcmVuZGVyUGxheWVkQ2FyZHMoMSwgaSk7XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLnBsYXllcnNbMl0ucGxheWVkQ2FyZHMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHJlbmRlclBsYXllZENhcmRzKDIsIGkpO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0b3JlLmdldFN0YXRlKCkuY291bnRlci5wbGF5ZXJzWzNdLnBsYXllZENhcmRzLmxlbmd0aDsgKytpKSB7XG4gICAgICByZW5kZXJQbGF5ZWRDYXJkcygzLCBpKTtcbiAgICB9XG4gIH1cblxuICAkKCcjcHJpZXN0TGlzdCcpLmVtcHR5KCk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLnBsYXllcnNbMF0uc2VlbkNhcmRzLmxlbmd0aDsgKytpKSB7XG4gICAgJCgnI3ByaWVzdExpc3QnKS5hcHBlbmQoYDxsaSBjbGFzcz1cIml0ZW1cIj5QbGF5ZXIgJHtzdG9yZS5nZXRTdGF0ZSgpLmNvdW50ZXIucGxheWVyc1swXS5zZWVuQ2FyZHNbaV0ucGxheWVySWR9IGhhcyAke2NhcmROYW1lc1tzdG9yZS5nZXRTdGF0ZSgpLmNvdW50ZXIucGxheWVyc1swXS5zZWVuQ2FyZHNbaV0uY2FyZElkIC0gMV19PC9saT5gKTtcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgKytpKSB7XG4gICAgJChgI3BsYXllclRpdGxlJHtpICsgMX1gKS5yZW1vdmVDbGFzcyhcInBsYXllclByb3RlY3RlZFwiKTtcbiAgICAkKGAjcGxheWVyVGl0bGUke2kgKyAxfWApLnJlbW92ZUNsYXNzKFwicGxheWVyRGVhZFwiKTtcbiAgICAkKGAjcGxheWVyVGl0bGUke2kgKyAxfWApLnJlbW92ZUNsYXNzKFwicGxheWVyV2luXCIpO1xuICB9XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyArK2kpIHtcbiAgICBpZiAoc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLnBsYXllcnNbaV0uZGVhZCkge1xuICAgICAgJChgI3BsYXllclRpdGxlJHtpICsgMX1gKS5hdHRyKFwiY2xhc3NcIixcInBsYXllckRlYWRcIik7XG4gICAgICAkKGAjcGxheWVyVGl0bGUke2kgKyAxfWApLnRleHQoYFBsYXllciAke2kgKyAxfSAtICR7Y2FyZE5hbWVzW3N0b3JlLmdldFN0YXRlKCkuY291bnRlci5wbGF5ZXJzW2ldLmhvbGRpbmdDYXJkc1swXSAtIDFdfWApO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKGAjcGxheWVyVGl0bGUke2kgKyAxfWApLnRleHQoYFBsYXllciAke2kgKyAxfWApO1xuICAgIH1cbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgKytpKSB7XG4gICAgaWYgKHN0b3JlLmdldFN0YXRlKCkuY291bnRlci5wbGF5ZXJzW2ldLnByb3RlY3RlZCkge1xuICAgICAgJChgI3BsYXllclRpdGxlJHtpICsgMX1gKS5hdHRyKFwiY2xhc3NcIixcInBsYXllclByb3RlY3RlZFwiKTtcbiAgICB9XG4gIH1cblxuICBpZiAoc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLmdhbWVFbmRzLndpbm5lciAhPT0gbnVsbCkge1xuICAgICQoJyNzdGF0dXMnKS50ZXh0KGBXaW5uZXIgaXMgJHtzdG9yZS5nZXRTdGF0ZSgpLmNvdW50ZXIuZ2FtZUVuZHMud2lubmVyLmlkfWApO1xuICAgICQoYCNwbGF5ZXJUaXRsZSR7c3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLmdhbWVFbmRzLndpbm5lci5pZH1gKS5hdHRyKFwiY2xhc3NcIixcInBsYXllcldpblwiKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7ICsraSkge1xuICAgICAgaWYgKCFzdG9yZS5nZXRTdGF0ZSgpLmNvdW50ZXIucGxheWVyc1tpXS5kZWFkKSB7XG4gICAgICAgICQoYCNwbGF5ZXJUaXRsZSR7aSArIDF9YCkudGV4dChgUGxheWVyICR7aSArIDF9IC0gJHtjYXJkTmFtZXNbc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLnBsYXllcnNbaV0uaG9sZGluZ0NhcmRzWzBdIC0gMV19YCk7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgICQoJyNzdGF0dXMnKS50ZXh0KGBQbGF5ZXIgJHtzdG9yZS5nZXRTdGF0ZSgpLmNvdW50ZXIuY3VycmVudFBsYXllcklkfSdzIHR1cm4uICR7Z2V0QXZhaWxhYmxlQ2FyZFNpemUoc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLmF2YWlsYWJsZUNhcmRzKX0gY2FyZHMgbGVmdGApO1xuICB9XG5cbiAgaWYgKHN0b3JlLmdldFN0YXRlKCkuY291bnRlci5idXR0b25TdGF0ZXMuY2hvb3NlQ2FyZCkge1xuICAgIGVuYWJsZVBsYXlCdXR0b24oKTtcbiAgfSBlbHNlIHtcbiAgICBkaXNhYmxlUGxheUJ1dHRvbigpO1xuICB9XG5cbiAgaWYgKHN0b3JlLmdldFN0YXRlKCkuY291bnRlci5idXR0b25TdGF0ZXMucGxheUFnYWluc3QpIHtcbiAgICBlbmFibGVQbGF5QWdhaW5zdEJ1dHRvbihzdG9yZS5nZXRTdGF0ZSgpLmNvdW50ZXIucGxheWVycyk7XG4gIH0gZWxzZSB7XG4gICAgZGlzYWJsZVBsYXlBZ2FpbnN0QnV0dG9uKCk7XG4gIH1cblxuICBpZiAoc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLmJ1dHRvblN0YXRlcy5ndWFyZEd1ZXNzKSB7XG4gICAgZW5hYmxlR3VhcmRHdWVzc0J1dHRvbigpO1xuICB9IGVsc2Uge1xuICAgIGRpc2FibGVHdWFyZEd1ZXNzQnV0dG9uKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVuZGVyUGxheWVkQ2FyZHMocGxheWVySWQsIGNhcmRJZHgpIHtcbiAgbGV0IHN0cmluZyA9IGNhcmROYW1lc1tzdG9yZS5nZXRTdGF0ZSgpLmNvdW50ZXIucGxheWVyc1twbGF5ZXJJZF0ucGxheWVkQ2FyZHNbY2FyZElkeF0uY2FyZElkIC0gMV07XG4gIGlmIChzdG9yZS5nZXRTdGF0ZSgpLmNvdW50ZXIucGxheWVyc1twbGF5ZXJJZF0ucGxheWVkQ2FyZHNbY2FyZElkeF0uZGlzY2FyZGVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAkKGAjcGxheWVyUGxheWVkTGlzdCR7cGxheWVySWQgKyAxfWApLmFwcGVuZChgPGxpIGNsYXNzPVwiaXRlbSBkaXNjYXJkXCI+JHtzdHJpbmd9PC9saT5gKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLnBsYXllcnNbcGxheWVySWRdLnBsYXllZENhcmRzW2NhcmRJZHhdLnBsYXlBZ2FpbnN0ICE9PSAtMSkge1xuICAgICAgc3RyaW5nICs9ICcgcGxheSBhZ2FpbnN0ICcgKyBzdG9yZS5nZXRTdGF0ZSgpLmNvdW50ZXIucGxheWVyc1twbGF5ZXJJZF0ucGxheWVkQ2FyZHNbY2FyZElkeF0ucGxheUFnYWluc3Q7XG4gICAgfVxuICAgIGlmIChzdG9yZS5nZXRTdGF0ZSgpLmNvdW50ZXIucGxheWVyc1twbGF5ZXJJZF0ucGxheWVkQ2FyZHNbY2FyZElkeF0uZ3VhcmRHdWVzcyAhPT0gLTEpIHtcbiAgICAgIHN0cmluZyArPSAnLCBndWVzc2luZyAnICsgY2FyZE5hbWVzW3N0b3JlLmdldFN0YXRlKCkuY291bnRlci5wbGF5ZXJzW3BsYXllcklkXS5wbGF5ZWRDYXJkc1tjYXJkSWR4XS5ndWFyZEd1ZXNzIC0gMV07XG4gICAgfVxuICAgICQoYCNwbGF5ZXJQbGF5ZWRMaXN0JHtwbGF5ZXJJZCArIDF9YCkuYXBwZW5kKGA8bGkgY2xhc3M9XCJpdGVtXCI+JHtzdHJpbmd9PC9saT5gKTtcbiAgfVxufVxucmVuZGVyKClcbnN0b3JlLnN1YnNjcmliZShyZW5kZXIpXG5cbiQoJyNwbGF5QnV0dG9uMScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgc3RvcmUuZGlzcGF0Y2goe3R5cGU6ICdDSE9PU0VfQ0FSRCcsIGNhcmRJZDogc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLnBsYXllcnNbc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLmN1cnJlbnRQbGF5ZXJJZCAtIDFdLmhvbGRpbmdDYXJkc1swXX0pO1xuICBpZiAoc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLnJlYWR5Rm9yTmV4dFR1cm4pIHtcbiAgICBzdG9yZS5kaXNwYXRjaChhY3Rpb25zLnBsYXlDYXJkKHN0b3JlLmdldFN0YXRlKCkuY291bnRlci5jYXJkVG9QbGF5KSk7XG4gICAgbmV4dFR1cm4oKTtcbiAgfVxufSk7XG5cbiQoJyNwbGF5QnV0dG9uMicpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgc3RvcmUuZGlzcGF0Y2goe3R5cGU6ICdDSE9PU0VfQ0FSRCcsIGNhcmRJZDogc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLnBsYXllcnNbc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLmN1cnJlbnRQbGF5ZXJJZCAtIDFdLmhvbGRpbmdDYXJkc1sxXX0pO1xuICBpZiAoc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLnJlYWR5Rm9yTmV4dFR1cm4pIHtcbiAgICBzdG9yZS5kaXNwYXRjaChhY3Rpb25zLnBsYXlDYXJkKHN0b3JlLmdldFN0YXRlKCkuY291bnRlci5jYXJkVG9QbGF5KSk7XG4gICAgbmV4dFR1cm4oKTtcbiAgfVxufSk7XG5cbiQoJyNwbGF5QWdhaW5zdEJ1dHRvbjEnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgc3RvcmUuZGlzcGF0Y2goe3R5cGU6ICdQTEFZX0FHQUlOU1QnLCBwbGF5QWdhaW5zdDogMX0pO1xuICBpZiAoc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLnJlYWR5Rm9yTmV4dFR1cm4pIHtcbiAgICBzdG9yZS5kaXNwYXRjaChhY3Rpb25zLnBsYXlDYXJkKHN0b3JlLmdldFN0YXRlKCkuY291bnRlci5jYXJkVG9QbGF5KSk7XG4gICAgbmV4dFR1cm4oKTtcbiAgfVxufSk7XG5cbiQoJyNwbGF5QWdhaW5zdEJ1dHRvbjInKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgc3RvcmUuZGlzcGF0Y2goe3R5cGU6ICdQTEFZX0FHQUlOU1QnLCBwbGF5QWdhaW5zdDogMn0pO1xuICBpZiAoc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLnJlYWR5Rm9yTmV4dFR1cm4pIHtcbiAgICBzdG9yZS5kaXNwYXRjaChhY3Rpb25zLnBsYXlDYXJkKHN0b3JlLmdldFN0YXRlKCkuY291bnRlci5jYXJkVG9QbGF5KSk7XG4gICAgbmV4dFR1cm4oKTtcbiAgfVxufSk7XG5cbiQoJyNwbGF5QWdhaW5zdEJ1dHRvbjMnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgc3RvcmUuZGlzcGF0Y2goe3R5cGU6ICdQTEFZX0FHQUlOU1QnLCBwbGF5QWdhaW5zdDogM30pO1xuICBpZiAoc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLnJlYWR5Rm9yTmV4dFR1cm4pIHtcbiAgICBzdG9yZS5kaXNwYXRjaChhY3Rpb25zLnBsYXlDYXJkKHN0b3JlLmdldFN0YXRlKCkuY291bnRlci5jYXJkVG9QbGF5KSk7XG4gICAgbmV4dFR1cm4oKTtcbiAgfVxufSk7XG5cbiQoJyNwbGF5QWdhaW5zdEJ1dHRvbjQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgc3RvcmUuZGlzcGF0Y2goe3R5cGU6ICdQTEFZX0FHQUlOU1QnLCBwbGF5QWdhaW5zdDogNH0pO1xuICBpZiAoc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLnJlYWR5Rm9yTmV4dFR1cm4pIHtcbiAgICBzdG9yZS5kaXNwYXRjaChhY3Rpb25zLnBsYXlDYXJkKHN0b3JlLmdldFN0YXRlKCkuY291bnRlci5jYXJkVG9QbGF5KSk7XG4gICAgbmV4dFR1cm4oKTtcbiAgfVxufSk7XG5cbiQoJyNndWFyZEd1ZXNzQnV0dG9uMicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICBzdG9yZS5kaXNwYXRjaCh7dHlwZTogJ0dVQVJEX0dVRVNTJywgZ3VhcmRHdWVzczogMn0pO1xuICBpZiAoc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLnJlYWR5Rm9yTmV4dFR1cm4pIHtcbiAgICBzdG9yZS5kaXNwYXRjaChhY3Rpb25zLnBsYXlDYXJkKHN0b3JlLmdldFN0YXRlKCkuY291bnRlci5jYXJkVG9QbGF5KSk7XG4gICAgbmV4dFR1cm4oKTtcbiAgfVxufSk7XG5cbiQoJyNndWFyZEd1ZXNzQnV0dG9uMycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICBzdG9yZS5kaXNwYXRjaCh7dHlwZTogJ0dVQVJEX0dVRVNTJywgZ3VhcmRHdWVzczogM30pO1xuICBpZiAoc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLnJlYWR5Rm9yTmV4dFR1cm4pIHtcbiAgICBzdG9yZS5kaXNwYXRjaChhY3Rpb25zLnBsYXlDYXJkKHN0b3JlLmdldFN0YXRlKCkuY291bnRlci5jYXJkVG9QbGF5KSk7XG4gICAgbmV4dFR1cm4oKTtcbiAgfVxufSk7XG5cbiQoJyNndWFyZEd1ZXNzQnV0dG9uNCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICBzdG9yZS5kaXNwYXRjaCh7dHlwZTogJ0dVQVJEX0dVRVNTJywgZ3VhcmRHdWVzczogNH0pO1xuICBpZiAoc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLnJlYWR5Rm9yTmV4dFR1cm4pIHtcbiAgICBzdG9yZS5kaXNwYXRjaChhY3Rpb25zLnBsYXlDYXJkKHN0b3JlLmdldFN0YXRlKCkuY291bnRlci5jYXJkVG9QbGF5KSk7XG4gICAgbmV4dFR1cm4oKTtcbiAgfVxufSk7XG5cbiQoJyNndWFyZEd1ZXNzQnV0dG9uNScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICBzdG9yZS5kaXNwYXRjaCh7dHlwZTogJ0dVQVJEX0dVRVNTJywgZ3VhcmRHdWVzczogNX0pO1xuICBpZiAoc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLnJlYWR5Rm9yTmV4dFR1cm4pIHtcbiAgICBzdG9yZS5kaXNwYXRjaChhY3Rpb25zLnBsYXlDYXJkKHN0b3JlLmdldFN0YXRlKCkuY291bnRlci5jYXJkVG9QbGF5KSk7XG4gICAgbmV4dFR1cm4oKTtcbiAgfVxufSk7XG5cbiQoJyNndWFyZEd1ZXNzQnV0dG9uNicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICBzdG9yZS5kaXNwYXRjaCh7dHlwZTogJ0dVQVJEX0dVRVNTJywgZ3VhcmRHdWVzczogNn0pO1xuICBpZiAoc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLnJlYWR5Rm9yTmV4dFR1cm4pIHtcbiAgICBzdG9yZS5kaXNwYXRjaChhY3Rpb25zLnBsYXlDYXJkKHN0b3JlLmdldFN0YXRlKCkuY291bnRlci5jYXJkVG9QbGF5KSk7XG4gICAgbmV4dFR1cm4oKTtcbiAgfVxufSk7XG5cbiQoJyNndWFyZEd1ZXNzQnV0dG9uNycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICBzdG9yZS5kaXNwYXRjaCh7dHlwZTogJ0dVQVJEX0dVRVNTJywgZ3VhcmRHdWVzczogN30pO1xuICBpZiAoc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLnJlYWR5Rm9yTmV4dFR1cm4pIHtcbiAgICBzdG9yZS5kaXNwYXRjaChhY3Rpb25zLnBsYXlDYXJkKHN0b3JlLmdldFN0YXRlKCkuY291bnRlci5jYXJkVG9QbGF5KSk7XG4gICAgbmV4dFR1cm4oKTtcbiAgfVxufSk7XG5cbiQoJyNndWFyZEd1ZXNzQnV0dG9uOCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICBzdG9yZS5kaXNwYXRjaCh7dHlwZTogJ0dVQVJEX0dVRVNTJywgZ3VhcmRHdWVzczogOH0pO1xuICBpZiAoc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLnJlYWR5Rm9yTmV4dFR1cm4pIHtcbiAgICBzdG9yZS5kaXNwYXRjaChhY3Rpb25zLnBsYXlDYXJkKHN0b3JlLmdldFN0YXRlKCkuY291bnRlci5jYXJkVG9QbGF5KSk7XG4gICAgbmV4dFR1cm4oKTtcbiAgfVxufSk7XG5cbmZ1bmN0aW9uIG5leHRUdXJuKCkge1xuICBpZiAoc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLmdhbWVFbmRzLndpbm5lciAhPT0gbnVsbCkge1xuICAgIC8vIEdhbWUgZW5kXG4gICAgcmV0dXJuO1xuICB9IGVsc2UgaWYgKHN0b3JlLmdldFN0YXRlKCkuY291bnRlci5jdXJyZW50UGxheWVySWQgIT09IDEgfHwgc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLnBsYXllcnNbMF0uZGVhZCkge1xuICAgIC8vIEFJIG1vdmVcbiAgICAvLyBEaXNhYmxlIGJ1dHRvbnNcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgLy8gc3RvcmUuZGlzcGF0Y2goe3R5cGU6ICdBSV9NT1ZFJ30pO1xuICAgICAgLy8gVE9ETzogcmFuZG9tbHkgY2hvb3NlIGEgY2FyZFxuICAgICAgc3RvcmUuZGlzcGF0Y2goeyB0eXBlOiAnRFJBV19DQVJEJywgcGxheWVyOiBzdG9yZS5nZXRTdGF0ZSgpLmNvdW50ZXIuY3VycmVudFBsYXllcklkfSk7XG4gICAgICBsZXQgcmFuZG9tQUlDYXJkID0gcmFuZG9tQUkoc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLnBsYXllcnMsIHN0b3JlLmdldFN0YXRlKCkuY291bnRlci5jdXJyZW50UGxheWVySWQpO1xuICAgICAgc3RvcmUuZGlzcGF0Y2goYWN0aW9ucy5wbGF5Q2FyZChyYW5kb21BSUNhcmQpKTtcbiAgICAgIG5leHRUdXJuKCk7XG4gICAgfSwgMTAwMCk7XG4gIH0gZWxzZSB7XG4gICAgc3RvcmUuZGlzcGF0Y2goeyB0eXBlOiAnRFJBV19DQVJEJywgcGxheWVyOiBzdG9yZS5nZXRTdGF0ZSgpLmNvdW50ZXIuY3VycmVudFBsYXllcklkfSk7XG4gICAgLy8gVXBkYXRlIFZhbHVlIFRhYmxlXG4gICAgc3RvcmUuZGlzcGF0Y2goe3R5cGU6ICdVUERBVEVfVkFMVUVfVEFMQkUnLCBwcmV2aW91c1N0YXRlOiB7cGxheWVyRGVhZH19KVxuICAgIC8vIFdhaXQgZm9yIGh1bWFuIGlucHV0XG4gICAgbGV0IHJhbmRvbUFJQ2FyZCA9IHJlaW5mb3JjZW1lbnRBSShzdG9yZS5nZXRTdGF0ZSgpLmNvdW50ZXIucGxheWVycywgc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLmN1cnJlbnRQbGF5ZXJJZCk7XG4gICAgc3RvcmUuZGlzcGF0Y2goYWN0aW9ucy5wbGF5Q2FyZChyYW5kb21BSUNhcmQpKTtcbiAgICBuZXh0VHVybigpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHZhbHVlKGNhcmRJZCwgcGxheWVySWQsIGd1ZXNzKSB7XG4gIC8vIGxvb2sgdXAgYSB0YWJsZSBhbmQgcmV0dXJuIHRoZSB2YWx1ZSBvZiBhY3Rpb25cbiAgcmV0dXJuIHN0b3JlLmdldFN0YXRlKCkuY291bnRlci52YWx1ZVRhYmxlLmNhcmRJZFtjYXJkSWQgLSAxXS5wbGF5QWdhaW5zdFtwbGF5ZXJJZCAtIDFdLmd1ZXNzW2d1ZXNzIC0gMV07XG59XG5cbmZ1bmN0aW9uIHJlaW5mb3JjZW1lbnRBSShwbGF5ZXJzLCBwbGF5ZXJJZCkge1xuICBsZXQgY2FyZDFJZCA9IHBsYXllcnNbcGxheWVySWQgLSAxXS5ob2xkaW5nQ2FyZHNbMF07XG4gIGxldCBjYXJkMklkID0gcGxheWVyc1twbGF5ZXJJZCAtIDFdLmhvbGRpbmdDYXJkc1sxXTtcblxuICBsZXQgY2FyZDFNYXhWYWx1ZSA9IC0xMDAwLCBjYXJkMk1heFZhbHVlID0gLTEwMDA7XG4gIGxldCBwbGF5QWdhaW5zdDEgPSAtMSwgcGxheUFnYWluc3QyID0gLTE7XG4gIGxldCBndWVzczEgPSAtMSwgZ3Vlc3MyID0gLTE7XG5cbiAgZm9yICh2YXIgcGxheUFnYWluc3QgPSAxOyBwbGF5QWdhaW5zdCA8IDQ7ICsrcGxheUFnYWluc3QpIHtcbiAgICBpZiAoY2FyZDFJZCA9PT0gMSkge1xuICAgICAgZm9yICh2YXIgZ3Vlc3MgPSAyOyBndWVzcyA8IDk7ICsrZ3Vlc3MpIHtcbiAgICAgICAgaWYgKGNhcmQxTWF4VmFsdWUgPCB2YWx1ZShjYXJkMUlkLCBwbGF5QWdhaW5zdCwgZ3Vlc3MpKSB7XG4gICAgICAgICAgY2FyZDFNYXhWYWx1ZSA9IHZhbHVlKGNhcmQxSWQsIHBsYXlBZ2FpbnN0LCBndWVzcyk7XG4gICAgICAgICAgcGxheUFnYWluc3QxID0gcGxheUFnYWluc3Q7XG4gICAgICAgICAgZ3Vlc3MxID0gZ3Vlc3M7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGNhcmQxTWF4VmFsdWUgPCB2YWx1ZShjYXJkMUlkLCBwbGF5QWdhaW5zdCwgLTEpKSB7XG4gICAgICAgIGNhcmQxTWF4VmFsdWUgPSB2YWx1ZShjYXJkMUlkLCBwbGF5QWdhaW5zdCwgLTEpO1xuICAgICAgICBwbGF5QWdhaW5zdDEgPSBwbGF5QWdhaW5zdDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBwbGF5QWdhaW5zdCA9IDE7IHBsYXlBZ2FpbnN0IDwgNDsgKytwbGF5QWdhaW5zdCkge1xuICAgIGlmIChjYXJkMUlkID09PSAxKSB7XG4gICAgICBmb3IgKHZhciBndWVzcyA9IDI7IGd1ZXNzIDwgOTsgKytndWVzcykge1xuICAgICAgICBpZiAoY2FyZDJNYXhWYWx1ZSA8IHZhbHVlKGNhcmQySWQsIHBsYXlBZ2FpbnN0LCBndWVzcykpIHtcbiAgICAgICAgICBjYXJkMk1heFZhbHVlID0gdmFsdWUoY2FyZDJJZCwgcGxheUFnYWluc3QsIGd1ZXNzKTtcbiAgICAgICAgICBwbGF5QWdhaW5zdDIgPSBwbGF5QWdhaW5zdDtcbiAgICAgICAgICBndWVzczIgPSBndWVzcztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoY2FyZDJNYXhWYWx1ZSA8IHZhbHVlKGNhcmQySWQsIHBsYXlBZ2FpbnN0LCAtMSkpIHtcbiAgICAgICAgY2FyZDJNYXhWYWx1ZSA9IHZhbHVlKGNhcmQySWQsIHBsYXlBZ2FpbnN0LCAtMSk7XG4gICAgICAgIHBsYXlBZ2FpbnN0MiA9IHBsYXlBZ2FpbnN0O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjYXJkMU1heFZhbHVlID4gY2FyZDJNYXhWYWx1ZSA/XG4gICAge2NhcmRJZDogY2FyZDFJZCwgcGxheUFnYWluc3Q6IHBsYXlBZ2FpbnN0MSwgZ3VhcmRHdWVzczogZ3Vlc3MxfSA6XG4gICAge2NhcmRJZDogY2FyZDJJZCwgcGxheUFnYWluc3Q6IHBsYXlBZ2FpbnN0MiwgZ3VhcmRHdWVzczogZ3Vlc3MyfTtcbn1cblxuZnVuY3Rpb24gcmFuZG9tQUkocGxheWVycywgcGxheWVySWQpIHtcbiAgbGV0IGNhcmRJZDtcbiAgaWYgKHBsYXllcnNbcGxheWVySWQgLSAxXS5ob2xkaW5nQ2FyZHMuaW5kZXhPZig0KSAhPT0gLTEpIHtcbiAgICAvLyBQcmlvcml0aXplIG9uIHBsYXlpbmcgaGFuZG1haWQuXG4gICAgY2FyZElkID0gNDtcbiAgfSBlbHNlIHtcbiAgICBpZiAocGxheWVyc1twbGF5ZXJJZCAtIDFdLmhvbGRpbmdDYXJkc1swXSA8IHBsYXllcnNbcGxheWVySWQgLSAxXS5ob2xkaW5nQ2FyZHNbMV0pIHtcbiAgICAgIGNhcmRJZCA9IHBsYXllcnNbcGxheWVySWQgLSAxXS5ob2xkaW5nQ2FyZHNbMF07XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhcmRJZCA9IHBsYXllcnNbcGxheWVySWQgLSAxXS5ob2xkaW5nQ2FyZHNbMV07XG4gICAgfVxuICB9XG5cbiAgbGV0IGd1YXJkR3Vlc3M7XG4gIGlmIChjYXJkSWQgPT09IDEpIHtcbiAgICAvLyBSYW5kb21seSBjaG9vc2UgZnJvbSB0aGUgaGlnaGVzdCBub3QgeWV0IGFwcGVhcmVkIGNhcmQuXG4gICAgLy8gY2FyZFRvR3Vlc3MgPSBnZXRIaWdoZXN0Tm90WWV0QXBwZWFyZWRDYXJkKHRoaXMuY2FyZHMsIGNhcmRzTm90UGxheWVkWWV0KTtcbiAgICBndWFyZEd1ZXNzID0gODsgLy8gTWFrZSB0aGlzIHNtYXJ0ZXIuXG4gIH1cblxuICBsZXQgcGxheUFnYWluc3QgPSBwbGF5ZXJJZCAlIDQgKyAxO1xuICBsZXQgZ2V0Tm9uRGVhZE5vblByb3RlY3RlZFBsYXllckxpc3QgPSBnZXROb25EZWFkTm9uUHJvdGVjdGVkUGxheWVycyhwbGF5ZXJJZCwgcGxheWVycyk7XG4gIGlmIChnZXROb25EZWFkTm9uUHJvdGVjdGVkUGxheWVyTGlzdC5sZW5ndGggPT0gMCkge1xuICAgIC8vIFRoZSBwbGF5ZXIgaXMgdGhlIHdpbm5lci5cbiAgfSBlbHNlIHtcbiAgICAvLyBSYW5kb21seSBzZWxlY3Qgb25lIHBsYXllciB0byBwbGF5IHRoZSBjYXJkIGFnYWluc3QuXG4gICAgbGV0IHJhbmRvbVBsYXllckluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZ2V0Tm9uRGVhZE5vblByb3RlY3RlZFBsYXllckxpc3QubGVuZ3RoKTtcbiAgICBwbGF5QWdhaW5zdCA9IGdldE5vbkRlYWROb25Qcm90ZWN0ZWRQbGF5ZXJMaXN0W3JhbmRvbVBsYXllckluZGV4XTtcbiAgfVxuICByZXR1cm4ge2NhcmRJZCwgcGxheUFnYWluc3QsIGd1YXJkR3Vlc3N9O1xufVxuXG5mdW5jdGlvbiBnZXROb25EZWFkTm9uUHJvdGVjdGVkUGxheWVycyhwbGF5ZXJJZCwgcGxheWVycykge1xuICBsZXQgbm9uRGVhZE5vblByb3RlY3RlZFBsYXllckxpc3QgPSBbXTtcbiAgcGxheWVycy5mb3JFYWNoKHBsYXllciA9PiB7XG4gICAgaWYgKHBsYXllci5pZCAhPSBwbGF5ZXJJZCAmJiAhcGxheWVyLnByb3RlY3RlZCAmJiAhcGxheWVyLmRlYWQpIHtcbiAgICAgIG5vbkRlYWROb25Qcm90ZWN0ZWRQbGF5ZXJMaXN0LnB1c2gocGxheWVyLmlkKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gbm9uRGVhZE5vblByb3RlY3RlZFBsYXllckxpc3Q7XG59XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICBzdG9yZS5kaXNwYXRjaCh7dHlwZTogJ1BPUFVMQVRFX1RBQkxFJ30pO1xuICBuZXh0VHVybigpO1xufSlcblxuJCgnI3Jlc3RhcnQnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgY29uc29sZS5sb2coJ1Jlc3RhcnQnKTtcbiAgc3RvcmUuZGlzcGF0Y2goeyB0eXBlOiAnUkVTVEFSVCd9KTtcbiAgbmV4dFR1cm4oKTtcbn0pO1xuIiwiaW1wb3J0IHsgZ2V0UmFuZG9tQ2FyZCwgY29tcGFyZUNhcmRzLCBnZXRIaWdoZXN0Tm90WWV0QXBwZWFyZWRDYXJkLCBnZXROb25EZWFkTm9uUHJvdGVjdGVkUGxheWVycyB9IGZyb20gJy4vdXRpbCc7XG5cbi8vIFBsYXllciBkZWZpbml0aW9uXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIge1xuICBjb25zdHJ1Y3RvcihudW1iZXIpIHtcbiAgICB0aGlzLm51bWJlciA9IG51bWJlcjtcbiAgICB0aGlzLmRlYWQgPSBmYWxzZTtcbiAgICB0aGlzLnByb3RlY3RlZCA9IGZhbHNlO1xuICAgIHRoaXMuY2FyZHMgPSBbXTtcbiAgfVxuXG4gIGRyYXcoYXZhaWxhYmxlQ2FyZHMpIHtcbiAgICBjb25zb2xlLmxvZyhgRHJhdyBhIGNhcmQgZm9yIHBsYXllciAke3RoaXMubnVtYmVyfWApO1xuICAgIHRoaXMuY2FyZHMucHVzaChnZXRSYW5kb21DYXJkKGF2YWlsYWJsZUNhcmRzKSk7XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLmRlYWQgPSBmYWxzZTtcbiAgICB0aGlzLnByb3RlY3RlZCA9IGZhbHNlO1xuICAgIHRoaXMuY2FyZHMgPSBbXTtcbiAgfVxuXG4gIHNob3dIYW5kKCkge1xuICAgICQoYCNwbGF5ZXJUaXRsZSR7dGhpcy5udW1iZXJ9YCkuYXBwZW5kKGAgLSAke3RoaXMuY2FyZHNbMF19YCk7XG4gIH1cblxuICBzZXRQbGF5ZXJEZWFkKGNhcmRzTm90UGxheWVkWWV0KSB7XG4gICAgdGhpcy5kZWFkID0gdHJ1ZTtcbiAgICAkKGAjcGxheWVyVGl0bGUke3RoaXMubnVtYmVyfWApLmF0dHIoXCJjbGFzc1wiLFwicGxheWVyRGVhZFwiKTtcbiAgICAkKGAjcGxheWVyVGl0bGUke3RoaXMubnVtYmVyfWApLmFwcGVuZChgIC0gJHt0aGlzLmNhcmRzWzBdfWApO1xuICAgIGNhcmRzTm90UGxheWVkWWV0W3RoaXMuY2FyZHNbMF1dLS07XG4gIH1cblxuICByYW5kb21BSShwbGF5ZXJzLCBjYXJkc05vdFBsYXllZFlldCkge1xuICAgIGxldCBjYXJkSW5kZXg7XG4gICAgaWYgKHRoaXMuY2FyZHMuaW5kZXhPZignSGFuZG1haWQnKSAhPT0gLTEpIHtcbiAgICAgIC8vIFByaW9yaXRpemUgb24gcGxheWluZyBoYW5kbWFpZC5cbiAgICAgIGNhcmRJbmRleCA9IHRoaXMuY2FyZHMuaW5kZXhPZignSGFuZG1haWQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGNvbXBhcmVDYXJkcyh0aGlzLmNhcmRzWzBdLCB0aGlzLmNhcmRzWzFdKSA+IDApIHtcbiAgICAgICAgY2FyZEluZGV4ID0gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhcmRJbmRleCA9IDE7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gbGV0IGNhcmRJbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpO1xuICAgIGxldCBjYXJkID0gdGhpcy5jYXJkc1tjYXJkSW5kZXhdO1xuICAgIGNvbnNvbGUubG9nKGNhcmQpO1xuICAgIGxldCBjYXJkVG9HdWVzcztcbiAgICBpZiAoY2FyZCA9PT0gJ0d1YXJkJykge1xuICAgICAgLy8gUmFuZG9tbHkgY2hvb3NlIGZyb20gdGhlIGhpZ2hlc3Qgbm90IHlldCBhcHBlYXJlZCBjYXJkLlxuICAgICAgY2FyZFRvR3Vlc3MgPSBnZXRIaWdoZXN0Tm90WWV0QXBwZWFyZWRDYXJkKHRoaXMuY2FyZHMsIGNhcmRzTm90UGxheWVkWWV0KTtcbiAgICB9XG4gICAgLy8gVE9ETzogUGxheSBhZ2FpbnN0IHJhbmRvbSBub24gZGVhZC9ub24gcHJvdGVjdGVkIHBlcnNvbi5cbiAgICBsZXQgYWdhaW5zdCA9IHRoaXMubnVtYmVyICUgNCArIDE7XG4gICAgbGV0IGdldE5vbkRlYWROb25Qcm90ZWN0ZWRQbGF5ZXJMaXN0ID0gZ2V0Tm9uRGVhZE5vblByb3RlY3RlZFBsYXllcnModGhpcywgcGxheWVycyk7XG4gICAgaWYgKGdldE5vbkRlYWROb25Qcm90ZWN0ZWRQbGF5ZXJMaXN0Lmxlbmd0aCA9PSAwKSB7XG4gICAgICAvLyBUaGUgcGxheWVyIGlzIHRoZSB3aW5uZXIuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJhbmRvbWx5IHNlbGVjdCBvbmUgcGxheWVyIHRvIHBsYXkgdGhlIGNhcmQgYWdhaW5zdC5cbiAgICAgIGxldCByYW5kb21QbGF5ZXJJbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGdldE5vbkRlYWROb25Qcm90ZWN0ZWRQbGF5ZXJMaXN0Lmxlbmd0aCk7XG4gICAgICBhZ2FpbnN0ID0gZ2V0Tm9uRGVhZE5vblByb3RlY3RlZFBsYXllckxpc3RbcmFuZG9tUGxheWVySW5kZXhdO1xuICAgIH1cbiAgICBsZXQgcGxheWVkQ2FyZCA9IHRoaXMucGxheShjYXJkSW5kZXgsIGFnYWluc3QsIGNhcmRUb0d1ZXNzKTtcbiAgICByZXR1cm4gcGxheWVkQ2FyZDtcbiAgfVxuXG4gIHBsYXkoY2FyZEluZGV4LCBhZ2FpbnN0LCBjYXJkVG9HdWVzcykge1xuICAgIGxldCBjYXJkID0gdGhpcy5jYXJkc1tjYXJkSW5kZXhdO1xuICAgIHRoaXMuY2FyZHMuc3BsaWNlKGNhcmRJbmRleCwgMSk7XG4gICAgcmV0dXJuIHsnY2FyZCc6IGNhcmQsICdhZ2FpbnN0JzogYWdhaW5zdCwgJ2d1ZXNzJzogY2FyZFRvR3Vlc3N9O1xuICB9XG5cbiAgZGlzY2FyZCgpIHtcbiAgICBjb25zb2xlLmxvZyhgUGxheWVyICR7dGhpcy5udW1iZXJ9IGRpc2NhcmRlZCBhIGNhcmQuYCk7XG4gICAgbGV0IGRpc2NhcmRlZENhcmQgPSB0aGlzLmNhcmRzWzBdO1xuICAgIC8vIFRPRE86IGlmIHBsYXllZCBhZ2FpbnN0IGl0c2VsZiwgbmVlZCB0byBkaXNjYXJkIHRoZSByaWdodCBvbmUuXG4gICAgJChgI3BsYXllclBsYXllZExpc3Qke3RoaXMubnVtYmVyfWApLmFwcGVuZChgPGxpIGNsYXNzPVwiZGlzY2FyZCBpdGVtXCI+JHtkaXNjYXJkZWRDYXJkfTwvbGk+YCk7XG4gICAgdGhpcy5jYXJkcyA9IFtdO1xuICAgIHJldHVybiBkaXNjYXJkZWRDYXJkO1xuICB9XG59IiwiLy8gdmFyIGF2YWlsYWJsZUNhcmRzLCBjdXJyZW50UGxheWVyLCBnYW1lRW5kO1xuLy8gdmFyIHBsYXlBZ2FpbnN0LCBjYXJkc05vdFBsYXllZFlldDtcbmltcG9ydCB7IGluaXRpYWxTdGF0ZSwgY2FyZFJhbmssIGNhcmROYW1lcyB9IGZyb20gJy4vY29uc3QnO1xuaW1wb3J0IHtcbiAgZ2V0UmFuZG9tQ2FyZCxcbiAgZ2V0TGl2aW5nUGxheWVyU2l6ZSxcbiAgY2FsY3VsYXRlV2lubmVyLFxuICBuZXh0UGxheWVyLFxuICBkcmF3Q2FyZCxcbiAgcmVzZXRQcm90ZWN0aW9uLFxuICBkaXNjYXJkQ2FyZCxcbiAgZHJhd0NhcmRGb3JQbGF5ZXIsXG4gIGFkZFBsYXllZENhcmQsXG4gIGFkZFNlZW5DYXJkcyxcbiAgZ2V0QXZhaWxhYmxlQ2FyZFNpemUsXG4gIHNldFBsYXllckRlYWQsXG4gIGNoZWNrTm90RGVhZEFuZE5vdFByb3RlY3RlZCxcbiAgcG9wdWxhdGVWYWx1ZVRhYmxlLCB9IGZyb20gJy4vdXRpbCc7XG5cbmZ1bmN0aW9uIHJlc29sdmUoc3RhdGUsIGNhcmRUb1BsYXkpIHtcbiAgaWYgKGNhcmRUb1BsYXkuY2FyZElkID09PSAxICYmIGNoZWNrTm90RGVhZEFuZE5vdFByb3RlY3RlZChzdGF0ZSwgY2FyZFRvUGxheS5wbGF5QWdhaW5zdCkpIHtcbiAgICBpZiAoY2FyZFRvUGxheS5ndWFyZEd1ZXNzID09PSBzdGF0ZS5wbGF5ZXJzW2NhcmRUb1BsYXkucGxheUFnYWluc3QgLSAxXS5ob2xkaW5nQ2FyZHNbMF0pIHtcbiAgICAgIHJldHVybiBzZXRQbGF5ZXJEZWFkKHN0YXRlLCBjYXJkVG9QbGF5LnBsYXlBZ2FpbnN0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbiAgfSBlbHNlIGlmIChjYXJkVG9QbGF5LmNhcmRJZCA9PT0gMiAmJiBjaGVja05vdERlYWRBbmROb3RQcm90ZWN0ZWQoc3RhdGUsIGNhcmRUb1BsYXkucGxheUFnYWluc3QpKSB7XG4gICAgbGV0IG5leHRTdGF0ZSA9IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlKTtcbiAgICBuZXh0U3RhdGUucGxheWVycyA9IGFkZFNlZW5DYXJkcyhuZXh0U3RhdGUucGxheWVycywgbmV4dFN0YXRlLmN1cnJlbnRQbGF5ZXJJZCwge1xuICAgICAgY2FyZElkOiBuZXh0U3RhdGUucGxheWVyc1tjYXJkVG9QbGF5LnBsYXlBZ2FpbnN0IC0gMV0uaG9sZGluZ0NhcmRzWzBdLFxuICAgICAgcGxheWVySWQ6IGNhcmRUb1BsYXkucGxheUFnYWluc3RcbiAgICB9KTtcbiAgICByZXR1cm4gbmV4dFN0YXRlO1xuICB9IGVsc2UgaWYgKGNhcmRUb1BsYXkuY2FyZElkID09PSAzICYmIGNoZWNrTm90RGVhZEFuZE5vdFByb3RlY3RlZChzdGF0ZSwgY2FyZFRvUGxheS5wbGF5QWdhaW5zdCkpIHtcbiAgICBsZXQgY2FyZFZhbHVlMSA9IHN0YXRlLnBsYXllcnNbc3RhdGUuY3VycmVudFBsYXllcklkIC0gMV0uaG9sZGluZ0NhcmRzWzBdO1xuICAgIGxldCBjYXJkVmFsdWUyID0gc3RhdGUucGxheWVyc1tjYXJkVG9QbGF5LnBsYXlBZ2FpbnN0IC0gMV0uaG9sZGluZ0NhcmRzWzBdO1xuICAgIGlmIChjYXJkVmFsdWUxID4gY2FyZFZhbHVlMikge1xuICAgICAgcmV0dXJuIHNldFBsYXllckRlYWQoc3RhdGUsIGNhcmRUb1BsYXkucGxheUFnYWluc3QpO1xuICAgIH0gZWxzZSBpZiAoY2FyZFZhbHVlMSA8IGNhcmRWYWx1ZTIpIHtcbiAgICAgIHJldHVybiBzZXRQbGF5ZXJEZWFkKHN0YXRlLCBzdGF0ZS5jdXJyZW50UGxheWVySWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuICB9IGVsc2UgaWYgKGNhcmRUb1BsYXkuY2FyZElkID09PSA0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICBwbGF5ZXJzOiBPYmplY3QuYXNzaWduKFtdLCBzdGF0ZS5wbGF5ZXJzLCB7IFtzdGF0ZS5jdXJyZW50UGxheWVySWQgLSAxXTogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUucGxheWVyc1tzdGF0ZS5jdXJyZW50UGxheWVySWQgLSAxXSwge1xuICAgICAgICBwcm90ZWN0ZWQ6IHRydWVcbiAgICAgIH0pfSlcbiAgICB9KTtcbiAgfSBlbHNlIGlmIChjYXJkVG9QbGF5LmNhcmRJZCA9PT0gNSAmJiBjaGVja05vdERlYWRBbmROb3RQcm90ZWN0ZWQoc3RhdGUsIGNhcmRUb1BsYXkucGxheUFnYWluc3QpKSB7XG4gICAgLy8gUHJpbmNlLCBEaXNjYXJkIGFuZCBkcmF3XG4gICAgbGV0IG5leHRTdGF0ZSA9IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlKTtcbiAgICBsZXQgY2FyZFRvRGlzY2FyZCA9IHN0YXRlLnBsYXllcnNbY2FyZFRvUGxheS5wbGF5QWdhaW5zdCAtIDFdLmhvbGRpbmdDYXJkc1swXTtcbiAgICBuZXh0U3RhdGUucGxheWVycyA9IGRpc2NhcmRDYXJkKHN0YXRlLnBsYXllcnMsIGNhcmRUb1BsYXkucGxheUFnYWluc3QsIGNhcmRUb0Rpc2NhcmQpO1xuICAgIG5leHRTdGF0ZS5wbGF5ZXJzID0gYWRkUGxheWVkQ2FyZChuZXh0U3RhdGUucGxheWVycywgY2FyZFRvUGxheS5wbGF5QWdhaW5zdCwge1xuICAgICAgY2FyZElkOiBjYXJkVG9EaXNjYXJkLFxuICAgICAgcGxheUFnYWluc3Q6IC0xLFxuICAgICAgZGlzY2FyZGVkOiB0cnVlXG4gICAgfSk7XG5cbiAgICBpZiAoZ2V0QXZhaWxhYmxlQ2FyZFNpemUoc3RhdGUuYXZhaWxhYmxlQ2FyZHMpID09PSAwKSB7XG4gICAgICAvLyBHaXZlIHRoZSBoaWRkZW4gY2FyZCB0byBwbGF5ZXJcbiAgICB9IGVsc2Uge1xuICAgICAgbmV4dFN0YXRlID0gZHJhd0NhcmRGb3JQbGF5ZXIobmV4dFN0YXRlLCBjYXJkVG9QbGF5LnBsYXlBZ2FpbnN0KTtcbiAgICB9XG5cbiAgICBpZiAoY2FyZFRvRGlzY2FyZCA9PT0gOCkge1xuICAgICAgbmV4dFN0YXRlLnBsYXllcnMgPSBPYmplY3QuYXNzaWduKG5leHRTdGF0ZS5wbGF5ZXJzLCB7W2NhcmRUb1BsYXkucGxheUFnYWluc3QgLSAxXTogT2JqZWN0LmFzc2lnbih7fSwgbmV4dFN0YXRlLnBsYXllcnNbY2FyZFRvUGxheS5wbGF5QWdhaW5zdCAtIDFdLCB7XG4gICAgICAgIGRlYWQ6IHRydWVcbiAgICAgIH0pfSk7XG4gICAgfVxuICAgIHJldHVybiBuZXh0U3RhdGU7XG4gIH0gZWxzZSBpZiAoY2FyZFRvUGxheS5jYXJkSWQgPT09IDYgJiYgY2hlY2tOb3REZWFkQW5kTm90UHJvdGVjdGVkKHN0YXRlLCBjYXJkVG9QbGF5LnBsYXlBZ2FpbnN0KSkge1xuICAgIGxldCBuZXh0U3RhdGUgPSBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSk7XG4gICAgbGV0IGNhcmRUb1N3YXAgPSBuZXh0U3RhdGUucGxheWVyc1tzdGF0ZS5jdXJyZW50UGxheWVySWQgLSAxXS5ob2xkaW5nQ2FyZHNbMF07XG4gICAgbmV4dFN0YXRlLnBsYXllcnMgPSBPYmplY3QuYXNzaWduKFtdLCBuZXh0U3RhdGUucGxheWVycywge1tzdGF0ZS5jdXJyZW50UGxheWVySWQgLSAxXTogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUucGxheWVyc1tzdGF0ZS5jdXJyZW50UGxheWVySWQgLSAxXSwge1xuICAgICAgaG9sZGluZ0NhcmRzOiBbbmV4dFN0YXRlLnBsYXllcnNbY2FyZFRvUGxheS5wbGF5QWdhaW5zdCAtIDFdLmhvbGRpbmdDYXJkc1swXV1cbiAgICB9KX0pXG4gICAgbmV4dFN0YXRlLnBsYXllcnMgPSBPYmplY3QuYXNzaWduKFtdLCBuZXh0U3RhdGUucGxheWVycywge1tjYXJkVG9QbGF5LnBsYXlBZ2FpbnN0IC0gMV06IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLnBsYXllcnNbY2FyZFRvUGxheS5wbGF5QWdhaW5zdCAtIDFdLCB7XG4gICAgICBob2xkaW5nQ2FyZHM6IFtjYXJkVG9Td2FwXVxuICAgIH0pfSlcbiAgICByZXR1cm4gbmV4dFN0YXRlO1xuICB9IGVsc2UgaWYgKGNhcmRUb1BsYXkuY2FyZElkID09PSA4KSB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICBwbGF5ZXJzOiBPYmplY3QuYXNzaWduKFtdLCBzdGF0ZS5wbGF5ZXJzLCB7IFtzdGF0ZS5jdXJyZW50UGxheWVySWQgLSAxXTogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUucGxheWVyc1tzdGF0ZS5jdXJyZW50UGxheWVySWQgLSAxXSwge1xuICAgICAgICBkZWFkOiB0cnVlXG4gICAgICB9KX0pXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNvdW50ZXIoc3RhdGUsIGFjdGlvbikge1xuICBpZiAodHlwZW9mIHN0YXRlID09PSAndW5kZWZpbmVkJykge1xuICAgIC8vIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGluaXRpYWxTdGF0ZSkpO1xuICAgIC8vIENsZWFuIHVwIHN0b3JlIHN0YXRlLlxuICAgIGxldCBuZXdTdGF0ZSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoaW5pdGlhbFN0YXRlKSk7XG4gICAgLy8gU2V0dXAgYW5kIGRyYXcgY2FyZHMuXG4gICAgLy8gRGlzY2FyZCBhIGNhcmQgYXQgdGhlIHN0YXJ0IG9mIHRoZSBnYW1lLlxuICAgIGxldCByYW5kb21DYXJkSWQgPSBnZXRSYW5kb21DYXJkKG5ld1N0YXRlLmF2YWlsYWJsZUNhcmRzKTtcbiAgICBuZXdTdGF0ZS5hdmFpbGFibGVDYXJkc1tjYXJkTmFtZXNbcmFuZG9tQ2FyZElkIC0gMV1dLS07XG5cbiAgICBuZXdTdGF0ZSA9IGRyYXdDYXJkRm9yUGxheWVyKG5ld1N0YXRlLCAxKTtcbiAgICBuZXdTdGF0ZSA9IGRyYXdDYXJkRm9yUGxheWVyKG5ld1N0YXRlLCAyKTtcbiAgICBuZXdTdGF0ZSA9IGRyYXdDYXJkRm9yUGxheWVyKG5ld1N0YXRlLCAzKTtcbiAgICBuZXdTdGF0ZSA9IGRyYXdDYXJkRm9yUGxheWVyKG5ld1N0YXRlLCA0KTtcblxuICAgIHJldHVybiBuZXdTdGF0ZTtcbiAgfVxuXG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlICdDSE9PU0VfQ0FSRCc6IHtcbiAgICAgIC8vIFRPRE86IGJhc2VkIG9uIHNlbGVjdGVkIGNhcmQsIGRlY2lkZSBpZiBwbGF5IGFnYWluc3QgYWN0aW9uIGlzIG5lZWRlZFxuICAgICAgLy8gSWYgbm90IHRoZW4gc2V0IHJlYWR5Rm9yTmV4dFR1cm4gdG8gdHJ1ZVxuICAgICAgbGV0IHJlYWR5Rm9yTmV4dFR1cm4gPSBmYWxzZTtcbiAgICAgIGxldCBjaG9vc2VDYXJkID0gZmFsc2U7XG4gICAgICBsZXQgZ3VhcmRHdWVzcyA9IHRydWU7XG4gICAgICBpZiAoYWN0aW9uLmNhcmRJZCA9PT0gNCB8fCBhY3Rpb24uY2FyZElkID09PSA3IHx8IGFjdGlvbi5jYXJkSWQgPT09IDgpIHtcbiAgICAgICAgcmVhZHlGb3JOZXh0VHVybiA9IHRydWU7XG4gICAgICAgIGNob29zZUNhcmQgPSB0cnVlO1xuICAgICAgICBndWFyZEd1ZXNzID0gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgYnV0dG9uU3RhdGVzOiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5idXR0b25TdGF0ZXMsIHtcbiAgICAgICAgICBjaG9vc2VDYXJkOiBjaG9vc2VDYXJkLFxuICAgICAgICAgIHBsYXlBZ2FpbnN0OiBndWFyZEd1ZXNzLFxuICAgICAgICB9KSxcbiAgICAgICAgcmVhZHlGb3JOZXh0VHVybjogcmVhZHlGb3JOZXh0VHVybixcbiAgICAgICAgY2FyZFRvUGxheTogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuY2FyZFRvUGxheSwge1xuICAgICAgICAgIGNhcmRJZDogYWN0aW9uLmNhcmRJZCxcbiAgICAgICAgfSlcbiAgICAgIH0pO1xuICAgIH1cbiAgICBjYXNlICdQTEFZX0FHQUlOU1QnOiB7XG4gICAgICBsZXQgcmVhZHlGb3JOZXh0VHVybiA9IGZhbHNlO1xuICAgICAgbGV0IGNob29zZUNhcmQgPSBmYWxzZTtcbiAgICAgIGxldCBndWFyZEd1ZXNzID0gdHJ1ZTtcbiAgICAgIGlmIChzdGF0ZS5jYXJkVG9QbGF5LmNhcmRJZCAhPT0gMSkge1xuICAgICAgICByZWFkeUZvck5leHRUdXJuID0gdHJ1ZTtcbiAgICAgICAgY2hvb3NlQ2FyZCA9IHRydWU7XG4gICAgICAgIGd1YXJkR3Vlc3MgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBidXR0b25TdGF0ZXM6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmJ1dHRvblN0YXRlcywge1xuICAgICAgICAgIGNob29zZUNhcmQ6IGNob29zZUNhcmQsXG4gICAgICAgICAgcGxheUFnYWluc3Q6IGZhbHNlLFxuICAgICAgICAgIGd1YXJkR3Vlc3M6IGd1YXJkR3Vlc3MsXG4gICAgICAgIH0pLFxuICAgICAgICByZWFkeUZvck5leHRUdXJuOiByZWFkeUZvck5leHRUdXJuLFxuICAgICAgICBjYXJkVG9QbGF5OiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5jYXJkVG9QbGF5LCB7XG4gICAgICAgICAgcGxheUFnYWluc3Q6IGFjdGlvbi5wbGF5QWdhaW5zdCxcbiAgICAgICAgfSlcbiAgICAgIH0pO1xuICAgIH1cbiAgICBjYXNlICdHVUFSRF9HVUVTUyc6IHtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBidXR0b25TdGF0ZXM6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmJ1dHRvblN0YXRlcywge1xuICAgICAgICAgIGNob29zZUNhcmQ6IHRydWUsXG4gICAgICAgICAgZ3VhcmRHdWVzczogZmFsc2UsXG4gICAgICAgIH0pLFxuICAgICAgICByZWFkeUZvck5leHRUdXJuOiB0cnVlLFxuICAgICAgICBjYXJkVG9QbGF5OiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5jYXJkVG9QbGF5LCB7XG4gICAgICAgICAgZ3VhcmRHdWVzczogYWN0aW9uLmd1YXJkR3Vlc3MsXG4gICAgICAgIH0pXG4gICAgICB9KTtcbiAgICB9XG4gICAgY2FzZSAnRElTQ0FSRF9DQVJEJzoge1xuICAgICAgbGV0IG5leHRTdGF0ZSA9IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlKTtcbiAgICAgIG5leHRTdGF0ZS5wbGF5ZXJzID0gZGlzY2FyZENhcmQobmV4dFN0YXRlLnBsYXllcnMsIG5leHRTdGF0ZS5jdXJyZW50UGxheWVySWQsIGFjdGlvbi5jYXJkKTtcbiAgICAgIHJldHVybiBuZXh0U3RhdGU7XG4gICAgfVxuICAgIGNhc2UgJ1BMQVlfQ0FSRCc6XG4gICAgICAvLyBNYWtlIGEgZGVlcCBjb3B5IG9mIHRoZSBzdGF0ZSBvYmplY3RcbiAgICAgIC8vIGxldCBuZXh0U3RhdGUgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHN0YXRlKSk7XG4gICAgICBsZXQgbmV4dFN0YXRlID0gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUpO1xuXG4gICAgICAvLyBUT0RPOiBNb3ZlIGFsbCB0aGVzZSBpbnRvIG90aGVyIHJlZHVjZXIgZnVuY3Rpb25zLlxuICAgICAgLy8gUmVtb3ZlIGhvbGRpbmcgY2FyZHNcbiAgICAgIG5leHRTdGF0ZS5wbGF5ZXJzID0gZGlzY2FyZENhcmQobmV4dFN0YXRlLnBsYXllcnMsIG5leHRTdGF0ZS5jdXJyZW50UGxheWVySWQsIGFjdGlvbi5jYXJkVG9QbGF5KTtcbiAgICAgIC8vIEFkZCBwbGF5ZWQgQ2FyZFxuICAgICAgbmV4dFN0YXRlLnBsYXllcnMgPSBhZGRQbGF5ZWRDYXJkKG5leHRTdGF0ZS5wbGF5ZXJzLCBuZXh0U3RhdGUuY3VycmVudFBsYXllcklkLCBhY3Rpb24uY2FyZFRvUGxheSk7XG4gICAgICAvLyBSZXNvbHZlXG4gICAgICBuZXh0U3RhdGUgPSByZXNvbHZlKG5leHRTdGF0ZSwgYWN0aW9uLmNhcmRUb1BsYXkpO1xuICAgICAgLy8gTmV4dCBQbGF5ZXJcbiAgICAgIG5leHRTdGF0ZS5jdXJyZW50UGxheWVySWQgPSBuZXh0UGxheWVyKG5leHRTdGF0ZS5wbGF5ZXJzLCBuZXh0U3RhdGUuY3VycmVudFBsYXllcklkKTtcbiAgICAgIC8vIFJlc2V0IHByb3RlY3RlZFxuICAgICAgbmV4dFN0YXRlLnBsYXllcnMgPSByZXNldFByb3RlY3Rpb24obmV4dFN0YXRlLnBsYXllcnMsIG5leHRTdGF0ZS5jdXJyZW50UGxheWVySWQpO1xuICAgICAgLy8gQ2hlY2sgaWYgZ2FtZSBlbmRzXG4gICAgICBsZXQgZ2FtZUVuZHMgPSBjaGVja0dhbWVFbmQobmV4dFN0YXRlLnBsYXllcnMsIG5leHRTdGF0ZS5hdmFpbGFibGVDYXJkcyk7XG4gICAgICBpZiAoZ2FtZUVuZHMuZ2FtZUVuZCkge1xuICAgICAgICBuZXh0U3RhdGUuZ2FtZUVuZHMud2lubmVyID0gbmV4dFN0YXRlLnBsYXllcnNbZ2FtZUVuZHMud2lubmVySWQgLSAxXTtcbiAgICAgICAgbmV4dFN0YXRlLmJ1dHRvblN0YXRlcy5jaG9vc2VDYXJkID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXh0U3RhdGU7XG4gICAgY2FzZSAnRFJBV19DQVJEJzpcbiAgICAgIHJldHVybiBkcmF3Q2FyZChzdGF0ZSk7XG4gICAgY2FzZSAnUE9QVUxBVEVfVEFCTEUnOlxuICAgICAgcmV0dXJuIHBvcHVsYXRlVmFsdWVUYWJsZShzdGF0ZSk7XG4gICAgY2FzZSAnVVBEQVRFX1RBQkxFJzpcbiAgICAgIHJldHVybiB1cGRhdGVWYWx1ZVRhYmxlKHN0YXRlLCBhY3Rpb24ucHJldmlvdXNTdGF0ZSlcbiAgICBjYXNlICdSRVNUQVJUJzpcbiAgICAgIC8vIENsZWFuIHVwIHN0b3JlIHN0YXRlLlxuICAgICAgbGV0IG5ld1N0YXRlID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShpbml0aWFsU3RhdGUpKTtcbiAgICAgIC8vIFNldHVwIGFuZCBkcmF3IGNhcmRzLlxuICAgICAgLy8gRGlzY2FyZCBhIGNhcmQgYXQgdGhlIHN0YXJ0IG9mIHRoZSBnYW1lLlxuICAgICAgbGV0IHJhbmRvbUNhcmRJZCA9IGdldFJhbmRvbUNhcmQobmV3U3RhdGUuYXZhaWxhYmxlQ2FyZHMpO1xuICAgICAgbmV3U3RhdGUuYXZhaWxhYmxlQ2FyZHNbY2FyZE5hbWVzW3JhbmRvbUNhcmRJZCAtIDFdXS0tO1xuXG4gICAgICBuZXdTdGF0ZSA9IGRyYXdDYXJkRm9yUGxheWVyKG5ld1N0YXRlLCAxKTtcbiAgICAgIG5ld1N0YXRlID0gZHJhd0NhcmRGb3JQbGF5ZXIobmV3U3RhdGUsIDIpO1xuICAgICAgbmV3U3RhdGUgPSBkcmF3Q2FyZEZvclBsYXllcihuZXdTdGF0ZSwgMyk7XG4gICAgICBuZXdTdGF0ZSA9IGRyYXdDYXJkRm9yUGxheWVyKG5ld1N0YXRlLCA0KTtcblxuICAgICAgcmV0dXJuIG5ld1N0YXRlO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGVcbiAgfVxufVxuXG5mdW5jdGlvbiBjaGVja0dhbWVFbmQocGxheWVycywgYXZhaWxhYmxlQ2FyZHMpIHtcbiAgaWYgKGdldEF2YWlsYWJsZUNhcmRTaXplKGF2YWlsYWJsZUNhcmRzKSA8PSAwIHx8IGdldExpdmluZ1BsYXllclNpemUocGxheWVycykgPD0gMSkge1xuICAgIGxldCB3aW5uZXJJZCA9IGNhbGN1bGF0ZVdpbm5lcihwbGF5ZXJzKTtcbiAgICByZXR1cm4geydnYW1lRW5kJzogdHJ1ZSwgJ3dpbm5lcklkJzogd2lubmVySWR9O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB7J2dhbWVFbmQnOiBmYWxzZSwgJ3dpbm5lcklkJzogLTF9O1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIGNvdW50ZXJcbn0iLCJmdW5jdGlvbiBlbmFibGVHdWFyZEd1ZXNzQnV0dG9uKCkge1xuICAkKFwiI2d1YXJkR3Vlc3NCdXR0b24yXCIpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAkKFwiI2d1YXJkR3Vlc3NCdXR0b24zXCIpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAkKFwiI2d1YXJkR3Vlc3NCdXR0b240XCIpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAkKFwiI2d1YXJkR3Vlc3NCdXR0b241XCIpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAkKFwiI2d1YXJkR3Vlc3NCdXR0b242XCIpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAkKFwiI2d1YXJkR3Vlc3NCdXR0b243XCIpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAkKFwiI2d1YXJkR3Vlc3NCdXR0b244XCIpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xufVxuXG5sZXQgZGlzYWJsZUd1YXJkR3Vlc3NCdXR0b24gPSBmdW5jdGlvbigpIHtcbiAgJChcIiNndWFyZEd1ZXNzQnV0dG9uMlwiKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAkKFwiI2d1YXJkR3Vlc3NCdXR0b24zXCIpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICQoXCIjZ3VhcmRHdWVzc0J1dHRvbjRcIikucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgJChcIiNndWFyZEd1ZXNzQnV0dG9uNVwiKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAkKFwiI2d1YXJkR3Vlc3NCdXR0b242XCIpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICQoXCIjZ3VhcmRHdWVzc0J1dHRvbjdcIikucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgJChcIiNndWFyZEd1ZXNzQnV0dG9uOFwiKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xufVxuXG5mdW5jdGlvbiBlbmFibGVQbGF5QWdhaW5zdEJ1dHRvbihwbGF5ZXJzKSB7XG4gIGZvciAobGV0IGluZGV4ID0gMTsgaW5kZXggPCA1OyBpbmRleCsrKSB7XG4gICAgaWYgKCFwbGF5ZXJzW2luZGV4IC0gMV0uZGVhZCAmJiAhcGxheWVyc1tpbmRleCAtIDFdLnByb3RlY3RlZCkge1xuICAgICAgJChgI3BsYXlBZ2FpbnN0QnV0dG9uJHtpbmRleH1gKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICB9XG4gIH1cbn1cblxudmFyIGRpc2FibGVQbGF5QWdhaW5zdEJ1dHRvbiA9IGZ1bmN0aW9uKCkge1xuICAkKFwiI3BsYXlBZ2FpbnN0QnV0dG9uMVwiKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAkKFwiI3BsYXlBZ2FpbnN0QnV0dG9uMlwiKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAkKFwiI3BsYXlBZ2FpbnN0QnV0dG9uM1wiKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAkKFwiI3BsYXlBZ2FpbnN0QnV0dG9uNFwiKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xufVxuXG5mdW5jdGlvbiBlbmFibGVQbGF5QnV0dG9uKCkge1xuICAkKFwiI3BsYXlCdXR0b24xXCIpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAkKFwiI3BsYXlCdXR0b24yXCIpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xufVxuXG5mdW5jdGlvbiBkaXNhYmxlUGxheUJ1dHRvbigpIHtcbiAgJChcIiNwbGF5QnV0dG9uMVwiKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAkKFwiI3BsYXlCdXR0b24yXCIpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG59XG5cbmV4cG9ydCB7XG4gIGRpc2FibGVQbGF5QWdhaW5zdEJ1dHRvbixcbiAgZGlzYWJsZUd1YXJkR3Vlc3NCdXR0b24sXG4gIGRpc2FibGVQbGF5QnV0dG9uLFxuICBlbmFibGVQbGF5QnV0dG9uLFxuICBlbmFibGVQbGF5QWdhaW5zdEJ1dHRvbixcbiAgZW5hYmxlR3VhcmRHdWVzc0J1dHRvbixcbn07XG4iLCJpbXBvcnQgUGxheWVyIGZyb20gJy4vcGxheWVyJztcbmltcG9ydCB7IGNhcmRSYW5rLCBjYXJkTmFtZXMgfSBmcm9tICcuL2NvbnN0JztcblxudmFyIGNvbXBhcmVDYXJkcyA9IGZ1bmN0aW9uKGNhcmQxLCBjYXJkMikge1xuICByZXR1cm4gY2FyZFJhbmtbY2FyZDJdIC0gY2FyZFJhbmtbY2FyZDFdO1xufVxuXG5mdW5jdGlvbiBnZXRMaXZpbmdQbGF5ZXJTaXplKHBsYXllcnMpIHtcbiAgbGV0IHJlc3VsdCA9IDA7XG4gIHBsYXllcnMuZm9yRWFjaChwbGF5ZXIgPT4ge1xuICAgIGlmICghcGxheWVyLmRlYWQpIHtcbiAgICAgIHJlc3VsdCsrO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZVdpbm5lcihwbGF5ZXJzKSB7XG4gIGxldCB3aW5uZXJJZCA9IC0xO1xuICBwbGF5ZXJzLmZvckVhY2gocGxheWVyID0+IHtcbiAgICBpZiAoIXBsYXllci5kZWFkKSB7XG4gICAgICBpZiAod2lubmVySWQgPT0gLTEpIHtcbiAgICAgICAgd2lubmVySWQgPSBwbGF5ZXIuaWQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhgQ29tcGFyaW5nICR7cGxheWVyc1t3aW5uZXJJZCAtIDFdLmhvbGRpbmdDYXJkc1swXX0gd2l0aCAke3BsYXllci5ob2xkaW5nQ2FyZHNbMF19YCk7XG4gICAgICAgIGlmIChwbGF5ZXJzW3dpbm5lcklkIC0gMV0uaG9sZGluZ0NhcmRzWzBdIDwgcGxheWVyLmhvbGRpbmdDYXJkc1swXSkge1xuICAgICAgICAgIHdpbm5lcklkID0gcGxheWVyLmlkO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gd2lubmVySWQ7XG59XG5cbmZ1bmN0aW9uIGdldE5vbkRlYWROb25Qcm90ZWN0ZWRQbGF5ZXJzKGNhbGxlciwgcGxheWVycykge1xuICBsZXQgbm9uRGVhZE5vblByb3RlY3RlZFBsYXllckxpc3QgPSBbXTtcbiAgcGxheWVycy5mb3JFYWNoKHBsYXllciA9PiB7XG4gICAgaWYgKHBsYXllci5udW1iZXIgIT0gY2FsbGVyLm51bWJlciAmJiAhcGxheWVyLnByb3RlY3RlZCAmJiAhcGxheWVyLmRlYWQpIHtcbiAgICAgIG5vbkRlYWROb25Qcm90ZWN0ZWRQbGF5ZXJMaXN0LnB1c2gocGxheWVyLm51bWJlcik7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIG5vbkRlYWROb25Qcm90ZWN0ZWRQbGF5ZXJMaXN0O1xufVxuXG5mdW5jdGlvbiBjaGVja0dhbWVFbmQocGxheWVycywgYXZhaWxhYmxlQ2FyZHMpIHtcbiAgaWYgKGdldEF2YWlsYWJsZUNhcmRTaXplKGF2YWlsYWJsZUNhcmRzKSA8PSAwIHx8IGdldExpdmluZ1BsYXllclNpemUocGxheWVycykgPD0gMSkge1xuICAgIGxldCB3aW5uZXIgPSBjYWxjdWxhdGVXaW5uZXIocGxheWVycyk7XG4gICAgcmV0dXJuIHsnZ2FtZUVuZCc6IHRydWUsICd3aW5uZXInOiB3aW5uZXJ9O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB7J2dhbWVFbmQnOiBmYWxzZSwgJ3dpbm5lcic6IC0xfTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRIaWdoZXN0Tm90WWV0QXBwZWFyZWRDYXJkKGhvbGRpbmdDYXJkcywgY2FyZHNOb3RQbGF5ZWRZZXQpIHtcbiAgLy8gaG9kaW5nQ2FyZHNbMCwgMV1cbiAgZm9yIChsZXQgaW5kZXggPSA3OyBpbmRleCA+IDA7IGluZGV4LS0pIHtcbiAgICBjb25zdCBjYXJkTmFtZSA9IGNhcmROYW1lc1tpbmRleF07XG4gICAgaWYgKGNhcmRzTm90UGxheWVkWWV0W2NhcmROYW1lXSAhPT0gMCAmJiBob2xkaW5nQ2FyZHMuaW5kZXhPZihjYXJkTmFtZSkgPT09IC0xKSB7XG4gICAgICByZXR1cm4gY2FyZE5hbWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuICdQcmllc3QnO1xufVxuXG4vLyBUaGlzIGZ1bmN0aW9uIHdpbGwgcmV0dXJuIGEgcmFuZG9tIGNhcmQgaW5kZXggYmFzZWQgb24gdGhlIGF2YWlsYWJsZUNhcmRzIHBhc3NlZCBpbi5cbmZ1bmN0aW9uIGdldFJhbmRvbUNhcmQoYXZhaWxhYmxlQ2FyZHMpIHtcbiAgLy8gR2V0IHRoZSBudW1iZXIgb2YgdG90YWwgY2FyZHNcbiAgbGV0IHRvdGFsQ2FyZHMgPSBnZXRBdmFpbGFibGVDYXJkU2l6ZShhdmFpbGFibGVDYXJkcyk7XG5cbiAgaWYgKHRvdGFsQ2FyZHMgPT0gMCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCByYW5kb21DYXJkTnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdG90YWxDYXJkcyk7XG5cbiAgbGV0IHRlbXAgPSAwLCBkcmF3ZWRDYXJkO1xuICBmb3IgKHZhciBrZXkgaW4gYXZhaWxhYmxlQ2FyZHMpIHtcbiAgICBpZiAoYXZhaWxhYmxlQ2FyZHMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgdGVtcCArPSBhdmFpbGFibGVDYXJkc1trZXldO1xuICAgICAgaWYgKHRlbXAgPiByYW5kb21DYXJkTnVtYmVyKSB7XG4gICAgICAgIGRyYXdlZENhcmQgPSBrZXk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjYXJkUmFua1tkcmF3ZWRDYXJkXTtcbn1cblxuZnVuY3Rpb24gbmV4dFBsYXllcihwbGF5ZXJzLCBjdXJyZW50UGxheWVySWQpIHtcbiAgLy8gTmV4dCBub24gZGVhZCBwbGF5ZXJcbiAgbGV0IHRvdGFsUGxheWVycyA9IHBsYXllcnMubGVuZ3RoO1xuICBsZXQgbmV4dFBsYXllckluZGV4ID0gY3VycmVudFBsYXllcklkICUgdG90YWxQbGF5ZXJzO1xuXG4gIHdoaWxlIChwbGF5ZXJzW25leHRQbGF5ZXJJbmRleF0uZGVhZCA9PT0gdHJ1ZSkge1xuICAgIG5leHRQbGF5ZXJJbmRleCA9IChuZXh0UGxheWVySW5kZXggKyAxKSAlIHRvdGFsUGxheWVycztcbiAgfVxuXG4gIHJldHVybiBwbGF5ZXJzW25leHRQbGF5ZXJJbmRleF0uaWQ7XG59XG5cbmZ1bmN0aW9uIGdldEF2YWlsYWJsZUNhcmRTaXplKGF2YWlsYWJsZUNhcmRzKSB7XG4gIGxldCB0b3RhbENhcmRzID0gMDtcbiAgZm9yICh2YXIga2V5IGluIGF2YWlsYWJsZUNhcmRzKSB7XG4gICAgaWYgKGF2YWlsYWJsZUNhcmRzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIHRvdGFsQ2FyZHMgKz0gYXZhaWxhYmxlQ2FyZHNba2V5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRvdGFsQ2FyZHM7XG59XG5cbmZ1bmN0aW9uIHJlc2V0UHJvdGVjdGlvbihwbGF5ZXJzLCBjdXJyZW50UGxheWVySWQpIHtcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oW10sIHBsYXllcnMsIHsgW2N1cnJlbnRQbGF5ZXJJZCAtIDFdOiBPYmplY3QuYXNzaWduKHt9LCBwbGF5ZXJzW2N1cnJlbnRQbGF5ZXJJZCAtIDFdLCB7XG4gICAgcHJvdGVjdGVkOiBmYWxzZSxcbiAgfSl9KVxufVxuXG4vLyBkaXNjYXJkQ2FyZChuZXh0U3RhdGUsIGN1cnJlbnRQbGF5ZXJJZCwgYWN0aW9uLmNhcmRUb1BsYXkuY2FyZElkKTtcbmZ1bmN0aW9uIGRpc2NhcmRDYXJkKHBsYXllcnMsIGN1cnJlbnRQbGF5ZXJJZCwgZGlzY2FyZENhcmQpIHtcbiAgcmV0dXJuIHBsYXllcnMubWFwKGZ1bmN0aW9uIENCKHBsYXllciwgaW5kZXgpIHtcbiAgICBpZiAocGxheWVyLmlkID09PSBjdXJyZW50UGxheWVySWQpIHtcbiAgICAgIGxldCBhcnIgPSBPYmplY3QuYXNzaWduKFtdLCBwbGF5ZXIuaG9sZGluZ0NhcmRzKTtcbiAgICAgIC8vIFJlbW92ZSBjYXJkLlxuICAgICAgYXJyLnNwbGljZShhcnIuaW5kZXhPZihkaXNjYXJkQ2FyZC5jYXJkSWQpLCAxKTtcblxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHBsYXllciwge1xuICAgICAgICBob2xkaW5nQ2FyZHM6IGFyclxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBwbGF5ZXI7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gZHJhd0NhcmQocHJldmlvdXNTdGF0ZSkge1xuICByZXR1cm4gZHJhd0NhcmRGb3JQbGF5ZXIocHJldmlvdXNTdGF0ZSwgcHJldmlvdXNTdGF0ZS5jdXJyZW50UGxheWVySWQpO1xufVxuXG5mdW5jdGlvbiBkcmF3Q2FyZEZvclBsYXllcihwcmV2aW91c1N0YXRlLCBwbGF5ZXJJZCkge1xuICBsZXQgcmFuZG9tQ2FyZElkID0gZ2V0UmFuZG9tQ2FyZChwcmV2aW91c1N0YXRlLmF2YWlsYWJsZUNhcmRzKTtcbiAgLy8gUmVtb3ZlIHRoZSBjYXJkRHJldyBmcm9tIGF2YWlsYWJsZUNhcmRzXG4gIGxldCBhcnIgPSBPYmplY3QuYXNzaWduKFtdLCBwcmV2aW91c1N0YXRlLmF2YWlsYWJsZUNhcmRzKTtcbiAgYXJyW2NhcmROYW1lc1tyYW5kb21DYXJkSWQgLSAxXV0tLTtcblxuICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgcHJldmlvdXNTdGF0ZSwge1xuICAgIHBsYXllcnM6IGFkZEhvbGRpbmdDYXJkcyhwcmV2aW91c1N0YXRlLnBsYXllcnMsIHBsYXllcklkLCByYW5kb21DYXJkSWQpLFxuICAgIGF2YWlsYWJsZUNhcmRzOiBhcnJcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZFBsYXllZENhcmQocGxheWVycywgcGxheWVySWQsIGNhcmQpIHtcbiAgbGV0IGFyciA9IE9iamVjdC5hc3NpZ24oW10sIHBsYXllcnNbcGxheWVySWQgLSAxXS5wbGF5ZWRDYXJkcyk7XG4gIGlmIChjYXJkLmNhcmRJZCA9PT0gNCB8fCBjYXJkLmNhcmRJZCA9PT0gNyB8fCBjYXJkLmNhcmRJZCA9PT0gOCkge1xuICAgIGFyci5wdXNoKHtcbiAgICAgIGNhcmRJZDogY2FyZC5jYXJkSWQsXG4gICAgICBwbGF5QWdhaW5zdDogLTEsXG4gICAgICBndWFyZEd1ZXNzOiAtMSxcbiAgICAgIGRpc2NhcmRlZDogY2FyZC5kaXNjYXJkZWQsXG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoY2FyZC5jYXJkSWQgIT09IDEpIHtcbiAgICBhcnIucHVzaCh7XG4gICAgICBjYXJkSWQ6IGNhcmQuY2FyZElkLFxuICAgICAgcGxheUFnYWluc3Q6IGNhcmQucGxheUFnYWluc3QsXG4gICAgICBndWFyZEd1ZXNzOiAtMSxcbiAgICAgIGRpc2NhcmRlZDogY2FyZC5kaXNjYXJkZWQsXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgYXJyLnB1c2goY2FyZCk7XG4gIH1cblxuICByZXR1cm4gT2JqZWN0LmFzc2lnbihbXSwgcGxheWVycywge1xuICAgIFtwbGF5ZXJJZCAtIDFdOiBPYmplY3QuYXNzaWduKHt9LCBwbGF5ZXJzW3BsYXllcklkIC0gMV0sIHtcbiAgICAgIHBsYXllZENhcmRzOiBhcnJcbiAgICB9KVxuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkSG9sZGluZ0NhcmRzKHBsYXllcnMsIHBsYXllcklkLCBjYXJkKSB7XG4gIGxldCBhcnIgPSBPYmplY3QuYXNzaWduKFtdLCBwbGF5ZXJzW3BsYXllcklkIC0gMV0uaG9sZGluZ0NhcmRzKTtcbiAgYXJyLnB1c2goY2FyZCk7XG4gIHJldHVybiBPYmplY3QuYXNzaWduKFtdLCBwbGF5ZXJzLCB7XG4gICAgW3BsYXllcklkIC0gMV06IE9iamVjdC5hc3NpZ24oe30sIHBsYXllcnNbcGxheWVySWQgLSAxXSwge1xuICAgICAgaG9sZGluZ0NhcmRzOiBhcnJcbiAgICB9KVxuICB9KTtcbn1cblxuZnVuY3Rpb24gY2hlY2tOb3REZWFkQW5kTm90UHJvdGVjdGVkKHN0YXRlLCBwbGF5ZXJJZCkge1xuICByZXR1cm4gcGxheWVySWQgPiAwICYmIHBsYXllcklkIDwgNSAmJiAhc3RhdGUucGxheWVyc1twbGF5ZXJJZCAtIDFdLmRlYWQgJiYgIXN0YXRlLnBsYXllcnNbcGxheWVySWQgLSAxXS5wcm90ZWN0ZWQ7XG59XG5cbmZ1bmN0aW9uIHNldFBsYXllckRlYWQoc3RhdGUsIHBsYXllcklkKSB7XG4gIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgIHBsYXllcnM6IE9iamVjdC5hc3NpZ24oW10sIHN0YXRlLnBsYXllcnMsIHtcbiAgICAgIFtwbGF5ZXJJZCAtIDFdOiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5wbGF5ZXJzW3BsYXllcklkIC0gMV0sIHtcbiAgICAgICAgZGVhZDogdHJ1ZVxuICAgICAgfSlcbiAgICB9KVxuICB9KVxufVxuXG5mdW5jdGlvbiBhZGRTZWVuQ2FyZHMocGxheWVycywgcGxheWVySWQsIHNlZW5DYXJkKSB7XG4gIGxldCBhcnIgPSBPYmplY3QuYXNzaWduKFtdLCBwbGF5ZXJzW3BsYXllcklkIC0gMV0uc2VlbkNhcmRzKTtcbiAgYXJyLnB1c2goc2VlbkNhcmQpO1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbihbXSwgcGxheWVycywge1xuICAgIFtwbGF5ZXJJZCAtIDFdOiBPYmplY3QuYXNzaWduKHt9LCBwbGF5ZXJzW3BsYXllcklkIC0gMV0sIHtcbiAgICAgIHNlZW5DYXJkczogYXJyXG4gICAgfSlcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHBvcHVsYXRlVmFsdWVUYWJsZShzdGF0ZSkge1xuICBsZXQgbmV4dFN0YXRlID0gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUpO1xuICBmb3IgKGxldCBjYXJkSWQgPSAxOyBjYXJkSWQgPCA5OyBjYXJkSWQrKykge1xuICAgIGZvciAobGV0IHBsYXlBZ2FpbnN0ID0gMTsgcGxheUFnYWluc3QgPCA0OyArK3BsYXlBZ2FpbnN0KSB7XG4gICAgICBmb3IgKGxldCBndWVzcyA9IDI7IGd1ZXNzIDwgOTsgZ3Vlc3MrKykge1xuICAgICAgICBuZXh0U3RhdGUudmFsdWVUYWJsZS5jYXJkSWRbY2FyZElkIC0gMV0ucGxheUFnYWluc3RbcGxheUFnYWluc3QgLSAxXS5ndWVzc1tndWVzcyAtIDFdID0gTWF0aC5yYW5kb20oKSAvIDEwMDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5leHRTdGF0ZTtcbn1cblxuZXhwb3J0IHtcbiAgY29tcGFyZUNhcmRzLFxuICBjaGVja0dhbWVFbmQsXG4gIGdldFJhbmRvbUNhcmQsXG4gIGdldEF2YWlsYWJsZUNhcmRTaXplLFxuICBnZXRIaWdoZXN0Tm90WWV0QXBwZWFyZWRDYXJkLFxuICBnZXROb25EZWFkTm9uUHJvdGVjdGVkUGxheWVycyxcbiAgZ2V0TGl2aW5nUGxheWVyU2l6ZSxcbiAgY2FsY3VsYXRlV2lubmVyLFxuICBuZXh0UGxheWVyLFxuICBkcmF3Q2FyZCxcbiAgcmVzZXRQcm90ZWN0aW9uLFxuICBkaXNjYXJkQ2FyZCxcbiAgZHJhd0NhcmRGb3JQbGF5ZXIsXG4gIGFkZFBsYXllZENhcmQsXG4gIGFkZEhvbGRpbmdDYXJkcyxcbiAgYWRkU2VlbkNhcmRzLFxuICBzZXRQbGF5ZXJEZWFkLFxuICBjaGVja05vdERlYWRBbmROb3RQcm90ZWN0ZWQsXG4gIHBvcHVsYXRlVmFsdWVUYWJsZSxcbn07Il0sInNvdXJjZVJvb3QiOiIifQ==