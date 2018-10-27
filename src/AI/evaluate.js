import ReinforcementAI from './reinforcementAI';
import Game from '../game';

export default class Evaluation {
  constructor() {
    this.game = new Game(4, null, 1);
    const reinforcementAI = new ReinforcementAI([2, 9, 8, 8], [8, 4, 7]);
    reinforcementAI.initialize();
    this.game.setPlayer(2, reinforcementAI);

    this.start = this.start.bind(this);
  }

  start() {
    return new Promise(((resolve, reject) => {
      // do a thing, possibly async, then…
      const winRate = [0, 0, 0, 0];
      const games = 2;

      // Wrap this.game.play into a Promise and do asynchronous calls.
      for (let i = 0, p = Promise.resolve(); i < games; i++) {
        p = p.then((winnerId) => {
          winRate[winnerId - 1]++;
          if (i === games - 1) {
            return this.game.play().then((winnerId) => {
              winRate[winnerId - 1]++;
              resolve({
                winRate: [
                  winRate[0] / games * 100,
                  winRate[1] / games * 100,
                  winRate[2] / games * 100,
                  winRate[3] / games * 100,
                ],
              });
            }).catch((err) => {
              console.log(err);
            });
          }
          return this.game.play();
        }).catch((err) => {
          console.log(err);
        });
      }
    }));
  }
}
