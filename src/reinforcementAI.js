/*
Step 1: Initialize Q Value Table
  for (i = 0 ~ product([2, 9, 8, 8, 8, 4, 7])) {
    QValueTable[i] = Math.random();
    math.reshape(QValueTable, [2, 9, 8, 8, 8, 4, 7])
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
import math from 'mathjs';

export default class ReinforcementAI {
  constructor(stateSizeArr, actionSizeArr) {
    this.QValueTable = [];
    this.stateSizeArr = stateSizeArr;
    this.actionSizeArr = actionSizeArr;
    this.SASizeArr = [];
    this.SASizeArr = this.SASizeArr.concat(stateSizeArr);
    this.SASizeArr = this.SASizeArr.concat(actionSizeArr);
    this.lastSAVector = -1;
    this.alpha = 0.5;
  }

  initialize() {
    this.QValueTable = math.random(this.SASizeArr);
  }

  getBestAction(reduxState) {
    let SObject = this.reduxStateToSObject(reduxState);
    let allowedSAVectors = this.allowedSAVectors(SObject,reduxState.currentPlayerId,reduxState.players);
    let bestSAVector = this.getMaxQValueSAVectorGivenSAVectors(allowedSAVectors);
    this.lastSAVector = bestSAVector;
    return this.SAVectorToActionObject(bestSAVector);
  }

  learn(nextReduxState) {
    let nextSObject = this.reduxStateToSObject(nextReduxState);
    let allowedSAIndicies = this.allowedSAVectors(nextSObject,nextReduxState.currentPlayerId,nextReduxState.players);
    let max_A = this.getMaxQValueGivenSAVectors(allowedSAIndicies);
    this.QValueTable[this.lastSAVector] = this.QValueTable[this.lastSAVector] +
      this.alpha * [this.reward(nextSObject) + max_A - this.QValueTable[this.lastSAVector]]
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
  allowedSAVectors(SObject, currentPlayerId, playerStatus) {
    // Represent index as 1d vector, math.subset([[0, 1], [2, 3]], math.index(1, 0)) // 2
    let SVector = this.SObjectToSVector(SObject);
    let AVectors = [], SAIndicies = [];
    if (SObject.player0dead) {
      return as;
    }
    var playAgainst = [1, 2, 3, 4], guess = [2, 3, 4, 5, 6, 7, 8];
    // Remove players who are dead or protected
    for (var i = playerStatus.length-1; i > -1; i--){
      if (playerStatus[i].dead || playerStatus[i].protected){
    		playAgainst.splice(i,1);    		
      }    	
    }
    var playerID_ind = playAgainst.indexOf(currentPlayerId);
    var playAgainst_copy = playAgainst.slice();
    // SObject.player0card0
    if (SObject.player0holdingCard0 === 1) {
      playAgainst.splice(playerID_ind, 1); // remove self player ID
    } else if (SObject.player0holdingCard0 === 8 || SObject.player0holdingCard0 === 7 || SObject.player0holdingCard0 === 4) {
      playAgainst = [currentPlayerId];
    } else {
      playAgainst.splice(playerID_ind, 1); // remove self player ID
    }
    AVectors = AVectors.concat(this.generateActionVectors(SObject.player0holdingCard0, playAgainst, guess));
    let actionObjects1 = this.AIndiciesToActionObjects(AVectors);

    // SObject.player0card1
    playAgainst = playAgainst_copy;
    if (SObject.player0holdingCard1 === 1) {
      playAgainst.splice(playerID_ind, 1); // remove self player ID
    } else if (SObject.player0holdingCard1 === 8 || SObject.player0holdingCard1 === 7 || SObject.player0holdingCard1 === 4) {
      playAgainst = [currentPlayerId];
    } else {
      playAgainst.splice(playerID_ind, 1); // remove self player ID
    }
    AVectors = AVectors.concat(this.generateActionVectors(SObject.player0holdingCard1, playAgainst, guess));
    let actionObjects2 = this.AIndiciesToActionObjects(AVectors);
    return this.combineSAVectors(SVector, AVectors);
  }

  // For debugging
  AIndiciesToActionObjects(AIndicies) {
    // [8, 4, 7]
    let arr = [];
    for (let i = 0; i < AIndicies.length; ++i) {
      arr.push(this.AVectorToActionObject(AIndicies[i]));
    }
    return arr;
  }

  AVectorToActionObject(AIndex) {
    let arr = AIndex;
    return {
      cardId: arr[0] + 1,
      playAgainst: arr[1] + 1,
      guardGuess: arr[2] + 2
    };
  }

  combineSAVectors(SVector, AVectors) {
    // [1, 2, 3, 4], [[5, 6, 7], [3, 2, 1]]
    // return [[1, 2, 3, 4, 5, 6, 7], [1, 2, 3, 4, 3, 2, 1]]
    let ret = [];
    for (let i = 0; i < AVectors.length; ++i) {
      let combinedSAVector = SVector;
      combinedSAVector = combinedSAVector.concat(AVectors[i]);
      ret.push(combinedSAVector);
    }
    return ret;
  }

  generateActionVectors(cardIdx, playAgainstArr, guessArr) {
    let arr = [];
    // [8, 4, 7]
    for (var pidx = 0; pidx < playAgainstArr.length; ++pidx) {
      for (var gidx = 0; gidx < guessArr.length; ++gidx) {
        let actionVector = [];
        actionVector.push(cardIdx - 1);
        actionVector.push(playAgainstArr[pidx] - 1);
        actionVector.push(guessArr[gidx] - 2);
        arr.push(actionVector);
      }
    }
    return arr;
  }

  convertSAVectorToMathIndex(SAVector) {
    return math.index(SAVector[0], SAVector[1], SAVector[2], SAVector[3], SAVector[4], SAVector[5], SAVector[6]);
  }

  getQValue(SAVector) {
    return math.subset(this.QValueTable, this.convertSAVectorToMathIndex(SAVector));
  }

  getMaxQValueSAVectorGivenSAVectors(SAVectors) {
    if (SAVectors.length === undefined || SAVectors.length === 0) {
      return -1;
    } else {
      let max = this.getQValue(SAVectors[0]), vector = SAVectors[0];
      for (let i = 1; i < SAVectors.length; ++i) {
        if (max < this.getQValue(SAVectors[i])) {
          max = this.getQValue(SAVectors[i]);
          vector = SAVectors[i];
        }
      }
      return vector;
    }
  }

  getMaxQValueGivenSAVectors(SAVectors) {
    let vector = this.getMaxQValueSAVectorGivenSAVectors(SAVectors);
    return this.getQValue(vector);
  }

  getAVectorFromSAVector(SAVector) {
    return math.subset(SAVector, math.index(math.range(this.stateSizeArr.length, this.stateSizeArr.length + this.actionSizeArr.length)));
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

    let player0lastCardId = 8;
    if (reduxState.players[0].playedCards.length != 0) {
      player0lastCardId = reduxState.players[0].playedCards[reduxState.players[0].playedCards.length - 1].cardId;
    }

    return {
      player0dead: reduxState.players[1].dead,
      player0lastCardId: player0lastCardId,
      player0holdingCard0: reduxState.players[1].holdingCards[0],
      player0holdingCard1: reduxState.players[1].holdingCards[1],
    }
  }

  reward(SObject) {
    return SObject.player0dead === true ? -100 : 0;
  }

  SAVectorToActionObject(SAVector) {
    let AIndex = this.getAVectorFromSAVector(SAVector);
    return this.AVectorToActionObject(AIndex);
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
    ret.push(SObject.player0lastCardId - 1);
    ret.push(SObject.player0holdingCard0 - 1);
    ret.push(SObject.player0holdingCard1 - 1);
    return ret;
  }
}