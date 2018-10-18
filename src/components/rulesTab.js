import React from 'react';
import SimpleTable from './SimpleTable';

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

export default RulesTab;