import Paper from "@material-ui/core/Paper/Paper";
import PropTypes from "prop-types";
import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 3,
    marginTop: 24,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 20,
      marginRight: 20
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: 200,
      marginRight: 200
    },
  },
});

function TabContainer(props) {
  const {classes} = props;
  return (
    <Paper
      className={classes.root}
      elevation={1}
    >
      {props.children}
    </Paper>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withStyles(styles)(TabContainer);