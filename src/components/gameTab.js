import React from 'react';
import Button from '@material-ui/core/Button';

import SelectAction from '../containers/select_action';
import GameBoard from '../containers/game_board';
import Game from "../game";
import {store} from '../index';

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