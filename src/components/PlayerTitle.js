import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import FaceIcon from '@material-ui/icons/Face';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import {cardNames} from "../const";
import Avatar from "@material-ui/core/Avatar/Avatar";
import {green, lime, pink} from "@material-ui/core/colors";

const styles = {
  pinkAvatar: {
    color: '#fff',
    backgroundColor: pink[500],
  },
  greenAvatar: {
    color: '#fff',
    backgroundColor: green[500],
  },
  limeAvatar: {
    color: '#fff',
    backgroundColor: lime[500],
  }
};

class PlayerTitle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
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
      if (!this.props.player.dead && !this.props.player.protected) {
        return (
          <ListItem button>
            <Avatar>
              <FaceIcon />
            </Avatar>
            <ListItemText primary={`Player ${this.props.player.id}`} />
          </ListItem>
        )
      } else if (!this.props.player.dead && this.props.player.protected) {
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
    }
  }
}

PlayerTitle.propTypes = {
  player: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlayerTitle);