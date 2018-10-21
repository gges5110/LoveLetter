import {playCard, drawCard, restart} from "./actions/index";

import ReinforcementAI from "./AI/reinforcementAI";
import RandomAI from "./AI/randomAI";
import HumanPlayer from "./AI/human";
import GameReducer from "./reducers/reducer_game";

export default class Game {
  constructor(players, store, timeout) {
    this.computerPlayers = Array(players);
    this.store = store;

    // Player 1
    this.setPlayer(1, new HumanPlayer());
    // Player 2
    let reinforcementAI = new ReinforcementAI([2, 9, 8, 8], [8, 4, 7]);
    reinforcementAI.initialize();
    this.setPlayer(2, reinforcementAI);
    // Player 3
    this.setPlayer(3, new RandomAI());
    // Player 4
    this.setPlayer(4, new RandomAI());

    this.play = this.play.bind(this);
    this.timeout = timeout || 1000;

    this.nextTurn = this.nextTurn.bind(this);
  }

  play() {
    return new Promise(function (resolve, reject) {
      this.store.dispatch({type: "RESTART"});
      // Start the game
      this.nextTurn(resolve)}.bind(this));
  }

  // Public functions
  setPlayer(playerId, player) {
    this.computerPlayers[playerId - 1] = player;
  }

  getWinnerId() {
    return this.store.getState().GameReducer.gameEnds.winner.id;
  }

  start() {
    this.store.dispatch(restart());
    this.nextTurn();
  }

  nextTurn(resolve) {
    if (this.store.getState().GameReducer.gameEnds.winner !== null) {
      // Game end
      if (resolve) {
        resolve(this.getWinnerId());
      }
      return;
    } else if (this.store.getState().GameReducer.players[this.store.getState().GameReducer.currentPlayerId - 1].dead) {
      // Skip dead players
      this.nextTurn(resolve);
      return;
    } else {
      this.store.dispatch(drawCard(this.store.getState().GameReducer.currentPlayerId));
      let currentPlayer = this.computerPlayers[this.store.getState().GameReducer.currentPlayerId - 1];
      switch (currentPlayer.constructor) {
        case HumanPlayer:
          // Wait until the human response, let UI call this.nextTurn() directly.
          break;
        case ReinforcementAI:
          // this.store.dispatch(actions.drawCard(this.store.getState().GameReducer.currentPlayerId));
          currentPlayer.learn(this.store.getState().GameReducer);
          let reinforcementAICard = currentPlayer.getBestAction(this.store.getState().GameReducer);
          this.store.dispatch(playCard(reinforcementAICard));
          this.nextTurn(resolve);
          return;
        case RandomAI:
          // Random AI move
          setTimeout(function() {
            // this.store.dispatch(actions.drawCard(this.store.getState().GameReducer.currentPlayerId));
            let randomAICard = currentPlayer.getAction(this.store.getState().GameReducer.players, this.store.getState().GameReducer.currentPlayerId);
            this.store.dispatch(playCard(randomAICard));
            this.nextTurn(resolve);
          }.bind(this), this.timeout);
        default:
          return;
      }
    }
  }
}


