import { getNonDeadNonProtectedPlayers } from './util';
export default function randomAI(players, playerId) {
  let cardId;
  if (players[playerId - 1].holdingCards.indexOf(4) !== -1) {
    // Prioritize on playing handmaid.
    cardId = 4;
  } else {
    if (players[playerId - 1].holdingCards[0] < players[playerId - 1].holdingCards[1]) {
      cardId = players[playerId - 1].holdingCards[0];
    } else {
      cardId = players[playerId - 1].holdingCards[1];
    }
  }

  let guardGuess;
  if (cardId === 1) {
    // Randomly choose from the highest not yet appeared card.
    // cardToGuess = getHighestNotYetAppearedCard(this.cards, cardsNotPlayedYet);
    guardGuess = 8; // Make this smarter.
  }

  let playAgainst = playerId % 4 + 1;
  let getNonDeadNonProtectedPlayerList = getNonDeadNonProtectedPlayers(playerId, players);
  if (getNonDeadNonProtectedPlayerList.length == 0) {
    // The player is the winner.
  } else {
    // Randomly select one player to play the card against.
    let randomPlayerIndex = Math.floor(Math.random() * getNonDeadNonProtectedPlayerList.length);
    playAgainst = getNonDeadNonProtectedPlayerList[randomPlayerIndex];
  }
  return {cardId, playAgainst, guardGuess};
}