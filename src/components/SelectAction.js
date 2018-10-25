import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {playCard} from "../actions/index";
import Button from '@material-ui/core/Button';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import {withStyles} from '@material-ui/core/styles';
import {cardNames} from "../const";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import RefreshIcon from '@material-ui/icons/Refresh';
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import CardActions from "@material-ui/core/CardActions/CardActions";
import Chip from "@material-ui/core/Chip/Chip";
import Avatar from "@material-ui/core/Avatar/Avatar";
import FaceIcon from '@material-ui/icons/Face';

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
  cardHeader: {
    backgroundColor: theme.palette.grey[200],
  },
});

class SelectAction extends Component {
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
    let title = [];
    let display = [];
    const { classes } = this.props;
    if (this.state.cardId == null) {
      title.push(
        <div key={0}>
          Select Card
        </div>
      );
      display.push(this.props.holdingCards.map((holdingCard, index) =>
        <Chip
          avatar={<Avatar><CreditCardIcon/></Avatar>}
          label={cardNames[holdingCard - 1]}
          color={this.props.isPlayersTurn ? "primary" : "default"}
          onClick={() => {
            if (this.props.isPlayersTurn) {
              return this.chooseCard(holdingCard);
            } else {
              return null;
            }
          }}
          key={index}
          className={classes.button}
          style={{marginRight: 8}}
        />
      ));
    } else if (this.state.target == null) {
      title.push(
        <div key={0}>
          Select Target
        </div>
      );
      display.push([1, 2, 3, 4].map((target, index) =>
        <Chip
          avatar={<Avatar><FaceIcon/></Avatar>}
          label={`Player ${target}`}
          color={
            this.props.playersStatus[index] ? "primary" : "default"
          }
          onClick={() => {
            if (this.props.playersStatus[index]) {
              return this.chooseTarget(target);
            } else {
              return null;
            }
          }}
          key={index}
          className={classes.button}
          style={{marginRight: 8}}
        />
      ));
    } else {
      title.push(
        <div key={0}>
          Guess Card
        </div>
      );
      display.push([2, 3, 4, 5, 6, 7, 8].map((guess, index) =>
        <Chip
          avatar={<Avatar><CreditCardIcon/></Avatar>}
          label={cardNames[guess - 1]}
          color="primary"
          onClick={() => this.chooseGuess(guess)}
          key={index}
          className={classes.button}
          style={{marginRight: 8}}
        />
      ));
    }

    return (
      <Card style={{marginTop: 12, marginBottom: 12}}>
        <CardHeader
          title="Action"
          subheader={title}
          className={classes.cardHeader}
        />
        <CardContent>
          {display}
        </CardContent>
        <CardActions>
          <Button
            color="default"
            variant="outlined"
            onClick={this.props.restart}
            size="small"
          >
            <RefreshIcon/>
            Restart
          </Button>
        </CardActions>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  const playersStatus = state.GameReducer.players.map((player) => {
    return !player.dead && !player.protected;
  });

  const isPlayersTurn = state.GameReducer.gameEnds.winner === null && !state.GameReducer.players[0].dead && state.GameReducer.currentPlayerId === state.GameReducer.players[0].id;

  return {
    holdingCards: state.GameReducer.players[0].holdingCards,
    playersStatus: playersStatus,
    isPlayersTurn: isPlayersTurn,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ playCard }, dispatch);
}

let WrappedWithStyle = withStyles(styles)(SelectAction);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedWithStyle);