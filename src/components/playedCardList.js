import React from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";

export default class PlayedCardList extends React.Component {
  constructor(props) {
    super(props);
  }

  renderTitle() {
    if (!this.props.player.dead) {
      return (
        <ListItem button>
          <ListItemText primary={`Player ${this.props.player.id}`} />
        </ListItem>
      )
    } else {
      return (
        <ListItem button>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText primary={`Player ${this.props.player.id}`} />
        </ListItem>
      )
    }
  }

  render() {
    let display = this.props.player.playedCards.map((playedCard, index) => {
      let primary = `Played card ${playedCard.cardId}`;
      if (playedCard.target !== null) {
        primary += `, against ${playedCard.target}`;
      }
      if (playedCard.guess !== null && playedCard.guess !== undefined) {
        primary += `, guessed ${playedCard.guess}`;
      }
      return (
        <ListItem button key={index}>
          <ListItemText primary={primary} />
        </ListItem>
      );
    });

    return (
      <div>
        <Divider/>
        <List>
          {this.renderTitle()}
          {display}
        </List>
      </div>
    );
  }
}

PlayedCardList.propTypes = {
  player: PropTypes.object.isRequired,
};