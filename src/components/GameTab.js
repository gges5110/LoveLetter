import React from 'react';

import SelectAction from './SelectAction';
import GameBoard from './GameBoard';
import Game from "../game";
import {store} from '../pages/index';

class GameTab extends React.Component {
  constructor(props) {
    super(props);
    this.game = new Game(4, store);
    this.game.start();
  }

  restart() {
    this.game.start();
  }

  render() {
    return (
      <div>
        <SelectAction nextTurn={this.game.nextTurn} restart={() => this.restart()}/>
        <GameBoard />
      </div>
    );
  }
}

export default GameTab;