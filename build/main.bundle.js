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

/***/ "./node_modules/ind2sub/index.js":
/*!***************************************!*\
  !*** ./node_modules/ind2sub/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
function ind2sub(sizes, index) {
    var cumprod = sizes.reduce(function (acc, n) {
        return acc.concat(acc[acc.length - 1] * n);
    }, [1]);
    return sizes.map(function (size, i) {
        return Math.floor(index / cumprod[i]) % size;
    });
}
exports.ind2sub = ind2sub;
function ind2subNocheck(sizes, index, cumprod) {
    return sizes.map(function (size, i) {
        return Math.floor(index / cumprod[i]) % size;
    });
}
function optimizeInd2sub(sizes) {
    var cumprod = sizes.reduce(function (acc, n) {
        return acc.concat(acc[acc.length - 1] * n);
    }, [1]);
    return function (index) {
        return ind2subNocheck(sizes, index, cumprod);
    };
}
exports.optimizeInd2sub = optimizeInd2sub;

/***/ }),

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

var _reinforcementAI = __webpack_require__(/*! ./reinforcementAI */ "./src/reinforcementAI.js");

var _reinforcementAI2 = _interopRequireDefault(_reinforcementAI);

var _randomAI = __webpack_require__(/*! ./randomAI */ "./src/randomAI.js");

var _randomAI2 = _interopRequireDefault(_randomAI);

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
  } else if (store.getState().counter.currentPlayerId === 2 && store.getState().counter.players[1].dead === false) {
    // RL AI move
    setTimeout(function () {
      // Update Value Table, if not the first time
      store.dispatch({ type: 'DRAW_CARD', player: store.getState().counter.currentPlayerId });
      reinforcementAI.learn(store.getState().counter);
      var reinforcementAICard = reinforcementAI.getBestAction(store.getState().counter);
      store.dispatch(_actions2.default.playCard(reinforcementAICard));
      nextTurn();
    }, 1000);
  } else if (store.getState().counter.currentPlayerId !== 1 || store.getState().counter.players[0].dead) {
    // Random AI move
    // Disable buttons
    setTimeout(function () {
      store.dispatch({ type: 'DRAW_CARD', player: store.getState().counter.currentPlayerId });
      var randomAICard = (0, _randomAI2.default)(store.getState().counter.players, store.getState().counter.currentPlayerId);
      store.dispatch(_actions2.default.playCard(randomAICard));
      nextTurn();
    }, 1000);
  } else {
    store.dispatch({ type: 'DRAW_CARD', player: store.getState().counter.currentPlayerId });
    // Wait for human input
  }
}

/*
env.getNumStates() returns an integer of total number of states
env.getMaxNumActions() returns an integer with max number of actions in any state
env.allowedActions(s) takes an integer s and returns a list of available actions, which should be integers from zero to maxNumActions
*/
var reinforcementAI = new _reinforcementAI2.default([2, 9, 8, 8], [7, 4, 8]);
$(document).ready(function () {
  // store.dispatch({type: 'POPULATE_TABLE'});
  reinforcementAI.initialize();
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

/***/ "./src/randomAI.js":
/*!*************************!*\
  !*** ./src/randomAI.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = randomAI;

var _util = __webpack_require__(/*! ./util */ "./src/util.js");

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
  var getNonDeadNonProtectedPlayerList = (0, _util.getNonDeadNonProtectedPlayers)(playerId, players);
  if (getNonDeadNonProtectedPlayerList.length == 0) {
    // The player is the winner.
  } else {
    // Randomly select one player to play the card against.
    var randomPlayerIndex = Math.floor(Math.random() * getNonDeadNonProtectedPlayerList.length);
    playAgainst = getNonDeadNonProtectedPlayerList[randomPlayerIndex];
  }
  return { cardId: cardId, playAgainst: playAgainst, guardGuess: guardGuess };
}

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

/***/ "./src/reinforcementAI.js":
/*!********************************!*\
  !*** ./src/reinforcementAI.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     Step 1: Initialize Q Value Table
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       ind2sub([2, 9, 8, 8, 8, 4, 7], (S + A)) => [1][5][2][4][3][1][6] (stateVector) + (actionVector)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       for (i = 0 ~ product([2, 9, 8, 8, 8, 4, 7])) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         QValueTable[i] = Math.random();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     Step 2: Lookup Q Value Table based on the current state, and decided what action to take
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       state definition:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       stateVector = [
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         player[0].dead,                         // 2
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         player[0].playedCards[last_idx].cardId, // 9
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         player[0].holdingCards[0],              // 8
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         player[0].holdingCards[1]               // 8
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       ]
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       actionVector = [
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         cardId,       // 8
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         playAgainst,  // 4
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         guardGuess,   // 7 (Can't guess guard)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       ]
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       function allowedSAIndicies(S) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         // Logic to figure out cardId, playAgainst, guess
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         let actionArray = [];
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         let as.concat(stateActionVectorToInteger(S, actionArray));
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         // This will return array of SA indicies
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         return as;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       let allowedSAIndicies = allowedSAIndicies(S); // []
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       maxSAIndex = argMax(QValueTable(allowedSAIndicies))
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     Step 3: Apply action, let the game engine run until your next turn.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       actionObj = SAIndexToActionObject(maxSAIndex)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       store.dispatch({type: 'PLAY_CARD', cardToPlay: actionObj})
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     Step 4: Update Q Value Table (agent learning)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       Q(A, S) = Q(A, S) + alpha * [R(S) + max_A(Q(A, S')) - Q(A, S)]
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       let max_A = -inf;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       let allowedSAIndicies = allowedSAIndicies(S'); // []
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       max_A = max(QValueTable[allowedSAIndicies])
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       QValueTable[maxSAIndex] = QValueTable[maxSAIndex] + alpha * [R(== -100 when dead) + max_A - QValueTable[maxSAIndex]]
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     Step 5: Repeat Step 2 until game ends/training complete
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */


var _ind2sub = __webpack_require__(/*! ind2sub */ "./node_modules/ind2sub/index.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ReinforcementAI = function () {
  function ReinforcementAI(stateSizeArr, actionSizeArr) {
    _classCallCheck(this, ReinforcementAI);

    this.QValueTable = [];
    this.stateSizeArr = stateSizeArr;
    this.actionSizeArr = actionSizeArr;
    this.SASizeArr = [];
    this.SASizeArr = this.SASizeArr.concat(stateSizeArr);
    this.SASizeArr = this.SASizeArr.concat(actionSizeArr);
    this.lastSAIndex = -1;
    this.alpha = 0.5;
  }

  _createClass(ReinforcementAI, [{
    key: 'initialize',
    value: function initialize() {
      var totalSALength = this.totalSALength();
      for (var i = 0; i < totalSALength; ++i) {
        this.QValueTable[i] = Math.random();
      }
    }
  }, {
    key: 'getBestAction',
    value: function getBestAction(reduxState) {
      var SObject = this.reduxStateToSObject(reduxState);
      var allowedSAIndicies = this.allowedSAIndicies(SObject);
      var bestSAIndex = this.getMaxQValueSAIndexGivenSAIndicies(allowedSAIndicies);
      this.lastSAIndex = bestSAIndex;
      return this.SAIndexToActionObject(bestSAIndex);
    }
  }, {
    key: 'learn',
    value: function learn(nextReduxState) {
      var nextSObject = this.reduxStateToSObject(nextReduxState);
      var allowedSAIndicies = this.allowedSAIndicies(nextSObject);
      var max_A = this.getMaxQValueGivenSAIndicies(allowedSAIndicies);
      this.QValueTable[this.lastSAIndex] = this.QValueTable[this.lastSAIndex] + this.alpha * [this.reward(nextSObject) + max_A - this.QValueTable[this.lastSAIndex]];
    }

    // Private functions
    /*
    {
      player0dead: reduxState.players[0].dead,
      player0lastCardId: player0lastCardId,
      player0holdingCard0: reduxState.players[0].holdingCards[0],
      player0holdingCard1: reduxState.players[0].holdingCards[1],
    }
    */

  }, {
    key: 'allowedSAIndicies',
    value: function allowedSAIndicies(SObject) {
      var SIndex = this.SObjectToSIndex(SObject);
      var AIndicies = [],
          SAIndicies = [];
      if (SObject.player0dead) {
        return as;
      }
      var playAgainst = [],
          guess = [];
      // SObject.player0card0
      if (SObject.player0holdingCard0 === 1) {
        playAgainst = [2, 3, 4];
        guess = [2, 3, 4, 5, 6, 7, 8];
      } else if (SObject.player0holdingCard0 === 8 || SObject.player0holdingCard0 === 7 || SObject.player0holdingCard0 === 4) {
        playAgainst = [1];
        guess = [2, 3, 4, 5, 6, 7, 8];
      } else {
        playAgainst = [2, 3, 4];
        guess = [2, 3, 4, 5, 6, 7, 8];
      }
      AIndicies = AIndicies.concat(this.generateActionIndicies(SObject.player0holdingCard0, playAgainst, guess));
      var actionObjects1 = this.AIndiciesToActionObjects(AIndicies);

      // SObject.player0card1
      if (SObject.player0holdingCard1 === 1) {
        playAgainst = [2, 3, 4];
        guess = [2, 3, 4, 5, 6, 7, 8];
      } else if (SObject.player0holdingCard1 === 8 || SObject.player0holdingCard1 === 7 || SObject.player0holdingCard1 === 4) {
        playAgainst = [1];
        guess = [];
      } else {
        playAgainst = [2, 3, 4];
        guess = [];
      }
      AIndicies = AIndicies.concat(this.generateActionIndicies(SObject.player0holdingCard1, playAgainst, guess));
      var actionObjects2 = this.AIndiciesToActionObjects(AIndicies);
      return this.combineSAIndicies(SIndex, AIndicies);
    }

    // For debugging

  }, {
    key: 'AIndiciesToActionObjects',
    value: function AIndiciesToActionObjects(AIndicies) {
      // [8, 4, 7]
      var arr = [];
      for (var i = 0; i < AIndicies.length; ++i) {
        arr.push(this.AIndexToActionObjects(AIndicies[i]));
      }
      return arr;
    }
  }, {
    key: 'AIndexToActionObjects',
    value: function AIndexToActionObjects(AIndex) {
      var arr = (0, _ind2sub.ind2sub)(this.actionSizeArr, AIndex);
      return {
        cardId: arr[2],
        playAgainst: arr[1] + 1,
        guardGuess: arr[0] + 1
      };
    }
  }, {
    key: 'combineSAIndicies',
    value: function combineSAIndicies(SIndex, AIndicies) {
      var shiftedSIndex = SIndex + this.product(this.stateSizeArr);
      var ret = [];
      for (var i = 0; i < AIndicies.length; ++i) {
        ret.push(AIndicies[i] + shiftedSIndex);
      }
      return ret;
    }
  }, {
    key: 'generateActionIndicies',
    value: function generateActionIndicies(cardIdx, playAgainstArr, guessArr) {
      var arr = [];
      // [8, 4, 7]
      for (var pidx = 0; pidx < playAgainstArr.length; ++pidx) {
        for (var gidx = 0; gidx < guessArr.length; ++gidx) {
          arr.push((cardIdx * 4 + playAgainstArr[pidx]) * 7 + guessArr[gidx]);
        }
      }
      return arr;
    }
  }, {
    key: 'getMaxQValueSAIndexGivenSAIndicies',
    value: function getMaxQValueSAIndexGivenSAIndicies(SAIndicies) {
      if (SAIndicies.length === undefined || SAIndicies.length === 0) {
        return -1;
      } else {
        var max = this.QValueTable[SAIndicies[0]],
            index = SAIndicies[0];
        for (var i = 1; i < SAIndicies.length; ++i) {
          max = Math.max(max, this.QValueTable[SAIndicies[i]]);
          index = SAIndicies[i];
        }
        return index;
      }
    }
  }, {
    key: 'reduxStateToSObject',
    value: function reduxStateToSObject(reduxState) {
      /*
      stateVector = [
        player[0].dead,                         // 2
        player[0].playedCards[last_idx].cardId, // 9
        player[0].holdingCards[0],              // 8
        player[0].holdingCards[1]               // 8
      ]
      */

      var player0lastCardId = -1;
      if (reduxState.players[0].playedCards.length != 0) {
        player0lastCardId = reduxState.players[0].playedCards[reduxState.players[0].playedCards.length - 1];
      }

      return {
        player0dead: reduxState.players[1].dead,
        player0lastCardId: player0lastCardId.cardId,
        player0holdingCard0: reduxState.players[1].holdingCards[0],
        player0holdingCard1: reduxState.players[1].holdingCards[1]
      };
    }
  }, {
    key: 'reward',
    value: function reward(SObject) {
      return SObject.player0dead === true ? -100 : 0;
    }
  }, {
    key: 'SAIndexToActionObject',
    value: function SAIndexToActionObject(SAIndex) {
      // ind2sub([2, 9, 8, 8, 8, 4, 7], (S + A)) => [1][5][2][4][3][1][6] (stateVector) + (actionVector)
      var arr = (0, _ind2sub.ind2sub)(this.SASizeArr, SAIndex);
      return {
        cardId: arr[this.stateSizeArr.length + 2],
        playAgainst: arr[this.stateSizeArr.length + 1] + 1,
        guardGuess: arr[this.stateSizeArr.length] + 1
      };
    }
  }, {
    key: 'SAVectorToInteger',
    value: function SAVectorToInteger(S, A) {
      // [1][5][2][4][3][1][6] => 24901
      var wholeVector = [];
      wholeVector = wholeVector.concat(S);
      wholeVector = wholeVector.concat(A);
      var ret = 0;
      for (var i = 0; i < this.SASizeArr.length; ++i) {
        if (i !== 0) {
          ret *= this.SASizeArr[i];
        }
        ret += wholeVector[i];
      }
      return ret;
    }
  }, {
    key: 'SObjectToSVector',
    value: function SObjectToSVector(SObject) {
      var ret = [];
      ret.push(SObject.player0dead ? 1 : 0);
      ret.push(SObject.player0lastCardId);
      ret.push(SObject.player0holdingCard0);
      ret.push(SObject.player0holdingCard1);
      return ret;
    }
  }, {
    key: 'SObjectToSIndex',
    value: function SObjectToSIndex(SObject) {
      var SVector = this.SObjectToSVector(SObject);
      var ret = 0;
      for (var i = 0; i < this.stateSizeArr.length; ++i) {
        if (i !== 0) {
          ret *= this.stateSizeArr[i];
        }
        ret += SVector[i];
      }
      return ret;
    }
  }, {
    key: 'getMaxQValueGivenSAIndicies',
    value: function getMaxQValueGivenSAIndicies(SAIndicies) {
      var index = this.getMaxQValueSAIndexGivenSAIndicies(SAIndicies);
      return this.QValueTable[index];
    }
  }, {
    key: 'totalSALength',
    value: function totalSALength() {
      var totalSAArr = [];
      totalSAArr = totalSAArr.concat(this.stateSizeArr);
      totalSAArr = totalSAArr.concat(this.actionSizeArr);
      return this.product(totalSAArr);
    }
  }, {
    key: 'product',
    value: function product(arr) {
      var retVal = 1;
      for (var i = 0; i < arr.length; ++i) {
        retVal *= arr[i];
      }
      return retVal;
    }
  }]);

  return ReinforcementAI;
}();

exports.default = ReinforcementAI;

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

function getNonDeadNonProtectedPlayers(playerId, players) {
  var nonDeadNonProtectedPlayerList = [];
  players.forEach(function (player) {
    if (player.id != playerId && !player.protected && !player.dead) {
      nonDeadNonProtectedPlayerList.push(player.id);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2luZDJzdWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FjdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnN0LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovLy8uL3NyYy9yYW5kb21BSS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVkdWNlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlaW5mb3JjZW1lbnRBSS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2V0QnV0dG9uU3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwuanMiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJpbmQyc3ViIiwic2l6ZXMiLCJpbmRleCIsImN1bXByb2QiLCJyZWR1Y2UiLCJhY2MiLCJuIiwiY29uY2F0IiwibGVuZ3RoIiwibWFwIiwic2l6ZSIsImkiLCJNYXRoIiwiZmxvb3IiLCJpbmQyc3ViTm9jaGVjayIsIm9wdGltaXplSW5kMnN1YiIsInBsYXlDYXJkIiwiY2FyZFRvUGxheSIsInR5cGUiLCJkaXNjYXJkQ2FyZCIsImNhcmQiLCJjYXJkUmFuayIsImNhcmROYW1lcyIsInN0YXJ0aW5nQ2FyZHMiLCJub25BdHRhY2tpbmdDYXJkcyIsImluaXRpYWxTdGF0ZSIsImNvdW50ZXIiLCJjdXJyZW50UGxheWVySWQiLCJwbGF5ZXJzIiwiaWQiLCJkZWFkIiwicHJvdGVjdGVkIiwiaG9sZGluZ0NhcmRzIiwicGxheWVkQ2FyZHMiLCJzZWVuQ2FyZHMiLCJmaXJzdENhcmQiLCJhdmFpbGFibGVDYXJkcyIsImdhbWVFbmRzIiwid2lubmVyIiwiYnV0dG9uU3RhdGVzIiwiY2hvb3NlQ2FyZCIsInBsYXlBZ2FpbnN0IiwiR3VhcmRHdWVzcyIsInJlYWR5Rm9yTmV4dFR1cm4iLCJjYXJkSWQiLCJndWFyZEd1ZXNzIiwidmFsdWVUYWJsZSIsImd1ZXNzIiwic3RvcmUiLCJSZWR1eCIsImNyZWF0ZVN0b3JlIiwiY29tYmluZVJlZHVjZXJzIiwid2luZG93IiwiX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fXyIsInJlbmRlciIsIiQiLCJ0ZXh0IiwiZ2V0U3RhdGUiLCJ0b1N0cmluZyIsImh1bWFuUGxheWVySWQiLCJlbXB0eSIsInJlbmRlclBsYXllZENhcmRzIiwiYXBwZW5kIiwicGxheWVySWQiLCJyZW1vdmVDbGFzcyIsImF0dHIiLCJjYXJkSWR4Iiwic3RyaW5nIiwiZGlzY2FyZGVkIiwidW5kZWZpbmVkIiwic3Vic2NyaWJlIiwib24iLCJkaXNwYXRjaCIsImFjdGlvbnMiLCJuZXh0VHVybiIsInNldFRpbWVvdXQiLCJwbGF5ZXIiLCJyZWluZm9yY2VtZW50QUkiLCJsZWFybiIsInJlaW5mb3JjZW1lbnRBSUNhcmQiLCJnZXRCZXN0QWN0aW9uIiwicmFuZG9tQUlDYXJkIiwiUmVpbmZvcmNlbWVudEFJIiwiZG9jdW1lbnQiLCJyZWFkeSIsImluaXRpYWxpemUiLCJjbGljayIsImNvbnNvbGUiLCJsb2ciLCJQbGF5ZXIiLCJudW1iZXIiLCJjYXJkcyIsInB1c2giLCJjYXJkc05vdFBsYXllZFlldCIsImNhcmRJbmRleCIsImluZGV4T2YiLCJjYXJkVG9HdWVzcyIsImFnYWluc3QiLCJnZXROb25EZWFkTm9uUHJvdGVjdGVkUGxheWVyTGlzdCIsInJhbmRvbVBsYXllckluZGV4IiwicmFuZG9tIiwicGxheWVkQ2FyZCIsInBsYXkiLCJzcGxpY2UiLCJkaXNjYXJkZWRDYXJkIiwicmFuZG9tQUkiLCJyZXNvbHZlIiwic3RhdGUiLCJuZXh0U3RhdGUiLCJhc3NpZ24iLCJjYXJkVmFsdWUxIiwiY2FyZFZhbHVlMiIsImNhcmRUb0Rpc2NhcmQiLCJjYXJkVG9Td2FwIiwiYWN0aW9uIiwibmV3U3RhdGUiLCJKU09OIiwicGFyc2UiLCJzdHJpbmdpZnkiLCJyYW5kb21DYXJkSWQiLCJjaGVja0dhbWVFbmQiLCJnYW1lRW5kIiwid2lubmVySWQiLCJ1cGRhdGVWYWx1ZVRhYmxlIiwicHJldmlvdXNTdGF0ZSIsInN0YXRlU2l6ZUFyciIsImFjdGlvblNpemVBcnIiLCJRVmFsdWVUYWJsZSIsIlNBU2l6ZUFyciIsImxhc3RTQUluZGV4IiwiYWxwaGEiLCJ0b3RhbFNBTGVuZ3RoIiwicmVkdXhTdGF0ZSIsIlNPYmplY3QiLCJyZWR1eFN0YXRlVG9TT2JqZWN0IiwiYWxsb3dlZFNBSW5kaWNpZXMiLCJiZXN0U0FJbmRleCIsImdldE1heFFWYWx1ZVNBSW5kZXhHaXZlblNBSW5kaWNpZXMiLCJTQUluZGV4VG9BY3Rpb25PYmplY3QiLCJuZXh0UmVkdXhTdGF0ZSIsIm5leHRTT2JqZWN0IiwibWF4X0EiLCJnZXRNYXhRVmFsdWVHaXZlblNBSW5kaWNpZXMiLCJyZXdhcmQiLCJTSW5kZXgiLCJTT2JqZWN0VG9TSW5kZXgiLCJBSW5kaWNpZXMiLCJTQUluZGljaWVzIiwicGxheWVyMGRlYWQiLCJhcyIsInBsYXllcjBob2xkaW5nQ2FyZDAiLCJnZW5lcmF0ZUFjdGlvbkluZGljaWVzIiwiYWN0aW9uT2JqZWN0czEiLCJBSW5kaWNpZXNUb0FjdGlvbk9iamVjdHMiLCJwbGF5ZXIwaG9sZGluZ0NhcmQxIiwiYWN0aW9uT2JqZWN0czIiLCJjb21iaW5lU0FJbmRpY2llcyIsImFyciIsIkFJbmRleFRvQWN0aW9uT2JqZWN0cyIsIkFJbmRleCIsInNoaWZ0ZWRTSW5kZXgiLCJwcm9kdWN0IiwicmV0IiwicGxheUFnYWluc3RBcnIiLCJndWVzc0FyciIsInBpZHgiLCJnaWR4IiwibWF4IiwicGxheWVyMGxhc3RDYXJkSWQiLCJTQUluZGV4IiwiUyIsIkEiLCJ3aG9sZVZlY3RvciIsIlNWZWN0b3IiLCJTT2JqZWN0VG9TVmVjdG9yIiwidG90YWxTQUFyciIsInJldFZhbCIsImVuYWJsZUd1YXJkR3Vlc3NCdXR0b24iLCJwcm9wIiwiZGlzYWJsZUd1YXJkR3Vlc3NCdXR0b24iLCJlbmFibGVQbGF5QWdhaW5zdEJ1dHRvbiIsImRpc2FibGVQbGF5QWdhaW5zdEJ1dHRvbiIsImVuYWJsZVBsYXlCdXR0b24iLCJkaXNhYmxlUGxheUJ1dHRvbiIsImNvbXBhcmVDYXJkcyIsImNhcmQxIiwiY2FyZDIiLCJnZXRMaXZpbmdQbGF5ZXJTaXplIiwicmVzdWx0IiwiZm9yRWFjaCIsImNhbGN1bGF0ZVdpbm5lciIsImdldE5vbkRlYWROb25Qcm90ZWN0ZWRQbGF5ZXJzIiwibm9uRGVhZE5vblByb3RlY3RlZFBsYXllckxpc3QiLCJnZXRBdmFpbGFibGVDYXJkU2l6ZSIsImdldEhpZ2hlc3ROb3RZZXRBcHBlYXJlZENhcmQiLCJjYXJkTmFtZSIsImdldFJhbmRvbUNhcmQiLCJ0b3RhbENhcmRzIiwicmFuZG9tQ2FyZE51bWJlciIsInRlbXAiLCJkcmF3ZWRDYXJkIiwia2V5IiwiaGFzT3duUHJvcGVydHkiLCJuZXh0UGxheWVyIiwidG90YWxQbGF5ZXJzIiwibmV4dFBsYXllckluZGV4IiwicmVzZXRQcm90ZWN0aW9uIiwiQ0IiLCJkcmF3Q2FyZCIsImRyYXdDYXJkRm9yUGxheWVyIiwiYWRkSG9sZGluZ0NhcmRzIiwiYWRkUGxheWVkQ2FyZCIsImNoZWNrTm90RGVhZEFuZE5vdFByb3RlY3RlZCIsInNldFBsYXllckRlYWQiLCJhZGRTZWVuQ2FyZHMiLCJzZWVuQ2FyZCIsInBvcHVsYXRlVmFsdWVUYWJsZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFF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QUksa0IsR0FBQUEsa0IiLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gaW5kMnN1YihzaXplcywgaW5kZXgpIHtcbiAgICB2YXIgY3VtcHJvZCA9IHNpemVzLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBuKSB7IHJldHVybiBhY2MuY29uY2F0KGFjY1thY2MubGVuZ3RoIC0gMV0gKiBuKTsgfSwgWzFdKTtcbiAgICByZXR1cm4gc2l6ZXMubWFwKGZ1bmN0aW9uIChzaXplLCBpKSB7IHJldHVybiBNYXRoLmZsb29yKGluZGV4IC8gKGN1bXByb2RbaV0pKSAlIHNpemU7IH0pO1xufVxuZXhwb3J0cy5pbmQyc3ViID0gaW5kMnN1YjtcbmZ1bmN0aW9uIGluZDJzdWJOb2NoZWNrKHNpemVzLCBpbmRleCwgY3VtcHJvZCkge1xuICAgIHJldHVybiBzaXplcy5tYXAoZnVuY3Rpb24gKHNpemUsIGkpIHsgcmV0dXJuIE1hdGguZmxvb3IoaW5kZXggLyAoY3VtcHJvZFtpXSkpICUgc2l6ZTsgfSk7XG59XG5mdW5jdGlvbiBvcHRpbWl6ZUluZDJzdWIoc2l6ZXMpIHtcbiAgICB2YXIgY3VtcHJvZCA9IHNpemVzLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBuKSB7IHJldHVybiBhY2MuY29uY2F0KGFjY1thY2MubGVuZ3RoIC0gMV0gKiBuKTsgfSwgWzFdKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGluZGV4KSB7IHJldHVybiBpbmQyc3ViTm9jaGVjayhzaXplcywgaW5kZXgsIGN1bXByb2QpOyB9O1xufVxuZXhwb3J0cy5vcHRpbWl6ZUluZDJzdWIgPSBvcHRpbWl6ZUluZDJzdWI7XG4iLCJ2YXIgcGxheUNhcmQgPSBleHBvcnRzLnBsYXlDYXJkID0gZnVuY3Rpb24gcGxheUNhcmQoY2FyZFRvUGxheSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdQTEFZX0NBUkQnLFxuICAgIGNhcmRUb1BsYXk6IGNhcmRUb1BsYXlcbiAgfTtcbn07XG5cbnZhciBkaXNjYXJkQ2FyZCA9IGV4cG9ydHMuZGlzY2FyZENhcmQgPSBmdW5jdGlvbiBkaXNjYXJkQ2FyZChjYXJkKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ0RJU0NBUkRfQ0FSRCcsXG4gICAgY2FyZDogY2FyZFxuICB9O1xufSIsImNvbnN0IGNhcmRSYW5rID0ge1xuICAnR3VhcmQnOiAxLFxuICAnUHJpZXN0JzogMixcbiAgJ0Jhcm9uJzogMyxcbiAgJ0hhbmRtYWlkJzogNCxcbiAgJ1ByaW5jZSc6IDUsXG4gICdLaW5nJzogNixcbiAgJ0NvdW50ZXNzJzogNyxcbiAgJ1ByaW5jZXNzJzogOCxcbn1cblxuY29uc3QgY2FyZE5hbWVzID0gW1xuICAnR3VhcmQnLFxuICAnUHJpZXN0JyxcbiAgJ0Jhcm9uJyxcbiAgJ0hhbmRtYWlkJyxcbiAgJ1ByaW5jZScsXG4gICdLaW5nJyxcbiAgJ0NvdW50ZXNzJyxcbiAgJ1ByaW5jZXNzJyxcbl07XG5cbmNvbnN0IHN0YXJ0aW5nQ2FyZHMgPSB7XG4gICdHdWFyZCc6IDUsXG4gICdQcmllc3QnOiAyLFxuICAnQmFyb24nOiAyLFxuICAnSGFuZG1haWQnOiAyLFxuICAnUHJpbmNlJzogMixcbiAgJ0tpbmcnOiAxLFxuICAnQ291bnRlc3MnOiAxLFxuICAnUHJpbmNlc3MnOiAxLFxufTtcblxuY29uc3Qgbm9uQXR0YWNraW5nQ2FyZHMgPSBbXG4gICdIYW5kbWFpZCcsXG4gICdDb3VudGVzcycsXG4gICdLaW5nJyxcbl07XG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgY291bnRlcjogMCxcbiAgY3VycmVudFBsYXllcklkOiAxLFxuICBwbGF5ZXJzOiBbXG4gICAge1xuICAgICAgaWQ6IDEsXG4gICAgICBkZWFkOiBmYWxzZSxcbiAgICAgIHByb3RlY3RlZDogZmFsc2UsXG4gICAgICBob2xkaW5nQ2FyZHM6IFtdLFxuICAgICAgcGxheWVkQ2FyZHM6IFtdLFxuICAgICAgc2VlbkNhcmRzOiBbXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGlkOiAyLFxuICAgICAgZGVhZDogZmFsc2UsXG4gICAgICBwcm90ZWN0ZWQ6IGZhbHNlLFxuICAgICAgaG9sZGluZ0NhcmRzOiBbXSxcbiAgICAgIHBsYXllZENhcmRzOiBbXSxcbiAgICAgIHNlZW5DYXJkczogW10sXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogMyxcbiAgICAgIGRlYWQ6IGZhbHNlLFxuICAgICAgcHJvdGVjdGVkOiBmYWxzZSxcbiAgICAgIGhvbGRpbmdDYXJkczogW10sXG4gICAgICBwbGF5ZWRDYXJkczogW10sXG4gICAgICBzZWVuQ2FyZHM6IFtdLFxuICAgIH0sXG4gICAge1xuICAgICAgaWQ6IDQsXG4gICAgICBkZWFkOiBmYWxzZSxcbiAgICAgIHByb3RlY3RlZDogZmFsc2UsXG4gICAgICBob2xkaW5nQ2FyZHM6IFtdLFxuICAgICAgcGxheWVkQ2FyZHM6IFtdLFxuICAgICAgc2VlbkNhcmRzOiBbXSxcbiAgICB9XG4gIF0sXG4gIGZpcnN0Q2FyZDoge1xuXG4gIH0sXG4gIGF2YWlsYWJsZUNhcmRzOiB7XG4gICAgJ0d1YXJkJzogNSxcbiAgICAnUHJpZXN0JzogMixcbiAgICAnQmFyb24nOiAyLFxuICAgICdIYW5kbWFpZCc6IDIsXG4gICAgJ1ByaW5jZSc6IDIsXG4gICAgJ0tpbmcnOiAxLFxuICAgICdDb3VudGVzcyc6IDEsXG4gICAgJ1ByaW5jZXNzJzogMSxcbiAgfSxcbiAgZ2FtZUVuZHM6IHtcbiAgICB3aW5uZXI6IG51bGxcbiAgfSxcbiAgYnV0dG9uU3RhdGVzOiB7XG4gICAgY2hvb3NlQ2FyZDogdHJ1ZSxcbiAgICBwbGF5QWdhaW5zdDogZmFsc2UsXG4gICAgR3VhcmRHdWVzczogZmFsc2UsXG4gIH0sXG4gIHJlYWR5Rm9yTmV4dFR1cm46IGZhbHNlLFxuICBjYXJkVG9QbGF5OiB7XG4gICAgY2FyZElkOiBudWxsLFxuICAgIHBsYXlBZ2FpbnN0OiAtMSxcbiAgICBndWFyZEd1ZXNzOiAtMVxuICB9LFxuICB2YWx1ZVRhYmxlOiB7XG4gICAgY2FyZElkOiBbXG4gICAgICB7XG4gICAgICAgIHBsYXlBZ2FpbnN0OiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgZ3Vlc3M6IFtdXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBndWVzczogW11cbiAgICAgICAgICB9LHtcbiAgICAgICAgICAgIGd1ZXNzOiBbXVxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcGxheUFnYWluc3Q6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBndWVzczogW11cbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGd1ZXNzOiBbXVxuICAgICAgICAgIH0se1xuICAgICAgICAgICAgZ3Vlc3M6IFtdXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwbGF5QWdhaW5zdDogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGd1ZXNzOiBbXVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgZ3Vlc3M6IFtdXG4gICAgICAgICAgfSx7XG4gICAgICAgICAgICBndWVzczogW11cbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHBsYXlBZ2FpbnN0OiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgZ3Vlc3M6IFtdXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBndWVzczogW11cbiAgICAgICAgICB9LHtcbiAgICAgICAgICAgIGd1ZXNzOiBbXVxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcGxheUFnYWluc3Q6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBndWVzczogW11cbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGd1ZXNzOiBbXVxuICAgICAgICAgIH0se1xuICAgICAgICAgICAgZ3Vlc3M6IFtdXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwbGF5QWdhaW5zdDogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGd1ZXNzOiBbXVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgZ3Vlc3M6IFtdXG4gICAgICAgICAgfSx7XG4gICAgICAgICAgICBndWVzczogW11cbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHBsYXlBZ2FpbnN0OiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgZ3Vlc3M6IFtdXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBndWVzczogW11cbiAgICAgICAgICB9LHtcbiAgICAgICAgICAgIGd1ZXNzOiBbXVxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcGxheUFnYWluc3Q6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBndWVzczogW11cbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGd1ZXNzOiBbXVxuICAgICAgICAgIH0se1xuICAgICAgICAgICAgZ3Vlc3M6IFtdXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgIF1cbiAgfVxufTtcblxuZXhwb3J0IHtcbiAgY2FyZFJhbmssXG4gIGNhcmROYW1lcyxcbiAgaW5pdGlhbFN0YXRlLFxuICBub25BdHRhY2tpbmdDYXJkcyxcbiAgc3RhcnRpbmdDYXJkcyxcbn0iLCJpbXBvcnQgeyBjb3VudGVyIH0gZnJvbSAnLi9yZWR1Y2Vycyc7XG5pbXBvcnQgeyBjYXJkTmFtZXMgfSBmcm9tICcuL2NvbnN0JztcbmltcG9ydCBhY3Rpb25zIGZyb20gJy4vYWN0aW9ucyc7XG5pbXBvcnQgeyBkaXNhYmxlUGxheUJ1dHRvbiwgZGlzYWJsZVBsYXlBZ2FpbnN0QnV0dG9uLCBkaXNhYmxlR3VhcmRHdWVzc0J1dHRvbiwgZW5hYmxlUGxheUJ1dHRvbiwgZW5hYmxlUGxheUFnYWluc3RCdXR0b24sIGVuYWJsZUd1YXJkR3Vlc3NCdXR0b24gfSBmcm9tICcuL3NldEJ1dHRvblN0YXRlJztcbmltcG9ydCB7IGdldEF2YWlsYWJsZUNhcmRTaXplIH0gZnJvbSAnLi91dGlsJztcbmltcG9ydCBSZWluZm9yY2VtZW50QUkgZnJvbSAnLi9yZWluZm9yY2VtZW50QUknO1xuaW1wb3J0IHJhbmRvbUFJIGZyb20gJy4vcmFuZG9tQUknO1xuXG52YXIgc3RvcmUgPSBSZWR1eC5jcmVhdGVTdG9yZShSZWR1eC5jb21iaW5lUmVkdWNlcnMoe2NvdW50ZXJ9KSxcbiAgd2luZG93Ll9fUkVEVVhfREVWVE9PTFNfRVhURU5TSU9OX18gJiYgd2luZG93Ll9fUkVEVVhfREVWVE9PTFNfRVhURU5TSU9OX18oKSk7XG5cbmZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgJCgnI2N1cnJlbnRQbGF5ZXJJZCcpLnRleHQoc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLmN1cnJlbnRQbGF5ZXJJZC50b1N0cmluZygpKTtcbiAgbGV0IGh1bWFuUGxheWVySWQgPSAwOyAvLyBzdG9yZS5nZXRTdGF0ZSgpLmNvdW50ZXIuY3VycmVudFBsYXllcklkIC0gMVxuICBpZiAoc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLmdhbWVFbmRzLndpbm5lciA9PT0gbnVsbCAmJiBzdG9yZS5nZXRTdGF0ZSgpLmNvdW50ZXIucGxheWVyc1todW1hblBsYXllcklkXS5ob2xkaW5nQ2FyZHMubGVuZ3RoID4gMCkge1xuICAgICQoJyNwbGF5QnV0dG9uMScpLnRleHQoY2FyZE5hbWVzW3N0b3JlLmdldFN0YXRlKCkuY291bnRlci5wbGF5ZXJzW2h1bWFuUGxheWVySWRdLmhvbGRpbmdDYXJkc1swXS50b1N0cmluZygpIC0gMV0pO1xuICB9XG5cbiAgaWYgKHN0b3JlLmdldFN0YXRlKCkuY291bnRlci5nYW1lRW5kcy53aW5uZXIgPT09IG51bGwgJiYgc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLnBsYXllcnNbaHVtYW5QbGF5ZXJJZF0uaG9sZGluZ0NhcmRzLmxlbmd0aCA+IDEpIHtcbiAgICAkKCcjcGxheUJ1dHRvbjInKS50ZXh0KGNhcmROYW1lc1tzdG9yZS5nZXRTdGF0ZSgpLmNvdW50ZXIucGxheWVyc1todW1hblBsYXllcklkXS5ob2xkaW5nQ2FyZHNbMV0udG9TdHJpbmcoKSAtIDFdKTtcbiAgfSBlbHNlIHtcbiAgICAkKCcjcGxheUJ1dHRvbjInKS50ZXh0KCcnKTtcbiAgfVxuXG4gIGlmIChzdG9yZS5nZXRTdGF0ZSgpLmNvdW50ZXIuZ2FtZUVuZHMud2lubmVyID09PSBudWxsKSB7XG4gICAgJChgI3BsYXllclBsYXllZExpc3QxYCkuZW1wdHkoKTtcbiAgICAkKGAjcGxheWVyUGxheWVkTGlzdDJgKS5lbXB0eSgpO1xuICAgICQoYCNwbGF5ZXJQbGF5ZWRMaXN0M2ApLmVtcHR5KCk7XG4gICAgJChgI3BsYXllclBsYXllZExpc3Q0YCkuZW1wdHkoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0b3JlLmdldFN0YXRlKCkuY291bnRlci5wbGF5ZXJzWzBdLnBsYXllZENhcmRzLmxlbmd0aDsgKytpKSB7XG4gICAgICByZW5kZXJQbGF5ZWRDYXJkcygwLCBpKTtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdG9yZS5nZXRTdGF0ZSgpLmNvdW50ZXIucGxheWVyc1sxXS5wbGF5ZWRDYXJkcy5sZW5ndGg7ICsraSkge1xuICAgICAgcmVuZGVyUGxheWVkQ2FyZHMoMSwgaSk7XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLnBsYXllcnNbMl0ucGxheWVkQ2FyZHMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHJlbmRlclBsYXllZENhcmRzKDIsIGkpO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0b3JlLmdldFN0YXRlKCkuY291bnRlci5wbGF5ZXJzWzNdLnBsYXllZENhcmRzLmxlbmd0aDsgKytpKSB7XG4gICAgICByZW5kZXJQbGF5ZWRDYXJkcygzLCBpKTtcbiAgICB9XG4gIH1cblxuICAkKCcjcHJpZXN0TGlzdCcpLmVtcHR5KCk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLnBsYXllcnNbMF0uc2VlbkNhcmRzLmxlbmd0aDsgKytpKSB7XG4gICAgJCgnI3ByaWVzdExpc3QnKS5hcHBlbmQoYDxsaSBjbGFzcz1cIml0ZW1cIj5QbGF5ZXIgJHtzdG9yZS5nZXRTdGF0ZSgpLmNvdW50ZXIucGxheWVyc1swXS5zZWVuQ2FyZHNbaV0ucGxheWVySWR9IGhhcyAke2NhcmROYW1lc1tzdG9yZS5nZXRTdGF0ZSgpLmNvdW50ZXIucGxheWVyc1swXS5zZWVuQ2FyZHNbaV0uY2FyZElkIC0gMV19PC9saT5gKTtcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgKytpKSB7XG4gICAgJChgI3BsYXllclRpdGxlJHtpICsgMX1gKS5yZW1vdmVDbGFzcyhcInBsYXllclByb3RlY3RlZFwiKTtcbiAgICAkKGAjcGxheWVyVGl0bGUke2kgKyAxfWApLnJlbW92ZUNsYXNzKFwicGxheWVyRGVhZFwiKTtcbiAgICAkKGAjcGxheWVyVGl0bGUke2kgKyAxfWApLnJlbW92ZUNsYXNzKFwicGxheWVyV2luXCIpO1xuICB9XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyArK2kpIHtcbiAgICBpZiAoc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLnBsYXllcnNbaV0uZGVhZCkge1xuICAgICAgJChgI3BsYXllclRpdGxlJHtpICsgMX1gKS5hdHRyKFwiY2xhc3NcIixcInBsYXllckRlYWRcIik7XG4gICAgICAkKGAjcGxheWVyVGl0bGUke2kgKyAxfWApLnRleHQoYFBsYXllciAke2kgKyAxfSAtICR7Y2FyZE5hbWVzW3N0b3JlLmdldFN0YXRlKCkuY291bnRlci5wbGF5ZXJzW2ldLmhvbGRpbmdDYXJkc1swXSAtIDFdfWApO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKGAjcGxheWVyVGl0bGUke2kgKyAxfWApLnRleHQoYFBsYXllciAke2kgKyAxfWApO1xuICAgIH1cbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgKytpKSB7XG4gICAgaWYgKHN0b3JlLmdldFN0YXRlKCkuY291bnRlci5wbGF5ZXJzW2ldLnByb3RlY3RlZCkge1xuICAgICAgJChgI3BsYXllclRpdGxlJHtpICsgMX1gKS5hdHRyKFwiY2xhc3NcIixcInBsYXllclByb3RlY3RlZFwiKTtcbiAgICB9XG4gIH1cblxuICBpZiAoc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLmdhbWVFbmRzLndpbm5lciAhPT0gbnVsbCkge1xuICAgICQoJyNzdGF0dXMnKS50ZXh0KGBXaW5uZXIgaXMgJHtzdG9yZS5nZXRTdGF0ZSgpLmNvdW50ZXIuZ2FtZUVuZHMud2lubmVyLmlkfWApO1xuICAgICQoYCNwbGF5ZXJUaXRsZSR7c3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLmdhbWVFbmRzLndpbm5lci5pZH1gKS5hdHRyKFwiY2xhc3NcIixcInBsYXllcldpblwiKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7ICsraSkge1xuICAgICAgaWYgKCFzdG9yZS5nZXRTdGF0ZSgpLmNvdW50ZXIucGxheWVyc1tpXS5kZWFkKSB7XG4gICAgICAgICQoYCNwbGF5ZXJUaXRsZSR7aSArIDF9YCkudGV4dChgUGxheWVyICR7aSArIDF9IC0gJHtjYXJkTmFtZXNbc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLnBsYXllcnNbaV0uaG9sZGluZ0NhcmRzWzBdIC0gMV19YCk7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgICQoJyNzdGF0dXMnKS50ZXh0KGBQbGF5ZXIgJHtzdG9yZS5nZXRTdGF0ZSgpLmNvdW50ZXIuY3VycmVudFBsYXllcklkfSdzIHR1cm4uICR7Z2V0QXZhaWxhYmxlQ2FyZFNpemUoc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLmF2YWlsYWJsZUNhcmRzKX0gY2FyZHMgbGVmdGApO1xuICB9XG5cbiAgaWYgKHN0b3JlLmdldFN0YXRlKCkuY291bnRlci5idXR0b25TdGF0ZXMuY2hvb3NlQ2FyZCkge1xuICAgIGVuYWJsZVBsYXlCdXR0b24oKTtcbiAgfSBlbHNlIHtcbiAgICBkaXNhYmxlUGxheUJ1dHRvbigpO1xuICB9XG5cbiAgaWYgKHN0b3JlLmdldFN0YXRlKCkuY291bnRlci5idXR0b25TdGF0ZXMucGxheUFnYWluc3QpIHtcbiAgICBlbmFibGVQbGF5QWdhaW5zdEJ1dHRvbihzdG9yZS5nZXRTdGF0ZSgpLmNvdW50ZXIucGxheWVycyk7XG4gIH0gZWxzZSB7XG4gICAgZGlzYWJsZVBsYXlBZ2FpbnN0QnV0dG9uKCk7XG4gIH1cblxuICBpZiAoc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLmJ1dHRvblN0YXRlcy5ndWFyZEd1ZXNzKSB7XG4gICAgZW5hYmxlR3VhcmRHdWVzc0J1dHRvbigpO1xuICB9IGVsc2Uge1xuICAgIGRpc2FibGVHdWFyZEd1ZXNzQnV0dG9uKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVuZGVyUGxheWVkQ2FyZHMocGxheWVySWQsIGNhcmRJZHgpIHtcbiAgbGV0IHN0cmluZyA9IGNhcmROYW1lc1tzdG9yZS5nZXRTdGF0ZSgpLmNvdW50ZXIucGxheWVyc1twbGF5ZXJJZF0ucGxheWVkQ2FyZHNbY2FyZElkeF0uY2FyZElkIC0gMV07XG4gIGlmIChzdG9yZS5nZXRTdGF0ZSgpLmNvdW50ZXIucGxheWVyc1twbGF5ZXJJZF0ucGxheWVkQ2FyZHNbY2FyZElkeF0uZGlzY2FyZGVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAkKGAjcGxheWVyUGxheWVkTGlzdCR7cGxheWVySWQgKyAxfWApLmFwcGVuZChgPGxpIGNsYXNzPVwiaXRlbSBkaXNjYXJkXCI+JHtzdHJpbmd9PC9saT5gKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLnBsYXllcnNbcGxheWVySWRdLnBsYXllZENhcmRzW2NhcmRJZHhdLnBsYXlBZ2FpbnN0ICE9PSAtMSkge1xuICAgICAgc3RyaW5nICs9ICcgcGxheSBhZ2FpbnN0ICcgKyBzdG9yZS5nZXRTdGF0ZSgpLmNvdW50ZXIucGxheWVyc1twbGF5ZXJJZF0ucGxheWVkQ2FyZHNbY2FyZElkeF0ucGxheUFnYWluc3Q7XG4gICAgfVxuICAgIGlmIChzdG9yZS5nZXRTdGF0ZSgpLmNvdW50ZXIucGxheWVyc1twbGF5ZXJJZF0ucGxheWVkQ2FyZHNbY2FyZElkeF0uZ3VhcmRHdWVzcyAhPT0gLTEpIHtcbiAgICAgIHN0cmluZyArPSAnLCBndWVzc2luZyAnICsgY2FyZE5hbWVzW3N0b3JlLmdldFN0YXRlKCkuY291bnRlci5wbGF5ZXJzW3BsYXllcklkXS5wbGF5ZWRDYXJkc1tjYXJkSWR4XS5ndWFyZEd1ZXNzIC0gMV07XG4gICAgfVxuICAgICQoYCNwbGF5ZXJQbGF5ZWRMaXN0JHtwbGF5ZXJJZCArIDF9YCkuYXBwZW5kKGA8bGkgY2xhc3M9XCJpdGVtXCI+JHtzdHJpbmd9PC9saT5gKTtcbiAgfVxufVxucmVuZGVyKClcbnN0b3JlLnN1YnNjcmliZShyZW5kZXIpXG5cbiQoJyNwbGF5QnV0dG9uMScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgc3RvcmUuZGlzcGF0Y2goe3R5cGU6ICdDSE9PU0VfQ0FSRCcsIGNhcmRJZDogc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLnBsYXllcnNbc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLmN1cnJlbnRQbGF5ZXJJZCAtIDFdLmhvbGRpbmdDYXJkc1swXX0pO1xuICBpZiAoc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLnJlYWR5Rm9yTmV4dFR1cm4pIHtcbiAgICBzdG9yZS5kaXNwYXRjaChhY3Rpb25zLnBsYXlDYXJkKHN0b3JlLmdldFN0YXRlKCkuY291bnRlci5jYXJkVG9QbGF5KSk7XG4gICAgbmV4dFR1cm4oKTtcbiAgfVxufSk7XG5cbiQoJyNwbGF5QnV0dG9uMicpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgc3RvcmUuZGlzcGF0Y2goe3R5cGU6ICdDSE9PU0VfQ0FSRCcsIGNhcmRJZDogc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLnBsYXllcnNbc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLmN1cnJlbnRQbGF5ZXJJZCAtIDFdLmhvbGRpbmdDYXJkc1sxXX0pO1xuICBpZiAoc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLnJlYWR5Rm9yTmV4dFR1cm4pIHtcbiAgICBzdG9yZS5kaXNwYXRjaChhY3Rpb25zLnBsYXlDYXJkKHN0b3JlLmdldFN0YXRlKCkuY291bnRlci5jYXJkVG9QbGF5KSk7XG4gICAgbmV4dFR1cm4oKTtcbiAgfVxufSk7XG5cbiQoJyNwbGF5QWdhaW5zdEJ1dHRvbjEnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgc3RvcmUuZGlzcGF0Y2goe3R5cGU6ICdQTEFZX0FHQUlOU1QnLCBwbGF5QWdhaW5zdDogMX0pO1xuICBpZiAoc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLnJlYWR5Rm9yTmV4dFR1cm4pIHtcbiAgICBzdG9yZS5kaXNwYXRjaChhY3Rpb25zLnBsYXlDYXJkKHN0b3JlLmdldFN0YXRlKCkuY291bnRlci5jYXJkVG9QbGF5KSk7XG4gICAgbmV4dFR1cm4oKTtcbiAgfVxufSk7XG5cbiQoJyNwbGF5QWdhaW5zdEJ1dHRvbjInKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgc3RvcmUuZGlzcGF0Y2goe3R5cGU6ICdQTEFZX0FHQUlOU1QnLCBwbGF5QWdhaW5zdDogMn0pO1xuICBpZiAoc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLnJlYWR5Rm9yTmV4dFR1cm4pIHtcbiAgICBzdG9yZS5kaXNwYXRjaChhY3Rpb25zLnBsYXlDYXJkKHN0b3JlLmdldFN0YXRlKCkuY291bnRlci5jYXJkVG9QbGF5KSk7XG4gICAgbmV4dFR1cm4oKTtcbiAgfVxufSk7XG5cbiQoJyNwbGF5QWdhaW5zdEJ1dHRvbjMnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgc3RvcmUuZGlzcGF0Y2goe3R5cGU6ICdQTEFZX0FHQUlOU1QnLCBwbGF5QWdhaW5zdDogM30pO1xuICBpZiAoc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLnJlYWR5Rm9yTmV4dFR1cm4pIHtcbiAgICBzdG9yZS5kaXNwYXRjaChhY3Rpb25zLnBsYXlDYXJkKHN0b3JlLmdldFN0YXRlKCkuY291bnRlci5jYXJkVG9QbGF5KSk7XG4gICAgbmV4dFR1cm4oKTtcbiAgfVxufSk7XG5cbiQoJyNwbGF5QWdhaW5zdEJ1dHRvbjQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgc3RvcmUuZGlzcGF0Y2goe3R5cGU6ICdQTEFZX0FHQUlOU1QnLCBwbGF5QWdhaW5zdDogNH0pO1xuICBpZiAoc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLnJlYWR5Rm9yTmV4dFR1cm4pIHtcbiAgICBzdG9yZS5kaXNwYXRjaChhY3Rpb25zLnBsYXlDYXJkKHN0b3JlLmdldFN0YXRlKCkuY291bnRlci5jYXJkVG9QbGF5KSk7XG4gICAgbmV4dFR1cm4oKTtcbiAgfVxufSk7XG5cbiQoJyNndWFyZEd1ZXNzQnV0dG9uMicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICBzdG9yZS5kaXNwYXRjaCh7dHlwZTogJ0dVQVJEX0dVRVNTJywgZ3VhcmRHdWVzczogMn0pO1xuICBpZiAoc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLnJlYWR5Rm9yTmV4dFR1cm4pIHtcbiAgICBzdG9yZS5kaXNwYXRjaChhY3Rpb25zLnBsYXlDYXJkKHN0b3JlLmdldFN0YXRlKCkuY291bnRlci5jYXJkVG9QbGF5KSk7XG4gICAgbmV4dFR1cm4oKTtcbiAgfVxufSk7XG5cbiQoJyNndWFyZEd1ZXNzQnV0dG9uMycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICBzdG9yZS5kaXNwYXRjaCh7dHlwZTogJ0dVQVJEX0dVRVNTJywgZ3VhcmRHdWVzczogM30pO1xuICBpZiAoc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLnJlYWR5Rm9yTmV4dFR1cm4pIHtcbiAgICBzdG9yZS5kaXNwYXRjaChhY3Rpb25zLnBsYXlDYXJkKHN0b3JlLmdldFN0YXRlKCkuY291bnRlci5jYXJkVG9QbGF5KSk7XG4gICAgbmV4dFR1cm4oKTtcbiAgfVxufSk7XG5cbiQoJyNndWFyZEd1ZXNzQnV0dG9uNCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICBzdG9yZS5kaXNwYXRjaCh7dHlwZTogJ0dVQVJEX0dVRVNTJywgZ3VhcmRHdWVzczogNH0pO1xuICBpZiAoc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLnJlYWR5Rm9yTmV4dFR1cm4pIHtcbiAgICBzdG9yZS5kaXNwYXRjaChhY3Rpb25zLnBsYXlDYXJkKHN0b3JlLmdldFN0YXRlKCkuY291bnRlci5jYXJkVG9QbGF5KSk7XG4gICAgbmV4dFR1cm4oKTtcbiAgfVxufSk7XG5cbiQoJyNndWFyZEd1ZXNzQnV0dG9uNScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICBzdG9yZS5kaXNwYXRjaCh7dHlwZTogJ0dVQVJEX0dVRVNTJywgZ3VhcmRHdWVzczogNX0pO1xuICBpZiAoc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLnJlYWR5Rm9yTmV4dFR1cm4pIHtcbiAgICBzdG9yZS5kaXNwYXRjaChhY3Rpb25zLnBsYXlDYXJkKHN0b3JlLmdldFN0YXRlKCkuY291bnRlci5jYXJkVG9QbGF5KSk7XG4gICAgbmV4dFR1cm4oKTtcbiAgfVxufSk7XG5cbiQoJyNndWFyZEd1ZXNzQnV0dG9uNicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICBzdG9yZS5kaXNwYXRjaCh7dHlwZTogJ0dVQVJEX0dVRVNTJywgZ3VhcmRHdWVzczogNn0pO1xuICBpZiAoc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLnJlYWR5Rm9yTmV4dFR1cm4pIHtcbiAgICBzdG9yZS5kaXNwYXRjaChhY3Rpb25zLnBsYXlDYXJkKHN0b3JlLmdldFN0YXRlKCkuY291bnRlci5jYXJkVG9QbGF5KSk7XG4gICAgbmV4dFR1cm4oKTtcbiAgfVxufSk7XG5cbiQoJyNndWFyZEd1ZXNzQnV0dG9uNycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICBzdG9yZS5kaXNwYXRjaCh7dHlwZTogJ0dVQVJEX0dVRVNTJywgZ3VhcmRHdWVzczogN30pO1xuICBpZiAoc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLnJlYWR5Rm9yTmV4dFR1cm4pIHtcbiAgICBzdG9yZS5kaXNwYXRjaChhY3Rpb25zLnBsYXlDYXJkKHN0b3JlLmdldFN0YXRlKCkuY291bnRlci5jYXJkVG9QbGF5KSk7XG4gICAgbmV4dFR1cm4oKTtcbiAgfVxufSk7XG5cbiQoJyNndWFyZEd1ZXNzQnV0dG9uOCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICBzdG9yZS5kaXNwYXRjaCh7dHlwZTogJ0dVQVJEX0dVRVNTJywgZ3VhcmRHdWVzczogOH0pO1xuICBpZiAoc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLnJlYWR5Rm9yTmV4dFR1cm4pIHtcbiAgICBzdG9yZS5kaXNwYXRjaChhY3Rpb25zLnBsYXlDYXJkKHN0b3JlLmdldFN0YXRlKCkuY291bnRlci5jYXJkVG9QbGF5KSk7XG4gICAgbmV4dFR1cm4oKTtcbiAgfVxufSk7XG5cbmZ1bmN0aW9uIG5leHRUdXJuKCkge1xuICBpZiAoc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLmdhbWVFbmRzLndpbm5lciAhPT0gbnVsbCkge1xuICAgIC8vIEdhbWUgZW5kXG4gICAgcmV0dXJuO1xuICB9IGVsc2UgaWYgKHN0b3JlLmdldFN0YXRlKCkuY291bnRlci5jdXJyZW50UGxheWVySWQgPT09IDIgJiYgc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLnBsYXllcnNbMV0uZGVhZCA9PT0gZmFsc2UpIHtcbiAgICAvLyBSTCBBSSBtb3ZlXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIC8vIFVwZGF0ZSBWYWx1ZSBUYWJsZSwgaWYgbm90IHRoZSBmaXJzdCB0aW1lXG4gICAgICBzdG9yZS5kaXNwYXRjaCh7IHR5cGU6ICdEUkFXX0NBUkQnLCBwbGF5ZXI6IHN0b3JlLmdldFN0YXRlKCkuY291bnRlci5jdXJyZW50UGxheWVySWR9KTtcbiAgICAgIHJlaW5mb3JjZW1lbnRBSS5sZWFybihzdG9yZS5nZXRTdGF0ZSgpLmNvdW50ZXIpO1xuICAgICAgbGV0IHJlaW5mb3JjZW1lbnRBSUNhcmQgPSByZWluZm9yY2VtZW50QUkuZ2V0QmVzdEFjdGlvbihzdG9yZS5nZXRTdGF0ZSgpLmNvdW50ZXIpO1xuICAgICAgc3RvcmUuZGlzcGF0Y2goYWN0aW9ucy5wbGF5Q2FyZChyZWluZm9yY2VtZW50QUlDYXJkKSk7XG4gICAgICBuZXh0VHVybigpO1xuICAgIH0sIDEwMDApO1xuICB9IGVsc2UgaWYgKHN0b3JlLmdldFN0YXRlKCkuY291bnRlci5jdXJyZW50UGxheWVySWQgIT09IDEgfHwgc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLnBsYXllcnNbMF0uZGVhZCkge1xuICAgIC8vIFJhbmRvbSBBSSBtb3ZlXG4gICAgLy8gRGlzYWJsZSBidXR0b25zXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIHN0b3JlLmRpc3BhdGNoKHsgdHlwZTogJ0RSQVdfQ0FSRCcsIHBsYXllcjogc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLmN1cnJlbnRQbGF5ZXJJZH0pO1xuICAgICAgbGV0IHJhbmRvbUFJQ2FyZCA9IHJhbmRvbUFJKHN0b3JlLmdldFN0YXRlKCkuY291bnRlci5wbGF5ZXJzLCBzdG9yZS5nZXRTdGF0ZSgpLmNvdW50ZXIuY3VycmVudFBsYXllcklkKTtcbiAgICAgIHN0b3JlLmRpc3BhdGNoKGFjdGlvbnMucGxheUNhcmQocmFuZG9tQUlDYXJkKSk7XG4gICAgICBuZXh0VHVybigpO1xuICAgIH0sIDEwMDApO1xuICB9IGVsc2Uge1xuICAgIHN0b3JlLmRpc3BhdGNoKHsgdHlwZTogJ0RSQVdfQ0FSRCcsIHBsYXllcjogc3RvcmUuZ2V0U3RhdGUoKS5jb3VudGVyLmN1cnJlbnRQbGF5ZXJJZH0pO1xuICAgIC8vIFdhaXQgZm9yIGh1bWFuIGlucHV0XG4gIH1cbn1cblxuLypcbmVudi5nZXROdW1TdGF0ZXMoKSByZXR1cm5zIGFuIGludGVnZXIgb2YgdG90YWwgbnVtYmVyIG9mIHN0YXRlc1xuZW52LmdldE1heE51bUFjdGlvbnMoKSByZXR1cm5zIGFuIGludGVnZXIgd2l0aCBtYXggbnVtYmVyIG9mIGFjdGlvbnMgaW4gYW55IHN0YXRlXG5lbnYuYWxsb3dlZEFjdGlvbnMocykgdGFrZXMgYW4gaW50ZWdlciBzIGFuZCByZXR1cm5zIGEgbGlzdCBvZiBhdmFpbGFibGUgYWN0aW9ucywgd2hpY2ggc2hvdWxkIGJlIGludGVnZXJzIGZyb20gemVybyB0byBtYXhOdW1BY3Rpb25zXG4qL1xubGV0IHJlaW5mb3JjZW1lbnRBSSA9IG5ldyBSZWluZm9yY2VtZW50QUkoWzIsIDksIDgsIDhdLCBbNywgNCwgOF0pO1xuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gIC8vIHN0b3JlLmRpc3BhdGNoKHt0eXBlOiAnUE9QVUxBVEVfVEFCTEUnfSk7XG4gIHJlaW5mb3JjZW1lbnRBSS5pbml0aWFsaXplKCk7XG4gIG5leHRUdXJuKCk7XG59KVxuXG4kKCcjcmVzdGFydCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICBjb25zb2xlLmxvZygnUmVzdGFydCcpO1xuICBzdG9yZS5kaXNwYXRjaCh7IHR5cGU6ICdSRVNUQVJUJ30pO1xuICBuZXh0VHVybigpO1xufSk7XG4iLCJpbXBvcnQgeyBnZXRSYW5kb21DYXJkLCBjb21wYXJlQ2FyZHMsIGdldEhpZ2hlc3ROb3RZZXRBcHBlYXJlZENhcmQsIGdldE5vbkRlYWROb25Qcm90ZWN0ZWRQbGF5ZXJzIH0gZnJvbSAnLi91dGlsJztcblxuLy8gUGxheWVyIGRlZmluaXRpb25cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllciB7XG4gIGNvbnN0cnVjdG9yKG51bWJlcikge1xuICAgIHRoaXMubnVtYmVyID0gbnVtYmVyO1xuICAgIHRoaXMuZGVhZCA9IGZhbHNlO1xuICAgIHRoaXMucHJvdGVjdGVkID0gZmFsc2U7XG4gICAgdGhpcy5jYXJkcyA9IFtdO1xuICB9XG5cbiAgZHJhdyhhdmFpbGFibGVDYXJkcykge1xuICAgIGNvbnNvbGUubG9nKGBEcmF3IGEgY2FyZCBmb3IgcGxheWVyICR7dGhpcy5udW1iZXJ9YCk7XG4gICAgdGhpcy5jYXJkcy5wdXNoKGdldFJhbmRvbUNhcmQoYXZhaWxhYmxlQ2FyZHMpKTtcbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuZGVhZCA9IGZhbHNlO1xuICAgIHRoaXMucHJvdGVjdGVkID0gZmFsc2U7XG4gICAgdGhpcy5jYXJkcyA9IFtdO1xuICB9XG5cbiAgc2hvd0hhbmQoKSB7XG4gICAgJChgI3BsYXllclRpdGxlJHt0aGlzLm51bWJlcn1gKS5hcHBlbmQoYCAtICR7dGhpcy5jYXJkc1swXX1gKTtcbiAgfVxuXG4gIHNldFBsYXllckRlYWQoY2FyZHNOb3RQbGF5ZWRZZXQpIHtcbiAgICB0aGlzLmRlYWQgPSB0cnVlO1xuICAgICQoYCNwbGF5ZXJUaXRsZSR7dGhpcy5udW1iZXJ9YCkuYXR0cihcImNsYXNzXCIsXCJwbGF5ZXJEZWFkXCIpO1xuICAgICQoYCNwbGF5ZXJUaXRsZSR7dGhpcy5udW1iZXJ9YCkuYXBwZW5kKGAgLSAke3RoaXMuY2FyZHNbMF19YCk7XG4gICAgY2FyZHNOb3RQbGF5ZWRZZXRbdGhpcy5jYXJkc1swXV0tLTtcbiAgfVxuXG4gIHJhbmRvbUFJKHBsYXllcnMsIGNhcmRzTm90UGxheWVkWWV0KSB7XG4gICAgbGV0IGNhcmRJbmRleDtcbiAgICBpZiAodGhpcy5jYXJkcy5pbmRleE9mKCdIYW5kbWFpZCcpICE9PSAtMSkge1xuICAgICAgLy8gUHJpb3JpdGl6ZSBvbiBwbGF5aW5nIGhhbmRtYWlkLlxuICAgICAgY2FyZEluZGV4ID0gdGhpcy5jYXJkcy5pbmRleE9mKCdIYW5kbWFpZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoY29tcGFyZUNhcmRzKHRoaXMuY2FyZHNbMF0sIHRoaXMuY2FyZHNbMV0pID4gMCkge1xuICAgICAgICBjYXJkSW5kZXggPSAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FyZEluZGV4ID0gMTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBsZXQgY2FyZEluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMik7XG4gICAgbGV0IGNhcmQgPSB0aGlzLmNhcmRzW2NhcmRJbmRleF07XG4gICAgY29uc29sZS5sb2coY2FyZCk7XG4gICAgbGV0IGNhcmRUb0d1ZXNzO1xuICAgIGlmIChjYXJkID09PSAnR3VhcmQnKSB7XG4gICAgICAvLyBSYW5kb21seSBjaG9vc2UgZnJvbSB0aGUgaGlnaGVzdCBub3QgeWV0IGFwcGVhcmVkIGNhcmQuXG4gICAgICBjYXJkVG9HdWVzcyA9IGdldEhpZ2hlc3ROb3RZZXRBcHBlYXJlZENhcmQodGhpcy5jYXJkcywgY2FyZHNOb3RQbGF5ZWRZZXQpO1xuICAgIH1cbiAgICAvLyBUT0RPOiBQbGF5IGFnYWluc3QgcmFuZG9tIG5vbiBkZWFkL25vbiBwcm90ZWN0ZWQgcGVyc29uLlxuICAgIGxldCBhZ2FpbnN0ID0gdGhpcy5udW1iZXIgJSA0ICsgMTtcbiAgICBsZXQgZ2V0Tm9uRGVhZE5vblByb3RlY3RlZFBsYXllckxpc3QgPSBnZXROb25EZWFkTm9uUHJvdGVjdGVkUGxheWVycyh0aGlzLCBwbGF5ZXJzKTtcbiAgICBpZiAoZ2V0Tm9uRGVhZE5vblByb3RlY3RlZFBsYXllckxpc3QubGVuZ3RoID09IDApIHtcbiAgICAgIC8vIFRoZSBwbGF5ZXIgaXMgdGhlIHdpbm5lci5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUmFuZG9tbHkgc2VsZWN0IG9uZSBwbGF5ZXIgdG8gcGxheSB0aGUgY2FyZCBhZ2FpbnN0LlxuICAgICAgbGV0IHJhbmRvbVBsYXllckluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZ2V0Tm9uRGVhZE5vblByb3RlY3RlZFBsYXllckxpc3QubGVuZ3RoKTtcbiAgICAgIGFnYWluc3QgPSBnZXROb25EZWFkTm9uUHJvdGVjdGVkUGxheWVyTGlzdFtyYW5kb21QbGF5ZXJJbmRleF07XG4gICAgfVxuICAgIGxldCBwbGF5ZWRDYXJkID0gdGhpcy5wbGF5KGNhcmRJbmRleCwgYWdhaW5zdCwgY2FyZFRvR3Vlc3MpO1xuICAgIHJldHVybiBwbGF5ZWRDYXJkO1xuICB9XG5cbiAgcGxheShjYXJkSW5kZXgsIGFnYWluc3QsIGNhcmRUb0d1ZXNzKSB7XG4gICAgbGV0IGNhcmQgPSB0aGlzLmNhcmRzW2NhcmRJbmRleF07XG4gICAgdGhpcy5jYXJkcy5zcGxpY2UoY2FyZEluZGV4LCAxKTtcbiAgICByZXR1cm4geydjYXJkJzogY2FyZCwgJ2FnYWluc3QnOiBhZ2FpbnN0LCAnZ3Vlc3MnOiBjYXJkVG9HdWVzc307XG4gIH1cblxuICBkaXNjYXJkKCkge1xuICAgIGNvbnNvbGUubG9nKGBQbGF5ZXIgJHt0aGlzLm51bWJlcn0gZGlzY2FyZGVkIGEgY2FyZC5gKTtcbiAgICBsZXQgZGlzY2FyZGVkQ2FyZCA9IHRoaXMuY2FyZHNbMF07XG4gICAgLy8gVE9ETzogaWYgcGxheWVkIGFnYWluc3QgaXRzZWxmLCBuZWVkIHRvIGRpc2NhcmQgdGhlIHJpZ2h0IG9uZS5cbiAgICAkKGAjcGxheWVyUGxheWVkTGlzdCR7dGhpcy5udW1iZXJ9YCkuYXBwZW5kKGA8bGkgY2xhc3M9XCJkaXNjYXJkIGl0ZW1cIj4ke2Rpc2NhcmRlZENhcmR9PC9saT5gKTtcbiAgICB0aGlzLmNhcmRzID0gW107XG4gICAgcmV0dXJuIGRpc2NhcmRlZENhcmQ7XG4gIH1cbn0iLCJpbXBvcnQgeyBnZXROb25EZWFkTm9uUHJvdGVjdGVkUGxheWVycyB9IGZyb20gJy4vdXRpbCc7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByYW5kb21BSShwbGF5ZXJzLCBwbGF5ZXJJZCkge1xuICBsZXQgY2FyZElkO1xuICBpZiAocGxheWVyc1twbGF5ZXJJZCAtIDFdLmhvbGRpbmdDYXJkcy5pbmRleE9mKDQpICE9PSAtMSkge1xuICAgIC8vIFByaW9yaXRpemUgb24gcGxheWluZyBoYW5kbWFpZC5cbiAgICBjYXJkSWQgPSA0O1xuICB9IGVsc2Uge1xuICAgIGlmIChwbGF5ZXJzW3BsYXllcklkIC0gMV0uaG9sZGluZ0NhcmRzWzBdIDwgcGxheWVyc1twbGF5ZXJJZCAtIDFdLmhvbGRpbmdDYXJkc1sxXSkge1xuICAgICAgY2FyZElkID0gcGxheWVyc1twbGF5ZXJJZCAtIDFdLmhvbGRpbmdDYXJkc1swXTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FyZElkID0gcGxheWVyc1twbGF5ZXJJZCAtIDFdLmhvbGRpbmdDYXJkc1sxXTtcbiAgICB9XG4gIH1cblxuICBsZXQgZ3VhcmRHdWVzcztcbiAgaWYgKGNhcmRJZCA9PT0gMSkge1xuICAgIC8vIFJhbmRvbWx5IGNob29zZSBmcm9tIHRoZSBoaWdoZXN0IG5vdCB5ZXQgYXBwZWFyZWQgY2FyZC5cbiAgICAvLyBjYXJkVG9HdWVzcyA9IGdldEhpZ2hlc3ROb3RZZXRBcHBlYXJlZENhcmQodGhpcy5jYXJkcywgY2FyZHNOb3RQbGF5ZWRZZXQpO1xuICAgIGd1YXJkR3Vlc3MgPSA4OyAvLyBNYWtlIHRoaXMgc21hcnRlci5cbiAgfVxuXG4gIGxldCBwbGF5QWdhaW5zdCA9IHBsYXllcklkICUgNCArIDE7XG4gIGxldCBnZXROb25EZWFkTm9uUHJvdGVjdGVkUGxheWVyTGlzdCA9IGdldE5vbkRlYWROb25Qcm90ZWN0ZWRQbGF5ZXJzKHBsYXllcklkLCBwbGF5ZXJzKTtcbiAgaWYgKGdldE5vbkRlYWROb25Qcm90ZWN0ZWRQbGF5ZXJMaXN0Lmxlbmd0aCA9PSAwKSB7XG4gICAgLy8gVGhlIHBsYXllciBpcyB0aGUgd2lubmVyLlxuICB9IGVsc2Uge1xuICAgIC8vIFJhbmRvbWx5IHNlbGVjdCBvbmUgcGxheWVyIHRvIHBsYXkgdGhlIGNhcmQgYWdhaW5zdC5cbiAgICBsZXQgcmFuZG9tUGxheWVySW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBnZXROb25EZWFkTm9uUHJvdGVjdGVkUGxheWVyTGlzdC5sZW5ndGgpO1xuICAgIHBsYXlBZ2FpbnN0ID0gZ2V0Tm9uRGVhZE5vblByb3RlY3RlZFBsYXllckxpc3RbcmFuZG9tUGxheWVySW5kZXhdO1xuICB9XG4gIHJldHVybiB7Y2FyZElkLCBwbGF5QWdhaW5zdCwgZ3VhcmRHdWVzc307XG59IiwiLy8gdmFyIGF2YWlsYWJsZUNhcmRzLCBjdXJyZW50UGxheWVyLCBnYW1lRW5kO1xuLy8gdmFyIHBsYXlBZ2FpbnN0LCBjYXJkc05vdFBsYXllZFlldDtcbmltcG9ydCB7IGluaXRpYWxTdGF0ZSwgY2FyZFJhbmssIGNhcmROYW1lcyB9IGZyb20gJy4vY29uc3QnO1xuaW1wb3J0IHtcbiAgZ2V0UmFuZG9tQ2FyZCxcbiAgZ2V0TGl2aW5nUGxheWVyU2l6ZSxcbiAgY2FsY3VsYXRlV2lubmVyLFxuICBuZXh0UGxheWVyLFxuICBkcmF3Q2FyZCxcbiAgcmVzZXRQcm90ZWN0aW9uLFxuICBkaXNjYXJkQ2FyZCxcbiAgZHJhd0NhcmRGb3JQbGF5ZXIsXG4gIGFkZFBsYXllZENhcmQsXG4gIGFkZFNlZW5DYXJkcyxcbiAgZ2V0QXZhaWxhYmxlQ2FyZFNpemUsXG4gIHNldFBsYXllckRlYWQsXG4gIGNoZWNrTm90RGVhZEFuZE5vdFByb3RlY3RlZCxcbiAgcG9wdWxhdGVWYWx1ZVRhYmxlLCB9IGZyb20gJy4vdXRpbCc7XG5cbmZ1bmN0aW9uIHJlc29sdmUoc3RhdGUsIGNhcmRUb1BsYXkpIHtcbiAgaWYgKGNhcmRUb1BsYXkuY2FyZElkID09PSAxICYmIGNoZWNrTm90RGVhZEFuZE5vdFByb3RlY3RlZChzdGF0ZSwgY2FyZFRvUGxheS5wbGF5QWdhaW5zdCkpIHtcbiAgICBpZiAoY2FyZFRvUGxheS5ndWFyZEd1ZXNzID09PSBzdGF0ZS5wbGF5ZXJzW2NhcmRUb1BsYXkucGxheUFnYWluc3QgLSAxXS5ob2xkaW5nQ2FyZHNbMF0pIHtcbiAgICAgIHJldHVybiBzZXRQbGF5ZXJEZWFkKHN0YXRlLCBjYXJkVG9QbGF5LnBsYXlBZ2FpbnN0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbiAgfSBlbHNlIGlmIChjYXJkVG9QbGF5LmNhcmRJZCA9PT0gMiAmJiBjaGVja05vdERlYWRBbmROb3RQcm90ZWN0ZWQoc3RhdGUsIGNhcmRUb1BsYXkucGxheUFnYWluc3QpKSB7XG4gICAgbGV0IG5leHRTdGF0ZSA9IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlKTtcbiAgICBuZXh0U3RhdGUucGxheWVycyA9IGFkZFNlZW5DYXJkcyhuZXh0U3RhdGUucGxheWVycywgbmV4dFN0YXRlLmN1cnJlbnRQbGF5ZXJJZCwge1xuICAgICAgY2FyZElkOiBuZXh0U3RhdGUucGxheWVyc1tjYXJkVG9QbGF5LnBsYXlBZ2FpbnN0IC0gMV0uaG9sZGluZ0NhcmRzWzBdLFxuICAgICAgcGxheWVySWQ6IGNhcmRUb1BsYXkucGxheUFnYWluc3RcbiAgICB9KTtcbiAgICByZXR1cm4gbmV4dFN0YXRlO1xuICB9IGVsc2UgaWYgKGNhcmRUb1BsYXkuY2FyZElkID09PSAzICYmIGNoZWNrTm90RGVhZEFuZE5vdFByb3RlY3RlZChzdGF0ZSwgY2FyZFRvUGxheS5wbGF5QWdhaW5zdCkpIHtcbiAgICBsZXQgY2FyZFZhbHVlMSA9IHN0YXRlLnBsYXllcnNbc3RhdGUuY3VycmVudFBsYXllcklkIC0gMV0uaG9sZGluZ0NhcmRzWzBdO1xuICAgIGxldCBjYXJkVmFsdWUyID0gc3RhdGUucGxheWVyc1tjYXJkVG9QbGF5LnBsYXlBZ2FpbnN0IC0gMV0uaG9sZGluZ0NhcmRzWzBdO1xuICAgIGlmIChjYXJkVmFsdWUxID4gY2FyZFZhbHVlMikge1xuICAgICAgcmV0dXJuIHNldFBsYXllckRlYWQoc3RhdGUsIGNhcmRUb1BsYXkucGxheUFnYWluc3QpO1xuICAgIH0gZWxzZSBpZiAoY2FyZFZhbHVlMSA8IGNhcmRWYWx1ZTIpIHtcbiAgICAgIHJldHVybiBzZXRQbGF5ZXJEZWFkKHN0YXRlLCBzdGF0ZS5jdXJyZW50UGxheWVySWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuICB9IGVsc2UgaWYgKGNhcmRUb1BsYXkuY2FyZElkID09PSA0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICBwbGF5ZXJzOiBPYmplY3QuYXNzaWduKFtdLCBzdGF0ZS5wbGF5ZXJzLCB7IFtzdGF0ZS5jdXJyZW50UGxheWVySWQgLSAxXTogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUucGxheWVyc1tzdGF0ZS5jdXJyZW50UGxheWVySWQgLSAxXSwge1xuICAgICAgICBwcm90ZWN0ZWQ6IHRydWVcbiAgICAgIH0pfSlcbiAgICB9KTtcbiAgfSBlbHNlIGlmIChjYXJkVG9QbGF5LmNhcmRJZCA9PT0gNSAmJiBjaGVja05vdERlYWRBbmROb3RQcm90ZWN0ZWQoc3RhdGUsIGNhcmRUb1BsYXkucGxheUFnYWluc3QpKSB7XG4gICAgLy8gUHJpbmNlLCBEaXNjYXJkIGFuZCBkcmF3XG4gICAgbGV0IG5leHRTdGF0ZSA9IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlKTtcbiAgICBsZXQgY2FyZFRvRGlzY2FyZCA9IHN0YXRlLnBsYXllcnNbY2FyZFRvUGxheS5wbGF5QWdhaW5zdCAtIDFdLmhvbGRpbmdDYXJkc1swXTtcbiAgICBuZXh0U3RhdGUucGxheWVycyA9IGRpc2NhcmRDYXJkKHN0YXRlLnBsYXllcnMsIGNhcmRUb1BsYXkucGxheUFnYWluc3QsIGNhcmRUb0Rpc2NhcmQpO1xuICAgIG5leHRTdGF0ZS5wbGF5ZXJzID0gYWRkUGxheWVkQ2FyZChuZXh0U3RhdGUucGxheWVycywgY2FyZFRvUGxheS5wbGF5QWdhaW5zdCwge1xuICAgICAgY2FyZElkOiBjYXJkVG9EaXNjYXJkLFxuICAgICAgcGxheUFnYWluc3Q6IC0xLFxuICAgICAgZGlzY2FyZGVkOiB0cnVlXG4gICAgfSk7XG5cbiAgICBpZiAoZ2V0QXZhaWxhYmxlQ2FyZFNpemUoc3RhdGUuYXZhaWxhYmxlQ2FyZHMpID09PSAwKSB7XG4gICAgICAvLyBHaXZlIHRoZSBoaWRkZW4gY2FyZCB0byBwbGF5ZXJcbiAgICB9IGVsc2Uge1xuICAgICAgbmV4dFN0YXRlID0gZHJhd0NhcmRGb3JQbGF5ZXIobmV4dFN0YXRlLCBjYXJkVG9QbGF5LnBsYXlBZ2FpbnN0KTtcbiAgICB9XG5cbiAgICBpZiAoY2FyZFRvRGlzY2FyZCA9PT0gOCkge1xuICAgICAgbmV4dFN0YXRlLnBsYXllcnMgPSBPYmplY3QuYXNzaWduKG5leHRTdGF0ZS5wbGF5ZXJzLCB7W2NhcmRUb1BsYXkucGxheUFnYWluc3QgLSAxXTogT2JqZWN0LmFzc2lnbih7fSwgbmV4dFN0YXRlLnBsYXllcnNbY2FyZFRvUGxheS5wbGF5QWdhaW5zdCAtIDFdLCB7XG4gICAgICAgIGRlYWQ6IHRydWVcbiAgICAgIH0pfSk7XG4gICAgfVxuICAgIHJldHVybiBuZXh0U3RhdGU7XG4gIH0gZWxzZSBpZiAoY2FyZFRvUGxheS5jYXJkSWQgPT09IDYgJiYgY2hlY2tOb3REZWFkQW5kTm90UHJvdGVjdGVkKHN0YXRlLCBjYXJkVG9QbGF5LnBsYXlBZ2FpbnN0KSkge1xuICAgIGxldCBuZXh0U3RhdGUgPSBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSk7XG4gICAgbGV0IGNhcmRUb1N3YXAgPSBuZXh0U3RhdGUucGxheWVyc1tzdGF0ZS5jdXJyZW50UGxheWVySWQgLSAxXS5ob2xkaW5nQ2FyZHNbMF07XG4gICAgbmV4dFN0YXRlLnBsYXllcnMgPSBPYmplY3QuYXNzaWduKFtdLCBuZXh0U3RhdGUucGxheWVycywge1tzdGF0ZS5jdXJyZW50UGxheWVySWQgLSAxXTogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUucGxheWVyc1tzdGF0ZS5jdXJyZW50UGxheWVySWQgLSAxXSwge1xuICAgICAgaG9sZGluZ0NhcmRzOiBbbmV4dFN0YXRlLnBsYXllcnNbY2FyZFRvUGxheS5wbGF5QWdhaW5zdCAtIDFdLmhvbGRpbmdDYXJkc1swXV1cbiAgICB9KX0pXG4gICAgbmV4dFN0YXRlLnBsYXllcnMgPSBPYmplY3QuYXNzaWduKFtdLCBuZXh0U3RhdGUucGxheWVycywge1tjYXJkVG9QbGF5LnBsYXlBZ2FpbnN0IC0gMV06IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLnBsYXllcnNbY2FyZFRvUGxheS5wbGF5QWdhaW5zdCAtIDFdLCB7XG4gICAgICBob2xkaW5nQ2FyZHM6IFtjYXJkVG9Td2FwXVxuICAgIH0pfSlcbiAgICByZXR1cm4gbmV4dFN0YXRlO1xuICB9IGVsc2UgaWYgKGNhcmRUb1BsYXkuY2FyZElkID09PSA4KSB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICBwbGF5ZXJzOiBPYmplY3QuYXNzaWduKFtdLCBzdGF0ZS5wbGF5ZXJzLCB7IFtzdGF0ZS5jdXJyZW50UGxheWVySWQgLSAxXTogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUucGxheWVyc1tzdGF0ZS5jdXJyZW50UGxheWVySWQgLSAxXSwge1xuICAgICAgICBkZWFkOiB0cnVlXG4gICAgICB9KX0pXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNvdW50ZXIoc3RhdGUsIGFjdGlvbikge1xuICBpZiAodHlwZW9mIHN0YXRlID09PSAndW5kZWZpbmVkJykge1xuICAgIC8vIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGluaXRpYWxTdGF0ZSkpO1xuICAgIC8vIENsZWFuIHVwIHN0b3JlIHN0YXRlLlxuICAgIGxldCBuZXdTdGF0ZSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoaW5pdGlhbFN0YXRlKSk7XG4gICAgLy8gU2V0dXAgYW5kIGRyYXcgY2FyZHMuXG4gICAgLy8gRGlzY2FyZCBhIGNhcmQgYXQgdGhlIHN0YXJ0IG9mIHRoZSBnYW1lLlxuICAgIGxldCByYW5kb21DYXJkSWQgPSBnZXRSYW5kb21DYXJkKG5ld1N0YXRlLmF2YWlsYWJsZUNhcmRzKTtcbiAgICBuZXdTdGF0ZS5hdmFpbGFibGVDYXJkc1tjYXJkTmFtZXNbcmFuZG9tQ2FyZElkIC0gMV1dLS07XG5cbiAgICBuZXdTdGF0ZSA9IGRyYXdDYXJkRm9yUGxheWVyKG5ld1N0YXRlLCAxKTtcbiAgICBuZXdTdGF0ZSA9IGRyYXdDYXJkRm9yUGxheWVyKG5ld1N0YXRlLCAyKTtcbiAgICBuZXdTdGF0ZSA9IGRyYXdDYXJkRm9yUGxheWVyKG5ld1N0YXRlLCAzKTtcbiAgICBuZXdTdGF0ZSA9IGRyYXdDYXJkRm9yUGxheWVyKG5ld1N0YXRlLCA0KTtcblxuICAgIHJldHVybiBuZXdTdGF0ZTtcbiAgfVxuXG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlICdDSE9PU0VfQ0FSRCc6IHtcbiAgICAgIC8vIFRPRE86IGJhc2VkIG9uIHNlbGVjdGVkIGNhcmQsIGRlY2lkZSBpZiBwbGF5IGFnYWluc3QgYWN0aW9uIGlzIG5lZWRlZFxuICAgICAgLy8gSWYgbm90IHRoZW4gc2V0IHJlYWR5Rm9yTmV4dFR1cm4gdG8gdHJ1ZVxuICAgICAgbGV0IHJlYWR5Rm9yTmV4dFR1cm4gPSBmYWxzZTtcbiAgICAgIGxldCBjaG9vc2VDYXJkID0gZmFsc2U7XG4gICAgICBsZXQgZ3VhcmRHdWVzcyA9IHRydWU7XG4gICAgICBpZiAoYWN0aW9uLmNhcmRJZCA9PT0gNCB8fCBhY3Rpb24uY2FyZElkID09PSA3IHx8IGFjdGlvbi5jYXJkSWQgPT09IDgpIHtcbiAgICAgICAgcmVhZHlGb3JOZXh0VHVybiA9IHRydWU7XG4gICAgICAgIGNob29zZUNhcmQgPSB0cnVlO1xuICAgICAgICBndWFyZEd1ZXNzID0gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgYnV0dG9uU3RhdGVzOiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5idXR0b25TdGF0ZXMsIHtcbiAgICAgICAgICBjaG9vc2VDYXJkOiBjaG9vc2VDYXJkLFxuICAgICAgICAgIHBsYXlBZ2FpbnN0OiBndWFyZEd1ZXNzLFxuICAgICAgICB9KSxcbiAgICAgICAgcmVhZHlGb3JOZXh0VHVybjogcmVhZHlGb3JOZXh0VHVybixcbiAgICAgICAgY2FyZFRvUGxheTogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuY2FyZFRvUGxheSwge1xuICAgICAgICAgIGNhcmRJZDogYWN0aW9uLmNhcmRJZCxcbiAgICAgICAgfSlcbiAgICAgIH0pO1xuICAgIH1cbiAgICBjYXNlICdQTEFZX0FHQUlOU1QnOiB7XG4gICAgICBsZXQgcmVhZHlGb3JOZXh0VHVybiA9IGZhbHNlO1xuICAgICAgbGV0IGNob29zZUNhcmQgPSBmYWxzZTtcbiAgICAgIGxldCBndWFyZEd1ZXNzID0gdHJ1ZTtcbiAgICAgIGlmIChzdGF0ZS5jYXJkVG9QbGF5LmNhcmRJZCAhPT0gMSkge1xuICAgICAgICByZWFkeUZvck5leHRUdXJuID0gdHJ1ZTtcbiAgICAgICAgY2hvb3NlQ2FyZCA9IHRydWU7XG4gICAgICAgIGd1YXJkR3Vlc3MgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBidXR0b25TdGF0ZXM6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmJ1dHRvblN0YXRlcywge1xuICAgICAgICAgIGNob29zZUNhcmQ6IGNob29zZUNhcmQsXG4gICAgICAgICAgcGxheUFnYWluc3Q6IGZhbHNlLFxuICAgICAgICAgIGd1YXJkR3Vlc3M6IGd1YXJkR3Vlc3MsXG4gICAgICAgIH0pLFxuICAgICAgICByZWFkeUZvck5leHRUdXJuOiByZWFkeUZvck5leHRUdXJuLFxuICAgICAgICBjYXJkVG9QbGF5OiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5jYXJkVG9QbGF5LCB7XG4gICAgICAgICAgcGxheUFnYWluc3Q6IGFjdGlvbi5wbGF5QWdhaW5zdCxcbiAgICAgICAgfSlcbiAgICAgIH0pO1xuICAgIH1cbiAgICBjYXNlICdHVUFSRF9HVUVTUyc6IHtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBidXR0b25TdGF0ZXM6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmJ1dHRvblN0YXRlcywge1xuICAgICAgICAgIGNob29zZUNhcmQ6IHRydWUsXG4gICAgICAgICAgZ3VhcmRHdWVzczogZmFsc2UsXG4gICAgICAgIH0pLFxuICAgICAgICByZWFkeUZvck5leHRUdXJuOiB0cnVlLFxuICAgICAgICBjYXJkVG9QbGF5OiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5jYXJkVG9QbGF5LCB7XG4gICAgICAgICAgZ3VhcmRHdWVzczogYWN0aW9uLmd1YXJkR3Vlc3MsXG4gICAgICAgIH0pXG4gICAgICB9KTtcbiAgICB9XG4gICAgY2FzZSAnRElTQ0FSRF9DQVJEJzoge1xuICAgICAgbGV0IG5leHRTdGF0ZSA9IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlKTtcbiAgICAgIG5leHRTdGF0ZS5wbGF5ZXJzID0gZGlzY2FyZENhcmQobmV4dFN0YXRlLnBsYXllcnMsIG5leHRTdGF0ZS5jdXJyZW50UGxheWVySWQsIGFjdGlvbi5jYXJkKTtcbiAgICAgIHJldHVybiBuZXh0U3RhdGU7XG4gICAgfVxuICAgIGNhc2UgJ1BMQVlfQ0FSRCc6XG4gICAgICAvLyBNYWtlIGEgZGVlcCBjb3B5IG9mIHRoZSBzdGF0ZSBvYmplY3RcbiAgICAgIC8vIGxldCBuZXh0U3RhdGUgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHN0YXRlKSk7XG4gICAgICBsZXQgbmV4dFN0YXRlID0gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUpO1xuXG4gICAgICAvLyBUT0RPOiBNb3ZlIGFsbCB0aGVzZSBpbnRvIG90aGVyIHJlZHVjZXIgZnVuY3Rpb25zLlxuICAgICAgLy8gUmVtb3ZlIGhvbGRpbmcgY2FyZHNcbiAgICAgIG5leHRTdGF0ZS5wbGF5ZXJzID0gZGlzY2FyZENhcmQobmV4dFN0YXRlLnBsYXllcnMsIG5leHRTdGF0ZS5jdXJyZW50UGxheWVySWQsIGFjdGlvbi5jYXJkVG9QbGF5KTtcbiAgICAgIC8vIEFkZCBwbGF5ZWQgQ2FyZFxuICAgICAgbmV4dFN0YXRlLnBsYXllcnMgPSBhZGRQbGF5ZWRDYXJkKG5leHRTdGF0ZS5wbGF5ZXJzLCBuZXh0U3RhdGUuY3VycmVudFBsYXllcklkLCBhY3Rpb24uY2FyZFRvUGxheSk7XG4gICAgICAvLyBSZXNvbHZlXG4gICAgICBuZXh0U3RhdGUgPSByZXNvbHZlKG5leHRTdGF0ZSwgYWN0aW9uLmNhcmRUb1BsYXkpO1xuICAgICAgLy8gTmV4dCBQbGF5ZXJcbiAgICAgIG5leHRTdGF0ZS5jdXJyZW50UGxheWVySWQgPSBuZXh0UGxheWVyKG5leHRTdGF0ZS5wbGF5ZXJzLCBuZXh0U3RhdGUuY3VycmVudFBsYXllcklkKTtcbiAgICAgIC8vIFJlc2V0IHByb3RlY3RlZFxuICAgICAgbmV4dFN0YXRlLnBsYXllcnMgPSByZXNldFByb3RlY3Rpb24obmV4dFN0YXRlLnBsYXllcnMsIG5leHRTdGF0ZS5jdXJyZW50UGxheWVySWQpO1xuICAgICAgLy8gQ2hlY2sgaWYgZ2FtZSBlbmRzXG4gICAgICBsZXQgZ2FtZUVuZHMgPSBjaGVja0dhbWVFbmQobmV4dFN0YXRlLnBsYXllcnMsIG5leHRTdGF0ZS5hdmFpbGFibGVDYXJkcyk7XG4gICAgICBpZiAoZ2FtZUVuZHMuZ2FtZUVuZCkge1xuICAgICAgICBuZXh0U3RhdGUuZ2FtZUVuZHMud2lubmVyID0gbmV4dFN0YXRlLnBsYXllcnNbZ2FtZUVuZHMud2lubmVySWQgLSAxXTtcbiAgICAgICAgbmV4dFN0YXRlLmJ1dHRvblN0YXRlcy5jaG9vc2VDYXJkID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXh0U3RhdGU7XG4gICAgY2FzZSAnRFJBV19DQVJEJzpcbiAgICAgIHJldHVybiBkcmF3Q2FyZChzdGF0ZSk7XG4gICAgY2FzZSAnUE9QVUxBVEVfVEFCTEUnOlxuICAgICAgcmV0dXJuIHBvcHVsYXRlVmFsdWVUYWJsZShzdGF0ZSk7XG4gICAgY2FzZSAnVVBEQVRFX1RBQkxFJzpcbiAgICAgIHJldHVybiB1cGRhdGVWYWx1ZVRhYmxlKHN0YXRlLCBhY3Rpb24ucHJldmlvdXNTdGF0ZSlcbiAgICBjYXNlICdSRVNUQVJUJzpcbiAgICAgIC8vIENsZWFuIHVwIHN0b3JlIHN0YXRlLlxuICAgICAgbGV0IG5ld1N0YXRlID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShpbml0aWFsU3RhdGUpKTtcbiAgICAgIC8vIFNldHVwIGFuZCBkcmF3IGNhcmRzLlxuICAgICAgLy8gRGlzY2FyZCBhIGNhcmQgYXQgdGhlIHN0YXJ0IG9mIHRoZSBnYW1lLlxuICAgICAgbGV0IHJhbmRvbUNhcmRJZCA9IGdldFJhbmRvbUNhcmQobmV3U3RhdGUuYXZhaWxhYmxlQ2FyZHMpO1xuICAgICAgbmV3U3RhdGUuYXZhaWxhYmxlQ2FyZHNbY2FyZE5hbWVzW3JhbmRvbUNhcmRJZCAtIDFdXS0tO1xuXG4gICAgICBuZXdTdGF0ZSA9IGRyYXdDYXJkRm9yUGxheWVyKG5ld1N0YXRlLCAxKTtcbiAgICAgIG5ld1N0YXRlID0gZHJhd0NhcmRGb3JQbGF5ZXIobmV3U3RhdGUsIDIpO1xuICAgICAgbmV3U3RhdGUgPSBkcmF3Q2FyZEZvclBsYXllcihuZXdTdGF0ZSwgMyk7XG4gICAgICBuZXdTdGF0ZSA9IGRyYXdDYXJkRm9yUGxheWVyKG5ld1N0YXRlLCA0KTtcblxuICAgICAgcmV0dXJuIG5ld1N0YXRlO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGVcbiAgfVxufVxuXG5mdW5jdGlvbiBjaGVja0dhbWVFbmQocGxheWVycywgYXZhaWxhYmxlQ2FyZHMpIHtcbiAgaWYgKGdldEF2YWlsYWJsZUNhcmRTaXplKGF2YWlsYWJsZUNhcmRzKSA8PSAwIHx8IGdldExpdmluZ1BsYXllclNpemUocGxheWVycykgPD0gMSkge1xuICAgIGxldCB3aW5uZXJJZCA9IGNhbGN1bGF0ZVdpbm5lcihwbGF5ZXJzKTtcbiAgICByZXR1cm4geydnYW1lRW5kJzogdHJ1ZSwgJ3dpbm5lcklkJzogd2lubmVySWR9O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB7J2dhbWVFbmQnOiBmYWxzZSwgJ3dpbm5lcklkJzogLTF9O1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIGNvdW50ZXJcbn0iLCIvKlxuU3RlcCAxOiBJbml0aWFsaXplIFEgVmFsdWUgVGFibGVcbiAgaW5kMnN1YihbMiwgOSwgOCwgOCwgOCwgNCwgN10sIChTICsgQSkpID0+IFsxXVs1XVsyXVs0XVszXVsxXVs2XSAoc3RhdGVWZWN0b3IpICsgKGFjdGlvblZlY3RvcilcbiAgZm9yIChpID0gMCB+IHByb2R1Y3QoWzIsIDksIDgsIDgsIDgsIDQsIDddKSkge1xuICAgIFFWYWx1ZVRhYmxlW2ldID0gTWF0aC5yYW5kb20oKTtcbiAgfVxuU3RlcCAyOiBMb29rdXAgUSBWYWx1ZSBUYWJsZSBiYXNlZCBvbiB0aGUgY3VycmVudCBzdGF0ZSwgYW5kIGRlY2lkZWQgd2hhdCBhY3Rpb24gdG8gdGFrZVxuICBzdGF0ZSBkZWZpbml0aW9uOlxuICBzdGF0ZVZlY3RvciA9IFtcbiAgICBwbGF5ZXJbMF0uZGVhZCwgICAgICAgICAgICAgICAgICAgICAgICAgLy8gMlxuICAgIHBsYXllclswXS5wbGF5ZWRDYXJkc1tsYXN0X2lkeF0uY2FyZElkLCAvLyA5XG4gICAgcGxheWVyWzBdLmhvbGRpbmdDYXJkc1swXSwgICAgICAgICAgICAgIC8vIDhcbiAgICBwbGF5ZXJbMF0uaG9sZGluZ0NhcmRzWzFdICAgICAgICAgICAgICAgLy8gOFxuICBdXG4gIGFjdGlvblZlY3RvciA9IFtcbiAgICBjYXJkSWQsICAgICAgIC8vIDhcbiAgICBwbGF5QWdhaW5zdCwgIC8vIDRcbiAgICBndWFyZEd1ZXNzLCAgIC8vIDcgKENhbid0IGd1ZXNzIGd1YXJkKVxuICBdXG4gIGZ1bmN0aW9uIGFsbG93ZWRTQUluZGljaWVzKFMpIHtcbiAgICAvLyBMb2dpYyB0byBmaWd1cmUgb3V0IGNhcmRJZCwgcGxheUFnYWluc3QsIGd1ZXNzXG4gICAgbGV0IGFjdGlvbkFycmF5ID0gW107XG4gICAgbGV0IGFzLmNvbmNhdChzdGF0ZUFjdGlvblZlY3RvclRvSW50ZWdlcihTLCBhY3Rpb25BcnJheSkpO1xuICAgIC8vIFRoaXMgd2lsbCByZXR1cm4gYXJyYXkgb2YgU0EgaW5kaWNpZXNcbiAgICByZXR1cm4gYXM7XG4gIH1cbiAgbGV0IGFsbG93ZWRTQUluZGljaWVzID0gYWxsb3dlZFNBSW5kaWNpZXMoUyk7IC8vIFtdXG4gIG1heFNBSW5kZXggPSBhcmdNYXgoUVZhbHVlVGFibGUoYWxsb3dlZFNBSW5kaWNpZXMpKVxuXG5TdGVwIDM6IEFwcGx5IGFjdGlvbiwgbGV0IHRoZSBnYW1lIGVuZ2luZSBydW4gdW50aWwgeW91ciBuZXh0IHR1cm4uXG4gIGFjdGlvbk9iaiA9IFNBSW5kZXhUb0FjdGlvbk9iamVjdChtYXhTQUluZGV4KVxuICBzdG9yZS5kaXNwYXRjaCh7dHlwZTogJ1BMQVlfQ0FSRCcsIGNhcmRUb1BsYXk6IGFjdGlvbk9ian0pXG5cblN0ZXAgNDogVXBkYXRlIFEgVmFsdWUgVGFibGUgKGFnZW50IGxlYXJuaW5nKVxuICBRKEEsIFMpID0gUShBLCBTKSArIGFscGhhICogW1IoUykgKyBtYXhfQShRKEEsIFMnKSkgLSBRKEEsIFMpXVxuICBsZXQgbWF4X0EgPSAtaW5mO1xuICBsZXQgYWxsb3dlZFNBSW5kaWNpZXMgPSBhbGxvd2VkU0FJbmRpY2llcyhTJyk7IC8vIFtdXG4gIG1heF9BID0gbWF4KFFWYWx1ZVRhYmxlW2FsbG93ZWRTQUluZGljaWVzXSlcbiAgUVZhbHVlVGFibGVbbWF4U0FJbmRleF0gPSBRVmFsdWVUYWJsZVttYXhTQUluZGV4XSArIGFscGhhICogW1IoPT0gLTEwMCB3aGVuIGRlYWQpICsgbWF4X0EgLSBRVmFsdWVUYWJsZVttYXhTQUluZGV4XV1cblxuU3RlcCA1OiBSZXBlYXQgU3RlcCAyIHVudGlsIGdhbWUgZW5kcy90cmFpbmluZyBjb21wbGV0ZVxuKi9cbmltcG9ydCB7IGluZDJzdWIgfSBmcm9tICdpbmQyc3ViJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVpbmZvcmNlbWVudEFJIHtcbiAgY29uc3RydWN0b3Ioc3RhdGVTaXplQXJyLCBhY3Rpb25TaXplQXJyKSB7XG4gICAgdGhpcy5RVmFsdWVUYWJsZSA9IFtdO1xuICAgIHRoaXMuc3RhdGVTaXplQXJyID0gc3RhdGVTaXplQXJyO1xuICAgIHRoaXMuYWN0aW9uU2l6ZUFyciA9IGFjdGlvblNpemVBcnI7XG4gICAgdGhpcy5TQVNpemVBcnIgPSBbXTtcbiAgICB0aGlzLlNBU2l6ZUFyciA9IHRoaXMuU0FTaXplQXJyLmNvbmNhdChzdGF0ZVNpemVBcnIpO1xuICAgIHRoaXMuU0FTaXplQXJyID0gdGhpcy5TQVNpemVBcnIuY29uY2F0KGFjdGlvblNpemVBcnIpO1xuICAgIHRoaXMubGFzdFNBSW5kZXggPSAtMTtcbiAgICB0aGlzLmFscGhhID0gMC41O1xuICB9XG5cbiAgaW5pdGlhbGl6ZSgpIHtcbiAgICBsZXQgdG90YWxTQUxlbmd0aCA9IHRoaXMudG90YWxTQUxlbmd0aCgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG90YWxTQUxlbmd0aDsgKytpKSB7XG4gICAgICB0aGlzLlFWYWx1ZVRhYmxlW2ldID0gTWF0aC5yYW5kb20oKTtcbiAgICB9XG4gIH1cblxuICBnZXRCZXN0QWN0aW9uKHJlZHV4U3RhdGUpIHtcbiAgICBsZXQgU09iamVjdCA9IHRoaXMucmVkdXhTdGF0ZVRvU09iamVjdChyZWR1eFN0YXRlKTtcbiAgICBsZXQgYWxsb3dlZFNBSW5kaWNpZXMgPSB0aGlzLmFsbG93ZWRTQUluZGljaWVzKFNPYmplY3QpO1xuICAgIGxldCBiZXN0U0FJbmRleCA9IHRoaXMuZ2V0TWF4UVZhbHVlU0FJbmRleEdpdmVuU0FJbmRpY2llcyhhbGxvd2VkU0FJbmRpY2llcyk7XG4gICAgdGhpcy5sYXN0U0FJbmRleCA9IGJlc3RTQUluZGV4O1xuICAgIHJldHVybiB0aGlzLlNBSW5kZXhUb0FjdGlvbk9iamVjdChiZXN0U0FJbmRleCk7XG4gIH1cblxuICBsZWFybihuZXh0UmVkdXhTdGF0ZSkge1xuICAgIGxldCBuZXh0U09iamVjdCA9IHRoaXMucmVkdXhTdGF0ZVRvU09iamVjdChuZXh0UmVkdXhTdGF0ZSk7XG4gICAgbGV0IGFsbG93ZWRTQUluZGljaWVzID0gdGhpcy5hbGxvd2VkU0FJbmRpY2llcyhuZXh0U09iamVjdCk7XG4gICAgbGV0IG1heF9BID0gdGhpcy5nZXRNYXhRVmFsdWVHaXZlblNBSW5kaWNpZXMoYWxsb3dlZFNBSW5kaWNpZXMpO1xuICAgIHRoaXMuUVZhbHVlVGFibGVbdGhpcy5sYXN0U0FJbmRleF0gPSB0aGlzLlFWYWx1ZVRhYmxlW3RoaXMubGFzdFNBSW5kZXhdICtcbiAgICAgIHRoaXMuYWxwaGEgKiBbdGhpcy5yZXdhcmQobmV4dFNPYmplY3QpICsgbWF4X0EgLSB0aGlzLlFWYWx1ZVRhYmxlW3RoaXMubGFzdFNBSW5kZXhdXVxuICB9XG5cbiAgLy8gUHJpdmF0ZSBmdW5jdGlvbnNcbiAgLypcbiAge1xuICAgIHBsYXllcjBkZWFkOiByZWR1eFN0YXRlLnBsYXllcnNbMF0uZGVhZCxcbiAgICBwbGF5ZXIwbGFzdENhcmRJZDogcGxheWVyMGxhc3RDYXJkSWQsXG4gICAgcGxheWVyMGhvbGRpbmdDYXJkMDogcmVkdXhTdGF0ZS5wbGF5ZXJzWzBdLmhvbGRpbmdDYXJkc1swXSxcbiAgICBwbGF5ZXIwaG9sZGluZ0NhcmQxOiByZWR1eFN0YXRlLnBsYXllcnNbMF0uaG9sZGluZ0NhcmRzWzFdLFxuICB9XG4gICovXG4gIGFsbG93ZWRTQUluZGljaWVzKFNPYmplY3QpIHtcbiAgICBsZXQgU0luZGV4ID0gdGhpcy5TT2JqZWN0VG9TSW5kZXgoU09iamVjdCk7XG4gICAgbGV0IEFJbmRpY2llcyA9IFtdLCBTQUluZGljaWVzID0gW107XG4gICAgaWYgKFNPYmplY3QucGxheWVyMGRlYWQpIHtcbiAgICAgIHJldHVybiBhcztcbiAgICB9XG4gICAgdmFyIHBsYXlBZ2FpbnN0ID0gW10sIGd1ZXNzID0gW107XG4gICAgLy8gU09iamVjdC5wbGF5ZXIwY2FyZDBcbiAgICBpZiAoU09iamVjdC5wbGF5ZXIwaG9sZGluZ0NhcmQwID09PSAxKSB7XG4gICAgICBwbGF5QWdhaW5zdCA9IFsyLCAzLCA0XTtcbiAgICAgIGd1ZXNzID0gWzIsIDMsIDQsIDUsIDYsIDcsIDhdO1xuICAgIH0gZWxzZSBpZiAoU09iamVjdC5wbGF5ZXIwaG9sZGluZ0NhcmQwID09PSA4IHx8IFNPYmplY3QucGxheWVyMGhvbGRpbmdDYXJkMCA9PT0gNyB8fCBTT2JqZWN0LnBsYXllcjBob2xkaW5nQ2FyZDAgPT09IDQpIHtcbiAgICAgIHBsYXlBZ2FpbnN0ID0gWzFdO1xuICAgICAgZ3Vlc3MgPSBbMiwgMywgNCwgNSwgNiwgNywgOF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHBsYXlBZ2FpbnN0ID0gWzIsIDMsIDRdO1xuICAgICAgZ3Vlc3MgPSBbMiwgMywgNCwgNSwgNiwgNywgOF07XG4gICAgfVxuICAgIEFJbmRpY2llcyA9IEFJbmRpY2llcy5jb25jYXQodGhpcy5nZW5lcmF0ZUFjdGlvbkluZGljaWVzKFNPYmplY3QucGxheWVyMGhvbGRpbmdDYXJkMCwgcGxheUFnYWluc3QsIGd1ZXNzKSk7XG4gICAgbGV0IGFjdGlvbk9iamVjdHMxID0gdGhpcy5BSW5kaWNpZXNUb0FjdGlvbk9iamVjdHMoQUluZGljaWVzKTtcblxuICAgIC8vIFNPYmplY3QucGxheWVyMGNhcmQxXG4gICAgaWYgKFNPYmplY3QucGxheWVyMGhvbGRpbmdDYXJkMSA9PT0gMSkge1xuICAgICAgcGxheUFnYWluc3QgPSBbMiwgMywgNF07XG4gICAgICBndWVzcyA9IFsyLCAzLCA0LCA1LCA2LCA3LCA4XTtcbiAgICB9IGVsc2UgaWYgKFNPYmplY3QucGxheWVyMGhvbGRpbmdDYXJkMSA9PT0gOCB8fCBTT2JqZWN0LnBsYXllcjBob2xkaW5nQ2FyZDEgPT09IDcgfHwgU09iamVjdC5wbGF5ZXIwaG9sZGluZ0NhcmQxID09PSA0KSB7XG4gICAgICBwbGF5QWdhaW5zdCA9IFsxXTtcbiAgICAgIGd1ZXNzID0gW107XG4gICAgfSBlbHNlIHtcbiAgICAgIHBsYXlBZ2FpbnN0ID0gWzIsIDMsIDRdO1xuICAgICAgZ3Vlc3MgPSBbXTtcbiAgICB9XG4gICAgQUluZGljaWVzID0gQUluZGljaWVzLmNvbmNhdCh0aGlzLmdlbmVyYXRlQWN0aW9uSW5kaWNpZXMoU09iamVjdC5wbGF5ZXIwaG9sZGluZ0NhcmQxLCBwbGF5QWdhaW5zdCwgZ3Vlc3MpKTtcbiAgICBsZXQgYWN0aW9uT2JqZWN0czIgPSB0aGlzLkFJbmRpY2llc1RvQWN0aW9uT2JqZWN0cyhBSW5kaWNpZXMpO1xuICAgIHJldHVybiB0aGlzLmNvbWJpbmVTQUluZGljaWVzKFNJbmRleCwgQUluZGljaWVzKTtcbiAgfVxuXG4gIC8vIEZvciBkZWJ1Z2dpbmdcbiAgQUluZGljaWVzVG9BY3Rpb25PYmplY3RzKEFJbmRpY2llcykge1xuICAgIC8vIFs4LCA0LCA3XVxuICAgIGxldCBhcnIgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IEFJbmRpY2llcy5sZW5ndGg7ICsraSkge1xuICAgICAgYXJyLnB1c2godGhpcy5BSW5kZXhUb0FjdGlvbk9iamVjdHMoQUluZGljaWVzW2ldKSk7XG4gICAgfVxuICAgIHJldHVybiBhcnI7XG4gIH1cblxuICBBSW5kZXhUb0FjdGlvbk9iamVjdHMoQUluZGV4KSB7XG4gICAgbGV0IGFyciA9IGluZDJzdWIodGhpcy5hY3Rpb25TaXplQXJyLCBBSW5kZXgpO1xuICAgIHJldHVybiB7XG4gICAgICBjYXJkSWQ6IGFyclsyXSxcbiAgICAgIHBsYXlBZ2FpbnN0OiBhcnJbMV0gKyAxLFxuICAgICAgZ3VhcmRHdWVzczogYXJyWzBdICsgMVxuICAgIH07XG4gIH1cblxuICBjb21iaW5lU0FJbmRpY2llcyhTSW5kZXgsIEFJbmRpY2llcykge1xuICAgIGxldCBzaGlmdGVkU0luZGV4ID0gU0luZGV4ICsgdGhpcy5wcm9kdWN0KHRoaXMuc3RhdGVTaXplQXJyKTtcbiAgICBsZXQgcmV0ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBBSW5kaWNpZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHJldC5wdXNoKEFJbmRpY2llc1tpXSArIHNoaWZ0ZWRTSW5kZXgpO1xuICAgIH1cbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgZ2VuZXJhdGVBY3Rpb25JbmRpY2llcyhjYXJkSWR4LCBwbGF5QWdhaW5zdEFyciwgZ3Vlc3NBcnIpIHtcbiAgICBsZXQgYXJyID0gW107XG4gICAgLy8gWzgsIDQsIDddXG4gICAgZm9yICh2YXIgcGlkeCA9IDA7IHBpZHggPCBwbGF5QWdhaW5zdEFyci5sZW5ndGg7ICsrcGlkeCkge1xuICAgICAgZm9yICh2YXIgZ2lkeCA9IDA7IGdpZHggPCBndWVzc0Fyci5sZW5ndGg7ICsrZ2lkeCkge1xuICAgICAgICBhcnIucHVzaCgoY2FyZElkeCAqIDQgKyBwbGF5QWdhaW5zdEFycltwaWR4XSkgKiA3ICsgZ3Vlc3NBcnJbZ2lkeF0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJyO1xuICB9XG5cbiAgZ2V0TWF4UVZhbHVlU0FJbmRleEdpdmVuU0FJbmRpY2llcyhTQUluZGljaWVzKSB7XG4gICAgaWYgKFNBSW5kaWNpZXMubGVuZ3RoID09PSB1bmRlZmluZWQgfHwgU0FJbmRpY2llcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IG1heCA9IHRoaXMuUVZhbHVlVGFibGVbU0FJbmRpY2llc1swXV0sIGluZGV4ID0gU0FJbmRpY2llc1swXTtcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgU0FJbmRpY2llcy5sZW5ndGg7ICsraSkge1xuICAgICAgICBtYXggPSBNYXRoLm1heChtYXgsIHRoaXMuUVZhbHVlVGFibGVbU0FJbmRpY2llc1tpXV0pO1xuICAgICAgICBpbmRleCA9IFNBSW5kaWNpZXNbaV07XG4gICAgICB9XG4gICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuICB9XG5cbiAgcmVkdXhTdGF0ZVRvU09iamVjdChyZWR1eFN0YXRlKSB7XG4gICAgLypcbiAgICBzdGF0ZVZlY3RvciA9IFtcbiAgICAgIHBsYXllclswXS5kZWFkLCAgICAgICAgICAgICAgICAgICAgICAgICAvLyAyXG4gICAgICBwbGF5ZXJbMF0ucGxheWVkQ2FyZHNbbGFzdF9pZHhdLmNhcmRJZCwgLy8gOVxuICAgICAgcGxheWVyWzBdLmhvbGRpbmdDYXJkc1swXSwgICAgICAgICAgICAgIC8vIDhcbiAgICAgIHBsYXllclswXS5ob2xkaW5nQ2FyZHNbMV0gICAgICAgICAgICAgICAvLyA4XG4gICAgXVxuICAgICovXG5cbiAgICBsZXQgcGxheWVyMGxhc3RDYXJkSWQgPSAtMTtcbiAgICBpZiAocmVkdXhTdGF0ZS5wbGF5ZXJzWzBdLnBsYXllZENhcmRzLmxlbmd0aCAhPSAwKSB7XG4gICAgICBwbGF5ZXIwbGFzdENhcmRJZCA9IHJlZHV4U3RhdGUucGxheWVyc1swXS5wbGF5ZWRDYXJkc1tyZWR1eFN0YXRlLnBsYXllcnNbMF0ucGxheWVkQ2FyZHMubGVuZ3RoIC0gMV07XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHBsYXllcjBkZWFkOiByZWR1eFN0YXRlLnBsYXllcnNbMV0uZGVhZCxcbiAgICAgIHBsYXllcjBsYXN0Q2FyZElkOiBwbGF5ZXIwbGFzdENhcmRJZC5jYXJkSWQsXG4gICAgICBwbGF5ZXIwaG9sZGluZ0NhcmQwOiByZWR1eFN0YXRlLnBsYXllcnNbMV0uaG9sZGluZ0NhcmRzWzBdLFxuICAgICAgcGxheWVyMGhvbGRpbmdDYXJkMTogcmVkdXhTdGF0ZS5wbGF5ZXJzWzFdLmhvbGRpbmdDYXJkc1sxXSxcbiAgICB9XG4gIH1cblxuICByZXdhcmQoU09iamVjdCkge1xuICAgIHJldHVybiBTT2JqZWN0LnBsYXllcjBkZWFkID09PSB0cnVlID8gLTEwMCA6IDA7XG4gIH1cblxuICBTQUluZGV4VG9BY3Rpb25PYmplY3QoU0FJbmRleCkge1xuICAgIC8vIGluZDJzdWIoWzIsIDksIDgsIDgsIDgsIDQsIDddLCAoUyArIEEpKSA9PiBbMV1bNV1bMl1bNF1bM11bMV1bNl0gKHN0YXRlVmVjdG9yKSArIChhY3Rpb25WZWN0b3IpXG4gICAgbGV0IGFyciA9IGluZDJzdWIodGhpcy5TQVNpemVBcnIsIFNBSW5kZXgpO1xuICAgIHJldHVybiB7XG4gICAgICBjYXJkSWQ6IGFyclt0aGlzLnN0YXRlU2l6ZUFyci5sZW5ndGggKyAyXSxcbiAgICAgIHBsYXlBZ2FpbnN0OiBhcnJbdGhpcy5zdGF0ZVNpemVBcnIubGVuZ3RoICsgMV0gKyAxLFxuICAgICAgZ3VhcmRHdWVzczogYXJyW3RoaXMuc3RhdGVTaXplQXJyLmxlbmd0aF0gKyAxXG4gICAgfTtcbiAgfVxuXG4gIFNBVmVjdG9yVG9JbnRlZ2VyKFMsIEEpIHtcbiAgICAvLyBbMV1bNV1bMl1bNF1bM11bMV1bNl0gPT4gMjQ5MDFcbiAgICBsZXQgd2hvbGVWZWN0b3IgPSBbXTtcbiAgICB3aG9sZVZlY3RvciA9IHdob2xlVmVjdG9yLmNvbmNhdChTKTtcbiAgICB3aG9sZVZlY3RvciA9IHdob2xlVmVjdG9yLmNvbmNhdChBKTtcbiAgICBsZXQgcmV0ID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuU0FTaXplQXJyLmxlbmd0aDsgKytpKSB7XG4gICAgICBpZiAoaSAhPT0gMCkge1xuICAgICAgICByZXQgKj0gdGhpcy5TQVNpemVBcnJbaV07XG4gICAgICB9XG4gICAgICByZXQgKz0gd2hvbGVWZWN0b3JbaV07XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICBTT2JqZWN0VG9TVmVjdG9yKFNPYmplY3QpIHtcbiAgICBsZXQgcmV0ID0gW107XG4gICAgcmV0LnB1c2goU09iamVjdC5wbGF5ZXIwZGVhZCA/IDEgOiAwKTtcbiAgICByZXQucHVzaChTT2JqZWN0LnBsYXllcjBsYXN0Q2FyZElkKTtcbiAgICByZXQucHVzaChTT2JqZWN0LnBsYXllcjBob2xkaW5nQ2FyZDApO1xuICAgIHJldC5wdXNoKFNPYmplY3QucGxheWVyMGhvbGRpbmdDYXJkMSk7XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIFNPYmplY3RUb1NJbmRleChTT2JqZWN0KSB7XG4gICAgbGV0IFNWZWN0b3IgPSB0aGlzLlNPYmplY3RUb1NWZWN0b3IoU09iamVjdCk7XG4gICAgbGV0IHJldCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnN0YXRlU2l6ZUFyci5sZW5ndGg7ICsraSkge1xuICAgICAgaWYgKGkgIT09IDApIHtcbiAgICAgICAgcmV0ICo9IHRoaXMuc3RhdGVTaXplQXJyW2ldO1xuICAgICAgfVxuICAgICAgcmV0ICs9IFNWZWN0b3JbaV07XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICBnZXRNYXhRVmFsdWVHaXZlblNBSW5kaWNpZXMoU0FJbmRpY2llcykge1xuICAgIGxldCBpbmRleCA9IHRoaXMuZ2V0TWF4UVZhbHVlU0FJbmRleEdpdmVuU0FJbmRpY2llcyhTQUluZGljaWVzKTtcbiAgICByZXR1cm4gdGhpcy5RVmFsdWVUYWJsZVtpbmRleF07XG4gIH1cblxuICB0b3RhbFNBTGVuZ3RoKCkge1xuICAgIGxldCB0b3RhbFNBQXJyID0gW107XG4gICAgdG90YWxTQUFyciA9IHRvdGFsU0FBcnIuY29uY2F0KHRoaXMuc3RhdGVTaXplQXJyKTtcbiAgICB0b3RhbFNBQXJyID0gdG90YWxTQUFyci5jb25jYXQodGhpcy5hY3Rpb25TaXplQXJyKTtcbiAgICByZXR1cm4gdGhpcy5wcm9kdWN0KHRvdGFsU0FBcnIpO1xuICB9XG5cbiAgcHJvZHVjdChhcnIpIHtcbiAgICBsZXQgcmV0VmFsID0gMTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7ICsraSkge1xuICAgICAgcmV0VmFsICo9IGFycltpXTtcbiAgICB9XG4gICAgcmV0dXJuIHJldFZhbDtcbiAgfVxufSIsImZ1bmN0aW9uIGVuYWJsZUd1YXJkR3Vlc3NCdXR0b24oKSB7XG4gICQoXCIjZ3VhcmRHdWVzc0J1dHRvbjJcIikucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG4gICQoXCIjZ3VhcmRHdWVzc0J1dHRvbjNcIikucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG4gICQoXCIjZ3VhcmRHdWVzc0J1dHRvbjRcIikucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG4gICQoXCIjZ3VhcmRHdWVzc0J1dHRvbjVcIikucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG4gICQoXCIjZ3VhcmRHdWVzc0J1dHRvbjZcIikucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG4gICQoXCIjZ3VhcmRHdWVzc0J1dHRvbjdcIikucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG4gICQoXCIjZ3VhcmRHdWVzc0J1dHRvbjhcIikucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG59XG5cbmxldCBkaXNhYmxlR3VhcmRHdWVzc0J1dHRvbiA9IGZ1bmN0aW9uKCkge1xuICAkKFwiI2d1YXJkR3Vlc3NCdXR0b24yXCIpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICQoXCIjZ3VhcmRHdWVzc0J1dHRvbjNcIikucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgJChcIiNndWFyZEd1ZXNzQnV0dG9uNFwiKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAkKFwiI2d1YXJkR3Vlc3NCdXR0b241XCIpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICQoXCIjZ3VhcmRHdWVzc0J1dHRvbjZcIikucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgJChcIiNndWFyZEd1ZXNzQnV0dG9uN1wiKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAkKFwiI2d1YXJkR3Vlc3NCdXR0b244XCIpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG59XG5cbmZ1bmN0aW9uIGVuYWJsZVBsYXlBZ2FpbnN0QnV0dG9uKHBsYXllcnMpIHtcbiAgZm9yIChsZXQgaW5kZXggPSAxOyBpbmRleCA8IDU7IGluZGV4KyspIHtcbiAgICBpZiAoIXBsYXllcnNbaW5kZXggLSAxXS5kZWFkICYmICFwbGF5ZXJzW2luZGV4IC0gMV0ucHJvdGVjdGVkKSB7XG4gICAgICAkKGAjcGxheUFnYWluc3RCdXR0b24ke2luZGV4fWApLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgIH1cbiAgfVxufVxuXG52YXIgZGlzYWJsZVBsYXlBZ2FpbnN0QnV0dG9uID0gZnVuY3Rpb24oKSB7XG4gICQoXCIjcGxheUFnYWluc3RCdXR0b24xXCIpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICQoXCIjcGxheUFnYWluc3RCdXR0b24yXCIpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICQoXCIjcGxheUFnYWluc3RCdXR0b24zXCIpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICQoXCIjcGxheUFnYWluc3RCdXR0b240XCIpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG59XG5cbmZ1bmN0aW9uIGVuYWJsZVBsYXlCdXR0b24oKSB7XG4gICQoXCIjcGxheUJ1dHRvbjFcIikucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG4gICQoXCIjcGxheUJ1dHRvbjJcIikucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG59XG5cbmZ1bmN0aW9uIGRpc2FibGVQbGF5QnV0dG9uKCkge1xuICAkKFwiI3BsYXlCdXR0b24xXCIpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICQoXCIjcGxheUJ1dHRvbjJcIikucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbn1cblxuZXhwb3J0IHtcbiAgZGlzYWJsZVBsYXlBZ2FpbnN0QnV0dG9uLFxuICBkaXNhYmxlR3VhcmRHdWVzc0J1dHRvbixcbiAgZGlzYWJsZVBsYXlCdXR0b24sXG4gIGVuYWJsZVBsYXlCdXR0b24sXG4gIGVuYWJsZVBsYXlBZ2FpbnN0QnV0dG9uLFxuICBlbmFibGVHdWFyZEd1ZXNzQnV0dG9uLFxufTtcbiIsImltcG9ydCBQbGF5ZXIgZnJvbSAnLi9wbGF5ZXInO1xuaW1wb3J0IHsgY2FyZFJhbmssIGNhcmROYW1lcyB9IGZyb20gJy4vY29uc3QnO1xuXG52YXIgY29tcGFyZUNhcmRzID0gZnVuY3Rpb24oY2FyZDEsIGNhcmQyKSB7XG4gIHJldHVybiBjYXJkUmFua1tjYXJkMl0gLSBjYXJkUmFua1tjYXJkMV07XG59XG5cbmZ1bmN0aW9uIGdldExpdmluZ1BsYXllclNpemUocGxheWVycykge1xuICBsZXQgcmVzdWx0ID0gMDtcbiAgcGxheWVycy5mb3JFYWNoKHBsYXllciA9PiB7XG4gICAgaWYgKCFwbGF5ZXIuZGVhZCkge1xuICAgICAgcmVzdWx0Kys7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gY2FsY3VsYXRlV2lubmVyKHBsYXllcnMpIHtcbiAgbGV0IHdpbm5lcklkID0gLTE7XG4gIHBsYXllcnMuZm9yRWFjaChwbGF5ZXIgPT4ge1xuICAgIGlmICghcGxheWVyLmRlYWQpIHtcbiAgICAgIGlmICh3aW5uZXJJZCA9PSAtMSkge1xuICAgICAgICB3aW5uZXJJZCA9IHBsYXllci5pZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBDb21wYXJpbmcgJHtwbGF5ZXJzW3dpbm5lcklkIC0gMV0uaG9sZGluZ0NhcmRzWzBdfSB3aXRoICR7cGxheWVyLmhvbGRpbmdDYXJkc1swXX1gKTtcbiAgICAgICAgaWYgKHBsYXllcnNbd2lubmVySWQgLSAxXS5ob2xkaW5nQ2FyZHNbMF0gPCBwbGF5ZXIuaG9sZGluZ0NhcmRzWzBdKSB7XG4gICAgICAgICAgd2lubmVySWQgPSBwbGF5ZXIuaWQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiB3aW5uZXJJZDtcbn1cblxuZnVuY3Rpb24gZ2V0Tm9uRGVhZE5vblByb3RlY3RlZFBsYXllcnMocGxheWVySWQsIHBsYXllcnMpIHtcbiAgbGV0IG5vbkRlYWROb25Qcm90ZWN0ZWRQbGF5ZXJMaXN0ID0gW107XG4gIHBsYXllcnMuZm9yRWFjaChwbGF5ZXIgPT4ge1xuICAgIGlmIChwbGF5ZXIuaWQgIT0gcGxheWVySWQgJiYgIXBsYXllci5wcm90ZWN0ZWQgJiYgIXBsYXllci5kZWFkKSB7XG4gICAgICBub25EZWFkTm9uUHJvdGVjdGVkUGxheWVyTGlzdC5wdXNoKHBsYXllci5pZCk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIG5vbkRlYWROb25Qcm90ZWN0ZWRQbGF5ZXJMaXN0O1xufVxuXG5mdW5jdGlvbiBjaGVja0dhbWVFbmQocGxheWVycywgYXZhaWxhYmxlQ2FyZHMpIHtcbiAgaWYgKGdldEF2YWlsYWJsZUNhcmRTaXplKGF2YWlsYWJsZUNhcmRzKSA8PSAwIHx8IGdldExpdmluZ1BsYXllclNpemUocGxheWVycykgPD0gMSkge1xuICAgIGxldCB3aW5uZXIgPSBjYWxjdWxhdGVXaW5uZXIocGxheWVycyk7XG4gICAgcmV0dXJuIHsnZ2FtZUVuZCc6IHRydWUsICd3aW5uZXInOiB3aW5uZXJ9O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB7J2dhbWVFbmQnOiBmYWxzZSwgJ3dpbm5lcic6IC0xfTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRIaWdoZXN0Tm90WWV0QXBwZWFyZWRDYXJkKGhvbGRpbmdDYXJkcywgY2FyZHNOb3RQbGF5ZWRZZXQpIHtcbiAgLy8gaG9kaW5nQ2FyZHNbMCwgMV1cbiAgZm9yIChsZXQgaW5kZXggPSA3OyBpbmRleCA+IDA7IGluZGV4LS0pIHtcbiAgICBjb25zdCBjYXJkTmFtZSA9IGNhcmROYW1lc1tpbmRleF07XG4gICAgaWYgKGNhcmRzTm90UGxheWVkWWV0W2NhcmROYW1lXSAhPT0gMCAmJiBob2xkaW5nQ2FyZHMuaW5kZXhPZihjYXJkTmFtZSkgPT09IC0xKSB7XG4gICAgICByZXR1cm4gY2FyZE5hbWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuICdQcmllc3QnO1xufVxuXG4vLyBUaGlzIGZ1bmN0aW9uIHdpbGwgcmV0dXJuIGEgcmFuZG9tIGNhcmQgaW5kZXggYmFzZWQgb24gdGhlIGF2YWlsYWJsZUNhcmRzIHBhc3NlZCBpbi5cbmZ1bmN0aW9uIGdldFJhbmRvbUNhcmQoYXZhaWxhYmxlQ2FyZHMpIHtcbiAgLy8gR2V0IHRoZSBudW1iZXIgb2YgdG90YWwgY2FyZHNcbiAgbGV0IHRvdGFsQ2FyZHMgPSBnZXRBdmFpbGFibGVDYXJkU2l6ZShhdmFpbGFibGVDYXJkcyk7XG5cbiAgaWYgKHRvdGFsQ2FyZHMgPT0gMCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCByYW5kb21DYXJkTnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdG90YWxDYXJkcyk7XG5cbiAgbGV0IHRlbXAgPSAwLCBkcmF3ZWRDYXJkO1xuICBmb3IgKHZhciBrZXkgaW4gYXZhaWxhYmxlQ2FyZHMpIHtcbiAgICBpZiAoYXZhaWxhYmxlQ2FyZHMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgdGVtcCArPSBhdmFpbGFibGVDYXJkc1trZXldO1xuICAgICAgaWYgKHRlbXAgPiByYW5kb21DYXJkTnVtYmVyKSB7XG4gICAgICAgIGRyYXdlZENhcmQgPSBrZXk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjYXJkUmFua1tkcmF3ZWRDYXJkXTtcbn1cblxuZnVuY3Rpb24gbmV4dFBsYXllcihwbGF5ZXJzLCBjdXJyZW50UGxheWVySWQpIHtcbiAgLy8gTmV4dCBub24gZGVhZCBwbGF5ZXJcbiAgbGV0IHRvdGFsUGxheWVycyA9IHBsYXllcnMubGVuZ3RoO1xuICBsZXQgbmV4dFBsYXllckluZGV4ID0gY3VycmVudFBsYXllcklkICUgdG90YWxQbGF5ZXJzO1xuXG4gIHdoaWxlIChwbGF5ZXJzW25leHRQbGF5ZXJJbmRleF0uZGVhZCA9PT0gdHJ1ZSkge1xuICAgIG5leHRQbGF5ZXJJbmRleCA9IChuZXh0UGxheWVySW5kZXggKyAxKSAlIHRvdGFsUGxheWVycztcbiAgfVxuXG4gIHJldHVybiBwbGF5ZXJzW25leHRQbGF5ZXJJbmRleF0uaWQ7XG59XG5cbmZ1bmN0aW9uIGdldEF2YWlsYWJsZUNhcmRTaXplKGF2YWlsYWJsZUNhcmRzKSB7XG4gIGxldCB0b3RhbENhcmRzID0gMDtcbiAgZm9yICh2YXIga2V5IGluIGF2YWlsYWJsZUNhcmRzKSB7XG4gICAgaWYgKGF2YWlsYWJsZUNhcmRzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIHRvdGFsQ2FyZHMgKz0gYXZhaWxhYmxlQ2FyZHNba2V5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRvdGFsQ2FyZHM7XG59XG5cbmZ1bmN0aW9uIHJlc2V0UHJvdGVjdGlvbihwbGF5ZXJzLCBjdXJyZW50UGxheWVySWQpIHtcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oW10sIHBsYXllcnMsIHsgW2N1cnJlbnRQbGF5ZXJJZCAtIDFdOiBPYmplY3QuYXNzaWduKHt9LCBwbGF5ZXJzW2N1cnJlbnRQbGF5ZXJJZCAtIDFdLCB7XG4gICAgcHJvdGVjdGVkOiBmYWxzZSxcbiAgfSl9KVxufVxuXG4vLyBkaXNjYXJkQ2FyZChuZXh0U3RhdGUsIGN1cnJlbnRQbGF5ZXJJZCwgYWN0aW9uLmNhcmRUb1BsYXkuY2FyZElkKTtcbmZ1bmN0aW9uIGRpc2NhcmRDYXJkKHBsYXllcnMsIGN1cnJlbnRQbGF5ZXJJZCwgZGlzY2FyZENhcmQpIHtcbiAgcmV0dXJuIHBsYXllcnMubWFwKGZ1bmN0aW9uIENCKHBsYXllciwgaW5kZXgpIHtcbiAgICBpZiAocGxheWVyLmlkID09PSBjdXJyZW50UGxheWVySWQpIHtcbiAgICAgIGxldCBhcnIgPSBPYmplY3QuYXNzaWduKFtdLCBwbGF5ZXIuaG9sZGluZ0NhcmRzKTtcbiAgICAgIC8vIFJlbW92ZSBjYXJkLlxuICAgICAgYXJyLnNwbGljZShhcnIuaW5kZXhPZihkaXNjYXJkQ2FyZC5jYXJkSWQpLCAxKTtcblxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHBsYXllciwge1xuICAgICAgICBob2xkaW5nQ2FyZHM6IGFyclxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBwbGF5ZXI7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gZHJhd0NhcmQocHJldmlvdXNTdGF0ZSkge1xuICByZXR1cm4gZHJhd0NhcmRGb3JQbGF5ZXIocHJldmlvdXNTdGF0ZSwgcHJldmlvdXNTdGF0ZS5jdXJyZW50UGxheWVySWQpO1xufVxuXG5mdW5jdGlvbiBkcmF3Q2FyZEZvclBsYXllcihwcmV2aW91c1N0YXRlLCBwbGF5ZXJJZCkge1xuICBsZXQgcmFuZG9tQ2FyZElkID0gZ2V0UmFuZG9tQ2FyZChwcmV2aW91c1N0YXRlLmF2YWlsYWJsZUNhcmRzKTtcbiAgLy8gUmVtb3ZlIHRoZSBjYXJkRHJldyBmcm9tIGF2YWlsYWJsZUNhcmRzXG4gIGxldCBhcnIgPSBPYmplY3QuYXNzaWduKFtdLCBwcmV2aW91c1N0YXRlLmF2YWlsYWJsZUNhcmRzKTtcbiAgYXJyW2NhcmROYW1lc1tyYW5kb21DYXJkSWQgLSAxXV0tLTtcblxuICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgcHJldmlvdXNTdGF0ZSwge1xuICAgIHBsYXllcnM6IGFkZEhvbGRpbmdDYXJkcyhwcmV2aW91c1N0YXRlLnBsYXllcnMsIHBsYXllcklkLCByYW5kb21DYXJkSWQpLFxuICAgIGF2YWlsYWJsZUNhcmRzOiBhcnJcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZFBsYXllZENhcmQocGxheWVycywgcGxheWVySWQsIGNhcmQpIHtcbiAgbGV0IGFyciA9IE9iamVjdC5hc3NpZ24oW10sIHBsYXllcnNbcGxheWVySWQgLSAxXS5wbGF5ZWRDYXJkcyk7XG4gIGlmIChjYXJkLmNhcmRJZCA9PT0gNCB8fCBjYXJkLmNhcmRJZCA9PT0gNyB8fCBjYXJkLmNhcmRJZCA9PT0gOCkge1xuICAgIGFyci5wdXNoKHtcbiAgICAgIGNhcmRJZDogY2FyZC5jYXJkSWQsXG4gICAgICBwbGF5QWdhaW5zdDogLTEsXG4gICAgICBndWFyZEd1ZXNzOiAtMSxcbiAgICAgIGRpc2NhcmRlZDogY2FyZC5kaXNjYXJkZWQsXG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoY2FyZC5jYXJkSWQgIT09IDEpIHtcbiAgICBhcnIucHVzaCh7XG4gICAgICBjYXJkSWQ6IGNhcmQuY2FyZElkLFxuICAgICAgcGxheUFnYWluc3Q6IGNhcmQucGxheUFnYWluc3QsXG4gICAgICBndWFyZEd1ZXNzOiAtMSxcbiAgICAgIGRpc2NhcmRlZDogY2FyZC5kaXNjYXJkZWQsXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgYXJyLnB1c2goY2FyZCk7XG4gIH1cblxuICByZXR1cm4gT2JqZWN0LmFzc2lnbihbXSwgcGxheWVycywge1xuICAgIFtwbGF5ZXJJZCAtIDFdOiBPYmplY3QuYXNzaWduKHt9LCBwbGF5ZXJzW3BsYXllcklkIC0gMV0sIHtcbiAgICAgIHBsYXllZENhcmRzOiBhcnJcbiAgICB9KVxuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkSG9sZGluZ0NhcmRzKHBsYXllcnMsIHBsYXllcklkLCBjYXJkKSB7XG4gIGxldCBhcnIgPSBPYmplY3QuYXNzaWduKFtdLCBwbGF5ZXJzW3BsYXllcklkIC0gMV0uaG9sZGluZ0NhcmRzKTtcbiAgYXJyLnB1c2goY2FyZCk7XG4gIHJldHVybiBPYmplY3QuYXNzaWduKFtdLCBwbGF5ZXJzLCB7XG4gICAgW3BsYXllcklkIC0gMV06IE9iamVjdC5hc3NpZ24oe30sIHBsYXllcnNbcGxheWVySWQgLSAxXSwge1xuICAgICAgaG9sZGluZ0NhcmRzOiBhcnJcbiAgICB9KVxuICB9KTtcbn1cblxuZnVuY3Rpb24gY2hlY2tOb3REZWFkQW5kTm90UHJvdGVjdGVkKHN0YXRlLCBwbGF5ZXJJZCkge1xuICByZXR1cm4gcGxheWVySWQgPiAwICYmIHBsYXllcklkIDwgNSAmJiAhc3RhdGUucGxheWVyc1twbGF5ZXJJZCAtIDFdLmRlYWQgJiYgIXN0YXRlLnBsYXllcnNbcGxheWVySWQgLSAxXS5wcm90ZWN0ZWQ7XG59XG5cbmZ1bmN0aW9uIHNldFBsYXllckRlYWQoc3RhdGUsIHBsYXllcklkKSB7XG4gIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgIHBsYXllcnM6IE9iamVjdC5hc3NpZ24oW10sIHN0YXRlLnBsYXllcnMsIHtcbiAgICAgIFtwbGF5ZXJJZCAtIDFdOiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5wbGF5ZXJzW3BsYXllcklkIC0gMV0sIHtcbiAgICAgICAgZGVhZDogdHJ1ZVxuICAgICAgfSlcbiAgICB9KVxuICB9KVxufVxuXG5mdW5jdGlvbiBhZGRTZWVuQ2FyZHMocGxheWVycywgcGxheWVySWQsIHNlZW5DYXJkKSB7XG4gIGxldCBhcnIgPSBPYmplY3QuYXNzaWduKFtdLCBwbGF5ZXJzW3BsYXllcklkIC0gMV0uc2VlbkNhcmRzKTtcbiAgYXJyLnB1c2goc2VlbkNhcmQpO1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbihbXSwgcGxheWVycywge1xuICAgIFtwbGF5ZXJJZCAtIDFdOiBPYmplY3QuYXNzaWduKHt9LCBwbGF5ZXJzW3BsYXllcklkIC0gMV0sIHtcbiAgICAgIHNlZW5DYXJkczogYXJyXG4gICAgfSlcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHBvcHVsYXRlVmFsdWVUYWJsZShzdGF0ZSkge1xuICBsZXQgbmV4dFN0YXRlID0gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUpO1xuICBmb3IgKGxldCBjYXJkSWQgPSAxOyBjYXJkSWQgPCA5OyBjYXJkSWQrKykge1xuICAgIGZvciAobGV0IHBsYXlBZ2FpbnN0ID0gMTsgcGxheUFnYWluc3QgPCA0OyArK3BsYXlBZ2FpbnN0KSB7XG4gICAgICBmb3IgKGxldCBndWVzcyA9IDI7IGd1ZXNzIDwgOTsgZ3Vlc3MrKykge1xuICAgICAgICBuZXh0U3RhdGUudmFsdWVUYWJsZS5jYXJkSWRbY2FyZElkIC0gMV0ucGxheUFnYWluc3RbcGxheUFnYWluc3QgLSAxXS5ndWVzc1tndWVzcyAtIDFdID0gTWF0aC5yYW5kb20oKSAvIDEwMDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5leHRTdGF0ZTtcbn1cblxuZXhwb3J0IHtcbiAgY29tcGFyZUNhcmRzLFxuICBjaGVja0dhbWVFbmQsXG4gIGdldFJhbmRvbUNhcmQsXG4gIGdldEF2YWlsYWJsZUNhcmRTaXplLFxuICBnZXRIaWdoZXN0Tm90WWV0QXBwZWFyZWRDYXJkLFxuICBnZXROb25EZWFkTm9uUHJvdGVjdGVkUGxheWVycyxcbiAgZ2V0TGl2aW5nUGxheWVyU2l6ZSxcbiAgY2FsY3VsYXRlV2lubmVyLFxuICBuZXh0UGxheWVyLFxuICBkcmF3Q2FyZCxcbiAgcmVzZXRQcm90ZWN0aW9uLFxuICBkaXNjYXJkQ2FyZCxcbiAgZHJhd0NhcmRGb3JQbGF5ZXIsXG4gIGFkZFBsYXllZENhcmQsXG4gIGFkZEhvbGRpbmdDYXJkcyxcbiAgYWRkU2VlbkNhcmRzLFxuICBzZXRQbGF5ZXJEZWFkLFxuICBjaGVja05vdERlYWRBbmROb3RQcm90ZWN0ZWQsXG4gIHBvcHVsYXRlVmFsdWVUYWJsZSxcbn07Il0sInNvdXJjZVJvb3QiOiIifQ==