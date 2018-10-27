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
import Stepper from "@material-ui/core/Stepper/Stepper";
import Step from "@material-ui/core/Step/Step";
import StepLabel from "@material-ui/core/StepLabel/StepLabel";
import Typography from "@material-ui/core/Typography/Typography";

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
    this.handleBack = this.handleBack.bind(this);
    this.getActiveStep = this.getActiveStep.bind(this);
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

  handleBack() {
    let activeStep = this.getActiveStep();
    if (activeStep === 1) {
      this.setState({
        cardId: null
      });
    } else if (activeStep === 2) {
      this.setState({
        target: null
      });
    }
  }

  getActiveStep() {
    let activeStep = 0;
    if (this.state.cardId !== null) {
      activeStep = 1;
    }
    if (this.state.target !== null) {
      activeStep = 2;
    }
    return activeStep;
  }

  renderTitle() {
    let activeStep = this.getActiveStep();
    let steps = ['Select Card', 'Select Target', 'Guess'];

    return (
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const props = {};
          const labelProps = {};
          if (index === 2) {
            labelProps.optional = <Typography variant="caption">Optional</Typography>;
          }
          return (
            <Step key={label} {...props}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    );
  }

  render() {
    let display = [];
    const { classes } = this.props;
    if (this.state.cardId == null) {
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

    let activeStep = this.getActiveStep();

    return (
      <Card style={{marginBottom: 12, maxWidth: 480}}>
        <CardHeader
          title="Action"
          subheader={this.renderTitle()}
          className={classes.cardHeader}
        />
        <CardContent>
          {display}
        </CardContent>
        <CardActions>
          <Button
            disabled={activeStep === 0}
            onClick={this.handleBack}
          >
            Back
          </Button>
          <Button
            style={{marginLeft: 'auto',}}
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
