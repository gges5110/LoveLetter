import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { playCard } from "../actions/index";
import Button from '@material-ui/core/Button';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import PersonIcon from '@material-ui/icons/Person';
import { withStyles } from '@material-ui/core/styles';
import {cardNames} from "../const";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

class CardSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardId: null,
      target: null,
    };

    this.chooseCard = this.chooseCard.bind(this);
    this.chooseTarget = this.chooseTarget.bind(this);
    this.chooseGuess = this.chooseGuess.bind(this);
    this.submitAction = this.submitAction.bind(this);
  }

  chooseCard(card_id) {
    console.assert(this.props.holdingCards.includes(card_id), `${card_id} not in ${this.props.holdingCards}]`);
    if([4, 7, 8].includes(card_id)) {
      this.submitAction(
        Object.assign(this.state, {
          cardId: card_id
        })
      );
    } else {
      this.setState({cardId: card_id});
    }
  }

  chooseTarget(target) {
    if (this.state.cardId !== 1) {
      this.submitAction(
        Object.assign(this.state, {
          target
        })
      );
    } else {
      this.setState({target: target});
    }
  }

  chooseGuess(guess) {
    this.submitAction(
      Object.assign(this.state, {
        guess
      })
    );
  }

  submitAction(action) {
    this.props.playCard(action);
    this.setState({
      cardId: null,
      target: null,
      guess: null,
    });
    this.props.nextTurn();
  }

  render() {
    let display = [];
    const { classes } = this.props;
    if (this.state.cardId == null) {
      display.push(
        <div key={0}>
          Select Card
        </div>
      );
      display.push(this.props.holdingCards.map((holdingCard, index) =>
        <Button key={index} onClick={() => this.chooseCard(holdingCard)} className={classes.button} color="primary" variant="contained" style={{marginRight: 8}}>
          {cardNames[holdingCard - 1]}
          <CreditCardIcon className={classes.rightIcon}/>
        </Button>
      ));
    } else if (this.state.target == null) {
      display.push(
        <div key={0}>
          Select Target
        </div>
      );
      display.push([1, 2, 3, 4].map((target, index) =>
        <Button disabled={!this.props.playersStatus[index]} key={index} onClick={() => this.chooseTarget(target)} className={classes.button} color="primary" variant="contained">
          {target}
          <PersonIcon className={classes.rightIcon}/>
        </Button>
      ));
    } else {
      display.push(
        <div key={0}>
          Guess Card
        </div>
      );
      display.push([2, 3, 4, 5, 6, 7, 8].map((guess, index) =>
        <Button key={index} onClick={() => this.chooseGuess(guess)} color="primary" variant="contained">
          {cardNames[guess - 1]}
        </Button>
      ));
    }

    return (
      <div>
        {display}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const playersStatus = state.GameReducer.players.map((player) => {
    return !player.dead && !player.protected;
  });

  return {
    holdingCards: state.GameReducer.players[0].holdingCards,
    playersStatus: playersStatus
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ playCard }, dispatch);
}

let WrappedWithStyle = withStyles(styles)(CardSelect);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedWithStyle);