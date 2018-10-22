import React, {Component} from 'react';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import PlayedCardList from "../components/playedCardList";
import {getAvailableCardSize} from '../util';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: theme.palette.background.paper,
  },
});

class GameBoard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    const playedCardLists = this.props.players.map((player, index) => {
      return (
        <PlayedCardList player={player} key={index} winner={this.props.winner}/>
      )
    });

    return (
      <div className={classes.root}>
        Game Board, available cards: {this.props.cardsLeft}
        {playedCardLists}
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    players: state.GameReducer.players,
    cardsLeft: getAvailableCardSize(state.GameReducer.availableCards),
    winner: state.GameReducer.gameEnds.winner,
  };
}

let StyleWrapped = withStyles(styles)(GameBoard);

export default connect(mapStateToProps)(StyleWrapped);