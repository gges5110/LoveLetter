import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import GameTab from '../pages/Tabs/GameTab';
import RulesTab from '../pages/Tabs/RulesTab';
import EvaluationTab from '../pages/Tabs/EvaluationTab';
import TabContainer from "./TabContainer";

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
  tabHeader: {
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 20,
      paddingRight: 20
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: 200,
      paddingRight: 200
    },
  }
});

class Page extends React.Component {
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
            className={classes.tabHeader}
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

Page.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Page);
