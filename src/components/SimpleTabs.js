import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import GameTab from './gameTab';
import RulesTab from './rulesTab';
import EvaluationTab from './evaluationTab';

function TabContainer(props) {
  return (
    <Paper elevation={1} style={{ padding: 8 * 3, marginLeft: 200, marginRight: 200, marginTop: 24 }}>
      {props.children}
    </Paper>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
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
            style={{paddingLeft: 200}}
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
