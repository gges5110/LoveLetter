import ReinforcementAI from './reinforcementAI';
import Game from "../game";

export default class Evaluation {
  constructor() {
    this.game = new Game(4, null, 1);
    let reinforcementAI = new ReinforcementAI([2, 9, 8, 8], [8, 4, 7]);
    reinforcementAI.initialize();
    this.game.setPlayer(2, reinforcementAI);

    // We might want to make this a method instead of a member variable.
    this.start = new Promise(function(resolve, reject) {
      // do a thing, possibly async, then…
      let winRate = [0, 0, 0, 0];
      let games = 2;

      console.log('Start playing game');
      // Wrap this.game.play into a Promise and do asynchronous calls.
      for (let i = 0, p = Promise.resolve(); i < games; i++) {
        p = p.then(function(winnerId) {
          if (i !== 0) {
            console.log(`Played game ${i}, winner is ${winnerId}`);
          }
          winRate[winnerId - 1]++;
          if (i === games - 1) {
            return this.game.play().then(function(winnerId) {
              console.log(`Played game ${i}, winner is ${winnerId}`);
              winRate[winnerId - 1]++;
              resolve({
                winRate: [
                  winRate[0] / games * 100,
                  winRate[1] / games * 100,
                  winRate[2] / games * 100,
                  winRate[3] / games * 100,
                ]
              });
            }.bind(this));
          } else {
            return this.game.play();
          }
        }.bind(this));
      }
    }.bind(this));
  }
}