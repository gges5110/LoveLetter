import React from 'react';

import SelectAction from '../../components/SelectAction';
import GameBoard from '../../components/GameBoard';
import Game from "../../game";
import {store} from '../index';
import Grid from "@material-ui/core/Grid/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

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
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6} md={6}>
            <SelectAction nextTurn={this.game.nextTurn} restart={() => this.restart()}/>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <GameBoard />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(GameTab);
