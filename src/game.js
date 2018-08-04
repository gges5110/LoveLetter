import actions from "./actions";
import RandomAI from "./AI/randomAI";
import {combineReducers, createStore} from "redux";
import {counter} from "./reducers";
import ReinforcementAI from "./AI/reinforcementAI";
import HumanPlayer from "./AI/human";

export default class Game {
  constructor(players) {
    this.computerPlayers = Array(players);
    this.store = createStore(combineReducers({counter}));

    // Player 1
    this.setPlayer(1, new RandomAI());
    // Player 2
    let reinforcementAI = new ReinforcementAI([2, 9, 8, 8], [8, 4, 7]);
    reinforcementAI.initialize();
    this.setPlayer(2, reinforcementAI);
    // Player 3
    this.setPlayer(3, new RandomAI());
    // Player 4
    this.setPlayer(4, new RandomAI());
  }

  // Public functions
  setPlayer(playerId, player) {
    this.computerPlayers[playerId - 1] = player;
  }

  getWinnerId() {
    return this.store.getState().counter.gameEnds.winner.id;
  }

  start() {
    this.store.dispatch({type: "RESTART"});
    this.nextTurn();
  }

  nextTurn() {
    console.log('next turn');

    if (this.store.getState().counter.gameEnds.winner !== null) {
      // Game end
      return;
    } else if (this.store.getState().counter.players[this.store.getState().counter.currentPlayerId - 1].dead) {
      // Skip dead players
      this.nextTurn();
      return;
    } else {
      this.store.dispatch(actions.drawCard(this.store.getState().counter.currentPlayerId));
      let currentPlayer = this.computerPlayers[this.store.getState().counter.currentPlayerId - 1];
      console.log(currentPlayer.constructor);
      switch (currentPlayer.constructor) {
        case HumanPlayer:
          // Wait until the human response, let UI call this.nextTurn() directly.
          break;
        case ReinforcementAI:
          this.store.dispatch(actions.drawCard(this.store.getState().counter.currentPlayerId));
          currentPlayer.learn(this.store.getState().counter);
          let reinforcementAICard = currentPlayer.getBestAction(this.store.getState().counter);
          this.store.dispatch(actions.playCard(reinforcementAICard));
          this.nextTurn();
          return;
        case RandomAI:
          // Random AI move
          setTimeout(function() {
            this.store.dispatch(actions.drawCard(this.store.getState().counter.currentPlayerId));
            let randomAICard = currentPlayer.getAction(this.store.getState().counter.players, this.store.getState().counter.currentPlayerId);
            this.store.dispatch(actions.playCard(randomAICard));
            this.nextTurn();
          }, 1000);
        default:
          return;
      }
    }
  }
}

