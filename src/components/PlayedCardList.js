import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import FaceIcon from '@material-ui/icons/Face';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import {cardNames} from "../const";
import Avatar from "@material-ui/core/Avatar/Avatar";
import {green, lime, pink} from "@material-ui/core/colors";

const styles = {
  avatar: {
    margin: 10,
  },
  pinkAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: pink[500],
  },
  greenAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: green[500],
  },
  limeAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: lime[500],
  }
};

class PlayedCardList extends React.Component {
  constructor(props) {
    super(props);
  }

  renderTitle() {
    const { classes } = this.props;

    if (this.props.winner) {
      if (this.props.player.id === this.props.winner.id) {
        // This player is winner
        return (
          <ListItem button>
            <Avatar className={classes.greenAvatar}>
              <InsertEmoticonIcon />
            </Avatar>
            <ListItemText primary={`Player ${this.props.player.id} - ${cardNames[this.props.player.holdingCards[0] - 1]}`} />
          </ListItem>
        )
      } else {
        let primary = "";
        if (this.props.player.holdingCards.length > 0) {
          primary = `Player ${this.props.player.id} - ${cardNames[this.props.player.holdingCards[0] - 1]}`;
        } else {
          primary = `Player ${this.props.player.id}`;
        }

        return (
          <ListItem button>
            <Avatar className={classes.pinkAvatar}>
              <FaceIcon/>
            </Avatar>
            <ListItemText primary={primary} />
          </ListItem>
        )
      }
    } else {
      if (!this.props.player.dead) {
        return (
          <ListItem button>
            <Avatar>
              <FaceIcon />
            </Avatar>
            <ListItemText primary={`Player ${this.props.player.id}`} />
          </ListItem>
        )
      } else if (this.props.player.protected) {
        console.log('Protected');
        return (
          <ListItem button>
            <Avatar className={classes.limeAvatar}>
              <FaceIcon />
            </Avatar>
            <ListItemText primary={`Player ${this.props.player.id}`} />
          </ListItem>
        )
      } else {
        // This player is out
        return (
          <ListItem button>
            <Avatar className={classes.pinkAvatar}>
              <FaceIcon/>
            </Avatar>
            <ListItemText primary={`Player ${this.props.player.id} - ${cardNames[this.props.player.holdingCards[0] - 1]}`} />
          </ListItem>
        )
      }
    }
  }

  render() {
    let display = this.props.player.playedCards.map((playedCard, index) => {
      let primary = '';
      let icon = null;
      if (playedCard.discarded) {
        primary = `Discarded ${cardNames[playedCard.cardId - 1]}`;
        icon = <RemoveCircleIcon/>;
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

export default withStyles(styles)(PlayedCardList);