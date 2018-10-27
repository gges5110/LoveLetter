import React from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import {cardNames} from "../const";
import PlayerTitle from "./PlayerTitle";


class PlayedCardList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let display = this.props.player.playedCards.map((playedCard, index) => {
      let primary = '';
      let icon = null;
      if (playedCard.discarded) {
        primary = `Discarded ${cardNames[playedCard.cardId - 1]}`;
        icon = <RemoveCircleIcon />;
      } else {
        icon = <PlayArrowIcon />;
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
          <ListItemIcon>
            {icon}
          </ListItemIcon>
          <ListItemText inset primary={primary} secondary={secondary}/>
        </ListItem>
      );
    });

    return (
      <div>
        <Divider/>
        <List dense={true}>
          <PlayerTitle player={this.props.player} winner={this.props.winner}/>
          {display}
        </List>
      </div>
    );
  }
}

PlayedCardList.propTypes = {
  player: PropTypes.object.isRequired,
  winner: PropTypes.object,
};

export default PlayedCardList;
