import React from 'react';
import Button from '@material-ui/core/Button';
import CardSelect from '../containers/card_select';
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
        <Button color="primary" variant="contained" onClick={() => this.restart}>
          Restart
        </Button>
        <CardSelect nextTurn={this.game.nextTurn} />
        <GameBoard />
      </div>
    );
  }
}

export default GameTab;