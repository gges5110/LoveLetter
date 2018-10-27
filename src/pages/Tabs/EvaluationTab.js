import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Evaluation from "../../AI/evaluate";

class EvaluationTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleClick = () => {
    let evaluation = new Evaluation();
    // Play one game.
    evaluation.start().then(function(result) {
      $('#evaluation').removeClass("disabled");
      $('#win-rate-1').text(result.winRate[0]);
      $('#win-rate-2').text(result.winRate[1]);
      $('#win-rate-3').text(result.winRate[2]);
      $('#win-rate-4').text(result.winRate[3]);
    });
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleClick} color="primary" variant="contained">Start Evaluation</Button>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Start Evaluation</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

export default EvaluationTab;
