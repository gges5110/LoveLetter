import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { playCard } from "../actions/index";
import Button from '@material-ui/core/Button';

class CardSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      card: null,
      target: null,
      guess: null,
    };

    this.chooseCard = this.chooseCard.bind(this);
    this.submitAction = this.submitAction.bind(this);
  }

  chooseCard(card_id) {
    console.assert(this.props.holdingCards.includes(card_id), `${card_id} not in ${this.props.holdingCards}]`);
    this.setState({card: card_id});
    if([4, 8].includes(card_id)) {
      this.submitAction();
    }
  }

  submitAction() {
    this.props.playCard({
      'card': this.state.card,
      'against': this.state.guess,
      'guess': this.state.guess
    });
  }

  render() {
    let display;
    if (this.state.card == null) {
      display = this.props.holdingCards.map((holdingCard, index) =>
        <Button key={index} onClick={() => this.chooseCard(holdingCard)} color="primary" variant="contained">
          {holdingCard}
        </Button>
      );
    }


    return (
      <div>
        {display}
      </div>
    );
  }
}

function mapStateToProps(state) {
  // Whatever is returned will show up as props
  // inside of BookList
  return {
    holdingCards: state.GameReducer.players[0].holdingCards
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ playCard }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CardSelect);