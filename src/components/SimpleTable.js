import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

let id = 0;
function createData(name, description, rank, amount) {
  id += 1;
  return { id, name, description, rank, amount };
}

const rows = [
  createData('Guard', 'Choose another player and guess his/her hand, the person is knocked out if you guessed right', 1, 5),
  createData('Priest', 'Secretly look at another player\'s hand', 2, 2),
  createData('Baron', 'Compare your other card with another player, the person with the lower rank card is knocked out', 3, 2),
  createData('Handmaid', 'Protect yourself from other players until next turn', 4, 2),
  createData('Prince', 'Choose one player to discards his or her hand', 5, 2),
  createData('King', 'Trade hands with another player', 6, 1),
  createData('Countess', 'Discard if the other card you have is King or Prince', 7, 1),
  createData('Princess', 'Knocked out if discarded', 8, 1),
];

function SimpleTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell numeric>Card Rank</TableCell>
            <TableCell>Card Name</TableCell>
            <TableCell numeric>Amount</TableCell>
            <TableCell>Card Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => {
            return (
              <TableRow key={row.id} hover>
                <TableCell component="th" scope="row" numeric>
                  {row.rank}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell numeric>{row.amount}</TableCell>
                <TableCell>{row.description}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);