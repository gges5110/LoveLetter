import React, {Component} from 'react';
import {connect} from "react-redux";
import {withStyles} from '@material-ui/core/styles';
import PlayedCardList from "./PlayedCardList";
import {getAvailableCardSize} from '../util';
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";

const styles = theme => ({
  cardHeader: {
    backgroundColor: theme.palette.grey[200],
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
      <Card>
        <CardHeader
          title="Game Board"
          subheader={`Available cards: ${this.props.cardsLeft}`}
          className={classes.cardHeader}
        />
        <CardContent>
          {playedCardLists}
        </CardContent>
      </Card>
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

let WrappedWithStyle = withStyles(styles)(GameBoard);
export default connect(mapStateToProps)(WrappedWithStyle);