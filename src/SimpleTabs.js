import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SimpleTable from './SimpleTable';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

class GameTab extends React.Component {
  render() {
    return (
      <div>
        <Button color="primary" variant="contained">
          Restart
        </Button>
      </div>
    );
  }
}

class RulesTab extends React.Component {
  render() {
    return (
      <div>
        <h4>End Goal</h4>
        Game ends if the deck is empty at the end of a turn. The player with the highest ranked person wins. In case of a tie, the player who discarded the highest total value of cards wins.
        <br/><br/>
        Game also ends if all players but one are out of the game, in which case the remaining player wins.
        <br/><br/>
        You can get the rules book
        <a href="http://online.fliphtml5.com/mvgr/hyvg/#p=1" target="_blank"> here.</a>
        The following is a summary table.

        <SimpleTable/>
      </div>
    );
  }
}

class ScrollableTabsButtonAuto extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            scrollable
            scrollButtons="auto"
          >
            <Tab label="Game" />
            <Tab label="Rules" />
            <Tab label="About" />
            <Tab label="AI Evaluation" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer><GameTab/></TabContainer>}
        {value === 1 && <TabContainer><RulesTab/></TabContainer>}
        {value === 2 && <TabContainer><a href="https://github.com/gges5110/LoveLetter" target="_blank">GitHub Project Link</a></TabContainer>}
        {value === 3 && <TabContainer>Item Four</TabContainer>}
      </div>
    );
  }
}

ScrollableTabsButtonAuto.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScrollableTabsButtonAuto);
