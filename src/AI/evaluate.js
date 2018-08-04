import { counter } from '../reducers';
import { createStore, combineReducers } from 'redux';
import ReinforcementAI from './reinforcementAI';
import Game from "../game";

export default class Evaluation {
  constructor() {
    this.store = createStore(combineReducers({counter}));
    this.game = new Game(4);
    let reinforcementAI = new ReinforcementAI([2, 9, 8, 8], [8, 4, 7]);
    reinforcementAI.initialize();
    this.game.setPlayer(2, reinforcementAI);
  }

  // Public functions
  start(games) {
    // Swap out this mock with actual win rate calculation with simulating games.
    let winRate = [0, 0, 0, 0];

    for (let i = 0; i < games; ++i) {
      this.game.start();
      winRate[this.game.getWinnerId() - 1]++;
    }

    return {
      winRate: [
        winRate[0] / games * 100,
        winRate[1] / games * 100,
        winRate[2] / games * 100,
        winRate[3] / games * 100,
      ]
    }
  }
}