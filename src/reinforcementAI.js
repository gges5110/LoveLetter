/*
Step 1: Initialize Q Value Table
  ind2sub([2, 9, 8, 8, 8, 4, 7], (S + A)) => [1][5][2][4][3][1][6] (stateVector) + (actionVector)
  for (i = 0 ~ product([2, 9, 8, 8, 8, 4, 7])) {
    QValueTable[i] = Math.random();
  }
Step 2: Lookup Q Value Table based on the current state, and decided what action to take
  state definition:
  stateVector = [
    player[0].dead,                         // 2
    player[0].playedCards[last_idx].cardId, // 9
    player[0].holdingCards[0],              // 8
    player[0].holdingCards[1]               // 8
  ]
  actionVector = [
    cardId,       // 8
    playAgainst,  // 4
    guardGuess,   // 7 (Can't guess guard)
  ]
  function allowedSAIndicies(S) {
    // Logic to figure out cardId, playAgainst, guess
    let actionArray = [];
    let as.concat(stateActionVectorToInteger(S, actionArray));
    // This will return array of SA indicies
    return as;
  }
  let allowedSAIndicies = allowedSAIndicies(S); // []
  maxSAIndex = argMax(QValueTable(allowedSAIndicies))

Step 3: Apply action, let the game engine run until your next turn.
  actionObj = SAIndexToActionObject(maxSAIndex)
  store.dispatch({type: 'PLAY_CARD', cardToPlay: actionObj})

Step 4: Update Q Value Table (agent learning)
  Q(A, S) = Q(A, S) + alpha * [R(S) + max_A(Q(A, S')) - Q(A, S)]
  let max_A = -inf;
  let allowedSAIndicies = allowedSAIndicies(S'); // []
  max_A = max(QValueTable[allowedSAIndicies])
  QValueTable[maxSAIndex] = QValueTable[maxSAIndex] + alpha * [R(== -100 when dead) + max_A - QValueTable[maxSAIndex]]

Step 5: Repeat Step 2 until game ends/training complete
*/
import { ind2sub } from 'ind2sub';

export default class ReinforcementAI {
  constructor(stateSizeArr, actionSizeArr) {
    this.QValueTable = [];
    this.stateSizeArr = stateSizeArr;
    this.actionSizeArr = actionSizeArr;
    this.SASizeArr = [];
    this.SASizeArr = this.SASizeArr.concat(stateSizeArr);
    this.SASizeArr = this.SASizeArr.concat(actionSizeArr);
    this.lastSAIndex = -1;
    this.alpha = 0.5;
  }

  initialize() {
    let totalSALength = this.totalSALength();
    for (let i = 0; i < totalSALength; ++i) {
      this.QValueTable[i] = Math.random();
    }
  }

  getBestAction(reduxState) {
    let SObject = this.reduxStateToSObject(reduxState);
    let allowedSAIndicies = this.allowedSAIndicies(SObject);
    let bestSAIndex = this.getMaxQValueSAIndexGivenSAIndicies(allowedSAIndicies);
    this.lastSAIndex = bestSAIndex;
    return this.SAIndexToActionObject(bestSAIndex);
  }

  learn(nextReduxState) {
    let nextSObject = this.reduxStateToSObject(nextReduxState);
    let allowedSAIndicies = this.allowedSAIndicies(nextSObject);
    let max_A = this.getMaxQValueGivenSAIndicies(allowedSAIndicies);
    this.QValueTable[this.lastSAIndex] = this.QValueTable[this.lastSAIndex] +
      this.alpha * [this.reward(nextSObject) + max_A - this.QValueTable[this.lastSAIndex]]
  }

  // Private functions
  /*
  {
    player0dead: reduxState.players[0].dead,
    player0lastCardId: player0lastCardId,
    player0holdingCard0: reduxState.players[0].holdingCards[0],
    player0holdingCard1: reduxState.players[0].holdingCards[1],
  }
  */
  allowedSAIndicies(SObject) {
    let SIndex = this.SObjectToSIndex(SObject);
    let AIndicies = [], SAIndicies = [];
    if (SObject.player0dead) {
      return as;
    }
    var playAgainst = [], guess = [];
    // SObject.player0card0
    if (SObject.player0holdingCard0 === 1) {
      playAgainst = [2, 3, 4];
      guess = [2, 3, 4, 5, 6, 7, 8];
    } else if (SObject.player0holdingCard0 === 8 || SObject.player0holdingCard0 === 7 || SObject.player0holdingCard0 === 4) {
      playAgainst = [1];
      guess = [2, 3, 4, 5, 6, 7, 8];
    } else {
      playAgainst = [2, 3, 4];
      guess = [2, 3, 4, 5, 6, 7, 8];
    }
    AIndicies = AIndicies.concat(this.generateActionIndicies(SObject.player0holdingCard0, playAgainst, guess));
    let actionObjects1 = this.AIndiciesToActionObjects(AIndicies);

    // SObject.player0card1
    if (SObject.player0holdingCard1 === 1) {
      playAgainst = [2, 3, 4];
      guess = [2, 3, 4, 5, 6, 7, 8];
    } else if (SObject.player0holdingCard1 === 8 || SObject.player0holdingCard1 === 7 || SObject.player0holdingCard1 === 4) {
      playAgainst = [1];
      guess = [];
    } else {
      playAgainst = [2, 3, 4];
      guess = [];
    }
    AIndicies = AIndicies.concat(this.generateActionIndicies(SObject.player0holdingCard1, playAgainst, guess));
    let actionObjects2 = this.AIndiciesToActionObjects(AIndicies);
    return this.combineSAIndicies(SIndex, AIndicies);
  }

  // For debugging
  AIndiciesToActionObjects(AIndicies) {
    // [8, 4, 7]
    let arr = [];
    for (let i = 0; i < AIndicies.length; ++i) {
      arr.push(this.AIndexToActionObjects(AIndicies[i]));
    }
    return arr;
  }

  AIndexToActionObjects(AIndex) {
    let arr = ind2sub(this.actionSizeArr, AIndex);
    return {
      cardId: arr[2],
      playAgainst: arr[1] + 1,
      guardGuess: arr[0] + 1
    };
  }

  combineSAIndicies(SIndex, AIndicies) {
    let shiftedSIndex = SIndex + this.product(this.stateSizeArr);
    let ret = [];
    for (let i = 0; i < AIndicies.length; ++i) {
      ret.push(AIndicies[i] + shiftedSIndex);
    }
    return ret;
  }

  generateActionIndicies(cardIdx, playAgainstArr, guessArr) {
    let arr = [];
    // [8, 4, 7]
    for (var pidx = 0; pidx < playAgainstArr.length; ++pidx) {
      for (var gidx = 0; gidx < guessArr.length; ++gidx) {
        arr.push((cardIdx * 4 + playAgainstArr[pidx]) * 7 + guessArr[gidx]);
      }
    }
    return arr;
  }

  getMaxQValueSAIndexGivenSAIndicies(SAIndicies) {
    if (SAIndicies.length === undefined || SAIndicies.length === 0) {
      return -1;
    } else {
      let max = this.QValueTable[SAIndicies[0]], index = SAIndicies[0];
      for (let i = 1; i < SAIndicies.length; ++i) {
        max = Math.max(max, this.QValueTable[SAIndicies[i]]);
        index = SAIndicies[i];
      }
      return index;
    }
  }

  reduxStateToSObject(reduxState) {
    /*
    stateVector = [
      player[0].dead,                         // 2
      player[0].playedCards[last_idx].cardId, // 9
      player[0].holdingCards[0],              // 8
      player[0].holdingCards[1]               // 8
    ]
    */

    let player0lastCardId = -1;
    if (reduxState.players[0].playedCards.length != 0) {
      player0lastCardId = reduxState.players[0].playedCards[reduxState.players[0].playedCards.length - 1];
    }

    return {
      player0dead: reduxState.players[1].dead,
      player0lastCardId: player0lastCardId.cardId,
      player0holdingCard0: reduxState.players[1].holdingCards[0],
      player0holdingCard1: reduxState.players[1].holdingCards[1],
    }
  }

  reward(SObject) {
    return SObject.player0dead === true ? -100 : 0;
  }

  SAIndexToActionObject(SAIndex) {
    // ind2sub([2, 9, 8, 8, 8, 4, 7], (S + A)) => [1][5][2][4][3][1][6] (stateVector) + (actionVector)
    let arr = ind2sub(this.SASizeArr, SAIndex);
    return {
      cardId: arr[this.stateSizeArr.length + 2],
      playAgainst: arr[this.stateSizeArr.length + 1] + 1,
      guardGuess: arr[this.stateSizeArr.length] + 1
    };
  }

  SAVectorToInteger(S, A) {
    // [1][5][2][4][3][1][6] => 24901
    let wholeVector = [];
    wholeVector = wholeVector.concat(S);
    wholeVector = wholeVector.concat(A);
    let ret = 0;
    for (let i = 0; i < this.SASizeArr.length; ++i) {
      if (i !== 0) {
        ret *= this.SASizeArr[i];
      }
      ret += wholeVector[i];
    }
    return ret;
  }

  SObjectToSVector(SObject) {
    let ret = [];
    ret.push(SObject.player0dead ? 1 : 0);
    ret.push(SObject.player0lastCardId);
    ret.push(SObject.player0holdingCard0);
    ret.push(SObject.player0holdingCard1);
    return ret;
  }

  SObjectToSIndex(SObject) {
    let SVector = this.SObjectToSVector(SObject);
    let ret = 0;
    for (let i = 0; i < this.stateSizeArr.length; ++i) {
      if (i !== 0) {
        ret *= this.stateSizeArr[i];
      }
      ret += SVector[i];
    }
    return ret;
  }

  getMaxQValueGivenSAIndicies(SAIndicies) {
    let index = this.getMaxQValueSAIndexGivenSAIndicies(SAIndicies);
    return this.QValueTable[index];
  }

  totalSALength() {
    let totalSAArr = [];
    totalSAArr = totalSAArr.concat(this.stateSizeArr);
    totalSAArr = totalSAArr.concat(this.actionSizeArr);
    return this.product(totalSAArr);
  }

  product(arr) {
    let retVal = 1;
    for (let i = 0; i < arr.length; ++i) {
      retVal *= arr[i];
    }
    return retVal;
  }
}