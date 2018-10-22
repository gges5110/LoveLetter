import React from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import FaceIcon from '@material-ui/icons/Face';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import {cardNames} from "../const";

export default class PlayedCardList extends React.Component {
  constructor(props) {
    super(props);
  }

  renderTitle() {
    if (this.props.winner) {
      if (this.props.player.id === this.props.winner.id) {
        // This player is winner
        return (
          <ListItem button>
            <ListItemIcon>
              <InsertEmoticonIcon color="action" />
            </ListItemIcon>
            <ListItemText primary={`Player ${this.props.player.id}`} />
          </ListItem>
        )
      } else {
        return (
          <ListItem button>
            <ListItemIcon>
              <FaceIcon color="error" />
            </ListItemIcon>
            <ListItemText primary={`Player ${this.props.player.id} - ${cardNames[this.props.player.holdingCards[0] - 1]}`} />
          </ListItem>
        )
      }
    } else {
      if (!this.props.player.dead) {
        return (
          <ListItem button>
            <ListItemIcon>
              <FaceIcon />
            </ListItemIcon>
            <ListItemText primary={`Player ${this.props.player.id}`} />
          </ListItem>
        )
      } else {
        // This player is out
        return (
          <ListItem button>
            <ListItemIcon>
              <FaceIcon color="error" />
            </ListItemIcon>
            <ListItemText primary={`Player ${this.props.player.id} - ${cardNames[this.props.player.holdingCards[0] - 1]}`} />
          </ListItem>
        )
      }
    }
  }

  render() {
    let display = this.props.player.playedCards.map((playedCard, index) => {
      let primary = '';
      if (playedCard.discarded) {
        primary = `Discarded ${cardNames[playedCard.cardId - 1]}`;
      } else {
        primary = `Played ${cardNames[playedCard.cardId - 1]}`;
      }

      let secondary = '';
      if (playedCard.target !== null) {
        secondary = `Against ${playedCard.target}`;
      }
      if (playedCard.guess !== null && playedCard.guess !== undefined) {
        secondary += `, guessed ${cardNames[playedCard.guess - 1]}`;
      }
      return (
        <ListItem button key={index}>
          <ListItemText primary={primary} secondary={secondary}/>
        </ListItem>
      );
    });

    return (
      <div>
        <Divider/>
        <List dense={true}>
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