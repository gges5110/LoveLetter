const cardRank = {
  'Guard': 1,
  'Priest': 2,
  'Baron': 3,
  'Handmaid': 4,
  'Prince': 5,
  'King': 6,
  'Countess': 7,
  'Princess': 8,
}

const cardNames = [
  'Guard',
  'Priest',
  'Baron',
  'Handmaid',
  'Prince',
  'King',
  'Countess',
  'Princess',
];

const startingCards = {
  'Guard': 5,
  'Priest': 2,
  'Baron': 2,
  'Handmaid': 2,
  'Prince': 2,
  'King': 1,
  'Countess': 1,
  'Princess': 1,
};

const nonAttackingCards = [
  'Handmaid',
  'Countess',
  'King',
];

const initialState = {
  counter: 0,
  currentPlayerId: 1,
  players: [
    {
      id: 1,
      dead: false,
      protected: false,
      holdingCards: [],
      playedCards: [],
      seenCards: [],
    },
    {
      id: 2,
      dead: false,
      protected: false,
      holdingCards: [],
      playedCards: [],
      seenCards: [],
    },
    {
      id: 3,
      dead: false,
      protected: false,
      holdingCards: [],
      playedCards: [],
      seenCards: [],
    },
    {
      id: 4,
      dead: false,
      protected: false,
      holdingCards: [],
      playedCards: [],
      seenCards: [],
    }
  ],
  firstCard: {

  },
  availableCards: {
    'Guard': 5,
    'Priest': 2,
    'Baron': 2,
    'Handmaid': 2,
    'Prince': 2,
    'King': 1,
    'Countess': 1,
    'Princess': 1,
  },
  gameEnds: {
    winner: null
  },
  buttonStates: {
    chooseCard: true,
    playAgainst: false,
    GuardGuess: false,
  },
  readyForNextTurn: false,
  cardToPlay: {
    cardId: null,
    playAgainst: -1,
    guardGuess: -1
  }
};

export {
  cardRank,
  cardNames,
  initialState,
  nonAttackingCards,
  startingCards,
}