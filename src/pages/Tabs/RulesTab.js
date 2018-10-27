import React from 'react';
import RulesTable from '../../components/RulesTable';

class RulesTab extends React.Component {
  render() {
    return (
      <div>
        <h4>Game Tab</h4>
        In game tab, you are player 1 and will be playing with 3 other AI players. In each turn you will have two cards to pick from and play. The effect and details of each card can be found in the table below.

        <h4>End Goal</h4>
        Game ends if the deck is empty at the end of a turn. The player with the highest ranked person wins. In case of a tie, the player who discarded the highest total value of cards wins.
        <br/><br/>
        Game also ends if all players but one are out of the game, in which case the remaining player wins.
        <br/><br/>
        You can get the rules book
        <a href="http://online.fliphtml5.com/mvgr/hyvg/#p=1" target="_blank"> here.</a>
        The following is a summary table.

        <RulesTable/>
      </div>
    );
  }
}

export default RulesTab;
