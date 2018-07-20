var playCard = exports.playCard = function playCard(cardToPlay) {
  return {
    type: 'PLAY_CARD',
    cardToPlay: cardToPlay
  };
};

var discardCard = exports.discardCard = function discardCard(card) {
  return {
    type: 'DISCARD_CARD',
    card: card
  };
}