export const PLAY_CARD = 'PLAY_CARD';

export function playCard(cardToPlay) {
  return {
    type: PLAY_CARD,
    cardToPlay,
  };
}

export const DISCARD_CARD = 'DISCARD_CARD';

export function discardCard(card) {
  return {
    type: 'DISCARD_CARD',
    card,
  };
}

export const DRAW_CARD = 'DRAW_CARD';

export function drawCard(player) {
  return {
    type: DRAW_CARD,
    player,
  };
}

export const RESTART = 'RESTART';

export function restart() {
  return {
    type: RESTART,
  };
}
