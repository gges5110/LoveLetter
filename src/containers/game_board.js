import React, {Component} from 'react';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import PlayedCardList from "../components/playedCardList";

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class GameBoard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        Game Board
        <PlayedCardList player={this.props.players[0]}/>
        <PlayedCardList player={this.props.players[1]}/>
        <PlayedCardList player={this.props.players[2]}/>
        <PlayedCardList player={this.props.players[3]}/>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    players: state.GameReducer.players
  };
}

let StyleWrapped = withStyles(styles)(GameBoard);

export default connect(mapStateToProps)(StyleWrapped);