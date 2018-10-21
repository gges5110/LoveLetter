import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import GameTab from './gameTab';
import RulesTab from './rulesTab';
import EvaluationTab from './evaluationTab';

function TabContainer(props) {
  return (
    <Typography variant="body2" style={{ padding: 8 * 3 }}>
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
        {value === 3 && <TabContainer><EvaluationTab/></TabContainer>}
      </div>
    );
  }
}

ScrollableTabsButtonAuto.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScrollableTabsButtonAuto);
