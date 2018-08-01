import { counter } from '../reducers';
import { createStore, combineReducers } from 'redux';
import actions from '../actions';
import ReinforcementAI from './reinforcementAI';
import randomAI from './randomAI';

export default class Evaluation {
  constructor() {
    this.store = createStore(combineReducers({counter}));
    this.reinforcementAI = new ReinforcementAI([2, 9, 8, 8], [8, 4, 7]);
    this.reinforcementAI.initialize();
  }

  // Public functions
  start(games) {
    // Swap out this mock with actual win rate calculation with simulating games.
    let winRate = [0, 0, 0, 0];

    for (let i = 0; i < games; ++i) {
      this.store.dispatch({type: "RESTART"});
      this.nextTurn();
      winRate[this.store.getState().counter.gameEnds.winner.id - 1]++;
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

  nextTurn() {
    console.log('next turn');

    if (this.store.getState().counter.gameEnds.winner !== null) {
      // Game end
      return;
    } else if (this.store.getState().counter.currentPlayerId === 2 && this.store.getState().counter.players[1].dead === false) {
      // RL AI move
      // Update Value Table, if not the first time
      this.store.dispatch(actions.drawCard(this.store.getState().counter.currentPlayerId));
      this.reinforcementAI.learn(this.store.getState().counter);
      let reinforcementAICard = this.reinforcementAI.getBestAction(this.store.getState().counter);
      this.store.dispatch(actions.playCard(reinforcementAICard));
      this.nextTurn();
    } else {
      // Random AI move
      // Disable buttons
      this.store.dispatch(actions.drawCard(this.store.getState().counter.currentPlayerId));
        let randomAICard = randomAI(this.store.getState().counter.players, this.store.getState().counter.currentPlayerId);
        this.store.dispatch(actions.playCard(randomAICard));
        this.nextTurn();
    }
  }
}